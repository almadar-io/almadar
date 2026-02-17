/**
 * Event Bus Types
 *
 * Type definitions for the page event bus system.
 *
 * @packageDocumentation
 */

/**
 * A KFlow event that can be emitted on the event bus.
 */
export interface KFlowEvent {
  /** Event type identifier (e.g., 'TASK_COMPLETED', 'VALIDATION_SUCCESS') */
  type: string;
  /** Optional payload data */
  payload?: Record<string, unknown>;
  /** Timestamp when the event was emitted */
  timestamp: number;
  /** Source trait or component that emitted the event */
  source?: string;
}

/**
 * Event listener callback function.
 */
export type EventListener = (event: KFlowEvent) => void;

/**
 * Function to unsubscribe from events.
 */
export type Unsubscribe = () => void;

/**
 * Event bus context type.
 */
export interface EventBusContextType {
  /**
   * Emit an event to all listeners.
   *
   * @param type - Event type identifier
   * @param payload - Optional payload data
   */
  emit: (type: string, payload?: Record<string, unknown>) => void;

  /**
   * Subscribe to an event type.
   *
   * @param type - Event type to listen for
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  on: (type: string, listener: EventListener) => Unsubscribe;

  /**
   * Subscribe to an event type, but only fire once.
   *
   * @param type - Event type to listen for
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  once: (type: string, listener: EventListener) => Unsubscribe;

  /**
   * Check if there are any listeners for an event type.
   *
   * @param type - Event type to check
   * @returns True if there are listeners
   */
  hasListeners: (type: string) => boolean;
}
