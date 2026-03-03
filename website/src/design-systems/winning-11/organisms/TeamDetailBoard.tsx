/**
 * TeamDetailBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Team Detail page. The template is a thin wrapper.
 */

import React from "react";
import {
  ArrowLeft,
  Edit,
  Users,
  Shield,
  Target,
  UserPlus,
  UserMinus,
  Settings,
  BarChart3,
  Crown,
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

export interface TeamMemberData {
  id: string;
  userId: string;
  userName?: string;
  role: "leader" | "member" | "observer";
  trustScore?: number;
  joinedAt: string;
}

export interface TeamDetailData {
  id: string;
  name: string;
  description?: string;
  type: "project" | "department" | "cross-functional" | "temporary";
  status: "active" | "inactive" | "archived";
  leaderId: string;
  leaderName?: string;
  members?: TeamMemberData[];
  memberCount: number;
  maxMembers?: number;
  averageTrustScore?: number;
  cohesionScore?: number;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  goals?: string[];
}

export interface TeamDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** Entity data (single object) */
  entity?: TeamDetailData;
  /** Show back button */
  showBack?: boolean;
  /** Event name for edit action */
  editEvent: string;
  /** Event name for delete action */
  deleteEvent: string;
  /** Event name for back navigation */
  backEvent: string;
  /** Event name for adding a member */
  addMemberEvent: string;
  /** Event name for removing a member */
  removeMemberEvent: string;
  /** Event name for viewing a member */
  viewMemberEvent: string;
  /** Event name for adding a goal */
  addGoalEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getTypeColor = (type: TeamDetailData["type"]) => {
  switch (type) {
    case "project":
      return "info";
    case "department":
      return "success";
    case "cross-functional":
      return "warning";
    case "temporary":
      return "neutral";
    default:
      return "neutral";
  }
};

const getStatusColor = (status: TeamDetailData["status"]) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "warning";
    case "archived":
      return "neutral";
    default:
      return "neutral";
  }
};

// ── Main Board ─────────────────────────────────────────────────────

export const TeamDetailBoard: React.FC<TeamDetailBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  showBack = true,
  className,
  editEvent,
  backEvent,
  addMemberEvent,
  removeMemberEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const team = entity;

  const handleBack = () => {
    eventBus.emit(`UI:${backEvent}`, {});
  };

  const handleEdit = () => {
    if (team) {
      eventBus.emit(`UI:${editEvent}`, { row: team, entity: "Team" });
    }
  };

  const handleAddMember = () => {
    if (team) {
      eventBus.emit(`UI:${addMemberEvent}`, { teamId: team.id });
    }
  };

  const handleRemoveMember = (member: TeamMemberData) => {
    if (team) {
      eventBus.emit(`UI:${removeMemberEvent}`, { teamId: team.id, member });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t('teamDetail.loading')}
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          {t('teamDetail.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  if (!team) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t('teamDetail.notFound')}
        </Typography>
      </VStack>
    );
  }

  const memberCapacity = team.maxMembers
    ? `${team.memberCount}/${team.maxMembers}`
    : team.memberCount.toString();

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <HStack gap="md" align="center">
          {showBack && (
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('teamDetail.back')}
            </Button>
          )}
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Box rounded="lg" padding="sm" className="bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </Box>
              <Typography variant="h1">{team.name}</Typography>
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            {t('teamDetail.edit')}
          </Button>
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            {t('teamDetail.settings')}
          </Button>
        </HStack>
      </HStack>

      {/* Status and Meta */}
      <HStack gap="md" wrap>
        <Badge variant={getStatusColor(team.status)} size="lg">
          {t(`teamDetail.status.${team.status}`)}
        </Badge>
        <Badge variant={getTypeColor(team.type)} size="lg">
          {t(`teamDetail.type.${team.type}`)}
        </Badge>
        <HStack gap="xs" align="center">
          <Users className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          <Typography variant="body">{t('teamDetail.membersCount', { count: memberCapacity })}</Typography>
        </HStack>
        {team.tags?.map((tag) => (
          <Badge key={tag} variant="neutral">
            {tag}
          </Badge>
        ))}
      </HStack>

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <VStack gap="md" className="lg:col-span-2">
          {/* Description */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('teamDetail.about')}</Typography>
              <Typography variant="body" className="text-[var(--color-foreground)]">
                {team.description || t('teamDetail.noDescription')}
              </Typography>
            </VStack>
          </Card>

          {/* Goals */}
          {team.goals && team.goals.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <Typography variant="h4">{t('teamDetail.teamGoals')}</Typography>
                <VStack gap="sm">
                  {team.goals.map((goal, idx) => (
                    <HStack key={idx} gap="sm" align="start">
                      <Target className="h-4 w-4 text-purple-500 mt-0.5" />
                      <Typography variant="body">{goal}</Typography>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}

          {/* Members */}
          <Card className="p-4">
            <VStack gap="md">
              <HStack justify="between" align="center">
                <Typography variant="h4">{t('teamDetail.teamMembers')}</Typography>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddMember}
                  className="gap-1"
                >
                  <UserPlus className="h-3 w-3" />
                  {t('teamDetail.addMember')}
                </Button>
              </HStack>

              {team.members && team.members.length > 0 ? (
                <VStack gap="sm">
                  {team.members.map((member) => (
                    <HStack
                      key={member.id}
                      gap="sm"
                      align="center"
                      className="p-2 rounded-lg hover:bg-neutral-50"
                    >
                      <Avatar name={member.userName || "User"} size="md" />
                      <VStack gap="none" className="flex-1">
                        <HStack gap="sm" align="center">
                          <Typography variant="body" className="font-medium">
                            {member.userName ||
                              t('teamDetail.userFallback', { id: member.userId.slice(-4) })}
                          </Typography>
                          {member.role === "leader" && (
                            <Crown className="h-4 w-4 text-amber-500" />
                          )}
                        </HStack>
                        <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                          {t(`teamDetail.role.${member.role}`)} -- {t('teamDetail.joined', { date: new Date(member.joinedAt).toLocaleDateString() })}
                        </Typography>
                      </VStack>
                      {member.trustScore !== undefined && (
                        <HStack gap="xs" align="center">
                          <Shield className="h-3 w-3 text-blue-500" />
                          <Typography variant="small" className="font-medium">
                            {member.trustScore}
                          </Typography>
                        </HStack>
                      )}
                      {member.role !== "leader" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <VStack align="center" className="py-8">
                  <Users className="h-8 w-8 text-[var(--color-muted-foreground)]" />
                  <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                    {t('teamDetail.noMembers')}
                  </Typography>
                </VStack>
              )}
            </VStack>
          </Card>
        </VStack>

        {/* Right Column - Metrics & Info */}
        <VStack gap="md">
          {/* Metrics Card */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">{t('teamDetail.teamMetrics')}</Typography>

              {team.averageTrustScore !== undefined && (
                <VStack gap="xs">
                  <HStack justify="between" align="center">
                    <HStack gap="sm" align="center">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                        {t('teamDetail.averageTrustScore')}
                      </Typography>
                    </HStack>
                    <Typography variant="h3" className="text-blue-600">
                      {team.averageTrustScore}
                    </Typography>
                  </HStack>
                  <Box className="w-full bg-neutral-200 rounded-full h-2">
                    <Box
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${team.averageTrustScore}%` }}
                    />
                  </Box>
                </VStack>
              )}

              {team.cohesionScore !== undefined && (
                <VStack gap="xs">
                  <HStack justify="between" align="center">
                    <HStack gap="sm" align="center">
                      <Target className="h-4 w-4 text-emerald-500" />
                      <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                        {t('teamDetail.cohesionScore')}
                      </Typography>
                    </HStack>
                    <Typography variant="h3" className="text-emerald-600">
                      {team.cohesionScore}%
                    </Typography>
                  </HStack>
                  <Box className="w-full bg-neutral-200 rounded-full h-2">
                    <Box
                      className="bg-emerald-500 rounded-full h-2"
                      style={{ width: `${team.cohesionScore}%` }}
                    />
                  </Box>
                </VStack>
              )}
            </VStack>
          </Card>

          {/* Leader Card */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('teamDetail.teamLeader')}</Typography>
              <HStack gap="sm" align="center">
                <Avatar name={team.leaderName || "Leader"} size="md" />
                <VStack gap="none">
                  <Typography variant="body" className="font-medium">
                    {team.leaderName || t('teamDetail.userFallback', { id: team.leaderId.slice(-4) })}
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Crown className="h-3 w-3 text-amber-500" />
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('teamDetail.teamLeader')}
                    </Typography>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </Card>

          {/* Details Card */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">{t('teamDetail.details')}</Typography>
              <VStack gap="sm">
                <HStack justify="between">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('teamDetail.created')}
                  </Typography>
                  <Typography variant="small">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </Typography>
                </HStack>
                {team.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('teamDetail.lastUpdated')}
                    </Typography>
                    <Typography variant="small">
                      {new Date(team.updatedAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}
                {team.maxMembers && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('teamDetail.maxMembers')}
                    </Typography>
                    <Typography variant="small">{team.maxMembers}</Typography>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('teamDetail.quickActions')}</Typography>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() =>
                  eventBus.emit("UI:VIEW_ANALYTICS", { teamId: team.id })
                }
              >
                <BarChart3 className="h-4 w-4" />
                {t('teamDetail.viewAnalytics')}
              </Button>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() =>
                  eventBus.emit("UI:VIEW_MEMBERS", { teamId: team.id })
                }
              >
                <Users className="h-4 w-4" />
                {t('teamDetail.manageMembers')}
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </VStack>
  );
};

TeamDetailBoard.displayName = "TeamDetailBoard";
