/**
 * NutritionSummary
 *
 * Daily/weekly nutrition summary with macro breakdown.
 * Quick overview of nutrition compliance.
 *
 * Event Contract:
 * - entityAware: true (display only, no events emitted)
 */

import React, { useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Flame, Target, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date?: string | Date;
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionSummaryProps {
  /** Nutrition data to display */
  summary: NutritionData;
  /** Target values for comparison */
  targets?: NutritionTargets;
  /** Summary period */
  period?: "day" | "week";
  /** Compact mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Macro configuration
const macroConfig = {
  protein: {
    label: "Protein",
    color: "text-red-600",
    bgColor: "bg-red-100",
    barColor: "bg-red-500",
  },
  carbs: {
    label: "Carbs",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    barColor: "bg-amber-500",
  },
  fat: {
    label: "Fat",
    color: "text-green-600",
    bgColor: "bg-green-100",
    barColor: "bg-green-500",
  },
};

// Calculate percentage of target
const getPercentage = (value: number, target: number): number => {
  if (target === 0) return 0;
  return Math.round((value / target) * 100);
};

// Get compliance status
const getComplianceStatus = (
  percentage: number,
): { status: "under" | "on-track" | "over"; color: string } => {
  if (percentage < 80) return { status: "under", color: "text-amber-600" };
  if (percentage <= 110)
    return { status: "on-track", color: "text-emerald-600" };
  return { status: "over", color: "text-red-600" };
};

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  summary,
  targets,
  period = "day",
  compact = false,
  className,
}) => {
  // Calculate percentages if targets provided
  const percentages = useMemo(() => {
    if (!targets) return null;
    return {
      calories: getPercentage(summary.calories, targets.calories),
      protein: getPercentage(summary.protein, targets.protein),
      carbs: getPercentage(summary.carbs, targets.carbs),
      fat: getPercentage(summary.fat, targets.fat),
    };
  }, [summary, targets]);

  // Overall compliance
  const overallCompliance = useMemo(() => {
    if (!percentages) return null;
    const avg =
      (percentages.calories +
        percentages.protein +
        percentages.carbs +
        percentages.fat) /
      4;
    return getComplianceStatus(avg);
  }, [percentages]);

  if (compact) {
    return (
      <Card className={cn("p-3", className)}>
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="full"
              padding="xs"
              className="items-center justify-center bg-orange-100"
            >
              <Flame className="h-4 w-4 text-orange-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-semibold">
                {summary.calories} kcal
              </Typography>
              {targets && percentages && (
                <Typography variant="small" className="text-neutral-500">
                  {percentages.calories}% of target
                </Typography>
              )}
            </VStack>
          </HStack>
          <HStack gap="sm">
            <Badge
              variant="default"
              size="sm"
              className={macroConfig.protein.bgColor}
            >
              <span className={macroConfig.protein.color}>
                {summary.protein}g P
              </span>
            </Badge>
            <Badge
              variant="default"
              size="sm"
              className={macroConfig.carbs.bgColor}
            >
              <span className={macroConfig.carbs.color}>
                {summary.carbs}g C
              </span>
            </Badge>
            <Badge
              variant="default"
              size="sm"
              className={macroConfig.fat.bgColor}
            >
              <span className={macroConfig.fat.color}>{summary.fat}g F</span>
            </Badge>
          </HStack>
        </HStack>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <VStack gap="none">
            <Typography variant="h4">
              {period === "day" ? "Daily" : "Weekly"} Nutrition
            </Typography>
            {summary.date && (
              <Typography variant="small" className="text-neutral-500">
                {new Date(summary.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            )}
          </VStack>
          {overallCompliance && (
            <Badge
              variant={
                overallCompliance.status === "on-track"
                  ? "success"
                  : overallCompliance.status === "over"
                    ? "danger"
                    : "warning"
              }
            >
              {overallCompliance.status === "on-track" ? (
                <Target className="h-3 w-3 mr-1" />
              ) : overallCompliance.status === "over" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {overallCompliance.status === "on-track"
                ? "On Track"
                : overallCompliance.status === "over"
                  ? "Over Target"
                  : "Under Target"}
            </Badge>
          )}
        </HStack>

        {/* Calories */}
        <Box rounded="lg" padding="md" className="bg-orange-50">
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center">
              <Flame className="h-5 w-5 text-orange-600" />
              <Typography variant="body" className="font-medium">
                Calories
              </Typography>
            </HStack>
            <VStack gap="none" align="end">
              <Typography variant="h3" className="text-orange-600 font-bold">
                {summary.calories}
              </Typography>
              {targets && (
                <Typography variant="small" className="text-neutral-500">
                  / {targets.calories} kcal ({percentages?.calories}%)
                </Typography>
              )}
            </VStack>
          </HStack>
          {targets && percentages && (
            <Box rounded="full" className="h-2 w-full mt-2 bg-orange-100">
              <Box
                rounded="full"
                className="h-full bg-orange-500 transition-all"
                style={{ width: `${Math.min(100, percentages.calories)}%` }}
              />
            </Box>
          )}
        </Box>

        {/* Macros */}
        <Box className="grid grid-cols-3 gap-3">
          {(["protein", "carbs", "fat"] as const).map((macro) => {
            const config = macroConfig[macro];
            const value = summary[macro];
            const target = targets?.[macro];
            const percentage = percentages?.[macro];

            return (
              <Box
                key={macro}
                rounded="lg"
                padding="sm"
                className={config.bgColor}
              >
                <VStack gap="xs" align="center">
                  <Typography variant="small" className={config.color}>
                    {config.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    className={cn("font-bold", config.color)}
                  >
                    {value}g
                  </Typography>
                  {target && percentage !== undefined && (
                    <>
                      <Typography variant="small" className="text-neutral-500">
                        / {target}g
                      </Typography>
                      <Box rounded="full" className="h-1.5 w-full bg-white/50">
                        <Box
                          rounded="full"
                          className={cn(
                            "h-full transition-all",
                            config.barColor,
                          )}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </Box>
                    </>
                  )}
                </VStack>
              </Box>
            );
          })}
        </Box>

        {/* Macro Ratio Bar */}
        {summary.protein + summary.carbs + summary.fat > 0 && (
          <VStack gap="xs">
            <Typography variant="small" className="text-neutral-500">
              Macro Ratio
            </Typography>
            <Box
              rounded="full"
              className="h-3 w-full overflow-hidden bg-neutral-100"
            >
              <HStack gap="none" className="h-full">
                <Box
                  className={cn("h-full", macroConfig.protein.barColor)}
                  style={{
                    width: `${(summary.protein / (summary.protein + summary.carbs + summary.fat)) * 100}%`,
                  }}
                />
                <Box
                  className={cn("h-full", macroConfig.carbs.barColor)}
                  style={{
                    width: `${(summary.carbs / (summary.protein + summary.carbs + summary.fat)) * 100}%`,
                  }}
                />
                <Box
                  className={cn("h-full", macroConfig.fat.barColor)}
                  style={{
                    width: `${(summary.fat / (summary.protein + summary.carbs + summary.fat)) * 100}%`,
                  }}
                />
              </HStack>
            </Box>
            <HStack justify="between">
              <Typography variant="small" className={macroConfig.protein.color}>
                {Math.round(
                  (summary.protein /
                    (summary.protein + summary.carbs + summary.fat)) *
                    100,
                )}
                % P
              </Typography>
              <Typography variant="small" className={macroConfig.carbs.color}>
                {Math.round(
                  (summary.carbs /
                    (summary.protein + summary.carbs + summary.fat)) *
                    100,
                )}
                % C
              </Typography>
              <Typography variant="small" className={macroConfig.fat.color}>
                {Math.round(
                  (summary.fat /
                    (summary.protein + summary.carbs + summary.fat)) *
                    100,
                )}
                % F
              </Typography>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};

NutritionSummary.displayName = "NutritionSummary";
