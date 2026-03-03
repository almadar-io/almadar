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
import { Search, Plus, FileText, X } from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Input,
  Button,
  Card,
  Spinner,
  useEventBus,
} from '@almadar/ui';

export interface EntitySearchItem {
  id: string;
  name?: string;
  /** Alias for name */
  label?: string;
  subtitle?: string;
  /** Alias for subtitle */
  sublabel?: string;
  metadata?: Record<string, string>;
}

// Type alias for backwards compatibility
export type SearchResult = EntitySearchItem;

export interface EntitySearchProps {
  /** Label for the field */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Currently selected item */
  selectedItem?: EntitySearchItem | null;
  /** Currently selected ID (alternative to selectedItem) */
  selectedId?: string;
  /** Search results */
  items?: EntitySearchItem[];
  /** Search results (alias for items) */
  results?: EntitySearchItem[];
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
  /** Create new handler (alias for onCreate) */
  onCreateNew?: () => void;
}

export const EntitySearch: React.FC<EntitySearchProps> = ({
  label,
  placeholder = "Search...",
  selectedItem,
  items = [],
  results,
  isLoading = false,
  allowCreate = true,
  createLabel = "Create New",
  required = false,
  disabled = false,
  className,
  onSelect,
  onSearch,
  onCreate,
  onCreateNew,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use items or results (alias)
  const searchItems = items.length > 0 ? items : (results ?? []);

  const EntityIcon = FileText;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
      eventBus.emit("UI:SEARCH", { entity: "Entity", searchTerm: value });
    },
    [onSearch, eventBus],
  );

  const handleSelect = useCallback(
    (item: EntitySearchItem) => {
      onSelect?.(item);
      eventBus.emit("UI:ENTITY_SELECTED", { entity: "Entity", item });
      setSearchTerm("");
      setIsOpen(false);
    },
    [onSelect, eventBus],
  );

  const handleClear = useCallback(() => {
    onSelect?.(null);
    setSearchTerm("");
  }, [onSelect]);

  const handleCreate = useCallback(() => {
    onCreate?.();
    onCreateNew?.();
    eventBus.emit("UI:CREATE_NEW", { entity: "Entity" });
    setIsOpen(false);
  }, [onCreate, onCreateNew, eventBus]);

  // Show selected item
  if (selectedItem) {
    return (
      <VStack gap="xs" className={cn("w-full", className)}>
        {label && (
          <Typography variant="label" className="text-[var(--color-foreground)]">
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
                  {selectedItem.name || selectedItem.label}
                </Typography>
                {(selectedItem.subtitle || selectedItem.sublabel) && (
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {selectedItem.subtitle || selectedItem.sublabel}
                  </Typography>
                )}
              </VStack>
            </HStack>
            {!disabled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
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
    <Box ref={containerRef} className={cn("w-full relative", className)}>
      <VStack gap="xs">
        {label && (
          <Typography variant="label" className="text-[var(--color-foreground)]">
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
          leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
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
              ) : searchItems.length > 0 ? (
                searchItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full p-3 text-left hover:bg-neutral-50 transition-colors border-b last:border-b-0"
                  >
                    <HStack gap="sm" align="center">
                      <EntityIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                      <VStack gap="none">
                        <Typography variant="body" className="font-medium">
                          {item.name || item.label}
                        </Typography>
                        {(item.subtitle || item.sublabel) && (
                          <Typography
                            variant="small"
                            className="text-[var(--color-muted-foreground)]"
                          >
                            {item.subtitle || item.sublabel}
                          </Typography>
                        )}
                      </VStack>
                    </HStack>
                  </button>
                ))
              ) : searchTerm ? (
                <Box padding="md" className="text-center">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
                      {createLabel}
                    </Typography>
                  </HStack>
                </button>
              )}
            </VStack>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

EntitySearch.displayName = "EntitySearch";
