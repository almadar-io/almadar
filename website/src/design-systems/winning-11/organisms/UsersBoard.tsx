/**
 * UsersBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Users page. The template is a thin wrapper.
 */

import React from "react";
import {
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Calendar,
  Eye,
  Edit,
  UserX,
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
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

export interface UserData {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "suspended";
  primaryCategory?: string;
  connectionSlots?: number;
  usedSlots?: number;
  isBetaUser?: boolean;
  createdAt?: string;
  lastActiveAt?: string;
}

export interface UsersBoardProps {
  /** Entity data (user items) */
  entity?: readonly UserData[];
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
  /** Event name for create action */
  createEvent: string;
  /** Event name for view action */
  viewEvent: string;
  /** Event name for edit action */
  editEvent: string;
  /** Event name for search action */
  searchEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusColor = (status: UserData["status"]) => {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "suspended":
      return "error";
    default:
      return "neutral";
  }
};

// ── Sub-components ─────────────────────────────────────────────────

const UserCard: React.FC<{
  user: UserData;
  onAction: (action: string, user: UserData) => void;
}> = ({ user, onAction }) => {
  const { t } = useTranslate();
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Avatar name={user.name} size="md" />
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {user.name}
              </Typography>
              <HStack
                gap="xs"
                align="center"
                className="text-[var(--color-muted-foreground)]"
              >
                <Mail className="h-3 w-3" />
                <Typography variant="small">{user.email}</Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(user.status)}>{t(`users.status.${user.status}`)}</Badge>
        </HStack>

        {user.primaryCategory && (
          <HStack
            gap="xs"
            align="center"
            className="text-[var(--color-muted-foreground)]"
          >
            <User className="h-3 w-3" />
            <Typography variant="small">{user.primaryCategory}</Typography>
          </HStack>
        )}

        {user.connectionSlots !== undefined && (
          <HStack
            gap="xs"
            align="center"
            className="text-[var(--color-muted-foreground)]"
          >
            <Typography variant="small">
              {t("users.connections", { used: user.usedSlots || 0, total: user.connectionSlots })}
            </Typography>
          </HStack>
        )}

        {user.createdAt && (
          <HStack
            gap="xs"
            align="center"
            className="text-[var(--color-muted-foreground)]"
          >
            <Calendar className="h-3 w-3" />
            <Typography variant="small">
              {t("users.joined", { date: new Date(user.createdAt).toLocaleDateString() })}
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", user)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t("users.view")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", user)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            {t("users.edit")}
          </Button>
          {user.status !== "suspended" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("SUSPEND", user)}
              className="gap-1 text-red-600 hover:text-red-700"
            >
              <UserX className="h-3 w-3" />
              {t("users.suspend")}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

// ── Main Board ─────────────────────────────────────────────────────

export const UsersBoard: React.FC<UsersBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  subtitle,
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent,
  searchEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const users = entity || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "User" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit("UI:FILTER", { entity: "User" });
  };

  // Handle user actions
  const handleAction = (action: string, user: UserData) => {
    eventBus.emit(`UI:${action}`, { row: user, entity: "User" });
  };

  // Filter users by search term
  const filteredUsers = searchTerm
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title || t("users.title")}</Typography>
            <Typography
              variant="body"
              className="text-[var(--color-muted-foreground)]"
            >
              {subtitle || t("users.subtitle")}
            </Typography>
          </VStack>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("users.registerUser")}
          </Button>
        </HStack>
      )}

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder={t("users.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={
                  <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                }
              />
            </Box>
          )}

          {showFilters && (
            <Button
              variant="secondary"
              onClick={handleFilter}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {t("users.filter")}
            </Button>
          )}
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
            {t("users.loading")}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t("users.error", { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Users Grid */}
      {!isLoading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <User className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography
                variant="h3"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("users.noUsersFound")}
              </Typography>
              <Typography
                variant="body"
                className="text-[var(--color-muted-foreground)]"
              >
                {searchTerm
                  ? t("users.tryDifferentSearch")
                  : t("users.registerFirstUser")}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
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

UsersBoard.displayName = "UsersBoard";
