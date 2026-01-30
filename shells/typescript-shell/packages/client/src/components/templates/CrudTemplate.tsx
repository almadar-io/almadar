/**
 * CrudTemplate
 * 
 * A presentational template for CRUD (Create, Read, Update, Delete) features.
 * Includes data table, search, and modal forms for create/edit.
 */

import React, { useState } from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../molecules/Container';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Alert } from '../molecules/Alert';
import { Modal } from '../molecules/Modal';
import { FormField } from '../molecules/FormField';
import { DataTable, type Column, type RowAction } from '../organisms/DataTable';
import { PageHeader } from '../organisms/PageHeader';
import { Plus, Search, RefreshCw, Edit, Trash2, Eye } from 'lucide-react';

export type CrudVariant = 'minimal' | 'standard' | 'full';

export interface CrudItem {
  id: string;
  [key: string]: unknown;
}

export interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: CrudItem) => React.ReactNode;
}

export interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface CrudTemplateProps {
  /** Array of items to display */
  items: CrudItem[];
  /** Whether data is loading */
  isLoading?: boolean;
  /** Error object if loading failed */
  error?: Error | string | null;
  /** Currently selected item for editing */
  selectedItem?: CrudItem | null;
  /** Whether the create/edit modal is open */
  isModalOpen?: boolean;
  /** Current search query */
  searchQuery?: string;
  /** Current sort field */
  sortBy?: string;
  /** Current sort order */
  sortOrder?: 'asc' | 'desc';
  /** Called to load/refresh items */
  onLoad?: () => void;
  /** Called when creating a new item */
  onCreate?: (data: Record<string, unknown>) => void;
  /** Called when updating an item */
  onUpdate?: (id: string, data: Record<string, unknown>) => void;
  /** Called when deleting an item */
  onDelete?: (id: string) => void;
  /** Called when selecting an item for editing */
  onSelect?: (id: string) => void;
  /** Called when viewing an item */
  onView?: (id: string) => void;
  /** Called when search query changes */
  onSearch?: (query: string) => void;
  /** Called when sort changes */
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  /** Called to open create/edit modal */
  onOpenModal?: () => void;
  /** Called to close modal */
  onCloseModal?: () => void;
  /** Page title */
  title?: string;
  /** Singular entity name for labels */
  entityName?: string;
  /** Table column definitions */
  columns?: ColumnConfig[];
  /** Form field definitions for create/edit */
  fields?: FieldConfig[];
  /** Whether to show search input */
  showSearch?: boolean;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Whether to show view action */
  showViewAction?: boolean;
  /** Template variant */
  variant?: CrudVariant;
  /** Additional class name */
  className?: string;
}

const defaultColumns: ColumnConfig[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Created', sortable: true },
];

const defaultFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'status', label: 'Status', type: 'select', options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]},
];

export const CrudTemplate: React.FC<CrudTemplateProps> = ({
  items = [],
  isLoading = false,
  error = null,
  selectedItem = null,
  isModalOpen = false,
  searchQuery = '',
  sortBy,
  sortOrder = 'asc',
  onLoad,
  onCreate,
  onUpdate,
  onDelete,
  onSelect,
  onView,
  onSearch,
  onSort,
  onOpenModal,
  onCloseModal,
  title = 'Items',
  entityName = 'Item',
  columns = defaultColumns,
  fields = defaultFields,
  showSearch = true,
  searchPlaceholder = 'Search...',
  showViewAction = false,
  variant = 'standard',
  className,
}) => {
  // Internal state for the form
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // Reset form when modal opens/closes or selected item changes
  React.useEffect(() => {
    if (isModalOpen) {
      setFormData(selectedItem || {});
    } else {
      setFormData({});
    }
  }, [isModalOpen, selectedItem]);

  const handleFormChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      onUpdate?.(selectedItem.id, formData);
    } else {
      onCreate?.(formData);
    }
    onCloseModal?.();
  };

  // Convert columns to DataTable format
  const tableColumns: Column<CrudItem>[] = columns.map(col => ({
    key: col.key,
    header: col.label,
    sortable: col.sortable,
    width: col.width,
    render: col.render,
  }));

  // Row actions
  const rowActions: RowAction<CrudItem>[] = [
    ...(showViewAction && onView ? [{
      label: 'View',
      icon: Eye,
      onClick: (row: CrudItem) => onView(row.id),
    }] : []),
    ...(onSelect ? [{
      label: 'Edit',
      icon: Edit,
      onClick: (row: CrudItem) => {
        onSelect(row.id);
        onOpenModal?.();
      },
    }] : []),
    ...(onDelete ? [{
      label: 'Delete',
      icon: Trash2,
      variant: 'danger' as const,
      onClick: (row: CrudItem) => {
        if (confirm(`Are you sure you want to delete this ${entityName.toLowerCase()}?`)) {
          onDelete(row.id);
        }
      },
    }] : []),
  ];

  const renderField = (field: FieldConfig) => {
    const value = formData[field.key] as string || '';

    if (field.type === 'select' && field.options) {
      return (
        <FormField key={field.key} label={field.label} required={field.required}>
          <select
            value={value}
            onChange={(e) => handleFormChange(field.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FormField>
      );
    }

    if (field.type === 'textarea') {
      return (
        <FormField key={field.key} label={field.label} required={field.required}>
          <textarea
            value={value}
            onChange={(e) => handleFormChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
          />
        </FormField>
      );
    }

    return (
      <FormField key={field.key} label={field.label} required={field.required}>
        <Input
          type={field.type || 'text'}
          value={value}
          onChange={(e) => handleFormChange(field.key, e.target.value)}
          placeholder={field.placeholder}
        />
      </FormField>
    );
  };

  const renderModal = () => (
    <Modal
      isOpen={isModalOpen}
      onClose={() => onCloseModal?.()}
      title={selectedItem ? `Edit ${entityName}` : `New ${entityName}`}
      size="md"
      footer={
        <HStack gap="md" justify="end">
          <Button variant="ghost" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button type="submit" form="crud-form">
            {selectedItem ? 'Save Changes' : 'Create'}
          </Button>
        </HStack>
      }
    >
      <form id="crud-form" onSubmit={handleSubmit}>
        <VStack gap="md">
          {fields.map(renderField)}
        </VStack>
      </form>
    </Modal>
  );

  const renderMinimal = () => (
    <VStack gap="md" className={className}>
      {error && (
        <Alert variant="error" actions={onLoad && (
          <Button variant="ghost" size="sm" onClick={onLoad} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Retry
          </Button>
        )}>
          {typeof error === 'string' ? error : error?.message || 'Failed to load data'}
        </Alert>
      )}

      <DataTable
        columns={tableColumns}
        entity={items}
        isLoading={isLoading}
        rowActions={rowActions.length > 0 ? rowActions : undefined}
        sortBy={sortBy}
        sortDirection={sortOrder}
        onSort={onSort ? (key, dir) => onSort(key, dir) : undefined}
        emptyTitle={`No ${title.toLowerCase()}`}
        emptyDescription={`Get started by creating your first ${entityName.toLowerCase()}.`}
        emptyAction={onOpenModal ? { label: `Add ${entityName}`, onClick: onOpenModal } : undefined}
      />

      {renderModal()}
    </VStack>
  );

  const renderStandard = () => (
    <Container size="xl" padding="lg" className={className}>
      <VStack gap="lg">
        <HStack justify="between" align="center">
          <Typography variant="h2">{title}</Typography>
          {onOpenModal && (
            <Button onClick={onOpenModal} leftIcon={<Plus className="h-4 w-4" />}>
              Add {entityName}
            </Button>
          )}
        </HStack>

        {error && (
          <Alert variant="error" actions={onLoad && (
            <Button variant="ghost" size="sm" onClick={onLoad} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Retry
            </Button>
          )}>
            {typeof error === 'string' ? error : error?.message || 'Failed to load data'}
          </Alert>
        )}

        <DataTable
          columns={tableColumns}
          entity={items}
          isLoading={isLoading}
          rowActions={rowActions.length > 0 ? rowActions : undefined}
          sortBy={sortBy}
          sortDirection={sortOrder}
          onSort={onSort ? (key, dir) => onSort(key, dir) : undefined}
          searchable={showSearch}
          searchValue={searchQuery}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          emptyTitle={`No ${title.toLowerCase()}`}
          emptyDescription={`Get started by creating your first ${entityName.toLowerCase()}.`}
          emptyAction={onOpenModal ? { label: `Add ${entityName}`, onClick: onOpenModal } : undefined}
        />

        {renderModal()}
      </VStack>
    </Container>
  );

  const renderFull = () => (
    <Container size="xl" padding="lg" className={className}>
      <VStack gap="lg">
        <PageHeader
          title={title}
          subtitle={`Manage your ${title.toLowerCase()}`}
          actions={[
            ...(onOpenModal ? [{
              label: `Add ${entityName}`,
              icon: Plus,
              onClick: onOpenModal,
              variant: 'primary' as const,
            }] : []),
            ...(onLoad ? [{
              label: 'Refresh',
              icon: RefreshCw,
              onClick: onLoad,
              variant: 'ghost' as const,
            }] : []),
          ]}
        />

        {error && (
          <Alert variant="error" dismissible onDismiss={() => {}}>
            {typeof error === 'string' ? error : error?.message || 'Failed to load data'}
          </Alert>
        )}

        <DataTable
          columns={tableColumns}
          entity={items}
          isLoading={isLoading}
          rowActions={rowActions.length > 0 ? rowActions : undefined}
          sortBy={sortBy}
          sortDirection={sortOrder}
          onSort={onSort ? (key, dir) => onSort(key, dir) : undefined}
          searchable={showSearch}
          searchValue={searchQuery}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
          selectable
          bulkActions={onDelete ? [{
            label: 'Delete Selected',
            icon: Trash2,
            variant: 'danger',
            onClick: (rows) => {
              if (confirm(`Delete ${rows.length} ${title.toLowerCase()}?`)) {
                rows.forEach(row => onDelete(row.id));
              }
            },
          }] : undefined}
          emptyTitle={`No ${title.toLowerCase()} yet`}
          emptyDescription={`Create your first ${entityName.toLowerCase()} to get started.`}
          emptyAction={onOpenModal ? { label: `Create ${entityName}`, onClick: onOpenModal } : undefined}
        />

        {renderModal()}
      </VStack>
    </Container>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimal();
    case 'full':
      return renderFull();
    default:
      return renderStandard();
  }
};

CrudTemplate.displayName = 'CrudTemplate';

export default CrudTemplate;
