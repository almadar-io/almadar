/**
 * DomainRelationshipRow Molecule Component
 *
 * Displays a relationship definition between entities.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Trash2, Link, ArrowRight, ArrowLeftRight } from 'lucide-react';
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
  icon: React.ComponentType<{ className?: string }>;
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
    <div
      className={cn(
        'group flex items-center gap-3 px-3 py-2 rounded-lg',
        'hover:bg-[var(--color-secondary)]',
        'transition-colors',
        className
      )}
    >
      {/* Icon */}
      <Icon className="w-4 h-4" style={{ color: 'var(--color-error)' }} />

      {/* Relationship text */}
      <div className="flex items-center gap-2">
        {sourceEntity && (
          <>
            <span className="font-medium text-[var(--color-muted-foreground)]">
              {sourceEntity}
            </span>
            <span className="text-[var(--color-muted-foreground)]">→</span>
          </>
        )}

        <DomainKeyword category="property">
          {`It ${config.keyword}`}
        </DomainKeyword>

        <button
          type="button"
          onClick={onTargetClick}
          className={cn(
            'font-semibold',
            onTargetClick && 'hover:underline cursor-pointer'
          )}
          style={{ color: 'var(--color-error)' }}
        >
          {targetEntity}
        </button>

        {alias && (
          <>
            <DomainKeyword category="property">as</DomainKeyword>
            <span className="font-medium text-[var(--color-foreground)]">
              {alias}
            </span>
          </>
        )}
      </div>

      {/* Description tooltip */}
      <span className="text-xs text-[var(--color-muted-foreground)]">
        ({config.description})
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      {editable && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Edit relationship"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
              title="Delete relationship"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

DomainRelationshipRow.displayName = 'DomainRelationshipRow';
