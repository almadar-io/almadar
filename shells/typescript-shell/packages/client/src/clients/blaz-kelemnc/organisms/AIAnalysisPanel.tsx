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
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

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

export interface AIAnalysisPanelProps {
  /** Analysis data */
  analysis: AIAnalysisData;
  /** Show regenerate button */
  showRegenerate?: boolean;
  /** Is regenerating */
  isLoading?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  analysis,
  showRegenerate = true,
  isLoading = false,
  compact = false,
  entity,
  className,
}) => {
  const eventBus = useEventBus();

  const handleRegenerate = useCallback(() => {
    if (!analysis) return;
    eventBus.emit("UI:REGENERATE_ANALYSIS", {
      resourceType: analysis.resourceType,
      resourceId: analysis.resourceId,
      entity,
    });
  }, [eventBus, analysis, entity]);

  // Guard against undefined analysis
  if (!analysis) {
    return null;
  }

  if (compact) {
    return (
      <Box
        rounded="lg"
        padding="sm"
        className={cn("bg-purple-50 border border-purple-100", className)}
      >
        <HStack gap="sm" align="start">
          <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
          <Typography variant="small" className="text-purple-700 line-clamp-2">
            {analysis.content}
          </Typography>
        </HStack>
      </Box>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-to-br from-purple-50 to-indigo-50",
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
              className="items-center justify-center bg-purple-100"
            >
              <Sparkles className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">AI Analysis</Typography>
              {analysis.generatedAt && (
                <Typography variant="small" className="text-neutral-500">
                  Generated{" "}
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
              {isLoading ? "Analyzing..." : "Regenerate"}
            </Button>
          )}
        </HStack>

        {/* Main Content */}
        <Typography variant="body" className="text-neutral-700">
          {analysis.content}
        </Typography>

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <VStack gap="sm">
            <HStack gap="xs" align="center">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <Typography variant="label" className="text-neutral-600">
                Recommendations
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.recommendations.map((rec, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-white/50 border border-amber-100"
                >
                  <Typography variant="small" className="text-neutral-600">
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
              <Typography variant="label" className="text-neutral-600">
                Areas of Concern
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.warnings.map((warning, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-red-50 border border-red-100"
                >
                  <Typography variant="small" className="text-red-700">
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
              <Typography variant="label" className="text-neutral-600">
                Highlights
              </Typography>
            </HStack>
            <VStack gap="xs">
              {analysis.highlights.map((highlight, index) => (
                <Box
                  key={index}
                  rounded="md"
                  padding="sm"
                  className="bg-emerald-50 border border-emerald-100"
                >
                  <Typography variant="small" className="text-emerald-700">
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
            className="pt-2 border-t border-purple-100"
          >
            <Typography variant="small" className="text-neutral-500">
              Confidence:
            </Typography>
            <Box rounded="full" className="h-1.5 w-24 bg-purple-100">
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
