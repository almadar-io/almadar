/**
 * TeamDetailTemplate
 *
 * Template for the Team Detail page (/teams/:id).
 * Displays a single Team entity with members and metrics.
 *
 * Page: TeamDetailPage
 * Entity: Team
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
  Users,
  Shield,
  Target,
  Star,
  UserPlus,
  UserMinus,
  Settings,
  BarChart3,
  Crown,
} from "lucide-react";

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

export interface TeamDetailTemplateProps {
  /** Team data to display */
  team?: TeamDetailData;
  /** Data prop alias */
  data?: TeamDetailData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

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

const getRoleIcon = (role: TeamMemberData["role"]) => {
  switch (role) {
    case "leader":
      return Crown;
    case "member":
      return Users;
    case "observer":
      return Users;
    default:
      return Users;
  }
};

export const TeamDetailTemplate: React.FC<TeamDetailTemplateProps> = ({
  team: teamProp,
  data,
  isLoading = false,
  error = null,
  showBack = true,
  className,
}) => {
  const eventBus = useEventBus();
  const team = teamProp || data;

  // Handle back navigation
  const handleBack = () => {
    eventBus.emit("UI:BACK", {});
  };

  // Handle edit
  const handleEdit = () => {
    if (team) {
      eventBus.emit("UI:EDIT", { row: team, entity: "Team" });
    }
  };

  // Handle add member
  const handleAddMember = () => {
    if (team) {
      eventBus.emit("UI:ADD_MEMBER", { teamId: team.id });
    }
  };

  // Handle remove member
  const handleRemoveMember = (member: TeamMemberData) => {
    if (team) {
      eventBus.emit("UI:REMOVE_MEMBER", { teamId: team.id, member });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Loading team...
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

  if (!team) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-neutral-500">
          Team not found
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
              Back
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
            Edit
          </Button>
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </HStack>
      </HStack>

      {/* Status and Meta */}
      <HStack gap="md" wrap>
        <Badge variant={getStatusColor(team.status)} size="lg">
          {team.status}
        </Badge>
        <Badge variant={getTypeColor(team.type)} size="lg">
          {team.type}
        </Badge>
        <HStack gap="xs" align="center">
          <Users className="h-4 w-4 text-neutral-500" />
          <Typography variant="body">{memberCapacity} members</Typography>
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
              <Typography variant="h4">About</Typography>
              <Typography variant="body" className="text-neutral-600">
                {team.description || "No description provided."}
              </Typography>
            </VStack>
          </Card>

          {/* Goals */}
          {team.goals && team.goals.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <Typography variant="h4">Team Goals</Typography>
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
                <Typography variant="h4">Team Members</Typography>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddMember}
                  className="gap-1"
                >
                  <UserPlus className="h-3 w-3" />
                  Add Member
                </Button>
              </HStack>

              {team.members && team.members.length > 0 ? (
                <VStack gap="sm">
                  {team.members.map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    return (
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
                                `User ${member.userId.slice(-4)}`}
                            </Typography>
                            {member.role === "leader" && (
                              <Crown className="h-4 w-4 text-amber-500" />
                            )}
                          </HStack>
                          <Typography variant="small" className="text-neutral-500">
                            {member.role} • Joined{" "}
                            {new Date(member.joinedAt).toLocaleDateString()}
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
                    );
                  })}
                </VStack>
              ) : (
                <VStack align="center" className="py-8">
                  <Users className="h-8 w-8 text-neutral-300" />
                  <Typography variant="body" className="text-neutral-400">
                    No members yet
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
              <Typography variant="h4">Team Metrics</Typography>

              {team.averageTrustScore !== undefined && (
                <VStack gap="xs">
                  <HStack justify="between" align="center">
                    <HStack gap="sm" align="center">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <Typography variant="small" className="text-neutral-500">
                        Average Trust Score
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
                      <Typography variant="small" className="text-neutral-500">
                        Cohesion Score
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
              <Typography variant="h4">Team Leader</Typography>
              <HStack gap="sm" align="center">
                <Avatar name={team.leaderName || "Leader"} size="md" />
                <VStack gap="none">
                  <Typography variant="body" className="font-medium">
                    {team.leaderName || `User ${team.leaderId.slice(-4)}`}
                  </Typography>
                  <HStack gap="xs" align="center">
                    <Crown className="h-3 w-3 text-amber-500" />
                    <Typography variant="small" className="text-neutral-500">
                      Team Leader
                    </Typography>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </Card>

          {/* Details Card */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">Details</Typography>
              <VStack gap="sm">
                <HStack justify="between">
                  <Typography variant="small" className="text-neutral-500">
                    Created
                  </Typography>
                  <Typography variant="small">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </Typography>
                </HStack>
                {team.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Last Updated
                    </Typography>
                    <Typography variant="small">
                      {new Date(team.updatedAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}
                {team.maxMembers && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Max Members
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
              <Typography variant="h4">Quick Actions</Typography>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() =>
                  eventBus.emit("UI:VIEW_ANALYTICS", { teamId: team.id })
                }
              >
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() =>
                  eventBus.emit("UI:VIEW_MEMBERS", { teamId: team.id })
                }
              >
                <Users className="h-4 w-4" />
                Manage Members
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </VStack>
  );
};

TeamDetailTemplate.displayName = "TeamDetailTemplate";
