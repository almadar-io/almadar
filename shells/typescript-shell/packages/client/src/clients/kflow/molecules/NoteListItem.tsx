/**
 * NoteListItem Molecule Component
 *
 * A single note item in a hierarchical note list with expand/collapse,
 * inline editing, and action buttons.
 *
 * Event Contract:
 * - Emits: UI:SELECT_NOTE { noteId }
 * - Emits: UI:DELETE_NOTE { noteId }
 * - Emits: UI:EDIT_NOTE { noteId, field }
 * - Emits: UI:EXPAND_NOTE { noteId, expanded }
 * - Emits: UI:ADD_CHILD_NOTE { parentNoteId }
 * - entityAware: true
 */

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  Tag,
} from "lucide-react";
import { Box } from "../../../components/atoms/Box";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { Typography } from "../../../components/atoms/Typography";
import { Icon } from "../../../components/atoms/Icon";
import { Card } from "../../../components/atoms/Card";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { useEventBus } from "../../../hooks/useEventBus";

export interface NoteData {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  level?: number;
  isExpanded?: boolean;
  hasChildren?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteListItemProps {
  /** Note data */
  note: NoteData;
  /** Whether this note is selected */
  isSelected?: boolean;
  /** Depth level for indentation */
  depth?: number;
  /** Show full content or truncated */
  showFullContent?: boolean;
  /** Callback when note is selected */
  onSelect?: (note: NoteData) => void;
  /** Callback when note is deleted */
  onDelete?: (noteId: string) => void;
  /** Callback when edit is requested */
  onEdit?: (note: NoteData) => void;
  /** Callback when expand/collapse is toggled */
  onToggleExpand?: (noteId: string) => void;
  /** Callback when add child is clicked */
  onAddChild?: (parentNoteId: string) => void;
  /** Children notes to render */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  isSelected = false,
  depth = 0,
  showFullContent = false,
  onSelect,
  onDelete,
  onEdit,
  onToggleExpand,
  onAddChild,
  children,
  className,
}) => {
  const eventBus = useEventBus();
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    eventBus.emit("UI:SELECT_NOTE", { noteId: note.id, entity: "Note" });
    onSelect?.(note);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:DELETE_NOTE", { noteId: note.id, entity: "Note" });
    onDelete?.(note.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:EDIT_NOTE", { noteId: note.id, entity: "Note" });
    onEdit?.(note);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:EXPAND_NOTE", {
      noteId: note.id,
      expanded: !note.isExpanded,
    });
    onToggleExpand?.(note.id);
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:ADD_CHILD_NOTE", {
      parentNoteId: note.id,
      entity: "Note",
    });
    onAddChild?.(note.id);
  };

  const contentPreview = showFullContent
    ? note.content
    : note.content.length > 100
      ? `${note.content.substring(0, 100)}...`
      : note.content;

  return (
    <Box style={{ marginLeft: depth * 24 }}>
      <Card
        className={`transition-all duration-200 ${
          isSelected
            ? "border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
            : "border border-gray-200 dark:border-gray-700 hover:border-gray-300 hover:shadow-sm"
        } ${className || ""}`}
        onClick={handleSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box className="p-4">
          <VStack gap="sm">
            {/* Header row */}
            <HStack justify="between" align="center">
              <HStack gap="sm" align="center">
                {/* Expand/Collapse button */}
                {note.hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleExpand}
                    className="p-1"
                  >
                    <Icon
                      icon={note.isExpanded ? ChevronDown : ChevronRight}
                      size="sm"
                    />
                  </Button>
                )}

                {/* Title */}
                <Typography
                  variant="h4"
                  className={`font-medium ${isSelected ? "text-indigo-900 dark:text-indigo-100" : ""}`}
                >
                  {note.title}
                </Typography>
              </HStack>

              {/* Action buttons */}
              {isHovered && (
                <HStack gap="xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEdit}
                    title="Edit"
                  >
                    <Icon icon={Edit2} size="sm" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddChild}
                    title="Add child note"
                  >
                    <Icon icon={Plus} size="sm" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Icon icon={Trash2} size="sm" />
                  </Button>
                </HStack>
              )}
            </HStack>

            {/* Content preview */}
            {note.content && (
              <Typography
                variant="body"
                className="text-gray-600 dark:text-gray-400"
              >
                {contentPreview}
              </Typography>
            )}

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <HStack gap="xs" className="flex-wrap">
                <Icon icon={Tag} size="sm" className="text-gray-400" />
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}

            {/* Metadata */}
            {note.updatedAt && (
              <Typography variant="small" className="text-gray-400">
                Updated: {new Date(note.updatedAt).toLocaleDateString()}
              </Typography>
            )}
          </VStack>
        </Box>
      </Card>

      {/* Children notes */}
      {note.isExpanded && children && <Box className="mt-2">{children}</Box>}
    </Box>
  );
};

NoteListItem.displayName = "NoteListItem";
