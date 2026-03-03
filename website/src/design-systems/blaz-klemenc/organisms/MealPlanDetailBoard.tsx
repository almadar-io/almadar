/* eslint-disable almadar/organism-extends-entity-display */
/**
 * MealPlanDetailBoard - Organism for viewing detailed meal plan information
 *
 * Contains all logic, state handling, and UI for the meal plan detail view.
 * Accepts declarative event props for flattener compliance.
 *
 * Event props emitted via useEventBus():
 * - editEvent -> UI:{editEvent}
 * - deleteEvent -> UI:{deleteEvent}
 * - analyzeEvent -> UI:{analyzeEvent}
 * - shareEvent -> UI:{shareEvent}
 * - backEvent -> UI:{backEvent}
 */

import React from "react";
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
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Badge,
  Spinner,
  LoadingState,
  ErrorState,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';

/**
 * MealPlan entity data
 */
export interface MealPlanEntity {
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
  /** Related trainee data */
  trainee?: {
    id: string;
    name: string;
    email?: string;
  };
}

export interface MealPlanDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** MealPlan entity data */
  entity?: MealPlanEntity | MealPlanEntity[];
  /** AI analysis loading state */
  isAnalyzing?: boolean;
  /** Event name for editing (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for deleting (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for AI analysis (emitted as UI:{analyzeEvent}) */
  analyzeEvent?: string;
  /** Event name for sharing (emitted as UI:{shareEvent}) */
  shareEvent?: string;
  /** Event name for back navigation (emitted as UI:{backEvent}) */
  backEvent?: string;
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

export const MealPlanDetailBoard: React.FC<MealPlanDetailBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  isAnalyzing = false,
  className,
  editEvent,
  deleteEvent,
  analyzeEvent,
  shareEvent,
  backEvent,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const entityData = Array.isArray(entity) ? entity[0] : entity;

  // Handle back navigation
  const handleBack = () => {
    if (backEvent) emit(`UI:${backEvent}`, { entity: "MealPlan" });
  };

  // Handle edit
  const handleEdit = () => {
    if (editEvent) emit(`UI:${editEvent}`, { row: entityData, entity: "MealPlan" });
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteEvent) emit(`UI:${deleteEvent}`, { row: entityData, entity: "MealPlan" });
  };

  // Handle AI analysis
  const handleAnalyze = () => {
    if (analyzeEvent) emit(`UI:${analyzeEvent}`, { row: entityData, entity: "MealPlan" });
  };

  // Handle share
  const handleShare = () => {
    if (shareEvent) emit(`UI:${shareEvent}`, { row: entityData, entity: "MealPlan" });
  };

  // Loading state
  if (isLoading) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Spinner size="lg" />
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t('mealPlan.loading')}
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
          {t('mealPlan.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  // No data state
  if (!entityData || !entityData.title) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Utensils className="h-12 w-12 text-[var(--color-muted-foreground)]" />
        <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
          {t('mealPlan.notFound')}
        </Typography>
      </VStack>
    );
  }

  // Prepare nutrition data
  const nutritionData: NutritionData = {
    calories: entityData.calories || 0,
    protein: entityData.protein || 0,
    carbs: entityData.carbs || 0,
    fat: entityData.fat || 0,
  };

  // Prepare AI analysis data
  const aiAnalysisData: AIAnalysisData | undefined = entityData.aiAnalysis
    ? {
        id: entityData.id || "",
        resourceType: "MealPlan",
        resourceId: entityData.id || "",
        content: entityData.aiAnalysis,
        generatedAt: entityData.updatedAt || new Date().toISOString(),
      }
    : undefined;

  const trainee = entityData.trainee;

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
            className="items-center justify-center bg-orange-500/15"
          >
            <Utensils className="h-6 w-6 text-orange-600" />
          </Box>
          <VStack gap="xs">
            <Typography variant="h1">{entityData.title}</Typography>
            <HStack gap="md" align="center" className="text-[var(--color-muted-foreground)]">
              <HStack gap="xs" align="center">
                <Calendar className="h-4 w-4" />
                <Typography variant="body">{formatDate(entityData.date)}</Typography>
              </HStack>
              {entityData.calories && (
                <HStack gap="xs" align="center">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <Typography variant="body">{entityData.calories} kcal</Typography>
                </HStack>
              )}
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            {t('mealPlan.edit')}
          </Button>
          {!entityData.aiAnalysis && (
            <Button
              variant="secondary"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {isAnalyzing ? t('mealPlan.analyzing') : t('mealPlan.analyze')}
            </Button>
          )}
          <Button variant="secondary" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            {t('mealPlan.share')}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
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
          {entityData.description && (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">{t('mealPlan.description')}</Typography>
                <Typography variant="body" className="text-[var(--color-foreground)]">
                  {entityData.description}
                </Typography>
              </VStack>
            </Card>
          )}

          {/* Nutrition Summary */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">{t('mealPlan.nutritionBreakdown')}</Typography>
              <NutritionSummary summary={nutritionData} />
            </VStack>
          </Card>

          {/* Trainee Info */}
          {trainee && (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">{t('mealPlan.assignedTo')}</Typography>
                <HStack gap="sm" align="center">
                  <Box
                    display="flex"
                    rounded="full"
                    className="items-center justify-center h-10 w-10 bg-[var(--color-muted)]"
                  >
                    <User className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                  </Box>
                  <VStack gap="none">
                    <Typography variant="body" className="font-medium">
                      {trainee.name}
                    </Typography>
                    {trainee.email && (
                      <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
                <Typography variant="h4" className="text-[var(--color-muted-foreground)]">
                  {t('mealPlan.noAiAnalysis')}
                </Typography>
                <Typography
                  variant="body"
                  className="text-[var(--color-muted-foreground)] text-center max-w-xs"
                >
                  {t('mealPlan.aiAnalysisDesc')}
                </Typography>
                <Button
                  variant="primary"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isAnalyzing ? t('mealPlan.analyzing') : t('mealPlan.generateAnalysis')}
                </Button>
              </VStack>
            </Card>
          )}

          {/* Share Link */}
          {entityData.shareLink ? (
            <Card className="p-4">
              <VStack gap="sm">
                <Typography variant="h4">{t('mealPlan.shareLink')}</Typography>
                <ShareableLinkGenerator
                  existingLink={entityData.shareLink}
                  resourceType="MealPlan"
                  resourceId={entityData.id || ""}
                />
              </VStack>
            </Card>
          ) : (
            <Card className="p-4">
              <VStack gap="md" align="center" className="py-4">
                <Share2 className="h-8 w-8 text-[var(--color-muted-foreground)]" />
                <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                  {t('mealPlan.noShareLink')}
                </Typography>
                <Button variant="secondary" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  {t('mealPlan.generateShareLink')}
                </Button>
              </VStack>
            </Card>
          )}

          {/* Metadata */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('mealPlan.details')}</Typography>
              <VStack gap="xs">
                {entityData.createdAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('mealPlan.created')}
                    </Typography>
                    <Typography variant="small">
                      {formatDate(entityData.createdAt)}
                    </Typography>
                  </HStack>
                )}
                {entityData.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('mealPlan.lastUpdated')}
                    </Typography>
                    <Typography variant="small">
                      {formatDate(entityData.updatedAt)}
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

MealPlanDetailBoard.displayName = "MealPlanDetailBoard";
