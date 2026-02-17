/**
 * DomainGuardRow Molecule Component
 *
 * Displays a guard expression (condition) in domain language format.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Shield, AlertCircle } from 'lucide-react';
import { DomainKeyword, DomainOperator } from '../../atoms/domain';

export type GuardType = 'field_check' | 'comparison' | 'user_check' | 'logical';

export interface GuardExpression {
  /**
   * Type of guard
   */
  type: GuardType;

  /**
   * Raw text representation
   */
  raw: string;

  /**
   * Parsed field reference (e.g., "Order.amount")
   */
  field?: {
    entityName: string;
    fieldName: string;
  };

  /**
   * Comparison operator
   */
  operator?: string;

  /**
   * Comparison value
   */
  value?: string | number | boolean;

  /**
   * For user checks
   */
  role?: string;

  /**
   * Nested conditions for logical operators
   */
  left?: GuardExpression;
  right?: GuardExpression;
}

export interface DomainGuardRowProps {
  /**
   * Guard expression
   */
  guard: GuardExpression;

  /**
   * Whether to show the "if" keyword
   * @default true
   */
  showIf?: boolean;

  /**
   * Whether the guard is editable
   * @default true
   */
  editable?: boolean;

  /**
   * Callback when edit is clicked
   */
  onEdit?: () => void;

  /**
   * Validation error
   */
  error?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Render a guard expression recursively
 */
function renderGuardExpression(guard: GuardExpression, size: 'sm' | 'md'): React.ReactNode {
  const fontSize = size === 'sm' ? 'text-xs' : 'text-sm';

  switch (guard.type) {
    case 'field_check':
      return (
        <span className={cn('inline-flex items-center gap-1', fontSize)}>
          <span className="font-medium text-[var(--color-foreground)]">
            {guard.field?.fieldName || 'field'}
          </span>
          <DomainKeyword category="guard" size={size}>
            {guard.operator === 'provided' ? 'is provided' :
             guard.operator === 'empty' ? 'is empty' :
             `is ${guard.value}`}
          </DomainKeyword>
        </span>
      );

    case 'comparison':
      return (
        <span className={cn('inline-flex items-center gap-1', fontSize)}>
          <span className="font-mono text-[var(--color-foreground)]">
            {guard.field?.entityName}.{guard.field?.fieldName}
          </span>
          <DomainOperator operator={guard.operator || '=='} size={size} />
          <span className="font-mono" style={{ color: 'var(--color-success)' }}>
            {typeof guard.value === 'string' ? `"${guard.value}"` : guard.value}
          </span>
        </span>
      );

    case 'user_check':
      if (guard.role) {
        return (
          <span className={cn('inline-flex items-center gap-1', fontSize)}>
            <DomainKeyword category="guard" size={size}>user is</DomainKeyword>
            <span className="font-medium" style={{ color: 'var(--color-accent)' }}>
              {guard.role}
            </span>
          </span>
        );
      }
      return (
        <span className={cn('inline-flex items-center gap-1', fontSize)}>
          <DomainKeyword category="guard" size={size}>user owns this</DomainKeyword>
        </span>
      );

    case 'logical':
      return (
        <span className={cn('inline-flex items-center gap-1 flex-wrap', fontSize)}>
          {guard.left && renderGuardExpression(guard.left, size)}
          <DomainOperator operator={guard.operator as 'AND' | 'OR'} size={size} />
          {guard.right && renderGuardExpression(guard.right, size)}
        </span>
      );

    default:
      // Fallback to raw text
      return (
        <span className={cn('font-mono text-[var(--color-muted-foreground)]', fontSize)}>
          {guard.raw}
        </span>
      );
  }
}

export const DomainGuardRow: React.FC<DomainGuardRowProps> = ({
  guard,
  showIf = true,
  editable = true,
  onEdit,
  error,
  size = 'md',
  className,
}) => {
  const paddingClasses = size === 'sm' ? 'px-2 py-1' : 'px-3 py-2';

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-lg',
        'border',
        paddingClasses,
        className
      )}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
        borderColor: error
          ? 'var(--color-error)'
          : 'color-mix(in srgb, var(--color-error) 20%, transparent)',
      }}
    >
      {/* Shield icon */}
      <Shield
        className={cn(
          'flex-shrink-0',
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
        )}
        style={{ color: 'var(--color-error)' }}
      />

      {/* If keyword */}
      {showIf && (
        <DomainKeyword category="guard" size={size}>if</DomainKeyword>
      )}

      {/* Guard expression */}
      <div className="flex-1 min-w-0">
        {renderGuardExpression(guard, size)}
      </div>

      {/* Error indicator */}
      {error && (
        <div className="flex items-center gap-1" style={{ color: 'var(--color-error)' }} title={error}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
        </div>
      )}

      {/* Edit button */}
      {editable && onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className={cn(
            'p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity',
            'hover:bg-[color-mix(in_srgb,var(--color-error)_15%,transparent)]',
            'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
          )}
          title="Edit guard"
        >
          <Edit2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </button>
      )}
    </div>
  );
};

DomainGuardRow.displayName = 'DomainGuardRow';
