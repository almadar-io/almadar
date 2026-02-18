/**
 * DomainValidationMessage Molecule Component
 *
 * Displays validation errors and warnings in domain-friendly terms.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, Lightbulb } from 'lucide-react';
import { Typography, Button, HStack, VStack, Box } from '@almadar/ui';

export type ValidationSeverity = 'error' | 'warning' | 'info' | 'success';

export interface DomainValidationMessageProps {
  /**
   * Validation message
   */
  message: string;

  /**
   * Severity level
   * @default 'error'
   */
  severity?: ValidationSeverity;

  /**
   * Suggestion for fixing the issue
   */
  suggestion?: string;

  /**
   * Section ID this error relates to
   */
  sectionId?: string;

  /**
   * Section type
   */
  sectionType?: 'entity' | 'page' | 'behavior' | 'tick';

  /**
   * Quick fix action
   */
  quickFix?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Whether the message is dismissible
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;

  /**
   * Compact display mode
   * @default false
   */
  compact?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const severityConfig: Record<ValidationSeverity, {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  colorVar: string;
}> = {
  error: {
    icon: AlertCircle,
    colorVar: 'var(--color-error)',
  },
  warning: {
    icon: AlertTriangle,
    colorVar: 'var(--color-warning)',
  },
  info: {
    icon: Info,
    colorVar: 'var(--color-info)',
  },
  success: {
    icon: CheckCircle,
    colorVar: 'var(--color-success)',
  },
};

export const DomainValidationMessage: React.FC<DomainValidationMessageProps> = ({
  message,
  severity = 'error',
  suggestion,
  sectionId,
  sectionType,
  quickFix,
  dismissible = false,
  onDismiss,
  compact = false,
  className,
}) => {
  const config = severityConfig[severity];
  const Icon = config.icon;
  const bgStyle = { backgroundColor: `color-mix(in srgb, ${config.colorVar} 10%, transparent)` };
  const borderStyle = { borderColor: `color-mix(in srgb, ${config.colorVar} 30%, transparent)` };
  const iconStyle = { color: config.colorVar };

  // Format section info
  const sectionLabel = sectionId && sectionType
    ? `${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}: ${sectionId.replace(/^(entity|page|behavior|tick)_/, '')}`
    : null;

  if (compact) {
    return (
      <HStack
        gap="sm"
        align="center"
        className={cn('px-2 py-1 rounded border', className)}
        style={{ ...bgStyle, ...borderStyle }}
      >
        <Icon className="w-4 h-4 flex-shrink-0" style={iconStyle} />
        <Typography variant="small" className="flex-1" style={{ color: config.colorVar }}>
          {message}
        </Typography>
        {dismissible && onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="p-0.5"
          >
            <X className="w-3 h-3 text-[var(--color-muted-foreground)]" />
          </Button>
        )}
      </HStack>
    );
  }

  return (
    <Box
      className={cn('rounded-lg border p-4', className)}
      style={{ ...bgStyle, ...borderStyle }}
      role="alert"
    >
      <HStack gap="sm" align="start">
        {/* Icon */}
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={iconStyle} />

        {/* Content */}
        <VStack gap="sm" className="flex-1 min-w-0">
          {/* Section label */}
          {sectionLabel && (
            <Typography variant="caption" className="font-medium text-[var(--color-muted-foreground)]">
              {sectionLabel}
            </Typography>
          )}

          {/* Message */}
          <Typography variant="body2" className="font-medium" style={{ color: config.colorVar }}>
            {message}
          </Typography>

          {/* Suggestion */}
          {suggestion && (
            <HStack gap="sm" align="start" className="text-sm text-[var(--color-muted-foreground)]">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-warning)' }} />
              <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                {suggestion}
              </Typography>
            </HStack>
          )}

          {/* Quick fix */}
          {quickFix && (
            <Button
              variant="secondary"
              size="sm"
              onClick={quickFix.onClick}
              className="mt-1 self-start"
            >
              {quickFix.label}
            </Button>
          )}
        </VStack>

        {/* Dismiss button */}
        {dismissible && onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="p-1"
          >
            <X className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          </Button>
        )}
      </HStack>
    </Box>
  );
};

DomainValidationMessage.displayName = 'DomainValidationMessage';

/**
 * DomainValidationSummary - Shows a summary of all validation issues
 */
export interface ValidationSummary {
  errors: number;
  warnings: number;
}

export interface DomainValidationSummaryProps {
  /**
   * Summary counts
   */
  summary: ValidationSummary;

  /**
   * Callback when clicked
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainValidationSummary: React.FC<DomainValidationSummaryProps> = ({
  summary,
  onClick,
  className,
}) => {
  const hasErrors = summary.errors > 0;
  const hasWarnings = summary.warnings > 0;
  const isValid = !hasErrors && !hasWarnings;

  if (isValid) {
    return (
      <HStack
        gap="sm"
        align="center"
        className={cn('px-3 py-2 rounded-lg border', className)}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
          borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
        }}
      >
        <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
        <Typography variant="small" style={{ color: 'var(--color-success)' }}>
          All validations passed
        </Typography>
      </HStack>
    );
  }

  const summaryColor = hasErrors ? 'var(--color-error)' : 'var(--color-warning)';

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg w-full border hover:brightness-95 transition-all',
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${summaryColor} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${summaryColor} 30%, transparent)`,
      }}
    >
      {hasErrors ? (
        <AlertCircle className="w-4 h-4" style={{ color: 'var(--color-error)' }} />
      ) : (
        <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
      )}

      <Typography variant="small" as="span">
        {hasErrors && (
          <Typography variant="small" as="span" className="font-medium" style={{ color: 'var(--color-error)' }}>
            {summary.errors} error{summary.errors > 1 ? 's' : ''}
          </Typography>
        )}
        {hasErrors && hasWarnings && (
          <Typography variant="small" as="span" className="text-[var(--color-muted-foreground)] mx-1">
            •
          </Typography>
        )}
        {hasWarnings && (
          <Typography variant="small" as="span" className="font-medium" style={{ color: 'var(--color-warning)' }}>
            {summary.warnings} warning{summary.warnings > 1 ? 's' : ''}
          </Typography>
        )}
      </Typography>

      <Box className="flex-1" />
      <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
        Click to view
      </Typography>
    </Button>
  );
};

DomainValidationSummary.displayName = 'DomainValidationSummary';
