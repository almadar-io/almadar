/**
 * ValidationReportBoard Organism
 *
 * Displays validation errors and warnings from schema validation.
 * Shows auto-fixable issues with "Apply Fix" buttons.
 * Groups issues by category with expandable details.
 */

import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Wrench,
  Info,
  FileCode,
  Lightbulb,
  RefreshCw,
} from 'lucide-react';
import { Card, Badge, Button, Typography, Box, HStack, VStack } from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

export interface ValidationError {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  path?: string | string[];
  suggestion?: string;
}

export interface ValidationReportBoardProps {
  errors: ValidationError[];
  warnings: ValidationError[];
  onApplyFix?: (error: ValidationError, fixType: string) => void;
  onApplyAllFixes?: () => void;
  onRerunValidation?: () => void;
  isApplyingFixes?: boolean;
  isValidating?: boolean;
  className?: string;
}

// =============================================================================
// Helpers
// =============================================================================

const AUTO_FIXABLE_CODES = [
  'EMPTY_TYPOGRAPHY', 'EMPTY_BUTTON', 'LINT_EMPTY_TYPOGRAPHY',
  'MISSING_BINDING_SYNTAX', 'INVALID_BINDING_PATH',
  'MISSING_INITIAL', 'DUPLICATE_INITIAL_STATE', 'MISSING_INITIAL_PAGE', 'DUPLICATE_INITIAL_PAGE',
  'INVALID_EVENT_KEY', 'DUPLICATE_EVENT',
  'MISSING_ENTITY_ID', 'ORPHAN_TRANSITION',
  'MISSING_PAGE_PURPOSE', 'MISSING_NAVIGATION_EFFECT',
];

function isAutoFixable(error: ValidationError): boolean {
  return AUTO_FIXABLE_CODES.includes(error.code);
}

function getCategoryName(code: string): string {
  const prefix = code.split('_')[0];
  const map: Record<string, string> = {
    EMPTY: 'Empty Content', MISSING: 'Missing Required', INVALID: 'Invalid Value',
    DUPLICATE: 'Duplicates', ORPHAN: 'Orphaned', CP: 'Component',
    SYS: 'System State', EF: 'Effect', SM: 'State Machine',
    UI: 'User Interface', NV: 'Navigation', LT: 'Lint', LINT: 'Lint',
  };
  return map[prefix] || 'Other';
}

interface GroupedErrors { category: string; errors: ValidationError[]; }

function groupErrors(errors: ValidationError[]): GroupedErrors[] {
  const groups: Record<string, ValidationError[]> = {};
  for (const error of errors) {
    const cat = getCategoryName(error.code);
    (groups[cat] ??= []).push(error);
  }
  return Object.entries(groups)
    .map(([category, errors]) => ({ category, errors }))
    .sort((a, b) => b.errors.length - a.errors.length);
}

// =============================================================================
// Sub-Components
// =============================================================================

function SeverityIcon({ severity }: { severity: ValidationError['severity'] }) {
  switch (severity) {
    case 'error': return <XCircle style={{ width: 16, height: 16, color: 'var(--color-error)' }} />;
    case 'warning': return <AlertTriangle style={{ width: 16, height: 16, color: 'var(--color-warning)' }} />;
    case 'info': return <Info style={{ width: 16, height: 16, color: 'var(--color-info)' }} />;
    default: return <Info style={{ width: 16, height: 16, color: 'var(--color-muted-foreground)' }} />;
  }
}

const ErrorItem: React.FC<{
  error: ValidationError;
  onApplyFix?: (error: ValidationError, fixType: string) => void;
  isApplyingFixes?: boolean;
}> = ({ error, onApplyFix, isApplyingFixes }) => {
  const [expanded, setExpanded] = useState(false);
  const canFix = isAutoFixable(error);

  return (
    <Box style={{ borderBottom: '1px solid var(--color-border)' }}>
      <HStack
        style={{
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '0.75rem',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box
          as="button"
          style={{ marginTop: 2, color: 'var(--color-muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {expanded ? <ChevronDown style={{ width: 16, height: 16 }} /> : <ChevronRight style={{ width: 16, height: 16 }} />}
        </Box>
        <SeverityIcon severity={error.severity} />
        <VStack style={{ flex: 1, minWidth: 0, gap: '0.25rem' }}>
          <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant={error.severity === 'error' ? 'danger' : 'warning'} size="sm">{error.code}</Badge>
            {canFix && <Badge variant="primary" size="sm">Auto-fixable</Badge>}
          </HStack>
          <Typography variant="body2">{error.message}</Typography>
        </VStack>
        {canFix && onApplyFix && (
          <Button size="sm" variant="secondary" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onApplyFix(error, error.code); }} disabled={isApplyingFixes}>
            <Wrench style={{ width: 12, height: 12, marginRight: 4 }} />Fix
          </Button>
        )}
      </HStack>
      {expanded && (
        <VStack style={{ paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingBottom: '0.75rem', gap: '0.5rem' }}>
          {error.path && (Array.isArray(error.path) ? error.path.length > 0 : error.path) && (
            <HStack style={{ alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <FileCode style={{ width: 16, height: 16, color: 'var(--color-muted-foreground)' }} />
              <Typography
                variant="caption"
                style={{ fontFamily: 'monospace', color: 'var(--color-muted-foreground)' }}
              >
                {Array.isArray(error.path) ? error.path.join('.') : error.path}
              </Typography>
            </HStack>
          )}
          {error.suggestion && (
            <HStack
              style={{
                alignItems: 'flex-start',
                gap: '0.5rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem',
              }}
            >
              <Lightbulb style={{ width: 16, height: 16, color: 'var(--color-warning)', marginTop: 2, flexShrink: 0 }} />
              <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>{error.suggestion}</Typography>
            </HStack>
          )}
        </VStack>
      )}
    </Box>
  );
};

const ErrorGroup: React.FC<{
  group: GroupedErrors;
  onApplyFix?: (error: ValidationError, fixType: string) => void;
  isApplyingFixes?: boolean;
}> = ({ group, onApplyFix, isApplyingFixes }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <Box
        as="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem',
          backgroundColor: 'var(--color-surface)',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
          {collapsed
            ? <ChevronRight style={{ width: 16, height: 16, color: 'var(--color-muted-foreground)' }} />
            : <ChevronDown style={{ width: 16, height: 16, color: 'var(--color-muted-foreground)' }} />
          }
          <Typography variant="body2" style={{ fontWeight: 500 }}>{group.category}</Typography>
          <Badge variant="default" size="sm">{group.errors.length}</Badge>
        </HStack>
      </Box>
      {!collapsed && (
        <Box style={{ backgroundColor: 'var(--color-card)' }}>
          {group.errors.map((error, index) => (
            <ErrorItem key={`${error.code}-${index}`} error={error} onApplyFix={onApplyFix} isApplyingFixes={isApplyingFixes} />
          ))}
        </Box>
      )}
    </Box>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const ValidationReportBoard: React.FC<ValidationReportBoardProps> = ({
  errors, warnings, onApplyFix, onApplyAllFixes, onRerunValidation,
  isApplyingFixes = false, isValidating = false, className = '',
}) => {
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;
  const totalIssues = errors.length + warnings.length;

  const groupedErrors = useMemo(() => groupErrors(errors), [errors]);
  const groupedWarnings = useMemo(() => groupErrors(warnings), [warnings]);
  const fixableCount = useMemo(() => [...errors, ...warnings].filter(isAutoFixable).length, [errors, warnings]);

  if (!hasErrors && !hasWarnings) {
    return (
      <Card className={className}>
        <VStack style={{ alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '0.5rem' }}>
          <CheckCircle2 style={{ width: 48, height: 48, color: 'var(--color-success)', marginBottom: '0.5rem' }} />
          <Typography variant="h6">Schema Valid</Typography>
          <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)', textAlign: 'center' }}>No validation errors or warnings found.</Typography>
          {onRerunValidation && (
            <Button variant="secondary" size="sm" onClick={onRerunValidation} disabled={isValidating} style={{ marginTop: '0.75rem' }}>
              <RefreshCw style={{ width: 16, height: 16, marginRight: '0.5rem', ...(isValidating ? { animation: 'spin 1s linear infinite' } : {}) }} />
              {isValidating ? 'Validating...' : 'Rerun Validation'}
            </Button>
          )}
        </VStack>
      </Card>
    );
  }

  return (
    <VStack className={className} style={{ gap: '1rem' }}>
      {/* Summary Header */}
      <Card>
        <HStack style={{ padding: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack style={{ alignItems: 'center', gap: '1rem' }}>
            <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
              {hasErrors
                ? <XCircle style={{ width: 24, height: 24, color: 'var(--color-error)' }} />
                : <AlertTriangle style={{ width: 24, height: 24, color: 'var(--color-warning)' }} />
              }
              <Typography variant="h6">{totalIssues} Issue{totalIssues !== 1 ? 's' : ''} Found</Typography>
            </HStack>
            <HStack style={{ alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              {hasErrors && (
                <HStack style={{ alignItems: 'center', gap: '0.25rem', color: 'var(--color-error)' }}>
                  <XCircle style={{ width: 16, height: 16 }} />
                  <span>{errors.length} error{errors.length !== 1 ? 's' : ''}</span>
                </HStack>
              )}
              {hasWarnings && (
                <HStack style={{ alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                  <AlertTriangle style={{ width: 16, height: 16 }} />
                  <span>{warnings.length} warning{warnings.length !== 1 ? 's' : ''}</span>
                </HStack>
              )}
            </HStack>
          </HStack>
          <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
            {onRerunValidation && (
              <Button variant="ghost" onClick={onRerunValidation} disabled={isValidating || isApplyingFixes}>
                <RefreshCw style={{ width: 16, height: 16, marginRight: '0.5rem', ...(isValidating ? { animation: 'spin 1s linear infinite' } : {}) }} />
                {isValidating ? 'Validating...' : 'Rerun'}
              </Button>
            )}
            {fixableCount > 0 && onApplyAllFixes && (
              <Button variant="secondary" onClick={onApplyAllFixes} disabled={isApplyingFixes || isValidating}>
                <Wrench style={{ width: 16, height: 16, marginRight: '0.5rem' }} />Fix All ({fixableCount})
              </Button>
            )}
          </HStack>
        </HStack>
      </Card>

      {/* Errors */}
      {hasErrors && (
        <VStack style={{ gap: '0.75rem' }}>
          <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
            <XCircle style={{ width: 20, height: 20, color: 'var(--color-error)' }} />
            <Typography variant="body2" style={{ fontWeight: 600, color: 'var(--color-error)' }}>Errors (must fix to save)</Typography>
          </HStack>
          <VStack style={{ gap: '0.5rem' }}>
            {groupedErrors.map((group) => (
              <ErrorGroup key={group.category} group={group} onApplyFix={onApplyFix} isApplyingFixes={isApplyingFixes} />
            ))}
          </VStack>
        </VStack>
      )}

      {/* Warnings */}
      {hasWarnings && (
        <VStack style={{ gap: '0.75rem' }}>
          <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle style={{ width: 20, height: 20, color: 'var(--color-warning)' }} />
            <Typography variant="body2" style={{ fontWeight: 600, color: 'var(--color-warning)' }}>Warnings (recommended to fix)</Typography>
          </HStack>
          <VStack style={{ gap: '0.5rem' }}>
            {groupedWarnings.map((group) => (
              <ErrorGroup key={group.category} group={group} onApplyFix={onApplyFix} isApplyingFixes={isApplyingFixes} />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

ValidationReportBoard.displayName = 'ValidationReportBoard';
export default ValidationReportBoard;
