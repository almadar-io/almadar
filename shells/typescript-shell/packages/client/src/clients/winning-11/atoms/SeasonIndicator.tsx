/**
 * SeasonIndicator
 *
 * Shows current season/phase in the agricultural cycle.
 * Contextualizes actions within agricultural seasons.
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Sprout, Sun, Wheat, Snowflake } from "lucide-react";
import { Box } from "../../../components/atoms/Box";
import { HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";

export type SeasonPhase = "planting" | "growing" | "harvest" | "rest";

export interface SeasonIndicatorProps {
  /** Current season */
  season: SeasonPhase;
  /** Progress through season (0-100) */
  progress?: number;
  /** Show season label */
  showLabel?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

const seasonConfig = {
  planting: {
    icon: Sprout,
    label: "Planting Season",
    color: "text-lime-600",
    bgColor: "bg-lime-100",
    borderColor: "border-lime-300",
    gradientFrom: "from-lime-400",
    gradientTo: "to-lime-600",
  },
  growing: {
    icon: Sun,
    label: "Growing Season",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-300",
    gradientFrom: "from-amber-400",
    gradientTo: "to-amber-600",
  },
  harvest: {
    icon: Wheat,
    label: "Harvest Season",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
  rest: {
    icon: Snowflake,
    label: "Rest Season",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
};

const sizeConfig = {
  sm: {
    gap: "xs" as const,
    icon: "h-3.5 w-3.5",
    text: "text-xs",
    progress: "h-1 w-12",
  },
  md: {
    gap: "sm" as const,
    icon: "h-4 w-4",
    text: "text-sm",
    progress: "h-1.5 w-16",
  },
  lg: {
    gap: "sm" as const,
    icon: "h-5 w-5",
    text: "text-base",
    progress: "h-2 w-20",
  },
};

export const SeasonIndicator: React.FC<SeasonIndicatorProps> = ({
  season,
  progress,
  showLabel = true,
  size = "md",
  className,
}) => {
  const config = seasonConfig[season];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <HStack
      gap={sizes.gap}
      align="center"
      className={cn(
        "inline-flex rounded-full border px-3 py-1.5",
        config.bgColor,
        config.borderColor,
        className,
      )}
    >
      <Icon className={cn(sizes.icon, config.color)} />

      {showLabel && (
        <Typography
          variant="label"
          className={cn(sizes.text, "font-medium", config.color)}
        >
          {config.label}
        </Typography>
      )}

      {progress !== undefined && (
        <Box rounded="full" className={cn("bg-white/50", sizes.progress)}>
          <Box
            rounded="full"
            className={cn(
              "h-full bg-gradient-to-r transition-all duration-500",
              config.gradientFrom,
              config.gradientTo,
            )}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </Box>
      )}
    </HStack>
  );
};

SeasonIndicator.displayName = "SeasonIndicator";
