/**
 * WorkoutPlanCard
 *
 * Display a workout plan with exercises, sets, and scheduled session info.
 * Combines TrainingSession and Lift entities for comprehensive workout view.
 *
 * Maps to TrainingSession entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - title: string (required, max 200)
 * - scheduledAt: timestamp (required)
 * - duration: number (required, minutes)
 * - youtubeLink: string (optional)
 * - status: enum (scheduled, in-progress, completed, cancelled)
 * - isGroupSession: boolean
 * - maxParticipants: number
 *
 * Event Contract (matches TrainingSessionManagement trait):
 * - Emits: UI:VIEW - to view workout details
 * - Emits: UI:EDIT - to edit the workout plan
 * - Emits: UI:START - to start the session
 * - Emits: UI:COMPLETE - to mark session as completed
 * - Emits: UI:DELETE - to delete the workout
 * - Payload: { row: WorkoutPlanData, entity: "TrainingSession" }
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
  Dumbbell,
  Calendar,
  Clock,
  Eye,
  Edit2,
  PlayCircle,
  CheckCircle2,
  Trash2,
  Youtube,
  Users,
  User,
  ListChecks,
} from "lucide-react";

/**
 * Exercise within a workout plan
 */
export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
  completed?: boolean;
}

/**
 * Workout plan data (extends TrainingSession)
 */
export interface WorkoutPlanData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  scheduledAt: string | Date;
  duration: number;
  youtubeLink?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  /** Exercises in this workout */
  exercises?: WorkoutExercise[];
  /** Notes from trainer */
  notes?: string;
}

export interface WorkoutPlanCardProps {
  /** Workout plan data */
  data: WorkoutPlanData;
  /** Show exercises list */
  showExercises?: boolean;
  /** Show action buttons */
  showActions?: boolean;
  /** Compact display mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Status configuration
const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-100 text-blue-700",
    icon: Calendar,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
  },
};

// Format date for display
const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

// Format duration
const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({
  data,
  showExercises = true,
  showActions = true,
  compact = false,
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();
  const status = statusConfig[data.status || "scheduled"];
  const StatusIcon = status.icon;
  const exerciseCount = data.exercises?.length || 0;
  const completedExercises = data.exercises?.filter((e) => e.completed).length || 0;

  // Emit VIEW event (matches TrainingSessionManagement trait)
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit EDIT event
  const handleEdit = useCallback(() => {
    eventBus.emit("UI:EDIT", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit START event
  const handleStart = useCallback(() => {
    eventBus.emit("UI:START", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit COMPLETE event
  const handleComplete = useCallback(() => {
    eventBus.emit("UI:COMPLETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit DELETE event
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle YouTube click
  const handleYouTube = useCallback(() => {
    if (data.youtubeLink) {
      window.open(data.youtubeLink, "_blank");
    }
  }, [data.youtubeLink]);

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
              className="items-center justify-center bg-indigo-100"
            >
              <Dumbbell className="h-4 w-4 text-indigo-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="label">{data.title}</Typography>
              <HStack gap="sm" align="center">
                <Typography variant="small" className="text-neutral-500">
                  {formatDateTime(data.scheduledAt)}
                </Typography>
                <Typography variant="small" className="text-neutral-400">
                  {formatDuration(data.duration)}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <HStack gap="sm" align="center">
            {exerciseCount > 0 && (
              <Badge variant="default" size="sm">
                {exerciseCount} exercises
              </Badge>
            )}
            <Badge className={status.color} size="sm">
              <StatusIcon className="h-3 w-3" />
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
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-indigo-100"
            >
              <Dumbbell className="h-5 w-5 text-indigo-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{data.title}</Typography>
              <HStack gap="sm" align="center">
                <Calendar className="h-3 w-3 text-neutral-400" />
                <Typography variant="small" className="text-neutral-500">
                  {formatDateTime(data.scheduledAt)}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge className={status.color} size="md">
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </HStack>

        {/* Workout Info */}
        <HStack gap="lg" className="py-2">
          <HStack gap="xs" align="center">
            <Clock className="h-4 w-4 text-neutral-400" />
            <Typography variant="body">{formatDuration(data.duration)}</Typography>
          </HStack>
          {data.isGroupSession ? (
            <HStack gap="xs" align="center">
              <Users className="h-4 w-4 text-neutral-400" />
              <Typography variant="body">
                Group ({data.maxParticipants || "unlimited"})
              </Typography>
            </HStack>
          ) : (
            <HStack gap="xs" align="center">
              <User className="h-4 w-4 text-neutral-400" />
              <Typography variant="body">1-on-1</Typography>
            </HStack>
          )}
          {exerciseCount > 0 && (
            <HStack gap="xs" align="center">
              <ListChecks className="h-4 w-4 text-neutral-400" />
              <Typography variant="body">
                {completedExercises}/{exerciseCount} exercises
              </Typography>
            </HStack>
          )}
        </HStack>

        {/* Exercises List */}
        {showExercises && data.exercises && data.exercises.length > 0 && (
          <VStack gap="sm" className="bg-neutral-50 rounded-lg p-3">
            <Typography variant="label" className="text-neutral-600">
              Exercises
            </Typography>
            {data.exercises.slice(0, 5).map((exercise, index) => (
              <HStack key={index} justify="between" align="center" className="py-1">
                <HStack gap="sm" align="center">
                  {exercise.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Box className="h-4 w-4 rounded-full border-2 border-neutral-300" />
                  )}
                  <Typography
                    variant="body"
                    className={exercise.completed ? "line-through text-neutral-400" : ""}
                  >
                    {exercise.name}
                  </Typography>
                </HStack>
                <Typography variant="small" className="text-neutral-500">
                  {exercise.sets}×{exercise.reps}
                  {exercise.weight ? ` @ ${exercise.weight}kg` : ""}
                </Typography>
              </HStack>
            ))}
            {data.exercises.length > 5 && (
              <Typography variant="small" className="text-neutral-500">
                +{data.exercises.length - 5} more exercises
              </Typography>
            )}
          </VStack>
        )}

        {/* Notes */}
        {data.notes && (
          <Box padding="sm" rounded="lg" className="bg-neutral-50">
            <Typography variant="small" className="text-neutral-600">
              {data.notes}
            </Typography>
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
            {data.youtubeLink && (
              <Button variant="ghost" size="sm" onClick={handleYouTube}>
                <Youtube className="h-4 w-4 text-red-500" />
              </Button>
            )}
            {data.status === "scheduled" && (
              <Button variant="primary" size="sm" onClick={handleStart}>
                <PlayCircle className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            {data.status === "in-progress" && (
              <Button variant="primary" size="sm" onClick={handleComplete}>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Complete
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

WorkoutPlanCard.displayName = "WorkoutPlanCard";
