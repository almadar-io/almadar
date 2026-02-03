/**
 * Shared Renderer Types
 *
 * Type definitions used by both Builder and compiled shells for
 * the dual execution model. These types define the contract between
 * server and client for effect execution.
 *
 * @packageDocumentation
 */

// ============================================================================
// Client Effect Types
// ============================================================================

/**
 * A client effect is a tuple where the first element is the effect type
 * and the remaining elements are the arguments.
 *
 * @example
 * ['render-ui', 'main', { type: 'entity-table', ... }]
 * ['navigate', '/tasks/123']
 * ['notify', 'Task created!', { type: 'success' }]
 * ['emit', 'TASK_CREATED', { id: '123' }]
 */
export type ClientEffect =
  | ['render-ui', string, PatternConfig | null]
  | ['navigate', string, Record<string, unknown>?]
  | ['notify', string, NotifyOptions?]
  | ['emit', string, unknown?];

/**
 * Options for notify effect
 */
export interface NotifyOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// ============================================================================
// Pattern Types
// ============================================================================

/**
 * Configuration for a pattern to render in a slot.
 * This is what render-ui effects carry as their payload.
 */
export interface PatternConfig {
  /** Pattern type from registry (e.g., 'entity-table', 'form-section') */
  type: string;
  /** Entity name for data binding */
  entity?: string;
  /** Additional props for the pattern component */
  [key: string]: unknown;
}

/**
 * Resolved pattern with component information from component-mapping.json
 */
export interface ResolvedPattern {
  /** Component name (e.g., 'DataTable') */
  component: string;
  /** Import path for the component */
  importPath: string;
  /** Pattern category (e.g., 'display', 'form') */
  category: string;
  /** Validated and normalized props */
  validatedProps: Record<string, unknown>;
}

// ============================================================================
// Event Response Types
// ============================================================================

/**
 * Response from server after processing an event.
 * This is the unified response format for both Builder and compiled shells.
 */
export interface EventResponse {
  /** Whether the event was processed successfully */
  success: boolean;
  /** New state after transition (if transition occurred) */
  newState?: string;
  /** Data fetched by server effects (e.g., { Task: [...] }) */
  data?: Record<string, unknown[]>;
  /** Client effects to execute (render-ui, navigate, notify, emit) */
  clientEffects?: ClientEffect[];
  /** Results of individual effect executions (for debugging) */
  effectResults?: Array<{
    effect: string;
    success: boolean;
    data?: unknown;
    error?: string;
  }>;
  /** Error message if success is false */
  error?: string;
}

// ============================================================================
// Executor Configuration Types
// ============================================================================

/**
 * Configuration for the client effect executor.
 * Provides implementations for each effect type.
 */
export interface ClientEffectExecutorConfig {
  /**
   * Render a pattern to a slot.
   * Called for 'render-ui' effects.
   */
  renderToSlot: (slot: string, pattern: PatternConfig | null) => void;

  /**
   * Navigate to a route.
   * Called for 'navigate' effects.
   */
  navigate: (path: string, params?: Record<string, unknown>) => void;

  /**
   * Show a notification.
   * Called for 'notify' effects.
   */
  notify: (message: string, options?: NotifyOptions) => void;

  /**
   * Emit an event to the event bus.
   * Called for 'emit' effects.
   */
  eventBus: {
    emit: (event: string, payload?: unknown) => void;
  };

  /**
   * Optional: Data from server response for render-ui.
   * Components can use this to access fetched entity data.
   */
  data?: Record<string, unknown[]>;

  /**
   * Optional: Callback when all effects have been executed.
   */
  onComplete?: () => void;
}

// ============================================================================
// Slot Types (re-exported from useUISlots for convenience)
// ============================================================================

/**
 * Valid UI slot names
 */
export type UISlot =
  | 'main'
  | 'sidebar'
  | 'modal'
  | 'drawer'
  | 'overlay'
  | 'center'
  | 'toast'
  | 'hud-top'
  | 'hud-bottom'
  | 'floating';

/**
 * Slot type classification
 */
export type SlotType = 'inline' | 'portal';

/**
 * Definition of a slot including its rendering behavior
 */
export interface SlotDefinition {
  /** Slot name */
  name: UISlot;
  /** Whether to render inline or via portal */
  type: SlotType;
  /** For portal slots: where to render (default: document.body) */
  portalTarget?: string;
  /** Z-index for portal slots */
  zIndex?: number;
}

// ============================================================================
// Data Resolution Types
// ============================================================================

/**
 * Context for resolving entity data.
 * Supports multiple data sources with priority.
 */
export interface DataContext {
  /** Server-provided data (highest priority) */
  fetchedData?: Record<string, unknown[]>;
  /** In-memory mock data (for Builder preview) */
  entityStore?: {
    getRecords: (entityName: string) => unknown[];
  };
  /** Query singleton for filtering */
  querySingleton?: {
    getFilters: (queryRef: string) => Record<string, unknown>;
  };
}

/**
 * Result of data resolution
 */
export interface DataResolution {
  /** Resolved data array */
  data: unknown[];
  /** Whether data is still loading */
  loading: boolean;
  /** Error if resolution failed */
  error?: Error;
}
