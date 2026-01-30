/**
 * Table Organism Component
 * 
 * A table component with header row, data rows, pagination, sorting, and filters.
 * Uses Pagination, SearchInput, ButtonGroup, Card, Menu molecules and Button, Icon, Checkbox, Typography, Badge, Divider atoms.
 */

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { Pagination } from '../molecules/Pagination';
import { SearchInput } from '../molecules/SearchInput';
import { Card } from '../atoms/Card';
import { Menu, MenuItem } from '../molecules/Menu';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Checkbox } from '../atoms/Checkbox';
import { Typography } from '../atoms/Typography';
import { cn } from '../../lib/cn';

export type SortDirection = 'asc' | 'desc' | null;

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
  searchPlaceholder = 'Search...',
  paginated = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  rowActions,
  emptyMessage = 'No data available',
  loading = false,
  className,
}: TableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchable && searchQuery
    ? entity.filter(row =>
      columns.some(col => {
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    )
    : entity;

  const handleSort = (column: string) => {
    if (!sortable || !onSortChange) return;

    const newDirection =
      sortColumn === column && sortDirection === 'asc' ? 'desc' :
        sortColumn === column && sortDirection === 'desc' ? null :
          'asc';

    onSortChange(column, newDirection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    onSelectionChange(checked ? filteredData.map((row, idx) => getRowKey(row, idx)) : []);
  };

  const handleSelectRow = (rowKey: string, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;
    const newSelection = checked
      ? [...selectedRows, rowKey]
      : selectedRows.filter(key => key !== rowKey);
    onSelectionChange(newSelection);
  };

  const allSelected = selectable && filteredData.length > 0 &&
    filteredData.every((row, idx) => selectedRows.includes(getRowKey(row, idx)));

  return (
    <div className={cn('w-full', className)}>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <SearchInput
            placeholder={searchPlaceholder}
            onSearch={setSearchQuery}
            className="max-w-md"
          />
        </div>
      )}

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                {selectable && (
                  <th className="px-4 py-3 text-left bg-neutral-100">
                    <Checkbox
                      checked={allSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider bg-neutral-100',
                      sortable && column.sortable && 'cursor-pointer hover:bg-neutral-200'
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <Typography variant="small" weight="semibold">
                        {column.label}
                      </Typography>
                      {sortable && column.sortable && sortColumn === column.key && (
                        <Icon
                          icon={sortDirection === 'asc' ? ArrowUp : ArrowDown}
                          size="sm"
                        />
                      )}
                    </div>
                  </th>
                ))}
                {rowActions && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)} className="px-4 py-8 text-center">
                    <Typography variant="body" color="secondary">Loading...</Typography>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)} className="px-4 py-8 text-center">
                    <Typography variant="body" color="secondary">{emptyMessage}</Typography>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => {
                  const rowKey = getRowKey(row, index);
                  const isSelected = selectedRows.includes(rowKey);
                  return (
                    <tr
                      key={rowKey}
                      className={cn(
                        'border-b border-black last:border-b-0',
                        'hover:bg-neutral-50',
                        isSelected && 'bg-neutral-100 font-medium'
                      )}
                    >
                      {selectable && (
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-3">
                          {column.render
                            ? column.render(row[column.key], row, index)
                            : (
                              <Typography variant="body">
                                {row[column.key]?.toString() || '-'}
                              </Typography>
                            )}
                        </td>
                      ))}
                      {rowActions && (
                        <td className="px-4 py-3 text-right">
                          <Menu
                            trigger={<Button variant="ghost" size="sm" icon={MoreVertical}>Actions</Button>}
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
        </div>
      </Card>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => { })}
          />
        </div>
      )}
    </div>
  );
};

Table.displayName = 'Table';
