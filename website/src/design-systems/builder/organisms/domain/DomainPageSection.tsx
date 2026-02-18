/**
 * DomainPageSection Organism Component
 *
 * Complete page display with purpose, URL, sections, and actions.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Plus, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { Box, HStack, VStack, Button, Typography, Icon } from '@almadar/ui';
import { DomainKeyword } from '../../atoms/domain';
import { DomainSectionHeader } from '../../molecules/domain-editing';

export interface PageSection {
  name?: string;
  description: string;
  pattern?: string;
}

export interface PageAction {
  trigger: string;
  action: string;
}

export interface PageData {
  name: string;
  description: string;
  purpose?: string;
  url: string;
  sections: PageSection[];
  actions: PageAction[];
  onAccess?: string;
}

export interface DomainPageSectionProps {
  /**
   * Page data
   */
  page: PageData;

  /**
   * Whether the page is expanded
   * @default true
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether the page is editable
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
   * Callback when add section is clicked
   */
  onAddSection?: () => void;

  /**
   * Callback when a section is edited
   */
  onEditSection?: (sectionIndex: number) => void;

  /**
   * Callback when a section is deleted
   */
  onDeleteSection?: (sectionIndex: number) => void;

  /**
   * Callback when add action is clicked
   */
  onAddAction?: () => void;

  /**
   * Callback when an action is edited
   */
  onEditAction?: (actionIndex: number) => void;

  /**
   * Callback when an action is deleted
   */
  onDeleteAction?: (actionIndex: number) => void;

  /**
   * Callback when URL is clicked
   */
  onUrlClick?: () => void;

  /**
   * Whether there are validation errors
   */
  hasError?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainPageSection: React.FC<DomainPageSectionProps> = ({
  page,
  expanded,
  onExpandedChange,
  editable = true,
  onEdit,
  onDelete,
  onAddSection,
  onEditSection,
  onDeleteSection,
  onAddAction,
  onEditAction,
  onDeleteAction,
  onUrlClick,
  hasError = false,
  className,
}) => {
  const hasSections = page.sections.length > 0;
  const hasActions = page.actions.length > 0;

  // Remove "Page" suffix for display
  const displayName = page.name.replace(/Page$/, '');

  return (
    <DomainSectionHeader
      title={displayName}
      sectionType="page"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      editable={editable}
      onEdit={onEdit}
      onDelete={onDelete}
      count={page.sections.length}
      hasError={hasError}
      className={className}
    >
      <VStack gap="md">
        {/* Page header */}
        <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
          <DomainKeyword category="page">The</DomainKeyword>
          {' '}
          <Typography as="span" variant="body2" className="font-semibold text-[var(--color-foreground)]">{displayName}</Typography>
          {' '}
          <DomainKeyword category="page">shows</DomainKeyword>
          {' '}
          {page.description}
        </Typography>

        {/* Purpose */}
        {page.purpose && (
          <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
            <DomainKeyword category="page">Purpose:</DomainKeyword>
            {' '}
            {page.purpose}
          </Typography>
        )}

        {/* URL */}
        <HStack gap="sm" align="center">
          <DomainKeyword category="page">URL:</DomainKeyword>
          <Button
            variant="ghost"
            size="sm"
            onClick={onUrlClick}
            className={cn(
              'font-mono px-2 py-0.5 rounded',
              onUrlClick && 'hover:underline cursor-pointer'
            )}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
              color: 'var(--color-info)',
            }}
          >
            {page.url}
            {onUrlClick && <Icon icon={ExternalLink} size="xs" className="inline-block ml-1" />}
          </Button>
        </HStack>

        {/* Sections */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="page">It displays:</DomainKeyword>
            </Typography>
            {editable && onAddSection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddSection}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Icon icon={Plus} size="xs" />
                Add section
              </Button>
            )}
          </HStack>

          {hasSections ? (
            <VStack gap="xs" className="ml-4">
              {page.sections.map((section, index) => (
                <HStack
                  key={`${section.description}-${index}`}
                  gap="md"
                  align="center"
                  className="group px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
                >
                  <Typography variant="caption" className="text-[var(--color-muted-foreground)] font-mono">-</Typography>
                  <Typography variant="body2" className="flex-1 text-[var(--color-foreground)]">
                    {section.description}
                  </Typography>
                  {section.pattern && (
                    <Typography
                      variant="caption"
                      className="px-1.5 py-0.5 rounded bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]"
                    >
                      {section.pattern}
                    </Typography>
                  )}
                  {editable && (
                    <HStack gap="xs" align="center" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEditSection && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditSection(index)}
                          className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                        >
                          <Icon icon={Edit2} size="xs" />
                        </Button>
                      )}
                      {onDeleteSection && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteSection(index)}
                          className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                        >
                          <Icon icon={Trash2} size="xs" />
                        </Button>
                      )}
                    </HStack>
                  )}
                </HStack>
              ))}
            </VStack>
          ) : (
            <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
              No sections defined
            </Typography>
          )}
        </VStack>

        {/* Actions */}
        {(hasActions || editable) && (
          <VStack gap="sm">
            <HStack justify="between" align="center">
              <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
                <DomainKeyword category="page">Users can:</DomainKeyword>
              </Typography>
              {editable && onAddAction && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddAction}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Icon icon={Plus} size="xs" />
                  Add action
                </Button>
              )}
            </HStack>

            {hasActions ? (
              <VStack gap="xs" className="ml-4">
                {page.actions.map((action, index) => (
                  <HStack
                    key={`${action.trigger}-${index}`}
                    gap="md"
                    align="center"
                    className="group px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
                  >
                    <Typography variant="caption" className="text-[var(--color-muted-foreground)] font-mono">-</Typography>
                    <Typography variant="body2" className="text-[var(--color-foreground)]">
                      {action.trigger}
                      {action.action && (
                        <>
                          {' '}
                          <DomainKeyword category="page">to</DomainKeyword>
                          {' '}
                          {action.action}
                        </>
                      )}
                    </Typography>
                    {editable && (
                      <HStack gap="xs" align="center" className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                        {onEditAction && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditAction(index)}
                            className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                          >
                            <Icon icon={Edit2} size="xs" />
                          </Button>
                        )}
                        {onDeleteAction && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteAction(index)}
                            className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                          >
                            <Icon icon={Trash2} size="xs" />
                          </Button>
                        )}
                      </HStack>
                    )}
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
                No actions defined
              </Typography>
            )}
          </VStack>
        )}

        {/* On Access */}
        {page.onAccess && (
          <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
            <DomainKeyword category="page">When accessed:</DomainKeyword>
            {' '}
            {page.onAccess}
          </Typography>
        )}
      </VStack>
    </DomainSectionHeader>
  );
};

DomainPageSection.displayName = 'DomainPageSection';
