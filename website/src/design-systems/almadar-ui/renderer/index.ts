/**
 * Shared Renderer Module
 *
 * Provides unified rendering logic for both Builder preview and compiled shells.
 * This is the core of the runtime unification - both systems use this same code.
 *
 * Key components:
 * - Types: Shared type definitions for effects, patterns, responses
 * - Pattern Resolver: Pattern → Component resolution
 * - Client Effect Executor: Execute clientEffects from server
 * - useClientEffects: React hook for effect execution
 * - Data Resolver: Entity data resolution with filtering
 * - Slot Definitions: Inline vs portal slot configuration
 *
 * @packageDocumentation
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // Effect types
  ClientEffect,
  NotifyOptions,
  ClientEffectExecutorConfig,

  // Pattern types
  PatternConfig,
  ResolvedPattern,

  // Response types
  EventResponse,

  // Slot types
  UISlot,
  SlotType,
  SlotDefinition,

  // Data types
  DataContext,
  DataResolution,
} from './types';

// ============================================================================
// Pattern Resolution
// ============================================================================

export {
  resolvePattern,
  isKnownPattern,
  getKnownPatterns,
  getPatternsByCategory,
  getPatternMapping,
  getPatternDefinition,
  initializePatternResolver,
  setComponentMapping,
  setPatternRegistry,
} from './pattern-resolver';

// ============================================================================
// Client Effect Execution
// ============================================================================

export {
  executeClientEffects,
  parseClientEffect,
  parseClientEffects,
  filterEffectsByType,
  getRenderUIEffects,
  getNavigateEffects,
  getNotifyEffects,
  getEmitEffects,
} from './client-effect-executor';

// ============================================================================
// React Hooks
// ============================================================================

export {
  useClientEffects,
  useClientEffectConfig,
  useClientEffectConfigOptional,
  ClientEffectConfigProvider,
  ClientEffectConfigContext,
} from './useClientEffects';

export type {
  UseClientEffectsOptions,
  UseClientEffectsResult,
} from './useClientEffects';

// ============================================================================
// Data Resolution
// ============================================================================

export {
  resolveEntityData,
  resolveEntityDataWithQuery,
  resolveEntityById,
  resolveEntityCount,
  hasEntities,
  createFetchedDataContext,
  mergeDataContexts,
} from './data-resolver';

// ============================================================================
// Slot Definitions
// ============================================================================

export {
  SLOT_DEFINITIONS,
  getSlotDefinition,
  isPortalSlot,
  isInlineSlot,
  getSlotsByType,
  getInlineSlots,
  getPortalSlots,
  ALL_SLOTS,
} from './slot-definitions';

// ============================================================================
// Offline Executor
// ============================================================================

export {
  OfflineExecutor,
  createOfflineExecutor,
  useOfflineExecutor,
} from './offline-executor';

export type {
  PendingSyncEffect,
  OfflineExecutorConfig,
  OfflineExecutorState,
  UseOfflineExecutorOptions,
  UseOfflineExecutorResult,
} from './offline-executor';

// ============================================================================
// Schema-Driven Navigation
// ============================================================================

export {
    // Context and Provider
    NavigationProvider,
    useNavigation,
    useNavigateTo,
    useNavigationState,
    useInitPayload,
    useActivePage,
    useNavigationId,
    // Path utilities
    matchPath,
    extractRouteParams,
    pathMatches,
    // Page finding utilities
    findPageByPath,
    findPageByName,
    getDefaultPage,
    getAllPages,
} from './navigation';

export type {
    NavigationState,
    NavigationContextValue,
    NavigationProviderProps,
} from './navigation';

// ============================================================================
// Initialization
// ============================================================================

export { initializePatterns } from './init';
