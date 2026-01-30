import React from 'react';
import { cn } from '../../lib/cn';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// Using CSS variables for theme-aware styling
const variantStyles = {
  default: [
    'bg-[var(--color-muted)] text-[var(--color-foreground)]',
    'border-[length:var(--border-width-thin)] border-[var(--color-border)]',
  ].join(' '),
  primary: 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
  success: [
    'bg-[var(--color-secondary)] text-emerald-700',
    'border-[length:var(--border-width)] border-emerald-600',
  ].join(' '),
  warning: [
    'bg-[var(--color-secondary)] text-amber-700',
    'border-[length:var(--border-width)] border-amber-500',
  ].join(' '),
  danger: [
    'bg-[var(--color-secondary)] text-red-700',
    'border-[length:var(--border-width)] border-red-600',
  ].join(' '),
  info: [
    'bg-[var(--color-secondary)] text-blue-700',
    'border-[length:var(--border-width)] border-blue-600',
  ].join(' '),
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-bold rounded-[var(--radius-sm)]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
