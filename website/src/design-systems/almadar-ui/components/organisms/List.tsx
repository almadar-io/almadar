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
 * Orbital Component Interface Compliance:
 * - Entity binding with auto-fetch when entity is a string
 * - Event emission via useEventBus (UI:* events)
 * - Event listening for UI:SEARCH and UI:CLEAR_SEARCH
 * - isLoading and error state props
 */

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  MoreHorizontal,
  Package,
  ChevronRight,
  Pencil,
  Eye,
} from "lucide-react";
import { Typography, Checkbox, Divider, Box, Button } from "../atoms";
import { HStack, VStack } from "../atoms/Stack";
import { Menu, type MenuItem } from "../molecules/Menu";
import { EmptyState } from "../molecules/EmptyState";
import { LoadingState } from "../molecules/LoadingState";
import { ErrorState } from "../molecules/ErrorState";
import { cn } from "../../lib/cn";
import { getNestedValue } from "../../lib/getNestedValue";
import { useEntityList } from "../../hooks/useEntityData";
import { useEventBus, type KFlowEvent } from "../../hooks/useEventBus";
import { useQuerySingleton } from "../../hooks/useQuerySingleton";
import { useTranslate } from "../../hooks/useTranslate";

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
  placement?: "row" | "bulk" | "card" | "footer" | string;
  action?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "default";
  /** Click handler from generated code */
  onClick?: (row: unknown) => void;
}

/**
 * Field definition - can be a simple string or object with key/header
 */
export type FieldDef = string | { key: string; header?: string };

/**
 * Normalize fields to simple string array
 */
function normalizeFields(fields: readonly FieldDef[] | undefined): string[] {
  if (!fields) return [];
  return fields.map((f) => (typeof f === "string" ? f : f.key));
}

export interface ListProps {
  /** Entity name for auto-fetch OR data array (backwards compatible) */
  entity?: ListItem[] | readonly { id: string }[] | readonly unknown[] | string;
  /** Data array - primary prop for data */
  data?: ListItem[] | readonly { id: string }[] | readonly unknown[] | unknown;
  /** Entity type name for display */
  entityType?: string;
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
  variant?: "default" | "card";
  emptyMessage?: string;
  className?: string;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
  children?: React.ReactNode;
  onItemAction?: (action: string, item: ListItem, index: number) => void;
  onRowClick?: (item: ListItem) => void;
  /** Fields to display - accepts string[] or {key, header}[] for unified interface */
  fields?: readonly FieldDef[];
  /** Alias for fields - backwards compatibility */
  fieldNames?: readonly string[];
  /**
   * Query singleton binding for filter/sort state.
   * When provided, syncs with the query singleton for filtering and sorting.
   * Example: "@TaskQuery"
   */
  query?: string;
}

// Refined color palette for status indicators using CSS variables
const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; dot: string; border: string }
> = {
  complete: {
    bg: "bg-[var(--color-success)]/10",
    text: "text-[var(--color-success)]",
    dot: "bg-[var(--color-success)] ring-4 ring-[var(--color-success)]/20",
    border: "border-[var(--color-success)]/30",
  },
  active: {
    bg: "bg-[var(--color-info)]/10",
    text: "text-[var(--color-info)]",
    dot: "bg-[var(--color-info)] ring-4 ring-[var(--color-info)]/20",
    border: "border-[var(--color-info)]/30",
  },
  pending: {
    bg: "bg-[var(--color-warning)]/10",
    text: "text-[var(--color-warning)]",
    dot: "bg-[var(--color-warning)] ring-4 ring-[var(--color-warning)]/20",
    border: "border-[var(--color-warning)]/30",
  },
  blocked: {
    bg: "bg-[var(--color-error)]/10",
    text: "text-[var(--color-error)]",
    dot: "bg-[var(--color-error)] ring-4 ring-[var(--color-error)]/20",
    border: "border-[var(--color-error)]/30",
  },
  high: {
    bg: "bg-[var(--color-warning)]/10",
    text: "text-[var(--color-warning)]",
    dot: "bg-[var(--color-warning)] ring-4 ring-[var(--color-warning)]/20",
    border: "border-[var(--color-warning)]/30",
  },
  medium: {
    bg: "bg-[var(--color-accent)]/10",
    text: "text-[var(--color-accent)]",
    dot: "bg-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/20",
    border: "border-[var(--color-accent)]/30",
  },
  low: {
    bg: "bg-[var(--color-muted)]",
    text: "text-[var(--color-muted-foreground)]",
    dot: "bg-[var(--color-muted-foreground)] ring-4 ring-[var(--color-muted-foreground)]/20",
    border: "border-[var(--color-border)]",
  },
  default: {
    bg: "bg-[var(--color-muted)]",
    text: "text-[var(--color-muted-foreground)]",
    dot: "bg-[var(--color-muted-foreground)] ring-4 ring-[var(--color-muted-foreground)]/20",
    border: "border-[var(--color-border)]",
  },
};

function getStatusStyle(fieldName: string, value: string) {
  const val = String(value).toLowerCase();

  if (val.includes("complete") || val.includes("done"))
    return STATUS_STYLES.complete;
  if (val.includes("active") || val.includes("progress"))
    return STATUS_STYLES.active;
  if (val.includes("pending") || val.includes("waiting"))
    return STATUS_STYLES.pending;
  if (val.includes("block") || val.includes("cancel"))
    return STATUS_STYLES.blocked;
  if (val.includes("high") || val.includes("urgent")) return STATUS_STYLES.high;
  if (val.includes("medium") || val.includes("normal"))
    return STATUS_STYLES.medium;
  if (val.includes("low")) return STATUS_STYLES.low;

  return STATUS_STYLES.default;
}

function formatValue(value: unknown, fieldName: string): string {
  if (typeof value === "number") {
    if (
      fieldName.toLowerCase().includes("progress") ||
      fieldName.toLowerCase().includes("percent")
    ) {
      return `${value}%`;
    }
    if (
      fieldName.toLowerCase().includes("budget") ||
      fieldName.toLowerCase().includes("cost")
    ) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toLocaleString();
  }
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  return String(value);
}

function formatFieldLabel(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/Id$/, "")
    .trim();
}

// Custom Badge component with refined styling
const StatusBadge: React.FC<{ value: string; fieldName: string }> = ({
  value,
  fieldName,
}) => {
  const style = getStatusStyle(fieldName, value);
  return (
    <Typography
      as="span"
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-semibold tracking-wide",
        "border shadow-[var(--shadow-sm)] backdrop-blur-sm transition-colors",
        style.bg,
        style.text,
        style.border,
      )}
    >
      <Typography
        as="span"
        className={cn(
          "w-1.5 h-1.5 rounded-[var(--radius-full)] shadow-[var(--shadow-sm)]",
          style.dot,
        )}
      />
      {value}
    </Typography>
  );
};

// Elegant progress bar
const ProgressIndicator: React.FC<{ value: number }> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <Box className="flex items-center gap-2 min-w-[100px]">
      <Box className="flex-1 h-1.5 bg-[var(--color-muted)] rounded-[var(--radius-full)] overflow-hidden">
        <Box
          className={cn(
            "h-full rounded-[var(--radius-full)] transition-all duration-500",
            clampedValue >= 100
              ? "bg-[var(--color-success)]"
              : clampedValue >= 70
                ? "bg-[var(--color-info)]"
                : clampedValue >= 40
                  ? "bg-[var(--color-warning)]"
                  : "bg-[var(--color-muted-foreground)]",
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </Box>
      <Typography
        as="span"
        className="text-xs font-medium text-[var(--color-muted-foreground)] tabular-nums w-8 text-right"
      >
        {clampedValue}%
      </Typography>
    </Box>
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
  emptyMessage,
  className,
  renderItem: customRenderItem,
  onItemAction,
  onRowClick,
  fields,
  fieldNames,
  entityType,
  query,
}) => {
  const navigate = useNavigate();
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const resolvedEmptyMessage = emptyMessage ?? t('empty.noData');

  // Support fields and fieldNames (alias) - normalize to string[]
  const effectiveFieldNames =
    normalizeFields(fields).length > 0 ? normalizeFields(fields) : fieldNames;

  // Query singleton for filter/sort state
  const queryState = useQuerySingleton(query);

  // Search state for event bus integration - initialize from query singleton if available
  const [searchTerm, setSearchTerm] = useState(queryState?.search ?? "");
  const [filters, setFilters] = useState<Record<string, unknown>>(
    queryState?.filters ?? {},
  );

  // Determine if entity is a string name (for auto-fetch) or data array (backwards compatible)
  const isEntityName = typeof entity === "string";
  const entityName = isEntityName ? entity : undefined;

  // Auto-fetch data when entity is a string name and no external data provided
  const shouldAutoFetch = isEntityName && !data;

  const {
    data: fetchedData,
    isLoading: fetchLoading,
    error: fetchError,
  } = useEntityList(shouldAutoFetch ? entityName : undefined, {
    skip: !shouldAutoFetch,
  });

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
      const term = (event.payload?.searchTerm as string) ?? "";
      setSearchTerm(term);
    };

    const handleClearSearch = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setSearchTerm("");
    };

    const handleFilter = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      const { field, value } = event.payload ?? {};
      if (field) {
        setFilters((prev) => ({ ...prev, [field as string]: value }));
      }
    };

    const handleClearFilters = (event: KFlowEvent) => {
      // Only handle if no query binding
      if (query) return;
      setFilters({});
      setSearchTerm("");
    };

    const unsubSearch = eventBus.on("UI:SEARCH", handleSearch);
    const unsubClear = eventBus.on("UI:CLEAR_SEARCH", handleClearSearch);
    const unsubFilter = eventBus.on("UI:FILTER", handleFilter);
    const unsubClearFilters = eventBus.on(
      "UI:CLEAR_FILTERS",
      handleClearFilters,
    );

    return () => {
      unsubSearch();
      unsubClear();
      unsubFilter();
      unsubClearFilters();
    };
  }, [eventBus, query]);

  // Combine loading and error states
  const isLoading = externalLoading || (shouldAutoFetch && fetchLoading);
  const error =
    externalError ||
    (fetchError instanceof Error
      ? fetchError
      : fetchError
        ? new Error(String(fetchError))
        : null);

  // Normalize data: handle arrays, single objects, and entity arrays
  const normalizeData = (d: typeof data | typeof entity) => {
    if (Array.isArray(d)) return d;
    if (d && typeof d === "object" && "id" in d) return [d];
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

  const getItemActions = React.useCallback(
    (item: ListItem): MenuItem[] => {
      if (!itemActions) return [];

      if (typeof itemActions === "function") {
        return itemActions(item);
      }

      return (itemActions as SchemaItemAction[]).map((action, idx) => ({
        id: `${item.id}-action-${idx}`,
        label: action.label,
        onClick: () => {
          // Handle navigation if navigatesTo is defined
          if (action.navigatesTo) {
            const url = action.navigatesTo.replace(/\{\{(\w+)\}\}/g, (_, key) =>
              String(item[key] || item.id || ""),
            );
            navigate(url);
            return;
          }
          // Dispatch event via event bus if defined (for trait state machine integration)
          if (action.event) {
            eventBus.emit(`UI:${action.event}`, {
              row: item,
              entity: entityName,
            });
          }
          // Legacy callback support
          if (action.action && onItemAction) {
            onItemAction(action.action, item, idx);
          }
        },
      }));
    },
    [itemActions, navigate, onItemAction, eventBus, entityName],
  );

  const normalizedItemActions = itemActions ? getItemActions : undefined;

  if (isLoading) {
    return (
      <LoadingState
        message={`Loading ${entityType || "items"}...`}
        className={className}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <EmptyState
        icon={Package}
        title={`Error loading ${entityType || "items"}`}
        description={error.message}
        className={className}
      />
    );
  }

  const safeItems: ListItem[] = Array.isArray(filteredItems)
    ? filteredItems.map((item, index) => {
      if (typeof item === "object" && item !== null) {
        const normalizedItem = {
          ...item,
          id: (item as ListItem).id || `item-${index}`,
        } as ListItem;

        if (effectiveFieldNames && effectiveFieldNames.length > 0) {
          const firstField = effectiveFieldNames[0];
          const itemRecord = item as Record<string, unknown>;

          if (
            !normalizedItem.title &&
            getNestedValue(itemRecord, firstField)
          ) {
            normalizedItem.title = String(
              getNestedValue(itemRecord, firstField),
            );
          }

          normalizedItem._fields = effectiveFieldNames.reduce(
            (acc, field) => {
              const value = getNestedValue(itemRecord, field);
              if (value !== undefined && value !== null) {
                acc[field] = value;
              }
              return acc;
            },
            {} as Record<string, unknown>,
          );
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
      : selectedItems.filter((id) => id !== itemId);
    onSelectionChange(newSelection);
  };

  const defaultRenderItem = (
    item: ListItem,
    index: number,
    isLast: boolean,
  ) => {
    const isSelected = selectedItems.includes(item.id);

    // Get all actions once
    const actions = normalizedItemActions ? normalizedItemActions(item) : [];
    const hasActions = actions.length > 0;

    // Find specific actions for UI promotion
    const viewAction = actions.find(
      (a) =>
        a.label.toLowerCase().includes("view") ||
        a.label.toLowerCase() === "open",
    );
    const editAction = actions.find((a) =>
      a.label.toLowerCase().includes("edit"),
    );

    // Determine row click handler: Explicit item click > Generic row click > View action
    const handleClick =
      item.onClick ||
      (onRowClick ? () => onRowClick(item) : undefined) ||
      viewAction?.onClick;

    // Categorize fields
    const primaryField = effectiveFieldNames?.[0];
    const statusField = effectiveFieldNames?.find((f) =>
      f.toLowerCase().includes("status"),
    );
    const priorityField = effectiveFieldNames?.find((f) =>
      f.toLowerCase().includes("priority"),
    );
    const progressField = effectiveFieldNames?.find(
      (f) =>
        f.toLowerCase().includes("progress") ||
        f.toLowerCase().includes("percent"),
    );
    const dateFields =
      effectiveFieldNames?.filter(
        (f) =>
          f.toLowerCase().includes("date") || f.toLowerCase().includes("due"),
      ) || [];
    const metadataFields =
      effectiveFieldNames
        ?.filter(
          (f) =>
            f !== primaryField &&
            f !== statusField &&
            f !== priorityField &&
            f !== progressField &&
            !dateFields.includes(f),
        )
        .slice(0, 2) || [];

    // Get status for left indicator
    const statusValue = statusField ? item._fields?.[statusField] : null;
    const statusStyle = statusValue
      ? getStatusStyle(statusField!, String(statusValue))
      : null;

    // Get progress value
    const progressValue = progressField ? item._fields?.[progressField] : null;
    const hasProgress = typeof progressValue === "number";

    return (
      <Box key={item.id}>
        <Box
          className={cn(
            "group flex items-center gap-5 px-6 py-5",
            "transition-all duration-300 ease-out",
            handleClick && "cursor-pointer",
            // Hover state
            "hover:bg-[var(--color-muted)]/80",
            // Selected state
            isSelected && "bg-[var(--color-primary)]/10 shadow-inner",
            item.disabled && "opacity-50 cursor-not-allowed grayscale",
          )}
          onClick={handleClick}
        >
          {/* Checkbox if selectable */}
          {selectable && (
            <Box className="flex-shrink-0 pt-0.5">
              <Checkbox
                checked={isSelected}
                onChange={(e) => handleSelect(item.id, e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "transition-transform active:scale-95",
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : "border-[var(--color-border)]",
                )}
              />
            </Box>
          )}

          {/* Main content */}
          <Box className="flex-1 min-w-0 space-y-2.5">
            {/* Primary row: Title + Badges */}
            <HStack className="flex items-center gap-4">
              <Typography
                as="h3"
                className={cn(
                  "text-[15px] font-semibold text-[var(--color-foreground)] truncate flex-1",
                  "tracking-tight leading-snug",
                  item.completed &&
                  "line-through text-[var(--color-muted-foreground)]",
                )}
              >
                {item.title || "Untitled"}
              </Typography>

              {/* Status & Priority badges */}
              <HStack className="flex items-center gap-2 flex-shrink-0">
                {!!statusValue && (
                  <StatusBadge
                    value={String(statusValue)}
                    fieldName={statusField!}
                  />
                )}
                {!!(priorityField && item._fields?.[priorityField]) && (
                  <StatusBadge
                    value={String(item._fields![priorityField])}
                    fieldName={priorityField}
                  />
                )}
              </HStack>
            </HStack>

            {/* Secondary row: Metadata */}
            <HStack className="flex items-center gap-6 text-[13px] font-medium text-[var(--color-muted-foreground)]">
              {/* Date fields with icon */}
              {dateFields.slice(0, 1).map((field) => {
                const value = item._fields?.[field];
                if (!value) return null;
                return (
                  <Typography
                    as="span"
                    key={field}
                    className="flex items-center gap-2 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <Typography as="span">{formatValue(value, field)}</Typography>
                  </Typography>
                );
              })}

              {/* Other metadata fields */}
              {metadataFields.map((field, i) => {
                const value = item._fields?.[field];
                if (value === undefined || value === null) return null;
                return (
                  <Typography
                    as="span"
                    key={field}
                    className="truncate flex items-center gap-1.5 text-[var(--color-muted-foreground)]"
                  >
                    <Typography as="span" className="opacity-75">
                      {formatFieldLabel(field)}:
                    </Typography>
                    <Typography as="span" className="text-[var(--color-foreground)]">
                      {formatValue(value, field)}
                    </Typography>
                  </Typography>
                );
              })}

              {/* Progress indicator */}
              {hasProgress && (
                <Box className="ml-auto">
                  <ProgressIndicator value={progressValue as number} />
                </Box>
              )}
            </HStack>
          </Box>

          {/* Actions - visible on hover */}
          {/* Actions - visible on hover */}
          <HStack
            className={cn(
              "flex items-center gap-1 flex-shrink-0 transition-opacity duration-200",
              "opacity-0 group-hover:opacity-100",
            )}
          >
            {/* Direct Edit Action */}
            {editAction && (
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  editAction.onClick?.();
                }}
                className={cn(
                  "p-2 rounded-[var(--radius-lg)] transition-all duration-200",
                  "hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]",
                  "text-[var(--color-muted-foreground)]",
                  "active:scale-95",
                )}
                title={editAction.label}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            )}

            {/* Direct View Action (Only if explicit button needed - optional if row click handles it, but keeping for clarity/accessibility) */}
            {viewAction && (
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  viewAction.onClick?.();
                }}
                className={cn(
                  "p-2 rounded-[var(--radius-lg)] transition-all duration-200",
                  "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                  "text-[var(--color-muted-foreground)]",
                  "active:scale-95",
                )}
                title={viewAction.label}
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}

            {/* Overflow Menu for filtered actions */}
            {(() => {
              const filteredActions = actions.filter(
                (a) =>
                  !a.label.toLowerCase().includes("edit") &&
                  !a.label.toLowerCase().includes("view") &&
                  !a.label.toLowerCase().includes("open"),
              );

              return filteredActions.length > 0 ? (
                <Menu
                  trigger={
                    <Button
                      variant="ghost"
                      className={cn(
                        "p-2 rounded-[var(--radius-lg)] transition-all duration-200",
                        "hover:bg-[var(--color-muted)] hover:shadow-[var(--shadow-sm)]",
                        "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]",
                        "active:scale-95",
                      )}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  }
                  items={filteredActions}
                  position="bottom-right"
                />
              ) : null;
            })()}

            {handleClick && (
              <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]/50 group-hover:text-[var(--color-muted-foreground)] group-hover:translate-x-0.5 transition-all" />
            )}
          </HStack>
        </Box>

        {/* Subtle divider - inset */}
        {!isLast && (
          <Box className="ml-[calc(1.5rem)] mr-6 border-b border-[var(--color-border)]/40" />
        )}
      </Box>
    );
  };

  if (safeItems.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title={`No ${entityType || "items"} found`}
        description={resolvedEmptyMessage}
        className={className}
      />
    );
  }

  return (
    <Box
      className={cn(
        // Container with refined styling
        "bg-[var(--color-card)] backdrop-blur-sm",
        "rounded-[var(--radius-xl)]", // Increased rounding
        "border border-[var(--color-border)]",
        "shadow-[var(--shadow-lg)]", // Softer, improved shadow
        "overflow-hidden",
        className,
      )}
    >
      {safeItems.map((item, index) =>
        customRenderItem
          ? customRenderItem(item, index)
          : defaultRenderItem(item, index, index === safeItems.length - 1),
      )}
    </Box>
  );
};

List.displayName = "List";
