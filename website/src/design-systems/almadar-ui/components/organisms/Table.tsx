/**
 * Table Organism Component
 *
 * A table component with header row, data rows, pagination, sorting, and filters.
 * Uses Pagination, SearchInput, ButtonGroup, Card, Menu molecules and Button, Icon, Checkbox, Typography, Badge, Divider atoms.
 */

import React, { useState } from "react";
import { ArrowUp, ArrowDown, MoreVertical } from "lucide-react";
import { Pagination } from "../molecules/Pagination";
import { SearchInput } from "../molecules/SearchInput";
import { Card } from "../atoms/Card";
import { Menu, MenuItem } from "../molecules/Menu";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { Checkbox } from "../atoms/Checkbox";
import { Typography } from "../atoms/Typography";
import { Box } from "../atoms/Box";
import { HStack } from "../atoms/Stack";
import { cn } from "../../lib/cn";
import { useTranslate } from "../../hooks/useTranslate";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T = any> {
  /**
   * Column key
   */
  key: string;

  /**
   * Column header label
   */
  label: string;

  /**
   * Sortable column
   * @default false
   */
  sortable?: boolean;

  /**
   * Custom cell renderer
   */
  render?: (value: any, row: T, index: number) => React.ReactNode;

  /**
   * Column width
   */
  width?: string;
}

export interface TableProps<T = any> {
  /**
   * Table columns
   */
  columns: TableColumn<T>[];

  /**
   * Table entity data
   */
  entity: T[];

  /**
   * Row key getter
   */
  getRowKey: (row: T, index: number) => string;

  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedRows?: string[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedKeys: string[]) => void;

  /**
   * Enable sorting
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort column
   */
  sortColumn?: string;

  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;

  /**
   * Callback when sort changes
   */
  onSortChange?: (column: string, direction: SortDirection) => void;

  /**
   * Enable search/filter
   * @default false
   */
  searchable?: boolean;

  /**
   * Search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Enable pagination
   * @default false
   */
  paginated?: boolean;

  /**
   * Current page
   */
  currentPage?: number;

  /**
   * Total pages
   */
  totalPages?: number;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Row actions menu items
   */
  rowActions?: (row: T) => MenuItem[];

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Closed circuit: loading indicator
   */
  isLoading?: boolean;

  /**
   * Closed circuit: error state
   */
  error?: Error | null;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Table = <T extends Record<string, any>>({
  columns,
  entity,
  getRowKey,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortable = false,
  sortColumn,
  sortDirection,
  onSortChange,
  searchable = false,
  searchPlaceholder,
  paginated = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  rowActions,
  emptyMessage,
  loading = false,
  isLoading,
  error,
  className,
}: TableProps<T>) => {
  const { t } = useTranslate();
  const resolvedEmptyMessage = emptyMessage ?? t('empty.noData');
  const resolvedSearchPlaceholder = searchPlaceholder ?? t('common.search');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    searchable && searchQuery
      ? entity.filter((row) =>
          columns.some((col) => {
            const value = row[col.key];
            return value
              ?.toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }),
        )
      : entity;

  const handleSort = (column: string) => {
    if (!sortable || !onSortChange) return;

    const newDirection =
      sortColumn === column && sortDirection === "asc"
        ? "desc"
        : sortColumn === column && sortDirection === "desc"
          ? null
          : "asc";

    onSortChange(column, newDirection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    onSelectionChange(
      checked ? filteredData.map((row, idx) => getRowKey(row, idx)) : [],
    );
  };

  const handleSelectRow = (rowKey: string, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    const newSelection = checked
      ? [...selectedRows, rowKey]
      : selectedRows.filter((key) => key !== rowKey);
    onSelectionChange(newSelection);
  };

  const allSelected =
    selectable &&
    filteredData.length > 0 &&
    filteredData.every((row, idx) =>
      selectedRows.includes(getRowKey(row, idx)),
    );

  return (
    <Box className={cn("w-full", className)}>
      {/* Search */}
      {searchable && (
        <Box className="mb-4">
          <SearchInput
            placeholder={resolvedSearchPlaceholder}
            onSearch={setSearchQuery}
            className="max-w-md"
          />
        </Box>
      )}

      {/* Table */}
      <Card>
        <Box className="overflow-x-auto">
          {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
          <table className="w-full">
            {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
            <thead>
              {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
              <tr className="border-b-[length:var(--border-width)] border-[var(--color-table-border)]">
                {selectable && (
                  // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                  <th className="px-4 py-3 text-left bg-[var(--color-table-header)]">
                    <Checkbox
                      checked={allSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-bold text-[var(--color-foreground)] uppercase tracking-wider bg-[var(--color-table-header)]",
                      sortable &&
                        column.sortable &&
                        "cursor-pointer hover:bg-[var(--color-table-row-hover)]",
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <HStack className="flex items-center gap-2">
                      <Typography variant="small" weight="semibold">
                        {column.label}
                      </Typography>
                      {sortable &&
                        column.sortable &&
                        sortColumn === column.key && (
                          <Icon
                            icon={sortDirection === "asc" ? ArrowUp : ArrowDown}
                            size="sm"
                          />
                        )}
                    </HStack>
                  </th>
                ))}
                {rowActions && (
                  // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                  <th className="px-4 py-3 text-right">Actions</th>
                )}
              </tr>
            </thead>
            {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
            <tbody>
              {loading || isLoading ? (
                // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                <tr>
                  {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
                  <td
                    colSpan={
                      columns.length +
                      (selectable ? 1 : 0) +
                      (rowActions ? 1 : 0)
                    }
                    className="px-4 py-8 text-center"
                  >
                    <Typography variant="body" color="secondary">
                      {t('common.loading')}
                    </Typography>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                <tr>
                  {/* eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed */}
                  <td
                    colSpan={
                      columns.length +
                      (selectable ? 1 : 0) +
                      (rowActions ? 1 : 0)
                    }
                    className="px-4 py-8 text-center"
                  >
                    <Typography variant="body" color="secondary">
                      {resolvedEmptyMessage}
                    </Typography>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => {
                  const rowKey = getRowKey(row, index);
                  const isSelected = selectedRows.includes(rowKey);
                  return (
                    // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                    <tr
                      key={rowKey}
                      className={cn(
                        "border-b border-[var(--color-table-border)] last:border-b-0",
                        "hover:bg-[var(--color-table-row-hover)]",
                        isSelected &&
                          "bg-[var(--color-table-header)] font-medium",
                      )}
                    >
                      {selectable && (
                        // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={(e) =>
                              handleSelectRow(rowKey, e.target.checked)
                            }
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                        <td key={column.key} className="px-4 py-3">
                          {column.render ? (
                            column.render(row[column.key], row, index)
                          ) : (
                            <Typography variant="body">
                              {row[column.key]?.toString() || "-"}
                            </Typography>
                          )}
                        </td>
                      ))}
                      {rowActions && (
                        // eslint-disable-next-line almadar/no-raw-dom-elements -- native table elements needed
                        <td className="px-4 py-3 text-right">
                          <Menu
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={MoreVertical}
                              >
                                Actions
                              </Button>
                            }
                            items={rowActions(row)}
                            position="bottom-right"
                          />
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Box>
      </Card>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <Box className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
          />
        </Box>
      )}
    </Box>
  );
};

Table.displayName = "Table";
