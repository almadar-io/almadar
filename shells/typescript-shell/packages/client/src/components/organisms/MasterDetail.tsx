/**
 * MasterDetail Component
 *
 * A layout pattern that shows a list/table of entities.
 * This is a thin wrapper around DataTable that accepts master-detail specific props.
 *
 * When `entity` prop is provided without `data`, automatically fetches data
 * using the useEntityList hook.
 *
 * The "detail" part is typically rendered separately via another render_ui effect
 * to a sidebar or detail panel when an item is selected.
 */

import React from 'react';
import { DataTable, type DataTableProps } from './DataTable';
import { useEntityList } from '../../hooks/useEntityData';

export interface MasterDetailProps<T extends { id: string | number } = { id: string | number }> {
  /** Entity type name - when provided without data, auto-fetches from API */
  entity?: string;
  /** Fields to show in the master list (maps to DataTable columns) */
  masterFields?: readonly string[];
  /** Fields for detail view (passed through but typically handled by separate render_ui) */
  detailFields?: readonly string[];
  /** Data array - if not provided and entity is set, data is auto-fetched */
  data?: readonly T[] | T[];
  /** Loading state */
  loading?: boolean;
  /** Loading state alias */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Selection change handler */
  onSelectionChange?: (ids: (string | number)[]) => void;
  /** Additional class name */
  className?: string;
}

export function MasterDetail<T extends { id: string | number }>({
  entity,
  masterFields = [],
  detailFields: _detailFields, // Captured but not used here - detail handled separately
  data: externalData,
  loading: externalLoading,
  isLoading: externalIsLoading,
  error: externalError,
  onRowClick,
  onSelectionChange,
  className,
  ...rest
}: MasterDetailProps<T>): React.ReactElement {
  // Auto-fetch data when entity is provided but no external data
  const shouldAutoFetch = !!entity && !externalData;
  const { data: fetchedData, isLoading: fetchLoading, error: fetchError } = useEntityList(
    shouldAutoFetch ? entity : undefined,
    { skip: !shouldAutoFetch }
  );

  // Use external data if provided, otherwise use fetched data
  const data = externalData ?? (fetchedData as T[] | undefined);
  const loading = externalLoading ?? (shouldAutoFetch ? fetchLoading : false);
  const isLoading = externalIsLoading ?? (shouldAutoFetch ? fetchLoading : false);
  const error = externalError ?? (shouldAutoFetch ? fetchError : null);

  return (
    <DataTable<T>
      columns={masterFields}
      data={data}
      isLoading={loading || isLoading}
      error={error}
      onRowClick={onRowClick}
      onSelectionChange={onSelectionChange}
      className={className}
      emptyTitle={`No ${entity || 'items'} found`}
      emptyDescription={`Create your first ${entity?.toLowerCase() || 'item'} to get started.`}
      {...(rest as Partial<DataTableProps<T>>)}
    />
  );
}

MasterDetail.displayName = 'MasterDetail';

export default MasterDetail;
