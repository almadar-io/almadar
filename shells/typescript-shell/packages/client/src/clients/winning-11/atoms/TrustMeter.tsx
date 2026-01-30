/**
 * TrustMeter
 *
 * Visual indicator for trust level between connections.
 * Core UI for visualizing trust - the main value prop of Winning-11.
 *
 * Maps to RelationshipHealth.healthStatus:
 * - thriving, healthy, declining, withering
 *
 * Event Contract:
 * - Emits: UI:TRUST_CLICK (optional) - when clickable and clicked
 * - Payload: { healthStatus, growthPoints, entity }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Shield, ShieldCheck, ShieldAlert, Award } from "lucide-react";
import { useEventBus } from "../../../hooks/useEventBus";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";

/** Health status values from RelationshipHealth entity */
export type HealthStatus = "thriving" | "healthy" | "declining" | "withering";

/** Legacy level type for backwards compatibility */
export type TrustLevel = "low" | "medium" | "high" | "verified";

export interface TrustMeterProps {
  /** Health status from RelationshipHealth entity */
  healthStatus?: HealthStatus;
  /** Legacy: Trust level (maps to healthStatus) */
  level?: TrustLevel;
  /** Growth points from RelationshipHealth entity */
  growthPoints?: number;
  /** Numeric trust score (0-100) - legacy */
  score?: number;
  /** Show text label */
  showLabel?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Entity context for event payload */
  entity?: string;
  /** Event to emit on click (enables clickable mode) */
  event?: string;
  /** Click handler callback */
  onClick?: () => void;
}

// Map healthStatus to display config
const healthStatusConfig: Record<
  HealthStatus,
  {
    icon: typeof Shield;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
    barColor: string;
    defaultScore: number;
  }
> = {
  withering: {
    icon: ShieldAlert,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Needs Attention",
    barColor: "bg-red-500",
    defaultScore: 20,
  },
  declining: {
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    label: "Declining",
    barColor: "bg-amber-500",
    defaultScore: 45,
  },
  healthy: {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    label: "Healthy",
    barColor: "bg-emerald-500",
    defaultScore: 75,
  },
  thriving: {
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "Thriving",
    barColor: "bg-blue-600",
    defaultScore: 95,
  },
};

// Map legacy level to healthStatus
const levelToHealthStatus: Record<TrustLevel, HealthStatus> = {
  low: "withering",
  medium: "declining",
  high: "healthy",
  verified: "thriving",
};

const sizeConfig = {
  sm: { icon: "h-4 w-4", text: "text-xs", bar: "h-1", gap: "xs" as const },
  md: { icon: "h-5 w-5", text: "text-sm", bar: "h-1.5", gap: "sm" as const },
  lg: { icon: "h-6 w-6", text: "text-base", bar: "h-2", gap: "sm" as const },
};

export const TrustMeter: React.FC<TrustMeterProps> = ({
  healthStatus,
  level,
  growthPoints,
  score,
  showLabel = true,
  size = "md",
  className,
  entity,
  event,
  onClick,
}) => {
  const eventBus = useEventBus();

  // Normalize healthStatus: prefer healthStatus, fall back to level mapping
  const normalizedStatus: HealthStatus =
    healthStatus ?? (level ? levelToHealthStatus[level] : "healthy");

  const config = healthStatusConfig[normalizedStatus];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  // Calculate display score: use growthPoints, score, or default
  const displayScore = growthPoints ?? score ?? config.defaultScore;

  const isClickable = !!(event || onClick);

  // Handle click - emit event and/or call callback
  const handleClick = useCallback(() => {
    if (event) {
      eventBus.emit(`UI:${event}`, {
        healthStatus: normalizedStatus,
        growthPoints: displayScore,
        entity,
      });
    }
    onClick?.();
  }, [event, eventBus, normalizedStatus, displayScore, entity, onClick]);

  return (
    <HStack
      gap={sizes.gap}
      align="center"
      className={cn(
        isClickable && "cursor-pointer hover:opacity-80 transition-opacity",
        className,
      )}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e: React.KeyboardEvent) => e.key === "Enter" && handleClick()
          : undefined
      }
    >
      <Box
        display="flex"
        rounded="full"
        padding="xs"
        border
        className={cn(
          "items-center justify-center",
          config.bgColor,
          config.borderColor,
        )}
      >
        <Icon className={cn(sizes.icon, config.color)} />
      </Box>

      <VStack gap="none">
        {showLabel && (
          <Typography
            variant="label"
            className={cn(sizes.text, "font-medium text-neutral-700")}
          >
            {config.label}
          </Typography>
        )}

        <HStack gap="sm" align="center">
          <Box rounded="full" className={cn("w-16 bg-neutral-200", sizes.bar)}>
            <Box
              rounded="full"
              className={cn(
                "transition-all duration-500",
                sizes.bar,
                config.barColor,
              )}
              style={{ width: `${Math.min(100, displayScore)}%` }}
            />
          </Box>
          <Typography
            variant="small"
            className={cn("font-medium", config.color)}
          >
            {displayScore}
          </Typography>
        </HStack>
      </VStack>
    </HStack>
  );
};

TrustMeter.displayName = "TrustMeter";
