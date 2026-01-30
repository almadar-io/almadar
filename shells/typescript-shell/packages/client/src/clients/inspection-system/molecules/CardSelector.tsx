/**
 * CardSelector
 *
 * Card-based selection component for choosing options.
 * Used for selecting inspection type, field type, etc.
 *
 * Event Contract:
 * - Emits: UI:CARD_SELECTED { optionId, option }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { Check, LucideIcon } from "lucide-react";

export interface CardSelectorOption {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  metadata?: Record<string, string>;
}

export interface CardSelectorProps {
  /** Available options */
  options: CardSelectorOption[];
  /** Currently selected option ID */
  selectedId?: string | null;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Selected IDs for multiple selection */
  selectedIds?: string[];
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
  /** Show check icon on selected */
  showCheck?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Selection change handler */
  onChange?: (selectedId: string) => void;
  /** Multiple selection change handler */
  onMultiChange?: (selectedIds: string[]) => void;
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const CardSelector: React.FC<CardSelectorProps> = ({
  options,
  selectedId,
  multiple = false,
  selectedIds = [],
  columns = 3,
  showCheck = true,
  disabled = false,
  className,
  onChange,
  onMultiChange,
}) => {
  const eventBus = useEventBus();

  const isSelected = useCallback(
    (optionId: string) => {
      if (multiple) {
        return selectedIds.includes(optionId);
      }
      return selectedId === optionId;
    },
    [multiple, selectedId, selectedIds]
  );

  const handleSelect = useCallback(
    (option: CardSelectorOption) => {
      if (disabled || option.disabled) return;

      if (multiple) {
        const newSelection = isSelected(option.id)
          ? selectedIds.filter((id) => id !== option.id)
          : [...selectedIds, option.id];
        onMultiChange?.(newSelection);
      } else {
        onChange?.(option.id);
      }

      eventBus.emit("UI:CARD_SELECTED", { optionId: option.id, option });
    },
    [disabled, multiple, selectedIds, isSelected, onChange, onMultiChange, eventBus]
  );

  return (
    <Box className={cn("grid gap-4", columnClasses[columns], className)}>
      {options.map((option) => {
        const selected = isSelected(option.id);
        const Icon = option.icon;

        return (
          <Card
            key={option.id}
            className={cn(
              "p-4 cursor-pointer transition-all",
              selected
                ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200"
                : "hover:border-neutral-300 hover:shadow-sm",
              (disabled || option.disabled) && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleSelect(option)}
          >
            <HStack justify="between" align="start">
              <HStack gap="sm" align="start">
                {Icon && (
                  <Box
                    rounded="lg"
                    padding="sm"
                    className={cn(
                      selected
                        ? "bg-blue-100 text-blue-600"
                        : "bg-neutral-100 text-neutral-500"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Box>
                )}
                <VStack gap="xs">
                  <Typography
                    variant="body"
                    className={cn(
                      "font-medium",
                      selected ? "text-blue-900" : "text-neutral-800"
                    )}
                  >
                    {option.title}
                  </Typography>
                  {option.description && (
                    <Typography
                      variant="small"
                      className={cn(
                        selected ? "text-blue-700" : "text-neutral-500"
                      )}
                    >
                      {option.description}
                    </Typography>
                  )}
                </VStack>
              </HStack>

              {showCheck && selected && (
                <Box
                  rounded="full"
                  padding="xs"
                  className="bg-blue-500 text-white"
                >
                  <Check className="h-4 w-4" />
                </Box>
              )}
            </HStack>
          </Card>
        );
      })}
    </Box>
  );
};

CardSelector.displayName = "CardSelector";
