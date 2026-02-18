/**
 * ScheduleBoard - Weekly schedule/calendar board organism
 *
 * Contains all schedule rendering logic, state management, and event emission.
 * Used by ScheduleTemplate as a thin wrapper with declarative event props.
 *
 * Event Props:
 * - createEvent -> emits UI:{createEvent}
 * - viewEvent -> emits UI:{viewEvent}
 * - daySelectedEvent -> emits UI:{daySelectedEvent}
 * - weekChangeEvent -> emits UI:{weekChangeEvent}
 */

import React, { useState, useMemo } from "react";
import { Plus, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Spinner,
  useEventBus,
  useTranslate,
} from "@almadar/ui";

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
}

/** TrainingSession entity data for the schedule template */
export interface ScheduleEntity {
  /** Session items to display */
  items: readonly TrainingSessionData[];
}

export interface ScheduleBoardProps {
  /** TrainingSession entity data */
  entity: ScheduleEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Initial date to show */
  initialDate?: Date;
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a session (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for viewing a session (emitted as UI:{viewEvent}) */
  viewEvent?: string;
  /** Event name for day selection (emitted as UI:{daySelectedEvent}) */
  daySelectedEvent?: string;
  /** Event name for week navigation (emitted as UI:{weekChangeEvent}) */
  weekChangeEvent?: string;
}

// Days of the week
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Time slots (6am to 9pm)
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6;
  return {
    hour,
    label:
      hour <= 12
        ? `${hour === 12 ? 12 : hour}${hour < 12 ? "am" : "pm"}`
        : `${hour - 12}pm`,
  };
});

// Status colors
const statusColors = {
  scheduled: "bg-blue-500/15 border-blue-500/30 text-blue-600",
  "in-progress": "bg-amber-500/15 border-amber-500/30 text-amber-600",
  completed: "bg-green-500/15 border-green-500/30 text-green-600",
  cancelled: "bg-red-500/15 border-red-500/30 text-red-600",
};

// Get week dates
const getWeekDates = (date: Date): Date[] => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
};

// Format time
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Get session position in calendar
const getSessionPosition = (session: TrainingSessionData, _dayStart: Date) => {
  const sessionDate = new Date(session.scheduledAt);
  const startHour = sessionDate.getHours() + sessionDate.getMinutes() / 60;
  const top = (startHour - 6) * 60; // 60px per hour, starting at 6am
  const height = session.duration; // 1px per minute
  return { top: Math.max(0, top), height: Math.max(30, height) };
};

// Check if day is today
const isToday = (day: Date) => {
  const today = new Date();
  return (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  );
};

export const ScheduleBoard: React.FC<ScheduleBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Schedule",
  initialDate = new Date(),
  className,
  createEvent,
  viewEvent,
  daySelectedEvent,
  weekChangeEvent,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const sessions = entity.items || [];
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  // Get sessions for a specific day
  const getSessionsForDay = (day: Date) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.scheduledAt);
      return (
        sessionDate.getFullYear() === day.getFullYear() &&
        sessionDate.getMonth() === day.getMonth() &&
        sessionDate.getDate() === day.getDate()
      );
    });
  };

  // Handle week navigation
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    if (weekChangeEvent) {
      emit(`UI:${weekChangeEvent}`, { date: newDate, entity: "TrainingSession" });
    }
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    if (weekChangeEvent) {
      emit(`UI:${weekChangeEvent}`, { date: newDate, entity: "TrainingSession" });
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (weekChangeEvent) {
      emit(`UI:${weekChangeEvent}`, { date: today, entity: "TrainingSession" });
    }
  };

  // Handle day selection
  const handleDaySelect = (day: Date) => {
    setSelectedDay(day);
    if (daySelectedEvent) {
      emit(`UI:${daySelectedEvent}`, { date: day, entity: "TrainingSession" });
    }
  };

  // Handle session click
  const handleSessionClick = (session: TrainingSessionData) => {
    if (viewEvent) {
      emit(`UI:${viewEvent}`, { row: session, entity: "TrainingSession" });
    }
  };

  // Handle create at time slot
  const handleCreateAtSlot = (day: Date, hour: number) => {
    const scheduledAt = new Date(day);
    scheduledAt.setHours(hour, 0, 0, 0);
    if (createEvent) {
      emit(`UI:${createEvent}`, { scheduledAt, entity: "TrainingSession" });
    }
  };

  // Format week range
  const weekRange = useMemo(() => {
    const start = weekDates[0];
    const end = weekDates[6];
    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const year = end.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${year}`;
    }
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
  }, [weekDates]);

  return (
    <VStack gap="lg" className={cn("p-6 h-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <VStack gap="xs">
          <Typography variant="h1">{title}</Typography>
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {weekRange}
          </Typography>
        </VStack>

        <HStack gap="sm">
          <Button variant="secondary" size="sm" onClick={handleToday}>
            {t('schedule.today')}
          </Button>
          <HStack gap="xs">
            <Button variant="ghost" size="sm" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </HStack>
          <Button
            variant="primary"
            onClick={() => {
              if (createEvent) {
                emit(`UI:${createEvent}`, { entity: "TrainingSession" });
              }
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('schedule.newSession')}
          </Button>
        </HStack>
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12 flex-1">
          <Spinner size="lg" />
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('schedule.loading')}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12 flex-1">
          <Typography variant="body" className="text-red-500">
            {t('schedule.error', { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Calendar Grid */}
      {!isLoading && !error && (
        <Card className="flex-1 overflow-hidden">
          <VStack gap="none" className="h-full">
            {/* Day Headers */}
            <HStack gap="none" className="border-b border-[var(--color-border)]">
              <Box className="w-16 flex-shrink-0 border-r border-[var(--color-border)]" />
              {weekDates.map((day, index) => (
                <Box
                  key={index}
                  className={cn(
                    "flex-1 py-3 px-2 text-center border-r border-[var(--color-border)] last:border-r-0 cursor-pointer hover:bg-[var(--color-muted)]",
                    isToday(day) && "bg-blue-500/10",
                    selectedDay &&
                      day.getDate() === selectedDay.getDate() &&
                      "bg-blue-500/20"
                  )}
                  onClick={() => handleDaySelect(day)}
                >
                  <Typography
                    variant="small"
                    className={cn(
                      "text-[var(--color-muted-foreground)]",
                      isToday(day) && "text-blue-600 font-medium"
                    )}
                  >
                    {DAYS[index]}
                  </Typography>
                  <Typography
                    variant="body"
                    className={cn(
                      "font-medium",
                      isToday(day) && "text-blue-600"
                    )}
                  >
                    {day.getDate()}
                  </Typography>
                </Box>
              ))}
            </HStack>

            {/* Time Grid */}
            <Box className="flex-1 overflow-auto">
              <Box
                className="relative"
                style={{ minHeight: TIME_SLOTS.length * 60 }}
              >
                {/* Time Labels */}
                <Box className="absolute left-0 top-0 w-16 z-10 bg-[var(--color-card)]">
                  {TIME_SLOTS.map((slot) => (
                    <Box
                      key={slot.hour}
                      className="h-[60px] border-b border-[var(--color-border)] pr-2 flex items-start justify-end pt-1"
                    >
                      <Typography
                        variant="small"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        {slot.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Day Columns */}
                <HStack gap="none" className="ml-16">
                  {weekDates.map((day, dayIndex) => {
                    const daySessions = getSessionsForDay(day);
                    return (
                      <Box
                        key={dayIndex}
                        className="flex-1 relative border-r border-[var(--color-border)] last:border-r-0"
                      >
                        {/* Hour lines */}
                        {TIME_SLOTS.map((slot) => (
                          <Box
                            key={slot.hour}
                            className="h-[60px] border-b border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-muted)]"
                            onClick={() => handleCreateAtSlot(day, slot.hour)}
                          />
                        ))}

                        {/* Sessions */}
                        {daySessions.map((session) => {
                          const { top, height } = getSessionPosition(
                            session,
                            day
                          );
                          const sessionDate = new Date(session.scheduledAt);
                          return (
                            <Box
                              key={session.id}
                              className={cn(
                                "absolute left-1 right-1 rounded px-2 py-1 cursor-pointer border overflow-hidden",
                                statusColors[session.status || "scheduled"]
                              )}
                              style={{ top, height: Math.max(height, 30) }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSessionClick(session);
                              }}
                            >
                              <Typography
                                variant="small"
                                className="font-medium truncate"
                              >
                                {session.title}
                              </Typography>
                              {height >= 45 && (
                                <Typography
                                  variant="small"
                                  className="opacity-75"
                                >
                                  {formatTime(sessionDate)}
                                </Typography>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
            </Box>
          </VStack>
        </Card>
      )}

      {/* Legend */}
      <HStack gap="md" justify="center">
        <HStack gap="xs" align="center">
          <Box className="w-3 h-3 rounded bg-blue-500/15 border border-blue-500/30" />
          <Typography
            variant="small"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('schedule.scheduled')}
          </Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Box className="w-3 h-3 rounded bg-amber-500/15 border border-amber-500/30" />
          <Typography
            variant="small"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('schedule.inProgress')}
          </Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Box className="w-3 h-3 rounded bg-green-500/15 border border-green-500/30" />
          <Typography
            variant="small"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('schedule.completed')}
          </Typography>
        </HStack>
      </HStack>
    </VStack>
  );
};

ScheduleBoard.displayName = "ScheduleBoard";
