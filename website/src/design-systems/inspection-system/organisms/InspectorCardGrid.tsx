/**
 * InspectorCardGrid Organism
 *
 * Searchable card grid for inspectors. Contains search state, filtering logic,
 * InspectorCard sub-component, and event emission via useEventBus.
 *
 * Extracted from InspectorsTemplate for flattener compliance.
 */

import React, { useState } from "react";
import {
  Plus,
  Search,
  User,
  Mail,
  Phone,
  Building,
  Eye,
  Edit,
  UserX,
  ClipboardList,
} from "lucide-react";
import {
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
  cn,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from '@almadar/ui';

export interface InspectorEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  isActive: boolean;
  unitName?: string;
  unitEmail?: string;
  unitPhone?: string;
  inspectionCount?: number;
  lastInspectionDate?: string;
}

export interface InspectorCardGridProps extends EntityDisplayProps<InspectorEntity> {
  title?: string;
  showHeader?: boolean;
  /** Declarative event for search */
  searchEvent?: string;
  /** Declarative event for create */
  createEvent?: string;
}

const InspectorCard: React.FC<{
  inspector: InspectorEntity;
}> = ({ inspector }) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const fullName = `${inspector.name} ${inspector.surname}`;

  const handleAction = (action: string) => {
    emit(`UI:${action}`, { row: inspector, entity: "Inspector" });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Avatar name={fullName} size="md" />
            <VStack gap="xs">
              <Typography variant="body" className="font-medium">
                {fullName}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {inspector.employeeId}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={inspector.isActive ? "success" : "neutral"}>
            {inspector.isActive ? t('inspectors.active') : t('inspectors.inactive')}
          </Badge>
        </HStack>

        <VStack gap="xs" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Building className="h-3 w-3" />
            <Typography variant="small">{inspector.department}</Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Mail className="h-3 w-3" />
            <Typography variant="small">{inspector.email}</Typography>
          </HStack>
          <HStack gap="xs" align="center">
            <Phone className="h-3 w-3" />
            <Typography variant="small">{inspector.phone}</Typography>
          </HStack>
          {inspector.unitName && (
            <HStack gap="xs" align="center" className="pt-1 mt-1 border-t border-gray-100">
              <Building className="h-3 w-3 text-blue-500" />
              <Typography variant="small" className="text-blue-600 font-medium">
                {inspector.unitName}
              </Typography>
            </HStack>
          )}
        </VStack>

        {inspector.inspectionCount !== undefined && (
          <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
            <ClipboardList className="h-3 w-3" />
            <Typography variant="small">
              {inspector.inspectionCount} {inspector.inspectionCount !== 1 ? t('inspectors.inspectionsPlural') : t('inspectors.inspectionSingular')}
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={() => handleAction("VIEW")} className="gap-1">
            <Eye className="h-3 w-3" />
            {t('common.view')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction("EDIT")} className="gap-1">
            <Edit className="h-3 w-3" />
            {t('common.edit')}
          </Button>
          {inspector.isActive && (
            <Button variant="ghost" size="sm" onClick={() => handleAction("DEACTIVATE")} className="gap-1 text-red-600">
              <UserX className="h-3 w-3" />
              {t('inspectors.deactivate')}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export function InspectorCardGrid({
  entity,
  isLoading = false,
  error = null,
  title = "Inspectors",
  showHeader = true,
  searchEvent,
  createEvent,
  className,
}: InspectorCardGridProps): JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  const handleCreate = () => {
    if (createEvent) emit(`UI:${createEvent}`, { entity: "Inspector" });
  };

  const inspectors = Array.isArray(entity) ? entity : entity && typeof entity !== 'string' ? [entity] : [];
  const filteredInspectors = searchTerm
    ? inspectors.filter(
      (i: InspectorEntity) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : inspectors;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {t('inspectors.subtitle')}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('inspectors.addInspector')}
          </Button>
        </HStack>
      )}

      <Box className="w-full max-w-sm">
        <Input
          placeholder={t('inspectors.search')}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
        />
      </Box>

      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
        </VStack>
      )}

      {error && (
        <Typography variant="body" className="text-red-500 text-center py-12">
          {t('error.prefix')} {error.message}
        </Typography>
      )}

      {!isLoading && !error && (
        <>
          {filteredInspectors.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <User className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t('inspectors.empty.title')}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInspectors.map((inspector: InspectorEntity) => (
                <InspectorCard key={inspector.id} inspector={inspector} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}

InspectorCardGrid.displayName = "InspectorCardGrid";

export default InspectorCardGrid;
