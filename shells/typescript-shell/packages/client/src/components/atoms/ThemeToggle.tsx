/**
 * ThemeToggle Atom Component
 *
 * A button that toggles between light and dark themes.
 * Uses Sun and Moon icons to indicate current/target theme.
 *
 * @packageDocumentation
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useTheme } from '../../contexts/ThemeContext';

export interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show label text */
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

/**
 * ThemeToggle component for switching between light and dark modes
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeToggle />
 *
 * // With label
 * <ThemeToggle showLabel />
 *
 * // Custom size
 * <ThemeToggle size="lg" />
 * ```
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  size = 'md',
  showLabel = false,
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'text-black',
        'hover:bg-neutral-100 border-2 border-transparent hover:border-black',
        'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
        'transition-colors duration-200',
        sizeClasses[size],
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className={cn(iconSizes[size], 'text-black')} />
      ) : (
        <Moon className={cn(iconSizes[size], 'text-black')} />
      )}
      {showLabel && (
        <span className="text-sm font-medium">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';
