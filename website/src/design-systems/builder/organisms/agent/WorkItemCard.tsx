/**
 * WorkItemCard Component
 *
 * Displays a single work item from the analysis phase.
 * Shows work item details and contains questions for user to answer.
 * Supports input types: multiselect, yesno, ordered_list, select_with_other.
 */

import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  Card,
  Badge,
  ProgressBar,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Label,
  Icon,
  Input,
  Textarea,
} from '@almadar/ui';
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
    <Typography
      as="span"
      variant="caption"
      className="inline-flex items-center px-1.5 py-0.5 rounded font-medium"
      style={impactStyles[impact] || defaultImpactStyle}
    >
      {impact}
    </Typography>
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
    <VStack gap="xs" className="mt-3">
      {items.map(item => (
        <HStack key={item.label} gap="xs" align="center" wrap>
          <Typography
            as="span"
            variant="caption"
            className="min-w-[60px]"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {item.label}:
          </Typography>
          {item.values.map(value => (
            <Badge key={value} variant="default" size="sm">{value}</Badge>
          ))}
        </HStack>
      ))}
    </VStack>
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

const QuestionInput: React.FC<{
  question: WorkItemQuestion;
  value: string;
  onChange: (value: string) => void;
}> = ({ question, value, onChange }) => {
  const [otherText, setOtherText] = useState('');

  switch (question.inputType) {
    case 'yesno':
      return (
        <HStack gap="sm">
          <Button
            type="button"
            onClick={() => onChange('Yes')}
            variant="default"
            size="md"
            style={value === 'Yes' ? selectedStyle.yes : unselectedStyle}
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={() => onChange('No')}
            variant="default"
            size="md"
            style={value === 'No' ? selectedStyle.no : unselectedStyle}
          >
            No
          </Button>
        </HStack>
      );

    case 'multiselect': {
      const selectedValues = value ? value.split(', ').filter(Boolean) : [];
      const { hasOther } = parseOtherValue(value);

      return (
        <VStack gap="sm">
          <HStack gap="sm" wrap>
            {question.suggestedAnswers?.map(option => {
              const isOther = isOtherOption(option);
              const isSelected = isOther ? hasOther : selectedValues.includes(option);

              return (
                <Button
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
                  variant="default"
                  size="sm"
                  style={isSelected ? selectedStyle.blue : unselectedStyle}
                >
                  {isOther ? 'Other' : option}
                </Button>
              );
            })}
          </HStack>
          {hasOther && (
            <Input
              inputType="text"
              value={otherText || parseOtherValue(value).otherText}
              onChange={(e) => {
                const newOtherText = e.target.value;
                setOtherText(newOtherText);
                const baseValues = selectedValues.filter(v => !v.startsWith('Other:'));
                const newSelected = [...baseValues, `Other: ${newOtherText}`];
                onChange(newSelected.join(', '));
              }}
              placeholder="Please specify..."
              className="w-full"
            />
          )}
        </VStack>
      );
    }

    case 'select_with_other': {
      const isOtherSelected = value.startsWith('Other:');
      const { otherText: parsedOtherText } = parseOtherValue(value);

      return (
        <VStack gap="sm">
          <HStack gap="sm" wrap>
            {question.suggestedAnswers?.map(option => {
              const isOther = isOtherOption(option);
              const isSelected = isOther ? isOtherSelected : value === option;

              return (
                <Button
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
                  variant="default"
                  size="sm"
                  style={isSelected ? selectedStyle.blue : unselectedStyle}
                >
                  {isOther ? 'Other' : option}
                </Button>
              );
            })}
          </HStack>
          {isOtherSelected && (
            <Input
              inputType="text"
              value={otherText || parsedOtherText}
              onChange={(e) => {
                const newOtherText = e.target.value;
                setOtherText(newOtherText);
                onChange(`Other: ${newOtherText}`);
              }}
              placeholder="Please specify..."
              className="w-full"
            />
          )}
        </VStack>
      );
    }

    case 'ordered_list': {
      const items = value ? value.split('\n').filter(Boolean) : [];
      const suggestedItems = question.suggestedAnswers || [];

      return (
        <VStack gap="sm">
          {suggestedItems.length > 0 && (
            <HStack gap="xs" wrap align="center">
              <Typography
                as="span"
                variant="caption"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Suggestions:
              </Typography>
              {suggestedItems.map(item => {
                const isAdded = items.includes(item);
                return (
                  <Button
                    key={item}
                    type="button"
                    onClick={() => { if (!isAdded) onChange([...items, item].join('\n')); }}
                    disabled={isAdded}
                    variant="default"
                    size="sm"
                    className={clsx(isAdded ? 'cursor-not-allowed' : '')}
                    style={isAdded ? disabledStyle : unselectedStyle}
                  >
                    + {item}
                  </Button>
                );
              })}
            </HStack>
          )}

          {items.length > 0 && (
            <VStack gap="xs">
              {items.map((item, index) => (
                <HStack
                  key={`${item}-${index}`}
                  align="center"
                  gap="sm"
                  className="px-3 py-2 rounded-md"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <Typography
                    as="span"
                    variant="caption"
                    className="flex items-center justify-center w-6 h-6 rounded-full font-medium flex-shrink-0"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography
                    as="span"
                    variant="small"
                    className="flex-1"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {item}
                  </Typography>
                  <Button
                    type="button"
                    onClick={() => {
                      const newItems = [...items];
                      newItems.splice(index, 1);
                      onChange(newItems.join('\n'));
                    }}
                    variant="ghost"
                    size="sm"
                    aria-label="Remove item"
                    style={{ color: 'var(--color-muted-foreground)' }}
                    className="p-1"
                  >
                    <Icon icon={X} size="sm" />
                  </Button>
                </HStack>
              ))}
            </VStack>
          )}

          <HStack gap="sm">
            <Input
              inputType="text"
              placeholder="Add custom item..."
              className="flex-1"
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
          </HStack>
        </VStack>
      );
    }

    default:
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer..."
          rows={2}
          className="w-full"
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
      <Box
        className="cursor-pointer select-none p-4"
        style={{
          backgroundColor: expanded ? 'color-mix(in srgb, var(--color-info) 10%, transparent)' : undefined,
        }}
        onClick={toggleExpand}
      >
        <HStack align="start" justify="between" gap="md">
          <Box className="flex-1">
            <HStack align="center" gap="sm">
              <Typography
                as="span"
                variant="caption"
                className="flex items-center justify-center w-6 h-6 rounded-full font-medium flex-shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' }}
              >
                {index + 1}
              </Typography>
              <Typography
                variant="h3"
                className="text-lg font-semibold"
                style={{ color: 'var(--color-foreground)' }}
              >
                {workItem.name}
              </Typography>
            </HStack>
            <Typography
              variant="body2"
              className="mt-1 ml-8"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              {workItem.description}
            </Typography>
          </Box>
          <HStack align="center" gap="sm" className="flex-shrink-0">
            <ComplexityBadge complexity={workItem.estimatedComplexity} />
            {totalQuestions > 0 && (
              <Badge variant={allAnswered ? 'success' : 'warning'} size="sm">
                {answeredQuestions}/{totalQuestions} answered
              </Badge>
            )}
            <Icon
              icon={ChevronDown}
              size="md"
              className={clsx('transition-transform', expanded ? 'rotate-180' : '')}
              style={{ color: 'var(--color-muted-foreground)' }}
            />
          </HStack>
        </HStack>
        <ScopeDisplay scope={workItem.scope} />
      </Box>

      {/* Questions */}
      {expanded && workItem.questions.length > 0 && (
        <VStack
          gap="md"
          className="p-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {workItem.questions.map((question, qIndex) => {
            if (question.conditionalOn) {
              const parentAnswer = answers[question.conditionalOn.questionId];
              if (parentAnswer !== question.conditionalOn.answerEquals) return null;
            }

            return (
              <VStack key={question.id} gap="sm">
                <HStack align="start" justify="between" gap="sm">
                  <Label className="block text-sm font-medium flex-1" style={{ color: 'var(--color-foreground)' }}>
                    <HStack as="span" align="center" gap="sm">
                      <Typography
                        as="span"
                        variant="caption"
                        style={{ color: 'var(--color-muted-foreground)' }}
                      >
                        Q{qIndex + 1}
                      </Typography>
                      {question.question}
                    </HStack>
                    {question.reason && (
                      <Typography
                        as="span"
                        variant="caption"
                        className="block font-normal mt-1"
                        style={{ color: 'var(--color-muted-foreground)' }}
                      >
                        {question.reason}
                      </Typography>
                    )}
                  </Label>
                  <SchemaImpactBadge impact={question.impactsSchemaElement} />
                </HStack>
                <QuestionInput
                  question={question}
                  value={answers[question.id] || ''}
                  onChange={(value) => onAnswerChange(question.id, value)}
                />
              </VStack>
            );
          })}
        </VStack>
      )}

      {expanded && workItem.questions.length === 0 && (
        <Box
          className="p-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Typography
            variant="body2"
            className="italic"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            No questions for this work item. It will be executed automatically.
          </Typography>
        </Box>
      )}
    </Card>
  );
};

WorkItemCard.displayName = 'WorkItemCard';
export default WorkItemCard;
