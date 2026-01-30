/**
 * Hooks barrel export
 */

// EventBus hooks for trait communication
export { useEventBus, useEventListener, useEmitEvent } from './useEventBus';
export type { KFlowEvent, EventListener, Unsubscribe, EventBusContextType } from './event-bus-types';

// UI Slot hooks for trait-driven UI rendering
export {
  useUISlotManager,
  DEFAULT_SLOTS,
  type UISlot,
  type SlotAnimation,
  type SlotContent,
  type RenderUIConfig,
  type SlotChangeCallback,
  type UISlotManager,
} from './useUISlots';

// UI Events hook for bridging UI events to state machines
export { useUIEvents, useSelectedEntity } from './useUIEvents';

// Entity data hooks for schema-driven components
export {
  useEntityList,
  useEntityDetail,
  useEntity,
  entityDataKeys,
  type EntityDataRecord,
  type UseEntityListOptions,
  type UseEntityListResult,
  type UseEntityDetailResult,
} from './useEntityData';

// Query singleton hook for filter/search state management
export {
  useQuerySingleton,
  parseQueryBinding,
  type QueryState,
  type QuerySingletonEntity,
  type QuerySingletonResult,
  type QuerySingletonState,
} from './useQuerySingleton';

// Entity mutations (legacy direct CRUD)
export {
  useEntityMutations,
  useCreateEntity,
  useUpdateEntity,
  useDeleteEntity,
  type EntityMutationResult,
  type UseEntityMutationsOptions,
} from './useEntityMutations';

// Almadar mutations (event-based, recommended)
export {
  useOrbitalMutations,
  useSendOrbitalEvent,
  ENTITY_EVENTS,
  type OrbitalEventPayload,
  type OrbitalEventResponse,
} from './useOrbitalMutations';

// Entity store hooks (for game/runtime entities)
export {
  useEntities,
  useEntity as useEntityById,
  useEntitiesByType,
  useSingletonEntity,
  usePlayer,
  usePhysics,
  useInput,
  spawnEntity,
  updateEntity,
  updateSingleton,
  removeEntity,
  clearEntities,
  getEntity,
  getByType,
  getAllEntities,
  getSingleton,
  type Entity,
} from './useEntities';
