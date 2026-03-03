'use client';
/**
 * Offline Effect Executor
 *
 * Enables client-only mode for applications that need to work without
 * server connectivity. Provides:
 * - Mock data providers for simulating server responses
 * - Local effect execution without server round-trip
 * - Sync queue for effects that need server persistence when back online
 *
 * Used by both Builder preview (offline mode) and compiled shells (PWA mode).
 *
 * @packageDocumentation
 */

import type {
  ClientEffect,
  ClientEffectExecutorConfig,
  PatternConfig,
  EventResponse,
} from './types';
import { executeClientEffects } from './client-effect-executor';

// ============================================================================
// Types
// ============================================================================

/**
 * Effect that needs to be synced to server when online
 */
export interface PendingSyncEffect {
  /** Unique ID for this effect */
  id: string;
  /** Timestamp when effect was queued */
  timestamp: number;
  /** Effect type (persist, call-service, etc.) */
  type: string;
  /** Effect payload */
  payload: unknown;
  /** Number of retry attempts */
  retries: number;
  /** Maximum retries before giving up */
  maxRetries: number;
}

/**
 * Configuration for offline executor
 */
export interface OfflineExecutorConfig extends ClientEffectExecutorConfig {
  /**
   * Mock data provider for simulating fetch responses.
   * Returns data for a given entity name.
   */
  mockDataProvider?: (entityName: string) => unknown[];

  /**
   * Whether to queue server effects for sync when online.
   * Default: true
   */
  enableSyncQueue?: boolean;

  /**
   * Maximum number of effects to queue before dropping oldest.
   * Default: 100
   */
  maxQueueSize?: number;

  /**
   * Callback when an effect is added to sync queue.
   */
  onEffectQueued?: (effect: PendingSyncEffect) => void;

  /**
   * Callback when sync queue changes.
   */
  onQueueChange?: (queue: PendingSyncEffect[]) => void;
}

/**
 * Offline executor state
 */
export interface OfflineExecutorState {
  /** Whether we're in offline mode */
  isOffline: boolean;
  /** Pending effects waiting for sync */
  syncQueue: PendingSyncEffect[];
  /** Number of effects processed locally */
  localEffectsProcessed: number;
  /** Number of effects synced to server */
  effectsSynced: number;
  /** Last sync attempt timestamp */
  lastSyncAttempt?: number;
  /** Last successful sync timestamp */
  lastSuccessfulSync?: number;
}

// ============================================================================
// ID Generator
// ============================================================================

let effectIdCounter = 0;
function generateEffectId(): string {
  return `offline-effect-${++effectIdCounter}-${Date.now()}`;
}

// ============================================================================
// Offline Executor Class
// ============================================================================

/**
 * OfflineExecutor - Handles effects in offline/client-only mode.
 *
 * Features:
 * - Executes client effects immediately (render-ui, navigate, notify, emit)
 * - Queues server effects (persist, fetch, call-service) for later sync
 * - Provides mock data for fetch effects when offline
 * - Syncs queued effects when connection is restored
 *
 * @example
 * ```typescript
 * const executor = new OfflineExecutor({
 *   renderToSlot: (slot, pattern) => slotManager.render(slot, pattern),
 *   navigate: (path) => router.push(path),
 *   notify: (message, opts) => toast.show(message, opts),
 *   eventBus: { emit: (event, payload) => bus.emit(event, payload) },
 *   mockDataProvider: (entityName) => mockStore.getAll(entityName),
 * });
 *
 * // Process effects locally
 * const response = executor.processEventOffline('LOAD', { id: '123' });
 *
 * // When back online
 * await executor.syncPendingEffects(serverUrl);
 * ```
 */
export class OfflineExecutor {
  private config: OfflineExecutorConfig;
  private state: OfflineExecutorState;
  private storage: Storage | null;

  constructor(config: OfflineExecutorConfig) {
    this.config = {
      enableSyncQueue: true,
      maxQueueSize: 100,
      ...config,
    };

    this.state = {
      isOffline: !this.checkOnline(),
      syncQueue: [],
      localEffectsProcessed: 0,
      effectsSynced: 0,
    };

    // Use localStorage if available
    this.storage = typeof localStorage !== 'undefined' ? localStorage : null;

    // Load persisted queue
    this.loadSyncQueue();

    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  /**
   * Check if we're online (browser API)
   */
  private checkOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  /**
   * Handle going online
   */
  private handleOnline = (): void => {
    this.state.isOffline = false;
    // Attempt to sync pending effects
    // Note: Actual sync should be triggered by the app with proper server URL
  };

  /**
   * Handle going offline
   */
  private handleOffline = (): void => {
    this.state.isOffline = true;
  };

  /**
   * Load sync queue from localStorage
   */
  private loadSyncQueue(): void {
    if (!this.storage) return;

    try {
      const stored = this.storage.getItem('orbital-offline-queue');
      if (stored) {
        this.state.syncQueue = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('[OfflineExecutor] Failed to load sync queue:', error);
    }
  }

  /**
   * Save sync queue to localStorage
   */
  private saveSyncQueue(): void {
    if (!this.storage) return;

    try {
      this.storage.setItem('orbital-offline-queue', JSON.stringify(this.state.syncQueue));
    } catch (error) {
      console.warn('[OfflineExecutor] Failed to save sync queue:', error);
    }
  }

  /**
   * Add an effect to the sync queue
   */
  private queueForSync(type: string, payload: unknown): void {
    if (!this.config.enableSyncQueue) return;

    const effect: PendingSyncEffect = {
      id: generateEffectId(),
      timestamp: Date.now(),
      type,
      payload,
      retries: 0,
      maxRetries: 3,
    };

    // Add to queue, respecting max size
    this.state.syncQueue.push(effect);
    if (this.state.syncQueue.length > (this.config.maxQueueSize ?? 100)) {
      this.state.syncQueue.shift(); // Remove oldest
    }

    this.saveSyncQueue();

    // Notify listeners
    this.config.onEffectQueued?.(effect);
    this.config.onQueueChange?.(this.state.syncQueue);
  }

  /**
   * Execute client effects immediately.
   */
  executeClientEffects(effects: ClientEffect[]): void {
    if (effects.length === 0) return;

    executeClientEffects(effects, this.config);
    this.state.localEffectsProcessed += effects.length;
  }

  /**
   * Process an event in offline mode.
   *
   * Returns a simulated EventResponse with mock data.
   * Client effects are executed immediately.
   * Server effects are queued for sync.
   */
  processEventOffline(
    event: string,
    payload?: Record<string, unknown>,
    effects?: Array<unknown[]>
  ): EventResponse {
    const clientEffects: ClientEffect[] = [];
    const fetchedData: Record<string, unknown[]> = {};

    // Process effects
    if (effects) {
      for (const effect of effects) {
        if (!Array.isArray(effect) || effect.length < 1) continue;

        const [type, ...args] = effect as [string, ...unknown[]];

        switch (type) {
          // Client effects - execute immediately
          case 'render-ui':
          case 'navigate':
          case 'notify':
          case 'emit':
            clientEffects.push(effect as ClientEffect);
            break;

          // Fetch effect - use mock data
          case 'fetch': {
            const [entityName, _query] = args;
            if (typeof entityName === 'string' && this.config.mockDataProvider) {
              fetchedData[entityName] = this.config.mockDataProvider(entityName);
            }
            break;
          }

          // Server effects - queue for sync
          case 'persist':
          case 'call-service':
          case 'spawn':
          case 'despawn':
            this.queueForSync(type, { args, event, payload });
            break;

          default:
            console.warn(`[OfflineExecutor] Unknown effect type: ${type}`);
        }
      }
    }

    // Execute client effects
    if (clientEffects.length > 0) {
      this.executeClientEffects(clientEffects);
    }

    return {
      success: true,
      data: Object.keys(fetchedData).length > 0 ? fetchedData : undefined,
      clientEffects: clientEffects.length > 0 ? clientEffects : undefined,
    };
  }

  /**
   * Sync pending effects to server.
   *
   * @param serverUrl - Base URL for the orbital server
   * @param authToken - Optional auth token for requests
   * @returns Number of successfully synced effects
   */
  async syncPendingEffects(
    serverUrl: string,
    authToken?: string
  ): Promise<number> {
    if (this.state.syncQueue.length === 0) {
      return 0;
    }

    this.state.lastSyncAttempt = Date.now();
    let syncedCount = 0;
    const failedEffects: PendingSyncEffect[] = [];

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    for (const effect of this.state.syncQueue) {
      try {
        const response = await fetch(`${serverUrl}/sync-effect`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            type: effect.type,
            payload: effect.payload,
            offlineId: effect.id,
            offlineTimestamp: effect.timestamp,
          }),
        });

        if (response.ok) {
          syncedCount++;
        } else {
          // Increment retry count
          effect.retries++;
          if (effect.retries < effect.maxRetries) {
            failedEffects.push(effect);
          }
        }
      } catch (error) {
        // Network error - keep in queue
        effect.retries++;
        if (effect.retries < effect.maxRetries) {
          failedEffects.push(effect);
        }
      }
    }

    // Update queue with failed effects
    this.state.syncQueue = failedEffects;
    this.state.effectsSynced += syncedCount;

    if (syncedCount > 0) {
      this.state.lastSuccessfulSync = Date.now();
    }

    this.saveSyncQueue();
    this.config.onQueueChange?.(this.state.syncQueue);

    return syncedCount;
  }

  /**
   * Get current executor state
   */
  getState(): OfflineExecutorState {
    return { ...this.state };
  }

  /**
   * Get number of pending effects
   */
  getPendingCount(): number {
    return this.state.syncQueue.length;
  }

  /**
   * Clear the sync queue
   */
  clearQueue(): void {
    this.state.syncQueue = [];
    this.saveSyncQueue();
    this.config.onQueueChange?.(this.state.syncQueue);
  }

  /**
   * Dispose the executor and clean up listeners
   */
  dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    }
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create an offline executor with sensible defaults.
 *
 * @example
 * ```typescript
 * const executor = createOfflineExecutor({
 *   renderToSlot: slotManager.render,
 *   navigate: router.push,
 *   notify: toast.show,
 *   eventBus: { emit: bus.emit },
 *   mockDataProvider: (entity) => store.getAll(entity),
 * });
 * ```
 */
export function createOfflineExecutor(
  config: OfflineExecutorConfig
): OfflineExecutor {
  return new OfflineExecutor(config);
}

// ============================================================================
// React Hook (optional integration)
// ============================================================================

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Options for useOfflineExecutor hook
 */
export interface UseOfflineExecutorOptions extends OfflineExecutorConfig {
  /** Server URL for syncing */
  serverUrl?: string;
  /** Auth token for server requests */
  authToken?: string;
  /** Auto-sync when coming back online */
  autoSync?: boolean;
}

/**
 * Result of useOfflineExecutor hook
 */
export interface UseOfflineExecutorResult {
  /** Current executor state */
  state: OfflineExecutorState;
  /** Whether we're offline */
  isOffline: boolean;
  /** Number of pending effects */
  pendingCount: number;
  /** Execute client effects */
  executeClientEffects: (effects: ClientEffect[]) => void;
  /** Process event offline */
  processEventOffline: (
    event: string,
    payload?: Record<string, unknown>,
    effects?: Array<unknown[]>
  ) => EventResponse;
  /** Manually trigger sync */
  sync: () => Promise<number>;
  /** Clear the queue */
  clearQueue: () => void;
}

/**
 * React hook for offline effect execution.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isOffline, pendingCount, processEventOffline, sync } = useOfflineExecutor({
 *     renderToSlot: slotManager.render,
 *     navigate: router.push,
 *     notify: toast.show,
 *     eventBus: { emit: bus.emit },
 *     serverUrl: '/api/orbitals',
 *     autoSync: true,
 *   });
 *
 *   return (
 *     <div>
 *       {isOffline && <Banner>Offline - {pendingCount} changes pending</Banner>}
 *       <button onClick={() => processEventOffline('SAVE', data)}>Save</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useOfflineExecutor(
  options: UseOfflineExecutorOptions
): UseOfflineExecutorResult {
  const executorRef = useRef<OfflineExecutor | null>(null);
  const [state, setState] = useState<OfflineExecutorState>({
    isOffline: false,
    syncQueue: [],
    localEffectsProcessed: 0,
    effectsSynced: 0,
  });

  // Create executor on mount
  useEffect(() => {
    const executor = new OfflineExecutor({
      ...options,
      onQueueChange: (queue) => {
        setState(executor.getState());
        options.onQueueChange?.(queue);
      },
    });

    executorRef.current = executor;
    setState(executor.getState());

    return () => {
      executor.dispose();
      executorRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-sync when coming online
  useEffect(() => {
    if (!options.autoSync || !options.serverUrl) return;

    const handleOnline = async () => {
      if (executorRef.current) {
        await executorRef.current.syncPendingEffects(
          options.serverUrl!,
          options.authToken
        );
        setState(executorRef.current.getState());
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [options.autoSync, options.serverUrl, options.authToken]);

  const executeEffects = useCallback((effects: ClientEffect[]) => {
    executorRef.current?.executeClientEffects(effects);
    if (executorRef.current) {
      setState(executorRef.current.getState());
    }
  }, []);

  const processEventOffline = useCallback(
    (event: string, payload?: Record<string, unknown>, effects?: Array<unknown[]>) => {
      const result = executorRef.current?.processEventOffline(event, payload, effects);
      if (executorRef.current) {
        setState(executorRef.current.getState());
      }
      return result ?? { success: false, error: 'Executor not initialized' };
    },
    []
  );

  const sync = useCallback(async () => {
    if (!executorRef.current || !options.serverUrl) return 0;
    const count = await executorRef.current.syncPendingEffects(
      options.serverUrl,
      options.authToken
    );
    setState(executorRef.current.getState());
    return count;
  }, [options.serverUrl, options.authToken]);

  const clearQueue = useCallback(() => {
    executorRef.current?.clearQueue();
    if (executorRef.current) {
      setState(executorRef.current.getState());
    }
  }, []);

  return {
    state,
    isOffline: state.isOffline,
    pendingCount: state.syncQueue.length,
    executeClientEffects: executeEffects,
    processEventOffline,
    sync,
    clearQueue,
  };
}
