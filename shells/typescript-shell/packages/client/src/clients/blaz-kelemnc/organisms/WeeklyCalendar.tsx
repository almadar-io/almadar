/**
 * WeeklyCalendar
 *
 * Week view calendar with session slots and events.
 * Trainer needs week-at-a-glance for scheduling.
 *
 * Event Contract:
 * - Emits: UI:DAY_SELECTED - when a day is clicked
 * - Emits: UI:WEEK_CHANGE - when navigating weeks
 * - Emits: UI:SLOT_CLICK - when a time slot is clicked
 * - Payload: { date, events, entity }
 */

import React, { useCallback, useMemo, useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import { ChevronLeft, ChevronRight, Calendar, Users, User } from "lucide-react";

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string | Date;
  endTime?: string | Date;
  type?: "personal" | "group" | "break";
  traineeId?: string;
  traineeName?: string;
  color?: string;
}

export interface WeeklyCalendarProps {
  /** Start of week to display */
  weekStart?: Date;
  /** Current week data */
  currentWeek?: unknown;
  /** Events to display */
  events?: CalendarEvent[];
  /** Sessions data */
  sessions?: unknown;
  /** Working hours start (24h format) */
  workingHoursStart?: number;
  /** Working hours end (24h format) */
  workingHoursEnd?: number;
  /** Slot duration in minutes */
  slotDuration?: number;
  /** Show trainee info */
  showTraineeInfo?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Get start of week (Monday)
const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Get week days from start date
const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  return days;
};

// Generate time slots for a day
const generateTimeSlots = (
  start: number,
  end: number,
  durationMinutes: number,
): string[] => {
  const slots: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += durationMinutes) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(timeStr);
    }
  }
  return slots;
};

// Check if an event falls within a time slot
const eventInSlot = (
  event: CalendarEvent,
  day: Date,
  slotTime: string,
): boolean => {
  const eventStart = new Date(event.startTime);
  const [slotHour, slotMinute] = slotTime.split(":").map(Number);

  return (
    eventStart.toDateString() === day.toDateString() &&
    eventStart.getHours() === slotHour &&
    eventStart.getMinutes() === slotMinute
  );
};

// Event type colors
const eventTypeColors = {
  personal: "bg-blue-100 border-blue-300 text-blue-700",
  group: "bg-purple-100 border-purple-300 text-purple-700",
  break: "bg-neutral-100 border-neutral-300 text-neutral-600",
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  weekStart,
  events = [],
  workingHoursStart = 8,
  workingHoursEnd = 20,
  slotDuration = 60,
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    weekStart ? getStartOfWeek(weekStart) : getStartOfWeek(new Date()),
  );

  const weekDays = useMemo(
    () => getWeekDays(currentWeekStart),
    [currentWeekStart],
  );
  const timeSlots = useMemo(
    () => generateTimeSlots(workingHoursStart, workingHoursEnd, slotDuration),
    [workingHoursStart, workingHoursEnd, slotDuration],
  );

  // Navigate weeks
  const handlePrevWeek = useCallback(() => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      eventBus.emit("UI:WEEK_CHANGE", {
        weekStart: newDate,
        direction: "prev",
      });
      return newDate;
    });
  }, [eventBus]);

  const handleNextWeek = useCallback(() => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      eventBus.emit("UI:WEEK_CHANGE", {
        weekStart: newDate,
        direction: "next",
      });
      return newDate;
    });
  }, [eventBus]);

  const handleToday = useCallback(() => {
    const today = getStartOfWeek(new Date());
    setCurrentWeekStart(today);
    eventBus.emit("UI:WEEK_CHANGE", { weekStart: today, direction: "today" });
  }, [eventBus]);

  // Handle day click
  const handleDayClick = useCallback(
    (day: Date) => {
      const dayEvents = events.filter(
        (e) => new Date(e.startTime).toDateString() === day.toDateString(),
      );
      eventBus.emit("UI:DAY_SELECTED", {
        date: day,
        events: dayEvents,
        entity,
      });
    },
    [eventBus, events, entity],
  );

  // Handle slot click
  const handleSlotClick = useCallback(
    (day: Date, time: string) => {
      const slotDate = new Date(day);
      const [hour, minute] = time.split(":").map(Number);
      slotDate.setHours(hour, minute, 0, 0);
      eventBus.emit("UI:SLOT_CLICK", { date: slotDate, entity });
    },
    [eventBus, entity],
  );

  // Render event in slot
  const renderEvent = (event: CalendarEvent) => {
    const typeColors = eventTypeColors[event.type || "personal"];
    const Icon = event.type === "group" ? Users : User;

    return (
      <Box
        key={event.id}
        rounded="md"
        padding="xs"
        border
        className={cn(
          "cursor-pointer hover:shadow-sm transition-shadow text-xs truncate",
          typeColors,
        )}
        onClick={(e) => {
          e.stopPropagation();
          eventBus.emit("UI:VIEW", { row: event, entity });
        }}
      >
        <HStack gap="xs" align="center">
          <Icon className="h-3 w-3 flex-shrink-0" />
          <Typography variant="small" className="truncate font-medium">
            {event.title}
          </Typography>
        </HStack>
        {event.traineeName && (
          <Typography variant="small" className="truncate opacity-75">
            {event.traineeName}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Card className={cn("p-4 overflow-hidden", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Calendar className="h-5 w-5 text-blue-600" />
            <Typography variant="h4">
              {currentWeekStart.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </HStack>
          <HStack gap="sm">
            <Button variant="ghost" size="sm" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </HStack>
        </HStack>

        {/* Calendar Grid */}
        <Box className="overflow-x-auto">
          <Box className="min-w-[800px]">
            {/* Day Headers */}
            <Box className="grid grid-cols-8 border-b">
              <Box className="p-2" /> {/* Time column */}
              {weekDays.map((day) => {
                const isToday =
                  day.toDateString() === new Date().toDateString();
                const dayEvents = events.filter(
                  (e) =>
                    new Date(e.startTime).toDateString() === day.toDateString(),
                );

                return (
                  <Box
                    key={day.toISOString()}
                    className={cn(
                      "p-2 text-center cursor-pointer hover:bg-neutral-50 border-l",
                      isToday && "bg-blue-50",
                    )}
                    onClick={() => handleDayClick(day)}
                  >
                    <Typography
                      variant="small"
                      className={cn(
                        "font-medium",
                        isToday ? "text-blue-600" : "text-neutral-500",
                      )}
                    >
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </Typography>
                    <Box
                      display="flex"
                      rounded="full"
                      className={cn(
                        "h-8 w-8 mx-auto items-center justify-center",
                        isToday && "bg-blue-600 text-white",
                      )}
                    >
                      <Typography variant="body" className="font-semibold">
                        {day.getDate()}
                      </Typography>
                    </Box>
                    {dayEvents.length > 0 && (
                      <Badge variant="default" size="sm" className="mt-1">
                        {dayEvents.length}
                      </Badge>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Time Slots */}
            <Box className="max-h-[500px] overflow-y-auto">
              {timeSlots.map((time) => (
                <Box key={time} className="grid grid-cols-8 border-b">
                  {/* Time label */}
                  <Box className="p-2 text-right pr-3">
                    <Typography variant="small" className="text-neutral-400">
                      {time}
                    </Typography>
                  </Box>

                  {/* Day cells */}
                  {weekDays.map((day) => {
                    const slotEvents = events.filter((e) =>
                      eventInSlot(e, day, time),
                    );
                    const isToday =
                      day.toDateString() === new Date().toDateString();

                    return (
                      <Box
                        key={`${day.toISOString()}-${time}`}
                        className={cn(
                          "p-1 min-h-[60px] border-l cursor-pointer hover:bg-neutral-50 transition-colors",
                          isToday && "bg-blue-50/30",
                        )}
                        onClick={() => handleSlotClick(day, time)}
                      >
                        <VStack gap="xs">{slotEvents.map(renderEvent)}</VStack>
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Legend */}
        <HStack gap="md" justify="center" className="border-t pt-3">
          <HStack gap="xs" align="center">
            <Box className="h-3 w-3 rounded bg-blue-100 border border-blue-300" />
            <Typography variant="small" className="text-neutral-600">
              Personal
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Box className="h-3 w-3 rounded bg-purple-100 border border-purple-300" />
            <Typography variant="small" className="text-neutral-600">
              Group
            </Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Box className="h-3 w-3 rounded bg-neutral-100 border border-neutral-300" />
            <Typography variant="small" className="text-neutral-600">
              Break
            </Typography>
          </HStack>
        </HStack>
      </VStack>
    </Card>
  );
};

WeeklyCalendar.displayName = "WeeklyCalendar";
