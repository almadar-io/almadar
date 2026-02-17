/**
 * DomainLogicView Template
 *
 * Full page template for viewing and editing domain logic.
 * Provides tabbed interface between structured view, raw editor, and AI summary.
 * Hook-free: accepts all data and callbacks as props.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { clsx as cn } from 'clsx';
import { Layers, Code, RefreshCw, Save, CheckCircle, FileText, Sparkles, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Tabs } from '@almadar/ui';
import {
  DomainEntitySection,
  DomainPageSection,
  DomainBehaviorSection,
  DomainEditor,
} from '../organisms/domain';
import type { EntityData, PageData, BehaviorData, ValidationError } from '../organisms/domain';
import { DomainValidationSummary } from '../molecules/domain-editing';
import type { ValidationSummary } from '../molecules/domain-editing';

export interface DomainLogicViewProps {
  entities: EntityData[];
  pages: PageData[];
  behaviors: BehaviorData[];
  domainText: string;
  summary?: string;
  onDomainTextChange?: (text: string) => void;
  errors?: ValidationError[];
  syncing?: boolean;
  hasChanges?: boolean;
  onSync?: () => void;
  onSave?: () => void;
  onEditEntity?: (entityIndex: number) => void;
  onDeleteEntity?: (entityIndex: number) => void;
  onEditPage?: (pageIndex: number) => void;
  onDeletePage?: (pageIndex: number) => void;
  onEditBehavior?: (behaviorIndex: number) => void;
  onDeleteBehavior?: (behaviorIndex: number) => void;
  readOnly?: boolean;
  defaultTab?: 'structured' | 'editor' | 'summary';
  /** Whether AI summary is currently generating */
  isSummaryLoading?: boolean;
  /** Progress message during summary generation */
  summaryProgress?: string;
  /** Error from summary generation */
  summaryError?: string | null;
  /** Callback to generate AI summary */
  onGenerateSummary?: () => void;
  className?: string;
}

type ViewTab = 'structured' | 'editor' | 'summary';

export const DomainLogicView: React.FC<DomainLogicViewProps> = ({
  entities, pages, behaviors, domainText, summary,
  onDomainTextChange, errors = [], syncing = false, hasChanges = false,
  onSync, onSave, onEditEntity, onDeleteEntity, onEditPage, onDeletePage,
  onEditBehavior, onDeleteBehavior, readOnly = false, defaultTab = 'structured',
  isSummaryLoading = false, summaryProgress, summaryError, onGenerateSummary,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<ViewTab>(defaultTab);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const validationSummary: ValidationSummary = useMemo(() => ({
    errors: errors.filter((e) => e.severity !== 'warning' && e.severity !== 'info').length,
    warnings: errors.filter((e) => e.severity === 'warning').length,
  }), [errors]);

  const isValid = validationSummary.errors === 0 && validationSummary.warnings === 0;

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const isSectionExpanded = useCallback((sectionId: string) => {
    return expandedSections[sectionId] !== false;
  }, [expandedSections]);

  const tabs = [
    { id: 'structured', label: 'Structured View', icon: Layers as LucideIcon, content: null },
    { id: 'editor', label: 'Raw Editor', icon: Code as LucideIcon, content: null },
    { id: 'summary', label: 'Summary', icon: FileText as LucideIcon, content: null },
  ];

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">Domain Logic</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">View and edit your application's domain knowledge</p>
        </div>
        <div className="flex items-center gap-3">
          {isValid ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
                color: 'var(--color-success)',
              }}
            >
              <CheckCircle className="w-4 h-4" /> Valid
            </div>
          ) : (
            <DomainValidationSummary summary={validationSummary} />
          )}
          {onSync && (
            <button type="button" onClick={onSync} disabled={syncing}
              className={cn('flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-sm font-medium', syncing && 'opacity-50 cursor-not-allowed')}>
              <RefreshCw className={cn('w-4 h-4', syncing && 'animate-spin')} /> Sync
            </button>
          )}
          {onSave && !readOnly && (
            <button type="button" onClick={onSave} disabled={!hasChanges || syncing}
              className={cn('flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium', (!hasChanges || syncing) && 'opacity-50 cursor-not-allowed')}
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }}>
              <Save className="w-4 h-4" /> Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <Tabs items={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as ViewTab)} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--color-background)] p-6">
        {activeTab === 'structured' ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] flex items-center gap-2">
                Entities <span className="text-sm font-normal text-[var(--color-muted-foreground)]">({entities.length})</span>
              </h2>
              {entities.length > 0 ? entities.map((entity, index) => (
                <DomainEntitySection key={entity.name} entity={entity}
                  expanded={isSectionExpanded(`entity_${entity.name}`)} onExpandedChange={() => toggleSection(`entity_${entity.name}`)}
                  editable={!readOnly} onEdit={onEditEntity ? () => onEditEntity(index) : undefined}
                  onDelete={onDeleteEntity ? () => onDeleteEntity(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `entity_${entity.name}`)} />
              )) : <div className="text-center py-8 text-[var(--color-muted-foreground)]">No entities defined</div>}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] flex items-center gap-2">
                Pages <span className="text-sm font-normal text-[var(--color-muted-foreground)]">({pages.length})</span>
              </h2>
              {pages.length > 0 ? pages.map((page, index) => (
                <DomainPageSection key={page.name} page={page}
                  expanded={isSectionExpanded(`page_${page.name}`)} onExpandedChange={() => toggleSection(`page_${page.name}`)}
                  editable={!readOnly} onEdit={onEditPage ? () => onEditPage(index) : undefined}
                  onDelete={onDeletePage ? () => onDeletePage(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `page_${page.name}`)} />
              )) : <div className="text-center py-8 text-[var(--color-muted-foreground)]">No pages defined</div>}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--color-foreground)] flex items-center gap-2">
                Behaviors <span className="text-sm font-normal text-[var(--color-muted-foreground)]">({behaviors.length})</span>
              </h2>
              {behaviors.length > 0 ? behaviors.map((behavior, index) => (
                <DomainBehaviorSection key={behavior.name} behavior={behavior}
                  expanded={isSectionExpanded(`behavior_${behavior.name}`)} onExpandedChange={() => toggleSection(`behavior_${behavior.name}`)}
                  editable={!readOnly} onEdit={onEditBehavior ? () => onEditBehavior(index) : undefined}
                  onDelete={onDeleteBehavior ? () => onDeleteBehavior(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `behavior_${behavior.name}`)} />
              )) : <div className="text-center py-8 text-[var(--color-muted-foreground)]">No behaviors defined</div>}
            </div>
          </div>
        ) : activeTab === 'editor' ? (
          <div className="max-w-5xl mx-auto">
            <DomainEditor value={domainText} onChange={onDomainTextChange} readOnly={readOnly} errors={errors}
              height="calc(100vh - 280px)" onSync={onSync} syncing={syncing} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Schema Summary</h2>
                  <p className="text-sm text-[var(--color-muted-foreground)]">AI-generated overview of your application</p>
                </div>
                {onGenerateSummary && (
                  <button type="button" onClick={onGenerateSummary} disabled={isSummaryLoading || !domainText}
                    className={cn('flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium', (isSummaryLoading || !domainText) && 'opacity-50 cursor-not-allowed')}
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }}>
                    {isSummaryLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Summary</>}
                  </button>
                )}
              </div>

              {isSummaryLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
                  <p className="text-[var(--color-muted-foreground)]">Analyzing your domain language...</p>
                  {summaryProgress && <p className="text-sm text-[var(--color-muted-foreground)] mt-2">{summaryProgress}</p>}
                </div>
              ) : summary ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-[var(--color-foreground)]">{summary}</div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-[var(--color-muted-foreground)] mb-4" />
                  <p className="text-[var(--color-muted-foreground)] mb-2">No summary available yet</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">Click "Generate Summary" to create an AI-powered overview.</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-medium text-[var(--color-foreground)] mb-3">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[var(--color-secondary)] rounded-md p-3 text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{entities.length}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">Entities</div>
                  </div>
                  <div className="bg-[var(--color-secondary)] rounded-md p-3 text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{pages.length}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">Pages</div>
                  </div>
                  <div className="bg-[var(--color-secondary)] rounded-md p-3 text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{behaviors.length}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">Behaviors</div>
                  </div>
                </div>
              </div>

              {summaryError && (
                <div
                  className="mt-4 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                    color: 'var(--color-error)',
                  }}
                >{summaryError}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DomainLogicView.displayName = 'DomainLogicView';
export default DomainLogicView;
