import React from 'react';
import { cn } from '../../lib/cn';
import { Loader2, type LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  /** Left icon as ReactNode (preferred) */
  leftIcon?: React.ReactNode;
  /** Right icon as ReactNode (preferred) */
  rightIcon?: React.ReactNode;
  /** Left icon as Lucide icon component (convenience prop, renders with default size) */
  icon?: LucideIcon;
  /** Right icon as Lucide icon component (convenience prop) */
  iconRight?: LucideIcon;
}

// Using CSS variables for theme-aware styling with hover/active effects
const variantStyles = {
  primary: [
    'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
    'border-[length:var(--border-width)] border-[var(--color-border)]',
    'shadow-[var(--shadow-sm)]',
    'hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]',
    'hover:shadow-[var(--shadow-hover)]',
    'active:[transform:var(--button-active-transform)]',
    'active:shadow-[var(--shadow-active)]',
  ].join(' '),
  secondary: [
    'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]',
    'border-[length:var(--border-width-thin)] border-[var(--color-muted-foreground)]',
    'hover:border-[var(--color-border)] hover:text-[var(--color-foreground)]',
    'active:[transform:var(--button-active-transform)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--color-muted-foreground)]',
    'hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
    'active:[transform:var(--button-active-transform)]',
  ].join(' '),
  danger: [
    'bg-[var(--color-secondary)] text-red-600',
    'border-[length:var(--border-width)] border-red-600',
    'shadow-[var(--shadow-sm)]',
    'hover:bg-red-600 hover:text-white hover:shadow-[var(--shadow-hover)]',
    'active:[transform:var(--button-active-transform)] active:shadow-[var(--shadow-active)]',
  ].join(' '),
  success: [
    'bg-[var(--color-secondary)] text-emerald-600',
    'border-[length:var(--border-width)] border-emerald-600',
    'shadow-[var(--shadow-sm)]',
    'hover:bg-emerald-600 hover:text-white hover:shadow-[var(--shadow-hover)]',
    'active:[transform:var(--button-active-transform)] active:shadow-[var(--shadow-active)]',
  ].join(' '),
  warning: [
    'bg-[var(--color-secondary)] text-amber-600',
    'border-[length:var(--border-width)] border-amber-500',
    'shadow-[var(--shadow-sm)]',
    'hover:bg-amber-500 hover:text-white hover:shadow-[var(--shadow-hover)]',
    'active:[transform:var(--button-active-transform)] active:shadow-[var(--shadow-active)]',
  ].join(' '),
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const iconSizeStyles = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      icon: IconComponent,
      iconRight: IconRightComponent,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedLeftIcon = leftIcon || (IconComponent && <IconComponent className={iconSizeStyles[size]} />);
    const resolvedRightIcon = rightIcon || (IconRightComponent && <IconRightComponent className={iconSizeStyles[size]} />);

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-[var(--font-weight-medium)]',
          'rounded-[var(--radius-sm)]',
          'transition-all duration-[var(--transition-normal)]',
          'focus:outline-none focus:ring-[length:var(--focus-ring-width)] focus:ring-[var(--focus-ring-color)] focus:ring-offset-[length:var(--focus-ring-offset)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          resolvedLeftIcon && <span className="flex-shrink-0">{resolvedLeftIcon}</span>
        )}
        {children}
        {resolvedRightIcon && !isLoading && <span className="flex-shrink-0">{resolvedRightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
