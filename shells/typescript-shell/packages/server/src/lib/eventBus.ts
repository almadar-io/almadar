/**
 * Server EventBus - Singleton for server-side cross-trait communication
 *
 * This EventBus enables:
 * - Server-side trait event emission after CRUD operations
 * - Server-side trait listeners responding to events
 * - Cross-client event broadcast via WebSocket
 *
 * @packageDocumentation
 */

type EventHandler = (payload: unknown, meta?: Record<string, unknown>) => void;

/**
 * Simple EventBus implementation for server-side events
 */
class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private debug: boolean;

  constructor(options?: { debug?: boolean }) {
    this.debug = options?.debug ?? false;
  }

  on(event: string, handler: EventHandler): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.handlers.get(event)?.delete(handler);
    };
  }

  off(event: string, handler: EventHandler): void {
    this.handlers.get(event)?.delete(handler);
  }

  emit(event: string, payload?: unknown, meta?: Record<string, unknown>): void {
    if (this.debug) {
      console.log(`[EventBus] Emitting ${event}:`, payload);
    }

    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(payload, meta);
        } catch (err) {
          console.error(`[EventBus] Error in handler for ${event}:`, err);
        }
      });
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}

/**
 * Singleton EventBus instance for server-side event communication.
 */
export const serverEventBus = new EventBus({
  debug: process.env.NODE_ENV === 'development',
});

/**
 * Type-safe event emission helper
 */
export function emitEntityEvent(
  entityType: string,
  action: 'CREATED' | 'UPDATED' | 'DELETED',
  payload: Record<string, unknown>
): void {
  const eventType = `${entityType.toUpperCase()}_${action}`;
  serverEventBus.emit(eventType, payload, { orbital: entityType });
}
