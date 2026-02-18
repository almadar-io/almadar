/**
 * DomainEntitySection Organism Component
 *
 * Complete entity display with fields, relationships, and states.
 */

import React from 'react';
import { Plus } from 'lucide-react';
import { Box, HStack, VStack, Button, Typography, Icon } from '@almadar/ui';
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
      <VStack gap="md">
        {/* Entity header text */}
        <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
          <DomainKeyword category="entity">{article}</DomainKeyword>
          {' '}
          <Typography as="span" variant="body2" className="font-semibold text-[var(--color-foreground)]">{entity.name}</Typography>
          {' '}
          <DomainKeyword category="entity">is</DomainKeyword>
          {' '}
          {entity.description}
        </Typography>

        {/* Fields section */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="property">It has:</DomainKeyword>
            </Typography>
            {editable && onAddField && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddField}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Icon icon={Plus} size="xs" />
                Add field
              </Button>
            )}
          </HStack>

          {hasFields ? (
            <VStack gap="xs" className="ml-4">
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
            </VStack>
          ) : (
            <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
              No fields defined
            </Typography>
          )}
        </VStack>

        {/* Relationships section */}
        {(hasRelationships || editable) && (
          <VStack gap="sm">
            <HStack justify="between" align="center">
              <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
                Relationships
              </Typography>
              {editable && onAddRelationship && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddRelationship}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Icon icon={Plus} size="xs" />
                  Add relationship
                </Button>
              )}
            </HStack>

            {hasRelationships ? (
              <VStack gap="xs">
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
              </VStack>
            ) : (
              <Typography variant="body2" className="text-[var(--color-muted-foreground)] italic">
                No relationships defined
              </Typography>
            )}
          </VStack>
        )}

        {/* States section */}
        {hasStates && (
          <VStack gap="sm">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="state">It can be:</DomainKeyword>
            </Typography>
            <Box className="flex flex-wrap gap-2 ml-4">
              {entity.states!.map((state) => (
                <DomainState
                  key={state}
                  name={state}
                  isInitial={state === entity.initialState}
                  onClick={onStateClick ? () => onStateClick(state) : undefined}
                />
              ))}
            </Box>
            {entity.initialState && (
              <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)]">
                <DomainKeyword category="state">It starts as</DomainKeyword>
                {' '}
                <Typography as="span" variant="body2" className="font-medium">{entity.initialState}</Typography>
              </Typography>
            )}
          </VStack>
        )}
      </VStack>
    </DomainSectionHeader>
  );
};

DomainEntitySection.displayName = 'DomainEntitySection';
