/**
 * InspectionWizardTemplate
 *
 * Multi-step wizard template for conducting inspections.
 * Guides inspectors through the inspection process.
 *
 * Page: InspectionWizardPage
 * Entity: Inspection
 * ViewType: wizard
 */

import React, { useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { ProgressHeader } from "../molecules/ProgressHeader";
import { ComplianceSummary, ComplianceStats } from "../molecules/ComplianceSummary";
import { FloatingActionMenu } from "../organisms/FloatingActionMenu";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  CheckCircle,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  PenTool,
} from "lucide-react";

export type WizardStep =
  | "company"
  | "participants"
  | "rules"
  | "documentation"
  | "signatures";

export interface InspectionWizardTemplateProps {
  /** Inspection ID */
  inspectionId: string;
  /** Company name */
  companyName: string;
  /** Current step */
  currentStep: WizardStep;
  /** Compliance stats */
  complianceStats?: ComplianceStats;
  /** Step content render prop */
  children?: React.ReactNode;
  /** Can proceed to next step */
  canProceed?: boolean;
  /** Show floating action menu */
  showFloatingMenu?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Step change handler */
  onStepChange?: (step: WizardStep) => void;
  /** Save draft handler */
  onSaveDraft?: () => void;
  /** Complete handler */
  onComplete?: () => void;
}

const steps: Array<{ id: WizardStep; label: string; icon: typeof Building2 }> = [
  { id: "company", label: "Company Info", icon: Building2 },
  { id: "participants", label: "Participants", icon: Users },
  { id: "rules", label: "Rule Check", icon: ClipboardCheck },
  { id: "documentation", label: "Documentation", icon: FileText },
  { id: "signatures", label: "Signatures", icon: PenTool },
];

export const InspectionWizardTemplate: React.FC<InspectionWizardTemplateProps> = ({
  inspectionId,
  companyName,
  currentStep,
  complianceStats,
  children,
  canProceed = true,
  showFloatingMenu = true,
  className,
  onStepChange,
  onSaveDraft,
  onComplete,
}) => {
  const eventBus = useEventBus();

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const progressSteps = steps.map((step, index) => ({
    id: step.id,
    label: step.label,
    completed: index < currentStepIndex,
    current: step.id === currentStep,
  }));

  const handlePrevious = () => {
    if (isFirstStep) return;
    const prevStep = steps[currentStepIndex - 1].id;
    onStepChange?.(prevStep);
    eventBus.emit("UI:WIZARD_BACK", { step: prevStep });
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
      eventBus.emit("UI:WIZARD_COMPLETE", { inspectionId });
    } else {
      const nextStep = steps[currentStepIndex + 1].id;
      onStepChange?.(nextStep);
      eventBus.emit("UI:WIZARD_NEXT", { step: nextStep });
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft?.();
    eventBus.emit("UI:SAVE_DRAFT", { inspectionId, currentStep });
  };

  const handleStepClick = (stepId: WizardStep) => {
    const stepIndex = steps.findIndex((s) => s.id === stepId);
    // Only allow clicking on completed steps or the current step
    if (stepIndex <= currentStepIndex) {
      onStepChange?.(stepId);
      eventBus.emit("UI:WIZARD_STEP_CHANGE", { step: stepId });
    }
  };

  return (
    <VStack gap="lg" className={cn("min-h-screen bg-neutral-50", className)}>
      {/* Header */}
      <Box className="bg-white border-b sticky top-0 z-40">
        <Box className="max-w-5xl mx-auto p-4">
          <ProgressHeader
            title="Field Inspection"
            subtitle={companyName}
            phase="execution"
            steps={progressSteps}
          />
        </Box>
      </Box>

      {/* Step Navigation */}
      <Box className="max-w-5xl mx-auto w-full px-4">
        <Card className="p-2">
          <HStack gap="none" className="overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.id === currentStep;
              const isClickable = index <= currentStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex-1 min-w-[120px] p-3 rounded-lg transition-all",
                    "flex flex-col items-center gap-1",
                    isCurrent && "bg-blue-50 text-blue-700",
                    isCompleted && "text-green-600",
                    !isCurrent && !isCompleted && "text-neutral-400",
                    isClickable && "hover:bg-neutral-50 cursor-pointer",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  <Box
                    rounded="full"
                    padding="sm"
                    className={cn(
                      isCompleted && "bg-green-100",
                      isCurrent && "bg-blue-100",
                      !isCompleted && !isCurrent && "bg-neutral-100"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </Box>
                  <Typography
                    variant="small"
                    className={cn("font-medium", isCurrent && "text-blue-700")}
                  >
                    {step.label}
                  </Typography>
                </button>
              );
            })}
          </HStack>
        </Card>
      </Box>

      {/* Compliance Summary (shown on rules step) */}
      {currentStep === "rules" && complianceStats && (
        <Box className="max-w-5xl mx-auto w-full px-4">
          <ComplianceSummary stats={complianceStats} />
        </Box>
      )}

      {/* Step Content */}
      <Box className="max-w-5xl mx-auto w-full px-4 flex-1">
        <Card className="p-6 min-h-[400px]">{children}</Card>
      </Box>

      {/* Footer Navigation */}
      <Box className="bg-white border-t sticky bottom-0 z-40">
        <Box className="max-w-5xl mx-auto p-4">
          <HStack justify="between" align="center">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button variant="ghost" onClick={handleSaveDraft} className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed}
              className="gap-2"
            >
              {isLastStep ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Complete Inspection
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Floating Action Menu */}
      {showFloatingMenu && (
        <FloatingActionMenu
          context={{ inspectionId, currentStep }}
        />
      )}
    </VStack>
  );
};

InspectionWizardTemplate.displayName = "InspectionWizardTemplate";
