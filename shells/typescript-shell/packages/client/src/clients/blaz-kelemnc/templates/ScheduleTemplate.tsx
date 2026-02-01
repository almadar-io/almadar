/**
 * ScheduleTemplate
 *
 * Template for the weekly schedule/calendar view of training sessions.
 * Displays sessions in a calendar format with day/week navigation.
 *
 * Page: SchedulePage (derived from TrainingSessionsPage)
 * Entity: TrainingSession
 * ViewType: calendar
 *
 * Event Contract:
 * - Emits: UI:CREATE - create new session at time slot
 * - Emits: UI:VIEW - view session details
 * - Emits: UI:DAY_SELECTED - when a day is selected
 * - Emits: UI:WEEK_CHANGE - when week navigation happens
 */

import React, { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  User,
  PlayCircle,
  CheckCircle2,
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
}

export interface ScheduleTemplateProps {
  /** Session items to display */
  items?: readonly TrainingSessionData[];
  /** Data prop alias */
  data?: readonly TrainingSessionData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Initial date to show */
  initialDate?: Date;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Days of the week
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Time slots (6am to 9pm)
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6;
  return {
    hour,
    label: hour <= 12 ? `${hour === 12 ? 12 : hour}${hour < 12 ? "am" : "pm"}` : `${hour - 12}pm`,
  };
});

// Status colors
const statusColors = {
  scheduled: "bg-blue-100 border-blue-300 text-blue-700",
  "in-progress": "bg-amber-100 border-amber-300 text-amber-700",
  completed: "bg-green-100 border-green-300 text-green-700",
  cancelled: "bg-red-100 border-red-300 text-red-700",
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
const getSessionPosition = (session: TrainingSessionData, dayStart: Date) => {
  const sessionDate = new Date(session.scheduledAt);
  const startHour = sessionDate.getHours() + sessionDate.getMinutes() / 60;
  const top = (startHour - 6) * 60; // 60px per hour, starting at 6am
  const height = session.duration; // 1px per minute
  return { top: Math.max(0, top), height: Math.max(30, height) };
};

export const ScheduleTemplate: React.FC<ScheduleTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Schedule",
  initialDate = new Date(),
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const sessions = items || data || [];
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  // Get sessions for a specific day
  const getSessionsForDay = useCallback(
    (day: Date) => {
      return sessions.filter((session) => {
        const sessionDate = new Date(session.scheduledAt);
        return (
          sessionDate.getFullYear() === day.getFullYear() &&
          sessionDate.getMonth() === day.getMonth() &&
          sessionDate.getDate() === day.getDate()
        );
      });
    },
    [sessions]
  );

  // Handle week navigation
  const handlePrevWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    eventBus.emit("UI:WEEK_CHANGE", { date: newDate, entity });
  }, [currentDate, eventBus, entity]);

  const handleNextWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    eventBus.emit("UI:WEEK_CHANGE", { date: newDate, entity });
  }, [currentDate, eventBus, entity]);

  const handleToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    eventBus.emit("UI:WEEK_CHANGE", { date: today, entity });
  }, [eventBus, entity]);

  // Handle day selection
  const handleDaySelect = useCallback(
    (day: Date) => {
      setSelectedDay(day);
      eventBus.emit("UI:DAY_SELECTED", { date: day, entity });
    },
    [eventBus, entity]
  );

  // Handle session click
  const handleSessionClick = useCallback(
    (session: TrainingSessionData) => {
      eventBus.emit("UI:VIEW", { row: session, entity });
    },
    [eventBus, entity]
  );

  // Handle create at time slot
  const handleCreateAtSlot = useCallback(
    (day: Date, hour: number) => {
      const scheduledAt = new Date(day);
      scheduledAt.setHours(hour, 0, 0, 0);
      eventBus.emit("UI:CREATE", { scheduledAt, entity });
    },
    [eventBus, entity]
  );

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

  // Check if day is today
  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    );
  };

  return (
    <VStack gap="lg" className={cn("p-6 h-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <VStack gap="xs">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body" className="text-neutral-500">
            {weekRange}
          </Typography>
        </VStack>

        <HStack gap="sm">
          <Button variant="secondary" size="sm" onClick={handleToday}>
            Today
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
            onClick={() => eventBus.emit("UI:CREATE", { entity })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </HStack>
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12 flex-1">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading schedule...
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12 flex-1">
          <Typography variant="body" className="text-red-500">
            Error: {error.message}
          </Typography>
        </VStack>
      )}

      {/* Calendar Grid */}
      {!isLoading && !error && (
        <Card className="flex-1 overflow-hidden">
          <VStack gap="none" className="h-full">
            {/* Day Headers */}
            <HStack gap="none" className="border-b border-neutral-200">
              <Box className="w-16 flex-shrink-0 border-r border-neutral-200" />
              {weekDates.map((day, index) => (
                <Box
                  key={index}
                  className={cn(
                    "flex-1 py-3 px-2 text-center border-r border-neutral-200 last:border-r-0 cursor-pointer hover:bg-neutral-50",
                    isToday(day) && "bg-blue-50",
                    selectedDay &&
                      day.getDate() === selectedDay.getDate() &&
                      "bg-blue-100"
                  )}
                  onClick={() => handleDaySelect(day)}
                >
                  <Typography
                    variant="small"
                    className={cn(
                      "text-neutral-500",
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
              <Box className="relative" style={{ minHeight: TIME_SLOTS.length * 60 }}>
                {/* Time Labels */}
                <Box className="absolute left-0 top-0 w-16 z-10 bg-white">
                  {TIME_SLOTS.map((slot) => (
                    <Box
                      key={slot.hour}
                      className="h-[60px] border-b border-neutral-100 pr-2 flex items-start justify-end pt-1"
                    >
                      <Typography variant="small" className="text-neutral-400">
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
                        className="flex-1 relative border-r border-neutral-200 last:border-r-0"
                      >
                        {/* Hour lines */}
                        {TIME_SLOTS.map((slot) => (
                          <Box
                            key={slot.hour}
                            className="h-[60px] border-b border-neutral-100 cursor-pointer hover:bg-neutral-50"
                            onClick={() => handleCreateAtSlot(day, slot.hour)}
                          />
                        ))}

                        {/* Sessions */}
                        {daySessions.map((session) => {
                          const { top, height } = getSessionPosition(session, day);
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
                                <Typography variant="small" className="opacity-75">
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
          <Box className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
          <Typography variant="small" className="text-neutral-500">
            Scheduled
          </Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Box className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
          <Typography variant="small" className="text-neutral-500">
            In Progress
          </Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <Box className="w-3 h-3 rounded bg-green-100 border border-green-300" />
          <Typography variant="small" className="text-neutral-500">
            Completed
          </Typography>
        </HStack>
      </HStack>
    </VStack>
  );
};

ScheduleTemplate.displayName = "ScheduleTemplate";
