/**
 * ConnectionsTemplate
 *
 * Template for the Connections page (/connections).
 * Displays Connection entities with request/accept/reject actions.
 *
 * Page: ConnectionsPage
 * Entity: Connection
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

export interface ConnectionData {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected" | "archived";
  category?: "professional" | "personal" | "community" | "mentor" | "mentee";
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

export interface ConnectionsTemplateProps {
  /** Connection items to display */
  items?: readonly ConnectionData[];
  /** Data prop alias */
  data?: readonly ConnectionData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
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
  /** Additional CSS classes */
  className?: string;
}

const getStatusConfig = (status: ConnectionData["status"]) => {
  switch (status) {
    case "accepted":
      return { color: "success" as const, icon: UserCheck, label: "Connected" };
    case "pending":
      return { color: "warning" as const, icon: Clock, label: "Pending" };
    case "rejected":
      return { color: "error" as const, icon: UserX, label: "Rejected" };
    case "archived":
      return { color: "neutral" as const, icon: Archive, label: "Archived" };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
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

const ConnectionCard: React.FC<{
  connection: ConnectionData;
  currentUserId?: string;
  onAction: (action: string, connection: ConnectionData) => void;
}> = ({ connection, currentUserId, onAction }) => {
  const statusConfig = getStatusConfig(connection.status);
  const StatusIcon = statusConfig.icon;
  const isIncoming = connection.recipientId === currentUserId;
  const isPending = connection.status === "pending";
  const isAccepted = connection.status === "accepted";

  const displayName = isIncoming
    ? connection.requesterName || `User ${connection.requesterId.slice(-4)}`
    : connection.recipientName || `User ${connection.recipientId.slice(-4)}`;

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
              <Typography variant="small" className="text-neutral-500">
                {isIncoming ? "Incoming request" : "Outgoing request"}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        {connection.category && (
          <Badge variant={getCategoryColor(connection.category)} size="sm">
            {connection.category}
          </Badge>
        )}

        <HStack gap="md" className="text-neutral-500">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">
              {new Date(connection.requestedAt).toLocaleDateString()}
            </Typography>
          </HStack>
          {connection.interactionCount !== undefined && connection.interactionCount > 0 && (
            <HStack gap="xs" align="center">
              <MessageCircle className="h-3 w-3" />
              <Typography variant="small">
                {connection.interactionCount} interactions
              </Typography>
            </HStack>
          )}
        </HStack>

        {connection.notes && (
          <Typography variant="small" className="text-neutral-500 line-clamp-2">
            {connection.notes}
          </Typography>
        )}

        <HStack gap="sm" className="pt-2 border-t" wrap>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", connection)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>

          {isPending && isIncoming && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAction("ACCEPT", connection)}
                className="gap-1"
              >
                <UserCheck className="h-3 w-3" />
                Accept
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onAction("REJECT", connection)}
                className="gap-1"
              >
                <UserX className="h-3 w-3" />
                Reject
              </Button>
            </>
          )}

          {isAccepted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("ARCHIVE", connection)}
              className="gap-1 text-neutral-500"
            >
              <Archive className="h-3 w-3" />
              Archive
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const ConnectionsTemplate: React.FC<ConnectionsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  currentUserId,
  title = "My Network",
  subtitle = "Manage your connections",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const connections = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Connection" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit("UI:FILTER", { entity: "Connection" });
  };

  // Handle connection actions
  const handleAction = (action: string, connection: ConnectionData) => {
    eventBus.emit(`UI:${action}`, { row: connection, entity: "Connection" });
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
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Send Request
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
            <Typography variant="small" className="text-neutral-500">
              Total
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
            <Typography variant="small" className="text-neutral-500">
              Pending
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
            <Typography variant="small" className="text-neutral-500">
              Connected
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
                placeholder="Search connections..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
              />
            </Box>
          )}

          <HStack gap="sm">
            {showFilters && (
              <Button variant="secondary" onClick={handleFilter} className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
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
          <Typography variant="body" className="text-neutral-500">
            Loading connections...
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

      {/* Connections Grid/List */}
      {!isLoading && !error && (
        <>
          {filteredConnections.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <UserPlus className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No connections found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try different filters"
                  : "Send your first connection request to get started"}
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

ConnectionsTemplate.displayName = "ConnectionsTemplate";
