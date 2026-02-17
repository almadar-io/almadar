/**
 * AnalysisResultBoard Component
 *
 * Displays the full analysis result with complexity meter, work items, and questions.
 * Used in the analysis-first generation flow.
 */

import React from 'react';
import { clsx } from 'clsx';
import { Card, Badge, Button, ProgressBar } from '@almadar/ui';
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-foreground)]">
          Complexity
        </span>
        <Badge
          variant={category === 'simple' ? 'success' : category === 'moderate' ? 'warning' : 'danger'}
        >
          {categoryLabels[category]} ({score}/100)
        </Badge>
      </div>
      <div className="w-full bg-[var(--color-secondary)] rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: categoryColors[category] }}
        />
      </div>
      <p className="text-xs text-[var(--color-muted-foreground)]">{reasoning}</p>
    </div>
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
    <div className="flex items-center gap-2">
      <span className="font-medium" style={{ color: info.color }}>{info.label}</span>
      <span className="text-xs text-[var(--color-muted-foreground)]">
        - {info.description}
      </span>
    </div>
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
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-[var(--color-foreground)]">
        Detected Requirements
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <div
            key={item.label}
            className="flex items-center gap-1 px-2 py-1 bg-[var(--color-secondary)] rounded"
          >
            <span className="text-xs text-[var(--color-muted-foreground)]">{item.label}:</span>
            <span className="text-sm font-medium text-[var(--color-foreground)]">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
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
    <div className={clsx('space-y-6', className)}>
      {/* Summary Card */}
      <Card className="shadow-sm">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Analysis Summary</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComplexityMeter
              score={analysis.complexity.score}
              category={analysis.complexity.category}
              reasoning={analysis.complexity.reasoning}
            />
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-[var(--color-foreground)]">
                  Execution Route
                </span>
                <RouteIndicator route={analysis.route} />
              </div>
              {analysis.estimatedMinutes && (
                <div>
                  <span className="text-sm font-medium text-[var(--color-foreground)]">
                    Estimated Time
                  </span>
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    ~{analysis.estimatedMinutes} minutes
                  </p>
                </div>
              )}
            </div>
          </div>

          <RequirementsSummary requirements={analysis.globalRequirements} />

          {totalQuestions > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-foreground)]">Questions Progress</span>
                <span className="text-[var(--color-muted-foreground)]">
                  {answeredQuestions}/{totalQuestions} answered
                </span>
              </div>
              <ProgressBar
                value={(answeredQuestions / totalQuestions) * 100}
                color={canSubmit ? 'success' : 'primary'}
              />
            </div>
          )}
        </div>
      </Card>

      {/* Work Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
          Work Items ({analysis.workItems.length})
        </h3>
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
      </div>

      {/* Action Bar */}
      <Card className="bg-[var(--color-card)]/50">
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-[var(--color-muted-foreground)]">
            {canSubmit ? (
              <span style={{ color: 'var(--color-success)' }}>
                Ready to execute {analysis.workItems.length} work item(s)
              </span>
            ) : (
              <span style={{ color: 'var(--color-warning)' }}>
                Please answer {unansweredCount} remaining question(s)
              </span>
            )}
          </div>
          <div className="flex gap-3">
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
          </div>
        </div>
      </Card>
    </div>
  );
};

AnalysisResultBoard.displayName = 'AnalysisResultBoard';
export default AnalysisResultBoard;
