/**
 * TeamsBoard
 *
 * Organism containing all logic for the Teams list view.
 * Manages search, type filtering, layout, stats, and team card rendering.
 *
 * Event Contract:
 * - Emits: UI:{createEvent} - when create button is clicked
 * - Emits: UI:{viewEvent} - when view action is clicked on a team
 * - Emits: UI:{editEvent} - when edit action is clicked on a team
 * - Emits: UI:{searchEvent} - when search term changes
 * - Emits: UI:{filterEvent} - when filter is applied
 * - Emits: UI:ADD_MEMBER - when add member action is clicked on a team
 * - Payload: { row: TeamData, entity: "Team" }
 */

import React from "react";
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
  Spinner,
  useEventBus,
  useTranslate,
} from "@almadar/ui";

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

export interface TeamsBoardProps {
  /** Entity data (team items) */
  entity?: readonly TeamData[];
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
  /** Event name for creating a team */
  createEvent?: string;
  /** Event name for viewing a team */
  viewEvent?: string;
  /** Event name for editing a team */
  editEvent?: string;
  /** Event name for search */
  searchEvent?: string;
  /** Event name for filter */
  filterEvent?: string;
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
  viewEvent: string;
  editEvent: string;
}> = ({ team, onAction, viewEvent, editEvent }) => {
  const { t } = useTranslate();
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
              <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                <Star className="h-3 w-3" />
                <Typography variant="small">
                  {t('teams.ledBy', { leader: team.leaderName || `${t('teams.user')} ${team.leaderId.slice(-4)}` })}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(team.status)}>{t(`teams.status.${team.status}`)}</Badge>
        </HStack>

        {team.description && (
          <Typography variant="small" className="text-[var(--color-foreground)] line-clamp-2">
            {team.description}
          </Typography>
        )}

        <HStack gap="md" wrap>
          <Badge variant={getTypeColor(team.type)}>{t(`teams.type.${team.type}`)}</Badge>
          <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
            <Users className="h-3 w-3" />
            <Typography variant="small">{t('teams.membersCount', { count: memberCapacity })}</Typography>
          </HStack>
        </HStack>

        {/* Trust & Cohesion Scores */}
        {(team.averageTrustScore !== undefined ||
          team.cohesionScore !== undefined) && (
          <HStack gap="md">
            {team.averageTrustScore !== undefined && (
              <HStack gap="xs" align="center">
                <Shield className="h-3 w-3 text-blue-500" />
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {t('teams.trustScore', { score: team.averageTrustScore })}
                </Typography>
              </HStack>
            )}
            {team.cohesionScore !== undefined && (
              <HStack gap="xs" align="center">
                <Target className="h-3 w-3 text-emerald-500" />
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {t('teams.cohesionScore', { score: team.cohesionScore })}
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
            onClick={() => onAction(viewEvent, team)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t('teams.view')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction(editEvent, team)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            {t('teams.edit')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("ADD_MEMBER", team)}
            className="gap-1"
          >
            <UserPlus className="h-3 w-3" />
            {t('teams.addMember')}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const TeamsBoard: React.FC<TeamsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Teams",
  subtitle = "Manage your collaborative teams",
  showHeader = true,
  showSearch = true,
  className,
  createEvent = "CREATE",
  viewEvent = "VIEW",
  editEvent = "EDIT",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");

  const teams = entity || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "Team" });
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
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('teams.createTeam')}
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4">{stats.total}</Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teams.totalTeams')}
            </Typography>
          </VStack>
        </Card>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.active}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teams.active')}
            </Typography>
          </VStack>
        </Card>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.totalMembers}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('teams.totalMembers')}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      <HStack justify="between" align="center" wrap gap="sm">
        {showSearch && (
          <Box className="w-full max-w-sm">
            <Input
              placeholder={t('teams.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
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
              {type === "all" ? t('teams.filterAll') : t(`teams.type.${type}`)}
            </Button>
          )
        )}
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {t('teams.loading')}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t('teams.error', { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Teams Grid */}
      {!isLoading && !error && (
        <>
          {filteredTeams.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Users className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t('teams.noTeamsFound')}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm || typeFilter !== "all"
                  ? t('teams.tryDifferentFilters')
                  : t('teams.createFirstTeam')}
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
                <TeamCard
                  key={team.id}
                  team={team}
                  onAction={handleAction}
                  viewEvent={viewEvent}
                  editEvent={editEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

TeamsBoard.displayName = "TeamsBoard";
