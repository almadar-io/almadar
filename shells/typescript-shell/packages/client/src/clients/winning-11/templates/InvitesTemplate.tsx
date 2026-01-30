/**
 * InvitesTemplate
 *
 * Template for the Invites page (/invites).
 * Displays Invite entities with management actions.
 *
 * Page: InvitesPage
 * Entity: Invite
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
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Plus,
  Search,
  Filter,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  Send,
  Trash2,
} from "lucide-react";

export interface InviteData {
  id: string;
  email: string;
  code: string;
  status: "pending" | "sent" | "redeemed" | "expired" | "revoked";
  invitedById?: string;
  invitedByName?: string;
  createdAt: string;
  expiresAt?: string;
  redeemedAt?: string;
  redeemedByUserId?: string;
}

export interface InvitesTemplateProps {
  /** Invite items to display */
  items?: readonly InviteData[];
  /** Data prop alias */
  data?: readonly InviteData[];
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

const getStatusConfig = (status: InviteData["status"]) => {
  switch (status) {
    case "pending":
      return { color: "warning" as const, icon: Clock, label: "Pending" };
    case "sent":
      return { color: "info" as const, icon: Send, label: "Sent" };
    case "redeemed":
      return { color: "success" as const, icon: CheckCircle, label: "Redeemed" };
    case "expired":
      return { color: "neutral" as const, icon: Clock, label: "Expired" };
    case "revoked":
      return { color: "error" as const, icon: XCircle, label: "Revoked" };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

const InviteCard: React.FC<{
  invite: InviteData;
  onAction: (action: string, invite: InviteData) => void;
}> = ({ invite, onAction }) => {
  const statusConfig = getStatusConfig(invite.status);
  const StatusIcon = statusConfig.icon;
  const isActive = invite.status === "pending" || invite.status === "sent";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(invite.code);
    onAction("COPY_CODE", invite);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box rounded="full" padding="sm" className="bg-blue-100">
              <Mail className="h-5 w-5 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {invite.email}
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                Invited by {invite.invitedByName || "Unknown"}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        <HStack gap="sm" align="center" className="bg-neutral-50 rounded-md p-2">
          <Typography variant="small" className="font-mono flex-1">
            {invite.code}
          </Typography>
          <Button variant="ghost" size="sm" onClick={handleCopyCode}>
            <Copy className="h-3 w-3" />
          </Button>
        </HStack>

        <HStack gap="md" className="text-neutral-500">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">
              Created {new Date(invite.createdAt).toLocaleDateString()}
            </Typography>
          </HStack>
          {invite.expiresAt && (
            <Typography variant="small">
              Expires {new Date(invite.expiresAt).toLocaleDateString()}
            </Typography>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          {isActive && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onAction("RESEND", invite)}
                className="gap-1"
              >
                <Send className="h-3 w-3" />
                Resend
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAction("REVOKE", invite)}
                className="gap-1 text-red-600"
              >
                <Trash2 className="h-3 w-3" />
                Revoke
              </Button>
            </>
          )}
          {invite.status === "redeemed" && (
            <Typography variant="small" className="text-emerald-600">
              Redeemed {invite.redeemedAt ? new Date(invite.redeemedAt).toLocaleDateString() : ""}
            </Typography>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const InvitesTemplate: React.FC<InvitesTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Invitations",
  subtitle = "Manage platform invitations",
  showHeader = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const invites = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Invite" });
  };

  // Handle invite actions
  const handleAction = (action: string, invite: InviteData) => {
    eventBus.emit(`UI:${action}`, { row: invite, entity: "Invite" });
  };

  // Filter invites
  const filteredInvites = invites.filter((inv) => {
    if (statusFilter !== "all" && inv.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      return inv.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Stats
  const stats = {
    total: invites.length,
    pending: invites.filter((i) => i.status === "pending" || i.status === "sent").length,
    redeemed: invites.filter((i) => i.status === "redeemed").length,
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
            Create Invite
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
            statusFilter === "redeemed" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("redeemed")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.redeemed}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Redeemed
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder="Search by email..."
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
            Loading invitations...
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

      {/* Invites Grid */}
      {!isLoading && !error && (
        <>
          {filteredInvites.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Mail className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No invitations found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try different filters"
                  : "Create your first invitation to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInvites.map((invite) => (
                <InviteCard key={invite.id} invite={invite} onAction={handleAction} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

InvitesTemplate.displayName = "InvitesTemplate";
