/**
 * InspectorsTemplate
 *
 * Template for the Inspectors list page (/inspectors).
 * Displays Inspector entities (government inspectors).
 *
 * Page: InspectorsPage
 * Entity: Inspector
 * ViewType: list
 */

import React, { useState } from "react";
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
  User,
  Mail,
  Phone,
  Building,
  Eye,
  Edit,
  UserX,
  ClipboardList,
} from "lucide-react";

export interface InspectorData {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  isActive: boolean;
  inspectionCount?: number;
  lastInspectionDate?: string;
}

export interface InspectorsTemplateProps {
  /** Inspector items */
  items?: readonly InspectorData[];
  /** Data prop alias */
  data?: readonly InspectorData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show header */
  showHeader?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const InspectorCard: React.FC<{
  inspector: InspectorData;
  onAction: (action: string, inspector: InspectorData) => void;
}> = ({ inspector, onAction }) => {
  const fullName = `${inspector.name} ${inspector.surname}`;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Avatar name={fullName} size="md" />
            <VStack gap="xs">
              <Typography variant="body" className="font-medium text-neutral-800">
                {fullName}
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                {inspector.employeeId}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={inspector.isActive ? "success" : "neutral"}>
            {inspector.isActive ? "Active" : "Inactive"}
          </Badge>
        </HStack>

        <VStack gap="xs" className="text-neutral-500">
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
        </VStack>

        {inspector.inspectionCount !== undefined && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <ClipboardList className="h-3 w-3" />
            <Typography variant="small">
              {inspector.inspectionCount} inspection{inspector.inspectionCount !== 1 ? "s" : ""}
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", inspector)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", inspector)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          {inspector.isActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("DEACTIVATE", inspector)}
              className="gap-1 text-red-600"
            >
              <UserX className="h-3 w-3" />
              Deactivate
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const InspectorsTemplate: React.FC<InspectorsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Inspectors",
  showHeader = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");

  const inspectors = items || data || [];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Inspector" });
  };

  const handleAction = (action: string, inspector: InspectorData) => {
    eventBus.emit(`UI:${action}`, { row: inspector, entity: "Inspector" });
  };

  const filteredInspectors = searchTerm
    ? inspectors.filter(
        (i) =>
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
            <Typography variant="body" className="text-neutral-500">
              Manage government inspectors
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Inspector
          </Button>
        </HStack>
      )}

      <Box className="w-full max-w-sm">
        <Input
          placeholder="Search inspectors..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
        />
      </Box>

      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
        </VStack>
      )}

      {error && (
        <Typography variant="body" className="text-red-500 text-center py-12">
          Error: {error.message}
        </Typography>
      )}

      {!isLoading && !error && (
        <>
          {filteredInspectors.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <User className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No inspectors found
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInspectors.map((inspector) => (
                <InspectorCard
                  key={inspector.id}
                  inspector={inspector}
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

InspectorsTemplate.displayName = "InspectorsTemplate";
