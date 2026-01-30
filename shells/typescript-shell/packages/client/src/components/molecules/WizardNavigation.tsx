/**
 * WizardNavigation Component
 *
 * Navigation buttons for multi-step wizards.
 * Includes Back, Next, and Complete buttons with proper state handling.
 *
 * Emits events via useEventBus for trait integration.
 * Uses wireframe theme styling (high contrast, sharp edges).
 */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Box } from '../atoms/Box';
import { Icon } from '../atoms/Icon';
import { cn } from '../../lib/cn';
import { useEventBus } from '../../hooks/useEventBus';

/**
 * Safe event bus hook that works outside EventBusProvider context.
 * Returns a no-op emit function if not in EventBusProvider context.
 */
function useSafeEventBus() {
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useEventBus();
    } catch {
        // Outside EventBusProvider context - return no-op
        return { emit: () => {}, on: () => () => {}, once: () => {} };
    }
}

export interface WizardNavigationProps {
    /** Current step index (0-based) */
    currentStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Whether the current step is valid (enables Next/Complete) */
    isValid?: boolean;
    /** Show the Back button */
    showBack?: boolean;
    /** Show the Next button */
    showNext?: boolean;
    /** Show the Complete button (on last step) */
    showComplete?: boolean;
    /** Custom label for Back button */
    backLabel?: string;
    /** Custom label for Next button */
    nextLabel?: string;
    /** Custom label for Complete button */
    completeLabel?: string;
    /** Event to emit on Back click */
    onBack?: string;
    /** Event to emit on Next click */
    onNext?: string;
    /** Event to emit on Complete click */
    onComplete?: string;
    /** Direct callback for Back (alternative to event) */
    onBackClick?: () => void;
    /** Direct callback for Next (alternative to event) */
    onNextClick?: () => void;
    /** Direct callback for Complete (alternative to event) */
    onCompleteClick?: () => void;
    /** Compact mode (smaller padding) */
    compact?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * WizardNavigation - Wizard navigation buttons
 */
export const WizardNavigation: React.FC<WizardNavigationProps> = ({
    currentStep,
    totalSteps,
    isValid = true,
    showBack = true,
    showNext = true,
    showComplete = true,
    backLabel = 'Back',
    nextLabel = 'Next',
    completeLabel = 'Complete',
    onBack = 'WIZARD_BACK',
    onNext = 'WIZARD_NEXT',
    onComplete = 'WIZARD_COMPLETE',
    onBackClick,
    onNextClick,
    onCompleteClick,
    compact = false,
    className,
}) => {
    const eventBus = useSafeEventBus();

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            eventBus.emit(`UI:${onBack}`, { currentStep, totalSteps });
        }
    };

    const handleNext = () => {
        if (onNextClick) {
            onNextClick();
        } else {
            eventBus.emit(`UI:${onNext}`, { currentStep, totalSteps });
        }
    };

    const handleComplete = () => {
        if (onCompleteClick) {
            onCompleteClick();
        } else {
            eventBus.emit(`UI:${onComplete}`, { currentStep, totalSteps });
        }
    };

    return (
        <Box
            border
            className={cn(
                'border-t-2 border-x-0 border-b-0 border-black flex justify-between items-center',
                compact ? 'px-4 py-2' : 'px-6 py-4',
                className
            )}
        >
            {/* Back button */}
            {showBack ? (
                <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={isFirstStep}
                >
                    <Icon icon={ChevronLeft} size="sm" />
                    {backLabel}
                </Button>
            ) : (
                <div /> // Spacer for flex justify-between
            )}

            {/* Step counter */}
            <div className="flex items-center gap-2">
                <Typography variant="caption" className="text-neutral-500">
                    Step {currentStep + 1} of {totalSteps}
                </Typography>
            </div>

            {/* Next/Complete button */}
            {isLastStep && showComplete ? (
                <Button
                    variant="primary"
                    onClick={handleComplete}
                    disabled={!isValid}
                >
                    {completeLabel}
                </Button>
            ) : showNext ? (
                <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!isValid}
                >
                    {nextLabel}
                    <Icon icon={ChevronRight} size="sm" />
                </Button>
            ) : (
                <div /> // Spacer for flex justify-between
            )}
        </Box>
    );
};

WizardNavigation.displayName = 'WizardNavigation';

export default WizardNavigation;
