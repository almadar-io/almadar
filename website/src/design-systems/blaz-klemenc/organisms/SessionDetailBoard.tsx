/* eslint-disable almadar/organism-extends-entity-display */
/**
 * SessionDetailBoard - Session detail view organism
 *
 * Contains all session detail rendering logic, status handling, and event emission.
 * Used by SessionDetailTemplate as a thin wrapper with declarative event props.
 *
 * Event Props:
 * - editEvent -> emits UI:{editEvent}
 * - startEvent -> emits UI:{startEvent}
 * - completeEvent -> emits UI:{completeEvent}
 * - cancelEvent -> emits UI:{cancelEvent}
 * - deleteEvent -> emits UI:{deleteEvent}
 * - backEvent -> emits UI:{backEvent}
 */

import React from "react";
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
} from "@almadar/ui";

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

/**
 * TrainingSession entity data for the session detail template
 */
export interface TrainingSessionEntity {
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
  /** Related trainer data */
  trainer?: { id: string; name: string; email?: string };
  /** Related participants */
  participants?: ParticipantData[];
  /** Related exercises */
  exercises?: SessionExercise[];
}

export interface SessionDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** TrainingSession entity data */
  entity?: TrainingSessionEntity | TrainingSessionEntity[];
  /** Event name for editing (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for starting session (emitted as UI:{startEvent}) */
  startEvent?: string;
  /** Event name for completing session (emitted as UI:{completeEvent}) */
  completeEvent?: string;
  /** Event name for cancelling session (emitted as UI:{cancelEvent}) */
  cancelEvent?: string;
  /** Event name for deleting session (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for navigating back (emitted as UI:{backEvent}) */
  backEvent?: string;
}

type SessionAction = "START" | "COMPLETE" | "CANCEL";

const statusConfig: Record<
  string,
  {
    labelKey: string;
    color: string;
    icon: typeof Calendar;
    actions: SessionAction[];
  }
> = {
  scheduled: {
    labelKey: "session.statusScheduled",
    color: "bg-blue-500/15 text-blue-600",
    icon: Calendar,
    actions: ["START", "CANCEL"],
  },
  "in-progress": {
    labelKey: "session.statusInProgress",
    color: "bg-amber-500/15 text-amber-600",
    icon: PlayCircle,
    actions: ["COMPLETE", "CANCEL"],
  },
  completed: {
    labelKey: "session.statusCompleted",
    color: "bg-green-500/15 text-green-600",
    icon: CheckCircle2,
    actions: [],
  },
  cancelled: {
    labelKey: "session.statusCancelled",
    color: "bg-red-500/15 text-red-600",
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

export const SessionDetailBoard: React.FC<SessionDetailBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  className,
  editEvent,
  startEvent,
  completeEvent,
  cancelEvent,
  deleteEvent,
  backEvent,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const entityData = Array.isArray(entity) ? entity[0] : entity;

  // Handle back navigation
  const handleBack = () => {
    if (backEvent) {
      emit(`UI:${backEvent}`, { entity: "TrainingSession" });
    }
  };

  // Handle edit
  const handleEdit = () => {
    if (editEvent) {
      emit(`UI:${editEvent}`, { row: entityData, entity: "TrainingSession" });
    }
  };

  // Handle start
  const handleStart = () => {
    if (startEvent) {
      emit(`UI:${startEvent}`, { row: entityData, entity: "TrainingSession" });
    }
  };

  // Handle complete
  const handleComplete = () => {
    if (completeEvent) {
      emit(`UI:${completeEvent}`, { row: entityData, entity: "TrainingSession" });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (cancelEvent) {
      emit(`UI:${cancelEvent}`, { row: entityData, entity: "TrainingSession" });
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteEvent) {
      emit(`UI:${deleteEvent}`, { row: entityData, entity: "TrainingSession" });
    }
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
        <Typography
          variant="body"
          className="text-[var(--color-muted-foreground)]"
        >
          {t('session.loading')}
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
          {t('session.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  // No data state
  if (!entityData || !entityData.title) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("p-6 min-h-[400px]", className)}
      >
        <Calendar className="h-12 w-12 text-[var(--color-muted-foreground)]" />
        <Typography
          variant="h3"
          className="text-[var(--color-muted-foreground)]"
        >
          {t('session.notFound')}
        </Typography>
      </VStack>
    );
  }

  const status = statusConfig[entityData.status || "scheduled"];
  const StatusIcon = status.icon;
  const trainer = entityData.trainer;
  const participants = entityData.participants;
  const exercises = entityData.exercises;

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
              <Typography variant="h1">{entityData.title}</Typography>
              <Badge className={status.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {t(status.labelKey)}
              </Badge>
            </HStack>
            <HStack
              gap="md"
              align="center"
              className="text-[var(--color-muted-foreground)]"
            >
              <HStack gap="xs" align="center">
                <Calendar className="h-4 w-4" />
                <Typography variant="body">
                  {formatDateTime(entityData.scheduledAt)}
                </Typography>
              </HStack>
              <HStack gap="xs" align="center">
                <Clock className="h-4 w-4" />
                <Typography variant="body">
                  {formatDuration(entityData.duration)}
                </Typography>
              </HStack>
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            {t('session.edit')}
          </Button>
          {status.actions.includes("START") && (
            <Button variant="primary" onClick={handleStart}>
              <PlayCircle className="h-4 w-4 mr-1" />
              {t('session.startSession')}
            </Button>
          )}
          {status.actions.includes("COMPLETE") && (
            <Button variant="primary" onClick={handleComplete}>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {t('session.complete')}
            </Button>
          )}
          {status.actions.includes("CANCEL") && (
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-amber-600 hover:text-amber-700"
            >
              <XCircle className="h-4 w-4 mr-1" />
              {t('session.cancel')}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
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
              <Typography variant="h4">{t('session.details')}</Typography>
              <VStack gap="sm">
                <HStack justify="between">
                  <Typography
                    variant="body"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('session.type')}
                  </Typography>
                  <HStack gap="xs" align="center">
                    {entityData.isGroupSession ? (
                      <>
                        <Users className="h-4 w-4 text-blue-500" />
                        <Typography variant="body">
                          {t('session.groupSession', { max: entityData.maxParticipants || t('session.unlimited') })}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 text-green-500" />
                        <Typography variant="body">{t('session.oneOnOne')}</Typography>
                      </>
                    )}
                  </HStack>
                </HStack>
                <HStack justify="between">
                  <Typography
                    variant="body"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('session.duration')}
                  </Typography>
                  <Typography variant="body">
                    {formatDuration(entityData.duration)}
                  </Typography>
                </HStack>
                {entityData.location && (
                  <HStack justify="between">
                    <Typography
                      variant="body"
                      className="text-[var(--color-muted-foreground)]"
                    >
                      {t('session.location')}
                    </Typography>
                    <HStack gap="xs" align="center">
                      <MapPin className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                      <Typography variant="body">
                        {entityData.location}
                      </Typography>
                    </HStack>
                  </HStack>
                )}
                {trainer && (
                  <HStack justify="between">
                    <Typography
                      variant="body"
                      className="text-[var(--color-muted-foreground)]"
                    >
                      {t('session.trainer')}
                    </Typography>
                    <Typography variant="body">{trainer.name}</Typography>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Card>

          {/* Notes */}
          {entityData.notes && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack gap="xs" align="center">
                  <FileText className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="h4">{t('session.notes')}</Typography>
                </HStack>
                <Typography
                  variant="body"
                  className="text-[var(--color-foreground)]"
                >
                  {entityData.notes}
                </Typography>
              </VStack>
            </Card>
          )}

          {/* Video Link */}
          {entityData.youtubeLink && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack gap="xs" align="center">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <Typography variant="h4">{t('session.sessionVideo')}</Typography>
                </HStack>
                <ExerciseVideoLink
                  videoUrl={entityData.youtubeLink}
                  exerciseName={t('session.sessionRecording')}
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
                    <Users className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                    <Typography variant="h4">
                      {t('session.participantsCount', { count: participants.length })}
                    </Typography>
                  </HStack>
                </HStack>
                <VStack gap="sm">
                  {participants.map((participant) => (
                    <HStack
                      key={participant.id}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-[var(--color-border)] last:border-0"
                    >
                      <HStack gap="sm" align="center">
                        <Box
                          display="flex"
                          rounded="full"
                          className="items-center justify-center h-8 w-8 bg-[var(--color-muted)]"
                        >
                          {participant.profileImage ? (
                            <Box
                              as="img"
                              // @ts-expect-error -- Box polymorphic 'as' prop passes src/alt to <img>
                              src={participant.profileImage}
                              alt={participant.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-[var(--color-muted-foreground)]" />
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
                              ? "bg-green-500/15 text-green-600"
                              : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                          }
                          size="sm"
                        >
                          {participant.attended ? t('session.attended') : t('session.absent')}
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
                  <Dumbbell className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="h4">
                    {t('session.exercisesCount', { count: exercises.length })}
                  </Typography>
                </HStack>
                <VStack gap="sm">
                  {exercises.map((exercise, index) => (
                    <HStack
                      key={index}
                      justify="between"
                      align="center"
                      className="py-2 border-b border-[var(--color-border)] last:border-0"
                    >
                      <Typography variant="body">{exercise.name}</Typography>
                      <Typography
                        variant="small"
                        className="text-[var(--color-muted-foreground)]"
                      >
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

SessionDetailBoard.displayName = "SessionDetailBoard";
