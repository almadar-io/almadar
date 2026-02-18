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
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Icon,
  Card,
  SimpleGrid,
  Tabs,
} from '@almadar/ui';
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
    <VStack className={cn('h-full', className)} gap="none">
      {/* Header */}
      <Box
        as="header"
        className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]"
      >
        <HStack className="items-center justify-between">
          <VStack gap="none">
            <Typography variant="h1" className="text-xl font-semibold text-[var(--color-foreground)]">
              Domain Logic
            </Typography>
            <Typography variant="body2" className="text-sm text-[var(--color-muted-foreground)]">
              View and edit your application's domain knowledge
            </Typography>
          </VStack>
          <HStack className="items-center gap-3">
            {isValid ? (
              <HStack
                className="items-center gap-1.5 px-3 py-1.5 rounded-md text-sm"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
                  color: 'var(--color-success)',
                }}
              >
                <Icon icon={CheckCircle} size="sm" />
                <Typography variant="body2" className="text-sm" style={{ color: 'inherit' }}>
                  Valid
                </Typography>
              </HStack>
            ) : (
              <DomainValidationSummary summary={validationSummary} />
            )}
            {onSync && (
              <Button
                type="button"
                onClick={onSync}
                disabled={syncing}
                variant="secondary"
                size="sm"
                leftIcon={<Icon icon={RefreshCw} size="sm" className={cn(syncing && 'animate-spin')} />}
                className={cn('border border-[var(--color-border)]', syncing && 'opacity-50 cursor-not-allowed')}
              >
                Sync
              </Button>
            )}
            {onSave && !readOnly && (
              <Button
                type="button"
                onClick={onSave}
                disabled={!hasChanges || syncing}
                variant="primary"
                size="sm"
                leftIcon={<Icon icon={Save} size="sm" />}
                className={cn((!hasChanges || syncing) && 'opacity-50 cursor-not-allowed')}
              >
                Save Changes
              </Button>
            )}
          </HStack>
        </HStack>
      </Box>

      {/* Tabs */}
      <Box className="px-6 pt-4 bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <Tabs items={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as ViewTab)} />
      </Box>

      {/* Content */}
      <Box className="flex-1 overflow-auto bg-[var(--color-background)] p-6">
        {activeTab === 'structured' ? (
          <VStack className="space-y-6 max-w-4xl mx-auto">
            <VStack className="space-y-4">
              <HStack className="items-center gap-2">
                <Typography variant="h2" className="text-lg font-semibold text-[var(--color-foreground)]">
                  Entities
                </Typography>
                <Typography variant="body2" className="text-sm font-normal text-[var(--color-muted-foreground)]">
                  ({entities.length})
                </Typography>
              </HStack>
              {entities.length > 0 ? entities.map((entity, index) => (
                <DomainEntitySection key={entity.name} entity={entity}
                  expanded={isSectionExpanded(`entity_${entity.name}`)} onExpandedChange={() => toggleSection(`entity_${entity.name}`)}
                  editable={!readOnly} onEdit={onEditEntity ? () => onEditEntity(index) : undefined}
                  onDelete={onDeleteEntity ? () => onDeleteEntity(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `entity_${entity.name}`)} />
              )) : (
                <Box className="text-center py-8">
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                    No entities defined
                  </Typography>
                </Box>
              )}
            </VStack>

            <VStack className="space-y-4">
              <HStack className="items-center gap-2">
                <Typography variant="h2" className="text-lg font-semibold text-[var(--color-foreground)]">
                  Pages
                </Typography>
                <Typography variant="body2" className="text-sm font-normal text-[var(--color-muted-foreground)]">
                  ({pages.length})
                </Typography>
              </HStack>
              {pages.length > 0 ? pages.map((page, index) => (
                <DomainPageSection key={page.name} page={page}
                  expanded={isSectionExpanded(`page_${page.name}`)} onExpandedChange={() => toggleSection(`page_${page.name}`)}
                  editable={!readOnly} onEdit={onEditPage ? () => onEditPage(index) : undefined}
                  onDelete={onDeletePage ? () => onDeletePage(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `page_${page.name}`)} />
              )) : (
                <Box className="text-center py-8">
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                    No pages defined
                  </Typography>
                </Box>
              )}
            </VStack>

            <VStack className="space-y-4">
              <HStack className="items-center gap-2">
                <Typography variant="h2" className="text-lg font-semibold text-[var(--color-foreground)]">
                  Behaviors
                </Typography>
                <Typography variant="body2" className="text-sm font-normal text-[var(--color-muted-foreground)]">
                  ({behaviors.length})
                </Typography>
              </HStack>
              {behaviors.length > 0 ? behaviors.map((behavior, index) => (
                <DomainBehaviorSection key={behavior.name} behavior={behavior}
                  expanded={isSectionExpanded(`behavior_${behavior.name}`)} onExpandedChange={() => toggleSection(`behavior_${behavior.name}`)}
                  editable={!readOnly} onEdit={onEditBehavior ? () => onEditBehavior(index) : undefined}
                  onDelete={onDeleteBehavior ? () => onDeleteBehavior(index) : undefined}
                  hasError={errors.some((e) => e.sectionId === `behavior_${behavior.name}`)} />
              )) : (
                <Box className="text-center py-8">
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                    No behaviors defined
                  </Typography>
                </Box>
              )}
            </VStack>
          </VStack>
        ) : activeTab === 'editor' ? (
          <Box className="max-w-5xl mx-auto">
            <DomainEditor value={domainText} onChange={onDomainTextChange} readOnly={readOnly} errors={errors}
              height="calc(100vh - 280px)" onSync={onSync} syncing={syncing} />
          </Box>
        ) : (
          <Box className="max-w-3xl mx-auto">
            <Card variant="bordered" padding="lg">
              <HStack className="items-center justify-between mb-6">
                <VStack gap="none">
                  <Typography variant="h2" className="text-lg font-semibold text-[var(--color-foreground)]">
                    Schema Summary
                  </Typography>
                  <Typography variant="body2" className="text-sm text-[var(--color-muted-foreground)]">
                    AI-generated overview of your application
                  </Typography>
                </VStack>
                {onGenerateSummary && (
                  <Button
                    type="button"
                    onClick={onGenerateSummary}
                    disabled={isSummaryLoading || !domainText}
                    variant="primary"
                    size="sm"
                    leftIcon={
                      isSummaryLoading
                        ? <Icon icon={Loader2} size="sm" className="animate-spin" />
                        : <Icon icon={Sparkles} size="sm" />
                    }
                    className={cn((isSummaryLoading || !domainText) && 'opacity-50 cursor-not-allowed')}
                  >
                    {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
                  </Button>
                )}
              </HStack>

              {isSummaryLoading ? (
                <VStack className="items-center justify-center py-12">
                  <Icon icon={Loader2} size="xl" className="animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                    Analyzing your domain language...
                  </Typography>
                  {summaryProgress && (
                    <Typography variant="body2" className="text-sm text-[var(--color-muted-foreground)] mt-2">
                      {summaryProgress}
                    </Typography>
                  )}
                </VStack>
              ) : summary ? (
                <Box className="prose prose-sm dark:prose-invert max-w-none">
                  <Typography variant="body1" className="whitespace-pre-wrap text-[var(--color-foreground)]">
                    {summary}
                  </Typography>
                </Box>
              ) : (
                <VStack className="items-center text-center py-12">
                  <Icon icon={FileText} size="xl" className="mx-auto text-[var(--color-muted-foreground)] mb-4" style={{ width: '3rem', height: '3rem' }} />
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)] mb-2">
                    No summary available yet
                  </Typography>
                  <Typography variant="body2" className="text-sm text-[var(--color-muted-foreground)]">
                    Click "Generate Summary" to create an AI-powered overview.
                  </Typography>
                </VStack>
              )}

              <Box className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <Typography variant="label" className="text-sm font-medium text-[var(--color-foreground)] mb-3">
                  Quick Stats
                </Typography>
                <SimpleGrid cols={3} gap="md">
                  <VStack className="bg-[var(--color-secondary)] rounded-md p-3 text-center items-center">
                    <Typography variant="h2" className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {entities.length}
                    </Typography>
                    <Typography variant="caption" className="text-xs text-[var(--color-muted-foreground)]">
                      Entities
                    </Typography>
                  </VStack>
                  <VStack className="bg-[var(--color-secondary)] rounded-md p-3 text-center items-center">
                    <Typography variant="h2" className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {pages.length}
                    </Typography>
                    <Typography variant="caption" className="text-xs text-[var(--color-muted-foreground)]">
                      Pages
                    </Typography>
                  </VStack>
                  <VStack className="bg-[var(--color-secondary)] rounded-md p-3 text-center items-center">
                    <Typography variant="h2" className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                      {behaviors.length}
                    </Typography>
                    <Typography variant="caption" className="text-xs text-[var(--color-muted-foreground)]">
                      Behaviors
                    </Typography>
                  </VStack>
                </SimpleGrid>
              </Box>

              {summaryError && (
                <Box
                  className="mt-4 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                    color: 'var(--color-error)',
                  }}
                >
                  <Typography variant="body2" className="text-sm" style={{ color: 'inherit' }}>
                    {summaryError}
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

DomainLogicView.displayName = 'DomainLogicView';
export default DomainLogicView;
