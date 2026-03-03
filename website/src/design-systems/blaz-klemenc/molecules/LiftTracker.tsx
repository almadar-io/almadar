/**
 * LiftTracker
 *
 * Track and display weightlifting progress with exercise, weight, reps, and sets.
 * Core feature for strength training progress monitoring.
 *
 * Maps to Lift entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - exerciseName: string
 * - weight: number
 * - reps: number
 * - sets: number
 * - date: date
 * - notes: string (optional)
 *
 * Event Contract (matches LiftManagement trait):
 * - Emits: UI:LOG_LIFT - to log a new lift entry
 * - Emits: UI:VIEW - to view lift details
 * - Emits: UI:EDIT - to edit a lift entry
 * - Emits: UI:DELETE - to delete a lift entry
 * - Payload: { row: LiftData, entity: "Lift" }
 */

import React, { useCallback, useState } from "react";
import {
  Plus,
  Trash2,
  TrendingUp,
  Dumbbell,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit2,
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
} from '@almadar/ui';

/**
 * Lift entity data matching schema definition
 */
export interface LiftData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  exerciseName: string;
  weight: number;
  reps: number;
  sets: number;
  date: string | Date;
  notes?: string;
}

/** Operation definition for action buttons */
export interface LiftOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export interface LiftTrackerProps {
  /** Array of lift entries to display */
  lifts?: LiftData[];
  /** Trainee ID for context */
  traineeId?: string;
  /** Trainer ID for context */
  trainerId?: string;
  /** Show summary cards for each exercise */
  showSummary?: boolean;
  /** Show progress chart */
  showProgressChart?: boolean;
  /** Group by exercise name */
  groupByExercise?: boolean;
  /** Operations/actions available */
  operations?: LiftOperation[];
  /** Max entries to show before collapse */
  maxVisible?: number;
  /** Additional CSS classes */
  className?: string;
}

// Format date for display
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Calculate trend compared to previous entry for same exercise
const calculateTrend = (
  lifts: LiftData[],
  exerciseName: string,
): { direction: "up" | "down" | "same"; percentage: number } | null => {
  const exerciseLifts = lifts
    .filter((l) => l.exerciseName === exerciseName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (exerciseLifts.length < 2) return null;

  const current = exerciseLifts[0].weight;
  const previous = exerciseLifts[1].weight;
  const diff = current - previous;
  const percentage = Math.abs((diff / previous) * 100);

  return {
    direction: diff > 0 ? "up" : diff < 0 ? "down" : "same",
    percentage: Math.round(percentage * 10) / 10,
  };
};

// Group lifts by exercise
const groupByExercise = (lifts: LiftData[]): Record<string, LiftData[]> => {
  return lifts.reduce(
    (acc, lift) => {
      if (!acc[lift.exerciseName]) {
        acc[lift.exerciseName] = [];
      }
      acc[lift.exerciseName].push(lift);
      return acc;
    },
    {} as Record<string, LiftData[]>,
  );
};

export const LiftTracker: React.FC<LiftTrackerProps> = ({
  lifts,
  traineeId,
  trainerId,
  showSummary = true,
  maxVisible = 5,
  className,
}) => {
  const eventBus = useEventBus();
  const [expanded, setExpanded] = useState(false);

  // Ensure lifts is always an array
  const liftData = lifts ?? [];

  // Sort lifts by date descending
  const sortedLifts = [...liftData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const visibleLifts = expanded
    ? sortedLifts
    : sortedLifts.slice(0, maxVisible);
  const hasMore = sortedLifts.length > maxVisible;

  // Emit LOG_LIFT event (matches LiftManagement trait)
  const handleLogLift = useCallback(() => {
    eventBus.emit("UI:LOG_LIFT", {
      traineeId,
      trainerId,
      entity: "Lift",
    });
  }, [eventBus, traineeId, trainerId]);

  // Emit VIEW event (matches LiftManagement trait)
  const handleView = useCallback(
    (lift: LiftData) => {
      eventBus.emit("UI:VIEW", { row: lift, entity: "Lift" });
    },
    [eventBus],
  );

  // Emit EDIT event (matches LiftManagement trait)
  const handleEdit = useCallback(
    (lift: LiftData) => {
      eventBus.emit("UI:EDIT", { row: lift, entity: "Lift" });
    },
    [eventBus],
  );

  // Emit DELETE event (matches LiftManagement trait)
  const handleDelete = useCallback(
    (lift: LiftData) => {
      eventBus.emit("UI:DELETE", { row: lift, entity: "Lift" });
    },
    [eventBus],
  );

  // Get unique exercises with their latest lifts for summary
  const groupedLifts = groupByExercise(liftData);
  const exerciseSummaries = Object.entries(groupedLifts).map(
    ([exerciseName, entries]) => {
      const latest = entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0];
      const trend = calculateTrend(liftData, exerciseName);
      const maxWeight = Math.max(...entries.map((e) => e.weight));
      return { exerciseName, latest, trend, maxWeight, count: entries.length };
    },
  );

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
              className="items-center justify-center bg-red-500/15"
            >
              <Dumbbell className="h-5 w-5 text-red-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">Lift Progress</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {liftData.length} entries logged
              </Typography>
            </VStack>
          </HStack>
          <Button variant="primary" size="sm" onClick={handleLogLift}>
            <Plus className="h-4 w-4 mr-1" />
            Log Lift
          </Button>
        </HStack>

        {/* Exercise Summaries */}
        {showSummary && exerciseSummaries.length > 0 && (
          <Box className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {exerciseSummaries.slice(0, 6).map((summary) => (
              <Box
                key={summary.exerciseName}
                rounded="lg"
                padding="sm"
                className="bg-[var(--color-muted)]"
              >
                <VStack gap="xs">
                  <Typography
                    variant="small"
                    className="text-[var(--color-foreground)] truncate"
                  >
                    {summary.exerciseName}
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Typography variant="h4" className="text-[var(--color-foreground)]">
                      {summary.latest.weight}
                    </Typography>
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      kg
                    </Typography>
                    {summary.trend && summary.trend.direction !== "same" && (
                      <Badge
                        variant={
                          summary.trend.direction === "up"
                            ? "success"
                            : "danger"
                        }
                        size="sm"
                      >
                        {summary.trend.direction === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingUp className="h-3 w-3 rotate-180" />
                        )}
                        {summary.trend.percentage}%
                      </Badge>
                    )}
                  </HStack>
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    PR: {summary.maxWeight}kg
                  </Typography>
                </VStack>
              </Box>
            ))}
          </Box>
        )}

        {/* Recent Lifts List */}
        <VStack gap="sm">
          <Typography variant="label" className="text-[var(--color-foreground)]">
            Recent Entries
          </Typography>
          {visibleLifts.length === 0 ? (
            <Box padding="md" className="text-center bg-[var(--color-muted)] rounded-lg">
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                No lifts logged yet. Start tracking your progress!
              </Typography>
            </Box>
          ) : (
            <VStack gap="xs">
              {visibleLifts.map((lift) => (
                <Box
                  key={lift.id}
                  rounded="lg"
                  padding="sm"
                  border
                  className="bg-[var(--color-card)] hover:bg-[var(--color-muted)] transition-colors"
                >
                  <HStack justify="between" align="center">
                    <HStack gap="sm" align="center">
                      <VStack gap="none">
                        <Typography variant="body" className="font-medium">
                          {lift.exerciseName}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-[var(--color-muted-foreground)]"
                        >
                          {formatDate(lift.date)}
                        </Typography>
                      </VStack>
                    </HStack>
                    <HStack gap="md" align="center">
                      <HStack gap="sm">
                        <VStack gap="none" align="end">
                          <Typography variant="body" className="font-semibold">
                            {lift.weight}kg
                          </Typography>
                          <Typography
                            variant="small"
                            className="text-[var(--color-muted-foreground)]"
                          >
                            {lift.sets}x{lift.reps}
                          </Typography>
                        </VStack>
                      </HStack>
                      <HStack gap="xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(lift)}
                          className="text-[var(--color-muted-foreground)] hover:text-blue-500"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(lift)}
                          className="text-[var(--color-muted-foreground)] hover:text-blue-500"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lift)}
                          className="text-[var(--color-muted-foreground)] hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </HStack>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}

          {/* Show More/Less */}
          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="w-full"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show {sortedLifts.length - maxVisible} More
                </>
              )}
            </Button>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

LiftTracker.displayName = "LiftTracker";
