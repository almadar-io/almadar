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
import {
  cn,
  Box,
  HStack,
  VStack,
  Typography,
  Button,
  Card,
  Badge,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

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
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Metric configuration
const metricConfig = {
  totalLifts: {
    labelKey: "trainee.metricTotalLifts",
    icon: Dumbbell,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  avgWeightImprovement: {
    labelKey: "trainee.metricAvgImprovement",
    icon: TrendingUp,
    format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    higherIsBetter: true,
  },
  consistencyScore: {
    labelKey: "trainee.metricConsistency",
    icon: Activity,
    format: (v: number) => `${v.toFixed(0)}%`,
    higherIsBetter: true,
  },
  totalSessions: {
    labelKey: "trainee.metricSessions",
    icon: Calendar,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  avgWellnessScore: {
    labelKey: "trainee.metricWellnessScore",
    icon: Activity,
    format: (v: number) => v.toFixed(1),
    higherIsBetter: true,
  },
  milestonesAchieved: {
    labelKey: "trainee.metricMilestones",
    icon: Award,
    format: (v: number) => v.toString(),
    higherIsBetter: true,
  },
  currentStreak: {
    labelKey: "trainee.metricCurrentStreak",
    icon: TrendingUp,
    format: (v: number) => `${v} days`,
    higherIsBetter: true,
  },
  bestLift: {
    labelKey: "trainee.metricBestLift",
    icon: Dumbbell,
    format: (v: number) => `${v}kg`,
    higherIsBetter: true,
  },
  bodyFatChange: {
    labelKey: "trainee.metricBodyFat",
    icon: Activity,
    format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
    higherIsBetter: false,
  },
  weightChange: {
    labelKey: "trainee.metricWeight",
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
  const { t } = useTranslate();
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
          isSelected ? "bg-blue-500/10" : "hover:bg-[var(--color-muted)]",
        )}
      >
        <HStack gap="md" align="center">
          <HStack gap="sm" align="center" className="w-40">
            <Icon
              className={cn(
                "h-4 w-4",
                isSelected ? "text-blue-600" : "text-[var(--color-muted-foreground)]",
              )}
            />
            <Typography
              variant="small"
              className={
                isSelected ? "font-medium text-blue-600" : "text-[var(--color-foreground)]"
              }
            >
              {t(config.labelKey)}
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
          <Users className="h-12 w-12 text-[var(--color-muted-foreground)]" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {t('trainee.noTraineesToCompare')}
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
              className="items-center justify-center bg-blue-500/15"
            >
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{t('trainee.comparisonTitle')}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('trainee.compareTrainees', { count: trainees.length })}
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
          className="border-b border-[var(--color-border)] pb-3"
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
                    className="items-center justify-center h-10 w-10 bg-[var(--color-muted)]"
                  >
                    {trainee.profileImage ? (
                      <Box
                        as="img"
                        // @ts-expect-error -- Box polymorphic 'as' prop passes src/alt to <img>
                        src={trainee.profileImage}
                        alt={trainee.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                    )}
                  </Box>
                  <VStack gap="none" align="center">
                    <Typography variant="label" className="text-center">
                      {trainee.name}
                    </Typography>
                    {rank === 1 && (
                      <Badge variant="primary" size="sm">
                        <Award className="h-3 w-3 mr-1" />
                        {t('trainee.top')}
                      </Badge>
                    )}
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        </HStack>

        {/* Metrics Grid */}
        <VStack gap="none" className="divide-y divide-[var(--color-border)]">
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
          className="border-t border-[var(--color-border)] pt-3"
        >
          <HStack gap="xs" align="center">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('trainee.positiveTrend')}
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('trainee.needsAttention')}
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Minus className="h-3 w-3 text-neutral-400" />
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('trainee.noChange')}
            </Typography>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
};

TraineeComparison.displayName = "TraineeComparison";
