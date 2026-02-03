/**
 * NoteList Organism Component
 *
 * A hierarchical list of notes with expand/collapse and selection.
 *
 * Event Contract:
 * - Emits events from NoteListItem children
 * - entityAware: true
 */

import React from "react";
import { Box } from "../../../components/atoms/Box";
import { VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Spinner } from "../../../components/atoms/Spinner";
import { NoteListItem, NoteData } from "../molecules/NoteListItem";
import { useEventBus } from "../../../hooks/useEventBus";

export interface NoteListProps {
  /** Array of notes to display */
  notes: NoteData[];
  /** Currently selected note ID */
  selectedNoteId?: string;
  /** Show full content in items */
  showFullContent?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Callback when note is selected */
  onSelectNote?: (note: NoteData) => void;
  /** Callback when note is deleted */
  onDeleteNote?: (noteId: string) => void;
  /** Callback when note edit is requested */
  onEditNote?: (note: NoteData) => void;
  /** Callback when note expand is toggled */
  onToggleExpand?: (noteId: string) => void;
  /** Callback when add child is clicked */
  onAddChild?: (parentNoteId: string) => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
}

// Helper to build tree structure from flat list
function buildNoteTree(
  notes: NoteData[],
  parentId: string | null = null,
  level: number = 0,
): NoteData[] {
  // If notes already have proper structure with children, use as-is
  if (notes.length > 0 && notes[0].hasChildren !== undefined) {
    return notes;
  }

  // Otherwise, assume flat list at root level
  return notes.map((note) => ({
    ...note,
    level,
    hasChildren: false,
  }));
}

// Recursive component to render note tree
const NoteTreeItem: React.FC<{
  note: NoteData;
  notes: NoteData[];
  selectedNoteId?: string;
  showFullContent: boolean;
  onSelectNote?: (note: NoteData) => void;
  onDeleteNote?: (noteId: string) => void;
  onEditNote?: (note: NoteData) => void;
  onToggleExpand?: (noteId: string) => void;
  onAddChild?: (parentNoteId: string) => void;
  depth: number;
}> = ({
  note,
  notes,
  selectedNoteId,
  showFullContent,
  onSelectNote,
  onDeleteNote,
  onEditNote,
  onToggleExpand,
  onAddChild,
  depth,
}) => {
  // Find children for this note (if any)
  const childNotes = notes.filter((n) => (n as any).parentId === note.id);

  return (
    <NoteListItem
      note={{
        ...note,
        hasChildren: childNotes.length > 0,
      }}
      isSelected={selectedNoteId === note.id}
      depth={depth}
      showFullContent={showFullContent}
      onSelect={onSelectNote}
      onDelete={onDeleteNote}
      onEdit={onEditNote}
      onToggleExpand={onToggleExpand}
      onAddChild={onAddChild}
    >
      {note.isExpanded &&
        childNotes.map((child) => (
          <NoteTreeItem
            key={child.id}
            note={child}
            notes={notes}
            selectedNoteId={selectedNoteId}
            showFullContent={showFullContent}
            onSelectNote={onSelectNote}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
            onToggleExpand={onToggleExpand}
            onAddChild={onAddChild}
            depth={depth + 1}
          />
        ))}
    </NoteListItem>
  );
};

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNoteId,
  showFullContent = false,
  isLoading = false,
  error = null,
  onSelectNote,
  onDeleteNote,
  onEditNote,
  onToggleExpand,
  onAddChild,
  emptyMessage = "No notes yet. Create one to get started!",
  className,
}) => {
  const eventBus = useEventBus();

  // Loading state
  if (isLoading) {
    return (
      <Box
        className={`flex items-center justify-center py-12 ${className || ""}`}
      >
        <VStack gap="md" align="center">
          <Spinner size="lg" />
          <Typography variant="body" className="text-gray-500">
            Loading notes...
          </Typography>
        </VStack>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box className={`py-8 ${className || ""}`}>
        <Typography variant="body" className="text-red-500 text-center">
          Error loading notes: {error.message}
        </Typography>
      </Box>
    );
  }

  // Empty state
  if (notes.length === 0) {
    return (
      <Box className={`py-12 ${className || ""}`}>
        <VStack gap="md" align="center">
          <Typography variant="body" className="text-gray-500 text-center">
            {emptyMessage}
          </Typography>
        </VStack>
      </Box>
    );
  }

  // Get root-level notes (those without a parentId or at level 0)
  const rootNotes = notes.filter((n) => !(n as any).parentId || n.level === 0);

  return (
    <Box className={className}>
      <VStack gap="sm">
        {rootNotes.map((note) => (
          <NoteTreeItem
            key={note.id}
            note={note}
            notes={notes}
            selectedNoteId={selectedNoteId}
            showFullContent={showFullContent}
            onSelectNote={onSelectNote}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
            onToggleExpand={onToggleExpand}
            onAddChild={onAddChild}
            depth={0}
          />
        ))}
      </VStack>
    </Box>
  );
};

NoteList.displayName = "NoteList";
