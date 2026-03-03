'use client';
/**
 * useClientEffects Hook
 *
 * React hook for executing client effects from server responses.
 * Handles effect tracking to prevent duplicate executions and
 * integrates with the client effect executor.
 *
 * Used by both Builder preview and compiled shell trait hooks.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useCallback } from 'react';
import { executeClientEffects } from './client-effect-executor';
import type { ClientEffect, ClientEffectExecutorConfig } from './types';

// ============================================================================
// Hook Types
// ============================================================================

/**
 * Options for the useClientEffects hook
 */
export interface UseClientEffectsOptions extends ClientEffectExecutorConfig {
  /**
   * Whether to execute effects. Defaults to true.
   * Set to false to temporarily disable effect execution.
   */
  enabled?: boolean;

  /**
   * Debug mode - logs effect execution details.
   */
  debug?: boolean;
}

/**
 * Result of useClientEffects hook
 */
export interface UseClientEffectsResult {
  /**
   * Number of effects executed in the last batch.
   */
  executedCount: number;

  /**
   * Whether effects are currently being executed.
   */
  executing: boolean;

  /**
   * Manually trigger effect execution.
   * Useful for imperative control.
   */
  execute: (effects: ClientEffect[]) => void;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Execute client effects from server response.
 *
 * This hook automatically executes effects when they change,
 * tracking which effects have been executed to prevent duplicates.
 *
 * @param effects - Array of client effects to execute (from server response)
 * @param options - Configuration including effect implementations
 * @returns Hook result with execution state and manual trigger
 *
 * @example
 * ```typescript
 * function useMyTrait() {
 *   const [state, setState] = useState({ pendingEffects: [] });
 *   const effectConfig = useClientEffectConfig();
 *
 *   useClientEffects(state.pendingEffects, {
 *     ...effectConfig,
 *     onComplete: () => setState(s => ({ ...s, pendingEffects: [] }))
 *   });
 *
 *   // ...
 * }
 * ```
 */
export function useClientEffects(
  effects: ClientEffect[] | undefined,
  options: UseClientEffectsOptions
): UseClientEffectsResult {
  const {
    enabled = true,
    debug = false,
    onComplete,
    ...config
  } = options;

  // Track executed effects to prevent duplicate execution
  const executedRef = useRef<Set<string>>(new Set());
  const executingRef = useRef(false);
  const executedCountRef = useRef(0);

  // Generate a unique key for an effect (for deduplication)
  const getEffectKey = useCallback((effect: ClientEffect): string => {
    return JSON.stringify(effect);
  }, []);

  // Manual execute function
  const execute = useCallback((effectsToExecute: ClientEffect[]) => {
    if (executingRef.current || effectsToExecute.length === 0) {
      return;
    }

    executingRef.current = true;

    // Filter out already executed effects
    const newEffects = effectsToExecute.filter((effect) => {
      const key = getEffectKey(effect);
      if (executedRef.current.has(key)) {
        if (debug) {
          console.log('[useClientEffects] Skipping duplicate effect:', effect);
        }
        return false;
      }
      return true;
    });

    if (newEffects.length === 0) {
      executingRef.current = false;
      return;
    }

    if (debug) {
      console.log('[useClientEffects] Executing effects:', newEffects);
    }

    // Mark effects as executed
    newEffects.forEach((effect) => {
      executedRef.current.add(getEffectKey(effect));
    });

    // Execute effects
    executeClientEffects(newEffects, {
      ...config,
      onComplete: () => {
        executedCountRef.current = newEffects.length;
        executingRef.current = false;
        onComplete?.();
      },
    });
  }, [config, debug, getEffectKey, onComplete]);

  // Automatic execution on effects change
  useEffect(() => {
    if (!enabled || !effects || effects.length === 0) {
      return;
    }

    execute(effects);
  }, [effects, enabled, execute]);

  // Reset executed tracking when effects array reference changes
  // (indicates a new batch of effects from a new event response)
  const prevEffectsRef = useRef<ClientEffect[] | undefined>(undefined);
  useEffect(() => {
    if (effects !== prevEffectsRef.current) {
      // New effects array - this is a new batch
      // Keep the executed set but allow these new effects to execute
      prevEffectsRef.current = effects;
    }
  }, [effects]);

  return {
    executedCount: executedCountRef.current,
    executing: executingRef.current,
    execute,
  };
}

// ============================================================================
// Effect Config Context Hook
// ============================================================================

/**
 * Context for client effect configuration.
 * This should be provided at the app root by OrbitalProvider.
 */
import { createContext, useContext } from 'react';

const ClientEffectConfigContext = createContext<ClientEffectExecutorConfig | null>(null);

/**
 * Provider for client effect configuration.
 */
export const ClientEffectConfigProvider = ClientEffectConfigContext.Provider;

/**
 * Hook to get the client effect configuration from context.
 *
 * @throws Error if used outside of ClientEffectConfigProvider
 *
 * @example
 * ```typescript
 * function MyTraitHook() {
 *   const effectConfig = useClientEffectConfig();
 *
 *   useClientEffects(pendingEffects, {
 *     ...effectConfig,
 *     onComplete: () => clearPendingEffects()
 *   });
 * }
 * ```
 */
export function useClientEffectConfig(): ClientEffectExecutorConfig {
  const context = useContext(ClientEffectConfigContext);

  if (!context) {
    throw new Error(
      'useClientEffectConfig must be used within a ClientEffectConfigProvider. ' +
      'Make sure your component tree is wrapped with OrbitalProvider.'
    );
  }

  return context;
}

/**
 * Hook to get client effect configuration, returning null if not available.
 * Use this for optional integration where effects may not be configured.
 */
export function useClientEffectConfigOptional(): ClientEffectExecutorConfig | null {
  return useContext(ClientEffectConfigContext);
}

// Export the context for direct use
export { ClientEffectConfigContext };
