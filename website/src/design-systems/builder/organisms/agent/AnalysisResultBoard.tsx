/**
 * AnalysisResultBoard Component
 *
 * Displays the full analysis result with complexity meter, work items, and questions.
 * Used in the analysis-first generation flow.
 */

import React from 'react';
import { clsx } from 'clsx';
import { Card, Badge, Button, ProgressBar, Box, VStack, HStack, Typography } from '@almadar/ui';
import { WorkItemCard } from './WorkItemCard';
import type { AnalyzedWorkItem, WorkItemQuestion } from './WorkItemCard';

// =============================================================================
// Types (inlined from analysisApi)
// =============================================================================

export type ComplexityCategory = 'simple' | 'moderate' | 'complex';
export type AnalysisRoute = 'direct' | 'direct_with_questions' | 'decompose';

export interface ComplexityAssessment {
  score: number;
  category: ComplexityCategory;
  reasoning: string;
  detectedEntities?: string[];
  detectedFeatures?: string[];
  potentialChallenges?: string[];
}

export interface GlobalRequirements {
  entities: string[];
  states: string[];
  events: string[];
  guards: string[];
  pages: string[];
  effects: string[];
  rawRequirements: string[];
}

export interface AnalysisResult {
  userRequest: string;
  complexity: ComplexityAssessment;
  route: AnalysisRoute;
  workItems: AnalyzedWorkItem[];
  globalRequirements: GlobalRequirements;
  estimatedMinutes?: number;
}

export type WorkItemAnswers = Record<string, Record<string, string>>;

// =============================================================================
// Props
// =============================================================================

export interface AnalysisResultBoardProps {
  analysis: AnalysisResult;
  answers: WorkItemAnswers;
  onAnswerChange: (workItemId: string, questionId: string, value: string) => void;
  canSubmit: boolean;
  onSubmit: () => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
  className?: string;
}

// =============================================================================
// Helper Components
// =============================================================================

const ComplexityMeter: React.FC<{
  score: number;
  category: ComplexityCategory;
  reasoning: string;
}> = ({ score, category, reasoning }) => {
  const categoryColors = {
    simple: 'var(--color-success)',
    moderate: 'var(--color-warning)',
    complex: 'var(--color-error)',
  };

  const categoryLabels = {
    simple: 'Simple',
    moderate: 'Moderate',
    complex: 'Complex',
  };

  return (
    <VStack gap="sm">
      <HStack align="center" justify="between">
        <Typography variant="label">
          Complexity
        </Typography>
        <Badge
          variant={category === 'simple' ? 'success' : category === 'moderate' ? 'warning' : 'danger'}
        >
          {categoryLabels[category]} ({score}/100)
        </Badge>
      </HStack>
      <Box
        className="w-full bg-[var(--color-secondary)] rounded-full h-2"
      >
        <Box
          className="h-2 rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: categoryColors[category] }}
        />
      </Box>
      <Typography variant="caption">{reasoning}</Typography>
    </VStack>
  );
};

const RouteIndicator: React.FC<{ route: AnalysisRoute }> = ({ route }) => {
  const routeInfo = {
    direct: {
      label: 'Direct Execution',
      description: 'Simple request, no questions needed',
      color: 'var(--color-success)',
    },
    direct_with_questions: {
      label: 'With Clarification',
      description: 'Some questions to clarify requirements',
      color: 'var(--color-warning)',
    },
    decompose: {
      label: 'Decomposed',
      description: 'Complex request split into work items',
      color: 'var(--color-info)',
    },
  };

  const info = routeInfo[route];

  return (
    <HStack align="center" gap="sm">
      <Typography variant="label" style={{ color: info.color }}>{info.label}</Typography>
      <Typography variant="caption">
        - {info.description}
      </Typography>
    </HStack>
  );
};

const RequirementsSummary: React.FC<{ requirements: GlobalRequirements }> = ({ requirements }) => {
  const items = [
    { label: 'Entities', count: requirements.entities.length },
    { label: 'States', count: requirements.states.length },
    { label: 'Events', count: requirements.events.length },
    { label: 'Pages', count: requirements.pages.length },
  ].filter(item => item.count > 0);

  if (items.length === 0) return null;

  return (
    <VStack gap="sm">
      <Typography variant="h4" size="sm" weight="medium">
        Detected Requirements
      </Typography>
      <HStack wrap gap="sm">
        {items.map(item => (
          <HStack
            key={item.label}
            align="center"
            gap="xs"
            className="px-2 py-1 bg-[var(--color-secondary)] rounded"
          >
            <Typography variant="caption">{item.label}:</Typography>
            <Typography variant="small" weight="medium">{item.count}</Typography>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const AnalysisResultBoard: React.FC<AnalysisResultBoardProps> = ({
  analysis,
  answers,
  onAnswerChange,
  canSubmit,
  onSubmit,
  isSubmitting = false,
  onCancel,
  className,
}) => {
  const isQuestionVisible = (
    question: { conditionalOn?: { questionId: string; answerEquals: string } },
    itemAnswers: Record<string, string>
  ): boolean => {
    if (!question.conditionalOn) return true;
    const parentAnswer = itemAnswers[question.conditionalOn.questionId];
    return parentAnswer === question.conditionalOn.answerEquals;
  };

  const totalQuestions = analysis.workItems.reduce((sum, item) => {
    const itemAnswers = answers[item.id] || {};
    return sum + item.questions.filter(q => isQuestionVisible(q, itemAnswers)).length;
  }, 0);

  const answeredQuestions = analysis.workItems.reduce((sum, item) => {
    const itemAnswers = answers[item.id] || {};
    return sum + item.questions.filter(q => {
      if (!isQuestionVisible(q, itemAnswers)) return false;
      const answer = itemAnswers[q.id]?.trim();
      return answer && answer.length > 0;
    }).length;
  }, 0);

  const unansweredCount = totalQuestions - answeredQuestions;

  return (
    <VStack gap="lg" className={clsx(className)}>
      {/* Summary Card */}
      <Card className="shadow-sm">
        <Box className="p-4 border-b border-[var(--color-border)]">
          <Typography variant="h3" size="lg" weight="semibold">Analysis Summary</Typography>
        </Box>
        <VStack gap="md" className="p-4">
          <HStack className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComplexityMeter
              score={analysis.complexity.score}
              category={analysis.complexity.category}
              reasoning={analysis.complexity.reasoning}
            />
            <VStack gap="sm">
              <VStack gap="xs">
                <Typography variant="label">
                  Execution Route
                </Typography>
                <RouteIndicator route={analysis.route} />
              </VStack>
              {analysis.estimatedMinutes && (
                <VStack gap="xs">
                  <Typography variant="label">
                    Estimated Time
                  </Typography>
                  <Typography variant="body2" color="muted">
                    ~{analysis.estimatedMinutes} minutes
                  </Typography>
                </VStack>
              )}
            </VStack>
          </HStack>

          <RequirementsSummary requirements={analysis.globalRequirements} />

          {totalQuestions > 0 && (
            <VStack gap="sm">
              <HStack align="center" justify="between" className="text-sm">
                <Typography variant="small">Questions Progress</Typography>
                <Typography variant="small" color="muted">
                  {answeredQuestions}/{totalQuestions} answered
                </Typography>
              </HStack>
              <ProgressBar
                value={(answeredQuestions / totalQuestions) * 100}
                color={canSubmit ? 'success' : 'primary'}
              />
            </VStack>
          )}
        </VStack>
      </Card>

      {/* Work Items */}
      <VStack gap="md">
        <Typography variant="h3" size="lg" weight="semibold">
          Work Items ({analysis.workItems.length})
        </Typography>
        {analysis.workItems.map((workItem, index) => (
          <WorkItemCard
            key={workItem.id}
            workItem={workItem}
            answers={answers[workItem.id] || {}}
            onAnswerChange={(questionId, value) =>
              onAnswerChange(workItem.id, questionId, value)
            }
            index={index}
          />
        ))}
      </VStack>

      {/* Action Bar */}
      <Card className="bg-[var(--color-card)]/50">
        <HStack align="center" justify="between" className="p-4">
          <Box className="text-sm">
            {canSubmit ? (
              <Typography variant="small" style={{ color: 'var(--color-success)' }}>
                Ready to execute {analysis.workItems.length} work item(s)
              </Typography>
            ) : (
              <Typography variant="small" style={{ color: 'var(--color-warning)' }}>
                Please answer {unansweredCount} remaining question(s)
              </Typography>
            )}
          </Box>
          <HStack gap="sm">
            {onCancel && (
              <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={!canSubmit || isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Executing...' : 'Execute Plan'}
            </Button>
          </HStack>
        </HStack>
      </Card>
    </VStack>
  );
};

AnalysisResultBoard.displayName = 'AnalysisResultBoard';
export default AnalysisResultBoard;
