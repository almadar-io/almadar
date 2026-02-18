/**
 * DomainBehaviorSection Organism Component
 *
 * Complete behavior display with states, transitions, ticks, and rules.
 */

import React from 'react';
import { Plus, Clock, AlertCircle } from 'lucide-react';
import { Box, HStack, VStack, Button, Typography, Icon } from '@almadar/ui';
import { DomainKeyword, DomainState } from '../../atoms/domain';
import {
  DomainSectionHeader,
  DomainTransitionRow,
  DomainGuardRow,
  TransitionEffect,
  GuardExpression,
} from '../../molecules/domain-editing';

export interface TransitionData {
  fromState: string;
  toState: string;
  event: string;
  guards?: GuardExpression[];
  effects?: TransitionEffect[];
}

export interface TickData {
  name: string;
  interval: string;
  intervalMs?: number;
  guard?: GuardExpression;
  effects: TransitionEffect[];
}

export interface BehaviorData {
  name: string;
  entityName: string;
  states: string[];
  initialState: string;
  transitions: TransitionData[];
  ticks: TickData[];
  rules: string[];
}

export interface DomainBehaviorSectionProps {
  /**
   * Behavior data
   */
  behavior: BehaviorData;

  /**
   * Whether the behavior is expanded
   * @default true
   */
  expanded?: boolean;

  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether the behavior is editable
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
   * Callback when add state is clicked
   */
  onAddState?: () => void;

  /**
   * Callback when a state is clicked
   */
  onStateClick?: (state: string) => void;

  /**
   * Callback when add transition is clicked
   */
  onAddTransition?: () => void;

  /**
   * Callback when a transition is edited
   */
  onEditTransition?: (transitionIndex: number) => void;

  /**
   * Callback when a transition is deleted
   */
  onDeleteTransition?: (transitionIndex: number) => void;

  /**
   * Callback when add tick is clicked
   */
  onAddTick?: () => void;

  /**
   * Callback when a tick is edited
   */
  onEditTick?: (tickIndex: number) => void;

  /**
   * Callback when a tick is deleted
   */
  onDeleteTick?: (tickIndex: number) => void;

  /**
   * Whether there are validation errors
   */
  hasError?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const DomainBehaviorSection: React.FC<DomainBehaviorSectionProps> = ({
  behavior,
  expanded,
  onExpandedChange,
  editable = true,
  onEdit,
  onDelete,
  onAddState,
  onStateClick,
  onAddTransition,
  onEditTransition,
  onDeleteTransition,
  onAddTick,
  onEditTick,
  onDeleteTick,
  hasError = false,
  className,
}) => {
  const hasStates = behavior.states.length > 0;
  const hasTransitions = behavior.transitions.length > 0;
  const hasTicks = behavior.ticks.length > 0;
  const hasRules = behavior.rules.length > 0;

  return (
    <DomainSectionHeader
      title={behavior.name}
      sectionType="behavior"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      editable={editable}
      onEdit={onEdit}
      onDelete={onDelete}
      subtitle={`Behavior for ${behavior.entityName}`}
      count={behavior.transitions.length}
      hasError={hasError}
      className={className}
    >
      <VStack gap="lg">
        {/* States */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="state">States:</DomainKeyword>
            </Typography>
            {editable && onAddState && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddState}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Icon icon={Plus} size="xs" />
                Add state
              </Button>
            )}
          </HStack>

          {hasStates ? (
            <Box className="flex flex-wrap gap-2 ml-4">
              {behavior.states.map((state) => (
                <DomainState
                  key={state}
                  name={state}
                  isInitial={state === behavior.initialState}
                  onClick={onStateClick ? () => onStateClick(state) : undefined}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
              No states defined
            </Typography>
          )}
        </VStack>

        {/* Transitions */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="behavior">Transitions:</DomainKeyword>
            </Typography>
            {editable && onAddTransition && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddTransition}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Icon icon={Plus} size="xs" />
                Add transition
              </Button>
            )}
          </HStack>

          {hasTransitions ? (
            <VStack gap="sm" className="ml-4">
              {behavior.transitions.map((transition, index) => (
                <DomainTransitionRow
                  key={`${transition.fromState}-${transition.toState}-${transition.event}`}
                  fromState={transition.fromState}
                  toState={transition.toState}
                  event={transition.event}
                  guards={transition.guards}
                  effects={transition.effects}
                  editable={editable}
                  onEdit={onEditTransition ? () => onEditTransition(index) : undefined}
                  onDelete={onDeleteTransition ? () => onDeleteTransition(index) : undefined}
                  onStateClick={onStateClick}
                />
              ))}
            </VStack>
          ) : (
            <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
              No transitions defined
            </Typography>
          )}
        </VStack>

        {/* Ticks */}
        {(hasTicks || editable) && (
          <VStack gap="sm">
            <HStack justify="between" align="center">
              <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
                <DomainKeyword category="behavior">Scheduled Tasks (Ticks):</DomainKeyword>
              </Typography>
              {editable && onAddTick && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddTick}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Icon icon={Plus} size="xs" />
                  Add tick
                </Button>
              )}
            </HStack>

            {hasTicks ? (
              <VStack gap="md" className="ml-4">
                {behavior.ticks.map((tick, index) => (
                  <Box
                    key={tick.name}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 space-y-2"
                  >
                    {/* Tick header */}
                    <HStack gap="sm" align="center">
                      <Clock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      <DomainKeyword category="behavior">Every</DomainKeyword>
                      <Typography
                        variant="caption"
                        className="font-mono px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        {tick.interval}
                      </Typography>
                      <Typography variant="body2" className="text-[var(--color-muted-foreground)]">:</Typography>

                      {editable && (
                        <HStack gap="xs" align="center" className="ml-auto">
                          {onEditTick && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditTick(index)}
                              className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                            >
                              Edit
                            </Button>
                          )}
                          {onDeleteTick && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteTick(index)}
                              className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                            >
                              Delete
                            </Button>
                          )}
                        </HStack>
                      )}
                    </HStack>

                    {/* Tick guard */}
                    {tick.guard && (
                      <DomainGuardRow guard={tick.guard} size="sm" editable={false} />
                    )}

                    {/* Tick effects */}
                    {tick.effects.length > 0 && (
                      <VStack gap="xs">
                        {tick.effects.map((effect, effectIndex) => (
                          <HStack
                            key={effectIndex}
                            gap="sm"
                            align="center"
                            className="px-3 py-1.5 rounded"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)' }}
                          >
                            <Typography variant="caption" className="text-[var(--color-muted-foreground)] font-mono">-</Typography>
                            <Typography variant="body2" className="text-[var(--color-foreground)]">
                              {effect.description}
                            </Typography>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Typography variant="body2" className="ml-4 text-[var(--color-muted-foreground)] italic">
                No scheduled tasks defined
              </Typography>
            )}
          </VStack>
        )}

        {/* Rules */}
        {hasRules && (
          <VStack gap="sm">
            <Typography variant="body2" className="font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="guard">Rules:</DomainKeyword>
            </Typography>
            <VStack gap="xs" className="ml-4">
              {behavior.rules.map((rule, index) => (
                <HStack
                  key={index}
                  gap="sm"
                  align="start"
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
                  }}
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} />
                  <Typography variant="body2" className="text-[var(--color-foreground)]">
                    {rule}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </DomainSectionHeader>
  );
};

DomainBehaviorSection.displayName = 'DomainBehaviorSection';
