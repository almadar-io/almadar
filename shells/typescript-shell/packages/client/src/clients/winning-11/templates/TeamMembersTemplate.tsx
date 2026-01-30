/**
 * TeamMembersTemplate
 *
 * Template for the Team Members page (/teams/:id/members).
 * Displays and manages TeamMember entities for a specific team.
 *
 * Page: TeamMembersPage
 * Entity: TeamMember
 * ViewType: list
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Avatar } from "../../../components/atoms/Avatar";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  ArrowLeft,
  Search,
  UserPlus,
  Users,
  Shield,
  Crown,
  Eye,
  Edit,
  UserMinus,
  MoreVertical,
  Calendar,
} from "lucide-react";

export interface TeamMemberData {
  id: string;
  teamId: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  role: "leader" | "member" | "observer";
  status: "active" | "inactive" | "pending";
  trustScore?: number;
  contributionScore?: number;
  joinedAt: string;
  lastActiveAt?: string;
}

export interface TeamMembersTemplateProps {
  /** Team member items to display */
  items?: readonly TeamMemberData[];
  /** Data prop alias */
  data?: readonly TeamMemberData[];
  /** Team name for header */
  teamName?: string;
  /** Team ID */
  teamId?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const getRoleConfig = (role: TeamMemberData["role"]) => {
  switch (role) {
    case "leader":
      return { color: "warning" as const, icon: Crown, label: "Leader" };
    case "member":
      return { color: "info" as const, icon: Users, label: "Member" };
    case "observer":
      return { color: "neutral" as const, icon: Eye, label: "Observer" };
    default:
      return { color: "neutral" as const, icon: Users, label: role };
  }
};

const getStatusColor = (status: TeamMemberData["status"]) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "neutral";
    case "pending":
      return "warning";
    default:
      return "neutral";
  }
};

const MemberCard: React.FC<{
  member: TeamMemberData;
  onAction: (action: string, member: TeamMemberData) => void;
}> = ({ member, onAction }) => {
  const roleConfig = getRoleConfig(member.role);
  const RoleIcon = roleConfig.icon;
  const isLeader = member.role === "leader";

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box className="relative">
              <Avatar name={member.userName || member.userEmail || "User"} size="lg" />
              {isLeader && (
                <Box className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
                  <Crown className="h-3 w-3 text-white" />
                </Box>
              )}
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {member.userName || `User ${member.userId.slice(-4)}`}
              </Typography>
              {member.userEmail && (
                <Typography variant="small" className="text-neutral-500">
                  {member.userEmail}
                </Typography>
              )}
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(member.status)}>{member.status}</Badge>
        </HStack>

        <HStack gap="md" wrap>
          <Badge variant={roleConfig.color} className="gap-1">
            <RoleIcon className="h-3 w-3" />
            {roleConfig.label}
          </Badge>
          {member.trustScore !== undefined && (
            <HStack gap="xs" align="center">
              <Shield className="h-3 w-3 text-blue-500" />
              <Typography variant="small" className="font-medium">
                Trust: {member.trustScore}
              </Typography>
            </HStack>
          )}
          {member.contributionScore !== undefined && (
            <Typography variant="small" className="text-neutral-500">
              Contribution: {member.contributionScore}%
            </Typography>
          )}
        </HStack>

        <HStack gap="md" className="text-neutral-500">
          <HStack gap="xs" align="center">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">
              Joined {new Date(member.joinedAt).toLocaleDateString()}
            </Typography>
          </HStack>
          {member.lastActiveAt && (
            <Typography variant="small">
              Last active {new Date(member.lastActiveAt).toLocaleDateString()}
            </Typography>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", member)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT_ROLE", member)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit Role
          </Button>
          {!isLeader && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("REMOVE", member)}
              className="gap-1 text-red-500 hover:text-red-600"
            >
              <UserMinus className="h-3 w-3" />
              Remove
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const TeamMembersTemplate: React.FC<TeamMembersTemplateProps> = ({
  items,
  data,
  teamName,
  teamId,
  isLoading = false,
  error = null,
  title,
  showBack = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");

  const members = items || data || [];

  // Handle back navigation
  const handleBack = () => {
    eventBus.emit("UI:BACK", {});
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle add member
  const handleAddMember = () => {
    eventBus.emit("UI:ADD_MEMBER", { teamId });
  };

  // Handle member actions
  const handleAction = (action: string, member: TeamMemberData) => {
    eventBus.emit(`UI:${action}`, { row: member, entity: "TeamMember" });
  };

  // Filter members
  const filteredMembers = members.filter((m) => {
    if (roleFilter !== "all" && m.role !== roleFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        m.userName?.toLowerCase().includes(search) ||
        m.userEmail?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: members.length,
    leaders: members.filter((m) => m.role === "leader").length,
    members: members.filter((m) => m.role === "member").length,
    observers: members.filter((m) => m.role === "observer").length,
  };

  const pageTitle = title || (teamName ? `${teamName} Members` : "Team Members");

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
            <Typography variant="h1">{pageTitle}</Typography>
            <Typography variant="body" className="text-neutral-500">
              Manage team members and roles
            </Typography>
          </VStack>
        </HStack>

        <Button variant="primary" onClick={handleAddMember} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </HStack>

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            roleFilter === "all" && "ring-2 ring-blue-500"
          )}
          onClick={() => setRoleFilter("all")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4">{stats.total}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Total
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            roleFilter === "leader" && "ring-2 ring-amber-500"
          )}
          onClick={() => setRoleFilter("leader")}
        >
          <VStack gap="none" align="center">
            <HStack gap="xs" align="center">
              <Crown className="h-4 w-4 text-amber-500" />
              <Typography variant="h4" className="text-amber-600">
                {stats.leaders}
              </Typography>
            </HStack>
            <Typography variant="small" className="text-neutral-500">
              Leaders
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            roleFilter === "member" && "ring-2 ring-blue-500"
          )}
          onClick={() => setRoleFilter("member")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.members}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Members
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            roleFilter === "observer" && "ring-2 ring-neutral-500"
          )}
          onClick={() => setRoleFilter("observer")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-neutral-600">
              {stats.observers}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Observers
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading members...
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            Error: {error.message}
          </Typography>
        </VStack>
      )}

      {/* Members Grid */}
      {!isLoading && !error && (
        <>
          {filteredMembers.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Users className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No members found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || roleFilter !== "all"
                  ? "Try different filters"
                  : "Add members to this team"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onAction={handleAction}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

TeamMembersTemplate.displayName = "TeamMembersTemplate";
