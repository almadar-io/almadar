/**
 * CompanyCardGrid Organism
 *
 * Searchable card grid for companies. Contains search state, filtering logic,
 * CompanyCard sub-component, and event emission via useEventBus.
 *
 * Extracted from CompaniesTemplate for flattener compliance.
 */

import React, { useState } from "react";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Eye,
  Edit,
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
  Spinner,
  cn,
  useEventBus,
} from '@almadar/ui';

export interface CompanyEntity {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  registrationNumber: string;
  taxNumber?: string;
  companyId: string;
  postalCode?: string;
  inspectionCount?: number;
  lastInspectionDate?: string;
  complianceStatus?: "compliant" | "non-compliant" | "pending" | "unknown";
  units?: Array<{ id: string; name: string }>;
}

export interface CompanyCardGridProps {
  entity: readonly CompanyEntity[];
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
  showHeader?: boolean;
  /** Declarative event for search */
  searchEvent?: string;
  /** Declarative event for create */
  createEvent?: string;
  /** Declarative event for card actions (VIEW, EDIT, NEW_INSPECTION) */
  actionEvent?: string;
  className?: string;
}

const getComplianceColor = (status: CompanyEntity["complianceStatus"]) => {
  switch (status) {
    case "compliant":
      return "success";
    case "non-compliant":
      return "danger";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const CompanyCard: React.FC<{
  company: CompanyEntity;
  actionEvent?: string;
}> = ({ company, actionEvent }) => {
  const { emit } = useEventBus();

  const handleAction = (action: string) => {
    if (actionEvent) {
      emit(`UI:${action}`, { row: company, entity: "Company" });
    } else {
      emit(`UI:${action}`, { row: company, entity: "Company" });
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="start">
            <Box rounded="lg" padding="sm" className="bg-blue-50 text-blue-600">
              <Building2 className="h-5 w-5" />
            </Box>
            <VStack gap="xs">
              <Typography variant="body" className="font-medium">
                {company.name}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {company.registrationNumber}
              </Typography>
            </VStack>
          </HStack>
          {company.complianceStatus && (
            <Badge variant={getComplianceColor(company.complianceStatus)}>
              {company.complianceStatus}
            </Badge>
          )}
        </HStack>

        <VStack gap="xs" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <MapPin className="h-3 w-3" />
            <Typography variant="small">
              {company.address}, {company.city}
            </Typography>
          </HStack>
          {company.inspectionCount !== undefined && (
            <HStack gap="xs" align="center">
              <ClipboardList className="h-3 w-3" />
              <Typography variant="small">
                {company.inspectionCount} inspection
                {company.inspectionCount !== 1 ? "s" : ""}
              </Typography>
            </HStack>
          )}
          {company.units && company.units.length > 0 && (
            <HStack gap="xs" align="center">
              <Building2 className="h-3 w-3" />
              <Typography variant="small">
                {company.units.length} unit{company.units.length !== 1 ? "s" : ""}
              </Typography>
            </HStack>
          )}
        </VStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={() => handleAction("VIEW")} className="gap-1">
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction("EDIT")} className="gap-1">
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction("NEW_INSPECTION")} className="gap-1 text-blue-600">
            <ClipboardList className="h-3 w-3" />
            Inspect
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export function CompanyCardGrid({
  entity,
  isLoading = false,
  error = null,
  title = "Companies",
  showHeader = true,
  searchEvent,
  createEvent,
  actionEvent,
  className,
}: CompanyCardGridProps): JSX.Element {
  const { emit } = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  const handleCreate = () => {
    if (createEvent) emit(`UI:${createEvent}`, { entity: "Company" });
  };

  const filteredCompanies = searchTerm
    ? entity.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    : entity;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              Manage registered companies
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </HStack>
      )}

      <Box className="w-full max-w-sm">
        <Input
          placeholder="Search companies..."
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
          Error: {error.message}
        </Typography>
      )}

      {!isLoading && !error && (
        <>
          {filteredCompanies.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Building2 className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No companies found
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} actionEvent={actionEvent} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}

CompanyCardGrid.displayName = "CompanyCardGrid";

export default CompanyCardGrid;
