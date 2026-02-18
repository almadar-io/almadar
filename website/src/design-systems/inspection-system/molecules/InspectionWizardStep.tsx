/**
 * InspectionWizardStep
 *
 * Step component for inspection wizard.
 * Renders step content with navigation controls.
 *
 * Event Contract:
 * - Emits: UI:NEXT_STEP
 * - Emits: UI:PREV_STEP
 * - Emits: UI:COMPLETE_STEP with { stepId, data }
 */

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  cn,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Badge,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export type StepStatus = "pending" | "active" | "completed" | "error";

export interface InspectionWizardStepProps {
  /** Step ID */
  id?: string;
  /** Step number */
  stepNumber?: number;
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Step status */
  status?: StepStatus;
  /** Is this the current step */
  isActive?: boolean;
  /** Is this the first step */
  isFirst?: boolean;
  /** Is this the last step */
  isLast?: boolean;
  /** Total steps */
  totalSteps?: number;
  /** Step content */
  children?: React.ReactNode;
  /** Show navigation */
  showNavigation?: boolean;
  /** Previous button label */
  prevLabel?: string;
  /** Next button label */
  nextLabel?: string;
  /** Complete button label */
  completeLabel?: string;
  /** Disable next/complete */
  disableNext?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Previous handler */
  onPrev?: () => void;
  /** Next handler */
  onNext?: () => void;
  /** Complete handler */
  onComplete?: () => void;
}

const statusConfig: Record<StepStatus, { icon: React.ElementType; color: string; bgColor: string }> = {
  pending: { icon: Circle, color: "text-[var(--color-muted-foreground)]", bgColor: "bg-neutral-100" },
  active: { icon: Clock, color: "text-blue-600", bgColor: "bg-blue-100" },
  completed: { icon: Check, color: "text-green-600", bgColor: "bg-green-100" },
  error: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
};

export const InspectionWizardStep: React.FC<InspectionWizardStepProps> = ({
  id,
  stepNumber,
  title,
  description,
  status = "pending",
  isActive = false,
  isFirst = false,
  isLast = false,
  totalSteps,
  children,
  showNavigation = true,
  prevLabel,
  nextLabel,
  completeLabel,
  disableNext = false,
  className,
  onPrev,
  onNext,
  onComplete,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const resolvedPrevLabel = prevLabel ?? t('nav.previous');
  const resolvedNextLabel = nextLabel ?? t('nav.next');
  const resolvedCompleteLabel = completeLabel ?? t('wizard.complete');
  const statusInfo = statusConfig[isActive ? "active" : status];
  const StatusIcon = statusInfo.icon;

  const handlePrev = () => {
    onPrev?.();
    eventBus.emit("UI:PREV_STEP", { stepId: id });
  };

  const handleNext = () => {
    onNext?.();
    eventBus.emit("UI:NEXT_STEP", { stepId: id });
  };

  const handleComplete = () => {
    onComplete?.();
    eventBus.emit("UI:COMPLETE_STEP", { stepId: id });
  };

  return (
    <Card className={cn("p-6", className)}>
      <VStack gap="lg">
        {/* Step header */}
        <HStack justify="between" align="start" wrap>
          <HStack gap="md" align="center">
            <div className={cn("p-2 rounded-full", statusInfo.bgColor)}>
              {status === "completed" ? (
                <Check className={cn("h-5 w-5", statusInfo.color)} />
              ) : stepNumber ? (
                <Typography variant="body" className={cn("font-bold", statusInfo.color)}>
                  {stepNumber}
                </Typography>
              ) : (
                <StatusIcon className={cn("h-5 w-5", statusInfo.color)} />
              )}
            </div>
            <VStack gap="xs">
              <Typography variant="h3">
                {title}
              </Typography>
              {description && (
                <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                  {description}
                </Typography>
              )}
            </VStack>
          </HStack>

          {totalSteps && stepNumber && (
            <Badge variant="neutral">
              Step {stepNumber} of {totalSteps}
            </Badge>
          )}
        </HStack>

        {/* Step content */}
        {children && (
          <div className="py-4">
            {children}
          </div>
        )}

        {/* Navigation */}
        {showNavigation && (
          <HStack justify="between" className="pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={isFirst}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {resolvedPrevLabel}
            </Button>

            {isLast ? (
              <Button
                variant="primary"
                onClick={handleComplete}
                disabled={disableNext}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                {resolvedCompleteLabel}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={disableNext}
                className="gap-2"
              >
                {resolvedNextLabel}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

// Progress indicator for wizard steps
export interface WizardStepIndicatorProps {
  /** Current step (0-indexed) */
  currentStep: number;
  /** Step definitions */
  steps: Array<{ id?: string; title: string; status?: StepStatus }>;
  /** Click handler */
  onStepClick?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

export const WizardStepIndicator: React.FC<WizardStepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep || step.status === "completed";
        const isActive = index === currentStep;
        const isPending = index > currentStep && step.status !== "completed";

        return (
          <React.Fragment key={step.id || index}>
            <button
              onClick={() => onStepClick?.(index)}
              disabled={isPending && !onStepClick}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors",
                isActive && "bg-blue-100 text-blue-700",
                isCompleted && "bg-green-100 text-green-700",
                isPending && "bg-neutral-100 text-[var(--color-muted-foreground)]",
                onStepClick && !isPending && "hover:opacity-80 cursor-pointer"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
              )}
              <Typography variant="small" className="font-medium">
                {step.title}
              </Typography>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 min-w-[20px]",
                  index < currentStep ? "bg-green-300" : "bg-neutral-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

InspectionWizardStep.displayName = "InspectionWizardStep";
WizardStepIndicator.displayName = "WizardStepIndicator";
