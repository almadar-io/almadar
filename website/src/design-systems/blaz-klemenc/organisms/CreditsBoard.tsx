/**
 * CreditsBoard - Organism for the Credits management board
 *
 * Contains all logic, state, filtering, computed stats, and sub-components
 * previously in CreditsTemplate. Accepts declarative event prop strings
 * so the parent template can wire up specific event names.
 *
 * Events Emitted (via string props):
 * - UI:{createEvent} - Add new credits
 * - UI:{editEvent} - Edit credit entry
 * - UI:{adjustEvent} - Adjust credit balance
 * - UI:{deleteEvent} - Remove credits
 * - UI:{searchEvent} - Search credits
 */

import React, { useState } from "react";
import { CreditMeter, CreditData } from "../atoms/CreditMeter";
import { CreditExpirationAlert } from "../atoms/CreditExpirationAlert";
import {
  Plus,
  Search,
  CreditCard,
  AlertTriangle,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  PlusCircle,
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
} from '@almadar/ui';

/** Credit entity data for the credits board */
export interface CreditEntity {
  /** Credit items to display */
  items: readonly CreditData[];
}

export interface CreditsBoardProps {
  /** Credit entity data */
  entity: CreditEntity;
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
  /** Show filters */
  showFilters?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating credits (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for editing credits (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for adjusting credits (emitted as UI:{adjustEvent}) */
  adjustEvent?: string;
  /** Event name for deleting credits (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for searching (emitted as UI:{searchEvent}) */
  searchEvent?: string;
}

// Check if credit is expiring soon (within 7 days)
const isExpiringSoon = (expiresAt: string | Date | undefined): boolean => {
  if (!expiresAt) return false;
  const expDate = new Date(expiresAt);
  const now = new Date();
  const diffDays = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= 7;
};

// Check if credit is expired
const isExpired = (expiresAt: string | Date | undefined): boolean => {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
};

// Format date
const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CreditCard_: React.FC<{
  credit: CreditData;
  adjustEvent?: string;
  editEvent?: string;
  deleteEvent?: string;
}> = ({ credit, adjustEvent, editEvent, deleteEvent }) => {
  const { emit } = useEventBus();
  const expired = isExpired(credit.expiresAt);
  const expiringSoon = isExpiringSoon(credit.expiresAt);
  const usagePercentage =
    credit.totalCredits > 0
      ? ((credit.totalCredits - credit.remainingCredits) / credit.totalCredits) * 100
      : 0;

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-md transition-shadow",
        expired && "border-red-500/25 bg-red-500/10",
        expiringSoon && !expired && "border-amber-500/25 bg-amber-500/10"
      )}
    >
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className={cn(
                "items-center justify-center",
                expired
                  ? "bg-red-500/15"
                  : expiringSoon
                  ? "bg-amber-500/15"
                  : "bg-blue-500/15"
              )}
            >
              <CreditCard
                className={cn(
                  "h-4 w-4",
                  expired
                    ? "text-red-600"
                    : expiringSoon
                    ? "text-amber-600"
                    : "text-blue-600"
                )}
              />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                Credit Package
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Expires: {formatDate(credit.expiresAt)}
              </Typography>
            </VStack>
          </HStack>
          {expired ? (
            <Badge variant="danger">Expired</Badge>
          ) : expiringSoon ? (
            <Badge variant="warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Expiring Soon
            </Badge>
          ) : (
            <Badge variant="success">Active</Badge>
          )}
        </HStack>

        {/* Credit Balance */}
        <VStack gap="sm">
          <HStack justify="between">
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              Credits Remaining
            </Typography>
            <Typography variant="h3">
              {credit.remainingCredits} / {credit.totalCredits}
            </Typography>
          </HStack>
          {/* Progress Bar */}
          <Box rounded="full" className="h-2 w-full bg-[var(--color-border)] overflow-hidden">
            <Box
              className={cn(
                "h-full transition-all",
                usagePercentage >= 80
                  ? "bg-red-500"
                  : usagePercentage >= 50
                  ? "bg-amber-500"
                  : "bg-green-500"
              )}
              style={{ width: `${100 - usagePercentage}%` }}
            />
          </Box>
          <Typography variant="small" className="text-[var(--color-muted-foreground)]">
            {credit.totalCredits - credit.remainingCredits} credits used (
            {usagePercentage.toFixed(0)}%)
          </Typography>
        </VStack>

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t" wrap>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${adjustEvent}`, { row: credit, entity: "Credit" })}
            className="gap-1"
          >
            <PlusCircle className="h-3 w-3" />
            Adjust
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${editEvent}`, { row: credit, entity: "Credit" })}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${deleteEvent}`, { row: credit, entity: "Credit" })}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const CreditsBoard: React.FC<CreditsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Credit Management",
  subtitle = "Manage trainee credit packages and balances",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent = "CREATE",
  editEvent = "EDIT",
  adjustEvent = "ADJUST",
  deleteEvent = "DELETE",
  searchEvent = "SEARCH",
}) => {
  const { emit } = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "expiring" | "expired"
  >("all");

  const credits = entity.items || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    emit(`UI:${searchEvent}`, { searchTerm: value, entity: "Credit" });
  };

  // Handle create
  const handleCreate = () => {
    emit(`UI:${createEvent}`, { entity: "Credit" });
  };

  // Filter credits
  const filteredCredits = credits.filter((credit) => {
    // Status filter
    if (statusFilter !== "all") {
      const expired = isExpired(credit.expiresAt);
      const expiring = isExpiringSoon(credit.expiresAt);

      if (statusFilter === "active" && (expired || expiring)) return false;
      if (statusFilter === "expiring" && !expiring) return false;
      if (statusFilter === "expired" && !expired) return false;
    }

    return true;
  });

  // Calculate stats
  const totalCredits = credits.reduce((sum, c) => sum + c.totalCredits, 0);
  const remainingCredits = credits.reduce((sum, c) => sum + c.remainingCredits, 0);
  const expiredCount = credits.filter((c) => isExpired(c.expiresAt)).length;
  const expiringCount = credits.filter((c) => isExpiringSoon(c.expiresAt)).length;
  const activeCount = credits.filter(
    (c) => !isExpired(c.expiresAt) && !isExpiringSoon(c.expiresAt)
  ).length;

  // Credits expiring soon for alert
  const expiringCredits = credits.filter((c) => isExpiringSoon(c.expiresAt));

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
            Add Credits
          </Button>
        </HStack>
      )}

      {/* Expiration Alerts */}
      {expiringCredits.length > 0 && (
        <Card className="p-4 border-amber-500/25 bg-amber-500/10">
          <HStack gap="sm" align="start">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <VStack gap="xs">
              <Typography variant="body" className="font-medium text-amber-600">
                {expiringCredits.length} credit package(s) expiring soon
              </Typography>
              <Typography variant="small" className="text-amber-600">
                Review and renew credits before they expire to avoid service
                interruption.
              </Typography>
            </VStack>
          </HStack>
        </Card>
      )}

      {/* Stats */}
      <HStack gap="md" wrap>
        <Card className="p-3 flex-1 min-w-[140px]">
          <HStack gap="sm" align="center">
            <CreditCard className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{totalCredits}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Total Credits
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[140px]">
          <HStack gap="sm" align="center">
            <TrendingDown className="h-5 w-5 text-green-500" />
            <VStack gap="none">
              <Typography variant="h3">{remainingCredits}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Remaining
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[140px]">
          <HStack gap="sm" align="center">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <VStack gap="none">
              <Typography variant="h3">{activeCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Active
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[140px]">
          <HStack gap="sm" align="center">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <VStack gap="none">
              <Typography variant="h3">{expiringCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Expiring
              </Typography>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder="Search credits..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
              />
            </Box>
          )}

          {showFilters && (
            <HStack gap="sm">
              <Button
                variant={statusFilter === "all" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All ({credits.length})
              </Button>
              <Button
                variant={statusFilter === "active" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter("active")}
              >
                Active ({activeCount})
              </Button>
              <Button
                variant={statusFilter === "expiring" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter("expiring")}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Expiring ({expiringCount})
              </Button>
              <Button
                variant={statusFilter === "expired" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setStatusFilter("expired")}
              >
                Expired ({expiredCount})
              </Button>
            </HStack>
          )}
        </HStack>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            Loading credits...
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

      {/* Credits Grid */}
      {!isLoading && !error && (
        <>
          {filteredCredits.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <CreditCard className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No credits found
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {statusFilter !== "all"
                  ? "Try changing the filter"
                  : "Add credits for your trainees to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCredits.map((credit) => (
                <CreditCard_
                  key={credit.id}
                  credit={credit}
                  adjustEvent={adjustEvent}
                  editEvent={editEvent}
                  deleteEvent={deleteEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

CreditsBoard.displayName = "CreditsBoard";
