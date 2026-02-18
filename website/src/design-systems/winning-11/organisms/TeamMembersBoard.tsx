/**
 * TeamMembersBoard
 *
 * Organism containing all logic for the Team Members list view.
 * Manages search, role filtering, stats, and member card rendering.
 *
 * Event Contract:
 * - Emits: UI:{addEvent} - when add member button is clicked
 * - Emits: UI:{viewEvent} - when view action is clicked on a member
 * - Emits: UI:{removeEvent} - when remove action is clicked on a member
 * - Emits: UI:{searchEvent} - when search term changes
 * - Emits: UI:{filterEvent} - when filter is applied
 * - Emits: UI:BACK - when back button is clicked
 * - Emits: UI:EDIT_ROLE - when edit role action is clicked
 * - Payload: { row: TeamMemberData, entity: "TeamMember" }
 */

import React from "react";
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
  Calendar,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Card,
  Badge,
  Avatar,
  Spinner,
  useEventBus,
  useTranslate,
} from "@almadar/ui";

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

export interface TeamMembersBoardProps {
  /** Entity data (team member items) */
  entity?: readonly TeamMemberData[];
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
  /** Event name for adding a member */
  addEvent?: string;
  /** Event name for viewing a member */
  viewEvent?: string;
  /** Event name for removing a member */
  removeEvent?: string;
  /** Event name for search */
  searchEvent?: string;
  /** Event name for filter */
  filterEvent?: string;
}

const getRoleConfig = (role: TeamMemberData["role"]) => {
  switch (role) {
    case "leader":
      return { color: "warning" as const, icon: Crown, labelKey: "teamMembers.roleLeader" };
    case "member":
      return { color: "info" as const, icon: Users, labelKey: "teamMembers.roleMember" };
    case "observer":
      return { color: "neutral" as const, icon: Eye, labelKey: "teamMembers.roleObserver" };
    default:
      return { color: "neutral" as const, icon: Users, labelKey: "teamMembers.roleMember" };
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
  viewEvent: string;
  removeEvent: string;
}> = ({ member, onAction, viewEvent, removeEvent }) => {
  const { t } = useTranslate();
  const roleConfig = getRoleConfig(member.role);
  const RoleIcon = roleConfig.icon;
  const isLeader = member.role === "leader";

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box className="relative">
              <Avatar name={member.userName || member.userEmail || t('teamMembers.defaultUser')} size="lg" />
              {isLeader && (
                <Box className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
                  <Crown className="h-3 w-3 text-white" />
                </Box>
              )}
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {member.userName || t('teamMembers.userFallback', { id: member.userId.slice(-4) })}
              </Typography>
              {member.userEmail && (
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {member.userEmail}
                </Typography>
              )}
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(member.status)}>{t(`teamMembers.status${member.status.charAt(0).toUpperCase()}${member.status.slice(1)}`)}</Badge>
        </HStack>

        <HStack gap="md" wrap>
          <Badge variant={roleConfig.color} className="gap-1">
            <RoleIcon className="h-3 w-3" />
            {t(roleConfig.labelKey)}
          </Badge>
          {member.trustScore !== undefined && (
            <HStack gap="xs" align="center">
              <Shield className="h-3 w-3 text-blue-500" />
              <Typography variant="small" className="font-medium">
                {t('teamMembers.trustScore', { score: member.trustScore })}
              </Typography>
            </HStack>
          )}
          {member.contributionScore !== undefined && (
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.contributionScore', { score: member.contributionScore })}
            </Typography>
          )}
        </HStack>

        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">
              {t('teamMembers.joinedDate', { date: new Date(member.joinedAt).toLocaleDateString() })}
            </Typography>
          </HStack>
          {member.lastActiveAt && (
            <Typography variant="small">
              {t('teamMembers.lastActiveDate', { date: new Date(member.lastActiveAt).toLocaleDateString() })}
            </Typography>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction(viewEvent, member)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t('teamMembers.actionView')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT_ROLE", member)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            {t('teamMembers.actionEditRole')}
          </Button>
          {!isLeader && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction(removeEvent, member)}
              className="gap-1 text-red-500 hover:text-red-600"
            >
              <UserMinus className="h-3 w-3" />
              {t('teamMembers.actionRemove')}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const TeamMembersBoard: React.FC<TeamMembersBoardProps> = ({
  entity,
  teamName,
  teamId,
  isLoading = false,
  error = null,
  title,
  showBack = true,
  showSearch = true,
  className,
  addEvent = "ADD_MEMBER",
  viewEvent = "VIEW",
  removeEvent = "REMOVE",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
}) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");

  const members = entity || [];

  // Handle back navigation
  const handleBack = () => {
    eventBus.emit("UI:BACK", {});
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle add member
  const handleAddMember = () => {
    eventBus.emit(`UI:${addEvent}`, { teamId });
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

  const pageTitle = title || (teamName ? t('teamMembers.titleWithTeam', { teamName }) : t('teamMembers.title'));

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <HStack gap="md" align="center">
          {showBack && (
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('teamMembers.back')}
            </Button>
          )}
          <VStack gap="xs">
            <Typography variant="h1">{pageTitle}</Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.subtitle')}
            </Typography>
          </VStack>
        </HStack>

        <Button variant="primary" onClick={handleAddMember} className="gap-2">
          <UserPlus className="h-4 w-4" />
          {t('teamMembers.addMember')}
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.statTotal')}
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.statLeaders')}
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.statMembers')}
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
            <Typography variant="h4" className="text-[var(--color-foreground)]">
              {stats.observers}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teamMembers.statObservers')}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder={t('teamMembers.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {t('teamMembers.loading')}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t('teamMembers.error', { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Members Grid */}
      {!isLoading && !error && (
        <>
          {filteredMembers.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Users className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t('teamMembers.noMembersFound')}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm || roleFilter !== "all"
                  ? t('teamMembers.tryDifferentFilters')
                  : t('teamMembers.addMembersPrompt')}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onAction={handleAction}
                  viewEvent={viewEvent}
                  removeEvent={removeEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

TeamMembersBoard.displayName = "TeamMembersBoard";
