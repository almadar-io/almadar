import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { Button, Input, Badge, Checkbox, Spinner } from '../atoms';
import { EmptyState, Pagination } from '../molecules';
import { useEntityList, usePaginatedEntityList, type PaginationParams } from '../../hooks/useEntityData';
import { useEventBus, type KFlowEvent } from '../../hooks/useEventBus';
import { useQuerySingleton } from '../../hooks/useQuerySingleton';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Eye,
  LucideIcon,
} from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

/**
 * Normalize column input - accepts either Column objects or string field names.
 * String field names are converted to Column objects with auto-generated headers.
 * Accepts readonly arrays for compatibility with generated const arrays.
 */
function normalizeColumns<T>(columns: readonly Column<T>[] | readonly string[]): Column<T>[] {
  return columns.map((col) => {
    if (typeof col === 'string') {
      // Convert string field name to Column object
      // Generate header by converting camelCase/snake_case to Title Case
      const header = col
        .replace(/([A-Z])/g, ' $1') // camelCase to spaces
        .replace(/_/g, ' ') // snake_case to spaces
        .replace(/^\w/, (c) => c.toUpperCase()) // capitalize first letter
        .trim();
      return { key: col, header } as Column<T>;
    }
    return col;
  });
}

export interface RowAction<T> {
  label: string;
  icon?: LucideIcon;
  onClick: (row: T) => void;
  variant?: 'default' | 'danger';
  show?: (row: T) => boolean;
  /** Event name for testability (data-event attribute) */
  event?: string;
}

export interface DataTableProps<T extends { id: string | number }> {
  /** Columns can be Column objects or simple string field names - accepts readonly for generated const arrays */
  columns: readonly Column<T>[] | readonly string[];
  /** Data array - primary prop for data. Accepts readonly or mutable arrays, and unknown for generated components */
  data?: readonly T[] | T[] | readonly unknown[] | unknown[] | unknown;
  /** Entity name for auto-fetch OR data array (backwards compatible) */
  entity?: string | readonly T[] | T[];
  /** Item actions from generated code - maps to rowActions */
  itemActions?: readonly {
    label: string;
    event?: string;
    /** Navigation URL - supports template interpolation like "/products/{{id}}" or "/products/:id" */
    navigatesTo?: string;
    /** Action used by generated code - alternative to event */
    action?: string;
    /** Placement accepts string for compatibility with generated code */
    placement?: 'row' | 'bulk' | string;
    icon?: LucideIcon;
    /** Variant accepts all button variants for compatibility */
    variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger' | string;
  }[];
  /** Loading state indicator */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; onClick: () => void };

  // Selection
  selectable?: boolean;
  selectedIds?: readonly (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;

  // Sorting
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  // Pagination (manual control)
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };

  // Server-side pagination (automatic when enabled)
  enablePagination?: boolean;
  /** Items per page for automatic pagination (default: 20) */
  defaultPageSize?: number;
  /** Show total count in pagination */
  showTotal?: boolean;

  // Search
  searchable?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;

  // Row click navigation
  onRowClick?: (row: T) => void;

  // Row actions
  rowActions?: readonly RowAction<T>[];

  // Bulk actions
  bulkActions?: ReadonlyArray<{
    label: string;
    icon?: LucideIcon;
    onClick: (selectedRows: T[]) => void;
    variant?: 'default' | 'danger';
  }>;

  // Header actions
  headerActions?: React.ReactNode;

  /**
   * Query singleton binding for filter/sort state.
   * When provided, syncs with the query singleton for filtering and sorting.
   * Example: "@TaskQuery"
   */
  query?: string;

  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  entity,
  itemActions,
  isLoading = false,
  error: externalError,
  emptyIcon,
  emptyTitle = 'No items found',
  emptyDescription = 'No items to display.',
  emptyAction,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  sortBy: externalSortBy,
  sortDirection: externalSortDirection = 'asc',
  onSort,
  pagination,
  enablePagination = false,
  defaultPageSize = 20,
  showTotal = true,
  searchable = false,
  searchValue = '',
  onSearch,
  searchPlaceholder = 'Search...',
  onRowClick,
  rowActions: externalRowActions,
  bulkActions,
  headerActions,
  query,
  className,
}: DataTableProps<T>) {
  const [openActionMenu, setOpenActionMenu] = useState<string | number | null>(null);
  const eventBus = useEventBus();
  const navigate = useNavigate();

  // Query singleton for filter/sort state
  const queryState = useQuerySingleton(query);

  // Server-side pagination state - initialize from query singleton if available
  const [paginationParams, setPaginationParams] = useState<PaginationParams>(() => ({
    page: 1,
    pageSize: defaultPageSize,
    search: queryState?.search ?? searchValue,
    sortBy: queryState?.sortField ?? externalSortBy,
    sortDirection: queryState?.sortDirection ?? externalSortDirection,
    filters: queryState?.filters,
  }));

  // Sync with query singleton changes (e.g., from FilterGroup or SearchInput)
  useEffect(() => {
    if (queryState) {
      setPaginationParams((prev) => ({
        ...prev,
        search: queryState.search,
        sortBy: queryState.sortField ?? undefined,
        sortDirection: queryState.sortDirection ?? 'asc',
        filters: queryState.filters,
        page: 1, // Reset to page 1 when filters change
      }));
    }
  }, [queryState?.search, queryState?.sortField, queryState?.sortDirection, JSON.stringify(queryState?.filters)]);

  // Listen for UI:SEARCH events from event bus
  useEffect(() => {
    const handleSearch = (event: KFlowEvent) => {
      // Only handle if no query binding (avoid double-handling when query singleton is used)
      if (query) return;
      const term = (event.payload?.searchTerm as string) ?? '';
      setPaginationParams((prev) => ({ ...prev, search: term, page: 1 }));
    };

    const handleClearSearch = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setPaginationParams((prev) => ({ ...prev, search: '', page: 1 }));
    };

    const handleFilter = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      const { field, value } = event.payload ?? {};
      if (field) {
        setPaginationParams((prev) => ({
          ...prev,
          filters: { ...prev.filters, [field as string]: value },
          page: 1,
        }));
      }
    };

    const handleClearFilters = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setPaginationParams((prev) => ({ ...prev, filters: {}, search: '', page: 1 }));
    };

    const unsubSearch = eventBus.on('UI:SEARCH', handleSearch);
    const unsubClear = eventBus.on('UI:CLEAR_SEARCH', handleClearSearch);
    const unsubFilter = eventBus.on('UI:FILTER', handleFilter);
    const unsubClearFilters = eventBus.on('UI:CLEAR_FILTERS', handleClearFilters);

    return () => {
      unsubSearch();
      unsubClear();
      unsubFilter();
      unsubClearFilters();
    };
  }, [eventBus, query]);

  // Sync external search value with pagination params
  useEffect(() => {
    if (searchValue !== paginationParams.search) {
      setPaginationParams((prev) => ({ ...prev, search: searchValue, page: 1 }));
    }
  }, [searchValue]);

  // Determine if entity is a string name (for auto-fetch) or data array (backwards compatible)
  const isEntityName = typeof entity === 'string';
  const entityName = isEntityName ? entity : undefined;

  // Auto-fetch data when entity is a string name and no external data provided
  const shouldAutoFetch = isEntityName && !data;

  // Use paginated or unpaginated hook based on enablePagination
  const paginatedResult = usePaginatedEntityList(
    shouldAutoFetch && enablePagination ? entityName : undefined,
    paginationParams,
    { skip: !shouldAutoFetch || !enablePagination }
  );

  const unpaginatedResult = useEntityList(
    shouldAutoFetch && !enablePagination ? entityName : undefined,
    {
      skip: !shouldAutoFetch || enablePagination,
    }
  );

  // Choose which result to use
  const queryResult = enablePagination ? paginatedResult : unpaginatedResult;

  // Use external data if provided, otherwise use fetched data or entity data (backwards compat)
  const rawData = data ?? (enablePagination ? paginatedResult.data : unpaginatedResult.data) ?? entity ?? [];

  // Apply client-side filtering when data is passed via props (not auto-fetched)
  // This enables search filtering in preview mode (OrbitalRuntime)
  const filteredData = useMemo(() => {
    const dataArray = (Array.isArray(rawData) ? rawData : []) as T[];

    // Only apply client-side filtering if:
    // 1. We're NOT auto-fetching (data comes from props)
    // 2. There's a search term
    if (!shouldAutoFetch && paginationParams.search?.trim()) {
      const searchLower = paginationParams.search.toLowerCase();
      return dataArray.filter((item) => {
        // Search all string/number fields
        return Object.values(item as Record<string, unknown>).some((value) => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    return dataArray;
  }, [rawData, shouldAutoFetch, paginationParams.search]);

  const items = filteredData as readonly T[];

  // Pagination info for server-side pagination
  const serverPaginationInfo = enablePagination ? {
    page: paginationParams.page,
    totalPages: paginatedResult.totalPages,
    total: paginatedResult.totalCount,
  } : null;

  // Combine loading and error states
  const fetchLoading = queryResult.isLoading;
  const fetchError = queryResult.error;
  const isLoadingCombined = isLoading || fetchLoading;
  const error = externalError || (fetchError instanceof Error ? fetchError : fetchError ? new Error(String(fetchError)) : null);

  // Handler for server-side pagination
  const handleServerPageChange = useCallback((newPage: number) => {
    setPaginationParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleServerPageSizeChange = useCallback((newPageSize: number) => {
    setPaginationParams((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  }, []);

  // Handle server-side sort
  const handleServerSort = useCallback((key: string) => {
    setPaginationParams((prev) => ({
      ...prev,
      sortBy: key,
      sortDirection: prev.sortBy === key && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  }, []);

  // Convert itemActions to rowActions format if provided
  const rowActions = externalRowActions ?? (itemActions?.filter(a => a.placement !== 'bulk').map(action => ({
    label: action.label,
    icon: action.icon,
    variant: action.variant,
    event: action.event, // Preserve event name for testability
    onClick: (row: T) => {
      // Handle navigation if navigatesTo is defined
      if (action.navigatesTo) {
        // Replace :id or {{id}} with actual row id
        const url = action.navigatesTo
          .replace(/:id\b/g, String((row as { id: string | number }).id))
          .replace(/\{\{id\}\}/g, String((row as { id: string | number }).id));
        navigate(url);
        return;
      }
      // Dispatch event via event bus if defined (for trait state machine integration)
      if (action.event) {
        eventBus.emit(`UI:${action.event}`, { row, entity: entityName });
      }
    },
  })) as RowAction<T>[] | undefined);

  // Find VIEW action or navigatesTo action from itemActions for row click behavior
  const viewAction = itemActions?.find(a => a.event === 'VIEW' || a.navigatesTo);

  // Handle row click - trigger VIEW event if available, or use custom onRowClick
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    } else if (viewAction) {
      // Handle navigation if navigatesTo is defined
      if (viewAction.navigatesTo) {
        const url = viewAction.navigatesTo
          .replace(/:id\b/g, String((row as { id: string | number }).id))
          .replace(/\{\{id\}\}/g, String((row as { id: string | number }).id));
        navigate(url);
        return;
      }
      // Auto-trigger VIEW event when row is clicked
      eventBus.emit('UI:VIEW', { row, entity: entityName });
    }
  };

  // Determine if rows are clickable
  const isRowClickable = !!onRowClick || !!viewAction;

  // Normalize columns - convert string field names to Column objects
  const normalizedColumns: Column<T>[] = useMemo(() => normalizeColumns<T>(columns), [columns]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(items.map((row) => row.id));
    }
  };

  const handleSelectRow = (id: string | number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange?.([...selectedIds, id]);
    }
  };

  const handleSort = (key: string) => {
    // Use server-side sort when enablePagination is true
    if (enablePagination && shouldAutoFetch) {
      handleServerSort(key);
      return;
    }
    // Otherwise use external sort handler
    if (!onSort) return;
    const currentSortBy = externalSortBy;
    const currentSortDirection = externalSortDirection;
    const newDirection = currentSortBy === key && currentSortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, newDirection);
  };

  // Determine current sort state for UI
  const sortBy = enablePagination && shouldAutoFetch ? paginationParams.sortBy : externalSortBy;
  const sortDirection = enablePagination && shouldAutoFetch ? paginationParams.sortDirection : externalSortDirection;

  const selectedRows = useMemo(
    () => items.filter((row) => selectedIds.includes(row.id)),
    [items, selectedIds]
  );

  return (
    <div className={cn('bg-white border-2 border-black rounded-none overflow-hidden', className)}>
      {/* Header */}
      {(searchable || bulkActions || headerActions) && (
        <div className="px-4 py-3 border-b-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="search"
                  value={searchValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Call external handler if provided
                    onSearch?.(value);
                    // Also emit UI:SEARCH event for internal filtering (preview mode)
                    eventBus.emit('UI:SEARCH', { searchTerm: value });
                  }}
                  placeholder={searchPlaceholder}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            )}

            {/* Bulk actions */}
            {bulkActions && selectedIds.length > 0 && (
              <div className="flex items-center gap-2 pl-0 sm:pl-3 border-l-0 sm:border-l border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {selectedIds.length} selected
                </span>
                <div className="flex flex-wrap gap-2">
                  {bulkActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant={action.variant === 'danger' ? 'danger' : 'secondary'}
                      size="sm"
                      leftIcon={action.icon && <action.icon className="h-4 w-4" />}
                      onClick={() => action.onClick(selectedRows)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex sm:ml-auto">
            {headerActions}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-100 border-b-2 border-black">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    // @ts-ignore - indeterminate not in types
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {normalizedColumns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider whitespace-nowrap',
                    col.sortable && 'cursor-pointer select-none hover:bg-neutral-200'
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortBy === col.key && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
              {rowActions && <th className="w-12 px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoadingCombined ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="px-4 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="lg" />
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="px-4 py-12 text-center text-red-500"
                >
                  Error: {error.message}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="px-4 py-12"
                >
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyTitle}
                    description={emptyDescription}
                    actionLabel={emptyAction?.label}
                    onAction={emptyAction?.onClick}
                  />
                </td>
              </tr>
            ) : (
              items.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-b border-black last:border-0 hover:bg-neutral-50 transition-colors',
                    selectedIds.includes(row.id) && 'bg-neutral-100 font-medium',
                    isRowClickable && 'cursor-pointer'
                  )}
                  onClick={() => isRowClickable && handleRowClick(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {normalizedColumns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap sm:whitespace-normal">
                      {col.render
                        ? col.render(row[col.key as keyof T], row, rowIndex)
                        : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3 relative">
                      <button
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionMenu(openActionMenu === row.id ? null : row.id);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </button>
                      {openActionMenu === row.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionMenu(null);
                            }}
                          />
                          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                            {rowActions
                              .filter((action) => !action.show || action.show(row))
                              .map((action, idx) => (
                                <button
                                  key={idx}
                                  data-event={action.event}
                                  data-testid={action.event ? `action-${action.event}` : undefined}
                                  className={cn(
                                    'w-full flex items-center gap-2 px-4 py-2 text-sm',
                                    action.variant === 'danger'
                                      ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                    setOpenActionMenu(null);
                                  }}
                                >
                                  {action.icon && <action.icon className="h-4 w-4" />}
                                  {action.label}
                                </button>
                              ))}
                          </div>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Pagination */}
      {pagination && (
        <div className="px-4 py-3 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Server-side Pagination (automatic when enablePagination is true) */}
      {enablePagination && serverPaginationInfo && serverPaginationInfo.totalPages > 1 && (
        <div className="px-4 py-3 border-t-2 border-black">
          <Pagination
            currentPage={serverPaginationInfo.page}
            totalPages={serverPaginationInfo.totalPages}
            onPageChange={handleServerPageChange}
            showTotal={showTotal}
            totalItems={serverPaginationInfo.total}
            showPageSize
            pageSize={paginationParams.pageSize}
            onPageSizeChange={handleServerPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
