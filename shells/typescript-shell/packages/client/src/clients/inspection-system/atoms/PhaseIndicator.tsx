/**
 * PhaseIndicator
 *
 * Shows the current phase of an inspection process.
 * Phases: preparation, execution, documentation, review, completed
 *
 * Event Contract:
 * - Emits: none (display only)
 * - entityAware: true
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Badge } from "../../../components/atoms/Badge";
import {
  ClipboardList,
  Play,
  FileText,
  CheckCircle,
  Flag,
  Clock,
} from "lucide-react";

export type InspectionPhase =
  | "preparation"
  | "execution"
  | "documentation"
  | "review"
  | "completed"
  | "cancelled";

export interface PhaseIndicatorProps {
  /** Current inspection phase */
  phase: InspectionPhase;
  /** Show label text */
  showLabel?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

const phaseConfig: Record<
  InspectionPhase,
  {
    icon: typeof ClipboardList;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }
> = {
  preparation: {
    icon: ClipboardList,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "Preparation",
  },
  execution: {
    icon: Play,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    label: "In Progress",
  },
  documentation: {
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    label: "Documentation",
  },
  review: {
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    label: "Under Review",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Completed",
  },
  cancelled: {
    icon: Flag,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Cancelled",
  },
};

const sizeConfig = {
  sm: { icon: "h-3 w-3", text: "text-xs", padding: "px-2 py-0.5" },
  md: { icon: "h-4 w-4", text: "text-sm", padding: "px-2.5 py-1" },
  lg: { icon: "h-5 w-5", text: "text-base", padding: "px-3 py-1.5" },
};

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  phase,
  showLabel = true,
  size = "md",
  className,
}) => {
  const config = phaseConfig[phase];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <Box
      display="inline-flex"
      rounded="full"
      border
      className={cn(
        "items-center gap-1.5",
        config.bgColor,
        config.borderColor,
        sizes.padding,
        className
      )}
    >
      <Icon className={cn(sizes.icon, config.color)} />
      {showLabel && (
        <Typography
          variant="small"
          className={cn(sizes.text, "font-medium", config.color)}
        >
          {config.label}
        </Typography>
      )}
    </Box>
  );
};

PhaseIndicator.displayName = "PhaseIndicator";
