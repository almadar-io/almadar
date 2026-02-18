/**
 * DomainState Atom Component
 *
 * Displays a state badge with color coding based on state type.
 * Used for entity states like "Pending", "Approved", "Shipped", etc.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Typography } from '@almadar/ui';
import {
  Circle,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  Pause,
  Play,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DomainStateProps {
  /**
   * The state name to display
   */
  name: string;

  /**
   * Whether this is the initial state
   * @default false
   */
  isInitial?: boolean;

  /**
   * Whether this is the current/active state
   * @default false
   */
  isActive?: boolean;

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show icon alongside text
   * @default true
   */
  showIcon?: boolean;

  /**
   * Click handler for interactive states
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Infer state category from state name
 */
function inferStateCategory(name: string): {
  icon: LucideIcon;
  color: string;
} {
  const lower = name.toLowerCase();

  // Success/Completed states
  if (['approved', 'completed', 'done', 'delivered', 'success', 'active', 'published'].includes(lower)) {
    return {
      icon: CheckCircle,
      color: 'var(--color-success)',
    };
  }

  // Error/Rejected states
  if (['rejected', 'failed', 'error', 'cancelled', 'declined', 'expired'].includes(lower)) {
    return {
      icon: XCircle,
      color: 'var(--color-error)',
    };
  }

  // Warning/Pending states
  if (['pending', 'waiting', 'review', 'processing', 'submitted'].includes(lower)) {
    return {
      icon: Clock,
      color: 'var(--color-warning)',
    };
  }

  // In-progress states
  if (['in progress', 'inprogress', 'working', 'running', 'started'].includes(lower)) {
    return {
      icon: Play,
      color: 'var(--color-info)',
    };
  }

  // Paused states
  if (['paused', 'hold', 'on hold', 'suspended'].includes(lower)) {
    return {
      icon: Pause,
      color: 'var(--color-muted-foreground)',
    };
  }

  // Shipping states
  if (['shipped', 'shipping', 'in transit'].includes(lower)) {
    return {
      icon: Truck,
      color: 'var(--color-primary)',
    };
  }

  // Confirmed states
  if (['confirmed', 'verified', 'validated'].includes(lower)) {
    return {
      icon: Package,
      color: 'var(--color-accent)',
    };
  }

  // Draft states
  if (['draft', 'new', 'initial'].includes(lower)) {
    return {
      icon: Circle,
      color: 'var(--color-muted-foreground)',
    };
  }

  // Default
  return {
    icon: Circle,
    color: 'var(--color-muted-foreground)',
  };
}

export const DomainState: React.FC<DomainStateProps> = ({
  name,
  isInitial = false,
  isActive = false,
  size = 'md',
  showIcon = true,
  onClick,
  className,
}) => {
  const { icon: Icon, color } = inferStateCategory(name);

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    md: 'px-2 py-1 text-sm gap-1.5',
    lg: 'px-2.5 py-1.5 text-base gap-2',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const isClickable = !!onClick;
  const Component = isClickable ? 'button' : 'span';

  return (
    <Component
      type={isClickable ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-medium rounded-md border',
        sizeClasses[size],
        isInitial && 'ring-2 ring-offset-1',
        isActive && 'ring-2 ring-offset-1',
        isClickable && 'cursor-pointer hover:brightness-95 focus:outline-none focus:ring-2',
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
        borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
        ...(isInitial ? {
          ringColor: 'var(--color-primary)',
          '--tw-ring-color': 'var(--color-primary)',
          '--tw-ring-offset-color': 'var(--color-background)',
        } as React.CSSProperties : {}),
        ...(isActive ? {
          '--tw-ring-color': 'var(--color-info)',
          '--tw-ring-offset-color': 'var(--color-background)',
        } as React.CSSProperties : {}),
      }}
      title={isInitial ? 'Initial state' : undefined}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      <Typography variant="small" color="inherit" as="span">{name}</Typography>
      {isInitial && (
        <Typography variant="caption" color="inherit" as="span" className="ml-1 opacity-60">(start)</Typography>
      )}
    </Component>
  );
};

DomainState.displayName = 'DomainState';

export default DomainState;
