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
  useTranslate,
  type EntityDisplayProps,
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

export interface UserProfileBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** Entity (single object) */
  entity?: UserProfileData;
  /** Show back button */
  showBack?: boolean;
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
  const { t } = useTranslate();
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
          {t("profile.loading")}
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          {t("profile.error", { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  if (!user) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t("profile.notFound")}
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
              {t("profile.back")}
            </Button>
          )}
          <VStack gap="xs">
            <Typography variant="h1">{t("profile.title")}</Typography>
          </VStack>
        </HStack>

        <Button variant="primary" onClick={handleEdit} className="gap-2">
          <Edit className="h-4 w-4" />
          {t("profile.editProfile")}
        </Button>
      </HStack>

      {/* Profile Card */}
      <Card className="p-6">
        <HStack gap="lg" align="start" wrap>
          {/* Avatar and basic info */}
          <VStack align="center" gap="md" className="min-w-[150px]">
            <Avatar name={user.name} size="xl" />
            <Badge variant={getStatusColor(user.status)} size="lg">
              {t(`users.status.${user.status}`)}
            </Badge>
            {user.isBetaUser && (
              <Badge variant="info" className="gap-1">
                <Star className="h-3 w-3" />
                {t("profile.betaUser")}
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
                    {t("profile.primaryCategory")}
                  </Typography>
                  <Typography variant="body">{user.primaryCategory}</Typography>
                </VStack>
              )}

              <VStack gap="xs">
                <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                  {t("profile.connectionSlots")}
                </Typography>
                <HStack gap="xs" align="center">
                  <Users className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="body">
                    {t("profile.slotsUsed", { used: user.usedSlots || 0, total: user.connectionSlots || 10 })}
                  </Typography>
                </HStack>
              </VStack>

              {user.createdAt && (
                <VStack gap="xs">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    {t("profile.memberSince")}
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
                    {t("profile.lastActive")}
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
                    {t("profile.inviteCode")}
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
              <Typography variant="h4">{t("profile.trustScore")}</Typography>
            </HStack>
            {user.trustScoreId ? (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t("profile.scoreId", { id: user.trustScoreId })}
              </Typography>
            ) : (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t("profile.noTrustScore")}
              </Typography>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                eventBus.emit("UI:VIEW_TRUST_SCORE", { userId: user.id })
              }
            >
              {t("profile.viewTrustDetails")}
            </Button>
          </VStack>
        </Card>

        {/* Assessment Card */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Activity className="h-5 w-5 text-emerald-500" />
              <Typography variant="h4">{t("profile.assessment")}</Typography>
            </HStack>
            {user.assessmentId ? (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t("profile.assessmentId", { id: user.assessmentId })}
              </Typography>
            ) : (
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t("profile.noAssessment")}
              </Typography>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                eventBus.emit("UI:VIEW_ASSESSMENT", { userId: user.id })
              }
            >
              {t("profile.viewAssessment")}
            </Button>
          </VStack>
        </Card>
      </Box>
    </VStack>
  );
};

UserProfileBoard.displayName = "UserProfileBoard";
