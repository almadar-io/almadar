/**
 * Entity Store
 *
 * Simple module-level store for runtime entities.
 * No providers needed - hooks import and use directly.
 *
 * NOTE: Mutations create new Map instances to trigger React rerenders
 * when using useSyncExternalStore.
 */

import {
    type EntityFilterValue,
    type FilterOperator,
    type EntityFilters,
    applyFilters,
    createFilter
} from './filtering';

// Re-export filtering types for convenience
export type { EntityFilterValue, FilterOperator, EntityFilters };
export { applyFilters, createFilter };

export interface Entity {
  id: string;
  type: string;
  [key: string]: unknown;
}

type Listener = () => void;

// Module-level state - use `let` so we can reassign to new Map on mutations
let entities = new Map<string, Entity>();
let filters = new Map<string, EntityFilters>();
const listeners = new Set<Listener>();
let idCounter = 0;

/**
 * Subscribe to store changes
 */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Notify all listeners of changes
 */
function notify(): void {
  listeners.forEach(listener => listener());
}

/**
 * Get all entities
 */
export function getEntities(): Map<string, Entity> {
  return entities;
}

/**
 * Get entity by ID
 */
export function getEntity(id: string): Entity | undefined {
  return entities.get(id);
}

/**
 * Get entities by type
 */
export function getByType(type: string | string[]): Entity[] {
  const types = Array.isArray(type) ? type : [type];
  return [...entities.values()].filter(e => types.includes(e.type));
}

/**
 * Get all entities as array
 */
export function getAllEntities(): Entity[] {
  return [...entities.values()];
}

/**
 * Get singleton entity by type (first of that type)
 */
export function getSingleton(type: string): Entity | undefined {
  return [...entities.values()].find(e => e.type === type);
}

/**
 * Spawn a new entity
 */
export function spawnEntity(config: { type: string; id?: string; [key: string]: unknown }): string {
  const id = config.id ?? `entity_${++idCounter}`;
  const entity: Entity = { ...config, id };
  // Create new Map to trigger React rerender
  entities = new Map(entities);
  entities.set(id, entity);
  notify();
  return id;
}

/**
 * Update an entity
 */
export function updateEntity(id: string, updates: Partial<Entity>): void {
  const entity = entities.get(id);
  if (entity) {
    // Create new Map to trigger React rerender
    entities = new Map(entities);
    entities.set(id, { ...entity, ...updates });
    notify();
  }
}

/**
 * Update singleton entity by type
 */
export function updateSingleton(type: string, updates: Partial<Entity>): void {
  const entity = getSingleton(type);
  if (entity) {
    updateEntity(entity.id, updates);
  }
}

/**
 * Remove an entity
 */
export function removeEntity(id: string): void {
  if (entities.has(id)) {
    // Create new Map to trigger React rerender
    entities = new Map(entities);
    entities.delete(id);
    notify();
  }
}

/**
 * Clear all entities
 */
export function clearEntities(): void {
  // Create new Map to trigger React rerender
  entities = new Map();
  notify();
}

// ============================================================================
// Filter Management
// ============================================================================

/**
 * Set a filter for an entity type
 * @param entityType - The entity type to filter (e.g., "Player", "Enemy")
 * @param field - The filter key (e.g., 'status' or 'date_from')
 * @param value - The filter value
 * @param operator - The comparison operator
 * @param targetField - The actual record field to compare (defaults to field)
 */
export function setFilter(
  entityType: string,
  field: string,
  value: unknown,
  operator: FilterOperator = 'eq',
  targetField?: string
): void {
  filters = new Map(filters);
  const entityFilters = new Map(filters.get(entityType) || []);
  entityFilters.set(field, createFilter(field, value, operator, targetField));
  filters.set(entityType, entityFilters);
  notify();
}

/**
 * Clear a specific filter
 */
export function clearFilter(entityType: string, field: string): void {
  const entityFilters = filters.get(entityType);
  if (entityFilters && entityFilters.has(field)) {
    filters = new Map(filters);
    const newFilters = new Map(entityFilters);
    newFilters.delete(field);
    filters.set(entityType, newFilters);
    notify();
  }
}

/**
 * Clear all filters for an entity type
 */
export function clearAllFilters(entityType: string): void {
  if (filters.has(entityType)) {
    filters = new Map(filters);
    filters.set(entityType, new Map());
    notify();
  }
}

/**
 * Get active filters for an entity type
 */
export function getFilters(entityType: string): EntityFilters {
  return filters.get(entityType) || new Map();
}

/**
 * Get entities by type with optional filtering
 */
export function getByTypeFiltered(type: string | string[]): Entity[] {
  const types = Array.isArray(type) ? type : [type];
  let result = [...entities.values()].filter(e => types.includes(e.type));

  // Apply filters for each type
  for (const t of types) {
    const typeFilters = filters.get(t);
    if (typeFilters && typeFilters.size > 0) {
      result = applyFilters(result, typeFilters);
    }
  }

  return result;
}

/**
 * Get snapshot for React useSyncExternalStore
 */
export function getSnapshot(): Map<string, Entity> {
  return entities;
}

/**
 * Get filter snapshot for React useSyncExternalStore
 */
export function getFilterSnapshot(): Map<string, EntityFilters> {
  return filters;
}
