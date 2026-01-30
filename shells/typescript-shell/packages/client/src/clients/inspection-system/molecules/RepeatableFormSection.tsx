/**
 * RepeatableFormSection
 *
 * A form section that can be repeated multiple times.
 * Used for collecting multiple entries (participants, findings, etc.)
 *
 * Event Contract:
 * - Emits: UI:SECTION_ADDED { sectionType, index }
 * - Emits: UI:SECTION_REMOVED { sectionType, index, itemId }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { useEventBus } from "../../../hooks/useEventBus";
import { Plus, Trash2, GripVertical } from "lucide-react";

export interface RepeatableFormSectionProps {
  /** Section type identifier */
  sectionType: string;
  /** Section title */
  title: string;
  /** Items in the section */
  items: Array<{ id: string; [key: string]: unknown }>;
  /** Render function for each item */
  renderItem: (item: { id: string; [key: string]: unknown }, index: number) => React.ReactNode;
  /** Minimum items required */
  minItems?: number;
  /** Maximum items allowed */
  maxItems?: number;
  /** Allow reordering */
  allowReorder?: boolean;
  /** Add button label */
  addLabel?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Add handler */
  onAdd?: () => void;
  /** Remove handler */
  onRemove?: (itemId: string, index: number) => void;
  /** Reorder handler */
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export const RepeatableFormSection: React.FC<RepeatableFormSectionProps> = ({
  sectionType,
  title,
  items,
  renderItem,
  minItems = 0,
  maxItems = Infinity,
  allowReorder = false,
  addLabel = "Add Item",
  emptyMessage = "No items added yet",
  readOnly = false,
  className,
  onAdd,
  onRemove,
  onReorder,
}) => {
  const eventBus = useEventBus();

  const canAdd = !readOnly && items.length < maxItems;
  const canRemove = !readOnly && items.length > minItems;

  const handleAdd = useCallback(() => {
    onAdd?.();
    eventBus.emit("UI:SECTION_ADDED", { sectionType, index: items.length });
  }, [sectionType, items.length, onAdd, eventBus]);

  const handleRemove = useCallback(
    (itemId: string, index: number) => {
      onRemove?.(itemId, index);
      eventBus.emit("UI:SECTION_REMOVED", { sectionType, index, itemId });
    },
    [sectionType, onRemove, eventBus]
  );

  return (
    <VStack gap="md" className={cn("w-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center">
        <HStack gap="sm" align="center">
          <Typography variant="h4" className="text-neutral-800">
            {title}
          </Typography>
          <Typography variant="small" className="text-neutral-500">
            ({items.length}{maxItems !== Infinity ? `/${maxItems}` : ""})
          </Typography>
        </HStack>

        {canAdd && (
          <Button variant="secondary" size="sm" onClick={handleAdd} className="gap-1">
            <Plus className="h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </HStack>

      {/* Items */}
      {items.length === 0 ? (
        <Card className="p-6">
          <VStack align="center" gap="sm" className="text-neutral-400">
            <Typography variant="body">{emptyMessage}</Typography>
            {canAdd && (
              <Button variant="primary" size="sm" onClick={handleAdd} className="gap-1">
                <Plus className="h-4 w-4" />
                {addLabel}
              </Button>
            )}
          </VStack>
        </Card>
      ) : (
        <VStack gap="sm">
          {items.map((item, index) => (
            <Card key={item.id} className="p-4">
              <HStack gap="sm" align="start">
                {/* Drag handle */}
                {allowReorder && !readOnly && (
                  <Box className="pt-2 cursor-move text-neutral-400 hover:text-neutral-600">
                    <GripVertical className="h-5 w-5" />
                  </Box>
                )}

                {/* Item content */}
                <Box className="flex-1">{renderItem(item, index)}</Box>

                {/* Remove button */}
                {canRemove && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id, index)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </HStack>
            </Card>
          ))}
        </VStack>
      )}

      {/* Min items warning */}
      {items.length < minItems && (
        <Typography variant="small" className="text-amber-600">
          At least {minItems} item{minItems !== 1 ? "s" : ""} required
        </Typography>
      )}
    </VStack>
  );
};

RepeatableFormSection.displayName = "RepeatableFormSection";
