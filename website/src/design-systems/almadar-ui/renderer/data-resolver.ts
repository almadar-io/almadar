/**
 * Data Resolver
 *
 * Resolves entity data for pattern rendering.
 * Supports multiple data sources with priority:
 * 1. Server-provided data (from EventResponse.data)
 * 2. Entity store (Builder in-memory mock data)
 * 3. Empty array (fallback)
 *
 * Used by both Builder's PatternRenderer and compiled shell's UISlotRenderer.
 *
 * @packageDocumentation
 */

import type { DataContext, DataResolution } from './types';

// ============================================================================
// Data Resolution
// ============================================================================

/**
 * Resolve entity data from available sources.
 *
 * Priority:
 * 1. fetchedData (from server response) - highest priority
 * 2. entityStore (Builder mock data)
 * 3. Empty array (fallback)
 *
 * @param entityName - Name of the entity to resolve data for
 * @param context - Data context with available sources
 * @returns Resolved data with loading state
 *
 * @example
 * ```typescript
 * const { data, loading } = resolveEntityData('Task', {
 *   fetchedData: response.data,
 *   entityStore: mockStore
 * });
 * ```
 */
export function resolveEntityData(
  entityName: string,
  context: DataContext
): DataResolution {
  // 1. Server-provided data (highest priority)
  if (context.fetchedData && entityName in context.fetchedData) {
    const data = context.fetchedData[entityName];
    return {
      data: Array.isArray(data) ? data : [],
      loading: false,
    };
  }

  // 2. Entity store (Builder mock data)
  if (context.entityStore) {
    try {
      const data = context.entityStore.getRecords(entityName);
      return {
        data: Array.isArray(data) ? data : [],
        loading: false,
      };
    } catch (error) {
      console.warn(
        `[DataResolver] Error getting records from entity store for "${entityName}":`,
        error
      );
    }
  }

  // 3. Fallback - no data available
  // Return empty but indicate loading if we expect data to come
  const hasAnySources = context.fetchedData || context.entityStore;
  return {
    data: [],
    loading: !hasAnySources, // Only loading if no sources configured
  };
}

/**
 * Resolve entity data with query filtering.
 *
 * Applies query singleton filters if available.
 *
 * @param entityName - Name of the entity
 * @param queryRef - Optional query reference for filtering
 * @param context - Data context
 * @returns Filtered resolved data
 */
export function resolveEntityDataWithQuery(
  entityName: string,
  queryRef: string | undefined,
  context: DataContext
): DataResolution {
  // First resolve the base data
  const resolution = resolveEntityData(entityName, context);

  // If no query ref or no query singleton, return unfiltered
  if (!queryRef || !context.querySingleton) {
    return resolution;
  }

  // Apply query filters
  try {
    const filters = context.querySingleton.getFilters(queryRef);
    const filteredData = applyFilters(resolution.data, filters);
    return {
      ...resolution,
      data: filteredData,
    };
  } catch (error) {
    console.warn(
      `[DataResolver] Error applying query filters for "${queryRef}":`,
      error
    );
    return resolution;
  }
}

// ============================================================================
// Filtering
// ============================================================================

/**
 * Apply filters to a data array.
 * Simple equality-based filtering.
 */
function applyFilters(
  data: unknown[],
  filters: Record<string, unknown>
): unknown[] {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  }

  return data.filter((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }

    const record = item as Record<string, unknown>;
    return Object.entries(filters).every(([key, value]) => {
      // Handle undefined/null filter values (match all)
      if (value === undefined || value === null) {
        return true;
      }

      // Get the record value
      const recordValue = record[key];

      // Handle array values (check if recordValue is in the array)
      if (Array.isArray(value)) {
        return value.includes(recordValue);
      }

      // Handle string patterns (simple contains)
      if (typeof value === 'string' && typeof recordValue === 'string') {
        if (value.startsWith('*') && value.endsWith('*')) {
          const pattern = value.slice(1, -1);
          return recordValue.toLowerCase().includes(pattern.toLowerCase());
        }
      }

      // Equality comparison
      return recordValue === value;
    });
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get a single entity record by ID.
 */
export function resolveEntityById(
  entityName: string,
  id: string | number,
  context: DataContext
): unknown | null {
  const { data } = resolveEntityData(entityName, context);

  return data.find((item) => {
    if (typeof item !== 'object' || item === null) {
      return false;
    }
    const record = item as Record<string, unknown>;
    return record.id === id || record._id === id;
  }) ?? null;
}

/**
 * Get the count of entities matching criteria.
 */
export function resolveEntityCount(
  entityName: string,
  context: DataContext,
  filters?: Record<string, unknown>
): number {
  const { data } = resolveEntityData(entityName, context);

  if (filters) {
    return applyFilters(data, filters).length;
  }

  return data.length;
}

/**
 * Check if any entities exist for a given entity name.
 */
export function hasEntities(
  entityName: string,
  context: DataContext
): boolean {
  const { data } = resolveEntityData(entityName, context);
  return data.length > 0;
}

/**
 * Create a data context from fetched data only.
 * Convenience function for compiled shells.
 */
export function createFetchedDataContext(
  data: Record<string, unknown[]>
): DataContext {
  return { fetchedData: data };
}

/**
 * Merge multiple data contexts.
 * Later contexts take precedence.
 */
export function mergeDataContexts(...contexts: DataContext[]): DataContext {
  const merged: DataContext = {};

  for (const context of contexts) {
    if (context.fetchedData) {
      merged.fetchedData = {
        ...merged.fetchedData,
        ...context.fetchedData,
      };
    }
    if (context.entityStore) {
      merged.entityStore = context.entityStore;
    }
    if (context.querySingleton) {
      merged.querySingleton = context.querySingleton;
    }
  }

  return merged;
}
