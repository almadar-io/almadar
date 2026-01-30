/**
 * CompaniesTemplate
 *
 * Template for the Companies list page (/companies).
 * Displays Company entities (merchants being inspected).
 *
 * Page: CompaniesPage
 * Entity: Company
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
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  FileText,
  Eye,
  Edit,
  Trash2,
  ClipboardList,
} from "lucide-react";

export interface CompanyData {
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
}

export interface CompaniesTemplateProps {
  /** Company items */
  items?: readonly CompanyData[];
  /** Data prop alias */
  data?: readonly CompanyData[];
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

const getComplianceColor = (status: CompanyData["complianceStatus"]) => {
  switch (status) {
    case "compliant":
      return "success";
    case "non-compliant":
      return "error";
    case "pending":
      return "warning";
    default:
      return "neutral";
  }
};

const CompanyCard: React.FC<{
  company: CompanyData;
  onAction: (action: string, company: CompanyData) => void;
}> = ({ company, onAction }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="start">
            <Box
              rounded="lg"
              padding="sm"
              className="bg-blue-50 text-blue-600"
            >
              <Building2 className="h-5 w-5" />
            </Box>
            <VStack gap="xs">
              <Typography variant="body" className="font-medium text-neutral-800">
                {company.name}
              </Typography>
              <Typography variant="small" className="text-neutral-500">
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

        <VStack gap="xs" className="text-neutral-500">
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
                {company.inspectionCount} inspection{company.inspectionCount !== 1 ? "s" : ""}
              </Typography>
            </HStack>
          )}
        </VStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", company)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", company)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("NEW_INSPECTION", company)}
            className="gap-1 text-blue-600"
          >
            <ClipboardList className="h-3 w-3" />
            Inspect
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const CompaniesTemplate: React.FC<CompaniesTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Companies",
  showHeader = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");

  const companies = items || data || [];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Company" });
  };

  const handleAction = (action: string, company: CompanyData) => {
    eventBus.emit(`UI:${action}`, { row: company, entity: "Company" });
  };

  const filteredCompanies = searchTerm
    ? companies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : companies;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
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
          {filteredCompanies.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Building2 className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No companies found
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
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

CompaniesTemplate.displayName = "CompaniesTemplate";
