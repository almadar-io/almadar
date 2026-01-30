/**
 * useEntities Hook
 *
 * React hook to access the entity store.
 * Uses useSyncExternalStore for efficient updates.
 */

import { useSyncExternalStore, useCallback } from 'react';
import {
  subscribe,
  getSnapshot,
  getEntity,
  getByType,
  getAllEntities,
  getSingleton,
  spawnEntity,
  updateEntity,
  updateSingleton,
  removeEntity,
  clearEntities,
} from '../stores/entityStore';
import type { Entity } from '../stores/entityStore';

// Re-export Entity type
export type { Entity };

/**
 * Hook to access all entities
 */
export function useEntities() {
  const entities = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    entities,
    getEntity,
    getByType,
    getAllEntities,
    getSingleton,
    spawnEntity,
    updateEntity,
    updateSingleton,
    removeEntity,
    clearEntities,
  };
}

/**
 * Hook to access a specific entity by ID
 */
export function useEntity(id: string): Entity | undefined {
  const entities = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return entities.get(id);
}

/**
 * Hook to access entities of a specific type
 */
export function useEntitiesByType(type: string): Entity[] {
  const entities = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return [...entities.values()].filter(e => e.type === type);
}

/**
 * Hook to access a singleton entity by type
 */
export function useSingletonEntity<T extends Entity = Entity>(type: string): T | undefined {
  const entities = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return [...entities.values()].find(e => e.type === type) as T | undefined;
}

/**
 * Hook for Player entity (convenience)
 */
export function usePlayer() {
  const player = useSingletonEntity('Player');
  const update = useCallback((updates: Partial<Entity>) => {
    if (player) updateEntity(player.id, updates);
  }, [player?.id]);

  return { player, updatePlayer: update };
}

/**
 * Hook for Physics entity (convenience)
 */
export function usePhysics() {
  const physics = useSingletonEntity('Physics');
  const update = useCallback((updates: Partial<Entity>) => {
    if (physics) updateEntity(physics.id, updates);
  }, [physics?.id]);

  return { physics, updatePhysics: update };
}

/**
 * Hook for Input entity (convenience)
 */
export function useInput() {
  const input = useSingletonEntity('Input');
  const update = useCallback((updates: Partial<Entity>) => {
    if (input) updateEntity(input.id, updates);
  }, [input?.id]);

  return { input, updateInput: update };
}

// Re-export store functions for direct use
export {
  spawnEntity,
  updateEntity,
  updateSingleton,
  removeEntity,
  clearEntities,
  getEntity,
  getByType,
  getAllEntities,
  getSingleton,
};
