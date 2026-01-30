/**
 * useQuerySingleton Hook
 *
 * Provides query state management for search/filter components.
 * This is a stub implementation for the design system.
 * In a real application, this would connect to the almadar query singleton.
 *
 * @packageDocumentation
 */

import { useState, useCallback, useMemo } from 'react';

/**
 * Query state for filters and search
 */
export interface QueryState {
  search?: string;
  filters?: Record<string, unknown>;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Query singleton entity reference
 */
export interface QuerySingletonEntity {
  name: string;
  fields: Record<string, unknown>;
}

/**
 * Query singleton result type
 */
export interface QuerySingletonResult {
  state: QueryState;
  setState: (state: Partial<QueryState>) => void;
  reset: () => void;
}

export interface QuerySingletonState {
  /** Current search term */
  search: string;
  /** Set search term */
  setSearch: (value: string) => void;
  /** Current filters */
  filters: Record<string, unknown>;
  /** Set a filter value */
  setFilter: (key: string, value: unknown) => void;
  /** Clear all filters */
  clearFilters: () => void;
  /** Current sort field */
  sortField?: string;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Set sort */
  setSort: (field: string, direction: 'asc' | 'desc') => void;
}

// In-memory store for query singletons (keyed by query name)
const queryStores = new Map<string, {
  search: string;
  filters: Record<string, unknown>;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  listeners: Set<() => void>;
}>();

function getOrCreateStore(query: string) {
  if (!queryStores.has(query)) {
    queryStores.set(query, {
      search: '',
      filters: {},
      sortField: undefined,
      sortDirection: undefined,
      listeners: new Set(),
    });
  }
  return queryStores.get(query)!;
}

/**
 * Hook for accessing a query singleton by name
 *
 * @param query - Query singleton name (e.g., "@TaskQuery")
 * @returns Query singleton state or null if no query provided
 *
 * @example
 * ```tsx
 * const queryState = useQuerySingleton('@TaskQuery');
 *
 * // Use search state
 * queryState?.search
 * queryState?.setSearch('new search term')
 * ```
 */
export function useQuerySingleton(query?: string): QuerySingletonState | null {
  const [, forceUpdate] = useState({});

  // Return null if no query provided
  if (!query) {
    return null;
  }

  const store = useMemo(() => getOrCreateStore(query), [query]);

  // Subscribe to updates
  useMemo(() => {
    const listener = () => forceUpdate({});
    store.listeners.add(listener);
    return () => {
      store.listeners.delete(listener);
    };
  }, [store]);

  const notifyListeners = useCallback(() => {
    store.listeners.forEach((listener) => listener());
  }, [store]);

  const setSearch = useCallback((value: string) => {
    store.search = value;
    notifyListeners();
  }, [store, notifyListeners]);

  const setFilter = useCallback((key: string, value: unknown) => {
    store.filters = { ...store.filters, [key]: value };
    notifyListeners();
  }, [store, notifyListeners]);

  const clearFilters = useCallback(() => {
    store.filters = {};
    store.search = '';
    notifyListeners();
  }, [store, notifyListeners]);

  const setSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    store.sortField = field;
    store.sortDirection = direction;
    notifyListeners();
  }, [store, notifyListeners]);

  return {
    search: store.search,
    setSearch,
    filters: store.filters,
    setFilter,
    clearFilters,
    sortField: store.sortField,
    sortDirection: store.sortDirection,
    setSort,
  };
}

/**
 * Parse a query binding string to extract the query singleton name
 *
 * @param binding - Binding string like "@TaskQuery.search" or "@TaskQuery"
 * @returns Object with query name and optional field path
 *
 * @example
 * ```tsx
 * parseQueryBinding('@TaskQuery.search')
 * // { query: 'TaskQuery', field: 'search' }
 *
 * parseQueryBinding('@TaskQuery')
 * // { query: 'TaskQuery', field: undefined }
 * ```
 */
export function parseQueryBinding(binding: string): { query: string; field?: string } {
  // Remove @ prefix if present
  const cleaned = binding.startsWith('@') ? binding.slice(1) : binding;
  const parts = cleaned.split('.');

  return {
    query: parts[0],
    field: parts.length > 1 ? parts.slice(1).join('.') : undefined,
  };
}

export default useQuerySingleton;
