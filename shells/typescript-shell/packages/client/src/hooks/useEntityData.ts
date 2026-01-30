/**
 * useEntityData Hook
 *
 * Provides data fetching utilities for entity lists.
 * This is a stub implementation for the design system that returns mock data.
 * In a real application, this would connect to a backend API.
 *
 * @packageDocumentation
 */

import { useState, useEffect } from "react";

/**
 * Query key factory for entity data queries.
 * Used with React Query for cache invalidation.
 */
export const entityDataKeys = {
  all: ['entities'] as const,
  lists: () => [...entityDataKeys.all, 'list'] as const,
  list: (entity: string, filters?: Record<string, unknown>) =>
    [...entityDataKeys.lists(), entity, filters] as const,
  details: () => [...entityDataKeys.all, 'detail'] as const,
  detail: (entity: string, id: string) =>
    [...entityDataKeys.details(), entity, id] as const,
};

/**
 * Generic entity data record type
 */
export type EntityDataRecord = Record<string, unknown>;

export interface UseEntityListOptions {
  /** Skip fetching */
  skip?: boolean;
}

export interface UseEntityListResult<T = Record<string, unknown>> {
  /** Fetched data */
  data: T[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Hook for fetching entity list data
 *
 * @param entity - Entity name to fetch
 * @param options - Fetch options
 * @returns Entity list data and loading states
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useEntityList('tasks');
 * ```
 */
export function useEntityList<T = Record<string, unknown>>(
  entity: string | undefined,
  options: UseEntityListOptions = {},
): UseEntityListResult<T> {
  const { skip = false } = options;
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(!skip && !!entity);
  const [error, setError] = useState<Error | null>(null);

  const refetch = () => {
    if (!entity || skip) return;
    setIsLoading(true);
    setError(null);
    // In a real implementation, this would fetch from an API
    // For the design system, we just simulate a short delay
    setTimeout(() => {
      setData([]);
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    if (skip || !entity) {
      setIsLoading(false);
      return;
    }

    refetch();
  }, [entity, skip]);

  return { data, isLoading, error, refetch };
}

/**
 * Hook for fetching a single entity by ID
 *
 * @param entity - Entity name
 * @param id - Entity ID
 * @returns Single entity data and loading states
 */
export function useEntity<T = Record<string, unknown>>(
  entity: string | undefined,
  id: string | undefined,
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!!entity && !!id);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!entity || !id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(null);
      setIsLoading(false);
    }, 100);
  }, [entity, id]);

  return { data, isLoading, error };
}

/**
 * Result type for useEntityDetail hook
 */
export interface UseEntityDetailResult<T = Record<string, unknown>> {
  /** Fetched entity data */
  data: T | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Hook for fetching entity detail by ID (alias for useEntity with refetch)
 *
 * @param entity - Entity name
 * @param id - Entity ID
 * @returns Entity detail data and loading states
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useEntityDetail('tasks', taskId);
 * ```
 */
export function useEntityDetail<T = Record<string, unknown>>(
  entity: string | undefined,
  id: string | undefined,
): UseEntityDetailResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!!entity && !!id);
  const [error, setError] = useState<Error | null>(null);

  const refetch = () => {
    if (!entity || !id) return;
    setIsLoading(true);
    setError(null);
    // In a real implementation, this would fetch from an API
    // For the design system, we just simulate a short delay
    setTimeout(() => {
      setData(null);
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    if (!entity || !id) {
      setIsLoading(false);
      return;
    }

    refetch();
  }, [entity, id]);

  return { data, isLoading, error, refetch };
}

/**
 * Pagination parameters for paginated queries
 */
export interface PaginationParams {
  /** Current page (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Search query */
  search?: string;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortDirection?: "asc" | "desc";
  /** Filters */
  filters?: Record<string, unknown>;
}

export interface UsePaginatedEntityListResult<T = Record<string, unknown>> {
  /** Fetched data */
  data: T[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Total item count */
  totalCount: number;
  /** Total pages */
  totalPages: number;
  /** Has next page */
  hasNextPage: boolean;
  /** Has previous page */
  hasPreviousPage: boolean;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Hook for fetching paginated entity list data
 *
 * @param entity - Entity name to fetch
 * @param params - Pagination parameters
 * @param options - Fetch options
 * @returns Paginated entity list data and loading states
 *
 * @example
 * ```tsx
 * const { data, isLoading, totalPages } = usePaginatedEntityList('tasks', { page: 1, pageSize: 10 });
 * ```
 */
export function usePaginatedEntityList<T = Record<string, unknown>>(
  entity: string | undefined,
  params: PaginationParams,
  options: UseEntityListOptions = {},
): UsePaginatedEntityListResult<T> {
  const { skip = false } = options;
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(!skip && !!entity);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const refetch = () => {
    if (!entity || skip) return;
    setIsLoading(true);
    setError(null);
    // In a real implementation, this would fetch from an API with pagination
    // For the design system, we just simulate a short delay
    setTimeout(() => {
      setData([]);
      setTotalCount(0);
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    if (skip || !entity) {
      setIsLoading(false);
      return;
    }

    refetch();
  }, [
    entity,
    params.page,
    params.pageSize,
    params.search,
    params.sortBy,
    params.sortDirection,
    skip,
  ]);

  const totalPages = Math.ceil(totalCount / params.pageSize) || 1;

  return {
    data,
    isLoading,
    error,
    totalCount,
    totalPages,
    hasNextPage: params.page < totalPages,
    hasPreviousPage: params.page > 1,
    refetch,
  };
}

export default useEntityList;
