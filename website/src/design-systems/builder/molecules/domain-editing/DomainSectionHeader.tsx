/**
 * DomainSectionHeader Molecule Component
 *
 * A collapsible section header with edit controls for domain language sections.
 */

import React, { useState } from 'react';
import { clsx as cn } from 'clsx';
import { ChevronDown, ChevronRight, Edit2, Trash2, Plus } from 'lucide-react';
import { DomainKeyword, KeywordCategory } from '../../atoms/domain';

export type SectionType = 'entity' | 'page' | 'behavior' | 'tick';

export interface DomainSectionHeaderProps {
  /**
   * Section title/name
   */
  title: string;

  /**
   * Type of section
   */
  sectionType: SectionType;

  /**
   * Whether the section is expanded
   * @default true
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether the section is editable
   * @default true
   */
  editable?: boolean;

  /**
   * Callback when edit is clicked
   */
  onEdit?: () => void;

  /**
   * Callback when delete is clicked
   */
  onDelete?: () => void;

  /**
   * Callback when add is clicked (for adding child items)
   */
  onAdd?: () => void;

  /**
   * Subtitle/description
   */
  subtitle?: string;

  /**
   * Badge count (e.g., number of fields)
   */
  count?: number;

  /**
   * Whether there are validation errors
   */
  hasError?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children to render when expanded
   */
  children?: React.ReactNode;
}

const sectionConfig: Record<SectionType, {
  keyword: string;
  category: KeywordCategory;
  icon: string;
}> = {
  entity: { keyword: 'Entity', category: 'entity', icon: '📦' },
  page: { keyword: 'Page', category: 'page', icon: '📄' },
  behavior: { keyword: 'Behavior', category: 'behavior', icon: '⚡' },
  tick: { keyword: 'Tick', category: 'behavior', icon: '⏰' },
};

export const DomainSectionHeader: React.FC<DomainSectionHeaderProps> = ({
  title,
  sectionType,
  expanded: controlledExpanded,
  onExpandedChange,
  editable = true,
  onEdit,
  onDelete,
  onAdd,
  subtitle,
  count,
  hasError = false,
  className,
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const expanded = controlledExpanded ?? internalExpanded;

  const config = sectionConfig[sectionType];

  const handleToggle = () => {
    const newExpanded = !expanded;
    setInternalExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      className={cn('border rounded-lg', className)}
      style={{
        borderColor: hasError
          ? 'color-mix(in srgb, var(--color-error) 40%, transparent)'
          : 'var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-3 cursor-pointer select-none',
          'hover:bg-[var(--color-secondary)]',
          'transition-colors',
          expanded && 'border-b border-[var(--color-border)]'
        )}
        onClick={handleToggle}
      >
        <ChevronIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" />

        <span className="text-lg">{config.icon}</span>

        <DomainKeyword category={config.category}>
          {config.keyword}
        </DomainKeyword>

        <span className="font-semibold text-[var(--color-foreground)]">
          {title}
        </span>

        {count !== undefined && (
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]">
            {count}
          </span>
        )}

        {hasError && (
          <span
            className="ml-1 px-2 py-0.5 text-xs rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
              color: 'var(--color-error)',
            }}
          >
            Error
          </span>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        {editable && (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                title="Add item"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="p-1.5 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && expanded && (
        <div className="px-4 py-2 text-sm text-[var(--color-muted-foreground)] bg-[var(--color-secondary)] border-b border-[var(--color-border)]">
          {subtitle}
        </div>
      )}

      {/* Content */}
      {expanded && children && (
        <div className="px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
};

DomainSectionHeader.displayName = 'DomainSectionHeader';
