/**
 * Integrator Registry
 *
 * Central registry for service integrators.
 * Provides type-safe lookup and management of integrators.
 *
 * @packageDocumentation
 */

import type {
  ServiceIntegrator,
  IntegratorRegistry,
  IntegratorRegistryEntry,
  EventBus,
} from './types.js';

// ============================================================================
// Registry Implementation
// ============================================================================

/**
 * Internal storage for registered integrators.
 */
const integrators: Map<string, IntegratorRegistryEntry> = new Map();

/**
 * Register an integrator in the registry.
 *
 * @param integrator - The integrator to register
 * @param builtIn - Whether this is a built-in integrator (default: false)
 * @throws Error if an integrator with the same name is already registered
 *
 * @example
 * ```typescript
 * registerIntegrator(youtubeIntegrator);
 * registerIntegrator(customIntegrator, false);
 * ```
 */
export function registerIntegrator(
  integrator: ServiceIntegrator,
  builtIn: boolean = false
): void {
  if (integrators.has(integrator.name)) {
    throw new Error(
      `Integrator "${integrator.name}" is already registered. Use a unique name.`
    );
  }

  integrators.set(integrator.name, {
    integrator,
    builtIn,
    registeredAt: new Date(),
  });
}

/**
 * Get an integrator by name.
 *
 * @param name - The integrator name
 * @returns The integrator or undefined if not found
 *
 * @example
 * ```typescript
 * const youtube = getIntegrator('youtube');
 * if (youtube) {
 *   await youtube.execute('search', { query: 'cats' }, eventBus, callbacks);
 * }
 * ```
 */
export function getIntegrator(name: string): ServiceIntegrator | undefined {
  return integrators.get(name)?.integrator;
}

/**
 * Check if an integrator is registered.
 *
 * @param name - The integrator name
 * @returns True if the integrator exists
 */
export function hasIntegrator(name: string): boolean {
  return integrators.has(name);
}

/**
 * List all registered integrator names.
 *
 * @returns Array of integrator names
 *
 * @example
 * ```typescript
 * const names = listIntegrators(); // ['youtube', 'stripe', 'twilio']
 * ```
 */
export function listIntegrators(): string[] {
  return Array.from(integrators.keys());
}

/**
 * List integrators filtered by category.
 *
 * @param category - The category to filter by (e.g., 'media', 'payment')
 * @returns Array of integrators in the category
 *
 * @example
 * ```typescript
 * const paymentIntegrators = listIntegratorsByCategory('payment');
 * ```
 */
export function listIntegratorsByCategory(
  category: string
): ServiceIntegrator[] {
  return Array.from(integrators.values())
    .filter((entry) => entry.integrator.category === category)
    .map((entry) => entry.integrator);
}

/**
 * Get all registered integrators.
 *
 * @returns Array of all integrators
 */
export function getAllIntegrators(): ServiceIntegrator[] {
  return Array.from(integrators.values()).map((entry) => entry.integrator);
}

/**
 * Get registry entry details for an integrator.
 *
 * @param name - The integrator name
 * @returns Registry entry or undefined
 */
export function getIntegratorEntry(
  name: string
): IntegratorRegistryEntry | undefined {
  return integrators.get(name);
}

/**
 * Unregister an integrator.
 *
 * @param name - The integrator name to remove
 * @returns True if the integrator was removed
 */
export function unregisterIntegrator(name: string): boolean {
  return integrators.delete(name);
}

/**
 * Clear all registered integrators.
 * Useful for testing.
 */
export function clearRegistry(): void {
  integrators.clear();
}

/**
 * Get count of registered integrators.
 */
export function getIntegratorCount(): number {
  return integrators.size;
}

// ============================================================================
// Registry Object (for interface compatibility)
// ============================================================================

/**
 * Registry object implementing IntegratorRegistry interface.
 * Use this when you need an object-oriented interface.
 */
export const integratorRegistry: IntegratorRegistry = {
  register: registerIntegrator,
  get: getIntegrator,
  has: hasIntegrator,
  list: listIntegrators,
  listByCategory: listIntegratorsByCategory,
  getAll: getAllIntegrators,
};

// ============================================================================
// Execution Helpers
// ============================================================================

/**
 * Execute an action on a registered integrator (callback pattern).
 *
 * This is a convenience function that looks up the integrator and executes.
 *
 * @param serviceName - The integrator/service name
 * @param action - The action to execute
 * @param params - Parameters for the action
 * @param eventBus - Event bus for callbacks
 * @param callbacks - Success/error event names
 * @throws Error if integrator is not registered
 *
 * @example
 * ```typescript
 * await executeIntegrator(
 *   'youtube',
 *   'search',
 *   { query: 'typescript tutorial' },
 *   eventBus,
 *   { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
 * );
 * ```
 */
export async function executeIntegrator(
  serviceName: string,
  action: string,
  params: Record<string, unknown>,
  eventBus: EventBus,
  callbacks: { onSuccess: string; onError: string }
): Promise<void> {
  const integrator = getIntegrator(serviceName);

  if (!integrator) {
    eventBus.emit(callbacks.onError, {
      code: 'INTEGRATOR_NOT_FOUND',
      message: `Integrator "${serviceName}" is not registered`,
    });
    return;
  }

  // Validate params if the integrator supports it
  if (integrator.validateParams) {
    const validation = integrator.validateParams(action, params);
    if (!validation.valid) {
      eventBus.emit(callbacks.onError, {
        code: 'VALIDATION_ERROR',
        message: `Invalid parameters: ${validation.errors?.join(', ')}`,
      });
      return;
    }
  }

  // Check configuration if the integrator supports it
  if (integrator.isConfigured && !integrator.isConfigured()) {
    eventBus.emit(callbacks.onError, {
      code: 'NOT_CONFIGURED',
      message: `Integrator "${serviceName}" is not properly configured`,
    });
    return;
  }

  // Execute the action
  await integrator.execute(action, params, eventBus, callbacks);
}

/**
 * Call an integrator action and return the result as a Promise.
 *
 * This is a Promise-based wrapper around the callback-based integrator interface.
 * Use this when you need direct request-response semantics instead of event-based.
 *
 * @param serviceName - The integrator/service name
 * @param action - The action to execute
 * @param params - Parameters for the action
 * @returns Promise resolving to the result or rejecting with error
 * @throws Error if integrator is not found or execution fails
 *
 * @example
 * ```typescript
 * const results = await callIntegrator('youtube', 'search', { query: 'cats' });
 * console.log(results); // Array of search results
 * ```
 */
export async function callIntegrator(
  serviceName: string,
  action: string,
  params: Record<string, unknown>
): Promise<unknown> {
  const integrator = getIntegrator(serviceName);

  if (!integrator) {
    throw new Error(`Integrator "${serviceName}" is not registered`);
  }

  // Validate params if the integrator supports it
  if (integrator.validateParams) {
    const validation = integrator.validateParams(action, params);
    if (!validation.valid) {
      throw new Error(`Invalid parameters: ${validation.errors?.join(', ')}`);
    }
  }

  // Check configuration if the integrator supports it
  if (integrator.isConfigured && !integrator.isConfigured()) {
    throw new Error(`Integrator "${serviceName}" is not properly configured`);
  }

  // Create a one-shot event bus that resolves/rejects the promise
  return new Promise((resolve, reject) => {
    // Generate unique callback event names
    const successEvent = `__internal_success_${Date.now()}_${Math.random()}`;
    const errorEvent = `__internal_error_${Date.now()}_${Math.random()}`;

    // Create a minimal event bus that captures the result
    // Only emit is used by integrators, on/once are no-ops
    const oneShot: { emit: (event: string, payload?: unknown) => void; on: () => () => void; once: () => void } = {
      emit: (event: string, payload?: unknown) => {
        if (event === successEvent) {
          resolve(payload);
        } else if (event === errorEvent) {
          const error = payload as { code?: string; message?: string } | undefined;
          reject(new Error(error?.message || 'Integrator execution failed'));
        }
      },
      // No-op implementations - not used for one-shot calls
      on: () => () => {},
      once: () => {},
    };

    // Execute with internal callbacks
    integrator
      .execute(action, params, oneShot, { onSuccess: successEvent, onError: errorEvent })
      .catch(reject);
  });
}
