/**
 * UsersTemplate
 *
 * Template for the Users list page (/users).
 * Displays User entities as a card grid with management actions.
 *
 * Page: UsersPage
 * Entity: User
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
  User,
  Mail,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  UserX,
} from "lucide-react";

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

export interface UsersTemplateProps {
  /** User items to display */
  items?: readonly UserData[];
  /** Data prop alias */
  data?: readonly UserData[];
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
}

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

const UserCard: React.FC<{ user: UserData; onAction: (action: string, user: UserData) => void }> = ({
  user,
  onAction,
}) => {
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
              <HStack gap="xs" align="center" className="text-neutral-500">
                <Mail className="h-3 w-3" />
                <Typography variant="small">{user.email}</Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
        </HStack>

        {user.primaryCategory && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <User className="h-3 w-3" />
            <Typography variant="small">{user.primaryCategory}</Typography>
          </HStack>
        )}

        {user.connectionSlots !== undefined && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Typography variant="small">
              Connections: {user.usedSlots || 0}/{user.connectionSlots}
            </Typography>
          </HStack>
        )}

        {user.createdAt && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">
              Joined {new Date(user.createdAt).toLocaleDateString()}
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
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", user)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          {user.status !== "suspended" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("SUSPEND", user)}
              className="gap-1 text-red-600 hover:text-red-700"
            >
              <UserX className="h-3 w-3" />
              Suspend
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const UsersTemplate: React.FC<UsersTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Community Members",
  subtitle = "Manage your platform users",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");

  const users = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "User" });
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
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Register User
          </Button>
        </HStack>
      )}

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
              />
            </Box>
          )}

          {showFilters && (
            <Button variant="secondary" onClick={handleFilter} className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          )}
        </HStack>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading users...
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

      {/* Users Grid */}
      {!isLoading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <User className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No users found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm ? "Try a different search term" : "Register your first user to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} onAction={handleAction} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

UsersTemplate.displayName = "UsersTemplate";
