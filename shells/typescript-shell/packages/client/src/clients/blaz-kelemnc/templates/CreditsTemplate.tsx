/**
 * CreditsTemplate
 *
 * Template for the Credits management page (/credits).
 * Displays Credit entities with balance tracking and expiration alerts.
 *
 * Page: CreditsPage
 * Entity: Credit
 * ViewType: list
 * Trait: CreditManagement
 *
 * Event Contract:
 * - Emits: UI:CREATE - add new credits
 * - Emits: UI:EDIT - edit credit entry
 * - Emits: UI:ADJUST - adjust credit balance
 * - Emits: UI:DELETE - remove credits
 */

import React, { useState, useCallback } from "react";
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
import { CreditMeter, CreditData } from "../atoms/CreditMeter";
import { CreditExpirationAlert } from "../atoms/CreditExpirationAlert";
import {
  Plus,
  Search,
  CreditCard,
  Users,
  AlertTriangle,
  Calendar,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

export interface CreditsTemplateProps {
  /** Credit items to display */
  items?: readonly CreditData[];
  /** Data prop alias */
  data?: readonly CreditData[];
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
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
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

// Get days until expiration
const getDaysUntilExpiration = (expiresAt: string | Date | undefined): number | null => {
  if (!expiresAt) return null;
  const expDate = new Date(expiresAt);
  const now = new Date();
  return Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

const CreditCard_: React.FC<{
  credit: CreditData;
  onAction: (action: string, credit: CreditData) => void;
}> = ({ credit, onAction }) => {
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
        expired && "border-red-200 bg-red-50",
        expiringSoon && !expired && "border-amber-200 bg-amber-50"
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
                  ? "bg-red-100"
                  : expiringSoon
                  ? "bg-amber-100"
                  : "bg-blue-100"
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
              <Typography variant="small" className="text-neutral-500">
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
            <Typography variant="body" className="text-neutral-500">
              Credits Remaining
            </Typography>
            <Typography variant="h3">
              {credit.remainingCredits} / {credit.totalCredits}
            </Typography>
          </HStack>
          {/* Progress Bar */}
          <Box rounded="full" className="h-2 w-full bg-neutral-200 overflow-hidden">
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
          <Typography variant="small" className="text-neutral-500">
            {credit.totalCredits - credit.remainingCredits} credits used (
            {usagePercentage.toFixed(0)}%)
          </Typography>
        </VStack>

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t" wrap>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("ADJUST", credit)}
            className="gap-1"
          >
            <PlusCircle className="h-3 w-3" />
            Adjust
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", credit)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("DELETE", credit)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const CreditsTemplate: React.FC<CreditsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Credit Management",
  subtitle = "Manage trainee credit packages and balances",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  entity = "Credit",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "expiring" | "expired"
  >("all");

  const credits = items || data || [];

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      eventBus.emit("UI:SEARCH", { searchTerm: value, entity });
    },
    [eventBus, entity]
  );

  // Handle create
  const handleCreate = useCallback(() => {
    eventBus.emit("UI:CREATE", { entity });
  }, [eventBus, entity]);

  // Handle credit actions
  const handleAction = useCallback(
    (action: string, credit: CreditData) => {
      eventBus.emit(`UI:${action}`, { row: credit, entity });
    },
    [eventBus, entity]
  );

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
            <Typography variant="body" className="text-neutral-500">
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
        <Card className="p-4 border-amber-200 bg-amber-50">
          <HStack gap="sm" align="start">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <VStack gap="xs">
              <Typography variant="body" className="font-medium text-amber-700">
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
              <Typography variant="small" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
                leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
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
          <Typography variant="body" className="text-neutral-500">
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
              <CreditCard className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No credits found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
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

CreditsTemplate.displayName = "CreditsTemplate";
