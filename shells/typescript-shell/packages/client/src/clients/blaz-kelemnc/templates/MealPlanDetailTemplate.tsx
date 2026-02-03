/**
 * MealPlanDetailTemplate
 *
 * Template for viewing detailed information about a meal plan.
 * Shows nutrition breakdown, AI analysis, and sharing options.
 *
 * Page: MealPlanDetailPage (derived)
 * Entity: MealPlan
 * ViewType: detail
 *
 * Event Contract:
 * - Emits: UI:EDIT - edit meal plan
 * - Emits: UI:DELETE - delete meal plan
 * - Emits: UI:ANALYZE - request AI analysis
 * - Emits: UI:SHARE - share meal plan
 * - Emits: UI:BACK - navigate back
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import { NutritionSummary, NutritionData } from "../molecules/NutritionSummary";
import { AIAnalysisPanel, AIAnalysisData } from "../organisms/AIAnalysisPanel";
import { ShareableLinkGenerator } from "../atoms/ShareableLinkGenerator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Utensils,
  Calendar,
  Flame,
  Sparkles,
  Share2,
  User,
} from "lucide-react";

/**
 * MealPlan entity data
 */
export interface MealPlanData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  description?: string;
  date: string | Date;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  shareLink?: string;
  aiAnalysis?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Trainee data for display
 */
export interface TraineeInfo {
  id: string;
  name: string;
  email?: string;
}

export interface MealPlanDetailTemplateProps {
  /** Meal plan data */
  data?: MealPlanData;
  /** Trainee info */
  trainee?: TraineeInfo;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** AI analysis loading state */
  isAnalyzing?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const MealPlanDetailTemplate: React.FC<MealPlanDetailTemplateProps> = ({
  data,
  trainee,
  isLoading = false,
  error = null,
  isAnalyzing = false,
  entity = "MealPlan",
  className,
}) => {
  const eventBus = useEventBus();

  // Handle back navigation
  const handleBack = useCallback(() => {
    eventBus.emit("UI:BACK", { entity });
  }, [eventBus, entity]);

  // Handle edit
  const handleEdit = useCallback(() => {
    eventBus.emit("UI:EDIT", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle delete
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle AI analysis
  const handleAnalyze = useCallback(() => {
    eventBus.emit("UI:ANALYZE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle share
  const handleShare = useCallback(() => {
    eventBus.emit("UI:SHARE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Loading state
  if (isLoading) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Loading meal plan...
        </Typography>
      </VStack>
    );
  }

  // Error state
  if (error) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Typography variant="body" className="text-red-500">
          Error: {error.message}
        </Typography>
      </VStack>
    );
  }

  // No data state
  if (!data) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Utensils className="h-12 w-12 text-neutral-300" />
        <Typography variant="h3" className="text-neutral-500">
          Meal plan not found
        </Typography>
      </VStack>
    );
  }

  // Prepare nutrition data
  const nutritionData: NutritionData = {
    calories: data.calories || 0,
    protein: data.protein || 0,
    carbs: data.carbs || 0,
    fat: data.fat || 0,
  };

  // Prepare AI analysis data
  const aiAnalysisData: AIAnalysisData | undefined = data.aiAnalysis
    ? {
        id: data.id || "",
        resourceType: "MealPlan",
        resourceId: data.id || "",
        content: data.aiAnalysis,
        generatedAt: data.updatedAt || new Date().toISOString(),
      }
    : undefined;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="start" wrap>
        <HStack gap="md" align="center">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Box
            display="flex"
            rounded="lg"
            padding="md"
            className="items-center justify-center bg-orange-100"
          >
            <Utensils className="h-6 w-6 text-orange-600" />
          </Box>
          <VStack gap="xs">
            <Typography variant="h1">{data.title}</Typography>
            <HStack gap="md" align="center" className="text-neutral-500">
              <HStack gap="xs" align="center">
                <Calendar className="h-4 w-4" />
                <Typography variant="body">{formatDate(data.date)}</Typography>
              </HStack>
              {data.calories && (
                <HStack gap="xs" align="center">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <Typography variant="body">{data.calories} kcal</Typography>
                </HStack>
              )}
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {!data.aiAnalysis && (
            <Button
              variant="secondary"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          )}
          <Button variant="secondary" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </HStack>
      </HStack>

      {/* Main Content */}
      <HStack gap="lg" wrap className="w-full items-start">
        {/* Left Column */}
        <VStack gap="md" className="flex-1 min-w-[300px]">
          {/* Description */}
          {data.description && (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">Description</Typography>
                <Typography variant="body" className="text-neutral-600">
                  {data.description}
                </Typography>
              </VStack>
            </Card>
          )}

          {/* Nutrition Summary */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">Nutrition Breakdown</Typography>
              <NutritionSummary summary={nutritionData} />
            </VStack>
          </Card>

          {/* Trainee Info */}
          {trainee && (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">Assigned To</Typography>
                <HStack gap="sm" align="center">
                  <Box
                    display="flex"
                    rounded="full"
                    className="items-center justify-center h-10 w-10 bg-neutral-100"
                  >
                    <User className="h-5 w-5 text-neutral-400" />
                  </Box>
                  <VStack gap="none">
                    <Typography variant="body" className="font-medium">
                      {trainee.name}
                    </Typography>
                    {trainee.email && (
                      <Typography variant="small" className="text-neutral-500">
                        {trainee.email}
                      </Typography>
                    )}
                  </VStack>
                </HStack>
              </VStack>
            </Card>
          )}
        </VStack>

        {/* Right Column */}
        <VStack gap="md" className="flex-1 min-w-[300px]">
          {/* AI Analysis */}
          {aiAnalysisData ? (
            <AIAnalysisPanel
              analysis={aiAnalysisData}
              showRegenerate={true}
              entity="MealPlan"
            />
          ) : (
            <Card className="p-4">
              <VStack gap="md" align="center" className="py-6">
                <Sparkles className="h-10 w-10 text-purple-300" />
                <Typography variant="h4" className="text-neutral-500">
                  No AI Analysis Yet
                </Typography>
                <Typography
                  variant="body"
                  className="text-neutral-400 text-center max-w-xs"
                >
                  Get AI-powered insights about this meal plan's nutritional
                  balance and recommendations.
                </Typography>
                <Button
                  variant="primary"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isAnalyzing ? "Analyzing..." : "Generate Analysis"}
                </Button>
              </VStack>
            </Card>
          )}

          {/* Share Link */}
          {data.shareLink ? (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">Share Link</Typography>
                <ShareableLinkGenerator
                  existingLink={data.shareLink}
                  resourceType="MealPlan"
                  resourceId={data.id || ""}
                />
              </VStack>
            </Card>
          ) : (
            <Card className="p-4">
              <VStack gap="md" align="center" className="py-4">
                <Share2 className="h-8 w-8 text-neutral-300" />
                <Typography variant="body" className="text-neutral-500">
                  No share link generated yet
                </Typography>
                <Button variant="secondary" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Generate Share Link
                </Button>
              </VStack>
            </Card>
          )}

          {/* Metadata */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">Details</Typography>
              <VStack gap="xs">
                {data.createdAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Created
                    </Typography>
                    <Typography variant="small">
                      {formatDate(data.createdAt)}
                    </Typography>
                  </HStack>
                )}
                {data.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Last Updated
                    </Typography>
                    <Typography variant="small">
                      {formatDate(data.updatedAt)}
                    </Typography>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </HStack>
    </VStack>
  );
};

MealPlanDetailTemplate.displayName = "MealPlanDetailTemplate";
