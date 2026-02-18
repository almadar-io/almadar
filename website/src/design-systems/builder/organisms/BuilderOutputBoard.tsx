/**
 * BuilderOutputBoard Organism
 *
 * Main tab component for visualizing Builder Agent output.
 * Combines ExpansionSummaryBoard, ComponentTreeBoard, and ValidationReportBoard.
 */

import React, { useState } from 'react';
import { BarChart3, GitBranch, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Typography, Badge, Button, Card, Box, HStack, VStack, Icon, Select, type SelectOption } from '@almadar/ui';
import { ExpansionSummaryBoard, type SummarySchema } from './ExpansionSummaryBoard';
import { ComponentTreeBoard } from './ComponentTreeBoard';
import { ValidationReportBoard, type ValidationError } from './ValidationReportBoard';

// =============================================================================
// Types
// =============================================================================

export interface BuilderOutputBoardProps {
  schema: SummarySchema & { ui?: { pages?: Array<{ name: string; path: string; isInitial?: boolean; purpose?: string; components?: unknown[] }> } };
  validationErrors?: ValidationError[];
  validationWarnings?: ValidationError[];
  onApplyFix?: (error: ValidationError, fixType: string) => void;
  onApplyAllFixes?: () => void;
  onRerunValidation?: () => void;
  isApplyingFixes?: boolean;
  isValidating?: boolean;
  className?: string;
}

type ViewMode = 'summary' | 'states' | 'components' | 'validation';

// =============================================================================
// Sub-Components
// =============================================================================

const ViewModeButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ icon, label, active, onClick, badge }) => (
  <Button
    variant={active ? 'primary' : 'ghost'}
    size="sm"
    onClick={onClick}
    className="flex items-center gap-2"
    style={active
      ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
      : { color: 'var(--color-muted-foreground)' }
    }
  >
    {icon}
    <Typography variant="label" weight="medium">
      {label}
    </Typography>
    {badge !== undefined && badge > 0 && (
      <Badge variant="danger" size="sm">{badge}</Badge>
    )}
  </Button>
);

// =============================================================================
// Main Component
// =============================================================================

export const BuilderOutputBoard: React.FC<BuilderOutputBoardProps> = ({
  schema,
  validationErrors = [],
  validationWarnings = [],
  onApplyFix,
  onApplyAllFixes,
  onRerunValidation,
  isApplyingFixes = false,
  isValidating = false,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('summary');
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>();

  const events = (schema.stateMachine?.events || []) as Array<{ key: string; name: string }>;

  const hasValidationIssues = validationErrors.length > 0 || validationWarnings.length > 0;
  const validationCount = validationErrors.length + validationWarnings.length;

  const eventSelectOptions: SelectOption[] = [
    { value: '', label: 'All states' },
    ...events.map((event) => ({
      value: event.key,
      label: `${event.name} (${event.key})`,
    })),
  ];

  return (
    <VStack gap="md" className={className}>
      {/* Header */}
      <HStack justify="between" align="center">
        <VStack gap="xs">
          <Typography variant="h4" style={{ color: 'var(--color-foreground)' }}>Builder Output</Typography>
          <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
            Visualize what the Builder Agent added to expand your schema
          </Typography>
        </VStack>
      </HStack>

      {/* View Mode Tabs */}
      <HStack
        gap="sm"
        align="center"
        className="border-b pb-2"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <ViewModeButton icon={<Icon icon={BarChart3} size="sm" />} label="Summary" active={viewMode === 'summary'} onClick={() => setViewMode('summary')} />
        <ViewModeButton icon={<Icon icon={GitBranch} size="sm" />} label="System States" active={viewMode === 'states'} onClick={() => setViewMode('states')} />
        <ViewModeButton icon={<Icon icon={Layers} size="sm" />} label="Components" active={viewMode === 'components'} onClick={() => setViewMode('components')} />
        <ViewModeButton
          icon={hasValidationIssues
            ? <Icon icon={AlertTriangle} size="sm" style={{ color: 'var(--color-warning)' }} />
            : <Icon icon={CheckCircle2} size="sm" style={{ color: 'var(--color-success)' }} />
          }
          label="Validation"
          active={viewMode === 'validation'}
          onClick={() => setViewMode('validation')}
          badge={hasValidationIssues ? validationCount : undefined}
        />
      </HStack>

      {/* Content */}
      <Box className="min-h-[500px]">
        {viewMode === 'summary' && <ExpansionSummaryBoard schema={schema} />}

        {viewMode === 'states' && (
          <VStack gap="md">
            <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <Box className="py-2 px-3">
                <HStack gap="sm" align="center">
                  <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Filter by event:</Typography>
                  <Select
                    value={selectedEvent || ''}
                    onChange={(e) => setSelectedEvent(e.target.value || undefined)}
                    options={eventSelectOptions}
                    className="text-sm rounded px-2 py-1"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-foreground)',
                      borderColor: 'var(--color-border)',
                    }}
                  />
                  {selectedEvent && (
                    <Button size="sm" variant="ghost" onClick={() => setSelectedEvent(undefined)}>Clear</Button>
                  )}
                </HStack>
              </Box>
            </Card>

            <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <Box className="p-4">
                <Typography variant="h6" className="mb-4" style={{ color: 'var(--color-foreground)' }}>System State Diagram</Typography>
                <Typography variant="body2" align="center" style={{ color: 'var(--color-muted-foreground)' }}>
                  State diagram visualization is currently unavailable.
                </Typography>
              </Box>
            </Card>
          </VStack>
        )}

        {viewMode === 'components' && (
          <Card className="h-[600px]" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <Box className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <Typography variant="h6" style={{ color: 'var(--color-foreground)' }}>Component Tree</Typography>
            </Box>
            <Box className="h-[calc(100%-60px)]">
              <ComponentTreeBoard schema={schema} />
            </Box>
          </Card>
        )}

        {viewMode === 'validation' && (
          <ValidationReportBoard
            errors={validationErrors}
            warnings={validationWarnings}
            onApplyFix={onApplyFix}
            onApplyAllFixes={onApplyAllFixes}
            onRerunValidation={onRerunValidation}
            isApplyingFixes={isApplyingFixes}
            isValidating={isValidating}
          />
        )}
      </Box>
    </VStack>
  );
};

BuilderOutputBoard.displayName = 'BuilderOutputBoard';
export default BuilderOutputBoard;
