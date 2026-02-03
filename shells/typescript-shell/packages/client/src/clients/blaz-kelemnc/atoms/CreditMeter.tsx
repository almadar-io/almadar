/**
 * CreditMeter
 *
 * Visual indicator for remaining session credits with expiration warning.
 * Core business model - trainees purchase credits that expire.
 *
 * Maps to Credit entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - totalCredits: number (1-1000)
 * - remainingCredits: number (>= 0)
 * - expiresAt: timestamp
 * - createdAt: timestamp
 * - updatedAt: timestamp
 *
 * Event Contract (matches CreditManagement trait):
 * - Emits: UI:CREATE - to add new credits
 * - Emits: UI:ADJUST - to adjust existing credits
 * - Payload: { row: CreditData, entity: "Credit" }
 */

import React, { useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Badge } from "../../../components/atoms/Badge";
import { Button } from "../../../components/atoms/Button";
import { useEventBus } from "../../../hooks/useEventBus";
import { Coins, AlertTriangle, Clock } from "lucide-react";

/**
 * Credit entity data matching schema definition
 */
export interface CreditData {
  id?: string;
  traineeId?: string;
  trainerId?: string;
  totalCredits: number;
  remainingCredits: number;
  expiresAt?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/** Operation definition for action buttons */
export interface CreditOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export interface CreditMeterProps {
  /** Credit entity data */
  data?: CreditData | Record<string, unknown>;
  /** Current remaining credits (can also pass directly) */
  remainingCredits?: number;
  /** Total credits purchased (can also pass directly) */
  totalCredits?: number;
  /** Credit expiration date (can also pass directly) */
  expiresAt?: string | Date;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Compact display mode - inline without progress bar */
  compact?: boolean;
  /** Show action button when low */
  showActionButton?: boolean;
  /** Show expiration info */
  showExpiration?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Operations/actions available */
  operations?: CreditOperation[];
  /** Additional CSS classes */
  className?: string;
}

// Calculate days until expiration
const getDaysUntilExpiration = (expiresAt?: string | Date): number | null => {
  if (!expiresAt) return null;
  const expDate = new Date(expiresAt);
  const now = new Date();
  const diffTime = expDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get credit status based on balance and expiration
const getCreditStatus = (
  remainingCredits: number,
  totalCredits: number,
  daysUntilExpiration: number | null,
): "full" | "medium" | "low" | "expiring" | "empty" => {
  if (remainingCredits === 0) return "empty";
  if (daysUntilExpiration !== null && daysUntilExpiration <= 7)
    return "expiring";
  const percentage = (remainingCredits / totalCredits) * 100;
  if (percentage >= 60) return "full";
  if (percentage >= 30) return "medium";
  return "low";
};

// Status configuration
const statusConfig = {
  full: {
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    barColor: "bg-emerald-500",
    label: "Good",
  },
  medium: {
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    barColor: "bg-amber-500",
    label: "Running Low",
  },
  low: {
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    barColor: "bg-red-500",
    label: "Low",
  },
  expiring: {
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    barColor: "bg-orange-500",
    label: "Expiring Soon",
  },
  empty: {
    color: "text-neutral-500",
    bgColor: "bg-neutral-50",
    borderColor: "border-neutral-200",
    barColor: "bg-neutral-300",
    label: "No Credits",
  },
};

const sizeConfig = {
  sm: {
    icon: "h-4 w-4",
    text: "text-sm",
    number: "text-lg",
    bar: "h-1",
    padding: "p-2",
    gap: "xs" as const,
  },
  md: {
    icon: "h-5 w-5",
    text: "text-sm",
    number: "text-2xl",
    bar: "h-1.5",
    padding: "p-3",
    gap: "sm" as const,
  },
  lg: {
    icon: "h-6 w-6",
    text: "text-base",
    number: "text-3xl",
    bar: "h-2",
    padding: "p-4",
    gap: "md" as const,
  },
};

export const CreditMeter: React.FC<CreditMeterProps> = ({
  data,
  remainingCredits: propRemainingCredits,
  totalCredits: propTotalCredits,
  expiresAt: propExpiresAt,
  size = "md",
  compact = false,
  showActionButton = true,
  entity = "Credit",
  className,
}) => {
  const eventBus = useEventBus();
  const sizes = sizeConfig[size];

  // Normalize data - support both data prop and individual props
  const normalizedData = data as CreditData | undefined;
  const remainingCredits =
    normalizedData?.remainingCredits ?? propRemainingCredits ?? 0;
  const totalCredits = normalizedData?.totalCredits ?? propTotalCredits ?? 10;
  const expiresAt = normalizedData?.expiresAt ?? propExpiresAt;

  const creditData: CreditData = normalizedData ?? {
    remainingCredits,
    totalCredits,
    expiresAt,
  };

  const daysUntilExpiration = useMemo(
    () => getDaysUntilExpiration(expiresAt),
    [expiresAt],
  );

  const status = useMemo(
    () => getCreditStatus(remainingCredits, totalCredits, daysUntilExpiration),
    [remainingCredits, totalCredits, daysUntilExpiration],
  );

  const config = statusConfig[status];
  const percentage = Math.min(100, (remainingCredits / totalCredits) * 100);

  // Emit CREATE event to add new credits (matches CreditManagement trait)
  const handleAddCredits = useCallback(() => {
    eventBus.emit("UI:CREATE", {
      row: creditData,
      entity,
    });
  }, [eventBus, creditData, entity]);

  // Emit ADJUST event to adjust credits (matches CreditManagement trait)
  const handleAdjustCredits = useCallback(() => {
    eventBus.emit("UI:ADJUST", {
      row: creditData,
      entity,
    });
  }, [eventBus, creditData, entity]);

  // Compact mode - inline display
  if (compact) {
    return (
      <HStack gap="xs" align="center" className={cn(className)}>
        <Coins className={cn("h-4 w-4", config.color)} />
        <Typography
          variant="label"
          className={cn("font-semibold", config.color)}
        >
          {remainingCredits}
        </Typography>
        {daysUntilExpiration !== null && daysUntilExpiration <= 7 && (
          <Badge variant="warning" size="sm">
            {daysUntilExpiration}d left
          </Badge>
        )}
      </HStack>
    );
  }

  return (
    <Box
      rounded="lg"
      border
      className={cn(
        sizes.padding,
        config.bgColor,
        config.borderColor,
        className,
      )}
    >
      <VStack gap={sizes.gap}>
        {/* Header with icon and credits */}
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="full"
              padding="xs"
              className={cn("items-center justify-center bg-white")}
            >
              <Coins className={cn(sizes.icon, config.color)} />
            </Box>
            <VStack gap="none">
              <Typography variant="small" className="text-neutral-500">
                Credits Remaining
              </Typography>
              <HStack gap="xs" align="baseline">
                <Typography
                  variant="h2"
                  className={cn(sizes.number, "font-bold", config.color)}
                >
                  {remainingCredits}
                </Typography>
                <Typography variant="small" className="text-neutral-400">
                  / {totalCredits}
                </Typography>
              </HStack>
            </VStack>
          </HStack>

          {/* Status badge */}
          <Badge
            variant={
              status === "full"
                ? "success"
                : status === "medium"
                  ? "warning"
                  : status === "low" || status === "empty"
                    ? "danger"
                    : "warning"
            }
            size={size === "sm" ? "sm" : "md"}
          >
            {config.label}
          </Badge>
        </HStack>

        {/* Progress bar */}
        <Box rounded="full" className={cn("w-full bg-white/50", sizes.bar)}>
          <Box
            rounded="full"
            className={cn(
              "transition-all duration-500",
              sizes.bar,
              config.barColor,
            )}
            style={{ width: `${percentage}%` }}
          />
        </Box>

        {/* Expiration warning */}
        {daysUntilExpiration !== null && (
          <HStack gap="xs" align="center">
            {daysUntilExpiration <= 7 ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <Clock className="h-4 w-4 text-neutral-400" />
            )}
            <Typography
              variant="small"
              className={cn(
                daysUntilExpiration <= 7
                  ? "text-orange-600"
                  : "text-neutral-500",
              )}
            >
              {daysUntilExpiration <= 0
                ? "Expired"
                : daysUntilExpiration === 1
                  ? "Expires tomorrow"
                  : `Expires in ${daysUntilExpiration} days`}
            </Typography>
          </HStack>
        )}

        {/* Action buttons when low */}
        {showActionButton &&
          (status === "low" || status === "expiring" || status === "empty") && (
            <HStack gap="sm">
              <Button
                variant="primary"
                size={size === "sm" ? "sm" : "md"}
                onClick={handleAddCredits}
                className="flex-1"
              >
                Add Credits
              </Button>
              {status !== "empty" && (
                <Button
                  variant="secondary"
                  size={size === "sm" ? "sm" : "md"}
                  onClick={handleAdjustCredits}
                >
                  Adjust
                </Button>
              )}
            </HStack>
          )}
      </VStack>
    </Box>
  );
};

CreditMeter.displayName = "CreditMeter";
