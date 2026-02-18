/**
 * DomainGuardRow Molecule Component
 *
 * Displays a guard expression (condition) in domain language format.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Shield, AlertCircle } from 'lucide-react';
import { Typography, Button, HStack, Box } from '@almadar/ui';
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
        <HStack gap="xs" align="center" className={cn('inline-flex', fontSize)}>
          <Typography variant="small" as="span" className="font-medium text-[var(--color-foreground)]">
            {guard.field?.fieldName || 'field'}
          </Typography>
          <DomainKeyword category="guard" size={size}>
            {guard.operator === 'provided' ? 'is provided' :
             guard.operator === 'empty' ? 'is empty' :
             `is ${guard.value}`}
          </DomainKeyword>
        </HStack>
      );

    case 'comparison':
      return (
        <HStack gap="xs" align="center" className={cn('inline-flex', fontSize)}>
          <Typography variant="small" as="span" className="font-mono text-[var(--color-foreground)]">
            {guard.field?.entityName}.{guard.field?.fieldName}
          </Typography>
          <DomainOperator operator={guard.operator || '=='} size={size} />
          <Typography variant="small" as="span" className="font-mono" style={{ color: 'var(--color-success)' }}>
            {typeof guard.value === 'string' ? `"${guard.value}"` : guard.value}
          </Typography>
        </HStack>
      );

    case 'user_check':
      if (guard.role) {
        return (
          <HStack gap="xs" align="center" className={cn('inline-flex', fontSize)}>
            <DomainKeyword category="guard" size={size}>user is</DomainKeyword>
            <Typography variant="small" as="span" className="font-medium" style={{ color: 'var(--color-accent)' }}>
              {guard.role}
            </Typography>
          </HStack>
        );
      }
      return (
        <HStack gap="xs" align="center" className={cn('inline-flex', fontSize)}>
          <DomainKeyword category="guard" size={size}>user owns this</DomainKeyword>
        </HStack>
      );

    case 'logical':
      return (
        <HStack gap="xs" align="center" wrap className={cn('inline-flex', fontSize)}>
          {guard.left && renderGuardExpression(guard.left, size)}
          <DomainOperator operator={guard.operator as 'AND' | 'OR'} size={size} />
          {guard.right && renderGuardExpression(guard.right, size)}
        </HStack>
      );

    default:
      // Fallback to raw text
      return (
        <Typography variant="small" as="span" className={cn('font-mono text-[var(--color-muted-foreground)]', fontSize)}>
          {guard.raw}
        </Typography>
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
    <HStack
      gap="sm"
      align="center"
      className={cn(
        'group rounded-lg border',
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
      <Box className="flex-1 min-w-0">
        {renderGuardExpression(guard, size)}
      </Box>

      {/* Error indicator */}
      {error && (
        <Box className="flex items-center gap-1" style={{ color: 'var(--color-error)' }} title={error}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
        </Box>
      )}

      {/* Edit button */}
      {editable && onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          title="Edit guard"
          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
        >
          <Edit2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </Button>
      )}
    </HStack>
  );
};

DomainGuardRow.displayName = 'DomainGuardRow';
