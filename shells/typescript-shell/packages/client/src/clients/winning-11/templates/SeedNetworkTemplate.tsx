/**
 * SeedNetworkTemplate
 *
 * Template for the Seed Network page (/seed-network).
 * Displays seed nominations and network seeding management.
 *
 * Page: SeedNetworkPage
 * Entity: SeedNomination
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

export interface SeedNetworkTemplateProps {
  /** Seed nomination items to display */
  items?: readonly SeedNominationData[];
  /** Data prop alias */
  data?: readonly SeedNominationData[];
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

const getStatusConfig = (status: SeedNominationData["status"]) => {
  switch (status) {
    case "approved":
      return { color: "success" as const, icon: CheckCircle, label: "Approved" };
    case "pending":
      return { color: "warning" as const, icon: Clock, label: "Pending" };
    case "rejected":
      return { color: "error" as const, icon: XCircle, label: "Rejected" };
    case "converted":
      return { color: "info" as const, icon: Star, label: "Converted" };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

const NominationCard: React.FC<{
  nomination: SeedNominationData;
  onAction: (action: string, nomination: SeedNominationData) => void;
}> = ({ nomination, onAction }) => {
  const statusConfig = getStatusConfig(nomination.status);
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
              <Typography variant="small" className="text-neutral-500">
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
        <HStack gap="xs" align="center" className="text-neutral-500">
          <User className="h-3 w-3" />
          <Typography variant="small">
            Nominated by {nomination.nominatorName || `User ${nomination.nominatorId.slice(-4)}`}
          </Typography>
        </HStack>

        {/* Reason */}
        <VStack gap="xs">
          <Typography variant="small" className="text-neutral-500">
            Reason for nomination
          </Typography>
          <Typography variant="small" className="text-neutral-700 line-clamp-2">
            {nomination.reason}
          </Typography>
        </VStack>

        {/* Trust endorsement */}
        {nomination.trustEndorsement !== undefined && (
          <HStack gap="sm" align="center">
            <Star className="h-4 w-4 text-amber-500" />
            <Typography variant="small" className="font-medium">
              Trust Endorsement: {nomination.trustEndorsement}%
            </Typography>
          </HStack>
        )}

        <HStack gap="md" className="text-neutral-500">
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
            onClick={() => onAction("VIEW", nomination)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          {isPending && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAction("APPROVE", nomination)}
                className="gap-1"
              >
                <ThumbsUp className="h-3 w-3" />
                Approve
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onAction("REJECT", nomination)}
                className="gap-1"
              >
                <ThumbsDown className="h-3 w-3" />
                Reject
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const SeedNetworkTemplate: React.FC<SeedNetworkTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Seed Network",
  subtitle = "Nominate trusted individuals to join the network",
  showHeader = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const nominations = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "SeedNomination" });
  };

  // Handle nomination actions
  const handleAction = (action: string, nomination: SeedNominationData) => {
    eventBus.emit(`UI:${action}`, { row: nomination, entity: "SeedNomination" });
  };

  // Filter nominations
  const filteredNominations = nominations.filter((n) => {
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
    pending: nominations.filter((n) => n.status === "pending").length,
    approved: nominations.filter((n) => n.status === "approved").length,
    converted: nominations.filter((n) => n.status === "converted").length,
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
              <Typography variant="h1">{title}</Typography>
            </HStack>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Nominate Someone
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
            statusFilter === "approved" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("approved")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.approved}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Approved
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
            <Typography variant="small" className="text-neutral-500">
              Converted
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder="Search nominations..."
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
            Loading nominations...
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

      {/* Nominations Grid */}
      {!isLoading && !error && (
        <>
          {filteredNominations.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Sprout className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No nominations found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try different filters"
                  : "Be the first to nominate a trusted individual"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNominations.map((nomination) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
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

SeedNetworkTemplate.displayName = "SeedNetworkTemplate";
