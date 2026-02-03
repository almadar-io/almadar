/**
 * SessionDetailTemplate
 *
 * Template for viewing detailed information about a training session.
 * Shows session info, participants, exercises, and video link.
 *
 * Page: SessionDetailPage (derived)
 * Entity: TrainingSession
 * ViewType: detail
 *
 * Event Contract:
 * - Emits: UI:EDIT - edit session
 * - Emits: UI:START - start session
 * - Emits: UI:COMPLETE - complete session
 * - Emits: UI:CANCEL - cancel session
 * - Emits: UI:DELETE - delete session
 * - Emits: UI:BACK - navigate back
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
import { ExerciseVideoLink } from "../atoms/ExerciseVideoLink";
import {
  ArrowLeft,
  Edit,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Calendar,
  Clock,
  Users,
  User,
  Youtube,
  Dumbbell,
  MapPin,
  FileText,
} from "lucide-react";

/**
 * TrainingSession entity data
 */
export interface TrainingSessionData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  scheduledAt: string | Date;
  duration: number;
  youtubeLink?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  notes?: string;
  location?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Participant data
 */
export interface ParticipantData {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
  attended?: boolean;
}

/**
 * Exercise data for the session
 */
export interface SessionExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface SessionDetailTemplateProps {
  /** Session data */
  data?: TrainingSessionData;
  /** Trainer data */
  trainer?: { id: string; name: string; email?: string };
  /** Trainee or participants */
  participants?: ParticipantData[];
  /** Exercises in this session */
  exercises?: SessionExercise[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

type SessionAction = "START" | "COMPLETE" | "CANCEL";

const statusConfig: Record<
  string,
  {
    label: string;
    color: string;
    icon: typeof Calendar;
    actions: SessionAction[];
  }
> = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-100 text-blue-700",
    icon: Calendar,
    actions: ["START", "CANCEL"],
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: PlayCircle,
    actions: ["COMPLETE", "CANCEL"],
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
    actions: [],
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
    actions: [],
  },
};

const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0
    ? `${hours}h ${mins}m`
    : `${hours} hour${hours > 1 ? "s" : ""}`;
};

export const SessionDetailTemplate: React.FC<SessionDetailTemplateProps> = ({
  data,
  trainer,
  participants,
  exercises,
  isLoading = false,
  error = null,
  entity = "TrainingSession",
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

  // Handle start
  const handleStart = useCallback(() => {
    eventBus.emit("UI:START", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle complete
  const handleComplete = useCallback(() => {
    eventBus.emit("UI:COMPLETE", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    eventBus.emit("UI:CANCEL", { row: data, entity });
  }, [eventBus, data, entity]);

  // Handle delete
  const handleDelete = useCallback(() => {
    eventBus.emit("UI:DELETE", { row: data, entity });
  }, [eventBus, data, entity]);

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
          Loading session details...
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
        <Calendar className="h-12 w-12 text-neutral-300" />
        <Typography variant="h3" className="text-neutral-500">
          Session not found
        </Typography>
      </VStack>
    );
  }

  const status = statusConfig[data.status || "scheduled"];
  const StatusIcon = status.icon;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="start" wrap>
        <HStack gap="md" align="center">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Typography variant="h1">{data.title}</Typography>
              <Badge className={status.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </HStack>
            <HStack gap="md" align="center" className="text-neutral-500">
              <HStack gap="xs" align="center">
                <Calendar className="h-4 w-4" />
                <Typography variant="body">
                  {formatDateTime(data.scheduledAt)}
                </Typography>
              </HStack>
              <HStack gap="xs" align="center">
                <Clock className="h-4 w-4" />
                <Typography variant="body">
                  {formatDuration(data.duration)}
                </Typography>
              </HStack>
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {status.actions.includes("START") && (
            <Button variant="primary" onClick={handleStart}>
              <PlayCircle className="h-4 w-4 mr-1" />
              Start Session
            </Button>
          )}
          {status.actions.includes("COMPLETE") && (
            <Button variant="primary" onClick={handleComplete}>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Complete
            </Button>
          )}
          {status.actions.includes("CANCEL") && (
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-amber-600 hover:text-amber-700"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </HStack>
      </HStack>

      {/* Main Content Grid */}
      <HStack gap="lg" wrap className="w-full items-start">
        {/* Left Column - Details */}
        <VStack gap="md" className="flex-1 min-w-[300px]">
          {/* Session Info */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">Session Details</Typography>
              <VStack gap="sm">
                <HStack justify="between">
                  <Typography variant="body" className="text-neutral-500">
                    Type
                  </Typography>
                  <HStack gap="xs" align="center">
                    {data.isGroupSession ? (
                      <>
                        <Users className="h-4 w-4 text-blue-500" />
                        <Typography variant="body">
                          Group Session ({data.maxParticipants || "unlimited"}{" "}
                          max)
                        </Typography>
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 text-green-500" />
                        <Typography variant="body">1-on-1 Session</Typography>
                      </>
                    )}
                  </HStack>
                </HStack>
                <HStack justify="between">
                  <Typography variant="body" className="text-neutral-500">
                    Duration
                  </Typography>
                  <Typography variant="body">
                    {formatDuration(data.duration)}
                  </Typography>
                </HStack>
                {data.location && (
                  <HStack justify="between">
                    <Typography variant="body" className="text-neutral-500">
                      Location
                    </Typography>
                    <HStack gap="xs" align="center">
                      <MapPin className="h-4 w-4 text-neutral-400" />
                      <Typography variant="body">{data.location}</Typography>
                    </HStack>
                  </HStack>
                )}
                {trainer && (
                  <HStack justify="between">
                    <Typography variant="body" className="text-neutral-500">
                      Trainer
                    </Typography>
                    <Typography variant="body">{trainer.name}</Typography>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Card>

          {/* Notes */}
          {data.notes && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack gap="xs" align="center">
                  <FileText className="h-4 w-4 text-neutral-400" />
                  <Typography variant="h4">Notes</Typography>
                </HStack>
                <Typography variant="body" className="text-neutral-600">
                  {data.notes}
                </Typography>
              </VStack>
            </Card>
          )}

          {/* Video Link */}
          {data.youtubeLink && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack gap="xs" align="center">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <Typography variant="h4">Session Video</Typography>
                </HStack>
                <ExerciseVideoLink
                  videoUrl={data.youtubeLink}
                  exerciseName="Session Recording"
                />
              </VStack>
            </Card>
          )}
        </VStack>

        {/* Right Column - Participants & Exercises */}
        <VStack gap="md" className="flex-1 min-w-[300px]">
          {/* Participants */}
          {participants && participants.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <HStack justify="between" align="center">
                  <HStack gap="xs" align="center">
                    <Users className="h-4 w-4 text-neutral-400" />
                    <Typography variant="h4">
                      Participants ({participants.length})
                    </Typography>
                  </HStack>
                </HStack>
                <VStack gap="sm">
                  {participants.map((participant) => (
                    <HStack
                      key={participant.id}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-neutral-100 last:border-0"
                    >
                      <HStack gap="sm" align="center">
                        <Box
                          display="flex"
                          rounded="full"
                          className="items-center justify-center h-8 w-8 bg-neutral-100"
                        >
                          {participant.profileImage ? (
                            <img
                              src={participant.profileImage}
                              alt={participant.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-neutral-400" />
                          )}
                        </Box>
                        <Typography variant="body">
                          {participant.name}
                        </Typography>
                      </HStack>
                      {participant.attended !== undefined && (
                        <Badge
                          className={
                            participant.attended
                              ? "bg-green-100 text-green-700"
                              : "bg-neutral-100 text-neutral-600"
                          }
                          size="sm"
                        >
                          {participant.attended ? "Attended" : "Absent"}
                        </Badge>
                      )}
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}

          {/* Exercises */}
          {exercises && exercises.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <HStack gap="xs" align="center">
                  <Dumbbell className="h-4 w-4 text-neutral-400" />
                  <Typography variant="h4">
                    Exercises ({exercises.length})
                  </Typography>
                </HStack>
                <VStack gap="sm">
                  {exercises.map((exercise, index) => (
                    <HStack
                      key={index}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-neutral-100 last:border-0"
                    >
                      <Typography variant="body">{exercise.name}</Typography>
                      <Typography variant="small" className="text-neutral-500">
                        {exercise.sets}x{exercise.reps}
                        {exercise.weight ? ` @ ${exercise.weight}kg` : ""}
                      </Typography>
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

SessionDetailTemplate.displayName = "SessionDetailTemplate";
