/**
 * DomainOperator Atom Component
 *
 * Displays operators used in guard expressions and conditions.
 * Shows logical (AND, OR) and comparison (>, <, ==, !=) operators.
 */

import React from 'react';
import { clsx as cn } from 'clsx';

export type OperatorType =
  | 'AND'
  | 'OR'
  | 'NOT'
  | '=='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | 'is'
  | 'is not';

export interface DomainOperatorProps {
  /**
   * The operator to display
   */
  operator: OperatorType | string;

  /**
   * Size of the operator
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Use symbolic representation (e.g., && instead of AND)
   * @default false
   */
  symbolic?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const operatorConfig: Record<string, {
  label: string;
  symbol: string;
  color: string;
  isLogical: boolean;
}> = {
  'AND': {
    label: 'AND',
    symbol: '&&',
    color: 'var(--color-accent)',
    isLogical: true,
  },
  'OR': {
    label: 'OR',
    symbol: '||',
    color: 'var(--color-accent)',
    isLogical: true,
  },
  'NOT': {
    label: 'NOT',
    symbol: '!',
    color: 'var(--color-accent)',
    isLogical: true,
  },
  '==': {
    label: '==',
    symbol: '==',
    color: 'var(--color-info)',
    isLogical: false,
  },
  '!=': {
    label: '!=',
    symbol: '!=',
    color: 'var(--color-info)',
    isLogical: false,
  },
  '>': {
    label: '>',
    symbol: '>',
    color: 'var(--color-success)',
    isLogical: false,
  },
  '<': {
    label: '<',
    symbol: '<',
    color: 'var(--color-success)',
    isLogical: false,
  },
  '>=': {
    label: '>=',
    symbol: '>=',
    color: 'var(--color-success)',
    isLogical: false,
  },
  '<=': {
    label: '<=',
    symbol: '<=',
    color: 'var(--color-success)',
    isLogical: false,
  },
  'is': {
    label: 'is',
    symbol: '==',
    color: 'var(--color-info)',
    isLogical: false,
  },
  'is not': {
    label: 'is not',
    symbol: '!=',
    color: 'var(--color-info)',
    isLogical: false,
  },
};

const defaultConfig = {
  label: '',
  symbol: '',
  color: 'var(--color-muted-foreground)',
  isLogical: false,
};

export const DomainOperator: React.FC<DomainOperatorProps> = ({
  operator,
  size = 'md',
  symbolic = false,
  className,
}) => {
  const config = operatorConfig[operator] || {
    ...defaultConfig,
    label: operator,
    symbol: operator,
  };

  const displayText = symbolic ? config.symbol : config.label;

  const sizeClasses = {
    sm: 'text-xs px-1',
    md: 'text-sm px-1.5',
    lg: 'text-base px-2',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono font-semibold',
        sizeClasses[size],
        config.isLogical && 'rounded',
        className
      )}
      style={{
        color: config.color,
        ...(config.isLogical ? {
          backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
        } : {}),
      }}
    >
      {displayText}
    </span>
  );
};

DomainOperator.displayName = 'DomainOperator';

/**
 * DomainArrow - Shows transition direction
 */
export interface DomainArrowProps {
  /**
   * Direction of the arrow
   * @default 'right'
   */
  direction?: 'right' | 'left' | 'up' | 'down' | 'bidirectional';

  /**
   * Size of the arrow
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainArrow: React.FC<DomainArrowProps> = ({
  direction = 'right',
  size = 'md',
  className,
}) => {
  const arrows: Record<string, string> = {
    right: '→',
    left: '←',
    up: '↑',
    down: '↓',
    bidirectional: '↔',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono mx-1',
        sizeClasses[size],
        className
      )}
      style={{ color: 'var(--color-muted-foreground)' }}
      aria-label={`${direction} arrow`}
    >
      {arrows[direction]}
    </span>
  );
};

DomainArrow.displayName = 'DomainArrow';
