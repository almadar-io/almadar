/**
 * AIAnalysisPanel
 *
 * Display AI-generated analysis and recommendations.
 * AI features for advanced insights.
 *
 * Maps to aiAnalysis field on MealPlan entity
 *
 * Event Contract:
 * - Emits: UI:REGENERATE_ANALYSIS - when regenerate button is clicked
 * - Payload: { resourceType, resourceId, entity }
 */

import React, { useCallback } from "react";
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  cn,
  Box,
  HStack,
  VStack,
  Typography,
  Button,
  Card,
  LoadingState,
  ErrorState,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';

export interface AIAnalysisData {
  id?: string;
  resourceType: string;
  resourceId: string;
  content: string;
  recommendations?: string[];
  warnings?: string[];
  highlights?: string[];
  generatedAt?: string | Date;
  confidence?: number;
}

export interface AIAnalysisPanelProps extends EntityDisplayProps<AIAnalysisData> {
  /** Analysis data */
  analysis: AIAnalysisData;
  /** Show regenerate button */
  showRegenerate?: boolean;
  /** Compact mode */
  compact?: boolean;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  analysis,
  showRegenerate = true,
  isLoading = false,
  error = null,
  compact = false,
  entity,
  className,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();

  const handleRegenerate = useCallback(() => {
    if (!analysis) return;
    eventBus.emit("UI:REGENERATE_ANALYSIS", {
      resourceType: analysis.resourceType,
      resourceId: analysis.resourceId,
      entity,
    });
  }, [eventBus, analysis, entity]);

  // Loading state
  if (isLoading) {
    return <LoadingState className={className} />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error?.message} className={className} />;
  }

  // Guard against undefined analysis
  if (!analysis) {
    return null;
  }

  if (compact) {
    return (
      <Box
        rounded="lg"
        padding="sm"
        className={cn("bg-purple-500/10 border border-purple-500/20", className)}
      >
        <HStack gap="sm" align="start">
          <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
          <Typography variant="small" className="text-purple-600 line-clamp-2">
            {analysis.content}
          </Typography>
        </HStack>
      </Box>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10",
        className,
      )}
    >
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-purple-500/15"
            >
              <Sparkles className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{t('ai.title')}</Typography>
              {analysis.generatedAt && (
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('ai.generated')}{" "}
                  {new Date(analysis.generatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Typography>
              )}
            </VStack>
          </HStack>
          {showRegenerate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRegenerate}
              disabled={isLoading}
            >
              <RefreshCw
                className={cn("h-4 w-4 mr-1", isLoading && "animate-spin")}
              />
              {isLoading ? t('ai.analyzing') : t('ai.regenerate')}
            </Button>
          )}
        </HStack>

        {/* Main Content */}
        <Typography variant="body" className="text-[var(--color-foreground)]">
          {analysis.content}
        </Typography>

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <Typography variant="label" className="text-[var(--color-foreground)]">
                {t('ai.recommendations')}
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.recommendations.map((rec, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-white/50 border border-amber-500/20"
                >
                  <Typography variant="small" className="text-[var(--color-foreground)]">
                    {rec}
                  </Typography>
                </Box>
              ))}
            </VStack>
          </VStack>
        )}

        {/* Warnings */}
        {analysis.warnings && analysis.warnings.length > 0 && (
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <Typography variant="label" className="text-[var(--color-foreground)]">
                {t('ai.areasOfConcern')}
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.warnings.map((warning, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-red-500/10 border border-red-500/20"
                >
                  <Typography variant="small" className="text-red-600">
                    {warning}
                  </Typography>
                </Box>
              ))}
            </VStack>
          </VStack>
        )}

        {/* Highlights */}
        {analysis.highlights && analysis.highlights.length > 0 && (
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <Typography variant="label" className="text-[var(--color-foreground)]">
                {t('ai.highlights')}
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.highlights.map((highlight, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-emerald-500/10 border border-emerald-500/20"
                >
                  <Typography variant="small" className="text-emerald-600">
                    {highlight}
                  </Typography>
                </Box>
              ))}
            </VStack>
          </VStack>
        )}

        {/* Confidence indicator */}
        {analysis.confidence !== undefined && (
          <HStack
            gap="sm"
            align="center"
            className="pt-2 border-t border-purple-500/20"
          >
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('ai.confidence')}
            </Typography>
            <Box rounded="full" className="h-1.5 w-24 bg-purple-500/15">
              <Box
                rounded="full"
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${analysis.confidence * 100}%` }}
              />
            </Box>
            <Typography variant="small" className="text-purple-600 font-medium">
              {Math.round(analysis.confidence * 100)}%
            </Typography>
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

AIAnalysisPanel.displayName = "AIAnalysisPanel";
