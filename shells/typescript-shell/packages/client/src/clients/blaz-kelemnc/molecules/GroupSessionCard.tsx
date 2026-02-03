/**
 * GroupSessionCard
 *
 * Card for group training sessions with attendee list.
 * Group sessions need different display than personal sessions.
 *
 * Maps to TrainingSession entity (isGroupSession: true) from blaz-klemenc.orb
 *
 * Event Contract:
 * - Emits: UI:VIEW - to view session details
 * - Emits: UI:MANAGE_ATTENDEES - to manage attendee list
 * - Payload: { row: GroupSessionData, entity: "TrainingSession" }
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
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  UserPlus,
  Eye,
  Youtube,
} from "lucide-react";

/**
 * Group session data (TrainingSession with isGroupSession: true)
 */
export interface GroupSessionData {
  id?: string;
  trainerId?: string;
  title: string;
  description?: string;
  scheduledAt: string | Date;
  duration: number;
  youtubeLink?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession: true;
  maxParticipants: number;
  currentParticipants?: number;
  participants?: Array<{
    id: string;
    name: string;
    profileImage?: string;
  }>;
  location?: string;
}

export interface GroupSessionCardProps {
  /** Group session data */
  session: GroupSessionData;
  /** Show attendee avatars */
  showAttendees?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Status configuration
const statusConfig = {
  scheduled: {
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "Scheduled",
  },
  "in-progress": {
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    label: "In Progress",
  },
  completed: {
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    label: "Completed",
  },
  cancelled: {
    color: "text-red-600",
    bgColor: "bg-red-100",
    label: "Cancelled",
  },
};

// Format date for display
const formatSessionDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const GroupSessionCard: React.FC<GroupSessionCardProps> = ({
  session,
  showAttendees = true,
  compact = false,
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();
  const status = session.status || "scheduled";
  const config = statusConfig[status];
  const currentCount =
    session.currentParticipants ?? session.participants?.length ?? 0;
  const spotsLeft = session.maxParticipants - currentCount;
  const isFull = spotsLeft <= 0;

  // Emit VIEW event
  const handleView = useCallback(() => {
    eventBus.emit("UI:VIEW", { row: session, entity });
  }, [eventBus, session, entity]);

  // Emit MANAGE_ATTENDEES event
  const handleManageAttendees = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      eventBus.emit("UI:MANAGE_ATTENDEES", { row: session, entity });
    },
    [eventBus, session, entity],
  );

  if (compact) {
    return (
      <Card
        className={cn("p-3 cursor-pointer hover:bg-neutral-50", className)}
        onClick={handleView}
      >
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className="items-center justify-center bg-purple-100"
            >
              <Users className="h-4 w-4 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="label">{session.title}</Typography>
              <Typography variant="small" className="text-neutral-500">
                {currentCount}/{session.maxParticipants} participants
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={isFull ? "danger" : "success"} size="sm">
            {isFull ? "Full" : `${spotsLeft} spots`}
          </Badge>
        </HStack>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-md transition-shadow",
        status === "cancelled" && "opacity-60",
        className,
      )}
      onClick={handleView}
    >
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="sm"
              className="items-center justify-center bg-purple-100"
            >
              <Users className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="h4">{session.title}</Typography>
              <Badge variant="default" size="sm" className={config.bgColor}>
                <span className={config.color}>{config.label}</span>
              </Badge>
            </VStack>
          </HStack>

          {/* Capacity badge */}
          <Badge
            variant={isFull ? "danger" : spotsLeft <= 3 ? "warning" : "success"}
          >
            {isFull
              ? "Full"
              : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
          </Badge>
        </HStack>

        {/* Description */}
        {session.description && (
          <Typography variant="body" className="text-neutral-600">
            {session.description}
          </Typography>
        )}

        {/* Session Details */}
        <VStack gap="xs">
          <HStack gap="sm" align="center">
            <Calendar className="h-4 w-4 text-neutral-400" />
            <Typography variant="body">
              {formatSessionDate(session.scheduledAt)}
            </Typography>
          </HStack>
          <HStack gap="sm" align="center">
            <Clock className="h-4 w-4 text-neutral-400" />
            <Typography variant="body">{session.duration} minutes</Typography>
          </HStack>
          {session.location && (
            <HStack gap="sm" align="center">
              <MapPin className="h-4 w-4 text-neutral-400" />
              <Typography variant="body">{session.location}</Typography>
            </HStack>
          )}
          {session.youtubeLink && (
            <HStack gap="sm" align="center">
              <Youtube className="h-4 w-4 text-red-500" />
              <Typography variant="small" className="text-red-600">
                Video available
              </Typography>
            </HStack>
          )}
        </VStack>

        {/* Participants */}
        {showAttendees &&
          session.participants &&
          session.participants.length > 0 && (
            <VStack gap="sm">
              <HStack justify="between" align="center">
                <Typography variant="label" className="text-neutral-600">
                  Participants ({currentCount}/{session.maxParticipants})
                </Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleManageAttendees}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </HStack>

              {/* Participant Avatars */}
              <HStack gap="xs" className="flex-wrap">
                {session.participants.slice(0, 5).map((participant) => (
                  <Box
                    key={participant.id}
                    title={participant.name}
                    className="relative"
                  >
                    {participant.profileImage ? (
                      <img
                        src={participant.profileImage}
                        alt={participant.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-white"
                      />
                    ) : (
                      <Box
                        display="flex"
                        rounded="full"
                        className="h-8 w-8 items-center justify-center bg-neutral-200 border-2 border-white"
                      >
                        <Typography variant="small" className="font-medium">
                          {participant.name.charAt(0)}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
                {session.participants.length > 5 && (
                  <Box
                    display="flex"
                    rounded="full"
                    className="h-8 w-8 items-center justify-center bg-neutral-100 border-2 border-white"
                  >
                    <Typography variant="small" className="text-neutral-600">
                      +{session.participants.length - 5}
                    </Typography>
                  </Box>
                )}
              </HStack>
            </VStack>
          )}

        {/* Actions */}
        <HStack gap="sm" className="border-t border-neutral-100 pt-3">
          <Button variant="secondary" size="sm" onClick={handleView}>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {!isFull && status === "scheduled" && (
            <Button variant="primary" size="sm" onClick={handleManageAttendees}>
              <UserPlus className="h-4 w-4 mr-1" />
              Add Participant
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

GroupSessionCard.displayName = "GroupSessionCard";
