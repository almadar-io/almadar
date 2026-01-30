/**
 * Shell Integrators Module
 *
 * Service integrators handle external API calls and emit results via EventBus.
 * This module provides types, registry, and helper functions for integrators.
 *
 * @packageDocumentation
 */

// ============================================================================
// Type Exports
// ============================================================================

export type {
  // Event Bus
  EventBus,
  // Action Types
  ActionParam,
  IntegratorAction,
  // Integrator Types
  IntegratorCallbacks,
  IntegratorError,
  ExecutionContext,
  ServiceIntegrator,
  // Registry Types
  IntegratorRegistryEntry,
  IntegratorRegistry,
} from './types.js';

// ============================================================================
// Registry Exports
// ============================================================================

export {
  // Registration
  registerIntegrator,
  unregisterIntegrator,
  clearRegistry,
  // Lookup
  getIntegrator,
  hasIntegrator,
  getIntegratorEntry,
  // Listing
  listIntegrators,
  listIntegratorsByCategory,
  getAllIntegrators,
  getIntegratorCount,
  // Object interface
  integratorRegistry,
  // Execution helpers
  executeIntegrator,
  callIntegrator,
} from './registry.js';

// ============================================================================
// Built-in Integrators
// ============================================================================

export {
  youtubeIntegrator,
  registerYouTubeIntegrator,
} from './youtube.js';

export {
  llmIntegrator,
  registerLLMIntegrator,
} from './llm.js';
