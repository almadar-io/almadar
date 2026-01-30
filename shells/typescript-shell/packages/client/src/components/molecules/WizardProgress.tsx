/**
 * WizardProgress Component
 *
 * Step progress indicator for multi-step wizards.
 * Shows current step, completed steps, and allows navigation to completed steps.
 *
 * Uses wireframe theme styling (high contrast, sharp edges).
 */
import React from 'react';
import { Check } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { Box } from '../atoms/Box';
import { Icon } from '../atoms/Icon';
import { cn } from '../../lib/cn';

/**
 * Step info needed by WizardProgress.
 * Compatible with WizardContainer's WizardStep (subset of fields).
 */
export interface WizardProgressStep {
    /** Step identifier */
    id: string;
    /** Step title */
    title: string;
    /** Step description (optional) */
    description?: string;
}

export interface WizardProgressProps {
    /** Step definitions (compatible with WizardContainer's WizardStep) */
    steps: WizardProgressStep[];
    /** Current step index (0-based) */
    currentStep: number;
    /** Callback when a completed step is clicked */
    onStepClick?: (stepIndex: number) => void;
    /** Allow clicking on completed steps to navigate back */
    allowNavigation?: boolean;
    /** Compact mode (smaller, no titles) */
    compact?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * WizardProgress - Step progress indicator
 */
export const WizardProgress: React.FC<WizardProgressProps> = ({
    steps,
    currentStep,
    onStepClick,
    allowNavigation = true,
    compact = false,
    className,
}) => {
    const totalSteps = steps.length;

    const handleStepClick = (index: number) => {
        const isCompleted = index < currentStep;
        if (isCompleted && allowNavigation && onStepClick) {
            onStepClick(index);
        }
    };

    return (
        <Box
            border
            className={cn(
                'border-b-2 border-x-0 border-t-0 border-black',
                compact ? 'px-4 py-2' : 'px-6 py-4',
                className
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
                                onClick={() => handleStepClick(index)}
                                disabled={!isCompleted || !allowNavigation}
                                className={cn(
                                    'flex items-center justify-center text-sm font-bold transition-colors',
                                    'border-2 border-black',
                                    compact ? 'w-6 h-6' : 'w-8 h-8',
                                    isActive && 'bg-black text-white',
                                    isCompleted && 'bg-black text-white cursor-pointer hover:bg-neutral-800',
                                    !isActive && !isCompleted && 'bg-white text-black'
                                )}
                            >
                                {isCompleted ? (
                                    <Icon icon={Check} size="sm" />
                                ) : (
                                    index + 1
                                )}
                            </button>

                            {/* Step title (on desktop, not in compact mode) */}
                            {!compact && (
                                <div className={cn(
                                    'hidden md:block',
                                    isActive ? 'text-black font-bold' : 'text-neutral-500'
                                )}>
                                    <Typography variant="small" weight={isActive ? 'bold' : 'normal'}>
                                        {step.title}
                                    </Typography>
                                </div>
                            )}

                            {/* Connector line */}
                            {index < totalSteps - 1 && (
                                <div className={cn(
                                    'flex-1 h-0.5',
                                    index < currentStep ? 'bg-black' : 'bg-neutral-300'
                                )} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </Box>
    );
};

WizardProgress.displayName = 'WizardProgress';

export default WizardProgress;
