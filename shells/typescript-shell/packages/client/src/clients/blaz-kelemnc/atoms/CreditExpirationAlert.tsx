/**
 * CreditExpirationAlert
 *
 * Alert banner for expiring credits with renewal action.
 * Business retention - prompt credit renewal.
 *
 * Event Contract:
 * - Emits: UI:RENEW_CREDITS - when renew button is clicked
 * - Payload: { expiresAt, credits, entity }
 */

import React, { useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { useEventBus } from "../../../hooks/useEventBus";
import { AlertTriangle, Clock, X } from "lucide-react";

export interface CreditExpirationAlertProps {
  /** Expiration date */
  expiresAt: string | Date;
  /** Credits expiring */
  credits: number;
  /** Trainee ID for context */
  traineeId?: string;
  /** Allow dismissing the alert */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Calculate days until expiration
const getDaysUntilExpiration = (expiresAt: string | Date): number => {
  const expDate = new Date(expiresAt);
  const now = new Date();
  const diffTime = expDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const CreditExpirationAlert: React.FC<CreditExpirationAlertProps> = ({
  expiresAt,
  credits,
  traineeId,
  dismissible = true,
  onDismiss,
  entity = "Credit",
  className,
}) => {
  const eventBus = useEventBus();

  const daysUntilExpiration = useMemo(
    () => getDaysUntilExpiration(expiresAt),
    [expiresAt]
  );

  // Determine urgency level
  const urgency: "critical" | "warning" | "info" = useMemo(() => {
    if (daysUntilExpiration <= 0) return "critical";
    if (daysUntilExpiration <= 3) return "critical";
    if (daysUntilExpiration <= 7) return "warning";
    return "info";
  }, [daysUntilExpiration]);

  const urgencyConfig = {
    critical: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      iconColor: "text-red-500",
      buttonVariant: "primary" as const,
    },
    warning: {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      iconColor: "text-amber-500",
      buttonVariant: "secondary" as const,
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconColor: "text-blue-500",
      buttonVariant: "secondary" as const,
    },
  };

  const config = urgencyConfig[urgency];

  // Emit RENEW_CREDITS event
  const handleRenew = useCallback(() => {
    eventBus.emit("UI:CREATE", {
      traineeId,
      entity,
    });
  }, [eventBus, traineeId, entity]);

  // Don't show if already expired for more than 30 days
  if (daysUntilExpiration < -30) return null;

  // Get message based on days
  const getMessage = () => {
    if (daysUntilExpiration <= 0) {
      return `${credits} credit${credits > 1 ? "s" : ""} expired!`;
    }
    if (daysUntilExpiration === 1) {
      return `${credits} credit${credits > 1 ? "s" : ""} expire${credits > 1 ? "" : "s"} tomorrow!`;
    }
    return `${credits} credit${credits > 1 ? "s" : ""} expire${credits > 1 ? "" : "s"} in ${daysUntilExpiration} days`;
  };

  return (
    <Box
      rounded="lg"
      border
      padding="sm"
      className={cn(config.bgColor, config.borderColor, className)}
    >
      <HStack justify="between" align="center">
        <HStack gap="sm" align="center">
          {urgency === "critical" ? (
            <AlertTriangle className={cn("h-5 w-5", config.iconColor)} />
          ) : (
            <Clock className={cn("h-5 w-5", config.iconColor)} />
          )}
          <Typography variant="body" className={cn("font-medium", config.textColor)}>
            {getMessage()}
          </Typography>
        </HStack>

        <HStack gap="sm" align="center">
          <Button variant={config.buttonVariant} size="sm" onClick={handleRenew}>
            {daysUntilExpiration <= 0 ? "Add Credits" : "Renew Now"}
          </Button>
          {dismissible && onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className={config.textColor}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

CreditExpirationAlert.displayName = "CreditExpirationAlert";
