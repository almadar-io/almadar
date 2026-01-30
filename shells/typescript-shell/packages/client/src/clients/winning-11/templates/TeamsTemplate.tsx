/**
 * TeamsTemplate
 *
 * Template for the Teams list page (/teams).
 * Displays Team entities with collaboration features.
 *
 * Page: TeamsPage
 * Entity: Team
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
  Plus,
  Search,
  Users,
  Shield,
  Target,
  Star,
  Eye,
  Edit,
  UserPlus,
  LayoutGrid,
  List,
} from "lucide-react";

export interface TeamData {
  id: string;
  name: string;
  description?: string;
  type: "project" | "department" | "cross-functional" | "temporary";
  status: "active" | "inactive" | "archived";
  leaderId: string;
  leaderName?: string;
  memberCount: number;
  maxMembers?: number;
  averageTrustScore?: number;
  cohesionScore?: number;
  createdAt: string;
  tags?: string[];
}

export interface TeamsTemplateProps {
  /** Team items to display */
  items?: readonly TeamData[];
  /** Data prop alias */
  data?: readonly TeamData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const getTypeColor = (type: TeamData["type"]) => {
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

const getStatusColor = (status: TeamData["status"]) => {
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

const TeamCard: React.FC<{
  team: TeamData;
  onAction: (action: string, team: TeamData) => void;
}> = ({ team, onAction }) => {
  const memberCapacity = team.maxMembers
    ? `${team.memberCount}/${team.maxMembers}`
    : team.memberCount.toString();

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box rounded="lg" padding="sm" className="bg-purple-100">
              <Users className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {team.name}
              </Typography>
              <HStack gap="xs" align="center" className="text-neutral-500">
                <Star className="h-3 w-3" />
                <Typography variant="small">
                  Led by {team.leaderName || `User ${team.leaderId.slice(-4)}`}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(team.status)}>{team.status}</Badge>
        </HStack>

        {team.description && (
          <Typography variant="small" className="text-neutral-600 line-clamp-2">
            {team.description}
          </Typography>
        )}

        <HStack gap="md" wrap>
          <Badge variant={getTypeColor(team.type)}>{team.type}</Badge>
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Users className="h-3 w-3" />
            <Typography variant="small">{memberCapacity} members</Typography>
          </HStack>
        </HStack>

        {/* Trust & Cohesion Scores */}
        {(team.averageTrustScore !== undefined ||
          team.cohesionScore !== undefined) && (
          <HStack gap="md">
            {team.averageTrustScore !== undefined && (
              <HStack gap="xs" align="center">
                <Shield className="h-3 w-3 text-blue-500" />
                <Typography variant="small" className="text-neutral-600">
                  Trust: {team.averageTrustScore}
                </Typography>
              </HStack>
            )}
            {team.cohesionScore !== undefined && (
              <HStack gap="xs" align="center">
                <Target className="h-3 w-3 text-emerald-500" />
                <Typography variant="small" className="text-neutral-600">
                  Cohesion: {team.cohesionScore}%
                </Typography>
              </HStack>
            )}
          </HStack>
        )}

        {team.tags && team.tags.length > 0 && (
          <HStack gap="xs" wrap>
            {team.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="neutral" size="sm">
                {tag}
              </Badge>
            ))}
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", team)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", team)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("ADD_MEMBER", team)}
            className="gap-1"
          >
            <UserPlus className="h-3 w-3" />
            Add Member
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const TeamsTemplate: React.FC<TeamsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Teams",
  subtitle = "Manage your collaborative teams",
  showHeader = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");

  const teams = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Team" });
  };

  // Handle team actions
  const handleAction = (action: string, team: TeamData) => {
    eventBus.emit(`UI:${action}`, { row: team, entity: "Team" });
  };

  // Filter teams
  const filteredTeams = teams.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        t.name.toLowerCase().includes(search) ||
        t.description?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: teams.length,
    active: teams.filter((t) => t.status === "active").length,
    totalMembers: teams.reduce((sum, t) => sum + t.memberCount, 0),
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Team
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4">{stats.total}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Total Teams
            </Typography>
          </VStack>
        </Card>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.active}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Active
            </Typography>
          </VStack>
        </Card>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.totalMembers}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Total Members
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      <HStack justify="between" align="center" wrap gap="sm">
        {showSearch && (
          <Box className="w-full max-w-sm">
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            />
          </Box>
        )}

        <HStack gap="sm">
          <HStack gap="xs" className="border rounded-md p-1">
            <Button
              variant={layout === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setLayout("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setLayout("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </HStack>
        </HStack>
      </HStack>

      {/* Type Filter */}
      <HStack gap="sm" wrap>
        {["all", "project", "department", "cross-functional", "temporary"].map(
          (type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTypeFilter(type)}
            >
              {type === "all" ? "All" : type}
            </Button>
          )
        )}
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading teams...
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

      {/* Teams Grid */}
      {!isLoading && !error && (
        <>
          {filteredTeams.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Users className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No teams found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || typeFilter !== "all"
                  ? "Try different filters"
                  : "Create your first team to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box
              className={cn(
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              )}
            >
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} team={team} onAction={handleAction} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

TeamsTemplate.displayName = "TeamsTemplate";
