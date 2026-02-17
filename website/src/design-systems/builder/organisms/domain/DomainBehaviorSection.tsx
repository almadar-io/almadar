/**
 * DomainBehaviorSection Organism Component
 *
 * Complete behavior display with states, transitions, ticks, and rules.
 */

import React from 'react';
import { Plus, Clock, AlertCircle } from 'lucide-react';
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
      <div className="space-y-6">
        {/* States */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="state">States:</DomainKeyword>
            </span>
            {editable && onAddState && (
              <button
                type="button"
                onClick={onAddState}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Plus className="w-3 h-3" />
                Add state
              </button>
            )}
          </div>

          {hasStates ? (
            <div className="flex flex-wrap gap-2 ml-4">
              {behavior.states.map((state) => (
                <DomainState
                  key={state}
                  name={state}
                  isInitial={state === behavior.initialState}
                  onClick={onStateClick ? () => onStateClick(state) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
              No states defined
            </div>
          )}
        </div>

        {/* Transitions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="behavior">Transitions:</DomainKeyword>
            </span>
            {editable && onAddTransition && (
              <button
                type="button"
                onClick={onAddTransition}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                <Plus className="w-3 h-3" />
                Add transition
              </button>
            )}
          </div>

          {hasTransitions ? (
            <div className="space-y-2 ml-4">
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
            </div>
          ) : (
            <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
              No transitions defined
            </div>
          )}
        </div>

        {/* Ticks */}
        {(hasTicks || editable) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                <DomainKeyword category="behavior">Scheduled Tasks (Ticks):</DomainKeyword>
              </span>
              {editable && onAddTick && (
                <button
                  type="button"
                  onClick={onAddTick}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                >
                  <Plus className="w-3 h-3" />
                  Add tick
                </button>
              )}
            </div>

            {hasTicks ? (
              <div className="space-y-3 ml-4">
                {behavior.ticks.map((tick, index) => (
                  <div
                    key={tick.name}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 space-y-2"
                  >
                    {/* Tick header */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      <DomainKeyword category="behavior">Every</DomainKeyword>
                      <span
                        className="font-mono text-sm px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        {tick.interval}
                      </span>
                      <span className="text-[var(--color-muted-foreground)]">:</span>

                      {editable && (
                        <div className="flex items-center gap-1 ml-auto">
                          {onEditTick && (
                            <button
                              type="button"
                              onClick={() => onEditTick(index)}
                              className="p-1 rounded hover:bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                            >
                              Edit
                            </button>
                          )}
                          {onDeleteTick && (
                            <button
                              type="button"
                              onClick={() => onDeleteTick(index)}
                              className="p-1 rounded hover:bg-[var(--color-error)]/10 text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tick guard */}
                    {tick.guard && (
                      <DomainGuardRow guard={tick.guard} size="sm" editable={false} />
                    )}

                    {/* Tick effects */}
                    {tick.effects.length > 0 && (
                      <div className="space-y-1">
                        {tick.effects.map((effect, effectIndex) => (
                          <div
                            key={effectIndex}
                            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)' }}
                          >
                            <span className="text-[var(--color-muted-foreground)] font-mono">-</span>
                            <span className="text-[var(--color-foreground)]">
                              {effect.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="ml-4 text-sm text-[var(--color-muted-foreground)] italic">
                No scheduled tasks defined
              </div>
            )}
          </div>
        )}

        {/* Rules */}
        {hasRules && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              <DomainKeyword category="guard">Rules:</DomainKeyword>
            </span>
            <div className="space-y-1 ml-4">
              {behavior.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
                  }}
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} />
                  <span className="text-sm text-[var(--color-foreground)]">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DomainSectionHeader>
  );
};

DomainBehaviorSection.displayName = 'DomainBehaviorSection';
