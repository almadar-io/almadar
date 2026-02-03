/**
 * TraineeComparison
 *
 * Compare progress metrics between multiple trainees or same trainee over time.
 * Useful for trainers to visualize relative progress and identify areas for improvement.
 *
 * Maps to multiple entities from blaz-klemenc.orb:
 * - User (trainee info)
 * - Lift (exercise performance)
 * - WellnessEntry (wellness metrics)
 * - ProgressEntry (milestones, assessments)
 *
 * Event Contract:
 * - Emits: UI:SELECT_TRAINEE - when a trainee is selected for details
 * - Emits: UI:DATE_RANGE_CHANGE - when comparison date range changes
 * - Emits: UI:METRIC_CHANGE - when compared metric changes
 * - Payload: { row: ComparisonData, entity: "User" }
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  User,
  Calendar,
  Award,
  Dumbbell,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Trainee data for comparison
 */
export interface TraineeComparisonData {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
  metrics: {
    /** Total lifts logged */
    totalLifts: number;
    /** Average lift weight improvement */
    avgWeightImprovement: number;
    /** Consistency score (0-100) */
    consistencyScore: number;
    /** Total sessions attended */
    totalSessions: number;
    /** Average wellness score */
    avgWellnessScore: number;
    /** Milestones achieved */
    milestonesAchieved: number;
    /** Current streak (days) */
    currentStreak: number;
    /** Best lift (kg) */
    bestLift?: number;
    /** Body fat change */
    bodyFatChange?: number;
    /** Weight change */
    weightChange?: number;
  };
}

export interface TraineeComparisonProps {
  /** Trainees to compare */
  trainees: TraineeComparisonData[];
  /** Maximum trainees to show */
  maxVisible?: number;
  /** Metric to highlight */
  highlightMetric?: keyof TraineeComparisonData["metrics"];
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Metric configuration
const metricConfig = {
  totalLifts: {
    label: "Total Lifts",
    icon: Dumbbell,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  avgWeightImprovement: {
    label: "Avg. Improvement",
    icon: TrendingUp,
    format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    higherIsBetter: true,
  },
  consistencyScore: {
    label: "Consistency",
    icon: Activity,
    format: (v: number) => `${v.toFixed(0)}%`,
    higherIsBetter: true,
  },
  totalSessions: {
    label: "Sessions",
    icon: Calendar,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  avgWellnessScore: {
    label: "Wellness Score",
    icon: Activity,
    format: (v: number) => v.toFixed(1),
    higherIsBetter: true,
  },
  milestonesAchieved: {
    label: "Milestones",
    icon: Award,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  currentStreak: {
    label: "Current Streak",
    icon: TrendingUp,
    format: (v: number) => `${v} days`,
    higherIsBetter: true,
  },
  bestLift: {
    label: "Best Lift",
    icon: Dumbbell,
    format: (v: number) => `${v}kg`,
    higherIsBetter: true,
  },
  bodyFatChange: {
    label: "Body Fat",
    icon: Activity,
    format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    higherIsBetter: false,
  },
  weightChange: {
    label: "Weight",
    icon: Activity,
    format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}kg`,
    higherIsBetter: false,
  },
};

// Get ranking for a metric
const getRanking = (
  trainees: TraineeComparisonData[],
  metric: keyof TraineeComparisonData["metrics"],
): Map<string, number> => {
  const config = metricConfig[metric];
  const sorted = [...trainees].sort((a, b) => {
    const aVal = a.metrics[metric] ?? 0;
    const bVal = b.metrics[metric] ?? 0;
    return config?.higherIsBetter !== false ? bVal - aVal : aVal - bVal;
  });
  return new Map(sorted.map((t, i) => [t.id, i + 1]));
};

// Get trend indicator
const getTrendIcon = (
  value: number | undefined,
  higherIsBetter: boolean = true,
) => {
  if (value === undefined || Math.abs(value) < 0.1) {
    return { icon: Minus, color: "text-neutral-400" };
  }
  const isPositive = higherIsBetter ? value > 0 : value < 0;
  return {
    icon: isPositive ? TrendingUp : TrendingDown,
    color: isPositive ? "text-green-500" : "text-red-500",
  };
};

export const TraineeComparison: React.FC<TraineeComparisonProps> = ({
  trainees,
  maxVisible = 4,
  highlightMetric = "consistencyScore",
  entity = "User",
  className,
}) => {
  const eventBus = useEventBus();
  const [startIndex, setStartIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] =
    useState<keyof TraineeComparisonData["metrics"]>(highlightMetric);

  const visibleTrainees = trainees.slice(startIndex, startIndex + maxVisible);
  const rankings = getRanking(trainees, selectedMetric);
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + maxVisible < trainees.length;

  // Handle trainee selection
  const handleSelectTrainee = useCallback(
    (trainee: TraineeComparisonData) => {
      eventBus.emit("UI:SELECT_TRAINEE", { row: trainee, entity });
    },
    [eventBus, entity],
  );

  // Handle metric change
  const handleMetricChange = useCallback(
    (metric: keyof TraineeComparisonData["metrics"]) => {
      setSelectedMetric(metric);
      eventBus.emit("UI:METRIC_CHANGE", { metric, entity });
    },
    [eventBus, entity],
  );

  // Handle scroll
  const handleScrollLeft = useCallback(() => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleScrollRight = useCallback(() => {
    setStartIndex((prev) => Math.min(trainees.length - maxVisible, prev + 1));
  }, [trainees.length, maxVisible]);

  // Render metric row
  const renderMetricRow = (metric: keyof TraineeComparisonData["metrics"]) => {
    const config = metricConfig[metric];
    const Icon = config.icon;
    const isSelected = metric === selectedMetric;

    return (
      <Box
        key={metric}
        as="button"
        onClick={() => handleMetricChange(metric)}
        className={cn(
          "py-2 px-3 rounded-lg cursor-pointer transition-colors w-full",
          isSelected ? "bg-blue-50" : "hover:bg-neutral-50",
        )}
      >
        <HStack gap="md" align="center">
          <HStack gap="sm" align="center" className="w-40">
            <Icon
              className={cn(
                "h-4 w-4",
                isSelected ? "text-blue-600" : "text-neutral-400",
              )}
            />
            <Typography
              variant="small"
              className={
                isSelected ? "font-medium text-blue-700" : "text-neutral-600"
              }
            >
              {config.label}
            </Typography>
          </HStack>
          {visibleTrainees.map((trainee) => {
            const value = trainee.metrics[metric];
            const rank = rankings.get(trainee.id) || 0;
            const trend = getTrendIcon(value, config.higherIsBetter);
            const TrendIcon = trend.icon;

            return (
              <Box key={trainee.id} className="flex-1 text-center">
                <HStack gap="xs" justify="center" align="center">
                  <Typography
                    variant="body"
                    className={cn(
                      "font-medium",
                      isSelected && rank === 1 ? "text-green-600" : "",
                      isSelected && rank === trainees.length
                        ? "text-red-600"
                        : "",
                    )}
                  >
                    {value !== undefined ? config.format(value) : "-"}
                  </Typography>
                  {isSelected && value !== undefined && (
                    <TrendIcon className={cn("h-3 w-3", trend.color)} />
                  )}
                </HStack>
              </Box>
            );
          })}
        </HStack>
      </Box>
    );
  };

  if (trainees.length === 0) {
    return (
      <Card className={cn("p-6", className)}>
        <VStack gap="md" align="center" className="py-8">
          <Users className="h-12 w-12 text-neutral-300" />
          <Typography variant="body" className="text-neutral-500">
            No trainees to compare
          </Typography>
        </VStack>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-blue-100"
            >
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">Trainee Comparison</Typography>
              <Typography variant="small" className="text-neutral-500">
                Compare {trainees.length} trainees across metrics
              </Typography>
            </VStack>
          </HStack>
          <HStack gap="sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </HStack>
        </HStack>

        {/* Trainee Headers */}
        <HStack
          gap="md"
          align="center"
          className="border-b border-neutral-100 pb-3"
        >
          <Box className="w-40" />
          {visibleTrainees.map((trainee) => {
            const rank = rankings.get(trainee.id) || 0;
            return (
              <Box
                key={trainee.id}
                as="button"
                onClick={() => handleSelectTrainee(trainee)}
                className="flex-1 cursor-pointer hover:opacity-80"
              >
                <VStack gap="xs" align="center">
                  <Box
                    display="flex"
                    rounded="full"
                    className="items-center justify-center h-10 w-10 bg-neutral-100"
                  >
                    {trainee.profileImage ? (
                      <img
                        src={trainee.profileImage}
                        alt={trainee.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-neutral-400" />
                    )}
                  </Box>
                  <VStack gap="none" align="center">
                    <Typography variant="label" className="text-center">
                      {trainee.name}
                    </Typography>
                    {rank === 1 && (
                      <Badge variant="primary" size="sm">
                        <Award className="h-3 w-3 mr-1" />
                        Top
                      </Badge>
                    )}
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        </HStack>

        {/* Metrics Grid */}
        <VStack gap="none" className="divide-y divide-neutral-50">
          {renderMetricRow("consistencyScore")}
          {renderMetricRow("avgWeightImprovement")}
          {renderMetricRow("totalSessions")}
          {renderMetricRow("totalLifts")}
          {renderMetricRow("avgWellnessScore")}
          {renderMetricRow("milestonesAchieved")}
          {renderMetricRow("currentStreak")}
          {renderMetricRow("bestLift")}
          {renderMetricRow("bodyFatChange")}
          {renderMetricRow("weightChange")}
        </VStack>

        {/* Legend */}
        <HStack
          gap="md"
          justify="center"
          className="border-t border-neutral-100 pt-3"
        >
          <HStack gap="xs" align="center">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <Typography variant="small" className="text-neutral-500">
              Positive trend
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <Typography variant="small" className="text-neutral-500">
              Needs attention
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Minus className="h-3 w-3 text-neutral-400" />
            <Typography variant="small" className="text-neutral-500">
              No change
            </Typography>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
};

TraineeComparison.displayName = "TraineeComparison";
