/**
 * DomainValidationMessage Molecule Component
 *
 * Displays validation errors and warnings in domain-friendly terms.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, Lightbulb } from 'lucide-react';

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
  icon: React.ComponentType<{ className?: string }>;
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
      <div
        className={cn(
          'flex items-center gap-2 px-2 py-1 rounded text-sm',
          'border',
          className
        )}
        style={{ ...bgStyle, ...borderStyle }}
      >
        <Icon className="w-4 h-4 flex-shrink-0" style={iconStyle} />
        <span className="flex-1" style={{ color: config.colorVar }}>{message}</span>
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-0.5 rounded hover:bg-[var(--color-secondary)]"
          >
            <X className="w-3 h-3 text-[var(--color-muted-foreground)]" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        className
      )}
      style={{ ...bgStyle, ...borderStyle }}
      role="alert"
    >
      <div className="flex gap-3">
        {/* Icon */}
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={iconStyle} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Section label */}
          {sectionLabel && (
            <span className="block text-xs font-medium text-[var(--color-muted-foreground)] mb-1">
              {sectionLabel}
            </span>
          )}

          {/* Message */}
          <p className="font-medium" style={{ color: config.colorVar }}>
            {message}
          </p>

          {/* Suggestion */}
          {suggestion && (
            <div className="flex items-start gap-2 mt-2 text-sm text-[var(--color-muted-foreground)]">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-warning)' }} />
              <span>{suggestion}</span>
            </div>
          )}

          {/* Quick fix */}
          {quickFix && (
            <button
              type="button"
              onClick={quickFix.onClick}
              className={cn(
                'mt-3 px-3 py-1.5 text-sm font-medium rounded-md',
                'bg-[var(--color-card)]',
                'border border-[var(--color-border)]',
                'hover:bg-[var(--color-secondary)]',
                'transition-colors'
              )}
            >
              {quickFix.label}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded hover:bg-[var(--color-secondary)]"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          </button>
        )}
      </div>
    </div>
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
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'border',
          className
        )}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
          borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
        }}
      >
        <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
        <span className="text-sm" style={{ color: 'var(--color-success)' }}>
          All validations passed
        </span>
      </div>
    );
  }

  const summaryColor = hasErrors ? 'var(--color-error)' : 'var(--color-warning)';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg w-full',
        'border',
        'hover:brightness-95 transition-all',
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

      <span className="text-sm">
        {hasErrors && (
          <span className="font-medium" style={{ color: 'var(--color-error)' }}>
            {summary.errors} error{summary.errors > 1 ? 's' : ''}
          </span>
        )}
        {hasErrors && hasWarnings && <span className="text-[var(--color-muted-foreground)] mx-1">•</span>}
        {hasWarnings && (
          <span className="font-medium" style={{ color: 'var(--color-warning)' }}>
            {summary.warnings} warning{summary.warnings > 1 ? 's' : ''}
          </span>
        )}
      </span>

      <span className="flex-1" />
      <span className="text-xs text-[var(--color-muted-foreground)]">Click to view</span>
    </button>
  );
};

DomainValidationSummary.displayName = 'DomainValidationSummary';
