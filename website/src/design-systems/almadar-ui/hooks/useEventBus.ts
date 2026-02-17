/**
 * useEventBus Hook
 *
 * Provides event bus utilities for component communication.
 * This connects to the EventBusProvider for real applications
 * or provides a simple in-memory bus for design system / Storybook.
 *
 * @packageDocumentation
 */

import { useCallback, useEffect, useRef, useContext } from 'react';
import { EventBusContext } from '../providers/EventBusProvider';
import type { KFlowEvent, EventListener, Unsubscribe, EventBusContextType } from './event-bus-types';

// Re-export types for convenience
export type { KFlowEvent, EventListener, Unsubscribe, EventBusContextType };

// ============================================================================
// Global Event Bus Bridge (Window-Level for Cross-Package Communication)
// ============================================================================

// Extend Window interface for TypeScript
declare global {
  interface Window {
    __kflowEventBus?: EventBusContextType | null;
  }
}

/**
 * Global event bus reference for bridging between packages.
 *
 * Uses window-level global to enable cross-package communication.
 * This allows @almadar/ui components to emit events to the same bus
 * that the consuming app's trait state machine listens to.
 *
 * When the EventBusProvider mounts, it sets window.__kflowEventBus.
 * Components in any package can then use this shared event bus.
 */

/**
 * Set the global event bus reference.
 * Called by EventBusProvider when it mounts.
 *
 * @param bus - The event bus context to set as global, or null to clear
 */
export function setGlobalEventBus(bus: EventBusContextType | null): void {
  if (typeof window !== 'undefined') {
    window.__kflowEventBus = bus;
  }
}

/**
 * Get the global event bus reference.
 *
 * @returns The global event bus if set, null otherwise
 */
export function getGlobalEventBus(): EventBusContextType | null {
  if (typeof window !== 'undefined') {
    return window.__kflowEventBus ?? null;
  }
  return null;
}

// ============================================================================
// Fallback Event Bus (for use outside EventBusProvider)
// ============================================================================

const fallbackListeners = new Map<string, Set<EventListener>>();

const fallbackEventBus: EventBusContextType = {
  emit: (type: string, payload?: Record<string, unknown>) => {
    const event: KFlowEvent = {
      type,
      payload,
      timestamp: Date.now(),
    };
    const handlers = fallbackListeners.get(type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(event);
        } catch (error) {
          console.error(`[EventBus] Error in listener for '${type}':`, error);
        }
      });
    }
  },
  on: (type: string, listener: EventListener): Unsubscribe => {
    if (!fallbackListeners.has(type)) {
      fallbackListeners.set(type, new Set());
    }
    fallbackListeners.get(type)!.add(listener);
    return () => {
      const handlers = fallbackListeners.get(type);
      if (handlers) {
        handlers.delete(listener);
        if (handlers.size === 0) {
          fallbackListeners.delete(type);
        }
      }
    };
  },
  once: (type: string, listener: EventListener): Unsubscribe => {
    const wrappedListener: EventListener = (event) => {
      fallbackListeners.get(type)?.delete(wrappedListener);
      listener(event);
    };
    return fallbackEventBus.on(type, wrappedListener);
  },
  hasListeners: (type: string): boolean => {
    const handlers = fallbackListeners.get(type);
    return handlers !== undefined && handlers.size > 0;
  },
};

// ============================================================================
// Main Hook
// ============================================================================

/**
 * Hook for accessing the event bus.
 *
 * Uses EventBusProvider context if available, otherwise falls back to
 * a simple in-memory event bus (for design system / Storybook).
 *
 * @returns Event bus instance with emit, on, once, and hasListeners methods
 *
 * @example
 * ```tsx
 * const eventBus = useEventBus();
 *
 * // Emit an event
 * eventBus.emit('UI:CLICK', { id: '123' });
 *
 * // Subscribe to an event
 * useEffect(() => {
 *   return eventBus.on('UI:CLICK', (event) => {
 *     console.log('Clicked:', event.payload);
 *   });
 * }, []);
 * ```
 */
export function useEventBus(): EventBusContextType {
  const context = useContext(EventBusContext);
  // Priority: 1) React context, 2) Window global bridge, 3) Fallback
  return context ?? getGlobalEventBus() ?? fallbackEventBus;
}

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Hook for subscribing to a specific event.
 * Automatically cleans up subscription on unmount.
 *
 * @param event - Event name to subscribe to
 * @param handler - Event handler function
 *
 * @example
 * ```tsx
 * useEventListener('UI:CLICK', (event) => {
 *   console.log('Clicked:', event.payload);
 * });
 * ```
 */
export function useEventListener(
  event: string,
  handler: EventListener
): void {
  const eventBus = useEventBus();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const wrappedHandler: EventListener = (evt) => {
      handlerRef.current(evt);
    };
    const unsub = eventBus.on(event, wrappedHandler);
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [event, eventBus]);
}

/**
 * Alias for useEventListener for backward compatibility
 */
export const useEventSubscription = useEventListener;

/**
 * Hook for emitting events.
 * Returns a memoized emit function.
 *
 * @returns Function to emit events
 *
 * @example
 * ```tsx
 * const emit = useEmitEvent();
 *
 * const handleClick = () => {
 *   emit('UI:CLICK', { id: '123' });
 * };
 * ```
 */
export function useEmitEvent(): (type: string, payload?: Record<string, unknown>) => void {
  const eventBus = useEventBus();
  return useCallback(
    (type: string, payload?: Record<string, unknown>) => {
      eventBus.emit(type, payload);
    },
    [eventBus]
  );
}

export default useEventBus;
