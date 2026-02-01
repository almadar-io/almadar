/**
 * MealPlanCard
 *
 * Display a meal plan with macros breakdown, calories, and actions.
 * Nutrition tracking is key to fitness results.
 *
 * Maps to MealPlan entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - title: string (max 100)
 * - description: string (max 500)
 * - date: date
 * - calories: number (0-10000)
 * - protein: number (0-1000)
 * - carbs: number (0-1000)
 * - fat: number (0-1000)
 * - shareLink: string
 * - aiAnalysis: string
 * - createdAt: timestamp
 * - updatedAt: timestamp
 *
 * Event Contract (matches MealPlanManagement trait):
 * - Emits: UI:VIEW - to view meal plan details
 * - Emits: UI:EDIT - to edit a meal plan
 * - Emits: UI:DELETE - to delete a meal plan
 * - Payload: { row: MealPlanData, entity: "MealPlan" }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Utensils,
  Flame,
  Edit2,
  Eye,
  Share2,
  Sparkles,
  Calendar,
  Trash2,
} from "lucide-react";

/**
 * MealPlan entity data matching schema definition
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

export interface MealPlanCardProps {
  /** Meal plan data */
  data: MealPlanData;
  /** Show macro breakdown */
  showMacros?: boolean;
  /** Show AI analysis badge */
  showAiAnalysis?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Show action buttons */
  showActions?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Macro colors
const macroColors = {
  protein: { bar: "bg-red-500", text: "text-red-600", label: "Protein" },
  carbs: { bar: "bg-amber-500", text: "text-amber-600", label: "Carbs" },
  fat: { bar: "bg-green-500", text: "text-green-600", label: "Fat" },
};

// Format date for display
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const MealPlanCard: React.FC<MealPlanCardProps> = ({
  data,
  showMacros = true,
  showAiAnalysis = true,
  compact = false,
  showActions = true,
  entity = "MealPlan",
  className,
}) => {
  const eventBus = useEventBus();

  // Calculate macro percentages for visual display
  const totalMacroGrams =
    (data.protein || 0) + (data.carbs || 0) + (data.fat || 0);
  const macroPercentages =
    totalMacroGrams > 0
      ? {
          protein: ((data.protein || 0) / totalMacroGrams) * 100,
          carbs: ((data.carbs || 0) / totalMacroGrams) * 100,
          fat: ((data.fat || 0) / totalMacroGrams) * 100,
        }
      : { protein: 0, carbs: 0, fat: 0 };

  // Emit VIEW event (matches MealPlanManagement trait)
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit EDIT event (matches MealPlanManagement trait)
  const handleEdit = useCallback(() => {
    eventBus.emit("UI:EDIT", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit DELETE event
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle share action
  const handleShare = useCallback(() => {
    if (data.shareLink) {
      navigator.clipboard.writeText(data.shareLink);
      eventBus.emit("UI:NOTIFY", {
        message: "Link copied to clipboard",
        type: "success",
      });
    }
  }, [eventBus, data.shareLink]);

  if (compact) {
    return (
      <Card
        className={cn("p-3 cursor-pointer hover:bg-neutral-50", className)}
        onClick={handleView}
      >
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className="items-center justify-center bg-orange-100"
            >
              <Utensils className="h-4 w-4 text-orange-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="label">{data.title}</Typography>
              <HStack gap="xs" align="center">
                <Calendar className="h-3 w-3 text-neutral-400" />
                <Typography variant="small" className="text-neutral-500">
                  {formatDate(data.date)}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <HStack gap="sm" align="center">
            {data.calories && (
              <HStack gap="xs" align="center">
                <Flame className="h-4 w-4 text-orange-500" />
                <Typography variant="body" className="font-semibold">
                  {data.calories}
                </Typography>
                <Typography variant="small" className="text-neutral-500">
                  kcal
                </Typography>
              </HStack>
            )}
            {data.aiAnalysis && showAiAnalysis && (
              <Badge variant="secondary" size="sm">
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Badge>
            )}
          </HStack>
        </HStack>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-orange-100"
            >
              <Utensils className="h-5 w-5 text-orange-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{data.title}</Typography>
              <HStack gap="xs" align="center">
                <Calendar className="h-3 w-3 text-neutral-400" />
                <Typography variant="small" className="text-neutral-500">
                  {formatDate(data.date)}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <HStack gap="sm" align="center">
            {data.calories && (
              <Badge variant="secondary" size="md">
                <Flame className="h-3 w-3 mr-1 text-orange-500" />
                {data.calories} kcal
              </Badge>
            )}
            {data.aiAnalysis && showAiAnalysis && (
              <Badge variant="secondary" size="md" title="AI Analysis Available">
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Badge>
            )}
          </HStack>
        </HStack>

        {/* Description */}
        {data.description && (
          <Typography variant="body" className="text-neutral-600">
            {data.description}
          </Typography>
        )}

        {/* Macro Breakdown */}
        {showMacros && totalMacroGrams > 0 && (
          <VStack gap="sm">
            {/* Macro Bar */}
            <Box
              rounded="full"
              className="h-2 w-full overflow-hidden bg-neutral-100"
            >
              <HStack gap="none" className="h-full">
                <Box
                  className={cn("h-full transition-all", macroColors.protein.bar)}
                  style={{ width: `${macroPercentages.protein}%` }}
                />
                <Box
                  className={cn("h-full transition-all", macroColors.carbs.bar)}
                  style={{ width: `${macroPercentages.carbs}%` }}
                />
                <Box
                  className={cn("h-full transition-all", macroColors.fat.bar)}
                  style={{ width: `${macroPercentages.fat}%` }}
                />
              </HStack>
            </Box>

            {/* Macro Values */}
            <HStack gap="md" justify="between">
              <VStack gap="none" align="center">
                <Typography variant="small" className={macroColors.protein.text}>
                  Protein
                </Typography>
                <Typography variant="body" className="font-semibold">
                  {data.protein || 0}g
                </Typography>
              </VStack>
              <VStack gap="none" align="center">
                <Typography variant="small" className={macroColors.carbs.text}>
                  Carbs
                </Typography>
                <Typography variant="body" className="font-semibold">
                  {data.carbs || 0}g
                </Typography>
              </VStack>
              <VStack gap="none" align="center">
                <Typography variant="small" className={macroColors.fat.text}>
                  Fat
                </Typography>
                <Typography variant="body" className="font-semibold">
                  {data.fat || 0}g
                </Typography>
              </VStack>
            </HStack>
          </VStack>
        )}

        {/* AI Analysis Preview */}
        {data.aiAnalysis && showAiAnalysis && (
          <Box
            padding="sm"
            rounded="lg"
            className="bg-purple-50 border border-purple-100"
          >
            <HStack gap="sm" align="start">
              <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
              <Typography
                variant="small"
                className="text-purple-700 line-clamp-2"
              >
                {data.aiAnalysis}
              </Typography>
            </HStack>
          </Box>
        )}

        {/* Action Buttons */}
        {showActions && (
          <HStack gap="sm" className="border-t border-neutral-100 pt-3">
            <Button variant="secondary" size="sm" onClick={handleView}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            {data.shareLink && (
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            )}
            <Box className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

MealPlanCard.displayName = "MealPlanCard";
