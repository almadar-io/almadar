import React from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../atoms';
import { LucideIcon, CheckCircle, XCircle, AlertCircle, Info, Search, Inbox, FileQuestion } from 'lucide-react';

/**
 * Common icon name to Lucide component mapping.
 * Supports schema-style string icon names (e.g., "check-circle").
 */
const ICON_MAP: Record<string, LucideIcon> = {
  'check-circle': CheckCircle,
  'check': CheckCircle,
  'x-circle': XCircle,
  'error': XCircle,
  'alert-circle': AlertCircle,
  'warning': AlertCircle,
  'info': Info,
  'search': Search,
  'inbox': Inbox,
  'file-question': FileQuestion,
};

export interface EmptyStateProps {
  /**
   * Icon to display. Accepts either:
   * - A Lucide icon component (LucideIcon)
   * - A string icon name (e.g., "check-circle", "x-circle")
   */
  icon?: LucideIcon | string;
  /** Primary text to display - use title or message (message is alias for backwards compat) */
  title?: string;
  /** Alias for title - used by schema patterns */
  message?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  /** Destructive styling for confirmation dialogs */
  destructive?: boolean;
  /** Variant for color styling */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  description,
  actionLabel,
  onAction,
  className,
  destructive,
  variant,
}) => {
  // Resolve icon - supports both LucideIcon component and string name
  const Icon: LucideIcon | undefined = typeof icon === 'string'
    ? ICON_MAP[icon]
    : icon;

  // Determine color scheme based on variant or destructive flag
  const isDestructive = destructive || variant === 'error';
  const isSuccess = variant === 'success';

  // Support both title and message (message is alias for title)
  const displayText = title || message || 'No items';
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {Icon && (
        <div className={cn(
          'mb-4 rounded-full p-3',
          isDestructive ? 'bg-red-100' : isSuccess ? 'bg-green-100' : 'bg-gray-100'
        )}>
          <Icon className={cn(
            'h-8 w-8',
            isDestructive ? 'text-red-500' : isSuccess ? 'text-green-500' : 'text-gray-400'
          )} />
        </div>
      )}
      <h3 className={cn(
        'text-lg font-medium',
        isDestructive ? 'text-red-900' : isSuccess ? 'text-green-900' : 'text-gray-900'
      )}>{displayText}</h3>
      {description && <p className="mt-1 text-sm text-gray-500 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-4" variant={isDestructive ? 'danger' : 'primary'} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
