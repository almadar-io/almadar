/**
 * DomainRelationshipRow Molecule Component
 *
 * Displays a relationship definition between entities.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Trash2, Link, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Typography, Button, HStack, Box } from '@almadar/ui';
import { DomainKeyword } from '../../atoms/domain';

export type RelationshipType = 'belongs_to' | 'has_many' | 'has_one';

export interface DomainRelationshipRowProps {
  /**
   * Type of relationship
   */
  relationshipType: RelationshipType;

  /**
   * Target entity name
   */
  targetEntity: string;

  /**
   * Alias name (e.g., "as Assignee")
   */
  alias?: string;

  /**
   * Source entity name (for display context)
   */
  sourceEntity?: string;

  /**
   * Whether the relationship is editable
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
   * Click handler for target entity
   */
  onTargetClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const relationshipConfig: Record<RelationshipType, {
  keyword: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}> = {
  belongs_to: {
    keyword: 'belongs to',
    description: 'Many-to-one relationship',
    icon: ArrowRight,
  },
  has_many: {
    keyword: 'has many',
    description: 'One-to-many relationship',
    icon: ArrowLeftRight,
  },
  has_one: {
    keyword: 'has one',
    description: 'One-to-one relationship',
    icon: Link,
  },
};

export const DomainRelationshipRow: React.FC<DomainRelationshipRowProps> = ({
  relationshipType,
  targetEntity,
  alias,
  sourceEntity,
  editable = true,
  onEdit,
  onDelete,
  onTargetClick,
  className,
}) => {
  const config = relationshipConfig[relationshipType];
  const Icon = config.icon;

  return (
    <HStack
      gap="sm"
      align="center"
      className={cn(
        'group px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors',
        className
      )}
    >
      {/* Icon */}
      <Icon className="w-4 h-4" style={{ color: 'var(--color-error)' }} />

      {/* Relationship text */}
      <HStack gap="sm" align="center">
        {sourceEntity && (
          <>
            <Typography variant="small" as="span" className="font-medium text-[var(--color-muted-foreground)]">
              {sourceEntity}
            </Typography>
            <Typography variant="small" as="span" className="text-[var(--color-muted-foreground)]">
              →
            </Typography>
          </>
        )}

        <DomainKeyword category="property">
          {`It ${config.keyword}`}
        </DomainKeyword>

        <Button
          variant="ghost"
          size="sm"
          onClick={onTargetClick}
          className={cn(
            'p-0 font-semibold',
            onTargetClick && 'hover:underline cursor-pointer'
          )}
          style={{ color: 'var(--color-error)' }}
        >
          {targetEntity}
        </Button>

        {alias && (
          <>
            <DomainKeyword category="property">as</DomainKeyword>
            <Typography variant="small" as="span" className="font-medium text-[var(--color-foreground)]">
              {alias}
            </Typography>
          </>
        )}
      </HStack>

      {/* Description tooltip */}
      <Typography variant="caption" as="span" className="text-[var(--color-muted-foreground)]">
        ({config.description})
      </Typography>

      {/* Spacer */}
      <Box className="flex-1" />

      {/* Actions */}
      {editable && (
        <HStack gap="xs" align="center" className="opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              title="Edit relationship"
              className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              title="Delete relationship"
              className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </HStack>
      )}
    </HStack>
  );
};

DomainRelationshipRow.displayName = 'DomainRelationshipRow';
