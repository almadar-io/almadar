/**
 * EntitySearch
 *
 * Search component for finding entities with create option.
 * Used to select companies, inspectors, etc. in inspection forms.
 *
 * Event Contract:
 * - Emits: UI:ENTITY_SELECTED { entity, item }
 * - Emits: UI:CREATE_NEW { entity }
 * - Emits: UI:SEARCH { entity, searchTerm }
 */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Input } from "../../../components/atoms/Input";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import { Search, Plus, Building2, User, FileText, X } from "lucide-react";

export interface EntitySearchItem {
  id: string;
  name: string;
  subtitle?: string;
  metadata?: Record<string, string>;
}

export interface EntitySearchProps {
  /** Entity type being searched */
  entity: string;
  /** Label for the field */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Currently selected item */
  selectedItem?: EntitySearchItem | null;
  /** Search results */
  items?: EntitySearchItem[];
  /** Loading state */
  isLoading?: boolean;
  /** Allow creating new entities */
  allowCreate?: boolean;
  /** Create button label */
  createLabel?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Selection change handler */
  onSelect?: (item: EntitySearchItem | null) => void;
  /** Search handler */
  onSearch?: (term: string) => void;
  /** Create handler */
  onCreate?: () => void;
}

const entityIcons: Record<string, typeof Building2> = {
  Company: Building2,
  Inspector: User,
  Document: FileText,
};

export const EntitySearch: React.FC<EntitySearchProps> = ({
  entity,
  label,
  placeholder = "Search...",
  selectedItem,
  items = [],
  isLoading = false,
  allowCreate = true,
  createLabel = "Create New",
  required = false,
  disabled = false,
  className,
  onSelect,
  onSearch,
  onCreate,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const EntityIcon = entityIcons[entity] || FileText;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setIsOpen(true);
      onSearch?.(value);
      eventBus.emit("UI:SEARCH", { entity, searchTerm: value });
    },
    [entity, onSearch, eventBus]
  );

  const handleSelect = useCallback(
    (item: EntitySearchItem) => {
      onSelect?.(item);
      eventBus.emit("UI:ENTITY_SELECTED", { entity, item });
      setSearchTerm("");
      setIsOpen(false);
    },
    [entity, onSelect, eventBus]
  );

  const handleClear = useCallback(() => {
    onSelect?.(null);
    setSearchTerm("");
  }, [onSelect]);

  const handleCreate = useCallback(() => {
    onCreate?.();
    eventBus.emit("UI:CREATE_NEW", { entity });
    setIsOpen(false);
  }, [entity, onCreate, eventBus]);

  // Show selected item
  if (selectedItem) {
    return (
      <VStack gap="xs" className={cn("w-full", className)}>
        {label && (
          <Typography variant="label" className="text-neutral-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Typography>
        )}
        <Card className="p-3">
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center">
              <Box
                rounded="lg"
                padding="sm"
                className="bg-blue-50 text-blue-600"
              >
                <EntityIcon className="h-5 w-5" />
              </Box>
              <VStack gap="none">
                <Typography variant="body" className="font-medium">
                  {selectedItem.name}
                </Typography>
                {selectedItem.subtitle && (
                  <Typography variant="small" className="text-neutral-500">
                    {selectedItem.subtitle}
                  </Typography>
                )}
              </VStack>
            </HStack>
            {!disabled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </HStack>
        </Card>
      </VStack>
    );
  }

  return (
    <VStack gap="xs" className={cn("w-full relative", className)} ref={containerRef}>
      {label && (
        <Typography variant="label" className="text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      )}

      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
        className="w-full"
      />

      {/* Dropdown */}
      {isOpen && !disabled && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto shadow-lg">
          <VStack gap="none">
            {isLoading ? (
              <Box padding="md" className="flex justify-center">
                <Spinner size="sm" />
              </Box>
            ) : items.length > 0 ? (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full p-3 text-left hover:bg-neutral-50 transition-colors border-b last:border-b-0"
                >
                  <HStack gap="sm" align="center">
                    <EntityIcon className="h-4 w-4 text-neutral-400" />
                    <VStack gap="none">
                      <Typography variant="body" className="font-medium">
                        {item.name}
                      </Typography>
                      {item.subtitle && (
                        <Typography variant="small" className="text-neutral-500">
                          {item.subtitle}
                        </Typography>
                      )}
                    </VStack>
                  </HStack>
                </button>
              ))
            ) : searchTerm ? (
              <Box padding="md" className="text-center">
                <Typography variant="small" className="text-neutral-500">
                  No results found
                </Typography>
              </Box>
            ) : null}

            {/* Create new option */}
            {allowCreate && (
              <button
                type="button"
                onClick={handleCreate}
                className="w-full p-3 text-left hover:bg-blue-50 transition-colors border-t"
              >
                <HStack gap="sm" align="center" className="text-blue-600">
                  <Plus className="h-4 w-4" />
                  <Typography variant="body" className="font-medium">
                    {createLabel} {entity}
                  </Typography>
                </HStack>
              </button>
            )}
          </VStack>
        </Card>
      )}
    </VStack>
  );
};

EntitySearch.displayName = "EntitySearch";
