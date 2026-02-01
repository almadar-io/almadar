/**
 * KinesiologyExamForm
 *
 * Form for recording kinesiology examination results.
 * Professional feature for detailed assessments.
 *
 * Maps to ProgressEntry entity (entryType: 'kinesiology_exam')
 *
 * Event Contract:
 * - Emits: UI:SAVE - when form is submitted
 * - Payload: { data: KinesiologyExamData, entity: "ProgressEntry" }
 */

import React, { useCallback, useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { ClipboardList, Save, X, Plus, Trash2 } from "lucide-react";

export interface MuscleAssessment {
  muscle: string;
  side: "left" | "right" | "both";
  strength: 1 | 2 | 3 | 4 | 5;
  flexibility: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface KinesiologyExamData {
  id?: string;
  traineeId: string;
  trainerId?: string;
  date: string | Date;
  posturalAssessment?: string;
  movementPatterns?: string;
  muscleAssessments: MuscleAssessment[];
  recommendations?: string;
  notes?: string;
}

export interface KinesiologyExamFormProps {
  /** Trainee ID */
  traineeId: string;
  /** Trainer ID */
  trainerId?: string;
  /** Existing exam to edit */
  existingExam?: KinesiologyExamData;
  /** Entity context for events */
  entity?: string;
  /** Callback on cancel */
  onCancel?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const muscleGroups = [
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Hip Flexors",
  "Calves",
  "Core",
  "Lower Back",
  "Upper Back",
  "Chest",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Neck",
];

const strengthLabels = {
  1: "Very Weak",
  2: "Weak",
  3: "Average",
  4: "Strong",
  5: "Very Strong",
};

const flexibilityLabels = {
  1: "Very Tight",
  2: "Tight",
  3: "Average",
  4: "Flexible",
  5: "Very Flexible",
};

export const KinesiologyExamForm: React.FC<KinesiologyExamFormProps> = ({
  traineeId,
  trainerId,
  existingExam,
  entity = "ProgressEntry",
  onCancel,
  className,
}) => {
  const eventBus = useEventBus();

  const [formData, setFormData] = useState<Partial<KinesiologyExamData>>({
    traineeId,
    trainerId,
    date: existingExam?.date || new Date().toISOString().split("T")[0],
    posturalAssessment: existingExam?.posturalAssessment || "",
    movementPatterns: existingExam?.movementPatterns || "",
    muscleAssessments: existingExam?.muscleAssessments || [],
    recommendations: existingExam?.recommendations || "",
    notes: existingExam?.notes || "",
  });

  // Add new muscle assessment
  const handleAddMuscle = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      muscleAssessments: [
        ...(prev.muscleAssessments || []),
        { muscle: "", side: "both" as const, strength: 3 as const, flexibility: 3 as const },
      ],
    }));
  }, []);

  // Remove muscle assessment
  const handleRemoveMuscle = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      muscleAssessments: prev.muscleAssessments?.filter((_, i) => i !== index),
    }));
  }, []);

  // Update muscle assessment
  const handleMuscleChange = useCallback(
    (index: number, field: keyof MuscleAssessment, value: unknown) => {
      setFormData((prev) => ({
        ...prev,
        muscleAssessments: prev.muscleAssessments?.map((m, i) =>
          i === index ? { ...m, [field]: value } : m
        ),
      }));
    },
    []
  );

  // Handle form submission
  const handleSubmit = useCallback(() => {
    const examData: KinesiologyExamData = {
      ...existingExam,
      ...formData,
      traineeId,
      trainerId,
      muscleAssessments: formData.muscleAssessments || [],
    } as KinesiologyExamData;

    eventBus.emit("UI:SAVE", {
      data: {
        ...examData,
        entryType: "kinesiology_exam",
        title: `Kinesiology Exam - ${new Date(examData.date).toLocaleDateString()}`,
        status: "completed",
      },
      entity,
    });
  }, [eventBus, formData, existingExam, traineeId, trainerId, entity]);

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
              className="items-center justify-center bg-indigo-100"
            >
              <ClipboardList className="h-5 w-5 text-indigo-600" />
            </Box>
            <Typography variant="h4">Kinesiology Examination</Typography>
          </HStack>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </HStack>

        {/* Date */}
        <VStack gap="xs">
          <Typography variant="label">Examination Date</Typography>
          <input
            type="date"
            value={
              formData.date
                ? new Date(formData.date).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
            className="w-full p-2 border rounded-md"
          />
        </VStack>

        {/* Postural Assessment */}
        <VStack gap="xs">
          <Typography variant="label">Postural Assessment</Typography>
          <textarea
            value={formData.posturalAssessment || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, posturalAssessment: e.target.value }))
            }
            placeholder="Describe postural observations..."
            rows={3}
            className="w-full p-2 border rounded-md resize-none"
          />
        </VStack>

        {/* Movement Patterns */}
        <VStack gap="xs">
          <Typography variant="label">Movement Pattern Analysis</Typography>
          <textarea
            value={formData.movementPatterns || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, movementPatterns: e.target.value }))
            }
            placeholder="Describe movement patterns and compensations..."
            rows={3}
            className="w-full p-2 border rounded-md resize-none"
          />
        </VStack>

        {/* Muscle Assessments */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="label">Muscle Assessments</Typography>
            <Button variant="secondary" size="sm" onClick={handleAddMuscle}>
              <Plus className="h-4 w-4 mr-1" />
              Add Muscle
            </Button>
          </HStack>

          {formData.muscleAssessments?.map((assessment, index) => (
            <Box
              key={index}
              rounded="lg"
              padding="sm"
              border
              className="bg-neutral-50"
            >
              <VStack gap="sm">
                <HStack gap="sm" align="center">
                  <select
                    value={assessment.muscle}
                    onChange={(e) => handleMuscleChange(index, "muscle", e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  >
                    <option value="">Select muscle...</option>
                    {muscleGroups.map((muscle) => (
                      <option key={muscle} value={muscle}>
                        {muscle}
                      </option>
                    ))}
                  </select>
                  <select
                    value={assessment.side}
                    onChange={(e) => handleMuscleChange(index, "side", e.target.value)}
                    className="w-24 p-2 border rounded-md"
                  >
                    <option value="both">Both</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMuscle(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </HStack>

                <HStack gap="md">
                  <VStack gap="xs" className="flex-1">
                    <Typography variant="small" className="text-neutral-500">
                      Strength: {strengthLabels[assessment.strength]}
                    </Typography>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={assessment.strength}
                      onChange={(e) =>
                        handleMuscleChange(index, "strength", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </VStack>
                  <VStack gap="xs" className="flex-1">
                    <Typography variant="small" className="text-neutral-500">
                      Flexibility: {flexibilityLabels[assessment.flexibility]}
                    </Typography>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={assessment.flexibility}
                      onChange={(e) =>
                        handleMuscleChange(index, "flexibility", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </VStack>
                </HStack>

                <input
                  type="text"
                  value={assessment.notes || ""}
                  onChange={(e) => handleMuscleChange(index, "notes", e.target.value)}
                  placeholder="Notes for this muscle..."
                  className="w-full p-2 border rounded-md text-sm"
                />
              </VStack>
            </Box>
          ))}

          {formData.muscleAssessments?.length === 0 && (
            <Box
              padding="md"
              rounded="lg"
              className="text-center bg-neutral-50 border border-dashed"
            >
              <Typography variant="small" className="text-neutral-500">
                No muscle assessments added. Click "Add Muscle" to begin.
              </Typography>
            </Box>
          )}
        </VStack>

        {/* Recommendations */}
        <VStack gap="xs">
          <Typography variant="label">Recommendations</Typography>
          <textarea
            value={formData.recommendations || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, recommendations: e.target.value }))
            }
            placeholder="Training recommendations based on assessment..."
            rows={3}
            className="w-full p-2 border rounded-md resize-none"
          />
        </VStack>

        {/* Notes */}
        <VStack gap="xs">
          <Typography variant="label">Additional Notes</Typography>
          <textarea
            value={formData.notes || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Any other observations..."
            rows={2}
            className="w-full p-2 border rounded-md resize-none"
          />
        </VStack>

        {/* Actions */}
        <HStack gap="sm" justify="end" className="border-t pt-4">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-1" />
            Save Examination
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

KinesiologyExamForm.displayName = "KinesiologyExamForm";
