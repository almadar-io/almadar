/**
 * UserProfileTemplate
 *
 * Template for the User Profile detail page (/users/:id).
 * Displays a single User entity with full details and actions.
 *
 * Page: UserProfilePage
 * Entity: User
 * ViewType: detail
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Avatar } from "../../../components/atoms/Avatar";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
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

export interface UserProfileTemplateProps {
  /** User data to display */
  user?: UserProfileData;
  /** Data prop alias */
  data?: UserProfileData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

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

export const UserProfileTemplate: React.FC<UserProfileTemplateProps> = ({
  user: userProp,
  data,
  isLoading = false,
  error = null,
  showBack = true,
  className,
}) => {
  const eventBus = useEventBus();
  const user = userProp || data;

  // Handle back navigation
  const handleBack = () => {
    eventBus.emit("UI:BACK", {});
  };

  // Handle edit
  const handleEdit = () => {
    if (user) {
      eventBus.emit("UI:EDIT", { row: user, entity: "User" });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
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
        <Typography variant="body" className="text-neutral-500">
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
              <HStack gap="xs" align="center" className="text-neutral-500">
                <Mail className="h-4 w-4" />
                <Typography variant="body">{user.email}</Typography>
              </HStack>
            </VStack>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {user.primaryCategory && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-neutral-500">
                    Primary Category
                  </Typography>
                  <Typography variant="body">{user.primaryCategory}</Typography>
                </VStack>
              )}

              <VStack gap="xs">
                <Typography variant="label" className="text-neutral-500">
                  Connection Slots
                </Typography>
                <HStack gap="xs" align="center">
                  <Users className="h-4 w-4 text-neutral-400" />
                  <Typography variant="body">
                    {user.usedSlots || 0} / {user.connectionSlots || 10} used
                  </Typography>
                </HStack>
              </VStack>

              {user.createdAt && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-neutral-500">
                    Member Since
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                    <Typography variant="body">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                </VStack>
              )}

              {user.lastActiveAt && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-neutral-500">
                    Last Active
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Activity className="h-4 w-4 text-neutral-400" />
                    <Typography variant="body">
                      {new Date(user.lastActiveAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                </VStack>
              )}

              {user.inviteCode && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-neutral-500">
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
              <Typography variant="body" className="text-neutral-500">
                Score ID: {user.trustScoreId}
              </Typography>
            ) : (
              <Typography variant="body" className="text-neutral-400">
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
              <Typography variant="body" className="text-neutral-500">
                Assessment ID: {user.assessmentId}
              </Typography>
            ) : (
              <Typography variant="body" className="text-neutral-400">
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

UserProfileTemplate.displayName = "UserProfileTemplate";
