/**
 * TraineesBoard - Organism for the Trainees/Users management board
 *
 * Contains all logic, state, filtering, computed stats, and sub-components
 * previously in TraineesTemplate. Accepts declarative event prop strings
 * so the parent template can wire up specific event names.
 *
 * Events Emitted (via string props):
 * - UI:{createEvent} - Create new user
 * - UI:{viewEvent} - View user details
 * - UI:{editEvent} - Edit user
 * - UI:{deleteEvent} - Delete user
 * - UI:{searchEvent} - Search users
 * - UI:{filterEvent} - Filter by role
 */

import React, { useState } from "react";
import {
  Plus,
  Search,
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
} from '@almadar/ui';

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

/** User entity data for the trainees board */
export interface UserEntity {
  /** User items to display */
  items: readonly UserData[];
}

export interface TraineesBoardProps {
  /** User entity data */
  entity: UserEntity;
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
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a user (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for viewing a user (emitted as UI:{viewEvent}) */
  viewEvent?: string;
  /** Event name for editing a user (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for deleting a user (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for searching (emitted as UI:{searchEvent}) */
  searchEvent?: string;
  /** Event name for filtering (emitted as UI:{filterEvent}) */
  filterEvent?: string;
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
      return "bg-blue-500/15 text-blue-600";
    case "trainee":
      return "bg-green-500/15 text-green-600";
    default:
      return "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]";
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
  viewEvent?: string;
  editEvent?: string;
  deleteEvent?: string;
}> = ({ user, viewEvent, editEvent, deleteEvent }) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
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
              className="items-center justify-center h-12 w-12 bg-[var(--color-muted)]"
            >
              {user.profileImage ? (
                <Box
                  as="img"
                  // @ts-expect-error -- Box polymorphic 'as' prop passes src/alt to <img>
                  src={user.profileImage}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-[var(--color-muted-foreground)]" />
              )}
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {user.name}
              </Typography>
              <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                <Mail className="h-3 w-3" />
                <Typography variant="small">{user.email}</Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge className={getRoleColor(user.role)}>
            <RoleIcon className="h-3 w-3 mr-1" />
            {t('trainees.role.' + user.role)}
          </Badge>
        </HStack>

        {/* Phone */}
        {user.phone && (
          <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
            <Phone className="h-3 w-3" />
            <Typography variant="small">{user.phone}</Typography>
          </HStack>
        )}

        {/* Created date */}
        {user.createdAt && (
          <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">{t('trainees.joinedDate', { date: formatDate(user.createdAt) })}</Typography>
          </HStack>
        )}

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${viewEvent}`, { row: user, entity: "User" })}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            {t('trainees.view')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${editEvent}`, { row: user, entity: "User" })}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            {t('trainees.edit')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit(`UI:${deleteEvent}`, { row: user, entity: "User" })}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
            {t('trainees.delete')}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const TraineesBoard: React.FC<TraineesBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Users",
  subtitle = "Manage trainers and trainees",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  defaultRoleFilter = "all",
  className,
  createEvent = "CREATE",
  viewEvent = "VIEW",
  editEvent = "EDIT",
  deleteEvent = "DELETE",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "trainer" | "trainee">(defaultRoleFilter);

  const users = entity.items || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    emit(`UI:${searchEvent}`, { searchTerm: value, entity: "User" });
  };

  // Handle create
  const handleCreate = () => {
    emit(`UI:${createEvent}`, { entity: "User" });
  };

  // Handle role filter
  const handleRoleFilter = (role: "all" | "trainer" | "trainee") => {
    setRoleFilter(role);
    emit(`UI:${filterEvent}`, { role, entity: "User" });
  };

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
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('trainees.addUser')}
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('trainees.totalUsers')}
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{trainerCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('trainees.trainers')}
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Dumbbell className="h-5 w-5 text-green-500" />
            <VStack gap="none">
              <Typography variant="h3">{traineeCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('trainees.trainees')}
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
                placeholder={t('trainees.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
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
                {t('trainees.all')}
              </Button>
              <Button
                variant={roleFilter === "trainer" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleRoleFilter("trainer")}
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                {t('trainees.trainers')}
              </Button>
              <Button
                variant={roleFilter === "trainee" ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleRoleFilter("trainee")}
              >
                <Dumbbell className="h-4 w-4 mr-1" />
                {t('trainees.trainees')}
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
            {t('trainees.loading')}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t('trainees.error', { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Users Grid */}
      {!isLoading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Users className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t('trainees.noUsersFound')}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm
                  ? t('trainees.tryDifferentSearch')
                  : t('trainees.addFirstUser')}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  viewEvent={viewEvent}
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

TraineesBoard.displayName = "TraineesBoard";
