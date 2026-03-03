/**
 * InvitesBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Invites page. The template is a thin wrapper.
 */

import React from "react";
import {
  Plus,
  Search,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  Send,
  Trash2,
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
  type EntityDisplayProps,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

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

export interface InvitesBoardProps extends EntityDisplayProps<InviteData> {
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Event name for create action */
  createEvent: string;
  /** Event name for view action */
  viewEvent: string;
  /** Event name for revoke action */
  revokeEvent: string;
  /** Event name for search action */
  searchEvent: string;
  /** Event name for filter action */
  filterEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusConfig = (
  status: InviteData["status"],
  t: (key: string) => string
) => {
  switch (status) {
    case "pending":
      return { color: "warning" as const, icon: Clock, label: t("invites.statusPending") };
    case "sent":
      return { color: "info" as const, icon: Send, label: t("invites.statusSent") };
    case "redeemed":
      return {
        color: "success" as const,
        icon: CheckCircle,
        label: t("invites.statusRedeemed"),
      };
    case "expired":
      return { color: "neutral" as const, icon: Clock, label: t("invites.statusExpired") };
    case "revoked":
      return { color: "error" as const, icon: XCircle, label: t("invites.statusRevoked") };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

// ── Sub-components ─────────────────────────────────────────────────

const InviteCard: React.FC<{
  invite: InviteData;
}> = ({ invite }) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const statusConfig = getStatusConfig(invite.status, t);
  const StatusIcon = statusConfig.icon;
  const isActive = invite.status === "pending" || invite.status === "sent";

  const handleCopyCode = () => {
    eventBus.emit("UI:COPY_CODE", { row: invite, entity: "Invite" });
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
              <Typography
                variant="small"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("invites.invitedBy", { name: invite.invitedByName || t("invites.unknown") })}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        <HStack
          gap="sm"
          align="center"
          className="bg-neutral-50 rounded-md p-2"
        >
          <Typography variant="small" className="font-mono flex-1">
            {invite.code}
          </Typography>
          <Button variant="ghost" size="sm" onClick={handleCopyCode}>
            <Copy className="h-3 w-3" />
          </Button>
        </HStack>

        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">
              {t("invites.created", { date: new Date(invite.createdAt).toLocaleDateString() })}
            </Typography>
          </HStack>
          {invite.expiresAt && (
            <Typography variant="small">
              {t("invites.expires", { date: new Date(invite.expiresAt).toLocaleDateString() })}
            </Typography>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          {isActive && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => eventBus.emit("UI:RESEND", { row: invite, entity: "Invite" })}
                className="gap-1"
              >
                <Send className="h-3 w-3" />
                {t("invites.resend")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => eventBus.emit("UI:REVOKE", { row: invite, entity: "Invite" })}
                className="gap-1 text-red-600"
              >
                <Trash2 className="h-3 w-3" />
                {t("invites.revoke")}
              </Button>
            </>
          )}
          {invite.status === "redeemed" && (
            <Typography variant="small" className="text-emerald-600">
              {invite.redeemedAt
                ? t("invites.redeemedOn", { date: new Date(invite.redeemedAt).toLocaleDateString() })
                : t("invites.statusRedeemed")}
            </Typography>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

// ── Main Board ─────────────────────────────────────────────────────

export const InvitesBoard: React.FC<InvitesBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  subtitle,
  showHeader = true,
  showSearch = true,
  className,
  createEvent,
  searchEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const invites: readonly InviteData[] = Array.isArray(entity) ? entity : [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "Invite" });
  };

  // Filter invites
  const filteredInvites = invites.filter((inv: InviteData) => {
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
    pending: invites.filter(
      (i: InviteData) => i.status === "pending" || i.status === "sent"
    ).length,
    redeemed: invites.filter((i: InviteData) => i.status === "redeemed").length,
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title || t("invites.title")}</Typography>
            <Typography
              variant="body"
              className="text-[var(--color-muted-foreground)]"
            >
              {subtitle || t("invites.subtitle")}
            </Typography>
          </VStack>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("invites.createInvite")}
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
              {t("invites.total")}
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
              {t("invites.statusPending")}
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
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t("invites.statusRedeemed")}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder={t("invites.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={
              <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            }
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {t("invites.loading")}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t("invites.error", { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Invites Grid */}
      {!isLoading && !error && (
        <>
          {filteredInvites.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Mail className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography
                variant="h3"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("invites.noInvitationsFound")}
              </Typography>
              <Typography
                variant="body"
                className="text-[var(--color-muted-foreground)]"
              >
                {searchTerm || statusFilter !== "all"
                  ? t("invites.tryDifferentFilters")
                  : t("invites.createFirstInvitation")}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInvites.map((invite: InviteData) => (
                <InviteCard
                  key={invite.id}
                  invite={invite}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

InvitesBoard.displayName = "InvitesBoard";
