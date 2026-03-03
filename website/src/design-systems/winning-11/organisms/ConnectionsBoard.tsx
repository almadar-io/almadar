/**
 * ConnectionsBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Connections page. The template is a thin wrapper.
 */

import React from "react";
import {
  Search,
  Filter,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  Archive,
  Eye,
  MessageCircle,
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
  Avatar,
  Spinner,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

export interface ConnectionData {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected" | "archived";
  category?:
    | "professional"
    | "personal"
    | "community"
    | "mentor"
    | "mentee";
  requestedAt: string;
  acceptedAt?: string;
  archivedAt?: string;
  lastInteractionAt?: string;
  interactionCount?: number;
  notes?: string;
  isInWaitingRoom?: boolean;
  // Populated fields
  requesterName?: string;
  recipientName?: string;
}

export interface ConnectionsBoardProps extends EntityDisplayProps<ConnectionData> {
  /** Current user ID (to determine incoming vs outgoing) */
  currentUserId?: string;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Show filters */
  showFilters?: boolean;
  /** Event name for create action */
  createEvent: string;
  /** Event name for view action */
  viewEvent: string;
  /** Event name for accept action */
  acceptEvent: string;
  /** Event name for reject action */
  rejectEvent: string;
  /** Event name for search action */
  searchEvent: string;
  /** Event name for filter action */
  filterEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusConfig = (status: ConnectionData["status"]) => {
  switch (status) {
    case "accepted":
      return {
        color: "success" as const,
        icon: UserCheck,
        labelKey: "connections.statusConnected",
      };
    case "pending":
      return { color: "warning" as const, icon: Clock, labelKey: "connections.statusPending" };
    case "rejected":
      return { color: "error" as const, icon: UserX, labelKey: "connections.statusRejected" };
    case "archived":
      return {
        color: "neutral" as const,
        icon: Archive,
        labelKey: "connections.statusArchived",
      };
    default:
      return { color: "neutral" as const, icon: Clock, labelKey: status };
  }
};

const getCategoryColor = (category?: ConnectionData["category"]) => {
  switch (category) {
    case "professional":
      return "info";
    case "personal":
      return "success";
    case "community":
      return "warning";
    case "mentor":
      return "error";
    case "mentee":
      return "neutral";
    default:
      return "neutral";
  }
};

// ── Sub-components ─────────────────────────────────────────────────

const ConnectionCard: React.FC<{
  connection: ConnectionData;
  currentUserId?: string;
}> = ({ connection, currentUserId }) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const statusConfig = getStatusConfig(connection.status);
  const StatusIcon = statusConfig.icon;
  const isIncoming = connection.recipientId === currentUserId;
  const isPending = connection.status === "pending";
  const isAccepted = connection.status === "accepted";

  const displayName = isIncoming
    ? connection.requesterName ||
      t('connections.userFallback', { id: connection.requesterId.slice(-4) })
    : connection.recipientName ||
      t('connections.userFallback', { id: connection.recipientId.slice(-4) });

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Avatar name={displayName} size="md" />
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {displayName}
              </Typography>
              <Typography
                variant="small"
                className="text-[var(--color-muted-foreground)]"
              >
                {isIncoming ? t('connections.incomingRequest') : t('connections.outgoingRequest')}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {t(statusConfig.labelKey)}
          </Badge>
        </HStack>

        {connection.category && (
          <Badge
            variant={getCategoryColor(connection.category)}
            size="sm"
          >
            {connection.category}
          </Badge>
        )}

        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">
              {new Date(connection.requestedAt).toLocaleDateString()}
            </Typography>
          </HStack>
          {connection.interactionCount !== undefined &&
            connection.interactionCount > 0 && (
              <HStack gap="xs" align="center">
                <MessageCircle className="h-3 w-3" />
                <Typography variant="small">
                  {t('connections.interactionCount', { count: connection.interactionCount })}
                </Typography>
              </HStack>
            )}
        </HStack>

        {connection.notes && (
          <Typography
            variant="small"
            className="text-[var(--color-muted-foreground)] line-clamp-2"
          >
            {connection.notes}
          </Typography>
        )}

        <HStack gap="sm" className="pt-2 border-t" wrap>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => eventBus.emit("UI:VIEW", { row: connection, entity: "Connection" })}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t('connections.view')}
          </Button>

          {isPending && isIncoming && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => eventBus.emit("UI:ACCEPT", { row: connection, entity: "Connection" })}
                className="gap-1"
              >
                <UserCheck className="h-3 w-3" />
                {t('connections.accept')}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => eventBus.emit("UI:REJECT", { row: connection, entity: "Connection" })}
                className="gap-1"
              >
                <UserX className="h-3 w-3" />
                {t('connections.reject')}
              </Button>
            </>
          )}

          {isAccepted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => eventBus.emit("UI:ARCHIVE", { row: connection, entity: "Connection" })}
              className="gap-1 text-[var(--color-muted-foreground)]"
            >
              <Archive className="h-3 w-3" />
              {t('connections.archive')}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

// ── Main Board ─────────────────────────────────────────────────────

export const ConnectionsBoard: React.FC<ConnectionsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  currentUserId,
  title,
  subtitle,
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent,
  searchEvent,
  filterEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const resolvedTitle = title ?? t('connections.title');
  const resolvedSubtitle = subtitle ?? t('connections.subtitle');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const connections = Array.isArray(entity) ? entity : entity ? [entity] : [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "Connection" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit(`UI:${filterEvent}`, { entity: "Connection" });
  };

  // Filter connections
  const filteredConnections = connections.filter((conn) => {
    if (statusFilter !== "all" && conn.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        conn.requesterName?.toLowerCase().includes(search) ||
        conn.recipientName?.toLowerCase().includes(search) ||
        conn.notes?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Group by status for stats
  const stats = {
    total: connections.length,
    pending: connections.filter((c) => c.status === "pending").length,
    accepted: connections.filter((c) => c.status === "accepted").length,
    archived: connections.filter((c) => c.status === "archived").length,
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{resolvedTitle}</Typography>
            <Typography
              variant="body"
              className="text-[var(--color-muted-foreground)]"
            >
              {resolvedSubtitle}
            </Typography>
          </VStack>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {t('connections.sendRequest')}
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "all" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter("all")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4">{stats.total}</Typography>
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t('connections.statsTotal')}
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "pending" && "ring-2 ring-amber-500"
          )}
          onClick={() => setStatusFilter("pending")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-amber-600">
              {stats.pending}
            </Typography>
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t('connections.statsPending')}
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "accepted" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("accepted")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.accepted}
            </Typography>
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t('connections.statsConnected')}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder={t('connections.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={
                  <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                }
              />
            </Box>
          )}

          <HStack gap="sm">
            {showFilters && (
              <Button
                variant="secondary"
                onClick={handleFilter}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {t('connections.filter')}
              </Button>
            )}

            {/* Layout toggle */}
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
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('connections.loading')}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t('connections.error', { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Connections Grid/List */}
      {!isLoading && !error && (
        <>
          {filteredConnections.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <UserPlus className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography
                variant="h3"
                className="text-[var(--color-muted-foreground)]"
              >
                {t('connections.emptyTitle')}
              </Typography>
              <Typography
                variant="body"
                className="text-[var(--color-muted-foreground)]"
              >
                {searchTerm || statusFilter !== "all"
                  ? t('connections.emptyFiltered')
                  : t('connections.emptyDefault')}
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
              {filteredConnections.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  connection={connection}
                  currentUserId={currentUserId}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

ConnectionsBoard.displayName = "ConnectionsBoard";
