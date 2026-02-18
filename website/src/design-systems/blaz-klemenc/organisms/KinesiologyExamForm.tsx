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
import { ClipboardList, Save, X, Plus, Trash2 } from "lucide-react";
import {
  cn,
  Box,
  HStack,
  VStack,
  Typography,
  Button,
  Card,
  Input,
  Textarea,
  Select,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

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
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
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
  const { t } = useTranslate();

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
              className="items-center justify-center bg-indigo-500/15"
            >
              <ClipboardList className="h-5 w-5 text-indigo-600" />
            </Box>
            <Typography variant="h4">{t('kinesiology.title')}</Typography>
          </HStack>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </HStack>

        {/* Date */}
        <VStack gap="xs">
          <Typography variant="label">{t('kinesiology.examinationDate')}</Typography>
          <Input
            inputType="date"
            value={
              formData.date
                ? new Date(formData.date).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
          />
        </VStack>

        {/* Postural Assessment */}
        <VStack gap="xs">
          <Typography variant="label">{t('kinesiology.posturalAssessment')}</Typography>
          <Textarea
            value={formData.posturalAssessment || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, posturalAssessment: e.target.value }))
            }
            placeholder={t('kinesiology.posturalPlaceholder')}
            rows={3}
          />
        </VStack>

        {/* Movement Patterns */}
        <VStack gap="xs">
          <Typography variant="label">{t('kinesiology.movementPatternAnalysis')}</Typography>
          <Textarea
            value={formData.movementPatterns || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, movementPatterns: e.target.value }))
            }
            placeholder={t('kinesiology.movementPlaceholder')}
            rows={3}
          />
        </VStack>

        {/* Muscle Assessments */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="label">{t('kinesiology.muscleAssessments')}</Typography>
            <Button variant="secondary" size="sm" onClick={handleAddMuscle}>
              <Plus className="h-4 w-4 mr-1" />
              {t('kinesiology.addMuscle')}
            </Button>
          </HStack>

          {formData.muscleAssessments?.map((assessment, index) => (
            <Box
              key={index}
              rounded="lg"
              padding="sm"
              border
              className="bg-[var(--color-muted)]"
            >
              <VStack gap="sm">
                <HStack gap="sm" align="center">
                  <Select
                    value={assessment.muscle}
                    onChange={(e) => handleMuscleChange(index, "muscle", e.target.value)}
                    className="flex-1"
                    placeholder={t('kinesiology.selectMuscle')}
                    options={muscleGroups.map((muscle) => ({
                      value: muscle,
                      label: muscle,
                    }))}
                  />
                  <Select
                    value={assessment.side}
                    onChange={(e) => handleMuscleChange(index, "side", e.target.value)}
                    className="w-24"
                    options={[
                      { value: "both", label: t('kinesiology.both') },
                      { value: "left", label: t('kinesiology.left') },
                      { value: "right", label: t('kinesiology.right') },
                    ]}
                  />
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
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('kinesiology.strength')}: {strengthLabels[assessment.strength]}
                    </Typography>
                    <Input
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
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('kinesiology.flexibility')}: {flexibilityLabels[assessment.flexibility]}
                    </Typography>
                    <Input
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

                <Input
                  value={assessment.notes || ""}
                  onChange={(e) => handleMuscleChange(index, "notes", e.target.value)}
                  placeholder={t('kinesiology.muscleNotesPlaceholder')}
                />
              </VStack>
            </Box>
          ))}

          {formData.muscleAssessments?.length === 0 && (
            <Box
              padding="md"
              rounded="lg"
              className="text-center bg-[var(--color-muted)] border border-dashed"
            >
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('kinesiology.noMuscleAssessments')}
              </Typography>
            </Box>
          )}
        </VStack>

        {/* Recommendations */}
        <VStack gap="xs">
          <Typography variant="label">{t('kinesiology.recommendations')}</Typography>
          <Textarea
            value={formData.recommendations || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, recommendations: e.target.value }))
            }
            placeholder={t('kinesiology.recommendationsPlaceholder')}
            rows={3}
          />
        </VStack>

        {/* Notes */}
        <VStack gap="xs">
          <Typography variant="label">{t('kinesiology.additionalNotes')}</Typography>
          <Textarea
            value={formData.notes || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder={t('kinesiology.notesPlaceholder')}
            rows={2}
          />
        </VStack>

        {/* Actions */}
        <HStack gap="sm" justify="end" className="border-t pt-4">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              {t('kinesiology.cancel')}
            </Button>
          )}
          <Button variant="primary" onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-1" />
            {t('kinesiology.saveExamination')}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

KinesiologyExamForm.displayName = "KinesiologyExamForm";
