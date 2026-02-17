/**
 * FileOperationItem - Displays a file operation indicator
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import { Folder, BookOpen, FileEdit, Edit } from "lucide-react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Badge,
  Icon,
} from '@almadar/ui';

export type FileOperation = "ls" | "read_file" | "write_file" | "edit_file";

export interface FileOperationItemProps {
  operation: FileOperation;
  path: string;
  success?: boolean;
  /** Compact display mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const operationConfig: Record<
  FileOperation,
  {
    icon: typeof Folder;
    label: string;
    variant: "neutral" | "info" | "success" | "warning";
  }
> = {
  ls: { icon: Folder, label: "List", variant: "neutral" },
  read_file: { icon: BookOpen, label: "Read", variant: "info" },
  write_file: { icon: FileEdit, label: "Write", variant: "success" },
  edit_file: { icon: Edit, label: "Edit", variant: "warning" },
};

export function FileOperationItem({
  operation,
  path,
  success,
  compact = false,
  className = "",
}: FileOperationItemProps) {
  const config = operationConfig[operation];

  if (compact) {
    return (
      <HStack gap="sm" align="center" className={className}>
        <Icon icon={config.icon} size="sm" />
        <Typography variant="caption" color="muted" className="font-mono">
          {operation}
        </Typography>
        <Typography variant="caption" color="muted" className="font-mono truncate">
          {path}
        </Typography>
        {success === false && (
          <Typography variant="caption" color="error">
            ✗
          </Typography>
        )}
      </HStack>
    );
  }

  return (
    <Box bg="muted" padding="md" rounded="lg" className={className}>
      <HStack gap="md" align="center">
        <Icon icon={config.icon} size="md" />
        <VStack gap="none" className="flex-1 min-w-0">
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
          <Typography variant="caption" color="muted" className="font-mono truncate">
            {path}
          </Typography>
        </VStack>
        {success !== undefined && (
          <Typography
            variant="body1"
            color={success ? "success" : "error"}
          >
            {success ? "✓" : "✗"}
          </Typography>
        )}
      </HStack>
    </Box>
  );
}

export default FileOperationItem;
