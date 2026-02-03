/**
 * TraineeCard
 *
 * Summary card for a trainee with credits, next session, and quick actions.
 * Trainer dashboard needs quick trainee overview.
 *
 * Maps to User entity from blaz-klemenc.orb (role: trainee):
 * - id: string
 * - email: string
 * - name: string
 * - role: enum (trainer | trainee)
 * - phone: string
 * - profileImage: string
 *
 * Event Contract (matches UserManagement trait):
 * - Emits: UI:VIEW - to view trainee details
 * - Emits: UI:EDIT - to edit trainee
 * - Emits: UI:MESSAGE_TRAINEE - custom event for messaging
 * - Payload: { row: TraineeData, entity: "User" }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import { CreditMeter, type CreditData } from "../atoms/CreditMeter";
import { User, MessageCircle, Calendar, ChevronRight } from "lucide-react";

/**
 * Trainee data (User entity with role: trainee)
 */
export interface TraineeData {
  id?: string;
  email: string;
  name: string;
  role?: "trainer" | "trainee";
  phone?: string;
  profileImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // Extended fields for display
  credits?: CreditData;
  nextSession?: {
    title: string;
    scheduledAt: string | Date;
  };
  totalSessions?: number;
  lastActiveAt?: string | Date;
}

/** Operation definition for action buttons */
export interface TraineeOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export interface TraineeCardProps {
  /** Trainee data */
  trainee?: TraineeData;
  /** Data array for list mode */
  data?: TraineeData[] | unknown[];
  /** Show action buttons */
  showActions?: boolean;
  /** Show credits */
  showCredits?: boolean;
  /** Show progress */
  showProgress?: boolean;
  /** Layout mode */
  layout?: "list" | "grid" | "cards" | string;
  /** Compact mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Operations/actions available */
  operations?: TraineeOperation[];
  /** Additional CSS classes */
  className?: string;
}

// Format date for display
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Format upcoming session date
const formatSessionDate = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 7) {
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const TraineeCard: React.FC<TraineeCardProps> = ({
  trainee,
  data,
  showActions = true,
  compact = false,
  entity = "User",
  className,
}) => {
  const eventBus = useEventBus();

  // Normalize trainee data - can come from trainee prop or data array
  const traineeData: TraineeData | undefined =
    trainee ?? (Array.isArray(data) ? (data[0] as TraineeData) : undefined);

  // Early return if no data
  if (!traineeData) {
    return null;
  }

  // Emit VIEW event (matches UserManagement trait)
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: traineeData, entity });
  }, [eventBus, traineeData, entity]);

  // Emit custom MESSAGE event
  const handleMessage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      eventBus.emit("UI:MESSAGE_TRAINEE", { row: traineeData, entity });
    },
    [eventBus, traineeData, entity],
  );

  if (compact) {
    return (
      <Card
        className={cn("p-3 cursor-pointer hover:bg-neutral-50", className)}
        onClick={handleView}
      >
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            {traineeData.profileImage ? (
              <img
                src={traineeData.profileImage}
                alt={traineeData.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <Box
                display="flex"
                rounded="full"
                className="h-10 w-10 items-center justify-center bg-blue-100"
              >
                <User className="h-5 w-5 text-blue-600" />
              </Box>
            )}
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {traineeData.name}
              </Typography>
              {traineeData.credits && (
                <CreditMeter
                  data={traineeData.credits}
                  compact
                  showActionButton={false}
                />
              )}
            </VStack>
          </HStack>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </HStack>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-md transition-shadow",
        className,
      )}
      onClick={handleView}
    >
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            {traineeData.profileImage ? (
              <img
                src={traineeData.profileImage}
                alt={traineeData.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <Box
                display="flex"
                rounded="full"
                className="h-12 w-12 items-center justify-center bg-blue-100"
              >
                <User className="h-6 w-6 text-blue-600" />
              </Box>
            )}
            <VStack gap="none">
              <Typography variant="h4">{traineeData.name}</Typography>
              <Typography variant="small" className="text-neutral-500">
                {traineeData.email}
              </Typography>
            </VStack>
          </HStack>
          {showActions && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMessage}
              className="text-blue-600 hover:bg-blue-50"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          )}
        </HStack>

        {/* Credits */}
        {traineeData.credits && (
          <CreditMeter
            data={traineeData.credits}
            size="sm"
            showActionButton={false}
          />
        )}

        {/* Next Session */}
        {traineeData.nextSession ? (
          <Box rounded="lg" padding="sm" className="bg-blue-50">
            <HStack gap="sm" align="center">
              <Calendar className="h-4 w-4 text-blue-600" />
              <VStack gap="none">
                <Typography
                  variant="small"
                  className="text-blue-600 font-medium"
                >
                  Next: {traineeData.nextSession.title}
                </Typography>
                <Typography variant="small" className="text-blue-500">
                  {formatSessionDate(traineeData.nextSession.scheduledAt)}
                </Typography>
              </VStack>
            </HStack>
          </Box>
        ) : (
          <Box rounded="lg" padding="sm" className="bg-amber-50">
            <HStack gap="sm" align="center">
              <Calendar className="h-4 w-4 text-amber-600" />
              <Typography variant="small" className="text-amber-600">
                No session scheduled
              </Typography>
            </HStack>
          </Box>
        )}

        {/* Stats */}
        <HStack justify="between" className="text-neutral-500">
          {traineeData.totalSessions !== undefined && (
            <Typography variant="small">
              {traineeData.totalSessions} sessions
            </Typography>
          )}
          {traineeData.lastActiveAt && (
            <Typography variant="small">
              Active {formatDate(traineeData.lastActiveAt)}
            </Typography>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

TraineeCard.displayName = "TraineeCard";
