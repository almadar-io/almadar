'use client';

/**
 * useResolvedEntity Hook
 *
 * Normalizes entity data resolution into a single interface.
 * Organisms receive data through two paths:
 *   1. `data` prop — trait provides data directly via render-ui (local, preferred)
 *   2. `entity` prop — string name, resolved via useEntityList (auto-fetch)
 *
 * This hook abstracts the resolution so organisms don't need inline type checks.
 *
 * @packageDocumentation
 */

import { useMemo } from 'react';
import { useEntityList } from './useEntityData';

export interface ResolvedEntity<T> {
  /** Resolved data array */
  data: T[];
  /** True when data was provided directly via props (not fetched) */
  isLocal: boolean;
  /** Loading state — always false for local data */
  isLoading: boolean;
  /** Error state — always null for local data */
  error: Error | null;
}

/**
 * Resolves entity data from either a direct `data` prop or an `entity` string.
 *
 * When `data` is provided, it is used directly (isLocal: true).
 * When only `entity` (string) is provided, data is fetched via useEntityList.
 * Direct `data` always takes precedence over auto-fetch.
 *
 * @param entity - Entity name string for auto-fetch, or undefined
 * @param data - Direct data array from trait render-ui, or undefined
 * @returns Normalized { data, isLocal, isLoading, error }
 *
 * @example
 * ```tsx
 * function MyOrganism({ entity, data, isLoading, error }: MyProps) {
 *   const resolved = useResolvedEntity<Item>(entity, data);
 *   // resolved.data is always T[] regardless of source
 *   // resolved.isLocal tells you if data came from props
 * }
 * ```
 */
export function useResolvedEntity<T = Record<string, unknown>>(
  entity: string | undefined,
  data: readonly T[] | T[] | undefined,
): ResolvedEntity<T> {
  // Skip auto-fetch when data is provided directly
  const shouldFetch = !data && !!entity;
  const fetched = useEntityList<T>(entity, { skip: !shouldFetch });

  return useMemo(() => {
    if (data) {
      return {
        data: data as T[],
        isLocal: true,
        isLoading: false,
        error: null,
      };
    }

    return {
      data: fetched.data,
      isLocal: false,
      isLoading: fetched.isLoading,
      error: fetched.error,
    };
  }, [data, fetched.data, fetched.isLoading, fetched.error]);
}

export default useResolvedEntity;
