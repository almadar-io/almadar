/**
 * ListTemplate
 * 
 * A presentational template for list-based features like todos, shopping lists, notes.
 * Supports add, toggle, delete, and filter operations.
 */

import React, { useState } from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../molecules/Container';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Checkbox } from '../atoms/Checkbox';
import { Spinner } from '../atoms/Spinner';
import { Alert } from '../molecules/Alert';
import { EmptyState } from '../molecules/EmptyState';
import { Plus, Trash2, RefreshCw, ListTodo } from 'lucide-react';

export type FilterValue = 'all' | 'active' | 'completed';
export type ListVariant = 'minimal' | 'standard' | 'full';

export interface ListTemplateItem {
  id: string;
  title: string;
  completed?: boolean;
  [key: string]: unknown;
}

export interface ListTemplateProps {
  /** Array of list items */
  items: ListTemplateItem[];
  /** Whether data is loading */
  isLoading?: boolean;
  /** Error object if loading failed */
  error?: Error | string | null;
  /** Current filter value */
  filter?: FilterValue;
  /** Called when a new item is added */
  onAdd?: (title: string) => void;
  /** Called when an item is toggled */
  onToggle?: (id: string) => void;
  /** Called when an item is deleted */
  onDelete?: (id: string) => void;
  /** Called when filter changes */
  onFilterChange?: (filter: FilterValue) => void;
  /** Called to retry loading */
  onRetry?: () => void;
  /** Title displayed above the list */
  title?: string;
  /** Placeholder for the input field */
  placeholder?: string;
  /** Whether to show filter buttons */
  showFilters?: boolean;
  /** Whether to show item count */
  showCount?: boolean;
  /** Message shown when list is empty */
  emptyMessage?: string;
  /** Template variant */
  variant?: ListVariant;
  /** Additional class name */
  className?: string;
}

export const ListTemplate: React.FC<ListTemplateProps> = ({
  items = [],
  isLoading = false,
  error = null,
  filter = 'all',
  onAdd,
  onToggle,
  onDelete,
  onFilterChange,
  onRetry,
  title = 'My List',
  placeholder = 'Add a new item...',
  showFilters = true,
  showCount = true,
  emptyMessage = 'No items yet',
  variant = 'standard',
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onAdd) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const activeCount = items.filter(item => !item.completed).length;
  const completedCount = items.filter(item => item.completed).length;

  const renderError = () => (
    <Alert
      variant="error"
      title="Failed to load items"
      actions={
        onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Retry
          </Button>
        )
      }
    >
      {typeof error === 'string' ? error : error?.message || 'An error occurred'}
    </Alert>
  );

  const renderFilters = () => (
    <HStack gap="sm">
      <Button
        variant={filter === 'all' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onFilterChange?.('all')}
      >
        All ({items.length})
      </Button>
      <Button
        variant={filter === 'active' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onFilterChange?.('active')}
      >
        Active ({activeCount})
      </Button>
      <Button
        variant={filter === 'completed' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onFilterChange?.('completed')}
      >
        Completed ({completedCount})
      </Button>
    </HStack>
  );

  const renderItem = (item: ListTemplateItem) => (
    <HStack
      key={item.id}
      gap="md"
      align="center"
      className={cn(
        'p-3 rounded-lg border border-gray-200 dark:border-gray-700',
        'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
        item.completed && 'opacity-60'
      )}
    >
      <Checkbox
        checked={item.completed}
        onChange={() => onToggle?.(item.id)}
        className="flex-shrink-0"
      />
      <Typography
        variant="body"
        className={cn('flex-1', item.completed && 'line-through text-gray-500')}
      >
        {item.title}
      </Typography>
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </HStack>
  );

  const renderEmpty = () => (
    <EmptyState
      icon={ListTodo}
      title={emptyMessage}
      description="Add your first item using the input above"
    />
  );

  const renderMinimal = () => (
    <VStack gap="md" className={className}>
      <form onSubmit={handleSubmit}>
        <HStack gap="sm">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="submit" disabled={!inputValue.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </HStack>
      </form>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : error ? (
        renderError()
      ) : filteredItems.length === 0 ? (
        <Typography variant="body" color="muted" align="center" className="py-8">
          {emptyMessage}
        </Typography>
      ) : (
        <VStack gap="sm">
          {filteredItems.map(renderItem)}
        </VStack>
      )}
    </VStack>
  );

  const renderStandard = () => (
    <Container size="md" padding="lg" className={className}>
      <VStack gap="lg">
        <Typography variant="h2">{title}</Typography>
        
        {error && renderError()}

        <form onSubmit={handleSubmit}>
          <HStack gap="sm">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button type="submit" disabled={!inputValue.trim()} leftIcon={<Plus className="h-4 w-4" />}>
              Add
            </Button>
          </HStack>
        </form>

        {showFilters && items.length > 0 && renderFilters()}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : filteredItems.length === 0 ? (
          renderEmpty()
        ) : (
          <VStack gap="sm">
            {filteredItems.map(renderItem)}
          </VStack>
        )}

        {showCount && items.length > 0 && (
          <Typography variant="small" color="muted">
            {activeCount} item{activeCount !== 1 ? 's' : ''} remaining
          </Typography>
        )}
      </VStack>
    </Container>
  );

  const renderFull = () => (
    <Container size="md" padding="lg" className={className}>
      <VStack gap="lg">
        <HStack justify="between" align="center">
          <Typography variant="h2">{title}</Typography>
          {showCount && (
            <Typography variant="small" color="muted">
              {items.length} total • {activeCount} active • {completedCount} done
            </Typography>
          )}
        </HStack>

        {error && renderError()}

        <form onSubmit={handleSubmit}>
          <HStack gap="sm">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button type="submit" disabled={!inputValue.trim()} leftIcon={<Plus className="h-4 w-4" />}>
              Add Item
            </Button>
          </HStack>
        </form>

        {showFilters && items.length > 0 && (
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            {renderFilters()}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredItems.length === 0 ? (
          renderEmpty()
        ) : (
          <VStack gap="sm">
            {filteredItems.map(renderItem)}
          </VStack>
        )}

        {items.length > 0 && completedCount > 0 && (
          <HStack justify="end">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500"
              onClick={() => {
                items.filter(i => i.completed).forEach(i => onDelete?.(i.id));
              }}
            >
              Clear completed
            </Button>
          </HStack>
        )}
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

ListTemplate.displayName = 'ListTemplate';

export default ListTemplate;
