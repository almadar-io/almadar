/**
 * useOrbitalMutations - Event-based entity mutations via almadar events route
 *
 * This hook provides entity mutations that go through the almadar events route
 * instead of direct CRUD API calls. This ensures all mutations:
 * 1. Go through trait state machines
 * 2. Enforce guards
 * 3. Execute all trait effects (including persist)
 *
 * This is the Phase 7 replacement for direct CRUD mutations.
 *
 * @example
 * ```tsx
 * const { createEntity, updateEntity, deleteEntity } = useOrbitalMutations('Task', 'TaskManager');
 *
 * // Create - sends ENTITY_CREATE event to orbital
 * await createEntity({ title: 'New Task', status: 'pending' });
 *
 * // Update - sends ENTITY_UPDATE event to orbital
 * await updateEntity(taskId, { status: 'completed' });
 *
 * // Delete - sends ENTITY_DELETE event to orbital
 * await deleteEntity(taskId);
 * ```
 *
 * @packageDocumentation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { entityDataKeys } from './useEntityData';

/**
 * Standard events for entity mutations
 * These are handled by orbitals with CRUD-capable traits
 */
export const ENTITY_EVENTS = {
  CREATE: 'ENTITY_CREATE',
  UPDATE: 'ENTITY_UPDATE',
  DELETE: 'ENTITY_DELETE',
} as const;

export interface OrbitalEventPayload {
  event: string;
  payload?: Record<string, unknown>;
  entityId?: string;
}

export interface OrbitalEventResponse {
  success: boolean;
  transitioned: boolean;
  states: Record<string, string>;
  emittedEvents: Array<{ event: string; payload?: unknown }>;
  error?: string;
}

/**
 * Send an event to an almadar via the events route
 */
async function sendOrbitalEvent(
  orbitalName: string,
  eventPayload: OrbitalEventPayload
): Promise<OrbitalEventResponse> {
  const response = await apiClient.post<OrbitalEventResponse>(
    `/orbitals/${orbitalName}/events`,
    eventPayload
  );
  return response;
}

/**
 * Hook for event-based entity mutations via almadar events route
 *
 * @param entityName - The entity type name (for cache invalidation)
 * @param orbitalName - The almadar to send events to
 * @param options - Optional configuration
 */
export function useOrbitalMutations(
  entityName: string,
  orbitalName: string,
  options?: {
    /** Custom event names for create/update/delete */
    events?: {
      create?: string;
      update?: string;
      delete?: string;
    };
    /** Enable debug logging */
    debug?: boolean;
  }
) {
  const queryClient = useQueryClient();
  const events = {
    create: options?.events?.create || ENTITY_EVENTS.CREATE,
    update: options?.events?.update || ENTITY_EVENTS.UPDATE,
    delete: options?.events?.delete || ENTITY_EVENTS.DELETE,
  };

  const log = (message: string, data?: unknown) => {
    if (options?.debug) {
      console.log(`[useOrbitalMutations:${orbitalName}] ${message}`, data ?? '');
    }
  };

  /**
   * Create mutation - sends create event to orbital
   */
  const createMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>): Promise<OrbitalEventResponse> => {
      log('Creating entity', data);
      return sendOrbitalEvent(orbitalName, {
        event: events.create,
        payload: { data, entityType: entityName },
      });
    },
    onSuccess: (response) => {
      log('Create succeeded', response);
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
    },
    onError: (error) => {
      console.error(`[useOrbitalMutations] Create failed:`, error);
    },
  });

  /**
   * Update mutation - sends update event to orbital
   */
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }): Promise<OrbitalEventResponse> => {
      log(`Updating entity ${id}`, data);
      return sendOrbitalEvent(orbitalName, {
        event: events.update,
        entityId: id,
        payload: { data, entityType: entityName },
      });
    },
    onSuccess: (response, variables) => {
      log('Update succeeded', response);
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.invalidateQueries({
        queryKey: entityDataKeys.detail(entityName, variables.id),
      });
    },
    onError: (error) => {
      console.error(`[useOrbitalMutations] Update failed:`, error);
    },
  });

  /**
   * Delete mutation - sends delete event to orbital
   */
  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<OrbitalEventResponse> => {
      log(`Deleting entity ${id}`);
      return sendOrbitalEvent(orbitalName, {
        event: events.delete,
        entityId: id,
        payload: { entityType: entityName },
      });
    },
    onSuccess: (response, id) => {
      log('Delete succeeded', response);
      queryClient.invalidateQueries({ queryKey: entityDataKeys.list(entityName) });
      queryClient.removeQueries({ queryKey: entityDataKeys.detail(entityName, id) });
    },
    onError: (error) => {
      console.error(`[useOrbitalMutations] Delete failed:`, error);
    },
  });

  return {
    // Async functions
    createEntity: async (data: Record<string, unknown>) => {
      return createMutation.mutateAsync(data);
    },
    updateEntity: async (id: string | undefined, data: Record<string, unknown>) => {
      if (!id) {
        console.warn('[useOrbitalMutations] Cannot update without ID');
        return;
      }
      return updateMutation.mutateAsync({ id, data });
    },
    deleteEntity: async (id: string | undefined) => {
      if (!id) {
        console.warn('[useOrbitalMutations] Cannot delete without ID');
        return;
      }
      return deleteMutation.mutateAsync(id);
    },

    // Mutation objects for fine-grained control
    createMutation,
    updateMutation,
    deleteMutation,

    // Aggregate states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,

    // Errors
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}

/**
 * Send a custom event to an orbital
 * For non-CRUD operations that go through trait state machines
 */
export function useSendOrbitalEvent(orbitalName: string) {
  const mutation = useMutation({
    mutationFn: async (payload: OrbitalEventPayload): Promise<OrbitalEventResponse> => {
      return sendOrbitalEvent(orbitalName, payload);
    },
  });

  return {
    sendEvent: async (event: string, payload?: Record<string, unknown>, entityId?: string) => {
      return mutation.mutateAsync({ event, payload, entityId });
    },
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
}
