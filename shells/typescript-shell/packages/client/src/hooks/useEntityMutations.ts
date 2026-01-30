/**
 * useEntityMutations - Entity CRUD mutation hooks
 *
 * Provides create, update, and delete mutations for entities.
 * Used by trait hooks for persist_data effects.
 *
 * @deprecated For new code, prefer useOrbitalMutations which sends mutations
 * through the almadar events route. This ensures all mutations go through
 * trait state machines and enforce guards/effects.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * const { createEntity } = useEntityMutations('Task');
 *
 * // New (recommended):
 * const { createEntity } = useOrbitalMutations('Task', 'TaskManager');
 * ```
 *
 * @see useOrbitalMutations
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { entityDataKeys } from './useEntityData';
import { ENTITY_EVENTS, type OrbitalEventResponse } from './useOrbitalMutations';

/**
 * Convert entity name to API collection path
 * Uses the KFlow convention: {entity-name}-list
 * e.g., "Customer" -> "customer-list", "InventoryItem" -> "inventory-item-list"
 */
function entityToCollection(entityName: string): string {
  return entityName
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to kebab-case
    .toLowerCase() + '-list'; // KFlow API convention
}

export interface EntityMutationResult {
  id: string;
  [key: string]: unknown;
}

/**
 * Hook for creating entities
 */
export function useCreateEntity(entityName: string) {
  const queryClient = useQueryClient();
  const collection = entityToCollection(entityName);

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      console.log(`[useCreateEntity] Creating ${entityName}:`, data);
      const response = await apiClient.post<{ data: EntityMutationResult }>(
        `/${collection}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate list queries to refetch
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
    },
    onError: (error) => {
      console.error(`[useCreateEntity] Failed to create ${entityName}:`, error);
    },
  });
}

/**
 * Hook for updating entities
 */
export function useUpdateEntity(entityName: string) {
  const queryClient = useQueryClient();
  const collection = entityToCollection(entityName);

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      console.log(`[useUpdateEntity] Updating ${entityName} ${id}:`, data);
      const response = await apiClient.patch<{ data: EntityMutationResult }>(
        `/${collection}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.invalidateQueries({ queryKey: entityDataKeys.detail(entityName, variables.id) });
    },
    onError: (error) => {
      console.error(`[useUpdateEntity] Failed to update ${entityName}:`, error);
    },
  });
}

/**
 * Hook for deleting entities
 */
export function useDeleteEntity(entityName: string) {
  const queryClient = useQueryClient();
  const collection = entityToCollection(entityName);

  return useMutation({
    mutationFn: async (id: string) => {
      console.log(`[useDeleteEntity] Deleting ${entityName} ${id}`);
      await apiClient.delete(`/${collection}/${id}`);
      return { id };
    },
    onSuccess: (_, id) => {
      // Invalidate list and remove detail from cache
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.removeQueries({ queryKey: entityDataKeys.detail(entityName, id) });
    },
    onError: (error) => {
      console.error(`[useDeleteEntity] Failed to delete ${entityName}:`, error);
    },
  });
}

export interface UseEntityMutationsOptions {
  /**
   * If provided, mutations go through almadar events route instead of direct CRUD.
   * This is the recommended approach for Phase 7+ compliance.
   */
  orbitalName?: string;
  /**
   * Custom event names when using orbital-based mutations
   */
  events?: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

/**
 * Send mutation event to almadar events route
 */
async function sendOrbitalMutation(
  orbitalName: string,
  event: string,
  entityId: string | undefined,
  payload: Record<string, unknown>
): Promise<OrbitalEventResponse> {
  const response = await apiClient.post<OrbitalEventResponse>(
    `/orbitals/${orbitalName}/events`,
    { event, entityId, payload }
  );
  return response;
}

/**
 * Combined hook that provides all entity mutations
 * Used by trait hooks for persist_data effects
 *
 * @param entityName - The entity type name
 * @param options - Optional configuration including orbital-based mutations
 *
 * @deprecated For new code, prefer useOrbitalMutations directly
 */
export function useEntityMutations(entityName: string, options?: UseEntityMutationsOptions) {
  const queryClient = useQueryClient();

  // If orbitalName provided, use almadar events route
  const useOrbitalRoute = !!options?.orbitalName;
  const events = {
    create: options?.events?.create || ENTITY_EVENTS.CREATE,
    update: options?.events?.update || ENTITY_EVENTS.UPDATE,
    delete: options?.events?.delete || ENTITY_EVENTS.DELETE,
  };

  // Legacy direct CRUD mutations
  const createMutation = useCreateEntity(entityName);
  const updateMutation = useUpdateEntity(entityName);
  const deleteMutation = useDeleteEntity(entityName);

  // Almadar-based mutations
  const orbitalCreateMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return sendOrbitalMutation(options!.orbitalName!, events.create, undefined, {
        data,
        entityType: entityName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
    },
  });

  const orbitalUpdateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      return sendOrbitalMutation(options!.orbitalName!, events.update, id, {
        data,
        entityType: entityName,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.invalidateQueries({
        queryKey: entityDataKeys.detail(entityName, variables.id),
      });
    },
  });

  const orbitalDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return sendOrbitalMutation(options!.orbitalName!, events.delete, id, {
        entityType: entityName,
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.removeQueries({ queryKey: entityDataKeys.detail(entityName, id) });
    },
  });

  // Select which mutations to use based on options
  const activeMutations = {
    create: useOrbitalRoute ? orbitalCreateMutation : createMutation,
    update: useOrbitalRoute ? orbitalUpdateMutation : updateMutation,
    delete: useOrbitalRoute ? orbitalDeleteMutation : deleteMutation,
  };

  return {
    // Async functions that can be called directly
    // Accepts either (data) or (entityName, data) for compiler compatibility
    createEntity: async (entityOrData: string | Record<string, unknown>, data?: Record<string, unknown>) => {
      const actualData = typeof entityOrData === 'string' ? data : entityOrData;
      if (!actualData) {
        console.warn('[useEntityMutations] Cannot create entity without data');
        return;
      }
      return activeMutations.create.mutateAsync(actualData as Record<string, unknown>);
    },
    updateEntity: async (id: string | undefined, data: Record<string, unknown>) => {
      if (!id) {
        console.warn('[useEntityMutations] Cannot update entity without ID');
        return;
      }
      return activeMutations.update.mutateAsync({ id, data });
    },
    deleteEntity: async (id: string | undefined) => {
      if (!id) {
        console.warn('[useEntityMutations] Cannot delete entity without ID');
        return;
      }
      return activeMutations.delete.mutateAsync(id);
    },
    // Mutation states for UI feedback
    isCreating: activeMutations.create.isPending,
    isUpdating: activeMutations.update.isPending,
    isDeleting: activeMutations.delete.isPending,
    createError: activeMutations.create.error,
    updateError: activeMutations.update.error,
    deleteError: activeMutations.delete.error,
  };
}
