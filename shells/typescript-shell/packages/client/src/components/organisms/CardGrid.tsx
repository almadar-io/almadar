/**
 * CardGrid Component
 *
 * A responsive grid specifically designed for card layouts.
 * Uses CSS Grid auto-fit for automatic responsive columns.
 *
 * When `entity` prop is provided without `data`, automatically fetches data
 * using the useEntityList hook. Supports server-side pagination and search.
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { useEntityList, usePaginatedEntityList, type PaginationParams } from '../../hooks/useEntityData';
import { useEventBus, type KFlowEvent } from '../../hooks/useEventBus';
import { useQuerySingleton } from '../../hooks/useQuerySingleton';
import { Button } from '../atoms';
import { Pagination } from '../molecules/Pagination';

export type CardGridGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Action configuration for card items (schema-driven)
 */
export interface CardItemAction {
  /** Action button label */
  label: string;
  /** Event to dispatch on click (schema metadata) */
  event?: string;
  /** Navigation URL - supports template interpolation like "/products/{{row.id}}" */
  navigatesTo?: string;
  /** Callback on click */
  onClick?: (item: unknown) => void;
  /** Action used by generated code - alternative to event */
  action?: string;
  /** Action placement - accepts string for compatibility with generated code */
  placement?: 'card' | 'footer' | 'row' | string;
  /** Button variant - accepts string for compatibility with generated code */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | string;
}

export interface CardGridProps {
  /** Minimum width of each card (default: 280px) */
  minCardWidth?: number;
  /** Maximum number of columns */
  maxCols?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Gap between cards */
  gap?: CardGridGap;
  /** Align cards vertically in their cells */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Custom class name */
  className?: string;
  /** Children elements (cards) - optional when using entity/data props */
  children?: React.ReactNode;
  /** Entity type for data-bound usage */
  entity?: string;
  /** Field names to display - accepts readonly for generated const arrays */
  fieldNames?: readonly string[];
  /** Alias for fieldNames - used by generated code */
  columns?: readonly string[];
  /** Data array for data-bound usage - accepts readonly for generated const arrays */
  data?: readonly unknown[] | unknown;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Actions for each card item (schema-driven) */
  itemActions?: readonly CardItemAction[];
  /** Callback when a card is clicked */
  onCardClick?: (item: unknown) => void;
  /** Enable server-side pagination */
  enablePagination?: boolean;
  /** Items per page (default: 20) */
  pageSize?: number;
  /** Show total count in pagination */
  showTotal?: boolean;
  /** Filter configuration for entity data */
  filter?: { field: string; value?: string };
  /**
   * Query singleton binding for filter/sort state.
   * When provided, syncs with the query singleton for filtering and sorting.
   * Example: "@TaskQuery"
   */
  query?: string;
}

const gapStyles: Record<CardGridGap, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

/**
 * CardGrid - Responsive card collection layout
 *
 * Can be used in two ways:
 * 1. With children: <CardGrid><Card>...</Card></CardGrid>
 * 2. With data: <CardGrid entity="Task" fieldNames={['title']} data={tasks} />
 *
 * Supports server-side pagination when enablePagination is true.
 */
export const CardGrid: React.FC<CardGridProps> = ({
  minCardWidth = 280,
  maxCols,
  gap = 'md',
  alignItems = 'stretch',
  className,
  children,
  entity,
  fieldNames,
  columns,
  data: externalData,
  isLoading: externalLoading,
  error: externalError,
  itemActions,
  onCardClick,
  enablePagination = false,
  pageSize: defaultPageSize = 20,
  showTotal = true,
  filter,
  query,
}) => {
  const eventBus = useEventBus();
  const navigate = useNavigate();

  // Query singleton for filter/sort state
  const queryState = useQuerySingleton(query);

  // Support both fieldNames and columns (alias)
  const effectiveFieldNames = fieldNames ?? columns;

  // Pagination state - initialize from query singleton if available
  const [paginationParams, setPaginationParams] = useState<PaginationParams>(() => ({
    page: 1,
    pageSize: defaultPageSize,
    search: queryState?.search ?? '',
    sortBy: queryState?.sortField ?? undefined,
    sortDirection: queryState?.sortDirection ?? 'asc',
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

  // Listen for search and filter events from the event bus
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

  // Build the grid-template-columns value
  const gridTemplateColumns = `repeat(auto-fit, minmax(min(${minCardWidth}px, 100%), 1fr))`;

  // Auto-fetch data when entity is provided but no external data
  const shouldAutoFetch = !!entity && !externalData && !children;

  // Use paginated or unpaginated hook based on enablePagination
  const paginatedResult = usePaginatedEntityList(
    shouldAutoFetch && enablePagination ? entity : undefined,
    paginationParams,
    { skip: !shouldAutoFetch || !enablePagination }
  );

  const unpaginatedResult = useEntityList(
    shouldAutoFetch && !enablePagination ? entity : undefined,
    {
      skip: !shouldAutoFetch || enablePagination,
    }
  );

  // Choose which result to use
  const queryResult = enablePagination ? paginatedResult : unpaginatedResult;

  // Use external data if provided, otherwise use fetched data
  const data = externalData ?? (enablePagination ? paginatedResult.data : unpaginatedResult.data);
  const isLoading = externalLoading ?? (shouldAutoFetch ? queryResult.isLoading : false);
  const error = externalError ?? (shouldAutoFetch ? queryResult.error : null);

  // Debug logging to trace data flow
  console.log(`%c[CardGrid] entity: ${entity}`, 'color: orange;');
  console.log('[CardGrid] shouldAutoFetch:', shouldAutoFetch);
  console.log('[CardGrid] externalData:', externalData);
  console.log('[CardGrid] data:', data);
  if (Array.isArray(data) && data.length > 0) {
    console.log('[CardGrid] First record:', JSON.stringify(data[0]));
    console.log('[CardGrid] All statuses:', data.map((d: any) => d.status));
  }

  // Pagination info (only available when using paginated hook)
  const paginationInfo = enablePagination ? {
    page: paginationParams.page,
    totalPages: paginatedResult.totalPages,
    total: paginatedResult.totalCount,
  } : null;

  // Normalize data to array
  const rawData = Array.isArray(data) ? data : data ? [data] : [];

  // For non-paginated mode with external data, apply client-side filtering
  const normalizedData = useMemo(() => {
    // When using server-side pagination/search, data is already filtered
    if (enablePagination || shouldAutoFetch) {
      return rawData;
    }

    // Client-side filtering for external data
    if (!paginationParams.search?.trim()) {
      return rawData;
    }
    const lowerSearch = paginationParams.search.toLowerCase();
    return rawData.filter((item) => {
      const itemData = item as Record<string, unknown>;
      return Object.values(itemData).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearch);
      });
    });
  }, [rawData, paginationParams.search, enablePagination, shouldAutoFetch]);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setPaginationParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  // Handle page size change
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPaginationParams((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  }, []);

  // Render data-bound cards if data is provided
  const renderContent = () => {
    if (children) {
      return children;
    }

    // Show loading state
    if (isLoading) {
      return (
        <div className="col-span-full text-center py-8 text-gray-500">
          Loading {entity || 'items'}...
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="col-span-full text-center py-8 text-red-500">
          Error loading {entity || 'items'}: {error.message}
        </div>
      );
    }

    if (normalizedData.length === 0) {
      return (
        <div className="col-span-full text-center py-8 text-gray-500">
          No {entity || 'items'} found
        </div>
      );
    }

    return normalizedData.map((item, index) => {
      const itemData = item as Record<string, unknown>;
      const id = (itemData.id as string) || String(index);
      const fields = effectiveFieldNames || Object.keys(itemData).slice(0, 3);

      // Handle action click - navigate, dispatch event, or call callback
      const handleActionClick = (action: CardItemAction) => (e: React.MouseEvent) => {
        e.stopPropagation();

        // Handle navigation with template interpolation
        if (action.navigatesTo) {
          const url = action.navigatesTo.replace(/\{\{row\.(\w+)\}\}/g, (_, field) => {
            const value = itemData[field];
            return value !== undefined && value !== null ? String(value) : '';
          });
          navigate(url);
          return;
        }

        if (action.event) {
          eventBus.emit(`UI:${action.event}`, { row: itemData, entity });
        }
        if (action.onClick) {
          action.onClick(itemData);
        }
      };

      return (
        <div
          key={id}
          className={cn(
            "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm",
            onCardClick && "cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          )}
          onClick={() => onCardClick?.(itemData)}
        >
          {fields.map((field) => {
            const value = itemData[field];
            if (value === undefined || value === null) return null;
            return (
              <div key={field} className="mb-2 last:mb-0">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                  {field}
                </span>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {String(value)}
                </div>
              </div>
            );
          })}
          {/* Item Actions */}
          {itemActions && itemActions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              {itemActions.map((action, actionIdx) => {
                // Cast variant to Button's expected type, defaulting to 'secondary'
                const buttonVariant = (action.variant || 'secondary') as 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';
                return (
                  <Button
                    key={actionIdx}
                    variant={buttonVariant}
                    size="sm"
                    onClick={handleActionClick(action)}
                  >
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'grid',
          gapStyles[gap],
          alignStyles[alignItems],
          maxCols === 1 && 'grid-cols-1',
          maxCols === 2 && 'sm:grid-cols-2',
          maxCols === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
          maxCols === 4 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          maxCols === 5 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
          maxCols === 6 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
          className
        )}
        style={!maxCols ? { gridTemplateColumns } : undefined}
      >
        {renderContent()}
      </div>

      {/* Pagination controls */}
      {enablePagination && paginationInfo && paginationInfo.totalPages > 1 && (
        <Pagination
          currentPage={paginationInfo.page}
          totalPages={paginationInfo.totalPages}
          onPageChange={handlePageChange}
          showTotal={showTotal}
          totalItems={paginationInfo.total}
          showPageSize
          pageSize={paginationParams.pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

CardGrid.displayName = 'CardGrid';
