/**
 * AgentStatusBadge - Displays the current status of the agent
 *
 * Shows a colored badge with optional pulse animation for active states.
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import {
  Badge,
  HStack,
  Box,
  Typography,
} from '@almadar/ui';

export type AgentStatus =
  | "idle"
  | "running"
  | "complete"
  | "error"
  | "interrupted"
  | "cancelled";

export interface AgentStatusBadgeProps {
  status: AgentStatus;
  /** Optional label override */
  label?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show only the dot indicator */
  dotOnly?: boolean;
}

const statusConfig: Record<
  AgentStatus,
  {
    variant: "neutral" | "info" | "success" | "error" | "warning";
    label: string;
    pulse: boolean;
  }
> = {
  idle: {
    variant: "neutral",
    label: "Ready",
    pulse: false,
  },
  running: {
    variant: "info",
    label: "Running",
    pulse: true,
  },
  complete: {
    variant: "success",
    label: "Complete",
    pulse: false,
  },
  error: {
    variant: "error",
    label: "Error",
    pulse: false,
  },
  interrupted: {
    variant: "warning",
    label: "Awaiting Input",
    pulse: true,
  },
  cancelled: {
    variant: "neutral",
    label: "Cancelled",
    pulse: false,
  },
};

const dotSizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const variantDotColors: Record<string, string> = {
  neutral: "bg-[var(--color-muted-foreground)]",
  info: "bg-[var(--color-info)]",
  success: "bg-[var(--color-success)]",
  error: "bg-[var(--color-error)]",
  warning: "bg-[var(--color-warning)]",
};

export function AgentStatusBadge({
  status,
  label,
  size = "md",
  dotOnly = false,
}: AgentStatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  if (dotOnly) {
    return (
      <Box position="relative" display="inline-block">
        <Box
          className={`${dotSizeClasses[size]} rounded-[var(--radius-full)] ${variantDotColors[config.variant]}`}
        />
        {config.pulse && (
          <Box
            position="absolute"
            className={`inset-0 ${dotSizeClasses[size]} rounded-[var(--radius-full)] ${variantDotColors[config.variant]} animate-ping opacity-75`}
          />
        )}
      </Box>
    );
  }

  return (
    <HStack gap="sm" align="center">
      <Box position="relative" display="inline-block">
        <Box
          className={`${dotSizeClasses[size]} rounded-[var(--radius-full)] ${variantDotColors[config.variant]}`}
        />
        {config.pulse && (
          <Box
            position="absolute"
            className={`inset-0 ${dotSizeClasses[size]} rounded-[var(--radius-full)] ${variantDotColors[config.variant]} animate-ping opacity-75`}
          />
        )}
      </Box>
      <Badge variant={config.variant} size={size}>
        {displayLabel}
      </Badge>
    </HStack>
  );
}

export default AgentStatusBadge;
