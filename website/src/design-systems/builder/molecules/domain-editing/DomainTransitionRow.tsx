/**
 * DomainTransitionRow Molecule Component
 *
 * Displays a state transition with guards and effects.
 */

import React, { useState } from 'react';
import { clsx as cn } from 'clsx';
import { Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Typography, Button, HStack, VStack, Box } from '@almadar/ui';
import { DomainKeyword, DomainState, DomainArrow } from '../../atoms/domain';
import { DomainGuardRow, GuardExpression } from './DomainGuardRow';

export interface TransitionEffect {
  /**
   * Effect type
   */
  type: 'notify' | 'update_field' | 'navigate' | 'emit_event' | 'api_call';

  /**
   * Human-readable description
   */
  description: string;

  /**
   * Effect configuration
   */
  config?: Record<string, unknown>;
}

export interface DomainTransitionRowProps {
  /**
   * Source state name (* for wildcard "any")
   */
  fromState: string;

  /**
   * Target state name
   */
  toState: string;

  /**
   * Event that triggers the transition
   */
  event: string;

  /**
   * Guard conditions
   */
  guards?: GuardExpression[];

  /**
   * Effects that happen on transition
   */
  effects?: TransitionEffect[];

  /**
   * Whether the transition is editable
   * @default true
   */
  editable?: boolean;

  /**
   * Callback when edit is clicked
   */
  onEdit?: () => void;

  /**
   * Callback when delete is clicked
   */
  onDelete?: () => void;

  /**
   * Callback when a state is clicked
   */
  onStateClick?: (state: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const effectIcons: Record<string, string> = {
  notify: '📢',
  update_field: '✏️',
  navigate: '🔗',
  emit_event: '⚡',
  api_call: '🌐',
};

export const DomainTransitionRow: React.FC<DomainTransitionRowProps> = ({
  fromState,
  toState,
  event,
  guards = [],
  effects = [],
  editable = true,
  onEdit,
  onDelete,
  onStateClick,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = guards.length > 0 || effects.length > 0;

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const displayFromState = fromState === '*' ? 'any' : fromState;

  return (
    <Box
      className={cn(
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]',
        className
      )}
    >
      {/* Main transition row */}
      <HStack
        gap="sm"
        align="center"
        className={cn(
          'group px-3 py-2',
          hasDetails && 'cursor-pointer hover:bg-[var(--color-secondary)]',
          expanded && hasDetails && 'border-b border-[var(--color-border)]'
        )}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        {/* Expand indicator */}
        {hasDetails && (
          <ChevronIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" />
        )}

        {/* Dash */}
        <Typography variant="small" as="span" className="text-[var(--color-muted-foreground)] font-mono">
          -
        </Typography>

        {/* From */}
        <DomainKeyword category="behavior">From</DomainKeyword>
        <DomainState
          name={displayFromState}
          onClick={fromState !== '*' && onStateClick ? () => onStateClick(fromState) : undefined}
          size="sm"
        />

        {/* Arrow */}
        <DomainArrow direction="right" />

        {/* To */}
        <DomainKeyword category="behavior">to</DomainKeyword>
        <DomainState
          name={toState}
          onClick={onStateClick ? () => onStateClick(toState) : undefined}
          size="sm"
        />

        {/* Event */}
        <DomainKeyword category="behavior">when</DomainKeyword>
        <Typography
          variant="small"
          as="span"
          className="font-mono px-2 py-0.5 rounded"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
            color: 'var(--color-success)',
          }}
        >
          {event}
        </Typography>

        {/* Indicators for guards/effects */}
        {!expanded && guards.length > 0 && (
          <Typography
            variant="caption"
            as="span"
            className="px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
              color: 'var(--color-error)',
            }}
          >
            {guards.length} guard{guards.length > 1 ? 's' : ''}
          </Typography>
        )}
        {!expanded && effects.length > 0 && (
          <Typography
            variant="caption"
            as="span"
            className="px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
              color: 'var(--color-warning)',
            }}
          >
            {effects.length} effect{effects.length > 1 ? 's' : ''}
          </Typography>
        )}

        {/* Spacer */}
        <Box className="flex-1" />

        {/* Actions */}
        {editable && (
          <HStack
            gap="xs"
            align="center"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                title="Edit transition"
                className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                title="Delete transition"
                className="p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </HStack>
        )}
      </HStack>

      {/* Expanded details */}
      {expanded && hasDetails && (
        <VStack gap="sm" className="px-4 py-3 bg-[var(--color-secondary)]">
          {/* Guards */}
          {guards.length > 0 && (
            <VStack gap="sm">
              {guards.map((guard, index) => (
                <DomainGuardRow
                  key={index}
                  guard={guard}
                  size="sm"
                  editable={editable}
                />
              ))}
            </VStack>
          )}

          {/* Effects */}
          {effects.length > 0 && (
            <VStack gap="sm">
              {effects.map((effect, index) => (
                <HStack
                  key={index}
                  gap="sm"
                  align="center"
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
                  }}
                >
                  <Typography variant="body1" as="span" className="text-lg">
                    {effectIcons[effect.type] || '⚙️'}
                  </Typography>
                  <DomainKeyword category="effect">then</DomainKeyword>
                  <Typography variant="body2" className="text-[var(--color-foreground)]">
                    {effect.description}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )}
    </Box>
  );
};

DomainTransitionRow.displayName = 'DomainTransitionRow';
