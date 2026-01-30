/**
 * GrowthMeter
 *
 * Progress indicator showing relationship growth stage.
 * Visual feedback for relationship growth - reinforces garden metaphor.
 *
 * Maps to RelationshipHealth.visualMetaphor:
 * - seedling, sprout, sapling, tree, flowering
 *
 * Event Contract:
 * - Emits: UI:GROWTH_CLICK (optional) - when clicked
 * - Payload: { visualMetaphor, growthPoints, entity }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Sprout, Leaf, TreeDeciduous, Flower2 } from "lucide-react";
import { useEventBus } from "../../../hooks/useEventBus";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";

/** Visual metaphor values from RelationshipHealth entity */
export type VisualMetaphor =
  | "seedling"
  | "sprout"
  | "sapling"
  | "tree"
  | "flowering";

export interface GrowthMeterProps {
  /** Visual metaphor from RelationshipHealth entity */
  visualMetaphor?: VisualMetaphor;
  /** Growth points from RelationshipHealth entity (0-100+) */
  growthPoints?: number;
  /** Legacy: Growth progress 0-100 (maps to growthPoints) */
  progress?: number;
  /** Growth stage labels */
  stages?: string[];
  /** Show current stage name */
  showStageLabel?: boolean;
  /** Animate progress changes */
  animated?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Entity context for event payload */
  entity?: string;
  /** Event to emit on click */
  event?: string;
  /** Click handler callback */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const defaultStages = ["Seedling", "Sprout", "Sapling", "Tree", "Flowering"];

// Map visualMetaphor to index
const metaphorToIndex: Record<VisualMetaphor, number> = {
  seedling: 0,
  sprout: 1,
  sapling: 2,
  tree: 3,
  flowering: 4,
};

const stageConfig = [
  { icon: Sprout, color: "text-lime-400", bgColor: "bg-lime-100" },
  { icon: Leaf, color: "text-lime-500", bgColor: "bg-lime-200" },
  { icon: TreeDeciduous, color: "text-emerald-500", bgColor: "bg-emerald-200" },
  { icon: TreeDeciduous, color: "text-emerald-600", bgColor: "bg-emerald-300" },
  { icon: Flower2, color: "text-pink-500", bgColor: "bg-pink-200" },
];

const sizeConfig = {
  sm: {
    icon: "h-4 w-4",
    text: "text-xs",
    bar: "h-2",
    stageIcon: "h-3 w-3",
    gap: "sm" as const,
  },
  md: {
    icon: "h-5 w-5",
    text: "text-sm",
    bar: "h-3",
    stageIcon: "h-4 w-4",
    gap: "sm" as const,
  },
  lg: {
    icon: "h-6 w-6",
    text: "text-base",
    bar: "h-4",
    stageIcon: "h-5 w-5",
    gap: "md" as const,
  },
};

export const GrowthMeter: React.FC<GrowthMeterProps> = ({
  visualMetaphor,
  growthPoints,
  progress,
  stages = defaultStages,
  showStageLabel = true,
  animated = true,
  size = "md",
  entity,
  event,
  onClick,
  className,
}) => {
  const eventBus = useEventBus();

  // Normalize progress: use growthPoints if available, else progress
  // Map to 0-100 scale (cap at 100 for display)
  const normalizedProgress = Math.min(100, growthPoints ?? progress ?? 0);

  // Determine stage index from visualMetaphor or calculate from progress
  let stageIndex: number;
  if (visualMetaphor) {
    stageIndex = metaphorToIndex[visualMetaphor];
  } else {
    // Calculate from progress (5 stages: 0-20, 20-40, 40-60, 60-80, 80-100)
    stageIndex = Math.min(4, Math.floor(normalizedProgress / 20));
  }

  const currentStage = stages[stageIndex] || defaultStages[stageIndex];
  const config = stageConfig[stageIndex] || stageConfig[0];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const isClickable = !!(event || onClick);

  // Handle click
  const handleClick = useCallback(() => {
    if (event) {
      eventBus.emit(`UI:${event}`, {
        visualMetaphor,
        growthPoints: normalizedProgress,
        entity,
      });
    }
    onClick?.();
  }, [event, eventBus, visualMetaphor, normalizedProgress, entity, onClick]);

  return (
    <VStack
      gap={sizes.gap}
      className={cn(isClickable && "cursor-pointer", className)}
      onClick={isClickable ? handleClick : undefined}
    >
      {/* Stage icon and label */}
      <HStack gap="sm" align="center">
        <Box rounded="full" padding="xs" className={config.bgColor}>
          <Icon className={cn(sizes.icon, config.color)} />
        </Box>
        {showStageLabel && (
          <Typography
            variant="label"
            className={cn(sizes.text, "font-medium text-neutral-700")}
          >
            {currentStage}
          </Typography>
        )}
        <Typography
          variant="label"
          className={cn("ml-auto font-bold", sizes.text, config.color)}
        >
          {normalizedProgress}%
        </Typography>
      </HStack>

      {/* Progress bar with stage markers */}
      <Box position="relative">
        <Box rounded="full" className={cn("w-full bg-neutral-200", sizes.bar)}>
          <Box
            rounded="full"
            className={cn(
              "bg-gradient-to-r from-lime-400 via-emerald-500 to-pink-500",
              sizes.bar,
              animated && "transition-all duration-700 ease-out",
            )}
            style={{ width: `${normalizedProgress}%` }}
          />
        </Box>

        {/* Stage markers */}
        <HStack
          justify="between"
          className="absolute top-full mt-1 w-full px-0.5"
        >
          {stages.map((stage, idx) => {
            const StageIcon = stageConfig[idx]?.icon || Sprout;
            const isActive = idx <= stageIndex;
            return (
              <VStack
                key={stage}
                align="center"
                className={cn(isActive ? "opacity-100" : "opacity-40")}
              >
                <StageIcon
                  className={cn(
                    sizes.stageIcon,
                    isActive ? stageConfig[idx]?.color : "text-neutral-400",
                  )}
                />
              </VStack>
            );
          })}
        </HStack>
      </Box>
    </VStack>
  );
};

GrowthMeter.displayName = "GrowthMeter";
