/**
 * FitnessTemplate
 *
 * Template for the Fitness/Lift tracking page (/fitness).
 * Displays Lift entities with exercise tracking and wellness input.
 *
 * Page: FitnessTrackingPage
 * Entity: Lift
 * ViewType: dashboard
 * Trait: LiftManagement
 *
 * Event Contract:
 * - Emits: UI:LOG_LIFT - log a new lift
 * - Emits: UI:VIEW - view lift details
 * - Emits: UI:EDIT - edit lift
 * - Emits: UI:DELETE - delete lift
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import { LiftTracker, LiftData } from "../molecules/LiftTracker";
import { DailyProgressInput } from "../molecules/DailyProgressInput";
import { ProgressChart, ChartDataPoint } from "../molecules/ProgressChart";
import {
  Plus,
  Search,
  Dumbbell,
  TrendingUp,
  Calendar,
  Activity,
  LayoutGrid,
  List,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export interface FitnessTemplateProps {
  /** Lift items to display */
  items?: readonly LiftData[];
  /** Data prop alias */
  data?: readonly LiftData[];
  /** Progress chart data */
  progressData?: ChartDataPoint[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Show wellness input */
  showWellnessInput?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const LiftCard: React.FC<{
  lift: LiftData;
  onAction: (action: string, lift: LiftData) => void;
}> = ({ lift, onAction }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className="items-center justify-center bg-blue-100"
            >
              <Dumbbell className="h-4 w-4 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {lift.exerciseName}
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                {formatDate(lift.date)}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant="default" size="md">
            {lift.weight} kg
          </Badge>
        </HStack>

        {/* Stats */}
        <HStack gap="md">
          <VStack gap="none" align="center" className="flex-1">
            <Typography variant="h3">{lift.sets}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Sets
            </Typography>
          </VStack>
          <VStack gap="none" align="center" className="flex-1">
            <Typography variant="h3">{lift.reps}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Reps
            </Typography>
          </VStack>
          <VStack gap="none" align="center" className="flex-1">
            <Typography variant="h3">{lift.sets * lift.reps}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Total
            </Typography>
          </VStack>
        </HStack>

        {/* Notes */}
        {lift.notes && (
          <Typography variant="small" className="text-neutral-600 line-clamp-2">
            {lift.notes}
          </Typography>
        )}

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", lift)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", lift)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("DELETE", lift)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const FitnessTemplate: React.FC<FitnessTemplateProps> = ({
  items,
  data,
  progressData,
  isLoading = false,
  error = null,
  title = "Fitness Tracking",
  subtitle = "Track lifts and monitor progress",
  showHeader = true,
  showSearch = true,
  showWellnessInput = true,
  entity = "Lift",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const lifts = items || data || [];

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      eventBus.emit("UI:SEARCH", { searchTerm: value, entity });
    },
    [eventBus, entity],
  );

  // Handle create
  const handleLogLift = useCallback(() => {
    eventBus.emit("UI:LOG_LIFT", { entity });
  }, [eventBus, entity]);

  // Handle lift actions
  const handleAction = useCallback(
    (action: string, lift: LiftData) => {
      eventBus.emit(`UI:${action}`, { row: lift, entity });
    },
    [eventBus, entity],
  );

  // Filter lifts
  const filteredLifts = lifts.filter((lift) => {
    return (
      !searchTerm ||
      lift.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate stats
  const totalLifts = lifts.length;
  const totalVolume = lifts.reduce(
    (sum, l) => sum + l.weight * l.sets * l.reps,
    0,
  );
  const uniqueExercises = new Set(lifts.map((l) => l.exerciseName)).size;

  // Group by exercise for quick stats
  const exerciseStats = lifts.reduce(
    (acc, lift) => {
      if (!acc[lift.exerciseName]) {
        acc[lift.exerciseName] = { count: 0, maxWeight: 0 };
      }
      acc[lift.exerciseName].count++;
      acc[lift.exerciseName].maxWeight = Math.max(
        acc[lift.exerciseName].maxWeight,
        lift.weight,
      );
      return acc;
    },
    {} as Record<string, { count: number; maxWeight: number }>,
  );

  // Top exercises
  const topExercises = Object.entries(exerciseStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleLogLift} className="gap-2">
            <Plus className="h-4 w-4" />
            Log Lift
          </Button>
        </HStack>
      )}

      {/* Stats Row */}
      <HStack gap="md" wrap>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <Dumbbell className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{totalLifts}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Total Lifts
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <VStack gap="none">
              <Typography variant="h3">
                {(totalVolume / 1000).toFixed(1)}k
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                Total Volume (kg)
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <Activity className="h-5 w-5 text-purple-500" />
            <VStack gap="none">
              <Typography variant="h3">{uniqueExercises}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Exercises
              </Typography>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      {/* Main Content */}
      <HStack gap="lg" wrap className="w-full items-start">
        {/* Left Column - Lifts */}
        <VStack gap="md" className="flex-[2] min-w-[300px]">
          {/* Toolbar */}
          <HStack justify="between" align="center" wrap gap="sm">
            {showSearch && (
              <Box className="w-full max-w-sm">
                <Input
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
                />
              </Box>
            )}

            <HStack gap="xs">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </HStack>
          </HStack>

          {/* Loading State */}
          {isLoading && (
            <VStack align="center" justify="center" className="py-12">
              <Spinner size="lg" />
              <Typography variant="body" className="text-neutral-500">
                Loading lifts...
              </Typography>
            </VStack>
          )}

          {/* Error State */}
          {error && (
            <VStack align="center" justify="center" className="py-12">
              <Typography variant="body" className="text-red-500">
                Error: {error.message}
              </Typography>
            </VStack>
          )}

          {/* Lifts Grid/List */}
          {!isLoading && !error && (
            <>
              {filteredLifts.length === 0 ? (
                <VStack align="center" justify="center" className="py-12">
                  <Dumbbell className="h-12 w-12 text-neutral-300" />
                  <Typography variant="h3" className="text-neutral-500">
                    No lifts recorded
                  </Typography>
                  <Typography variant="body" className="text-neutral-400">
                    {searchTerm
                      ? "Try a different search term"
                      : "Log your first lift to get started"}
                  </Typography>
                </VStack>
              ) : (
                <Box
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : "flex flex-col gap-3"
                  }
                >
                  {filteredLifts.map((lift) => (
                    <LiftCard
                      key={lift.id}
                      lift={lift}
                      onAction={handleAction}
                    />
                  ))}
                </Box>
              )}
            </>
          )}
        </VStack>

        {/* Right Column - Sidebar */}
        <VStack gap="md" className="flex-1 min-w-[280px]">
          {/* Wellness Input */}
          {showWellnessInput && <DailyProgressInput entity="WellnessEntry" />}

          {/* Progress Chart */}
          {progressData && progressData.length > 0 && (
            <Card className="p-4">
              <ProgressChart
                data={progressData}
                metric="Progress"
                chartType="line"
              />
            </Card>
          )}

          {/* Top Exercises */}
          {topExercises.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <Typography variant="h4">Top Exercises</Typography>
                <VStack gap="sm">
                  {topExercises.map(([name, stats]) => (
                    <HStack
                      key={name}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-neutral-100 last:border-0"
                    >
                      <VStack gap="none">
                        <Typography variant="body">{name}</Typography>
                        <Typography
                          variant="small"
                          className="text-neutral-500"
                        >
                          {stats.count} times
                        </Typography>
                      </VStack>
                      <Badge variant="default">{stats.maxWeight} kg max</Badge>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

FitnessTemplate.displayName = "FitnessTemplate";
