/**
 * DomainPageSection Organism Component
 *
 * Complete page display with purpose, URL, sections, and actions.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Plus, ExternalLink, Edit2, Trash2 } from 'lucide-react';
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
      <div className="space-y-4">
        {/* Page header */}
        <div className="text-sm text-[var(--color-muted-foreground)]">
          <DomainKeyword category="page">The</DomainKeyword>
          {' '}
          <span className="font-semibold text-[var(--color-foreground)]">{displayName}</span>
          {' '}
          <DomainKeyword category="page">shows</DomainKeyword>
          {' '}
          {page.description}
        </div>

        {/* Purpose */}
        {page.purpose && (
          <div className="text-sm text-[var(--color-muted-foreground)]">
            <DomainKeyword category="page">Purpose:</DomainKeyword>
            {' '}
            {page.purpose}
          </div>
        )}

        {/* URL */}
        <div className="flex items-center gap-2 text-sm">
          <DomainKeyword category="page">URL:</DomainKeyword>
          <button
            type="button"
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
            {onUrlClick && <ExternalLink className="inline-block w-3 h-3 ml-1" />}
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="page">It displays:</DomainKeyword>
            </span>
            {editable && onAddSection && (
              <button
                type="button"
                onClick={onAddSection}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Plus className="w-3 h-3" />
                Add section
              </button>
            )}
          </div>

          {hasSections ? (
            <div className="space-y-1 ml-4">
              {page.sections.map((section, index) => (
                <div
                  key={`${section.description}-${index}`}
                  className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
                >
                  <span className="text-[var(--color-muted-foreground)] font-mono">-</span>
                  <span className="flex-1 text-sm text-[var(--color-foreground)]">
                    {section.description}
                  </span>
                  {section.pattern && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]">
                      {section.pattern}
                    </span>
                  )}
                  {editable && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEditSection && (
                        <button
                          type="button"
                          onClick={() => onEditSection(index)}
                          className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteSection && (
                        <button
                          type="button"
                          onClick={() => onDeleteSection(index)}
                          className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
              No sections defined
            </div>
          )}
        </div>

        {/* Actions */}
        {(hasActions || editable) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                <DomainKeyword category="page">Users can:</DomainKeyword>
              </span>
              {editable && onAddAction && (
                <button
                  type="button"
                  onClick={onAddAction}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Plus className="w-3 h-3" />
                  Add action
                </button>
              )}
            </div>

            {hasActions ? (
              <div className="space-y-1 ml-4">
                {page.actions.map((action, index) => (
                  <div
                    key={`${action.trigger}-${index}`}
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-secondary)]"
                  >
                    <span className="text-[var(--color-muted-foreground)] font-mono">-</span>
                    <span className="text-sm text-[var(--color-foreground)]">
                      {action.trigger}
                      {action.action && (
                        <>
                          {' '}
                          <DomainKeyword category="page">to</DomainKeyword>
                          {' '}
                          {action.action}
                        </>
                      )}
                    </span>
                    {editable && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                        {onEditAction && (
                          <button
                            type="button"
                            onClick={() => onEditAction(index)}
                            className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onDeleteAction && (
                          <button
                            type="button"
                            onClick={() => onDeleteAction(index)}
                            className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
                No actions defined
              </div>
            )}
          </div>
        )}

        {/* On Access */}
        {page.onAccess && (
          <div className="text-sm text-[var(--color-muted-foreground)]">
            <DomainKeyword category="page">When accessed:</DomainKeyword>
            {' '}
            {page.onAccess}
          </div>
        )}
      </div>
    </DomainSectionHeader>
  );
};

DomainPageSection.displayName = 'DomainPageSection';
