/**
 * DomainEntitySection Organism Component
 *
 * Complete entity display with fields, relationships, and states.
 */

import React from 'react';
import { Plus } from 'lucide-react';
import { DomainKeyword, DomainState } from '../../atoms/domain';
import {
  DomainSectionHeader,
  DomainFieldRow,
  DomainRelationshipRow,
  FieldConstraint,
} from '../../molecules/domain-editing';

export interface EntityField {
  name: string;
  fieldType: string;
  constraints?: FieldConstraint[];
  enumValues?: string[];
  error?: string;
}

export interface EntityRelationship {
  relationshipType: 'belongs_to' | 'has_many' | 'has_one';
  targetEntity: string;
  alias?: string;
}

export interface EntityData {
  name: string;
  description: string;
  fields: EntityField[];
  relationships: EntityRelationship[];
  states?: string[];
  initialState?: string;
}

export interface DomainEntitySectionProps {
  /**
   * Entity data
   */
  entity: EntityData;

  /**
   * Whether the entity is expanded
   * @default true
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether the entity is editable
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
   * Callback when add field is clicked
   */
  onAddField?: () => void;

  /**
   * Callback when a field is edited
   */
  onEditField?: (fieldIndex: number) => void;

  /**
   * Callback when a field is deleted
   */
  onDeleteField?: (fieldIndex: number) => void;

  /**
   * Callback when add relationship is clicked
   */
  onAddRelationship?: () => void;

  /**
   * Callback when a relationship is edited
   */
  onEditRelationship?: (relIndex: number) => void;

  /**
   * Callback when a relationship is deleted
   */
  onDeleteRelationship?: (relIndex: number) => void;

  /**
   * Callback when a state is clicked
   */
  onStateClick?: (state: string) => void;

  /**
   * Callback when an entity reference is clicked
   */
  onEntityClick?: (entityName: string) => void;

  /**
   * Whether there are validation errors
   */
  hasError?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainEntitySection: React.FC<DomainEntitySectionProps> = ({
  entity,
  expanded,
  onExpandedChange,
  editable = true,
  onEdit,
  onDelete,
  onAddField,
  onEditField,
  onDeleteField,
  onAddRelationship,
  onEditRelationship,
  onDeleteRelationship,
  onStateClick,
  onEntityClick,
  hasError = false,
  className,
}) => {
  const hasFields = entity.fields.length > 0;
  const hasRelationships = entity.relationships.length > 0;
  const hasStates = entity.states && entity.states.length > 0;

  // Article based on entity name
  const article = /^[aeiou]/i.test(entity.name) ? 'An' : 'A';

  return (
    <DomainSectionHeader
      title={entity.name}
      sectionType="entity"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      editable={editable}
      onEdit={onEdit}
      onDelete={onDelete}
      subtitle={entity.description}
      count={entity.fields.length}
      hasError={hasError}
      className={className}
    >
      <div className="space-y-4">
        {/* Entity header text */}
        <div className="text-sm text-[var(--color-muted-foreground)]">
          <DomainKeyword category="entity">{article}</DomainKeyword>
          {' '}
          <span className="font-semibold text-[var(--color-foreground)]">{entity.name}</span>
          {' '}
          <DomainKeyword category="entity">is</DomainKeyword>
          {' '}
          {entity.description}
        </div>

        {/* Fields section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="property">It has:</DomainKeyword>
            </span>
            {editable && onAddField && (
              <button
                type="button"
                onClick={onAddField}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Plus className="w-3 h-3" />
                Add field
              </button>
            )}
          </div>

          {hasFields ? (
            <div className="space-y-1 ml-4">
              {entity.fields.map((field, index) => (
                <DomainFieldRow
                  key={`${field.name}-${index}`}
                  name={field.name}
                  fieldType={field.fieldType}
                  constraints={field.constraints}
                  enumValues={field.enumValues}
                  error={field.error}
                  editable={editable}
                  onEdit={onEditField ? () => onEditField(index) : undefined}
                  onDelete={onDeleteField ? () => onDeleteField(index) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
              No fields defined
            </div>
          )}
        </div>

        {/* Relationships section */}
        {(hasRelationships || editable) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                Relationships
              </span>
              {editable && onAddRelationship && (
                <button
                  type="button"
                  onClick={onAddRelationship}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Plus className="w-3 h-3" />
                  Add relationship
                </button>
              )}
            </div>

            {hasRelationships ? (
              <div className="space-y-1">
                {entity.relationships.map((rel, index) => (
                  <DomainRelationshipRow
                    key={`${rel.targetEntity}-${index}`}
                    relationshipType={rel.relationshipType}
                    targetEntity={rel.targetEntity}
                    alias={rel.alias}
                    editable={editable}
                    onEdit={onEditRelationship ? () => onEditRelationship(index) : undefined}
                    onDelete={onDeleteRelationship ? () => onDeleteRelationship(index) : undefined}
                    onTargetClick={onEntityClick ? () => onEntityClick(rel.targetEntity) : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-[var(--color-muted-foreground)] italic">
                No relationships defined
              </div>
            )}
          </div>
        )}

        {/* States section */}
        {hasStates && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="state">It can be:</DomainKeyword>
            </span>
            <div className="flex flex-wrap gap-2 ml-4">
              {entity.states!.map((state) => (
                <DomainState
                  key={state}
                  name={state}
                  isInitial={state === entity.initialState}
                  onClick={onStateClick ? () => onStateClick(state) : undefined}
                />
              ))}
            </div>
            {entity.initialState && (
              <div className="ml-4 text-sm text-[var(--color-muted-foreground)]">
                <DomainKeyword category="state">It starts as</DomainKeyword>
                {' '}
                <span className="font-medium">{entity.initialState}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </DomainSectionHeader>
  );
};

DomainEntitySection.displayName = 'DomainEntitySection';
