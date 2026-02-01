/**
 * WizardContainer Component
 *
 * Multi-step wizard pattern with progress indicator.
 * Composes Box, Typography, and Button atoms.
 *
 * Uses wireframe theme styling (high contrast, sharp edges).
 */
import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "../atoms/Button";
import { Typography } from "../atoms/Typography";
import { Box } from "../atoms/Box";
import { Icon } from "../atoms/Icon";
import { cn } from "../../lib/cn";

export interface WizardStep {
  /** Step identifier */
  id: string;
  /** Step title */
  title: string;
  /** Step description (optional) */
  description?: string;
  /** Step content */
  content: React.ReactNode;
  /** Whether this step can be skipped */
  optional?: boolean;
  /** Custom validation for this step */
  isValid?: () => boolean;
}

export interface WizardContainerProps {
  /** Wizard steps */
  steps: WizardStep[];
  /** Current step index (controlled) */
  currentStep?: number;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Callback when wizard is completed */
  onComplete?: () => void;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Allow navigation to previous steps */
  allowBack?: boolean;
  /** Modal mode (compact header, no padding) */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * WizardContainer - Multi-step wizard
 */
export const WizardContainer: React.FC<WizardContainerProps> = ({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  showProgress = true,
  allowBack = true,
  compact = false,
  className,
}) => {
  const [internalStep, setInternalStep] = useState(0);

  const currentStep =
    controlledStep !== undefined ? controlledStep : internalStep;
  const totalSteps = steps.length;
  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex < 0 || stepIndex >= totalSteps) return;

      if (controlledStep === undefined) {
        setInternalStep(stepIndex);
      }
      onStepChange?.(stepIndex);
    },
    [controlledStep, totalSteps, onStepChange],
  );

  const handleNext = () => {
    // Validate current step if validator exists
    if (currentStepData.isValid && !currentStepData.isValid()) {
      return;
    }

    if (isLastStep) {
      onComplete?.();
    } else {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep && allowBack) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <Box className={cn("flex flex-col h-full", className)}>
      {/* Progress indicator */}
      {showProgress && (
        <Box
          border
          className={cn(
            "border-b-2 border-x-0 border-t-0 border-[var(--color-border)]",
            compact ? "px-4 py-2" : "px-6 py-4",
          )}
        >
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <React.Fragment key={step.id}>
                  {/* Step indicator */}
                  <button
                    onClick={() => isCompleted && allowBack && goToStep(index)}
                    disabled={!isCompleted || !allowBack}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors",
                      "border-2 border-[var(--color-border)]",
                      isActive &&
                        "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
                      isCompleted &&
                        "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer hover:bg-[var(--color-primary-hover)]",
                      !isActive &&
                        !isCompleted &&
                        "bg-[var(--color-card)] text-[var(--color-foreground)]",
                    )}
                  >
                    {isCompleted ? <Icon icon={Check} size="sm" /> : index + 1}
                  </button>

                  {/* Step title (on desktop) */}
                  <div
                    className={cn(
                      "hidden md:block",
                      isActive
                        ? "text-[var(--color-foreground)] font-bold"
                        : "text-[var(--color-muted-foreground)]",
                    )}
                  >
                    <Typography
                      variant="small"
                      weight={isActive ? "bold" : "normal"}
                    >
                      {step.title}
                    </Typography>
                  </div>

                  {/* Connector line */}
                  {index < totalSteps - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5",
                        index < currentStep
                          ? "bg-[var(--color-primary)]"
                          : "bg-[var(--color-border)]",
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Box>
      )}

      {/* Step header */}
      {!compact && currentStepData && (
        <Box
          paddingX="lg"
          paddingY="md"
          border
          className="border-b-2 border-x-0 border-t-0 border-[var(--color-border)]"
        >
          <Typography variant="h4" as="h2">
            {currentStepData.title}
          </Typography>
          {currentStepData.description && (
            <Typography
              variant="body2"
              className="text-[var(--color-muted-foreground)] mt-1"
            >
              {currentStepData.description}
            </Typography>
          )}
        </Box>
      )}

      {/* Step content */}
      <div className={cn("flex-1 overflow-auto", compact ? "p-4" : "p-6")}>
        {currentStepData?.content}
      </div>

      {/* Navigation buttons */}
      <Box
        border
        className={cn(
          "border-t-2 border-x-0 border-b-0 border-[var(--color-border)] flex justify-between",
          compact ? "px-4 py-2" : "px-6 py-4",
        )}
      >
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isFirstStep || !allowBack}
        >
          <Icon icon={ChevronLeft} size="sm" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Typography
            variant="caption"
            className="text-[var(--color-muted-foreground)]"
          >
            Step {currentStep + 1} of {totalSteps}
          </Typography>
        </div>

        <Button variant="primary" onClick={handleNext}>
          {isLastStep ? "Complete" : "Next"}
          {!isLastStep && <Icon icon={ChevronRight} size="sm" />}
        </Button>
      </Box>
    </Box>
  );
};

WizardContainer.displayName = "WizardContainer";

export default WizardContainer;
