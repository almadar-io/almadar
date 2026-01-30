/**
 * List Organism Component
 *
 * A beautifully designed, scannable list view.
 *
 * Design inspiration: Linear, Notion, Apple Reminders
 * - Soft, harmonious color palette
 * - Refined typography with proper hierarchy
 * - Subtle shadows and depth
 * - Delightful hover micro-interactions
 * - Elegant status indicators
 *
 * Almadar Component Interface Compliance:
 * - Entity binding with auto-fetch when entity is a string
 * - Event emission via useEventBus (UI:* events)
 * - Event listening for UI:SEARCH and UI:CLEAR_SEARCH
 * - isLoading and error state props
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Calendar, MoreHorizontal, Package, ChevronRight, Pencil, Eye } from 'lucide-react';
import { Typography, Checkbox, Divider } from '../atoms';
import { HStack } from '../atoms/Stack';
import { Menu, type MenuItem } from '../molecules/Menu';
import { EmptyState } from '../molecules/EmptyState';
import { LoadingState } from '../molecules/LoadingState';
import { ErrorState } from '../molecules/ErrorState';
import { cn } from '../../lib/cn';
import { useEntityList } from '../../hooks/useEntityData';
import { useEventBus, type KFlowEvent } from '../../hooks/useEventBus';
import { useQuerySingleton } from '../../hooks/useQuerySingleton';

export interface ListItem {
  id: string;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  avatar?: {
    src?: string;
    alt?: string;
    initials?: string;
  };
  badge?: string | number;
  metadata?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  completed?: boolean;
  [key: string]: unknown;
  _fields?: Record<string, unknown>;
}

export interface SchemaItemAction {
  label: string;
  /** Event to dispatch on click */
  event?: string;
  navigatesTo?: string;
  /** Action placement - accepts all common placement values */
  placement?: 'row' | 'bulk' | 'card' | 'footer' | string;
  action?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'default';
}

export interface ListProps {
  /** Entity name for auto-fetch OR data array (backwards compatible) */
  entity?: ListItem[] | readonly { id: string }[] | readonly unknown[] | string;
  /** Data array - primary prop for data */
  data?: ListItem[] | readonly { id: string }[] | readonly unknown[] | unknown;
  /** Entity type name for display */
  type?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  selectable?: boolean;
  selectedItems?: readonly string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Item actions - schema-driven or function-based */
  itemActions?: ((item: ListItem) => MenuItem[]) | readonly SchemaItemAction[];
  showDividers?: boolean;
  variant?: 'default' | 'card';
  emptyMessage?: string;
  className?: string;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
  children?: React.ReactNode;
  onItemAction?: (action: string, item: ListItem, index: number) => void;
  onRowClick?: (item: ListItem) => void;
  /** Field names - accepts readonly for generated const arrays */
  fieldNames?: readonly string[];
  /**
   * Query singleton binding for filter/sort state.
   * When provided, syncs with the query singleton for filtering and sorting.
   * Example: "@TaskQuery"
   */
  query?: string;
}

// Refined color palette for status indicators
const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  complete: {
    bg: 'bg-emerald-50/80 dark:bg-emerald-400/10',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500 ring-4 ring-emerald-500/20',
    border: 'border-emerald-200/60 dark:border-emerald-500/20'
  },
  active: {
    bg: 'bg-blue-50/80 dark:bg-blue-400/10',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500 ring-4 ring-blue-500/20',
    border: 'border-blue-200/60 dark:border-blue-500/20'
  },
  pending: {
    bg: 'bg-amber-50/80 dark:bg-amber-400/10',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500 ring-4 ring-amber-500/20',
    border: 'border-amber-200/60 dark:border-amber-500/20'
  },
  blocked: {
    bg: 'bg-rose-50/80 dark:bg-rose-400/10',
    text: 'text-rose-700 dark:text-rose-400',
    dot: 'bg-rose-500 ring-4 ring-rose-500/20',
    border: 'border-rose-200/60 dark:border-rose-500/20'
  },
  high: {
    bg: 'bg-orange-50/80 dark:bg-orange-400/10',
    text: 'text-orange-700 dark:text-orange-400',
    dot: 'bg-orange-500 ring-4 ring-orange-500/20',
    border: 'border-orange-200/60 dark:border-orange-500/20'
  },
  medium: {
    bg: 'bg-yellow-50/80 dark:bg-yellow-400/10',
    text: 'text-yellow-700 dark:text-yellow-400',
    dot: 'bg-yellow-500 ring-4 ring-yellow-500/20',
    border: 'border-yellow-200/60 dark:border-yellow-500/20'
  },
  low: {
    bg: 'bg-slate-50/80 dark:bg-slate-400/10',
    text: 'text-slate-600 dark:text-slate-400',
    dot: 'bg-slate-500 ring-4 ring-slate-500/20',
    border: 'border-slate-200/60 dark:border-slate-500/20'
  },
  default: {
    bg: 'bg-gray-50/80 dark:bg-gray-400/10',
    text: 'text-gray-600 dark:text-gray-400',
    dot: 'bg-gray-500 ring-4 ring-gray-500/20',
    border: 'border-gray-200/60 dark:border-gray-500/20'
  },
};

function getStatusStyle(fieldName: string, value: string) {
  const val = String(value).toLowerCase();

  if (val.includes('complete') || val.includes('done')) return STATUS_STYLES.complete;
  if (val.includes('active') || val.includes('progress')) return STATUS_STYLES.active;
  if (val.includes('pending') || val.includes('waiting')) return STATUS_STYLES.pending;
  if (val.includes('block') || val.includes('cancel')) return STATUS_STYLES.blocked;
  if (val.includes('high') || val.includes('urgent')) return STATUS_STYLES.high;
  if (val.includes('medium') || val.includes('normal')) return STATUS_STYLES.medium;
  if (val.includes('low')) return STATUS_STYLES.low;

  return STATUS_STYLES.default;
}

function formatValue(value: unknown, fieldName: string): string {
  if (typeof value === 'number') {
    if (fieldName.toLowerCase().includes('progress') || fieldName.toLowerCase().includes('percent')) {
      return `${value}%`;
    }
    if (fieldName.toLowerCase().includes('budget') || fieldName.toLowerCase().includes('cost')) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    }
    return value.toLocaleString();
  }
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return String(value);
}

function formatFieldLabel(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/Id$/, '')
    .trim();
}

// Custom Badge component with refined styling
const StatusBadge: React.FC<{ value: string; fieldName: string }> = ({ value, fieldName }) => {
  const style = getStatusStyle(fieldName, value);
  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide',
      'border shadow-sm backdrop-blur-sm transition-colors',
      style.bg, style.text, style.border
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full shadow-sm', style.dot)} />
      {value}
    </span>
  );
};

// Elegant progress bar
const ProgressIndicator: React.FC<{ value: number }> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            clampedValue >= 100 ? 'bg-emerald-500' :
              clampedValue >= 70 ? 'bg-blue-500' :
                clampedValue >= 40 ? 'bg-amber-500' : 'bg-gray-400'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums w-8 text-right">
        {clampedValue}%
      </span>
    </div>
  );
};

export const List: React.FC<ListProps> = ({
  entity,
  data,
  isLoading: externalLoading = false,
  error: externalError,
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  itemActions,
  emptyMessage = 'No items to display',
  className,
  renderItem: customRenderItem,
  onItemAction,
  onRowClick,
  fieldNames,
  type,
  query,
}) => {
  const navigate = useNavigate();
  const eventBus = useEventBus();

  // Query singleton for filter/sort state
  const queryState = useQuerySingleton(query);

  // Search state for event bus integration - initialize from query singleton if available
  const [searchTerm, setSearchTerm] = useState(queryState?.search ?? '');
  const [filters, setFilters] = useState<Record<string, unknown>>(queryState?.filters ?? {});

  // Determine if entity is a string name (for auto-fetch) or data array (backwards compatible)
  const isEntityName = typeof entity === 'string';
  const entityName = isEntityName ? entity : undefined;

  // Auto-fetch data when entity is a string name and no external data provided
  const shouldAutoFetch = isEntityName && !data;

  const {
    data: fetchedData,
    isLoading: fetchLoading,
    error: fetchError,
  } = useEntityList(
    shouldAutoFetch ? entityName : undefined,
    {
      skip: !shouldAutoFetch,
    }
  );

  // Sync with query singleton changes (e.g., from FilterGroup or SearchInput)
  useEffect(() => {
    if (queryState) {
      setSearchTerm(queryState.search);
      setFilters(queryState.filters);
    }
  }, [queryState?.search, JSON.stringify(queryState?.filters)]);

  // Listen for UI:SEARCH, UI:FILTER and related events
  useEffect(() => {
    const handleSearch = (event: KFlowEvent) => {
      // Only handle if no query binding (avoid double-handling when query singleton is used)
      if (query) return;
      const term = (event.payload?.searchTerm as string) ?? '';
      setSearchTerm(term);
    };

    const handleClearSearch = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setSearchTerm('');
    };

    const handleFilter = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      const { field, value } = event.payload ?? {};
      if (field) {
        setFilters(prev => ({ ...prev, [field as string]: value }));
      }
    };

    const handleClearFilters = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setFilters({});
      setSearchTerm('');
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

  // Combine loading and error states
  const isLoading = externalLoading || (shouldAutoFetch && fetchLoading);
  const error = externalError || (fetchError instanceof Error ? fetchError : fetchError ? new Error(String(fetchError)) : null);

  // Normalize data: handle arrays, single objects, and entity arrays
  const normalizeData = (d: typeof data | typeof entity) => {
    if (Array.isArray(d)) return d;
    if (d && typeof d === 'object' && 'id' in d) return [d];
    return [];
  };

  // Use external data if provided, otherwise use fetched data or entity data (backwards compat)
  const rawDataSource = data ?? fetchedData ?? entity;
  const rawItems = normalizeData(rawDataSource);

  // Apply client-side search filtering if using external data (server handles it for auto-fetch)
  const filteredItems = useMemo(() => {
    if (!searchTerm || shouldAutoFetch) {
      return rawItems;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return rawItems.filter((item) => {
      const itemData = item as Record<string, unknown>;
      return Object.values(itemData).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearch);
      });
    });
  }, [rawItems, searchTerm, shouldAutoFetch]);

  const getItemActions = React.useCallback((item: ListItem): MenuItem[] => {
    if (!itemActions) return [];

    if (typeof itemActions === 'function') {
      return itemActions(item);
    }

    return (itemActions as SchemaItemAction[]).map((action, idx) => ({
      id: `${item.id}-action-${idx}`,
      label: action.label,
      onClick: () => {
        // Handle navigation if navigatesTo is defined
        if (action.navigatesTo) {
          const url = action.navigatesTo.replace(/\{\{(\w+)\}\}/g, (_, key) =>
            String(item[key] || item.id || '')
          );
          navigate(url);
          return;
        }
        // Dispatch event via event bus if defined (for trait state machine integration)
        if (action.event) {
          eventBus.emit(`UI:${action.event}`, { row: item, entity: entityName });
        }
        // Legacy callback support
        if (action.action && onItemAction) {
          onItemAction(action.action, item, idx);
        }
      },
    }));
  }, [itemActions, navigate, onItemAction, eventBus, entityName]);

  const normalizedItemActions = itemActions ? getItemActions : undefined;

  if (isLoading) {
    return <LoadingState message={`Loading ${type || 'items'}...`} className={className} />;
  }

  // Show error state
  if (error) {
    return (
      <EmptyState
        icon={Package}
        title={`Error loading ${type || 'items'}`}
        description={error.message}
        className={className}
      />
    );
  }

  const safeItems: ListItem[] = Array.isArray(filteredItems)
    ? filteredItems.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        const normalizedItem = {
          ...item,
          id: (item as ListItem).id || `item-${index}`,
        } as ListItem;

        if (fieldNames && fieldNames.length > 0) {
          const firstField = fieldNames[0];

          if (!normalizedItem.title && item[firstField as keyof typeof item]) {
            normalizedItem.title = String(item[firstField as keyof typeof item]);
          }

          normalizedItem._fields = fieldNames.reduce((acc, field) => {
            const value = item[field as keyof typeof item];
            if (value !== undefined && value !== null) {
              acc[field] = value;
            }
            return acc;
          }, {} as Record<string, unknown>);
        }

        return normalizedItem;
      }
      return { id: `item-${index}`, title: String(item) } as ListItem;
    })
    : [];

  const handleSelect = (itemId: string, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    const newSelection = checked
      ? [...selectedItems, itemId]
      : selectedItems.filter(id => id !== itemId);
    onSelectionChange(newSelection);
  };

  const defaultRenderItem = (item: ListItem, index: number, isLast: boolean) => {
    const isSelected = selectedItems.includes(item.id);

    // Get all actions once
    const actions = normalizedItemActions ? normalizedItemActions(item) : [];
    const hasActions = actions.length > 0;

    // Find specific actions for UI promotion
    const viewAction = actions.find(a => a.label.toLowerCase().includes('view') || a.label.toLowerCase() === 'open');
    const editAction = actions.find(a => a.label.toLowerCase().includes('edit'));

    // Determine row click handler: Explicit item click > Generic row click > View action
    const handleClick = item.onClick ||
      (onRowClick ? () => onRowClick(item) : undefined) ||
      viewAction?.onClick;

    // Categorize fields
    const primaryField = fieldNames?.[0];
    const statusField = fieldNames?.find(f => f.toLowerCase().includes('status'));
    const priorityField = fieldNames?.find(f => f.toLowerCase().includes('priority'));
    const progressField = fieldNames?.find(f =>
      f.toLowerCase().includes('progress') || f.toLowerCase().includes('percent')
    );
    const dateFields = fieldNames?.filter(f =>
      f.toLowerCase().includes('date') || f.toLowerCase().includes('due')
    ) || [];
    const metadataFields = fieldNames?.filter(f =>
      f !== primaryField &&
      f !== statusField &&
      f !== priorityField &&
      f !== progressField &&
      !dateFields.includes(f)
    ).slice(0, 2) || [];

    // Get status for left indicator
    const statusValue = statusField ? item._fields?.[statusField] : null;
    const statusStyle = statusValue ? getStatusStyle(statusField!, String(statusValue)) : null;

    // Get progress value
    const progressValue = progressField ? item._fields?.[progressField] : null;
    const hasProgress = typeof progressValue === 'number';

    return (
      <div key={item.id}>
        <div
          className={cn(
            'group flex items-center gap-5 px-6 py-5',
            'transition-all duration-300 ease-out',
            handleClick && 'cursor-pointer',
            // Hover state
            'hover:bg-gray-50/80 dark:hover:bg-gray-800/60',
            // Selected state
            isSelected && 'bg-blue-50/80 dark:bg-blue-900/20 shadow-inner',
            item.disabled && 'opacity-50 cursor-not-allowed grayscale'
          )}
          onClick={handleClick}
        >

          {/* Checkbox if selectable */}
          {selectable && (
            <div className="flex-shrink-0 pt-0.5">
              <Checkbox
                checked={isSelected}
                onChange={(e) => handleSelect(item.id, e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "transition-transform active:scale-95",
                  isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"
                )}
              />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-2.5">
            {/* Primary row: Title + Badges */}
            <div className="flex items-center gap-4">
              <h3 className={cn(
                'text-[15px] font-semibold text-gray-900 dark:text-gray-50 truncate flex-1',
                'tracking-tight leading-snug',
                item.completed && 'line-through text-gray-400 dark:text-gray-500'
              )}>
                {item.title || 'Untitled'}
              </h3>

              {/* Status & Priority badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {!!statusValue && (
                  <StatusBadge value={String(statusValue)} fieldName={statusField!} />
                )}
                {!!(priorityField && item._fields?.[priorityField]) && (
                  <StatusBadge value={String(item._fields![priorityField])} fieldName={priorityField} />
                )}
              </div>
            </div>

            {/* Secondary row: Metadata */}
            <div className="flex items-center gap-6 text-[13px] font-medium text-gray-500 dark:text-gray-400">
              {/* Date fields with icon */}
              {dateFields.slice(0, 1).map(field => {
                const value = item._fields?.[field];
                if (!value) return null;
                return (
                  <span key={field} className="flex items-center gap-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatValue(value, field)}</span>
                  </span>
                );
              })}

              {/* Other metadata fields */}
              {metadataFields.map((field, i) => {
                const value = item._fields?.[field];
                if (value === undefined || value === null) return null;
                return (
                  <span key={field} className="truncate flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                    <span className="opacity-75">{formatFieldLabel(field)}:</span>
                    <span className="text-gray-600 dark:text-gray-300">{formatValue(value, field)}</span>
                  </span>
                );
              })}

              {/* Progress indicator */}
              {hasProgress && (
                <div className="ml-auto">
                  <ProgressIndicator value={progressValue as number} />
                </div>
              )}
            </div>
          </div>

          {/* Actions - visible on hover */}
          {/* Actions - visible on hover */}
          <div className={cn(
            'flex items-center gap-1 flex-shrink-0 transition-opacity duration-200',
            'opacity-0 group-hover:opacity-100'
          )}>
            {/* Direct Edit Action */}
            {editAction && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editAction.onClick?.();
                }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-200',
                  'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400',
                  'text-gray-400 dark:text-gray-500',
                  'active:scale-95'
                )}
                title={editAction.label}
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}

            {/* Direct View Action (Only if explicit button needed - optional if row click handles it, but keeping for clarity/accessibility) */}
            {viewAction && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  viewAction.onClick?.();
                }}
                className={cn(
                  'p-2 rounded-lg transition-all duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
                  'text-gray-400 dark:text-gray-500',
                  'active:scale-95'
                )}
                title={viewAction.label}
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            {/* Overflow Menu for filtered actions */}
            {(() => {
              const filteredActions = actions.filter(a =>
                !a.label.toLowerCase().includes('edit') &&
                !a.label.toLowerCase().includes('view') &&
                !a.label.toLowerCase().includes('open')
              );

              return filteredActions.length > 0 ? (
                <Menu
                  trigger={
                    <button className={cn(
                      'p-2 rounded-lg transition-all duration-200',
                      'hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm',
                      'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                      'active:scale-95'
                    )}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  }
                  items={filteredActions}
                  position="bottom-right"
                />
              ) : null;
            })()}

            {handleClick && (
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
            )}
          </div>
        </div>

        {/* Subtle divider - inset */}
        {!isLast && (
          <div className="ml-[calc(1.5rem)] mr-6 border-b border-gray-100/80 dark:border-gray-800/40" />
        )}
      </div>
    );
  };

  if (safeItems.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title={`No ${type || 'items'} found`}
        description={emptyMessage}
        className={className}
      />
    );
  }

  return (
    <div className={cn(
      // Container with refined styling
      'bg-white dark:bg-gray-900/50 backdrop-blur-sm',
      'rounded-2xl', // Increased rounding
      'border border-gray-200 dark:border-gray-800/60',
      'shadow-lg shadow-gray-200/20 dark:shadow-none', // Softer, improved shadow
      'overflow-hidden',
      className
    )}>
      {safeItems.map((item, index) =>
        customRenderItem
          ? customRenderItem(item, index)
          : defaultRenderItem(item, index, index === safeItems.length - 1)
      )}
    </div>
  );
};

List.displayName = 'List';
