/**
 * BuilderOutputBoard Organism
 *
 * Main tab component for visualizing Builder Agent output.
 * Combines ExpansionSummaryBoard, ComponentTreeBoard, and ValidationReportBoard.
 */

import React, { useState, useMemo } from 'react';
import { BarChart3, GitBranch, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Typography, Badge, Button, Card } from '@almadar/ui';
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
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    style={active
      ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-foreground)' }
      : { color: 'var(--color-muted-foreground)' }
    }
  >
    {icon}
    {label}
    {badge !== undefined && badge > 0 && (
      <Badge variant="danger" size="sm">{badge}</Badge>
    )}
  </button>
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

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" style={{ color: 'var(--color-foreground)' }}>Builder Output</Typography>
          <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
            Visualize what the Builder Agent added to expand your schema
          </Typography>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--color-border)' }}>
        <ViewModeButton icon={<BarChart3 className="w-4 h-4" />} label="Summary" active={viewMode === 'summary'} onClick={() => setViewMode('summary')} />
        <ViewModeButton icon={<GitBranch className="w-4 h-4" />} label="System States" active={viewMode === 'states'} onClick={() => setViewMode('states')} />
        <ViewModeButton icon={<Layers className="w-4 h-4" />} label="Components" active={viewMode === 'components'} onClick={() => setViewMode('components')} />
        <ViewModeButton
          icon={hasValidationIssues
            ? <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
            : <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
          }
          label="Validation"
          active={viewMode === 'validation'}
          onClick={() => setViewMode('validation')}
          badge={hasValidationIssues ? validationCount : undefined}
        />
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {viewMode === 'summary' && <ExpansionSummaryBoard schema={schema} />}

        {viewMode === 'states' && (
          <div className="space-y-4">
            <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="py-2 px-3">
                <div className="flex items-center gap-3">
                  <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Filter by event:</Typography>
                  <select
                    value={selectedEvent || ''}
                    onChange={(e) => setSelectedEvent(e.target.value || undefined)}
                    className="text-sm rounded px-2 py-1 border focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-foreground)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <option value="">All states</option>
                    {events.map((event) => (
                      <option key={event.key} value={event.key}>{event.name} ({event.key})</option>
                    ))}
                  </select>
                  {selectedEvent && (
                    <Button size="sm" variant="ghost" onClick={() => setSelectedEvent(undefined)}>Clear</Button>
                  )}
                </div>
              </div>
            </Card>

            <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="p-4">
                <Typography variant="h6" className="mb-4" style={{ color: 'var(--color-foreground)' }}>System State Diagram</Typography>
                <Typography variant="body2" className="text-center" style={{ color: 'var(--color-muted-foreground)' }}>
                  State diagram visualization is currently unavailable.
                </Typography>
              </div>
            </Card>
          </div>
        )}

        {viewMode === 'components' && (
          <Card className="h-[600px]" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <Typography variant="h6" style={{ color: 'var(--color-foreground)' }}>Component Tree</Typography>
            </div>
            <div className="h-[calc(100%-60px)]">
              <ComponentTreeBoard schema={schema} />
            </div>
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
      </div>
    </div>
  );
};

BuilderOutputBoard.displayName = 'BuilderOutputBoard';
export default BuilderOutputBoard;
