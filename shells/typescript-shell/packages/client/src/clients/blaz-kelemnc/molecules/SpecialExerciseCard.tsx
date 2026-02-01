/**
 * SpecialExerciseCard
 *
 * Display a special exercise prescribed by the trainer, part of progress tracking.
 * Maps to ProgressEntry entity (type: special_exercise) from blaz-klemenc.orb.
 *
 * Entity Fields (ProgressEntry when entryType="special_exercise"):
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - entryType: enum (kinesiology_exam, special_exercise, assessment, milestone)
 * - title: string (required)
 * - description: string
 * - date: date (required)
 * - status: enum (planned, in_progress, completed)
 *
 * Event Contract (matches ProgressManagement trait):
 * - Emits: UI:VIEW - to view exercise details
 * - Emits: UI:EDIT - to edit the exercise
 * - Emits: UI:DELETE - to delete the exercise
 * - Emits: UI:UPDATE_STATUS - to update exercise status
 * - Payload: { row: SpecialExerciseData, entity: "ProgressEntry" }
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
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  PlayCircle,
  User,
} from "lucide-react";

/**
 * Special exercise data (subset of ProgressEntry)
 */
export interface SpecialExerciseData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  entryType: "special_exercise";
  title: string;
  description?: string;
  date: string | Date;
  status: "planned" | "in_progress" | "completed";
  /** Optional video URL for exercise demonstration */
  videoUrl?: string;
  /** Optional repetitions/sets info */
  sets?: number;
  reps?: number;
  /** Optional instructions from trainer */
  instructions?: string;
}

export interface SpecialExerciseCardProps {
  /** Exercise data */
  data: SpecialExerciseData;
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
  planned: {
    label: "Planned",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

// Format date for display
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const SpecialExerciseCard: React.FC<SpecialExerciseCardProps> = ({
  data,
  showActions = true,
  compact = false,
  entity = "ProgressEntry",
  className,
}) => {
  const eventBus = useEventBus();
  const status = statusConfig[data.status];
  const StatusIcon = status.icon;

  // Emit VIEW event (matches ProgressManagement trait)
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit EDIT event (matches ProgressManagement trait)
  const handleEdit = useCallback(() => {
    eventBus.emit("UI:EDIT", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit DELETE event (matches ProgressManagement trait)
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Emit status update
  const handleMarkComplete = useCallback(() => {
    eventBus.emit("UI:SAVE", {
      row: { ...data, status: "completed" },
      entity,
    });
  }, [eventBus, data, entity]);

  const handleStartExercise = useCallback(() => {
    eventBus.emit("UI:SAVE", {
      row: { ...data, status: "in_progress" },
      entity,
    });
  }, [eventBus, data, entity]);

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
              className="items-center justify-center bg-purple-100"
            >
              <Dumbbell className="h-4 w-4 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="label">{data.title}</Typography>
              <Typography variant="small" className="text-neutral-500">
                {formatDate(data.date)}
              </Typography>
            </VStack>
          </HStack>
          <Badge className={status.color} size="sm">
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
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
              className="items-center justify-center bg-purple-100"
            >
              <Dumbbell className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{data.title}</Typography>
              <HStack gap="sm" align="center">
                <Calendar className="h-3 w-3 text-neutral-400" />
                <Typography variant="small" className="text-neutral-500">
                  {formatDate(data.date)}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge className={status.color} size="md">
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </HStack>

        {/* Description */}
        {data.description && (
          <Typography variant="body" className="text-neutral-600">
            {data.description}
          </Typography>
        )}

        {/* Sets/Reps info */}
        {(data.sets || data.reps) && (
          <HStack gap="md">
            {data.sets && (
              <VStack gap="none" align="center">
                <Typography variant="small" className="text-neutral-500">
                  Sets
                </Typography>
                <Typography variant="h4">{data.sets}</Typography>
              </VStack>
            )}
            {data.reps && (
              <VStack gap="none" align="center">
                <Typography variant="small" className="text-neutral-500">
                  Reps
                </Typography>
                <Typography variant="h4">{data.reps}</Typography>
              </VStack>
            )}
          </HStack>
        )}

        {/* Instructions */}
        {data.instructions && (
          <Box padding="sm" rounded="lg" className="bg-neutral-50">
            <VStack gap="xs">
              <Typography variant="small" className="font-medium text-neutral-600">
                Trainer Instructions
              </Typography>
              <Typography variant="body" className="text-neutral-700">
                {data.instructions}
              </Typography>
            </VStack>
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
            {data.status === "planned" && (
              <Button variant="primary" size="sm" onClick={handleStartExercise}>
                <PlayCircle className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            {data.status === "in_progress" && (
              <Button variant="primary" size="sm" onClick={handleMarkComplete}>
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

SpecialExerciseCard.displayName = "SpecialExerciseCard";
