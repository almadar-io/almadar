/**
 * Shell Integrator Types
 *
 * Defines the interfaces and types for service integrators.
 * Integrators handle external API calls and emit results via EventBus.
 *
 * @packageDocumentation
 */

// ============================================================================
// Event Bus Interface
// ============================================================================

/**
 * Event bus for inter-trait communication.
 * Integrators use this to emit success/error events back to traits.
 */
export interface EventBus {
  /**
   * Emit an event with optional payload.
   * @param event - Event name (e.g., 'SEARCH_COMPLETE', 'PAYMENT_FAILED')
   * @param payload - Optional data payload
   */
  emit(event: string, payload?: unknown): void;

  /**
   * Subscribe to an event.
   * @param event - Event name to subscribe to
   * @param handler - Callback function when event is emitted
   * @returns Unsubscribe function
   */
  on(event: string, handler: (payload?: unknown) => void): () => void;

  /**
   * Subscribe to an event for one-time execution.
   * @param event - Event name to subscribe to
   * @param handler - Callback function when event is emitted
   */
  once(event: string, handler: (payload?: unknown) => void): void;
}

// ============================================================================
// Integrator Action Types
// ============================================================================

/**
 * Parameter definition for an integrator action.
 */
export interface ActionParam {
  /** Parameter name */
  name: string;
  /** Parameter type (string, number, boolean, object, array) */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  /** Whether the parameter is required */
  required: boolean;
  /** Optional description for documentation */
  description?: string;
  /** Optional default value */
  defaultValue?: unknown;
}

/**
 * Metadata for an integrator action.
 * Describes what the action does, its parameters, and expected response.
 */
export interface IntegratorAction {
  /** Action name (e.g., 'search', 'createPaymentIntent') */
  name: string;
  /** Human-readable description */
  description: string;
  /** Parameters the action accepts */
  params: ActionParam[];
  /** Shape of the success response payload */
  responseShape?: Record<string, string>;
}

// ============================================================================
// Service Integrator Interface
// ============================================================================

/**
 * Callback configuration for integrator execution.
 */
export interface IntegratorCallbacks {
  /** Event to emit on successful execution */
  onSuccess: string;
  /** Event to emit on error */
  onError: string;
}

/**
 * Error payload structure for integrator errors.
 */
export interface IntegratorError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Original error details (optional) */
  details?: unknown;
}

/**
 * Execution context passed to integrators.
 */
export interface ExecutionContext {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Retry configuration */
  retry?: {
    maxAttempts: number;
    backoffMs: number;
  };
  /** Additional context data */
  metadata?: Record<string, unknown>;
}

/**
 * Service integrator interface.
 *
 * Integrators handle external API calls and form "closed circuits"
 * by emitting results back through the event bus.
 *
 * @example
 * ```typescript
 * const youtubeIntegrator: ServiceIntegrator = {
 *   name: 'youtube',
 *   description: 'YouTube Data API integration',
 *   actions: [
 *     { name: 'search', description: 'Search videos', params: [...] }
 *   ],
 *   execute: async (action, params, eventBus, callbacks) => {
 *     try {
 *       const results = await youtubeApi.search(params.query);
 *       eventBus.emit(callbacks.onSuccess, results);
 *     } catch (error) {
 *       eventBus.emit(callbacks.onError, { code: 'API_ERROR', message: error.message });
 *     }
 *   }
 * };
 * ```
 */
export interface ServiceIntegrator {
  /** Unique integrator name (e.g., 'youtube', 'stripe') */
  name: string;
  /** Human-readable description */
  description: string;
  /** Category for grouping (e.g., 'media', 'payment', 'messaging') */
  category: string;
  /** Available actions this integrator supports */
  actions: IntegratorAction[];

  /**
   * Execute an action on this integrator.
   *
   * This method MUST:
   * 1. Perform the external API call
   * 2. Emit `callbacks.onSuccess` with result payload on success
   * 3. Emit `callbacks.onError` with IntegratorError on failure
   *
   * @param action - Action name to execute
   * @param params - Parameters for the action
   * @param eventBus - Event bus for emitting results
   * @param callbacks - Success/error event names
   * @param context - Optional execution context
   */
  execute(
    action: string,
    params: Record<string, unknown>,
    eventBus: EventBus,
    callbacks: IntegratorCallbacks,
    context?: ExecutionContext
  ): Promise<void>;

  /**
   * Validate action parameters before execution.
   * @param action - Action name
   * @param params - Parameters to validate
   * @returns Validation result with any errors
   */
  validateParams?(
    action: string,
    params: Record<string, unknown>
  ): { valid: boolean; errors?: string[] };

  /**
   * Check if the integrator is properly configured (e.g., API key present).
   * @returns Whether the integrator is ready to use
   */
  isConfigured?(): boolean;
}

// ============================================================================
// Integrator Registry Types
// ============================================================================

/**
 * Registry entry for an integrator.
 */
export interface IntegratorRegistryEntry {
  /** The integrator instance */
  integrator: ServiceIntegrator;
  /** Whether this is a built-in integrator */
  builtIn: boolean;
  /** Registration timestamp */
  registeredAt: Date;
}

/**
 * Integrator registry interface.
 */
export interface IntegratorRegistry {
  /**
   * Register an integrator.
   * @param integrator - Integrator to register
   * @param builtIn - Whether this is a built-in integrator
   */
  register(integrator: ServiceIntegrator, builtIn?: boolean): void;

  /**
   * Get an integrator by name.
   * @param name - Integrator name
   * @returns Integrator or undefined if not found
   */
  get(name: string): ServiceIntegrator | undefined;

  /**
   * Check if an integrator exists.
   * @param name - Integrator name
   */
  has(name: string): boolean;

  /**
   * List all registered integrator names.
   */
  list(): string[];

  /**
   * List integrators by category.
   * @param category - Category to filter by
   */
  listByCategory(category: string): ServiceIntegrator[];

  /**
   * Get all registered integrators.
   */
  getAll(): ServiceIntegrator[];
}
