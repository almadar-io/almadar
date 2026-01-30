/**
 * ProgressHeader
 *
 * Header component showing inspection progress with steps.
 * Used at the top of inspection wizard pages.
 *
 * Event Contract:
 * - Emits: none (display only)
 * - entityAware: true
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { ProgressBar } from "../../../components/atoms/ProgressBar";
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";
import { CheckCircle, Circle } from "lucide-react";

export interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

export interface ProgressHeaderProps {
  /** Inspection title */
  title: string;
  /** Inspection subtitle (e.g., company name) */
  subtitle?: string;
  /** Current phase */
  phase?: InspectionPhase;
  /** Progress steps */
  steps?: ProgressStep[];
  /** Current step index (0-based) */
  currentStep?: number;
  /** Total steps */
  totalSteps?: number;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Show step indicators */
  showSteps?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  title,
  subtitle,
  phase,
  steps,
  currentStep = 0,
  totalSteps,
  progress,
  showSteps = true,
  className,
}) => {
  // Calculate progress from steps if not provided
  const calculatedProgress = progress ?? (steps
    ? Math.round((steps.filter((s) => s.completed).length / steps.length) * 100)
    : totalSteps
    ? Math.round((currentStep / totalSteps) * 100)
    : 0);

  return (
    <Box
      padding="lg"
      border
      rounded="lg"
      className={cn("bg-white shadow-sm", className)}
    >
      <VStack gap="md">
        {/* Title row */}
        <HStack justify="between" align="start" wrap>
          <VStack gap="xs">
            <Typography variant="h2" className="text-neutral-900">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body" className="text-neutral-500">
                {subtitle}
              </Typography>
            )}
          </VStack>
          {phase && <PhaseIndicator phase={phase} />}
        </HStack>

        {/* Progress bar */}
        <VStack gap="xs">
          <HStack justify="between" align="center">
            <Typography variant="small" className="text-neutral-600">
              Progress
            </Typography>
            <Typography variant="small" className="font-medium text-neutral-700">
              {calculatedProgress}%
            </Typography>
          </HStack>
          <ProgressBar
            value={calculatedProgress}
            max={100}
            variant="primary"
            size="md"
          />
        </VStack>

        {/* Step indicators */}
        {showSteps && steps && steps.length > 0 && (
          <HStack gap="sm" wrap className="pt-2 border-t">
            {steps.map((step, index) => (
              <HStack
                key={step.id}
                gap="xs"
                align="center"
                className={cn(
                  "px-2 py-1 rounded",
                  step.current && "bg-blue-50",
                  step.completed && !step.current && "text-green-600"
                )}
              >
                {step.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : step.current ? (
                  <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                ) : (
                  <Circle className="h-4 w-4 text-neutral-300" />
                )}
                <Typography
                  variant="small"
                  className={cn(
                    step.current ? "font-medium text-blue-700" : "text-neutral-600"
                  )}
                >
                  {step.label}
                </Typography>
              </HStack>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

ProgressHeader.displayName = "ProgressHeader";
