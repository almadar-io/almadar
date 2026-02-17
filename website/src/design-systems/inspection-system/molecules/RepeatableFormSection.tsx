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
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  useEventBus,
} from '@almadar/ui';
import { ContextMenu } from "./ContextMenu";

export interface RepeatableFormSectionProps {
  /** Section type identifier */
  sectionType: string;
  /** Section title */
  title: string;
  /** Items in the section */
  items: Array<{
    id: string;
    data?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  /** Render function for each item */
  renderItem: (
    item: {
      id: string;
      data?: Record<string, unknown>;
      [key: string]: unknown;
    },
    index: number,
  ) => React.ReactNode;
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
  /** Add handler - can accept data from renderForm */
  onAdd?: (data?: Record<string, unknown>) => void;
  /** Remove handler */
  onRemove?: (itemId: string, index: number) => void;
  /** Reorder handler */
  onReorder?: (fromIndex: number, toIndex: number) => void;
  /** Render custom form for adding items */
  renderForm?: (
    onAdd: (data: Record<string, unknown>) => void,
  ) => React.ReactNode;
  /** Context menu actions */
  contextMenu?: string[];
  /** Context action handler */
  onContextAction?: (action: string) => void;
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
  contextMenu,
  onContextAction,
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
    [sectionType, onRemove, eventBus],
  );

  return (
    <VStack gap="md" className={cn("w-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center">
        <HStack gap="sm" align="center">
          <Typography variant="h4">
            {title}
          </Typography>
          <Typography variant="small" className="text-[var(--color-muted-foreground)]">
            ({items.length}
            {maxItems !== Infinity ? `/${maxItems}` : ""})
          </Typography>
        </HStack>

        <HStack gap="sm">
          {canAdd && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAdd}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              {addLabel}
            </Button>
          )}

          {contextMenu && contextMenu.length > 0 && (
            <ContextMenu
              actions={contextMenu}
              onAction={(action) => onContextAction?.(action)}
            />
          )}
        </HStack>
      </HStack>

      {/* Items */}
      {items.length === 0 ? (
        <Card className="p-6">
          <VStack align="center" gap="sm" className="text-[var(--color-muted-foreground)]">
            <Typography variant="body">{emptyMessage}</Typography>
            {canAdd && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAdd}
                className="gap-1"
              >
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
                  <Box className="pt-2 cursor-move text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
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
