/**
 * DomainFieldType Atom Component
 *
 * Displays a field type badge for domain language fields.
 * Shows types like "text", "number", "date", "enum" with appropriate styling.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Typography } from '@almadar/ui';
import {
  Type,
  Hash,
  Calendar,
  Clock,
  ToggleLeft,
  List,
  DollarSign,
  AlignLeft,
  Link,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type FieldType =
  | 'text'
  | 'long text'
  | 'number'
  | 'currency'
  | 'date'
  | 'timestamp'
  | 'yes/no'
  | 'enum'
  | 'list'
  | 'relation';

export interface DomainFieldTypeProps {
  /**
   * The field type to display
   */
  type: FieldType | string;

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
   * Additional CSS classes
   */
  className?: string;
}

const typeConfig: Record<FieldType, { icon: LucideIcon; color: string; label: string }> = {
  'text': {
    icon: Type,
    color: 'var(--color-info)',
    label: 'text',
  },
  'long text': {
    icon: AlignLeft,
    color: 'var(--color-info)',
    label: 'long text',
  },
  'number': {
    icon: Hash,
    color: 'var(--color-success)',
    label: 'number',
  },
  'currency': {
    icon: DollarSign,
    color: 'var(--color-success)',
    label: 'currency',
  },
  'date': {
    icon: Calendar,
    color: 'var(--color-accent)',
    label: 'date',
  },
  'timestamp': {
    icon: Clock,
    color: 'var(--color-accent)',
    label: 'timestamp',
  },
  'yes/no': {
    icon: ToggleLeft,
    color: 'var(--color-warning)',
    label: 'yes/no',
  },
  'enum': {
    icon: List,
    color: 'var(--color-warning)',
    label: 'enum',
  },
  'list': {
    icon: List,
    color: 'var(--color-primary)',
    label: 'list',
  },
  'relation': {
    icon: Link,
    color: 'var(--color-error)',
    label: 'relation',
  },
};

const defaultColor = 'var(--color-muted-foreground)';

export const DomainFieldType: React.FC<DomainFieldTypeProps> = ({
  type,
  size = 'md',
  showIcon = true,
  className,
}) => {
  const config = typeConfig[type as FieldType] || {
    icon: Type,
    color: defaultColor,
    label: type,
  };

  const Icon = config.icon;
  const color = config.color;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    md: 'px-2 py-1 text-sm gap-1.5',
    lg: 'px-2.5 py-1 text-base gap-2',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <Typography
      as="span"
      variant="small"
      color="inherit"
      className={cn(
        'inline-flex items-center font-medium rounded-md',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
      }}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      {config.label}
    </Typography>
  );
};

DomainFieldType.displayName = 'DomainFieldType';
