/**
 * BodyMeasurementInput
 *
 * Input component for recording body measurements as part of progress tracking.
 * Used within kinesiology exams or standalone measurements.
 *
 * Maps to ProgressEntry entity (type: assessment) from blaz-klemenc.orb,
 * but stores measurements as structured data.
 *
 * Event Contract:
 * - Emits: UI:SAVE - when measurements are submitted
 * - Emits: UI:CANCEL - when input is cancelled
 * - Payload: { row: BodyMeasurementData, entity: "ProgressEntry" }
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Input } from "../../../components/atoms/Input";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Ruler,
  Scale,
  Activity,
  Save,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

/**
 * Body measurement data
 */
export interface BodyMeasurementData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  date: string | Date;
  /** Weight in kg */
  weight?: number;
  /** Height in cm */
  height?: number;
  /** Body fat percentage */
  bodyFat?: number;
  /** Muscle mass in kg */
  muscleMass?: number;
  /** Chest measurement in cm */
  chest?: number;
  /** Waist measurement in cm */
  waist?: number;
  /** Hips measurement in cm */
  hips?: number;
  /** Left arm circumference in cm */
  leftArm?: number;
  /** Right arm circumference in cm */
  rightArm?: number;
  /** Left thigh circumference in cm */
  leftThigh?: number;
  /** Right thigh circumference in cm */
  rightThigh?: number;
  /** Notes from trainer */
  notes?: string;
}

export interface BodyMeasurementInputProps {
  /** Initial data (for editing) */
  initialData?: Partial<BodyMeasurementData>;
  /** Previous measurements for comparison */
  previousData?: Partial<BodyMeasurementData>;
  /** Show comparison with previous */
  showComparison?: boolean;
  /** Trainee ID */
  traineeId?: string;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when saved */
  onSave?: (data: BodyMeasurementData) => void;
  /** Callback when cancelled */
  onCancel?: () => void;
}

// Measurement field configuration
const measurementFields = [
  { key: "weight", label: "Weight", unit: "kg", icon: Scale, group: "basic" },
  { key: "height", label: "Height", unit: "cm", icon: Ruler, group: "basic" },
  { key: "bodyFat", label: "Body Fat", unit: "%", icon: Activity, group: "composition" },
  { key: "muscleMass", label: "Muscle Mass", unit: "kg", icon: Activity, group: "composition" },
  { key: "chest", label: "Chest", unit: "cm", icon: Ruler, group: "circumference" },
  { key: "waist", label: "Waist", unit: "cm", icon: Ruler, group: "circumference" },
  { key: "hips", label: "Hips", unit: "cm", icon: Ruler, group: "circumference" },
  { key: "leftArm", label: "Left Arm", unit: "cm", icon: Ruler, group: "arms" },
  { key: "rightArm", label: "Right Arm", unit: "cm", icon: Ruler, group: "arms" },
  { key: "leftThigh", label: "Left Thigh", unit: "cm", icon: Ruler, group: "legs" },
  { key: "rightThigh", label: "Right Thigh", unit: "cm", icon: Ruler, group: "legs" },
] as const;

// Get difference indicator
const getDifferenceIndicator = (
  current: number | undefined,
  previous: number | undefined,
  inverse: boolean = false
) => {
  if (current === undefined || previous === undefined) return null;
  const diff = current - previous;
  if (Math.abs(diff) < 0.1) return { icon: Minus, color: "text-neutral-400", text: "same" };
  const isPositive = inverse ? diff < 0 : diff > 0;
  return {
    icon: isPositive ? TrendingUp : TrendingDown,
    color: isPositive ? "text-green-500" : "text-red-500",
    text: `${diff > 0 ? "+" : ""}${diff.toFixed(1)}`,
  };
};

export const BodyMeasurementInput: React.FC<BodyMeasurementInputProps> = ({
  initialData,
  previousData,
  showComparison = true,
  traineeId,
  entity = "ProgressEntry",
  className,
  onSave,
  onCancel,
}) => {
  const eventBus = useEventBus();
  const [measurements, setMeasurements] = useState<Partial<BodyMeasurementData>>({
    date: new Date().toISOString().split("T")[0],
    traineeId,
    ...initialData,
  });

  // Handle field change
  const handleChange = useCallback((key: string, value: string) => {
    const numValue = value === "" ? undefined : parseFloat(value);
    setMeasurements((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  }, []);

  // Handle notes change
  const handleNotesChange = useCallback((value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      notes: value,
    }));
  }, []);

  // Emit SAVE event (matches ProgressManagement trait)
  const handleSave = useCallback(() => {
    const data: BodyMeasurementData = {
      ...measurements,
      date: measurements.date || new Date().toISOString(),
      traineeId: measurements.traineeId || traineeId,
    } as BodyMeasurementData;

    eventBus.emit("UI:SAVE", { row: data, entity });
    onSave?.(data);
  }, [eventBus, measurements, traineeId, entity, onSave]);

  // Emit CANCEL event
  const handleCancel = useCallback(() => {
    eventBus.emit("UI:CANCEL", { entity });
    onCancel?.();
  }, [eventBus, entity, onCancel]);

  // Group fields by category
  const fieldGroups = {
    basic: measurementFields.filter((f) => f.group === "basic"),
    composition: measurementFields.filter((f) => f.group === "composition"),
    circumference: measurementFields.filter((f) => f.group === "circumference"),
    arms: measurementFields.filter((f) => f.group === "arms"),
    legs: measurementFields.filter((f) => f.group === "legs"),
  };

  const renderField = (field: (typeof measurementFields)[number]) => {
    const Icon = field.icon;
    const value = measurements[field.key as keyof BodyMeasurementData] as number | undefined;
    const prevValue = previousData?.[field.key as keyof BodyMeasurementData] as number | undefined;
    const diff =
      showComparison && previousData
        ? getDifferenceIndicator(value, prevValue, field.key === "bodyFat" || field.key === "waist")
        : null;
    const DiffIcon = diff?.icon;

    return (
      <VStack key={field.key} gap="xs">
        <HStack justify="between" align="center">
          <HStack gap="xs" align="center">
            <Icon className="h-3 w-3 text-neutral-400" />
            <Typography variant="small" className="text-neutral-600">
              {field.label}
            </Typography>
          </HStack>
          {diff && DiffIcon && (
            <HStack gap="xs" align="center">
              <DiffIcon className={cn("h-3 w-3", diff.color)} />
              <Typography variant="small" className={diff.color}>
                {diff.text}
              </Typography>
            </HStack>
          )}
        </HStack>
        <HStack gap="sm" align="center">
          <Input
            type="number"
            step="0.1"
            value={value ?? ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="flex-1"
          />
          <Typography variant="small" className="text-neutral-500 w-8">
            {field.unit}
          </Typography>
        </HStack>
      </VStack>
    );
  };

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="lg">
        {/* Header */}
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-teal-100"
            >
              <Ruler className="h-5 w-5 text-teal-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">Body Measurements</Typography>
              <Typography variant="small" className="text-neutral-500">
                Record current body measurements
              </Typography>
            </VStack>
          </HStack>
        </HStack>

        {/* Date Field */}
        <VStack gap="xs">
          <Typography variant="label">Date</Typography>
          <Input
            type="date"
            value={
              typeof measurements.date === "string"
                ? measurements.date.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) =>
              setMeasurements((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </VStack>

        {/* Basic Measurements */}
        <VStack gap="md">
          <Typography variant="label" className="text-neutral-700">
            Basic Measurements
          </Typography>
          <Box className="grid grid-cols-2 gap-4">
            {fieldGroups.basic.map(renderField)}
          </Box>
        </VStack>

        {/* Body Composition */}
        <VStack gap="md">
          <Typography variant="label" className="text-neutral-700">
            Body Composition
          </Typography>
          <Box className="grid grid-cols-2 gap-4">
            {fieldGroups.composition.map(renderField)}
          </Box>
        </VStack>

        {/* Circumference Measurements */}
        <VStack gap="md">
          <Typography variant="label" className="text-neutral-700">
            Circumference
          </Typography>
          <Box className="grid grid-cols-3 gap-4">
            {fieldGroups.circumference.map(renderField)}
          </Box>
        </VStack>

        {/* Arms */}
        <VStack gap="md">
          <Typography variant="label" className="text-neutral-700">
            Arms
          </Typography>
          <Box className="grid grid-cols-2 gap-4">
            {fieldGroups.arms.map(renderField)}
          </Box>
        </VStack>

        {/* Legs */}
        <VStack gap="md">
          <Typography variant="label" className="text-neutral-700">
            Legs
          </Typography>
          <Box className="grid grid-cols-2 gap-4">
            {fieldGroups.legs.map(renderField)}
          </Box>
        </VStack>

        {/* Notes */}
        <VStack gap="xs">
          <Typography variant="label">Notes</Typography>
          <textarea
            value={measurements.notes || ""}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add any notes about the measurements..."
            className="w-full min-h-[80px] p-3 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </VStack>

        {/* Action Buttons */}
        <HStack gap="sm" justify="end" className="border-t border-neutral-100 pt-4">
          <Button variant="secondary" onClick={handleCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save Measurements
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

BodyMeasurementInput.displayName = "BodyMeasurementInput";
