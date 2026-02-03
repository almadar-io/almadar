/**
 * DailyProgressInput
 *
 * Quick daily check-in for wellness metrics: sleep score, hungeriness, tiredness.
 * Daily tracking keeps trainees engaged and provides data for the trainer.
 *
 * Maps to WellnessEntry entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - date: date
 * - sleepScore: number (1-10)
 * - hungeriness: number (1-10)
 * - tiredness: number (1-10)
 *
 * Event Contract (matches WellnessTracking trait):
 * - Emits: UI:ADD_WELLNESS - to add a new wellness entry
 * - Emits: UI:SAVE - to save the entry
 * - Payload: { data: WellnessEntryData, entity: "WellnessEntry" }
 */

import React, { useCallback, useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { Moon, Utensils, Battery, Check, Calendar } from "lucide-react";

/**
 * WellnessEntry entity data matching schema definition
 */
export interface WellnessEntryData {
  id?: string;
  traineeId?: string;
  date: string | Date;
  sleepScore: number;
  hungeriness: number;
  tiredness: number;
}

/** Operation definition for action buttons */
export interface DailyProgressOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export interface DailyProgressInputProps {
  /** Existing entry to edit */
  existingEntry?: WellnessEntryData;
  /** Date for the entry */
  date?: string | Date;
  /** Trainee ID for context */
  traineeId?: string;
  /** Show date selector */
  showDateSelector?: boolean;
  /** Show trends */
  showTrends?: boolean;
  /** Chart type */
  chartType?: "line" | "bar" | string;
  /** Metrics to display */
  metrics?: string[];
  /** Compact mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Operations/actions available */
  operations?: DailyProgressOperation[];
  /** Additional CSS classes */
  className?: string;
}

interface MetricConfig {
  key: keyof Pick<
    WellnessEntryData,
    "sleepScore" | "hungeriness" | "tiredness"
  >;
  label: string;
  icon: typeof Moon;
  lowLabel: string;
  highLabel: string;
  color: string;
  bgColor: string;
}

const metricsConfig: MetricConfig[] = [
  {
    key: "sleepScore",
    label: "Sleep Quality",
    icon: Moon,
    lowLabel: "Poor",
    highLabel: "Excellent",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    key: "hungeriness",
    label: "Hunger Level",
    icon: Utensils,
    lowLabel: "Not Hungry",
    highLabel: "Very Hungry",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    key: "tiredness",
    label: "Energy Level",
    icon: Battery,
    lowLabel: "Exhausted",
    highLabel: "Energized",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
];

// Format date for display
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const DailyProgressInput: React.FC<DailyProgressInputProps> = ({
  existingEntry,
  date = new Date(),
  traineeId,
  showDateSelector = false,
  compact = false,
  entity = "WellnessEntry",
  className,
}) => {
  const eventBus = useEventBus();

  // Initialize values from existing entry or defaults
  const [values, setValues] = useState<
    Pick<WellnessEntryData, "sleepScore" | "hungeriness" | "tiredness">
  >({
    sleepScore: existingEntry?.sleepScore ?? 5,
    hungeriness: existingEntry?.hungeriness ?? 5,
    tiredness: existingEntry?.tiredness ?? 5,
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(date));
  const [hasChanges, setHasChanges] = useState(false);

  // Update a metric value
  const handleValueChange = useCallback(
    (key: keyof typeof values, value: number) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setHasChanges(true);
    },
    [],
  );

  // Emit SAVE event (matches WellnessTracking trait)
  const handleSave = useCallback(() => {
    const entryData: WellnessEntryData = {
      id: existingEntry?.id,
      traineeId,
      date: selectedDate,
      ...values,
    };

    eventBus.emit("UI:SAVE", {
      data: entryData,
      entity,
    });

    setHasChanges(false);
  }, [eventBus, existingEntry, traineeId, selectedDate, values, entity]);

  // Render a single metric slider
  const renderMetricSlider = (config: MetricConfig) => {
    const Icon = config.icon;
    const value = values[config.key];

    if (compact) {
      return (
        <HStack key={config.key} gap="sm" align="center" className="flex-1">
          <Box
            display="flex"
            rounded="full"
            padding="xs"
            className={cn("items-center justify-center", config.bgColor)}
          >
            <Icon className={cn("h-4 w-4", config.color)} />
          </Box>
          <VStack gap="none" className="flex-1">
            <HStack justify="between">
              <Typography variant="small" className="text-neutral-600">
                {config.label}
              </Typography>
              <Typography
                variant="small"
                className={cn("font-semibold", config.color)}
              >
                {value}/10
              </Typography>
            </HStack>
            <input
              type="range"
              min={1}
              max={10}
              value={value}
              onChange={(e) =>
                handleValueChange(config.key, parseInt(e.target.value))
              }
              className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-current"
              style={{ accentColor: "currentColor" }}
            />
          </VStack>
        </HStack>
      );
    }

    return (
      <Box key={config.key} rounded="lg" padding="md" className="bg-neutral-50">
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center">
              <Box
                display="flex"
                rounded="full"
                padding="sm"
                className={cn("items-center justify-center", config.bgColor)}
              >
                <Icon className={cn("h-5 w-5", config.color)} />
              </Box>
              <Typography variant="body" className="font-medium">
                {config.label}
              </Typography>
            </HStack>
            <Typography variant="h4" className={config.color}>
              {value}
            </Typography>
          </HStack>

          <VStack gap="xs">
            <input
              type="range"
              min={1}
              max={10}
              value={value}
              onChange={(e) =>
                handleValueChange(config.key, parseInt(e.target.value))
              }
              className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, currentColor ${(value - 1) * 11.1}%, #e5e7eb ${(value - 1) * 11.1}%)`,
              }}
            />
            <HStack justify="between">
              <Typography variant="small" className="text-neutral-400">
                {config.lowLabel}
              </Typography>
              <Typography variant="small" className="text-neutral-400">
                {config.highLabel}
              </Typography>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    );
  };

  if (compact) {
    return (
      <Card className={cn("p-3", className)}>
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <HStack gap="xs" align="center">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <Typography variant="small" className="text-neutral-600">
                {formatDate(selectedDate)}
              </Typography>
            </HStack>
            {hasChanges && (
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
            )}
          </HStack>
          <VStack gap="sm">{metricsConfig.map(renderMetricSlider)}</VStack>
        </VStack>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <VStack gap="none">
            <Typography variant="h4">Daily Check-in</Typography>
            <HStack gap="xs" align="center">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <Typography variant="small" className="text-neutral-500">
                {formatDate(selectedDate)}
              </Typography>
            </HStack>
          </VStack>
          {showDateSelector && (
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-2 py-1 text-sm border rounded-md"
            />
          )}
        </HStack>

        {/* Metric Sliders */}
        <VStack gap="sm">{metricsConfig.map(renderMetricSlider)}</VStack>

        {/* Save Button */}
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!hasChanges}
          className="w-full"
        >
          <Check className="h-4 w-4 mr-2" />
          {existingEntry ? "Update Entry" : "Save Entry"}
        </Button>
      </VStack>
    </Card>
  );
};

DailyProgressInput.displayName = "DailyProgressInput";
