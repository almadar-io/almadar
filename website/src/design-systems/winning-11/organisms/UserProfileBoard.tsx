/**
 * UserProfileBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the User Profile detail page. The template is a thin wrapper.
 */

import React from "react";
import {
  ArrowLeft,
  Edit,
  Mail,
  Calendar,
  Users,
  Shield,
  Star,
  Activity,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Badge,
  Avatar,
  Spinner,
  useEventBus,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "suspended";
  primaryCategory?: string;
  connectionSlots?: number;
  usedSlots?: number;
  isBetaUser?: boolean;
  inviteCode?: string;
  createdAt?: string;
  lastActiveAt?: string;
  assessmentId?: string;
  trustScoreId?: string;
}

export interface UserProfileBoardProps {
  /** Entity data (user profile) */
  entity?: UserProfileData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Event name for edit action */
  editEvent: string;
  /** Event name for back navigation */
  backEvent: string;
  /** Event name for viewing connections */
  viewConnectionsEvent: string;
  /** Event name for viewing teams */
  viewTeamsEvent: string;
  /** Event name for viewing invites */
  viewInvitesEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusColor = (status: UserProfileData["status"]) => {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "suspended":
      return "error";
    default:
      return "neutral";
  }
};

// ── Main Board ─────────────────────────────────────────────────────

export const UserProfileBoard: React.FC<UserProfileBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  showBack = true,
  className,
  editEvent,
  backEvent,
}) => {
  const eventBus = useEventBus();
  const user = entity;

  const handleBack = () => {
    eventBus.emit(`UI:${backEvent}`, {});
  };

  const handleEdit = () => {
    if (user) {
      eventBus.emit(`UI:${editEvent}`, { row: user, entity: "User" });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          Loading user profile...
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          Error: {error.message}
        </Typography>
      </VStack>
    );
  }

  if (!user) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          User not found
        </Typography>
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <HStack gap="md" align="center">
          {showBack && (
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <VStack gap="xs">
            <Typography variant="h1">User Profile</Typography>
          </VStack>
        </HStack>

        <Button variant="primary" onClick={handleEdit} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </HStack>

      {/* Profile Card */}
      <Card className="p-6">
        <HStack gap="lg" align="start" wrap>
          {/* Avatar and basic info */}
          <VStack align="center" gap="md" className="min-w-[150px]">
            <Avatar name={user.name} size="xl" />
            <Badge variant={getStatusColor(user.status)} size="lg">
              {user.status}
            </Badge>
            {user.isBetaUser && (
              <Badge variant="info" className="gap-1">
                <Star className="h-3 w-3" />
                Beta User
              </Badge>
            )}
          </VStack>

          {/* Details */}
          <VStack gap="md" className="flex-1">
            <VStack gap="xs">
              <Typography variant="h2">{user.name}</Typography>
              <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                <Mail className="h-4 w-4" />
                <Typography variant="body">{user.email}</Typography>
              </HStack>
            </VStack>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {user.primaryCategory && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    Primary Category
                  </Typography>
                  <Typography variant="body">{user.primaryCategory}</Typography>
                </VStack>
              )}

              <VStack gap="xs">
                <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                  Connection Slots
                </Typography>
                <HStack gap="xs" align="center">
                  <Users className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="body">
                    {user.usedSlots || 0} / {user.connectionSlots || 10} used
                  </Typography>
                </HStack>
              </VStack>

              {user.createdAt && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    Member Since
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Calendar className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                    <Typography variant="body">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                </VStack>
              )}

              {user.lastActiveAt && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    Last Active
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Activity className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                    <Typography variant="body">
                      {new Date(user.lastActiveAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                </VStack>
              )}

              {user.inviteCode && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    Invite Code
                  </Typography>
                  <Typography variant="body" className="font-mono">
                    {user.inviteCode}
                  </Typography>
                </VStack>
              )}
            </Box>
          </VStack>
        </HStack>
      </Card>

      {/* Related Data Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trust Score Card */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Shield className="h-5 w-5 text-blue-500" />
              <Typography variant="h4">Trust Score</Typography>
            </HStack>
            {user.trustScoreId ? (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                Score ID: {user.trustScoreId}
              </Typography>
            ) : (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                No trust score calculated yet
              </Typography>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                eventBus.emit("UI:VIEW_TRUST_SCORE", { userId: user.id })
              }
            >
              View Trust Details
            </Button>
          </VStack>
        </Card>

        {/* Assessment Card */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Activity className="h-5 w-5 text-emerald-500" />
              <Typography variant="h4">Assessment</Typography>
            </HStack>
            {user.assessmentId ? (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                Assessment ID: {user.assessmentId}
              </Typography>
            ) : (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                No assessment completed yet
              </Typography>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                eventBus.emit("UI:VIEW_ASSESSMENT", { userId: user.id })
              }
            >
              View Assessment
            </Button>
          </VStack>
        </Card>
      </Box>
    </VStack>
  );
};

UserProfileBoard.displayName = "UserProfileBoard";
