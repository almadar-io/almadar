/**
 * useEntityData Hook
 *
 * Provides data fetching utilities for entity lists and details.
 * Uses a pluggable EntityDataContext when available (e.g., builder runtime
 * bridges FetchedDataContext). Falls back to stubs when no provider is
 * present (Storybook, standalone design system).
 *
 * @packageDocumentation
 */

import { useState, useEffect, useContext, createContext, useMemo } from "react";
import type { ReactNode } from "react";
import React from "react";

// ============================================================================
// EntityDataContext — pluggable data adapter
// ============================================================================

export interface EntityDataAdapter {
  /** Get all records for an entity */
  getData: (entity: string) => Record<string, unknown>[];
  /** Get a single record by entity name and ID */
  getById: (entity: string, id: string) => Record<string, unknown> | undefined;
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Current error */
  error: string | null;
}

const EntityDataContext = createContext<EntityDataAdapter | null>(null);

/**
 * Provider that bridges a host app's data source to useEntityList/useEntity hooks.
 *
 * @example
 * ```tsx
 * // In builder runtime
 * const fetchedData = useFetchedData();
 * const adapter = {
 *   getData: fetchedData.getData,
 *   getById: fetchedData.getById,
 *   isLoading: fetchedData.loading,
 *   error: fetchedData.error,
 * };
 * <EntityDataProvider adapter={adapter}>
 *   {children}
 * </EntityDataProvider>
 * ```
 */
export function EntityDataProvider({
  adapter,
  children,
}: {
  adapter: EntityDataAdapter;
  children: ReactNode;
}) {
  return React.createElement(
    EntityDataContext.Provider,
    { value: adapter },
    children,
  );
}

/**
 * Access the entity data adapter (null if no provider).
 */
export function useEntityDataAdapter(): EntityDataAdapter | null {
  return useContext(EntityDataContext);
}

// ============================================================================
// Query key factory
// ============================================================================

export const entityDataKeys = {
  all: ['entities'] as const,
  lists: () => [...entityDataKeys.all, 'list'] as const,
  list: (entity: string, filters?: Record<string, unknown>) =>
    [...entityDataKeys.lists(), entity, filters] as const,
  details: () => [...entityDataKeys.all, 'detail'] as const,
  detail: (entity: string, id: string) =>
    [...entityDataKeys.details(), entity, id] as const,
};

// ============================================================================
// Types
// ============================================================================

export type EntityDataRecord = Record<string, unknown>;

export interface UseEntityListOptions {
  /** Skip fetching */
  skip?: boolean;
}

export interface UseEntityListResult<T = Record<string, unknown>> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseEntityDetailResult<T = Record<string, unknown>> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface UsePaginatedEntityListResult<T = Record<string, unknown>> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook for fetching entity list data.
 * Uses EntityDataContext if available, otherwise falls back to stub.
 */
export function useEntityList<T = Record<string, unknown>>(
  entity: string | undefined,
  options: UseEntityListOptions = {},
): UseEntityListResult<T> {
  const { skip = false } = options;
  const adapter = useContext(EntityDataContext);

  // Adapter path: return data from provider
  const adapterData = useMemo(() => {
    if (!adapter || !entity || skip) return [] as T[];
    return adapter.getData(entity) as T[];
  }, [adapter, entity, skip, adapter?.isLoading]);

  // Stub path: fallback when no provider
  const [stubData, setStubData] = useState<T[]>([]);
  const [stubLoading, setStubLoading] = useState(!skip && !!entity && !adapter);
  const [stubError, setStubError] = useState<Error | null>(null);

  useEffect(() => {
    if (adapter || skip || !entity) {
      setStubLoading(false);
      return;
    }
    setStubLoading(true);
    const t = setTimeout(() => {
      setStubData([]);
      setStubLoading(false);
    }, 100);
    return () => clearTimeout(t);
  }, [entity, skip, adapter]);

  if (adapter) {
    return {
      data: adapterData,
      isLoading: adapter.isLoading,
      error: adapter.error ? new Error(adapter.error) : null,
      refetch: () => {},
    };
  }

  return { data: stubData, isLoading: stubLoading, error: stubError, refetch: () => {} };
}

/**
 * Hook for fetching a single entity by ID.
 * Uses EntityDataContext if available, otherwise falls back to stub.
 */
export function useEntity<T = Record<string, unknown>>(
  entity: string | undefined,
  id: string | undefined,
): { data: T | null; isLoading: boolean; error: Error | null } {
  const adapter = useContext(EntityDataContext);

  const adapterData = useMemo(() => {
    if (!adapter || !entity || !id) return null;
    return (adapter.getById(entity, id) as T) ?? null;
  }, [adapter, entity, id, adapter?.isLoading]);

  // Stub path
  const [stubData, setStubData] = useState<T | null>(null);
  const [stubLoading, setStubLoading] = useState(!!entity && !!id && !adapter);
  const [stubError, setStubError] = useState<Error | null>(null);

  useEffect(() => {
    if (adapter || !entity || !id) {
      setStubLoading(false);
      return;
    }
    setStubLoading(true);
    const t = setTimeout(() => {
      setStubData(null);
      setStubLoading(false);
    }, 100);
    return () => clearTimeout(t);
  }, [entity, id, adapter]);

  if (adapter) {
    return {
      data: adapterData,
      isLoading: adapter.isLoading,
      error: adapter.error ? new Error(adapter.error) : null,
    };
  }

  return { data: stubData, isLoading: stubLoading, error: stubError };
}

/**
 * Hook for fetching entity detail by ID (alias for useEntity with refetch).
 * Uses EntityDataContext if available, otherwise falls back to stub.
 */
export function useEntityDetail<T = Record<string, unknown>>(
  entity: string | undefined,
  id: string | undefined,
): UseEntityDetailResult<T> {
  const result = useEntity<T>(entity, id);
  return { ...result, refetch: () => {} };
}

/**
 * Hook for fetching paginated entity list data.
 * Uses EntityDataContext if available (client-side pagination), otherwise falls back to stub.
 */
export function usePaginatedEntityList<T = Record<string, unknown>>(
  entity: string | undefined,
  params: PaginationParams,
  options: UseEntityListOptions = {},
): UsePaginatedEntityListResult<T> {
  const { skip = false } = options;
  const adapter = useContext(EntityDataContext);

  // Adapter path: client-side pagination over full dataset
  const adapterResult = useMemo(() => {
    if (!adapter || !entity || skip) {
      return { data: [] as T[], totalCount: 0 };
    }
    const all = adapter.getData(entity) as T[];
    const start = (params.page - 1) * params.pageSize;
    const paged = all.slice(start, start + params.pageSize);
    return { data: paged, totalCount: all.length };
  }, [adapter, entity, skip, params.page, params.pageSize, adapter?.isLoading]);

  // Stub path
  const [stubData, setStubData] = useState<T[]>([]);
  const [stubLoading, setStubLoading] = useState(!skip && !!entity && !adapter);
  const [stubError, setStubError] = useState<Error | null>(null);
  const [stubTotalCount, setStubTotalCount] = useState(0);

  useEffect(() => {
    if (adapter || skip || !entity) {
      setStubLoading(false);
      return;
    }
    setStubLoading(true);
    const t = setTimeout(() => {
      setStubData([]);
      setStubTotalCount(0);
      setStubLoading(false);
    }, 100);
    return () => clearTimeout(t);
  }, [entity, params.page, params.pageSize, params.search, params.sortBy, params.sortDirection, skip, adapter]);

  const totalCount = adapter ? adapterResult.totalCount : stubTotalCount;
  const totalPages = Math.ceil(totalCount / params.pageSize) || 1;

  if (adapter) {
    return {
      data: adapterResult.data,
      isLoading: adapter.isLoading,
      error: adapter.error ? new Error(adapter.error) : null,
      totalCount: adapterResult.totalCount,
      totalPages,
      hasNextPage: params.page < totalPages,
      hasPreviousPage: params.page > 1,
      refetch: () => {},
    };
  }

  return {
    data: stubData,
    isLoading: stubLoading,
    error: stubError,
    totalCount: stubTotalCount,
    totalPages,
    hasNextPage: params.page < totalPages,
    hasPreviousPage: params.page > 1,
    refetch: () => {},
  };
}

export default useEntityList;
