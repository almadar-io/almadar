/* eslint-disable almadar/organism-extends-entity-display */
/**
 * TraineeDetailBoard - Organism for viewing detailed trainee information
 *
 * Contains all logic, state handling, and UI for the trainee detail view.
 * Accepts declarative event props for flattener compliance.
 *
 * Event props emitted via useEventBus():
 * - editEvent -> UI:{editEvent}
 * - deleteEvent -> UI:{deleteEvent}
 * - backEvent -> UI:{backEvent}
 * - viewLiftsEvent -> UI:{viewLiftsEvent}
 * - viewSessionsEvent -> UI:{viewSessionsEvent}
 */

import React from "react";
import { CreditMeter, CreditData } from "../atoms/CreditMeter";
import { ProgressChart, ChartDataPoint } from "../molecules/ProgressChart";
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  Dumbbell,
  GraduationCap,
  Activity,
  TrendingUp,
  Award,
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
 * Trainee stats for display
 */
export interface TraineeStats {
  totalLifts: number;
  totalSessions: number;
  avgWellnessScore: number;
  currentStreak: number;
  milestonesAchieved: number;
}

/**
 * User entity data for the trainee detail view
 */
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "trainee";
  phone?: string;
  profileImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  /** Related stats data */
  stats?: TraineeStats;
  /** Related credit data */
  creditData?: CreditData;
  /** Related progress chart data */
  progressData?: ChartDataPoint[];
}

export interface TraineeDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** User entity data */
  entity?: UserEntity | UserEntity[];
  /** Event name for editing (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for deleting (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for back navigation (emitted as UI:{backEvent}) */
  backEvent?: string;
  /** Event name for viewing lifts (emitted as UI:{viewLiftsEvent}) */
  viewLiftsEvent?: string;
  /** Event name for viewing sessions (emitted as UI:{viewSessionsEvent}) */
  viewSessionsEvent?: string;
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

export const TraineeDetailBoard: React.FC<TraineeDetailBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  className,
  editEvent,
  deleteEvent,
  backEvent,
  viewLiftsEvent,
  viewSessionsEvent,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const entityData = Array.isArray(entity) ? entity[0] : entity;

  // Handle back navigation
  const handleBack = () => {
    if (backEvent) emit(`UI:${backEvent}`, { entity: "User" });
  };

  // Handle edit
  const handleEdit = () => {
    if (editEvent) emit(`UI:${editEvent}`, { row: entityData, entity: "User" });
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteEvent) emit(`UI:${deleteEvent}`, { row: entityData, entity: "User" });
  };

  // Handle view lifts
  const handleViewLifts = () => {
    if (viewLiftsEvent) emit(`UI:${viewLiftsEvent}`, { traineeId: entityData?.id, entity: "Lift" });
  };

  // Handle view sessions
  const handleViewSessions = () => {
    if (viewSessionsEvent) emit(`UI:${viewSessionsEvent}`, {
      traineeId: entityData?.id,
      entity: "TrainingSession",
    });
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
          {t('trainee.loading')}
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
          {t('trainee.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  // No data state
  if (!entityData || !entityData.name) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <User className="h-12 w-12 text-[var(--color-muted-foreground)]" />
        <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
          {t('trainee.notFound')}
        </Typography>
      </VStack>
    );
  }

  const isTrainee = entityData.role === "trainee";
  const RoleIcon = isTrainee ? Dumbbell : GraduationCap;
  const stats = entityData.stats;
  const creditData = entityData.creditData;
  const progressData = entityData.progressData;

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
            rounded="full"
            className="items-center justify-center h-16 w-16 bg-[var(--color-muted)]"
          >
            {entityData.profileImage ? (
              <Box
                as="img"
                // @ts-expect-error -- Box polymorphic 'as' prop passes src/alt to <img>
                src={entityData.profileImage}
                alt={entityData.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-[var(--color-muted-foreground)]" />
            )}
          </Box>
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Typography variant="h1">{entityData.name}</Typography>
              <Badge
                className={
                  isTrainee
                    ? "bg-green-500/15 text-green-600"
                    : "bg-blue-500/15 text-blue-600"
                }
              >
                <RoleIcon className="h-3 w-3 mr-1" />
                {entityData.role}
              </Badge>
            </HStack>
            <HStack gap="md" align="center" className="text-[var(--color-muted-foreground)]">
              <HStack gap="xs" align="center">
                <Mail className="h-4 w-4" />
                <Typography variant="body">{entityData.email}</Typography>
              </HStack>
              {entityData.phone && (
                <HStack gap="xs" align="center">
                  <Phone className="h-4 w-4" />
                  <Typography variant="body">{entityData.phone}</Typography>
                </HStack>
              )}
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            {t('trainee.edit')}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {t('trainee.delete')}
          </Button>
        </HStack>
      </HStack>

      {/* Info Cards */}
      <HStack gap="lg" wrap className="w-full">
        {/* Profile Info */}
        <Card className="p-4 flex-1 min-w-[300px]">
          <VStack gap="md">
            <Typography variant="h4">{t('trainee.profileInfo')}</Typography>
            <VStack gap="sm">
              <HStack justify="between">
                <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.email')}
                </Typography>
                <Typography variant="body">{entityData.email}</Typography>
              </HStack>
              {entityData.phone && (
                <HStack justify="between">
                  <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                    {t('trainee.phone')}
                  </Typography>
                  <Typography variant="body">{entityData.phone}</Typography>
                </HStack>
              )}
              <HStack justify="between">
                <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.role')}
                </Typography>
                <Typography variant="body" className="capitalize">
                  {entityData.role}
                </Typography>
              </HStack>
              {entityData.createdAt && (
                <HStack justify="between">
                  <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                    {t('trainee.joined')}
                  </Typography>
                  <Typography variant="body">
                    {formatDate(entityData.createdAt)}
                  </Typography>
                </HStack>
              )}
            </VStack>
          </VStack>
        </Card>

        {/* Credits (for trainees) */}
        {isTrainee && creditData && (
          <Box className="flex-1 min-w-[300px]">
            <CreditMeter entity={creditData} size="lg" showActionButton={true} />
          </Box>
        )}
      </HStack>

      {/* Stats (for trainees) */}
      {isTrainee && stats && (
        <VStack gap="md">
          <Typography variant="h3">{t('trainee.performanceStats')}</Typography>
          <HStack gap="md" wrap>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Dumbbell className="h-6 w-6 text-blue-500" />
                <Typography variant="h2">{stats.totalLifts}</Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.totalLifts')}
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Calendar className="h-6 w-6 text-green-500" />
                <Typography variant="h2">{stats.totalSessions}</Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.sessions')}
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Activity className="h-6 w-6 text-purple-500" />
                <Typography variant="h2">
                  {stats.avgWellnessScore.toFixed(1)}
                </Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.avgWellness')}
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <Typography variant="h2">{stats.currentStreak}</Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.dayStreak')}
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Award className="h-6 w-6 text-yellow-500" />
                <Typography variant="h2">{stats.milestonesAchieved}</Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('trainee.milestones')}
                </Typography>
              </VStack>
            </Card>
          </HStack>
        </VStack>
      )}

      {/* Progress Chart (for trainees) */}
      {isTrainee && progressData && progressData.length > 0 && (
        <Card className="p-4">
          <ProgressChart
            entity={progressData}
            metric="Progress Over Time"
            chartType="line"
            showDateSelector={true}
          />
        </Card>
      )}

      {/* Quick Actions */}
      {isTrainee && (
        <HStack gap="md">
          <Button variant="secondary" onClick={handleViewLifts}>
            <Dumbbell className="h-4 w-4 mr-1" />
            {t('trainee.viewLifts')}
          </Button>
          <Button variant="secondary" onClick={handleViewSessions}>
            <Calendar className="h-4 w-4 mr-1" />
            {t('trainee.viewSessions')}
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

TraineeDetailBoard.displayName = "TraineeDetailBoard";
