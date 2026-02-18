/**
 * SessionScheduler
 *
 * Calendar-based session booking with time slot selection and session management.
 * Primary interaction for booking training sessions - key user flow.
 *
 * Maps to TrainingSession entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - title: string (3-100 chars)
 * - description: string (max 500)
 * - scheduledAt: timestamp
 * - duration: number (15-480 minutes)
 * - youtubeLink: string (YouTube URL pattern)
 * - status: enum (scheduled | in-progress | completed | cancelled)
 * - isGroupSession: boolean
 * - maxParticipants: number (1-20)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 *
 * Event Contract (matches TrainingSessionManagement trait):
 * - Emits: UI:CREATE - to schedule a new session
 * - Emits: UI:VIEW - to view session details
 * - Emits: UI:EDIT - to edit a session
 * - Emits: UI:CANCEL - to cancel a session
 * - Emits: UI:START - to start a session
 * - Emits: UI:COMPLETE - to mark session as completed
 * - Payload: { row: TrainingSessionData, entity: "TrainingSession" }
 */

import React, { useCallback, useMemo, useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Play,
  CheckCircle,
  XCircle,
  Eye,
  Edit2,
  Youtube,
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
  useTranslate,
} from '@almadar/ui';

/**
 * TrainingSession entity data matching schema definition
 */
export interface TrainingSessionData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  description?: string;
  scheduledAt: string | Date;
  duration: number;
  youtubeLink?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TimeSlot {
  date: Date;
  time: string;
  available: boolean;
}

/** Operation definition for action buttons */
export interface SessionOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  hidden?: (string | number | undefined)[];
}

export interface SessionSchedulerProps {
  /** Already booked sessions to display */
  sessions?: TrainingSessionData[] | unknown;
  /** Available time slots (optional - for booking mode) */
  availableSlots?: TimeSlot[];
  /** Trainees list */
  trainees?: unknown[];
  /** Trainee ID for booking context */
  traineeId?: string;
  /** Trainer ID for booking context */
  trainerId?: string;
  /** Start date of displayed week */
  weekStartDate?: Date;
  /** Show booking mode (available slots) */
  bookingMode?: boolean;
  /** Default view mode */
  defaultView?: "week" | "month" | "day" | string;
  /** Show trainee info */
  showTraineeInfo?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Entity context for events */
  entity?: string;
  /** Operations/actions available */
  operations?: SessionOperation[];
  /** Additional CSS classes */
  className?: string;
}

// Status configuration
const statusConfig = {
  scheduled: {
    color: "text-blue-600",
    bgColor: "bg-blue-500/15",
    labelKey: "schedule.statusScheduled",
    icon: Calendar,
  },
  "in-progress": {
    color: "text-amber-600",
    bgColor: "bg-amber-500/15",
    labelKey: "schedule.statusInProgress",
    icon: Play,
  },
  completed: {
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/15",
    labelKey: "schedule.statusCompleted",
    icon: CheckCircle,
  },
  cancelled: {
    color: "text-red-600",
    bgColor: "bg-red-500/15",
    labelKey: "schedule.statusCancelled",
    icon: XCircle,
  },
};

// Get week days starting from a date
const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  return days;
};

// Format time for display
const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Format date for display
const formatDayDate = (
  date: Date,
): { day: string; date: string; isToday: boolean } => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.getDate().toString(),
    isToday,
  };
};

// Get start of week (Monday)
const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Group sessions by date
const groupSessionsByDate = (
  sessions: TrainingSessionData[],
): Map<string, TrainingSessionData[]> => {
  const grouped = new Map<string, TrainingSessionData[]>();
  sessions.forEach((session) => {
    const dateKey = new Date(session.scheduledAt).toDateString();
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(session);
  });
  return grouped;
};

export const SessionScheduler: React.FC<SessionSchedulerProps> = ({
  sessions,
  availableSlots = [],
  traineeId,
  trainerId,
  weekStartDate,
  bookingMode = false,
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();

  // Week navigation state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    weekStartDate ? getStartOfWeek(weekStartDate) : getStartOfWeek(new Date()),
  );

  // Normalize sessions to array
  const sessionData: TrainingSessionData[] = Array.isArray(sessions)
    ? (sessions as TrainingSessionData[])
    : [];

  const weekDays = useMemo(
    () => getWeekDays(currentWeekStart),
    [currentWeekStart],
  );
  const sessionsByDate = useMemo(
    () => groupSessionsByDate(sessionData),
    [sessionData],
  );

  // Navigate to previous week
  const handlePrevWeek = useCallback(() => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  }, []);

  // Navigate to next week
  const handleNextWeek = useCallback(() => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  }, []);

  // Go to today
  const handleToday = useCallback(() => {
    setCurrentWeekStart(getStartOfWeek(new Date()));
  }, []);

  // Emit CREATE event (matches TrainingSessionManagement trait)
  const handleCreate = useCallback(
    (date?: Date) => {
      eventBus.emit("UI:CREATE", {
        traineeId,
        trainerId,
        scheduledAt: date,
        entity,
      });
    },
    [eventBus, traineeId, trainerId, entity],
  );

  // Emit VIEW event
  const handleView = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:VIEW", { row: session, entity });
    },
    [eventBus, entity],
  );

  // Emit EDIT event
  const handleEdit = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:EDIT", { row: session, entity });
    },
    [eventBus, entity],
  );

  // Emit CANCEL event
  const handleCancel = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:CANCEL", { row: session, entity });
    },
    [eventBus, entity],
  );

  // Emit START event
  const handleStart = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:START", { row: session, entity });
    },
    [eventBus, entity],
  );

  // Emit COMPLETE event
  const handleComplete = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:COMPLETE", { row: session, entity });
    },
    [eventBus, entity],
  );

  // Render a single session card
  const renderSessionCard = (session: TrainingSessionData) => {
    const status = session.status || "scheduled";
    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
      <Box
        key={session.id}
        rounded="lg"
        padding="sm"
        border
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow bg-[var(--color-card)]",
          status === "cancelled" && "opacity-60",
        )}
        onClick={() => handleView(session)}
      >
        <VStack gap="xs">
          <HStack justify="between" align="start">
            <VStack gap="none" className="flex-1 min-w-0">
              <Typography
                variant="label"
                className={cn(
                  "truncate",
                  status === "cancelled" && "line-through",
                )}
              >
                {session.title}
              </Typography>
              <HStack gap="xs" align="center">
                <Clock className="h-3 w-3 text-[var(--color-muted-foreground)]" />
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {formatTime(session.scheduledAt)} ({session.duration}min)
                </Typography>
              </HStack>
            </VStack>
            <Badge variant="default" size="sm" className={config.bgColor}>
              <StatusIcon className={cn("h-3 w-3", config.color)} />
            </Badge>
          </HStack>

          {/* Session indicators */}
          <HStack gap="xs">
            {session.isGroupSession && (
              <Badge variant="default" size="sm">
                <Users className="h-3 w-3 mr-1" />
                {t('schedule.group')}
              </Badge>
            )}
            {session.youtubeLink && (
              <Badge variant="default" size="sm">
                <Youtube className="h-3 w-3 text-red-500" />
              </Badge>
            )}
          </HStack>

          {/* Quick actions */}
          {status === "scheduled" && (
            <HStack gap="xs" className="mt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(session);
                }}
                className="text-emerald-600 hover:bg-emerald-500/10"
              >
                <Play className="h-3 w-3 mr-1" />
                {t('schedule.start')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(session);
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(session);
                }}
                className="text-red-500 hover:bg-red-500/10"
              >
                <XCircle className="h-3 w-3" />
              </Button>
            </HStack>
          )}

          {status === "in-progress" && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleComplete(session);
              }}
              className="w-full mt-1"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              {t('schedule.complete')}
            </Button>
          )}
        </VStack>
      </Box>
    );
  };

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
              className="items-center justify-center bg-blue-500/15"
            >
              <Calendar className="h-5 w-5 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{t('schedule.title')}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {currentWeekStart.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </VStack>
          </HStack>
          <HStack gap="sm">
            <Button variant="ghost" size="sm" onClick={handleToday}>
              {t('schedule.today')}
            </Button>
            <Button variant="primary" size="sm" onClick={() => handleCreate()}>
              <Plus className="h-4 w-4 mr-1" />
              {t('schedule.schedule')}
            </Button>
          </HStack>
        </HStack>

        {/* Week Navigation */}
        <HStack justify="between" align="center">
          <Button variant="ghost" size="sm" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Typography variant="body" className="font-medium">
            {t('schedule.weekOf', { date: currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }) })}
          </Typography>
          <Button variant="ghost" size="sm" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </HStack>

        {/* Week Grid */}
        <Box className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const { day: dayName, date, isToday } = formatDayDate(day);
            const daySessions = sessionsByDate.get(day.toDateString()) || [];
            const activeSessions = daySessions.filter(
              (s) => s.status !== "cancelled",
            );

            return (
              <VStack
                key={day.toISOString()}
                gap="xs"
                className={cn(
                  "min-h-[120px] p-2 rounded-lg border",
                  isToday
                    ? "bg-blue-500/10 border-blue-500/25"
                    : "bg-[var(--color-muted)] border-[var(--color-border)]",
                )}
              >
                {/* Day Header */}
                <VStack gap="none" align="center">
                  <Typography
                    variant="small"
                    className={cn(
                      "font-medium",
                      isToday ? "text-blue-600" : "text-[var(--color-muted-foreground)]",
                    )}
                  >
                    {dayName}
                  </Typography>
                  <Box
                    display="flex"
                    rounded="full"
                    className={cn(
                      "h-7 w-7 items-center justify-center",
                      isToday ? "bg-blue-600 text-white" : "",
                    )}
                  >
                    <Typography
                      variant="body"
                      className={cn("font-semibold", isToday && "text-white")}
                    >
                      {date}
                    </Typography>
                  </Box>
                </VStack>

                {/* Sessions for this day */}
                <VStack gap="xs" className="flex-1 w-full">
                  {activeSessions.slice(0, 2).map(renderSessionCard)}
                  {activeSessions.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        // Could open a modal with all sessions for this day
                        eventBus.emit("UI:VIEW_DAY", {
                          date: day,
                          sessions: activeSessions,
                        });
                      }}
                    >
                      {t('schedule.moreCount', { count: activeSessions.length - 2 })}
                    </Button>
                  )}
                  {activeSessions.length === 0 && (
                    <Box
                      className="flex-1 flex items-center justify-center cursor-pointer hover:bg-[var(--color-card)] rounded"
                      onClick={() => handleCreate(day)}
                    >
                      <Plus className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                    </Box>
                  )}
                </VStack>
              </VStack>
            );
          })}
        </Box>

        {/* Upcoming Sessions Summary */}
        {sessionData.filter(
          (s: TrainingSessionData) => s.status === "scheduled",
        ).length > 0 && (
          <VStack gap="sm">
            <Typography variant="label" className="text-[var(--color-foreground)]">
              {t('schedule.upcomingSessions')}
            </Typography>
            <VStack gap="xs">
              {sessionData
                .filter((s: TrainingSessionData) => s.status === "scheduled")
                .sort(
                  (a: TrainingSessionData, b: TrainingSessionData) =>
                    new Date(a.scheduledAt).getTime() -
                    new Date(b.scheduledAt).getTime(),
                )
                .slice(0, 3)
                .map((session: TrainingSessionData) => (
                  <Box
                    key={session.id}
                    rounded="lg"
                    padding="sm"
                    border
                    className="bg-[var(--color-card)] cursor-pointer hover:bg-[var(--color-muted)]"
                    onClick={() => handleView(session)}
                  >
                    <HStack justify="between" align="center">
                      <HStack gap="sm" align="center">
                        <Box
                          display="flex"
                          rounded="full"
                          padding="xs"
                          className="items-center justify-center bg-blue-500/15"
                        >
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </Box>
                        <VStack gap="none">
                          <Typography variant="body" className="font-medium">
                            {session.title}
                          </Typography>
                          <Typography
                            variant="small"
                            className="text-[var(--color-muted-foreground)]"
                          >
                            {new Date(session.scheduledAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              },
                            )}
                          </Typography>
                        </VStack>
                      </HStack>
                      <HStack gap="xs">
                        {session.isGroupSession && (
                          <Badge variant="default" size="sm">
                            <Users className="h-3 w-3" />
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};

SessionScheduler.displayName = "SessionScheduler";
