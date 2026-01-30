/**
 * Event Contract Types for Shell Components
 *
 * Provides type-safe event definitions for components that emit events.
 * These types ensure the Complete Circuit pattern is enforceable at compile time.
 *
 * @packageDocumentation
 */

/**
 * Trigger types for component events
 */
export type EventTrigger =
  | 'click'      // Button click, row click
  | 'submit'     // Form submission
  | 'close'      // Modal/drawer close
  | 'select'     // Item selection
  | 'change'     // Input change
  | 'keydown'    // Keyboard input
  | 'action';    // Generic action (from itemActions)

/**
 * Payload type identifiers
 */
export type PayloadType =
  | 'FormData'      // Form submission data
  | 'EntityRow'     // Selected entity row
  | 'SearchQuery'   // Search term
  | 'NavigationTarget' // Navigation path
  | 'void';         // No payload

/**
 * Payload schema definition
 */
export interface PayloadSchema {
  /** Named type from shared types */
  type: PayloadType;
  /** For custom types, the shape */
  shape?: Record<string, string>;
}

/**
 * Single event definition emitted by a component
 */
export interface ComponentEventDefinition {
  /** The event name WITHOUT UI: prefix (e.g., 'SAVE', 'VIEW') */
  event: string;
  /** When this event is emitted */
  trigger: EventTrigger;
  /** Payload schema */
  payload: PayloadSchema;
  /** Whether this event is optional (e.g., from itemActions config) */
  optional?: boolean;
}

/**
 * Complete event contract for a component
 */
export interface ComponentEventContract {
  /** Events this component can emit */
  emits: ComponentEventDefinition[];
  /**
   * Events the trait MUST handle for circuit completion.
   * If a component renders in a modal/drawer, the trait must have
   * transitions for these events to close the UI.
   */
  requires: string[];
  /**
   * Whether this component works with entity data
   * (affects payload structure with 'row' and 'entity' fields)
   */
  entityAware?: boolean;
  /**
   * Whether events come from schema config (itemActions)
   * rather than being hardcoded in the component
   */
  configDriven?: boolean;
}

/**
 * Base props interface for components that emit events.
 * Components extending this interface can be validated for circuit completeness.
 */
export interface EventEmittingComponentProps {
  /**
   * Event contract for this component.
   * Used by compiler to validate circuit completeness.
   * This is a documentation/type-checking property - not used at runtime.
   */
  __eventContract?: ComponentEventContract;
}

/**
 * Type-safe UI event payloads
 *
 * Maps event names to their expected payload types.
 * Components should emit events with payloads matching these types.
 */
export interface UIEventPayloads {
  // Form events
  'UI:SAVE': { data: Record<string, unknown>; entity?: string };
  'UI:SUBMIT': { data: Record<string, unknown>; entity?: string };
  'UI:CANCEL': Record<string, unknown> | undefined;
  'UI:CLOSE': Record<string, unknown> | undefined;

  // Entity events
  'UI:VIEW': { row: unknown; entity?: string };
  'UI:SELECT': { row: unknown; entity?: string };
  'UI:DESELECT': Record<string, unknown> | undefined;
  'UI:EDIT': { row: unknown; entity?: string };
  'UI:DELETE': { row: unknown; entity?: string };
  'UI:CREATE': Record<string, unknown> | undefined;

  // Search events (handled by components, not traits)
  'UI:SEARCH': { searchTerm: string };
  'UI:CLEAR_SEARCH': Record<string, unknown> | undefined;

  // Status events
  'UI:UPDATE_STATUS': { row: unknown; status: string; entity?: string };

  // Navigation events
  'UI:NAVIGATE': { path: string };

  // Generic dispatch for custom events
  'UI:DISPATCH': { event: string; payload?: unknown };
}

/**
 * All known UI event names
 */
export type UIEventName = keyof UIEventPayloads;

/**
 * Extract payload type for a specific event
 */
export type UIEventPayload<E extends UIEventName> = UIEventPayloads[E];

/**
 * Create a typed dispatch function for a specific set of events
 *
 * @example
 * ```typescript
 * // In generated hook
 * type MyTraitEvents = 'INIT' | 'VIEW' | 'SAVE' | 'CANCEL';
 * const dispatch: TypedDispatch<MyTraitEvents> = ...
 *
 * dispatch('SAVE', { data: formData });  // OK
 * dispatch('INVALID');  // TypeScript error
 * ```
 */
export type TypedDispatch<Events extends string> = (
  event: Events,
  payload?: Record<string, unknown>
) => void;

/**
 * Event handler type for UI event bus listeners
 */
export type UIEventHandler<E extends UIEventName> = (
  payload: UIEventPayload<E>
) => void;

/**
 * Validate that a dispatch function only accepts known events
 *
 * @example
 * ```typescript
 * function useTypedDispatch<E extends string>(events: readonly E[]) {
 *   const [state, dispatch] = useReducer(reducer, initialState);
 *
 *   const typedDispatch: TypedDispatch<E> = (event, payload) => {
 *     if (!events.includes(event)) {
 *       console.warn(`Unknown event: ${event}`);
 *       return;
 *     }
 *     dispatch({ type: event, payload });
 *   };
 *
 *   return typedDispatch;
 * }
 * ```
 */
export function createTypedDispatch<E extends string>(
  events: readonly E[],
  rawDispatch: (event: string, payload?: Record<string, unknown>) => void
): TypedDispatch<E> {
  return (event: E, payload?: Record<string, unknown>) => {
    if (!events.includes(event)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[TypedDispatch] Unknown event: ${event}. Valid events: ${events.join(', ')}`);
      }
      return;
    }
    rawDispatch(event, payload);
  };
}

/**
 * Form component event contract
 */
export const FORM_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'SAVE', trigger: 'submit', payload: { type: 'FormData' } },
    { event: 'CANCEL', trigger: 'click', payload: { type: 'void' } },
  ],
  requires: ['SAVE', 'CANCEL'],
  entityAware: true,
};

/**
 * DataTable component event contract
 */
export const DATA_TABLE_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'VIEW', trigger: 'action', payload: { type: 'EntityRow' }, optional: true },
    { event: 'SELECT', trigger: 'select', payload: { type: 'EntityRow' }, optional: true },
    { event: 'EDIT', trigger: 'action', payload: { type: 'EntityRow' }, optional: true },
    { event: 'DELETE', trigger: 'action', payload: { type: 'EntityRow' }, optional: true },
  ],
  requires: [],
  entityAware: true,
  configDriven: true,
};

/**
 * CardGrid component event contract
 */
export const CARD_GRID_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'VIEW', trigger: 'action', payload: { type: 'EntityRow' }, optional: true },
    { event: 'SELECT', trigger: 'click', payload: { type: 'EntityRow' }, optional: true },
  ],
  requires: [],
  entityAware: true,
  configDriven: true,
};

/**
 * SearchInput component event contract
 */
export const SEARCH_INPUT_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'SEARCH', trigger: 'change', payload: { type: 'SearchQuery' } },
    { event: 'CLEAR_SEARCH', trigger: 'click', payload: { type: 'void' } },
  ],
  requires: [], // Search is handled by display components, not traits
};

/**
 * ModalSlot component event contract
 */
export const MODAL_SLOT_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'CLOSE', trigger: 'close', payload: { type: 'void' } },
  ],
  requires: ['CLOSE'],
};

/**
 * DrawerSlot component event contract
 */
export const DRAWER_SLOT_EVENT_CONTRACT: ComponentEventContract = {
  emits: [
    { event: 'CLOSE', trigger: 'close', payload: { type: 'void' } },
  ],
  requires: ['CLOSE'],
};
