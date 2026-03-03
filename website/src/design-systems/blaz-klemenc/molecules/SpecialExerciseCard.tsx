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
  /** Exercise entity */
  entity: SpecialExerciseData;
  /** Show action buttons */
  showActions?: boolean;
  /** Compact display mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Status configuration
const statusConfig = {
  planned: {
    label: "Planned",
    color: "bg-blue-500/15 text-blue-600",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-500/15 text-amber-600",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500/15 text-green-600",
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
  entity,
  showActions = true,
  compact = false,
  className,
}) => {
  const eventBus = useEventBus();
  const status = statusConfig[entity.status];
  const StatusIcon = status.icon;

  // Emit VIEW event (matches ProgressManagement trait)
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: entity, entity: "ProgressEntry" });
  }, [eventBus, entity]);

  // Emit EDIT event (matches ProgressManagement trait)
  const handleEdit = useCallback(() => {
    eventBus.emit("UI:EDIT", { row: entity, entity: "ProgressEntry" });
  }, [eventBus, entity]);

  // Emit DELETE event (matches ProgressManagement trait)
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: entity, entity: "ProgressEntry" });
  }, [eventBus, entity]);

  // Emit status update
  const handleMarkComplete = useCallback(() => {
    eventBus.emit("UI:SAVE", {
      row: { ...entity, status: "completed" },
      entity: "ProgressEntry",
    });
  }, [eventBus, entity]);

  const handleStartExercise = useCallback(() => {
    eventBus.emit("UI:SAVE", {
      row: { ...entity, status: "in_progress" },
      entity: "ProgressEntry",
    });
  }, [eventBus, entity]);

  if (compact) {
    return (
      <Card
        className={cn("p-3 cursor-pointer hover:bg-[var(--color-muted)]", className)}
        onClick={handleView}
      >
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className="items-center justify-center bg-purple-500/15"
            >
              <Dumbbell className="h-4 w-4 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="label">{entity.title}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {formatDate(entity.date)}
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
              className="items-center justify-center bg-purple-500/15"
            >
              <Dumbbell className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{entity.title}</Typography>
              <HStack gap="sm" align="center">
                <Calendar className="h-3 w-3 text-[var(--color-muted-foreground)]" />
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {formatDate(entity.date)}
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
        {entity.description && (
          <Typography variant="body" className="text-[var(--color-foreground)]">
            {entity.description}
          </Typography>
        )}

        {/* Sets/Reps info */}
        {(entity.sets || entity.reps) && (
          <HStack gap="md">
            {entity.sets && (
              <VStack gap="none" align="center">
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  Sets
                </Typography>
                <Typography variant="h4">{entity.sets}</Typography>
              </VStack>
            )}
            {entity.reps && (
              <VStack gap="none" align="center">
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  Reps
                </Typography>
                <Typography variant="h4">{entity.reps}</Typography>
              </VStack>
            )}
          </HStack>
        )}

        {/* Instructions */}
        {entity.instructions && (
          <Box padding="sm" rounded="lg" className="bg-[var(--color-muted)]">
            <VStack gap="xs">
              <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
                Trainer Instructions
              </Typography>
              <Typography variant="body" className="text-[var(--color-foreground)]">
                {entity.instructions}
              </Typography>
            </VStack>
          </Box>
        )}

        {/* Action Buttons */}
        {showActions && (
          <HStack gap="sm" className="border-t border-[var(--color-border)] pt-3">
            <Button variant="secondary" size="sm" onClick={handleView}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            {entity.status === "planned" && (
              <Button variant="primary" size="sm" onClick={handleStartExercise}>
                <PlayCircle className="h-4 w-4 mr-1" />
                Start
              </Button>
            )}
            {entity.status === "in_progress" && (
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
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
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
