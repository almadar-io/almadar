/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus, almadar/organism-no-data-state */
/**
 * FitnessBoard - Organism for the Fitness/Lift tracking board
 *
 * Contains all logic, state, filtering, computed stats, and sub-components
 * previously in FitnessTemplate. Accepts declarative event prop strings
 * so the parent template can wire up specific event names.
 *
 * Events Emitted (via string props):
 * - UI:{logLiftEvent} - Log a new lift
 * - UI:{viewEvent} - View lift details
 * - UI:{editEvent} - Edit lift
 * - UI:{deleteEvent} - Delete lift
 * - UI:{searchEvent} - Search exercises
 */

import React, { useState } from "react";
import { LiftTracker, LiftData } from "../molecules/LiftTracker";
import { DailyProgressInput } from "../molecules/DailyProgressInput";
import { ProgressChart, ChartDataPoint } from "../molecules/ProgressChart";
import {
  Plus,
  Search,
  Dumbbell,
  TrendingUp,
  Activity,
  LayoutGrid,
  List,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Card,
  Badge,
  Spinner,
  LoadingState,
  ErrorState,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';

/** Lift entity data for the fitness board */
export interface LiftEntity {
  /** Lift items to display */
  items: readonly LiftData[];
  /** Progress chart data */
  progressData?: ChartDataPoint[];
}

export interface FitnessBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** Lift entity data */
  entity?: LiftEntity | LiftEntity[];
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
  /** Event name for logging a lift (emitted as UI:{logLiftEvent}) */
  logLiftEvent?: string;
  /** Event name for viewing a lift (emitted as UI:{viewEvent}) */
  viewEvent?: string;
  /** Event name for editing a lift (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for deleting a lift (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for searching (emitted as UI:{searchEvent}) */
  searchEvent?: string;
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
  viewEvent?: string;
  editEvent?: string;
  deleteEvent?: string;
}> = ({ lift, viewEvent, editEvent, deleteEvent }) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

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
              className="items-center justify-center bg-blue-500/15"
            >
              <Dumbbell className="h-4 w-4 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {lift.exerciseName}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('fitness.sets')}
            </Typography>
          </VStack>
          <VStack gap="none" align="center" className="flex-1">
            <Typography variant="h3">{lift.reps}</Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('fitness.reps')}
            </Typography>
          </VStack>
          <VStack gap="none" align="center" className="flex-1">
            <Typography variant="h3">{lift.sets * lift.reps}</Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('fitness.total')}
            </Typography>
          </VStack>
        </HStack>

        {/* Notes */}
        {lift.notes && (
          <Typography variant="small" className="text-[var(--color-foreground)] line-clamp-2">
            {lift.notes}
          </Typography>
        )}

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${viewEvent}`, { row: lift, entity: "Lift" })}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t('fitness.view')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${editEvent}`, { row: lift, entity: "Lift" })}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            {t('fitness.edit')}
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${deleteEvent}`, { row: lift, entity: "Lift" })}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const FitnessBoard: React.FC<FitnessBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Fitness Tracking",
  subtitle = "Track lifts and monitor progress",
  showHeader = true,
  showSearch = true,
  showWellnessInput = true,
  className,
  logLiftEvent = "LOG_LIFT",
  viewEvent = "VIEW",
  editEvent = "EDIT",
  deleteEvent = "DELETE",
  searchEvent = "SEARCH",
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const entityData = Array.isArray(entity) ? entity[0] : entity;
  const lifts = entityData?.items || [];
  const progressData = entityData?.progressData;

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    emit(`UI:${searchEvent}`, { searchTerm: value, entity: "Lift" });
  };

  // Handle create
  const handleLogLift = () => {
    emit(`UI:${logLiftEvent}`, { entity: "Lift" });
  };

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
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleLogLift} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('fitness.logLift')}
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('fitness.totalLifts')}
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('fitness.totalVolume')}
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <Activity className="h-5 w-5 text-purple-500" />
            <VStack gap="none">
              <Typography variant="h3">{uniqueExercises}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('fitness.exercises')}
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
                  placeholder={t('fitness.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
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
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t('fitness.loading')}
              </Typography>
            </VStack>
          )}

          {/* Error State */}
          {error && (
            <VStack align="center" justify="center" className="py-12">
              <Typography variant="body" className="text-red-500">
                {t('fitness.error', { message: error.message })}
              </Typography>
            </VStack>
          )}

          {/* Lifts Grid/List */}
          {!isLoading && !error && (
            <>
              {filteredLifts.length === 0 ? (
                <VStack align="center" justify="center" className="py-12">
                  <Dumbbell className="h-12 w-12 text-[var(--color-muted-foreground)]" />
                  <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                    {t('fitness.noLiftsRecorded')}
                  </Typography>
                  <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                    {searchTerm
                      ? t('fitness.tryDifferentSearch')
                      : t('fitness.logFirstLift')}
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
                      viewEvent={viewEvent}
                      editEvent={editEvent}
                      deleteEvent={deleteEvent}
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
          {showWellnessInput && <DailyProgressInput />}

          {/* Progress Chart */}
          {progressData && progressData.length > 0 && (
            <Card className="p-4">
              <ProgressChart
                entity={progressData}
                metric="Progress"
                chartType="line"
              />
            </Card>
          )}

          {/* Top Exercises */}
          {topExercises.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <Typography variant="h4">{t('fitness.topExercises')}</Typography>
                <VStack gap="sm">
                  {topExercises.map(([name, stats]) => (
                    <HStack
                      key={name}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-[var(--color-border)] last:border-0"
                    >
                      <VStack gap="none">
                        <Typography variant="body">{name}</Typography>
                        <Typography
                          variant="small"
                          className="text-[var(--color-muted-foreground)]"
                        >
                          {t('fitness.times', { count: stats.count })}
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

FitnessBoard.displayName = "FitnessBoard";
