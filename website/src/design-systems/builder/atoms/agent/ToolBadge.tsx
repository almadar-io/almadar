/**
 * ToolBadge - Displays a tool name as a styled badge/pill
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import {
  Badge,
  type BadgeVariant,
  HStack,
  Typography,
} from '@almadar/ui';

export interface ToolBadgeProps {
  tool: string;
  /** Variant for different tool types */
  variant?: "default" | "file" | "shell" | "schema";
  /** Size */
  size?: "sm" | "md";
}

const toolVariants: Record<
  string,
  { icon: string; variant: ToolBadgeProps["variant"] }
> = {
  // File operations
  ls: { icon: "📁", variant: "file" },
  read_file: { icon: "📖", variant: "file" },
  write_file: { icon: "📝", variant: "file" },
  edit_file: { icon: "✏️", variant: "file" },
  // Shell operations
  execute: { icon: "⚡", variant: "shell" },
  bash: { icon: "💻", variant: "shell" },
  // Schema operations
  validate: { icon: "✅", variant: "schema" },
  generate_schema: { icon: "🔧", variant: "schema" },
};

const variantToBadgeVariant: Record<
  NonNullable<ToolBadgeProps["variant"]>,
  BadgeVariant
> = {
  default: "neutral",
  file: "info",
  shell: "warning",
  schema: "success",
};

export function ToolBadge({ tool, variant, size = "sm" }: ToolBadgeProps) {
  const toolConfig = toolVariants[tool];
  const effectiveVariant = variant || toolConfig?.variant || "default";
  const icon = toolConfig?.icon || "🔧";

  return (
    <Badge variant={variantToBadgeVariant[effectiveVariant]} size={size}>
      <HStack gap="xs" align="center">
        <Typography variant="caption">{icon}</Typography>
        <Typography variant="caption" className="font-mono">
          {tool}
        </Typography>
      </HStack>
    </Badge>
  );
}

export default ToolBadge;
