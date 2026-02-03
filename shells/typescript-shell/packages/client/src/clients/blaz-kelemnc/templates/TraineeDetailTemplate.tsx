/**
 * TraineeDetailTemplate
 *
 * Template for viewing detailed information about a trainee.
 * Displays trainee profile with their lifts, wellness, progress, and sessions.
 *
 * Page: UserDetailPage (not explicitly in schema, derived)
 * Entity: User
 * ViewType: detail
 *
 * Event Contract:
 * - Emits: UI:EDIT - edit user
 * - Emits: UI:DELETE - delete user
 * - Emits: UI:BACK - navigate back
 * - Emits: UI:VIEW_LIFTS - view trainee's lifts
 * - Emits: UI:VIEW_SESSIONS - view trainee's sessions
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
  CreditCard,
  TrendingUp,
  Award,
} from "lucide-react";

/**
 * User entity data
 */
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "trainee";
  phone?: string;
  profileImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

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

export interface TraineeDetailTemplateProps {
  /** Trainee data */
  data?: UserData;
  /** Trainee stats */
  stats?: TraineeStats;
  /** Credit data */
  creditData?: CreditData;
  /** Progress chart data */
  progressData?: ChartDataPoint[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
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

export const TraineeDetailTemplate: React.FC<TraineeDetailTemplateProps> = ({
  data,
  stats,
  creditData,
  progressData,
  isLoading = false,
  error = null,
  entity = "User",
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

  // Handle view lifts
  const handleViewLifts = useCallback(() => {
    eventBus.emit("UI:VIEW_LIFTS", { traineeId: data?.id, entity: "Lift" });
  }, [eventBus, data]);

  // Handle view sessions
  const handleViewSessions = useCallback(() => {
    eventBus.emit("UI:VIEW_SESSIONS", {
      traineeId: data?.id,
      entity: "TrainingSession",
    });
  }, [eventBus, data]);

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
          Loading trainee details...
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
        <User className="h-12 w-12 text-neutral-300" />
        <Typography variant="h3" className="text-neutral-500">
          Trainee not found
        </Typography>
      </VStack>
    );
  }

  const isTrainee = data.role === "trainee";
  const RoleIcon = isTrainee ? Dumbbell : GraduationCap;

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
            className="items-center justify-center h-16 w-16 bg-neutral-100"
          >
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-neutral-400" />
            )}
          </Box>
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Typography variant="h1">{data.name}</Typography>
              <Badge
                className={
                  isTrainee
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }
              >
                <RoleIcon className="h-3 w-3 mr-1" />
                {data.role}
              </Badge>
            </HStack>
            <HStack gap="md" align="center" className="text-neutral-500">
              <HStack gap="xs" align="center">
                <Mail className="h-4 w-4" />
                <Typography variant="body">{data.email}</Typography>
              </HStack>
              {data.phone && (
                <HStack gap="xs" align="center">
                  <Phone className="h-4 w-4" />
                  <Typography variant="body">{data.phone}</Typography>
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
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </HStack>
      </HStack>

      {/* Info Cards */}
      <HStack gap="lg" wrap className="w-full">
        {/* Profile Info */}
        <Card className="p-4 flex-1 min-w-[300px]">
          <VStack gap="md">
            <Typography variant="h4">Profile Information</Typography>
            <VStack gap="sm">
              <HStack justify="between">
                <Typography variant="body" className="text-neutral-500">
                  Email
                </Typography>
                <Typography variant="body">{data.email}</Typography>
              </HStack>
              {data.phone && (
                <HStack justify="between">
                  <Typography variant="body" className="text-neutral-500">
                    Phone
                  </Typography>
                  <Typography variant="body">{data.phone}</Typography>
                </HStack>
              )}
              <HStack justify="between">
                <Typography variant="body" className="text-neutral-500">
                  Role
                </Typography>
                <Typography variant="body" className="capitalize">
                  {data.role}
                </Typography>
              </HStack>
              {data.createdAt && (
                <HStack justify="between">
                  <Typography variant="body" className="text-neutral-500">
                    Joined
                  </Typography>
                  <Typography variant="body">
                    {formatDate(data.createdAt)}
                  </Typography>
                </HStack>
              )}
            </VStack>
          </VStack>
        </Card>

        {/* Credits (for trainees) */}
        {isTrainee && creditData && (
          <Box className="flex-1 min-w-[300px]">
            <CreditMeter data={creditData} size="lg" showActionButton={true} />
          </Box>
        )}
      </HStack>

      {/* Stats (for trainees) */}
      {isTrainee && stats && (
        <VStack gap="md">
          <Typography variant="h3">Performance Stats</Typography>
          <HStack gap="md" wrap>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Dumbbell className="h-6 w-6 text-blue-500" />
                <Typography variant="h2">{stats.totalLifts}</Typography>
                <Typography variant="small" className="text-neutral-500">
                  Total Lifts
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Calendar className="h-6 w-6 text-green-500" />
                <Typography variant="h2">{stats.totalSessions}</Typography>
                <Typography variant="small" className="text-neutral-500">
                  Sessions
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Activity className="h-6 w-6 text-purple-500" />
                <Typography variant="h2">
                  {stats.avgWellnessScore.toFixed(1)}
                </Typography>
                <Typography variant="small" className="text-neutral-500">
                  Avg Wellness
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <Typography variant="h2">{stats.currentStreak}</Typography>
                <Typography variant="small" className="text-neutral-500">
                  Day Streak
                </Typography>
              </VStack>
            </Card>
            <Card className="p-4 flex-1 min-w-[150px]">
              <VStack gap="xs" align="center">
                <Award className="h-6 w-6 text-yellow-500" />
                <Typography variant="h2">{stats.milestonesAchieved}</Typography>
                <Typography variant="small" className="text-neutral-500">
                  Milestones
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
            data={progressData}
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
            View Lifts
          </Button>
          <Button variant="secondary" onClick={handleViewSessions}>
            <Calendar className="h-4 w-4 mr-1" />
            View Sessions
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

TraineeDetailTemplate.displayName = "TraineeDetailTemplate";
