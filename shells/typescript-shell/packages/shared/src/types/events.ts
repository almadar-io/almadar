/**
 * Event Types
 *
 * Types for the closed circuit event system.
 * All data operations flow through events with guard enforcement.
 *
 * @packageDocumentation
 */

/**
 * Request body for sending an event to the server
 */
export interface EventRequest {
  /** Event name (e.g., 'INIT', 'CREATE', 'SAVE', 'DELETE') */
  event: string;
  /** Optional payload data */
  payload?: Record<string, unknown>;
  /** Current client state (for validation) */
  currentState?: string;
}

/**
 * Response from server after processing an event
 */
export interface EventResponse {
  /** Whether the event was processed successfully */
  success: boolean;
  /** New state after transition */
  newState?: string;
  /** Fetched entity data, keyed by entity type */
  data?: Record<string, unknown[]>;
  /** Client-side effects to execute */
  clientEffects?: ClientEffect[];
  /** Results from server-side effects (persist, call-service) */
  effectResults?: EffectResult[];
  /** Error message if success is false */
  error?: string;
  /** Guard that failed (for debugging) */
  guardFailed?: string;
}

/**
 * Client-side effect to execute after server response
 */
export type ClientEffect =
  | ['render-ui', string, Record<string, unknown>]
  | ['navigate', string, Record<string, unknown>?]
  | ['notify', string, NotifyOptions?]
  | ['emit', string, unknown?];

export interface NotifyOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

/**
 * Result of a server-side effect execution
 */
export interface EffectResult {
  /** Effect type */
  effect: 'persist' | 'call-service' | 'fetch' | 'emit';
  /** For persist: the operation performed */
  action?: 'create' | 'update' | 'delete' | 'list' | 'query';
  /** Entity type affected */
  entityType?: string;
  /** Result data (created entity, service response, etc.) */
  data?: unknown;
  /** Whether the effect succeeded */
  success: boolean;
  /** Error message if failed */
  error?: string;
}

/**
 * User context available in guards and effects
 */
export interface UserContext {
  id: string;
  role?: string;
  email?: string;
  [key: string]: unknown;
}
