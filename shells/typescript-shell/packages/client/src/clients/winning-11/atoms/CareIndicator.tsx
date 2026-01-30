/**
 * CareIndicator
 *
 * Small icon showing what a relationship needs (communication, payment, etc.)
 * Quick visual cues for relationship health needs.
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { MessageCircle, CreditCard, Truck, Star } from "lucide-react";
import { Box } from "../../../components/atoms/Box";

export type CareType = "communication" | "payment" | "delivery" | "feedback";
export type UrgencyLevel = "low" | "medium" | "high";

export interface CareIndicatorProps {
  /** Care type */
  type: CareType;
  /** Urgency level */
  urgency: UrgencyLevel;
  /** Custom tooltip text */
  tooltip?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

const typeConfig = {
  communication: {
    icon: MessageCircle,
    label: "Needs communication",
    defaultTooltip: "This relationship needs attention - reach out!",
  },
  payment: {
    icon: CreditCard,
    label: "Payment pending",
    defaultTooltip: "Payment is pending or overdue",
  },
  delivery: {
    icon: Truck,
    label: "Delivery needed",
    defaultTooltip: "Delivery action required",
  },
  feedback: {
    icon: Star,
    label: "Feedback requested",
    defaultTooltip: "Feedback would strengthen this relationship",
  },
};

const urgencyConfig = {
  low: {
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    pulseColor: "",
  },
  medium: {
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    pulseColor: "",
  },
  high: {
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    pulseColor: "animate-pulse",
  },
};

const sizeConfig = {
  sm: { padding: "xs" as const, icon: "h-3 w-3" },
  md: { padding: "xs" as const, icon: "h-4 w-4" },
  lg: { padding: "sm" as const, icon: "h-5 w-5" },
};

export const CareIndicator: React.FC<CareIndicatorProps> = ({
  type,
  urgency,
  tooltip,
  size = "md",
  className,
}) => {
  const typeConf = typeConfig[type];
  const urgencyConf = urgencyConfig[urgency];
  const sizes = sizeConfig[size];
  const Icon = typeConf.icon;
  const tooltipText = tooltip || typeConf.defaultTooltip;

  return (
    <Box
      display="inline-flex"
      rounded="full"
      border
      padding={sizes.padding}
      className={cn(
        "items-center justify-center",
        urgencyConf.bgColor,
        urgencyConf.borderColor,
        urgencyConf.pulseColor,
        "cursor-help transition-transform hover:scale-110",
        className,
      )}
      title={tooltipText}
    >
      <Icon className={cn(sizes.icon, urgencyConf.color)} />
    </Box>
  );
};

CareIndicator.displayName = "CareIndicator";
