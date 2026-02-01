/**
 * TraineesTemplate
 *
 * Template for the Trainees/Users list page (/users).
 * Displays User entities as a card grid with trainer/trainee role filtering.
 *
 * Page: UsersPage
 * Entity: User
 * ViewType: list
 * Trait: UserManagement
 *
 * Event Contract:
 * - Emits: UI:CREATE - create new user
 * - Emits: UI:VIEW - view user details
 * - Emits: UI:EDIT - edit user
 * - Emits: UI:DELETE - delete user
 * - Emits: UI:SEARCH - search users
 * - Emits: UI:FILTER - filter by role
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
import {
  Plus,
  Search,
  Filter,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Dumbbell,
  GraduationCap,
} from "lucide-react";

/**
 * User entity data from blaz-klemenc.orb
 */
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "trainee";
  phone?: string;
  profileImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TraineesTemplateProps {
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
  /** Default role filter */
  defaultRoleFilter?: "all" | "trainer" | "trainee";
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

const getRoleIcon = (role: UserData["role"]) => {
  switch (role) {
    case "trainer":
      return GraduationCap;
    case "trainee":
      return Dumbbell;
    default:
      return User;
  }
};

const getRoleColor = (role: UserData["role"]) => {
  switch (role) {
    case "trainer":
      return "bg-blue-100 text-blue-700";
    case "trainee":
      return "bg-green-100 text-green-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const UserCard: React.FC<{
  user: UserData;
  onAction: (action: string, user: UserData) => void;
}> = ({ user, onAction }) => {
  const RoleIcon = getRoleIcon(user.role);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        {/* Header with avatar and role */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="full"
              className="items-center justify-center h-12 w-12 bg-neutral-100"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-neutral-400" />
              )}
            </Box>
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
          <Badge className={getRoleColor(user.role)}>
            <RoleIcon className="h-3 w-3 mr-1" />
            {user.role}
          </Badge>
        </HStack>

        {/* Phone */}
        {user.phone && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Phone className="h-3 w-3" />
            <Typography variant="small">{user.phone}</Typography>
          </HStack>
        )}

        {/* Created date */}
        {user.createdAt && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">Joined {formatDate(user.createdAt)}</Typography>
          </HStack>
        )}

        {/* Actions */}
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("DELETE", user)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const TraineesTemplate: React.FC<TraineesTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Users",
  subtitle = "Manage trainers and trainees",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  defaultRoleFilter = "all",
  entity = "User",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "trainer" | "trainee">(defaultRoleFilter);

  const users = items || data || [];

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

  // Handle role filter
  const handleRoleFilter = useCallback(
    (role: "all" | "trainer" | "trainee") => {
      setRoleFilter(role);
      eventBus.emit("UI:FILTER", { role, entity });
    },
    [eventBus, entity]
  );

  // Handle user actions
  const handleAction = useCallback(
    (action: string, user: UserData) => {
      eventBus.emit(`UI:${action}`, { row: user, entity });
    },
    [eventBus, entity]
  );

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchTerm ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Count by role
  const trainerCount = users.filter((u) => u.role === "trainer").length;
  const traineeCount = users.filter((u) => u.role === "trainee").length;

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
            Add User
          </Button>
        </HStack>
      )}

      {/* Stats */}
      <HStack gap="md">
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Users className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{users.length}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Total Users
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{trainerCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Trainers
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Dumbbell className="h-5 w-5 text-green-500" />
            <VStack gap="none">
              <Typography variant="h3">{traineeCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Trainees
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
              />
            </Box>
          )}

          {showFilters && (
            <HStack gap="sm">
              <Button
                variant={roleFilter === "all" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleRoleFilter("all")}
              >
                All
              </Button>
              <Button
                variant={roleFilter === "trainer" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleRoleFilter("trainer")}
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                Trainers
              </Button>
              <Button
                variant={roleFilter === "trainee" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleRoleFilter("trainee")}
              >
                <Dumbbell className="h-4 w-4 mr-1" />
                Trainees
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
              <Users className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No users found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm
                  ? "Try a different search term"
                  : "Add your first user to get started"}
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

TraineesTemplate.displayName = "TraineesTemplate";
