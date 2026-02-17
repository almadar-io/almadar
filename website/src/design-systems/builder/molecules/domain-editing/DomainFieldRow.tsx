/**
 * DomainFieldRow Molecule Component
 *
 * Displays a single field definition with type and constraints.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Trash2, GripVertical, AlertCircle } from 'lucide-react';
import { DomainFieldType, FieldType } from '../../atoms/domain';

export interface FieldConstraint {
  type: 'required' | 'unique' | 'auto' | 'default';
  value?: string | number | boolean;
}

export interface DomainFieldRowProps {
  /**
   * Field name (in natural language, e.g., "order number")
   */
  name: string;

  /**
   * Field type
   */
  fieldType: FieldType | string;

  /**
   * Field constraints
   */
  constraints?: FieldConstraint[];

  /**
   * Enum values (if field type is enum)
   */
  enumValues?: string[];

  /**
   * Whether the field is editable
   * @default true
   */
  editable?: boolean;

  /**
   * Whether the field is draggable
   * @default false
   */
  draggable?: boolean;

  /**
   * Callback when edit is clicked
   */
  onEdit?: () => void;

  /**
   * Callback when delete is clicked
   */
  onDelete?: () => void;

  /**
   * Validation error for this field
   */
  error?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainFieldRow: React.FC<DomainFieldRowProps> = ({
  name,
  fieldType,
  constraints = [],
  enumValues,
  editable = true,
  draggable = false,
  onEdit,
  onDelete,
  error,
  className,
}) => {
  const hasConstraints = constraints.length > 0;
  const isEnum = fieldType === 'enum' && enumValues && enumValues.length > 0;

  return (
    <div
      className={cn(
        'group flex items-center gap-3 px-3 py-2 rounded-lg',
        'hover:bg-[var(--color-secondary)]',
        'transition-colors',
        error && 'border',
        className
      )}
      style={error ? {
        backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
        borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)',
      } : undefined}
    >
      {/* Drag handle */}
      {draggable && (
        <div className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-[var(--color-muted-foreground)]" />
        </div>
      )}

      {/* Dash indicator */}
      <span className="text-[var(--color-muted-foreground)] font-mono">-</span>

      {/* Field name */}
      <span className="font-medium text-[var(--color-foreground)] min-w-[120px]">
        {name}
      </span>

      {/* Colon separator */}
      <span className="text-[var(--color-muted-foreground)]">:</span>

      {/* Field type */}
      {isEnum ? (
        <div className="flex items-center gap-1.5">
          {enumValues!.map((value, index) => (
            <React.Fragment key={value}>
              {index > 0 && <span className="text-[var(--color-muted-foreground)]">|</span>}
              <span
                className="px-1.5 py-0.5 text-sm rounded font-mono"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                  color: 'var(--color-warning)',
                }}
              >
                {value}
              </span>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <DomainFieldType type={fieldType as FieldType} size="sm" />
      )}

      {/* Constraints */}
      {hasConstraints && (
        <div className="flex items-center gap-2 ml-2">
          {constraints.map((constraint, index) => (
            <span
              key={`${constraint.type}-${index}`}
              className={cn(
                'px-1.5 py-0.5 text-xs rounded font-medium',
                constraint.type === 'default' && 'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]'
              )}
              style={
                constraint.type === 'required'
                  ? { backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)', color: 'var(--color-error)' }
                  : constraint.type === 'unique'
                  ? { backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', color: 'var(--color-accent)' }
                  : constraint.type === 'auto'
                  ? { backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)', color: 'var(--color-info)' }
                  : undefined
              }
            >
              {constraint.type === 'default' ? `default ${constraint.value}` : constraint.type}
            </span>
          ))}
        </div>
      )}

      {/* Error indicator */}
      {error && (
        <div className="flex items-center gap-1" style={{ color: 'var(--color-error)' }} title={error}>
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs">{error}</span>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      {editable && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              title="Edit field"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
              title="Delete field"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

DomainFieldRow.displayName = 'DomainFieldRow';
