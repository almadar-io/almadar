/**
 * ValidationView Template
 *
 * Validation interface for schema checking.
 * Hook-free: accepts validation state as props.
 */

import React from 'react';
import { Typography, Button, LoadingState, Alert, Box, HStack, VStack, Badge } from '@almadar/ui';
import { ValidationReportBoard, type ValidationError } from '../organisms/ValidationReportBoard';
import { RefreshCw, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export interface ValidationViewProps {
  /** Validation stage */
  stage: 'idle' | 'validating' | 'fixing' | 'complete';
  /** Whether currently validating */
  isValidating: boolean;
  /** Whether currently applying fixes */
  isFixing: boolean;
  /** Progress message */
  progressMessage?: string;
  /** Validation errors */
  errors: ValidationError[];
  /** Validation warnings */
  warnings: ValidationError[];
  /** Whether schema is valid */
  isValid: boolean;
  /** Validation error message */
  validationError?: string | null;
  /** Trigger validation */
  onValidate: () => void;
  /** Reset validation state */
  onReset?: () => void;
  /** Report errors to agent */
  onReportErrors?: (reportLines: string[]) => void;
  className?: string;
}

export const ValidationView: React.FC<ValidationViewProps> = ({
  stage, isValidating, isFixing, progressMessage, errors, warnings,
  isValid, validationError, onValidate, onReset, onReportErrors, className = '',
}) => {
  const totalIssues = errors.length + warnings.length;

  const handleReportToAgent = () => {
    if (!onReportErrors) return;
    const reportLines = [
      `I have ${errors.length} errors and ${warnings.length} warnings in my schema.`,
      ...errors.map(e => `[ERROR] ${e.message} at ${e.path}`),
      ...warnings.map(w => `[WARNING] ${w.message} at ${w.path}`),
      'Please fix these issues.',
    ];
    onReportErrors(reportLines);
  };

  return (
    <HStack
      className={className}
      style={{
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-background)',
        transition: 'color 0.2s, background-color 0.2s',
      }}
    >
      <VStack
        as="main"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem',
          transition: 'all 0.2s',
          gap: 0,
        }}
      >
        {/* Header */}
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <VStack style={{ gap: '0.25rem' }}>
            <Typography variant="h4">Schema Validation</Typography>
            <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
              {stage === 'complete' && (
                <Badge variant={isValid ? 'success' : 'warning'} size="sm">
                  <HStack style={{ alignItems: 'center', gap: '0.375rem' }}>
                    {isValid
                      ? <><CheckCircle2 style={{ width: 14, height: 14 }} /><Typography variant="small" color="inherit" as="span">Valid</Typography></>
                      : <><AlertTriangle style={{ width: 14, height: 14 }} /><Typography variant="small" color="inherit" as="span">{totalIssues} Issue{totalIssues !== 1 ? 's' : ''}</Typography></>
                    }
                  </HStack>
                </Badge>
              )}
            </HStack>
          </VStack>
          <HStack style={{ alignItems: 'center', gap: '0.5rem' }}>
            {!isValid && totalIssues > 0 && onReportErrors && (
              <Button variant="primary" onClick={handleReportToAgent}>
                <Sparkles style={{ width: 16, height: 16, marginRight: '0.5rem' }} /> Fix with Agent
              </Button>
            )}
            <Button variant="secondary" onClick={onValidate} disabled={isValidating}>
              <RefreshCw style={{ width: 16, height: 16, marginRight: '0.5rem', ...(isValidating ? { animation: 'spin 1s linear infinite' } : {}) }} />
              {isValidating ? 'Validating...' : 'Revalidate'}
            </Button>
          </HStack>
        </HStack>

        {/* Error Banner */}
        {validationError && (
          <Box style={{ marginBottom: '1.5rem' }}>
            <Alert variant="error" onClose={onReset}>{validationError}</Alert>
          </Box>
        )}

        {/* Progress */}
        {(isValidating || isFixing) && (
          <Box style={{ marginBottom: '1.5rem' }}>
            <Alert variant="info">
              <HStack style={{ alignItems: 'center', gap: '0.75rem' }}>
                <LoadingState message="" />
                <Typography variant="small" color="inherit" as="span">{progressMessage || (isValidating ? 'Validating schema...' : 'Fixing errors...')}</Typography>
              </HStack>
            </Alert>
          </Box>
        )}

        {/* Validation Report */}
        <ValidationReportBoard
          errors={errors}
          warnings={warnings}
          onRerunValidation={onValidate}
          isValidating={isValidating}
        />
      </VStack>
    </HStack>
  );
};

ValidationView.displayName = 'ValidationView';
export default ValidationView;
