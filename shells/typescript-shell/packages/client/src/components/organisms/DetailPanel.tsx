/**
 * DetailPanel Organism Component
 *
 * Composes atoms and molecules to create a professional detail view.
 *
 * When `entity` prop is provided without `data`, automatically fetches data
 * using the useEntityDetail hook with ID from URL params.
 */

import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, TrendingUp, User, Clock, CheckCircle2, AlertCircle, DollarSign, FileText, Package, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, Badge, Typography, Icon, Avatar, Button, Divider, ProgressBar } from '../atoms';
import { VStack, HStack } from '../atoms/Stack';
import { SimpleGrid } from '../molecules/SimpleGrid';
import { LoadingState } from '../molecules/LoadingState';
import { ErrorState } from '../molecules/ErrorState';
import { EmptyState } from '../molecules/EmptyState';
import { cn } from '../../lib/cn';
import { useEntityDetail } from '../../hooks/useEntityData';
import { useSelectedEntity } from '../../hooks/useUIEvents';
import { useEventBus } from '../../hooks/useEventBus';

function getFieldIcon(fieldName: string): LucideIcon {
  const name = fieldName.toLowerCase();
  if (name.includes('date') || name.includes('time')) return Calendar;
  if (name.includes('status')) return Tag;
  if (name.includes('priority')) return AlertCircle;
  if (name.includes('progress') || name.includes('percent')) return TrendingUp;
  if (name.includes('assignee') || name.includes('owner') || name.includes('user') || name.includes('member')) return User;
  if (name.includes('due')) return Clock;
  if (name.includes('complete')) return CheckCircle2;
  if (name.includes('budget') || name.includes('cost') || name.includes('price')) return DollarSign;
  if (name.includes('description') || name.includes('note') || name.includes('comment')) return FileText;
  return Package;
}

function getBadgeVariant(fieldName: string, value: string): 'default' | 'success' | 'warning' | 'danger' | 'info' {
  const name = fieldName.toLowerCase();
  const val = String(value).toLowerCase();

  if (name.includes('status')) {
    if (val.includes('complete') || val.includes('done') || val.includes('active')) return 'success';
    if (val.includes('progress') || val.includes('pending')) return 'warning';
    if (val.includes('block') || val.includes('cancel')) return 'danger';
    return 'info';
  }

  if (name.includes('priority')) {
    if (val.includes('high') || val.includes('urgent')) return 'danger';
    if (val.includes('medium') || val.includes('normal')) return 'warning';
    if (val.includes('low')) return 'info';
  }

  return 'default';
}

function formatFieldLabel(fieldName: string): string {
  return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function formatFieldValue(value: unknown, fieldName: string): string {
  if (typeof value === 'number') {
    if (fieldName.toLowerCase().includes('progress') || fieldName.toLowerCase().includes('percent')) {
      return `${value}%`;
    }
    if (fieldName.toLowerCase().includes('budget') || fieldName.toLowerCase().includes('cost')) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  }
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return String(value);
}

export interface DetailField {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  copyable?: boolean;
}

export interface DetailSection {
  title: string;
  fields: DetailField[];
}

/**
 * Action definition for DetailPanel
 */
export interface DetailPanelAction {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  /** Event to emit via event bus */
  event?: string;
  /** Navigation URL */
  navigatesTo?: string;
  /** Button variant (primary for main action, others for secondary) */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export interface DetailPanelProps {
  title?: string;
  subtitle?: string;
  status?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  };
  avatar?: React.ReactNode;
  sections?: readonly DetailSection[];
  /** Unified actions array - first action with variant='primary' is the main action */
  actions?: readonly DetailPanelAction[];
  footer?: React.ReactNode;
  slideOver?: boolean;
  onClose?: () => void;
  className?: string;

  // Schema-based props
  entity?: string;
  /** Field names - accepts readonly for generated const arrays */
  fieldNames?: readonly string[];
  /** Explicit field definitions - accepts readonly for generated const arrays */
  fields?: readonly DetailField[];
  data?: Record<string, unknown> | unknown;
  isLoading?: boolean;
  error?: Error | null;
  /** Panel position (for drawer/sidebar placement) */
  position?: 'left' | 'right';
  /** Panel width (CSS value, e.g., '400px', '50%') */
  width?: string;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  title: propTitle,
  subtitle,
  status,
  avatar,
  sections: propSections,
  actions,
  footer,
  slideOver = false,
  onClose,
  className,
  entity,
  fieldNames,
  data: externalData,
  isLoading: externalLoading = false,
  error: externalError,
}) => {
  // Get ID from URL params for auto-fetching on detail pages
  const { id: urlId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventBus = useEventBus();

  // Get selected entity from event bus (for drawer/sidebar usage when entity is selected via UI:VIEW/UI:SELECT)
  const [selectedEntity] = useSelectedEntity<Record<string, unknown>>();

  // Handle action click with event bus and navigation support
  const handleActionClick = useCallback((action: DetailPanelAction, data?: Record<string, unknown>) => {
    if (action.navigatesTo) {
      // Replace template variables in URL
      const url = action.navigatesTo.replace(/\{\{(\w+)\}\}/g, (_, key) =>
        String(data?.[key] ?? '')
      );
      navigate(url);
      return;
    }
    if (action.event) {
      eventBus.emit(`UI:${action.event}`, { row: data, entity });
    }
    if (action.onClick) {
      action.onClick();
    }
  }, [navigate, eventBus, entity]);

  // Auto-fetch data when entity is provided but no external data and we have an ID
  const shouldAutoFetch = !!entity && !externalData && !selectedEntity && !!urlId;
  const { data: fetchedData, isLoading: fetchLoading, error: fetchError } = useEntityDetail(
    shouldAutoFetch ? entity : undefined,
    shouldAutoFetch ? urlId : undefined
  );

  // Use external data if provided, then selected entity from event bus, then fetched data
  const data = externalData ?? selectedEntity ?? fetchedData;
  const isLoading = externalLoading || (shouldAutoFetch && fetchLoading);
  const error = externalError ?? (shouldAutoFetch ? fetchError : null);

  let title = propTitle;
  // Use a mutable array for building sections, but accept readonly from props
  let sections: DetailSection[] | undefined = propSections ? [...propSections] : undefined;

  // Normalize data to Record type for indexing
  const normalizedData = data && typeof data === 'object' && !Array.isArray(data)
    ? data as Record<string, unknown>
    : undefined;

  // Build sections from schema if provided
  if (normalizedData && fieldNames) {
    const primaryField = fieldNames[0];
    if (!title && primaryField && normalizedData[primaryField]) {
      title = String(normalizedData[primaryField]);
    }

    // Categorize fields
    const statusFields = fieldNames.filter(f =>
      f.toLowerCase().includes('status') || f.toLowerCase().includes('priority')
    );
    const progressFields = fieldNames.filter(f =>
      f.toLowerCase().includes('progress') || f.toLowerCase().includes('percent')
    );
    const metricFields = fieldNames.filter(f =>
      (f.toLowerCase().includes('budget') || f.toLowerCase().includes('cost') || f.toLowerCase().includes('count')) &&
      !progressFields.includes(f)
    );
    const dateFields = fieldNames.filter(f =>
      f.toLowerCase().includes('date') || f.toLowerCase().includes('time')
    );
    const descriptionFields = fieldNames.filter(f =>
      f.toLowerCase().includes('description') || f.toLowerCase().includes('note')
    );
    const otherFields = fieldNames.filter(f =>
      f !== primaryField &&
      !statusFields.includes(f) &&
      !progressFields.includes(f) &&
      !metricFields.includes(f) &&
      !dateFields.includes(f) &&
      !descriptionFields.includes(f)
    );

    sections = [];

    // Overview section
    if (statusFields.length > 0 || otherFields.length > 0) {
      const overviewFields: DetailField[] = [];

      [...statusFields, ...otherFields.slice(0, 3)].forEach(field => {
        const value = normalizedData[field];
        if (value !== undefined && value !== null) {
          overviewFields.push({
            label: formatFieldLabel(field),
            value: formatFieldValue(value, field),
            icon: getFieldIcon(field),
          });
        }
      });

      if (overviewFields.length > 0) {
        sections.push({ title: 'Overview', fields: overviewFields });
      }
    }

    // Metrics section
    if (progressFields.length > 0 || metricFields.length > 0) {
      const metricsFields: DetailField[] = [];

      [...progressFields, ...metricFields].forEach(field => {
        const value = normalizedData[field];
        if (value !== undefined && value !== null) {
          metricsFields.push({
            label: formatFieldLabel(field),
            value: formatFieldValue(value, field),
            icon: getFieldIcon(field),
          });
        }
      });

      if (metricsFields.length > 0) {
        sections.push({ title: 'Metrics', fields: metricsFields });
      }
    }

    // Timeline section
    if (dateFields.length > 0) {
      const timelineFields: DetailField[] = [];

      dateFields.forEach(field => {
        const value = normalizedData[field];
        if (value !== undefined && value !== null) {
          timelineFields.push({
            label: formatFieldLabel(field),
            value: formatFieldValue(value, field),
            icon: getFieldIcon(field),
          });
        }
      });

      if (timelineFields.length > 0) {
        sections.push({ title: 'Timeline', fields: timelineFields });
      }
    }

    // Description section
    if (descriptionFields.length > 0) {
      const descFields: DetailField[] = [];

      descriptionFields.forEach(field => {
        const value = normalizedData[field];
        if (value !== undefined && value !== null) {
          descFields.push({
            label: formatFieldLabel(field),
            value: String(value),
            icon: getFieldIcon(field),
          });
        }
      });

      if (descFields.length > 0) {
        sections.push({ title: 'Details', fields: descFields });
      }
    }
  }

  if (isLoading) {
    return <LoadingState message={`Loading ${entity || 'details'}...`} className={className} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading data"
        message={error.message || 'An error occurred while loading the data.'}
        onRetry={() => window.location.reload()}
        className={className}
      />
    );
  }

  if (!normalizedData && !isLoading && fieldNames && fieldNames.length > 0) {
    return (
      <EmptyState
        title="Not Found"
        description={`The requested ${entity || 'item'} could not be found.`}
        className={className}
      />
    );
  }

  const content = (
    <VStack gap="lg">
      {/* Header Card */}
      <Card variant="elevated">
        <VStack gap="md" className="p-6">
          <HStack justify="between" align="start">
            <VStack gap="sm" flex className="min-w-0">
              {avatar}

              <Typography variant="h2" weight="bold">
                {title || entity || 'Details'}
              </Typography>

              {subtitle && (
                <Typography variant="body" color="secondary">
                  {subtitle}
                </Typography>
              )}

              {/* Status badges */}
              {normalizedData && fieldNames && (
                <HStack gap="xs" wrap>
                  {fieldNames
                    .filter(f => f.toLowerCase().includes('status') || f.toLowerCase().includes('priority'))
                    .map((field) => {
                      const value = normalizedData[field];
                      if (!value) return null;
                      return (
                        <Badge
                          key={field}
                          variant={getBadgeVariant(field, String(value))}
                        >
                          {String(value)}
                        </Badge>
                      );
                    })}
                </HStack>
              )}

              {status && (
                <Badge variant={status.variant as any || 'default'}>
                  {status.label}
                </Badge>
              )}
            </VStack>

            {slideOver && onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={X}
              />
            )}
          </HStack>

          {/* Progress bars */}
          {normalizedData && fieldNames && fieldNames
            .filter(f => f.toLowerCase().includes('progress') || f.toLowerCase().includes('percent'))
            .map((field) => {
              const value = normalizedData[field];
              if (value === undefined || value === null || typeof value !== 'number') return null;
              return (
                <VStack key={field} gap="xs" className="w-full">
                  <HStack justify="between">
                    <Typography variant="small" color="secondary">
                      {formatFieldLabel(field)}
                    </Typography>
                    <Typography variant="small" weight="medium">
                      {value}%
                    </Typography>
                  </HStack>
                  <ProgressBar value={value} />
                </VStack>
              );
            })}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <>
              <Divider />
              <HStack gap="sm">
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || 'secondary'}
                    onClick={() => handleActionClick(action, normalizedData)}
                    icon={action.icon}
                  >
                    {action.label}
                  </Button>
                ))}
              </HStack>
            </>
          )}
        </VStack>
      </Card>

      {/* Sections */}
      {sections && sections.map((section, sectionIdx) => (
        <Card key={sectionIdx} variant="bordered">
          <VStack gap="md" className="p-6">
            <Typography variant="h4" weight="semibold">
              {section.title}
            </Typography>

            <Divider />

            <SimpleGrid minChildWidth="250px" maxCols={2} gap="lg">
              {section.fields.map((field, fieldIdx) => (
                <HStack key={fieldIdx} gap="sm" align="start">
                  {field.icon && (
                    <Icon icon={field.icon} size="md" className="text-gray-500 mt-1" />
                  )}

                  <VStack gap="xs" flex className="min-w-0">
                    <Typography variant="small" color="secondary" weight="medium">
                      {field.label}
                    </Typography>

                    <Typography variant="body" className="break-words">
                      {field.value || '—'}
                    </Typography>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Card>
      ))}

      {/* Footer */}
      {footer && (
        <Card variant="bordered">
          {footer}
        </Card>
      )}
    </VStack>
  );

  return (
    <div className={cn(slideOver && 'fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto p-6', className)}>
      {content}
    </div>
  );
};

DetailPanel.displayName = 'DetailPanel';
