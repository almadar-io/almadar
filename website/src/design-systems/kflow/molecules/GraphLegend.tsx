/**
 * GraphLegend - Legend for graph visualizations showing node/edge types
 *
 * Orbital Entity Binding:
 * - Data flows through `items` prop
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:TOGGLE_LEGEND_ITEM - When a legend item is clicked to toggle visibility
 */

import React from "react";
import {
  Box,
  VStack,
  HStack,
  useEventBus,
} from '@almadar/ui';

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  visible?: boolean;
  count?: number;
}

export interface GraphLegendProps {
  /** Legend items to display */
  items: LegendItem[];
  /** Title for the legend */
  title?: string;
  /** Whether items are interactive (toggleable) */
  interactive?: boolean;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
}

export const GraphLegend: React.FC<GraphLegendProps> = ({
  items,
  title,
  interactive = false,
  direction = "vertical",
  className = "",
}) => {
  const { emit } = useEventBus();

  const handleItemClick = (item: LegendItem) => {
    if (interactive) {
      emit("UI:TOGGLE_LEGEND_ITEM", {
        itemId: item.id,
        visible: !item.visible,
      });
    }
  };

  const Container = direction === "horizontal" ? HStack : VStack;

  return (
    <VStack
      gap="sm"
      className={`p-3 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {title && (
        <span className="text-sm font-semibold text-[var(--color-foreground)]">{title}</span>
      )}
      <Container gap="sm" wrap={direction === "horizontal"}>
        {items.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              ${interactive ? "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2" : ""}
              ${item.visible === false ? "opacity-50" : ""}
            `}
          >
            <HStack gap="sm" align="center">
              <Box
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-[var(--color-foreground)]">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-xs text-[var(--color-muted-foreground)] ml-1">
                  ({item.count})
                </span>
              )}
            </HStack>
          </Box>
        ))}
      </Container>
    </VStack>
  );
};

GraphLegend.displayName = "GraphLegend";

/**
 * Default node type colors for knowledge graphs
 */
export const NODE_TYPE_COLORS: Record<string, string> = {
  concept: "#6366f1", // indigo
  topic: "#8b5cf6", // violet
  skill: "#10b981", // emerald
  lesson: "#f59e0b", // amber
  quiz: "#ef4444", // red
  resource: "#3b82f6", // blue
  default: "#6b7280", // gray
};

/**
 * Default edge type colors for knowledge graphs
 */
export const EDGE_TYPE_COLORS: Record<string, string> = {
  prerequisite: "#ef4444", // red
  related: "#6366f1", // indigo
  contains: "#10b981", // emerald
  references: "#3b82f6", // blue
  default: "#9ca3af", // gray
};
