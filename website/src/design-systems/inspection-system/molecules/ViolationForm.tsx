/**
 * ViolationForm
 *
 * Form component for recording violations during inspection.
 * Captures violation details, severity, and evidence.
 *
 * Event Contract:
 * - Emits: UI:VIOLATION_SAVED with { violation }
 * - Emits: UI:CANCEL
 */

import React, { useState } from "react";
import { AlertTriangle, Camera, Save, X } from "lucide-react";
import {
  cn,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Input,
  Textarea,
  Select,
  useEventBus,
} from '@almadar/ui';

export interface ViolationFormData {
  id?: string;
  ruleId?: string;
  ruleName?: string;
  description?: string;
  severity?: "critical" | "major" | "minor";
  notes?: string;
  correctionDeadline?: string;
  photos?: string[];
}

export interface ViolationFormProps {
  /** Initial data for editing */
  initialData?: ViolationFormData;
  /** Rule being violated */
  rule?: { id: string; name: string; severity?: string };
  /** Submit event name */
  submitEvent?: string;
  /** Cancel event name */
  cancelEvent?: string;
  /** Additional CSS classes */
  className?: string;
  /** Submit handler */
  onSubmit?: (data: ViolationFormData) => void;
  /** Cancel handler */
  onCancel?: () => void;
}

const severityOptions = [
  { value: "critical", label: "Critical - Immediate action required" },
  { value: "major", label: "Major - Must be corrected" },
  { value: "minor", label: "Minor - Should be corrected" },
];

export const ViolationForm: React.FC<ViolationFormProps> = ({
  initialData,
  rule,
  submitEvent = "SAVE",
  cancelEvent = "CANCEL",
  className,
  onSubmit,
  onCancel,
}) => {
  const eventBus = useEventBus();

  const [formData, setFormData] = useState<ViolationFormData>({
    ruleId: rule?.id || initialData?.ruleId || "",
    ruleName: rule?.name || initialData?.ruleName || "",
    description: initialData?.description || "",
    severity: initialData?.severity || (rule?.severity as ViolationFormData["severity"]) || "major",
    notes: initialData?.notes || "",
    correctionDeadline: initialData?.correctionDeadline || "",
    photos: initialData?.photos || [],
  });

  const handleChange = (field: keyof ViolationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    eventBus.emit(`UI:${submitEvent}`, { violation: formData });
  };

  const handleCancel = () => {
    onCancel?.();
    eventBus.emit(`UI:${cancelEvent}`, {});
  };

  const handleAddPhoto = () => {
    eventBus.emit("UI:ADD_PHOTO", { violationId: formData.id });
  };

  return (
    <Card className={cn("p-6", className)}>
      <form onSubmit={handleSubmit}>
        <VStack gap="lg">
          {/* Header */}
          <HStack gap="sm" align="center">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <Typography variant="h3">
              Record Violation
            </Typography>
          </HStack>

          {/* Rule reference */}
          {(formData.ruleName || rule?.name) && (
            <Card className="p-3 bg-amber-50 border-amber-200">
              <Typography variant="small" className="text-amber-800">
                <span className="font-medium">Rule:</span> {formData.ruleName || rule?.name}
              </Typography>
            </Card>
          )}

          {/* Description */}
          <VStack gap="xs">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Violation Description *
            </Typography>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the violation observed..."
              rows={3}
              required
            />
          </VStack>

          {/* Severity */}
          <VStack gap="xs">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Severity *
            </Typography>
            <Select
              value={formData.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
              options={severityOptions}
            />
          </VStack>

          {/* Correction deadline */}
          <VStack gap="xs">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Correction Deadline
            </Typography>
            <Input
              type="date"
              value={formData.correctionDeadline}
              onChange={(e) => handleChange("correctionDeadline", e.target.value)}
            />
          </VStack>

          {/* Additional notes */}
          <VStack gap="xs">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Additional Notes
            </Typography>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional observations or context..."
              rows={2}
            />
          </VStack>

          {/* Photo evidence */}
          <VStack gap="xs">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Photo Evidence
            </Typography>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddPhoto}
              className="gap-2 w-full justify-center"
            >
              <Camera className="h-4 w-4" />
              Add Photo
            </Button>
            {formData.photos && formData.photos.length > 0 && (
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {formData.photos.length} photo(s) attached
              </Typography>
            )}
          </VStack>

          {/* Actions */}
          <HStack gap="sm" justify="end" className="pt-4 border-t">
            <Button type="button" variant="ghost" onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="gap-2">
              <Save className="h-4 w-4" />
              Save Violation
            </Button>
          </HStack>
        </VStack>
      </form>
    </Card>
  );
};

ViolationForm.displayName = "ViolationForm";
