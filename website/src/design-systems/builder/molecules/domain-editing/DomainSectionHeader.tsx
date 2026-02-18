/**
 * DomainSectionHeader Molecule Component
 *
 * A collapsible section header with edit controls for domain language sections.
 */

import React, { useState } from 'react';
import { clsx as cn } from 'clsx';
import { ChevronDown, ChevronRight, Edit2, Trash2, Plus } from 'lucide-react';
import { Typography, Button, HStack, VStack, Box, Badge } from '@almadar/ui';
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
    <VStack
      gap="none"
      className={cn('border rounded-lg', className)}
      style={{
        borderColor: hasError
          ? 'color-mix(in srgb, var(--color-error) 40%, transparent)'
          : 'var(--color-border)',
      }}
    >
      {/* Header */}
      <HStack
        gap="sm"
        align="center"
        className={cn(
          'px-4 py-3 cursor-pointer select-none hover:bg-[var(--color-secondary)] transition-colors',
          expanded && 'border-b border-[var(--color-border)]'
        )}
        onClick={handleToggle}
      >
        <ChevronIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" />

        <Typography variant="body1" as="span" className="text-lg">
          {config.icon}
        </Typography>

        <DomainKeyword category={config.category}>
          {config.keyword}
        </DomainKeyword>

        <Typography variant="body2" as="span" className="font-semibold text-[var(--color-foreground)]">
          {title}
        </Typography>

        {count !== undefined && (
          <Badge variant="secondary" size="sm" className="ml-1">
            {count}
          </Badge>
        )}

        {hasError && (
          <Badge variant="error" size="sm" className="ml-1">
            Error
          </Badge>
        )}

        {/* Spacer */}
        <Box className="flex-1" />

        {/* Actions */}
        {editable && (
          <HStack gap="xs" align="center" onClick={(e) => e.stopPropagation()}>
            {onAdd && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAdd}
                title="Add item"
                className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                title="Edit"
                className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                title="Delete"
                className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </HStack>
        )}
      </HStack>

      {/* Subtitle */}
      {subtitle && expanded && (
        <Typography
          variant="body2"
          className="px-4 py-2 text-[var(--color-muted-foreground)] bg-[var(--color-secondary)] border-b border-[var(--color-border)]"
        >
          {subtitle}
        </Typography>
      )}

      {/* Content */}
      {expanded && children && (
        <Box className="px-4 py-3">
          {children}
        </Box>
      )}
    </VStack>
  );
};

DomainSectionHeader.displayName = 'DomainSectionHeader';
