/**
 * Alert Molecule Component
 * 
 * A component for displaying alert messages with different variants and actions.
 * Uses theme-aware CSS variables for styling.
 */

import React from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Box } from '../atoms/Box';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Alert content (children or message) */
  children?: React.ReactNode;
  /** Alert message (alias for children) */
  message?: string;
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const variantBorderClasses: Record<AlertVariant, string> = {
  info: 'border-blue-600',
  success: 'border-emerald-600',
  warning: 'border-amber-500',
  error: 'border-red-600',
};

const variantIconColors: Record<AlertVariant, string> = {
  info: 'text-blue-600',
  success: 'text-emerald-600',
  warning: 'text-amber-500',
  error: 'text-red-600',
};

const iconMap: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export const Alert: React.FC<AlertProps> = ({
  children,
  message,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  onClose,
  actions,
  className,
}) => {
  const handleDismiss = onDismiss || onClose;
  // Use message if provided, else children
  const content = children ?? message;

  return (
    <Box
      bg="surface"
      border
      shadow="sm"
      padding="md"
      rounded="sm"
      className={cn(variantBorderClasses[variant], className)}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <Icon icon={iconMap[variant]} size="md" className={variantIconColors[variant]} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <Typography variant="h6" className="mb-1">
              {title}
            </Typography>
          )}
          <Typography variant="body2">
            {content}
          </Typography>
          {actions && (
            <div className="mt-3 flex gap-2">
              {actions}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {(dismissible || handleDismiss) && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 p-1 transition-colors rounded-[var(--radius-sm)]',
              'hover:bg-[var(--color-muted)]'
            )}
            aria-label="Dismiss alert"
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
      </div>
    </Box>
  );
};

Alert.displayName = 'Alert';
