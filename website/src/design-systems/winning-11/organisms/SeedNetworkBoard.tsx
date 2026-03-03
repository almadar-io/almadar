/**
 * SeedNetworkBoard
 *
 * Organism containing all logic for the Seed Network list view.
 * Manages search, filtering, stats, and nomination card rendering.
 *
 * Event Contract:
 * - Emits: UI:{createEvent} - when nominate button is clicked
 * - Emits: UI:{viewEvent} - when view action is clicked on a nomination
 * - Emits: UI:{nominateEvent} - when approve/reject action is clicked
 * - Emits: UI:{searchEvent} - when search term changes
 * - Emits: UI:{filterEvent} - when filter is applied
 * - Payload: { row: SeedNominationData, entity: "SeedNomination" }
 */

import React from "react";
import {
  Plus,
  Search,
  Sprout,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
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

export interface SeedNominationData {
  id: string;
  nominatorId: string;
  nominatorName?: string;
  nomineeEmail: string;
  nomineeName?: string;
  status: "pending" | "approved" | "rejected" | "converted";
  reason: string;
  trustEndorsement?: number;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface SeedNetworkBoardProps extends EntityDisplayProps<SeedNominationData> {
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Event name for creating a nomination */
  createEvent?: string;
  /** Event name for viewing a nomination */
  viewEvent?: string;
  /** Event name for approving/rejecting a nomination */
  nominateEvent?: string;
  /** Event name for search */
  searchEvent?: string;
  /** Event name for filter */
  filterEvent?: string;
}

const getStatusConfig = (status: SeedNominationData["status"], t: (key: string) => string) => {
  switch (status) {
    case "approved":
      return { color: "success" as const, icon: CheckCircle, label: t("seed.status.approved") };
    case "pending":
      return { color: "warning" as const, icon: Clock, label: t("seed.status.pending") };
    case "rejected":
      return { color: "error" as const, icon: XCircle, label: t("seed.status.rejected") };
    case "converted":
      return { color: "info" as const, icon: Star, label: t("seed.status.converted") };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

const NominationCard: React.FC<{
  nomination: SeedNominationData;
  viewEvent: string;
}> = ({ nomination, viewEvent }) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const statusConfig = getStatusConfig(nomination.status, t);
  const StatusIcon = statusConfig.icon;
  const isPending = nomination.status === "pending";

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box className="relative">
              <Avatar
                name={nomination.nomineeName || nomination.nomineeEmail}
                size="md"
              />
              <Box className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                <Sprout className="h-3 w-3 text-white" />
              </Box>
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {nomination.nomineeName || nomination.nomineeEmail}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {nomination.nomineeEmail}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        {/* Nominator info */}
        <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
          <User className="h-3 w-3" />
          <Typography variant="small">
            {t("seed.nominatedBy", { name: nomination.nominatorName || t("seed.anonymousUser", { id: nomination.nominatorId.slice(-4) }) })}
          </Typography>
        </HStack>

        {/* Reason */}
        <VStack gap="xs">
          <Typography variant="small" className="text-[var(--color-muted-foreground)]">
            {t("seed.reasonLabel")}
          </Typography>
          <Typography variant="small" className="text-[var(--color-foreground)] line-clamp-2">
            {nomination.reason}
          </Typography>
        </VStack>

        {/* Trust endorsement */}
        {nomination.trustEndorsement !== undefined && (
          <HStack gap="sm" align="center">
            <Star className="h-4 w-4 text-amber-500" />
            <Typography variant="small" className="font-medium">
              {t("seed.trustEndorsement", { value: nomination.trustEndorsement })}
            </Typography>
          </HStack>
        )}

        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">
              {new Date(nomination.createdAt).toLocaleDateString()}
            </Typography>
          </HStack>
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => eventBus.emit(`UI:${viewEvent}`, { row: nomination, entity: "SeedNomination" })}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t("seed.actions.view")}
          </Button>
          {isPending && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => eventBus.emit("UI:APPROVE", { row: nomination, entity: "SeedNomination" })}
                className="gap-1"
              >
                <ThumbsUp className="h-3 w-3" />
                {t("seed.actions.approve")}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => eventBus.emit("UI:REJECT", { row: nomination, entity: "SeedNomination" })}
                className="gap-1"
              >
                <ThumbsDown className="h-3 w-3" />
                {t("seed.actions.reject")}
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const SeedNetworkBoard: React.FC<SeedNetworkBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  subtitle,
  showHeader = true,
  showSearch = true,
  className,
  createEvent = "CREATE",
  viewEvent = "VIEW",
  nominateEvent = "NOMINATE",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const resolvedTitle = title ?? t("seed.title");
  const resolvedSubtitle = subtitle ?? t("seed.subtitle");

  const nominations: readonly SeedNominationData[] = Array.isArray(entity) ? entity : [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "SeedNomination" });
  };

  // Filter nominations
  const filteredNominations = nominations.filter((n: SeedNominationData) => {
    if (statusFilter !== "all" && n.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        n.nomineeEmail.toLowerCase().includes(search) ||
        n.nomineeName?.toLowerCase().includes(search) ||
        n.reason.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: nominations.length,
    pending: nominations.filter((n: SeedNominationData) => n.status === "pending").length,
    approved: nominations.filter((n: SeedNominationData) => n.status === "approved").length,
    converted: nominations.filter((n: SeedNominationData) => n.status === "converted").length,
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Box rounded="lg" padding="sm" className="bg-green-100">
                <Sprout className="h-6 w-6 text-green-600" />
              </Box>
              <Typography variant="h1">{resolvedTitle}</Typography>
            </HStack>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {resolvedSubtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {t("seed.nominateSomeone")}
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("seed.stats.total")}
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("seed.stats.pending")}
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "approved" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("approved")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.approved}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("seed.stats.approved")}
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "converted" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter("converted")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.converted}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("seed.stats.converted")}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder={t("seed.searchPlaceholder")}
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
            {t("seed.loading")}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t("seed.error", { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Nominations Grid */}
      {!isLoading && !error && (
        <>
          {filteredNominations.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Sprout className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t("seed.empty.title")}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm || statusFilter !== "all"
                  ? t("seed.empty.filtered")
                  : t("seed.empty.default")}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNominations.map((nomination: SeedNominationData) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
                  viewEvent={viewEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

SeedNetworkBoard.displayName = "SeedNetworkBoard";
