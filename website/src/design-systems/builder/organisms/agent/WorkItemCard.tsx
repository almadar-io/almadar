/**
 * WorkItemCard Component
 *
 * Displays a single work item from the analysis phase.
 * Shows work item details and contains questions for user to answer.
 * Supports input types: multiselect, yesno, ordered_list, select_with_other.
 */

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Card, Badge, ProgressBar } from '@almadar/ui';
import { ChevronDown, X } from 'lucide-react';

// =============================================================================
// Types (inlined from analysisApi)
// =============================================================================

export type WorkItemQuestionCategory =
  | 'entity_lifecycle'
  | 'authorization'
  | 'constraint'
  | 'workflow'
  | 'relationship'
  | 'notification';

export type WorkItemQuestionInputType =
  | 'multiselect'
  | 'yesno'
  | 'ordered_list'
  | 'select_with_other';

export type WorkItemQuestionImpact =
  | 'states'
  | 'events'
  | 'transitions'
  | 'guards'
  | 'entities'
  | 'fields'
  | 'effects';

export interface WorkItemQuestion {
  id: string;
  category: WorkItemQuestionCategory;
  question: string;
  reason: string;
  inputType: WorkItemQuestionInputType;
  suggestedAnswers: string[];
  impactsSchemaElement: WorkItemQuestionImpact;
  conditionalOn?: {
    questionId: string;
    answerEquals: string;
  };
}

export interface WorkItemScope {
  entities?: string[];
  features?: string[];
  states?: string[];
  pages?: string[];
}

export interface AnalyzedWorkItem {
  id: string;
  name: string;
  description: string;
  scope: WorkItemScope;
  dependencies: string[];
  estimatedComplexity: number;
  questions: WorkItemQuestion[];
}

// =============================================================================
// Props
// =============================================================================

export interface WorkItemCardProps {
  workItem: AnalyzedWorkItem;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  index: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

// =============================================================================
// Helper Components
// =============================================================================

const ComplexityBadge: React.FC<{ complexity: number }> = ({ complexity }) => {
  let variant: 'success' | 'warning' | 'danger' = 'success';
  let label = 'Simple';

  if (complexity > 60) {
    variant = 'danger';
    label = 'Complex';
  } else if (complexity > 30) {
    variant = 'warning';
    label = 'Moderate';
  }

  return (
    <Badge variant={variant} size="sm">
      {label} ({complexity})
    </Badge>
  );
};

const impactStyles: Record<string, React.CSSProperties> = {
  states: { backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)', color: 'var(--color-accent)' },
  events: { backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' },
  transitions: { backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' },
  guards: { backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)', color: 'var(--color-warning)' },
  entities: { backgroundColor: 'color-mix(in srgb, var(--color-error) 15%, transparent)', color: 'var(--color-error)' },
  fields: { backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' },
  effects: { backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)', color: 'var(--color-warning)' },
};

const defaultImpactStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-muted-foreground)',
};

const SchemaImpactBadge: React.FC<{ impact?: string }> = ({ impact }) => {
  if (!impact) return null;

  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
      style={impactStyles[impact] || defaultImpactStyle}
    >
      {impact}
    </span>
  );
};

const ScopeDisplay: React.FC<{ scope: WorkItemScope }> = ({ scope }) => {
  const items: { label: string; values: string[] }[] = [];

  if (scope.entities?.length) items.push({ label: 'Entities', values: scope.entities });
  if (scope.features?.length) items.push({ label: 'Features', values: scope.features });
  if (scope.states?.length) items.push({ label: 'States', values: scope.states });
  if (scope.pages?.length) items.push({ label: 'Pages', values: scope.pages });

  if (items.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      {items.map(item => (
        <div key={item.label} className="flex flex-wrap gap-1 items-center">
          <span
            className="text-xs min-w-[60px]"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {item.label}:
          </span>
          {item.values.map(value => (
            <Badge key={value} variant="default" size="sm">{value}</Badge>
          ))}
        </div>
      ))}
    </div>
  );
};

const isOtherOption = (option: string): boolean => {
  return option.toLowerCase().includes('other') && option.includes(':');
};

const parseOtherValue = (value: string): { hasOther: boolean; otherText: string } => {
  const otherMatch = value.match(/Other: (.+)$/);
  if (otherMatch) return { hasOther: true, otherText: otherMatch[1] };
  return { hasOther: value.startsWith('Other:'), otherText: '' };
};

const selectedStyle: Record<string, React.CSSProperties> = {
  yes: { backgroundColor: 'var(--color-success)', color: '#fff' },
  no: { backgroundColor: 'var(--color-error)', color: '#fff' },
  blue: { backgroundColor: 'var(--color-info)', color: '#fff' },
};

const unselectedStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-foreground)',
};

const disabledStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-muted-foreground)',
};

const inputStyle: React.CSSProperties = {
  borderColor: 'var(--color-border)',
  backgroundColor: 'var(--color-card)',
  color: 'var(--color-foreground)',
};

const QuestionInput: React.FC<{
  question: WorkItemQuestion;
  value: string;
  onChange: (value: string) => void;
}> = ({ question, value, onChange }) => {
  const [otherText, setOtherText] = useState('');

  switch (question.inputType) {
    case 'yesno':
      return (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange('Yes')}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={value === 'Yes' ? selectedStyle.yes : unselectedStyle}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange('No')}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={value === 'No' ? selectedStyle.no : unselectedStyle}
          >
            No
          </button>
        </div>
      );

    case 'multiselect': {
      const selectedValues = value ? value.split(', ').filter(Boolean) : [];
      const { hasOther } = parseOtherValue(value);

      return (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {question.suggestedAnswers?.map(option => {
              const isOther = isOtherOption(option);
              const isSelected = isOther ? hasOther : selectedValues.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (isOther) {
                      if (hasOther) {
                        const newSelected = selectedValues.filter(v => !v.startsWith('Other:'));
                        onChange(newSelected.join(', '));
                        setOtherText('');
                      } else {
                        const newSelected = [...selectedValues.filter(v => !v.startsWith('Other:')), 'Other: '];
                        onChange(newSelected.join(', '));
                      }
                    } else {
                      const newSelected = selectedValues.includes(option)
                        ? selectedValues.filter(v => v !== option)
                        : [...selectedValues, option];
                      onChange(newSelected.join(', '));
                    }
                  }}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={isSelected ? selectedStyle.blue : unselectedStyle}
                >
                  {isOther ? 'Other' : option}
                </button>
              );
            })}
          </div>
          {hasOther && (
            <input
              type="text"
              value={otherText || parseOtherValue(value).otherText}
              onChange={(e) => {
                const newOtherText = e.target.value;
                setOtherText(newOtherText);
                const baseValues = selectedValues.filter(v => !v.startsWith('Other:'));
                const newSelected = [...baseValues, `Other: ${newOtherText}`];
                onChange(newSelected.join(', '));
              }}
              placeholder="Please specify..."
              className="w-full px-3 py-2 rounded-md border text-sm focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent"
              style={inputStyle}
            />
          )}
        </div>
      );
    }

    case 'select_with_other': {
      const isOtherSelected = value.startsWith('Other:');
      const { otherText: parsedOtherText } = parseOtherValue(value);

      return (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {question.suggestedAnswers?.map(option => {
              const isOther = isOtherOption(option);
              const isSelected = isOther ? isOtherSelected : value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (isOther) {
                      onChange('Other: ');
                      setOtherText('');
                    } else {
                      onChange(option);
                      setOtherText('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={isSelected ? selectedStyle.blue : unselectedStyle}
                >
                  {isOther ? 'Other' : option}
                </button>
              );
            })}
          </div>
          {isOtherSelected && (
            <input
              type="text"
              value={otherText || parsedOtherText}
              onChange={(e) => {
                const newOtherText = e.target.value;
                setOtherText(newOtherText);
                onChange(`Other: ${newOtherText}`);
              }}
              placeholder="Please specify..."
              className="w-full px-3 py-2 rounded-md border text-sm focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent"
              style={inputStyle}
            />
          )}
        </div>
      );
    }

    case 'ordered_list': {
      const items = value ? value.split('\n').filter(Boolean) : [];
      const suggestedItems = question.suggestedAnswers || [];

      return (
        <div className="space-y-3">
          {suggestedItems.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Suggestions:</span>
              {suggestedItems.map(item => {
                const isAdded = items.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { if (!isAdded) onChange([...items, item].join('\n')); }}
                    disabled={isAdded}
                    className={clsx(
                      'px-2 py-0.5 rounded text-xs transition-colors',
                      isAdded ? 'cursor-not-allowed' : ''
                    )}
                    style={isAdded ? disabledStyle : unselectedStyle}
                  >
                    + {item}
                  </button>
                );
              })}
            </div>
          )}

          {items.length > 0 && (
            <div className="space-y-1">
              {items.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <span
                    className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' }}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm" style={{ color: 'var(--color-foreground)' }}>{item}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...items];
                      newItems.splice(index, 1);
                      onChange(newItems.join('\n'));
                    }}
                    className="transition-colors"
                    style={{ color: 'var(--color-muted-foreground)' }}
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom item..."
              className="flex-1 px-3 py-2 rounded-md border text-sm focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent"
              style={inputStyle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  const newItem = input.value.trim();
                  if (newItem) {
                    onChange([...items, newItem].join('\n'));
                    input.value = '';
                  }
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      );
    }

    default:
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer..."
          rows={2}
          className="w-full px-3 py-2 rounded-md border text-sm focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent"
          style={inputStyle}
        />
      );
  }
};

// =============================================================================
// Main Component
// =============================================================================

export const WorkItemCard: React.FC<WorkItemCardProps> = ({
  workItem,
  answers,
  onAnswerChange,
  index,
  isExpanded = true,
  onToggleExpand,
  className,
}) => {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);
  const expanded = onToggleExpand ? isExpanded : localExpanded;
  const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));

  const isQuestionVisible = (question: WorkItemQuestion): boolean => {
    if (!question.conditionalOn) return true;
    const parentAnswer = answers[question.conditionalOn.questionId];
    return parentAnswer === question.conditionalOn.answerEquals;
  };

  const visibleQuestions = workItem.questions.filter(isQuestionVisible);
  const totalQuestions = visibleQuestions.length;
  const answeredQuestions = visibleQuestions.filter(q => {
    const answer = answers[q.id]?.trim();
    return answer && answer.length > 0;
  }).length;
  const allAnswered = answeredQuestions === totalQuestions;

  return (
    <Card
      className={clsx(
        'transition-all border',
        className
      )}
      style={{
        borderColor: expanded ? 'var(--color-info)' : 'var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className="cursor-pointer select-none p-4"
        style={{
          backgroundColor: expanded ? 'color-mix(in srgb, var(--color-info) 10%, transparent)' : undefined,
        }}
        onClick={toggleExpand}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' }}
              >
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
                {workItem.name}
              </h3>
            </div>
            <p className="text-sm mt-1 ml-8" style={{ color: 'var(--color-muted-foreground)' }}>
              {workItem.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ComplexityBadge complexity={workItem.estimatedComplexity} />
            {totalQuestions > 0 && (
              <Badge variant={allAnswered ? 'success' : 'warning'} size="sm">
                {answeredQuestions}/{totalQuestions} answered
              </Badge>
            )}
            <ChevronDown
              className={clsx('w-5 h-5 transition-transform', expanded ? 'rotate-180' : '')}
              style={{ color: 'var(--color-muted-foreground)' }}
            />
          </div>
        </div>
        <ScopeDisplay scope={workItem.scope} />
      </div>

      {/* Questions */}
      {expanded && workItem.questions.length > 0 && (
        <div
          className="p-4 space-y-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {workItem.questions.map((question, qIndex) => {
            if (question.conditionalOn) {
              const parentAnswer = answers[question.conditionalOn.questionId];
              if (parentAnswer !== question.conditionalOn.answerEquals) return null;
            }

            return (
              <div key={question.id} className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <label className="block text-sm font-medium flex-1" style={{ color: 'var(--color-foreground)' }}>
                    <span className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Q{qIndex + 1}</span>
                      {question.question}
                    </span>
                    {question.reason && (
                      <span className="block text-xs font-normal mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                        {question.reason}
                      </span>
                    )}
                  </label>
                  <SchemaImpactBadge impact={question.impactsSchemaElement} />
                </div>
                <QuestionInput
                  question={question}
                  value={answers[question.id] || ''}
                  onChange={(value) => onAnswerChange(question.id, value)}
                />
              </div>
            );
          })}
        </div>
      )}

      {expanded && workItem.questions.length === 0 && (
        <div
          className="p-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-sm italic" style={{ color: 'var(--color-muted-foreground)' }}>
            No questions for this work item. It will be executed automatically.
          </p>
        </div>
      )}
    </Card>
  );
};

WorkItemCard.displayName = 'WorkItemCard';
export default WorkItemCard;
