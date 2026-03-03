/**
 * NoteContent Molecule Component
 *
 * Editable content area for notes with click-to-edit functionality.
 *
 * Event Contract:
 * - Emits: UI:EDIT_NOTE_CONTENT { noteId }
 * - Emits: UI:SAVE_NOTE_CONTENT { noteId, content }
 * - entityAware: true
 */

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Textarea,
  Typography,
  useEventBus,
} from '@almadar/ui';

export interface NoteContentProps {
  /** Note ID */
  noteId: string;
  /** Current content value */
  content: string;
  /** Whether the content is being edited */
  isEditing?: boolean;
  /** Show full content or truncated preview */
  showFullContent?: boolean;
  /** Maximum characters to show in preview */
  previewLength?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Number of rows for textarea */
  rows?: number;
  /** Callback when content changes */
  onChange?: (content: string) => void;
  /** Callback when editing starts */
  onStartEditing?: () => void;
  /** Callback when editing ends (save) */
  onSave?: (content: string) => void;
  /** Callback when editing is cancelled */
  onCancel?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const NoteContent = ({
  noteId,
  content,
  isEditing: externalIsEditing,
  showFullContent = false,
  previewLength = 100,
  placeholder = "Add your notes here...",
  rows = 4,
  onChange,
  onStartEditing,
  onSave,
  onCancel,
  className,
}: NoteContentProps) => {
  const eventBus = useEventBus();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalEditing, setInternalEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  const isEditing = externalIsEditing ?? internalEditing;

  // Reset edit value when content changes externally
  useEffect(() => {
    if (!isEditing) {
      setEditValue(content);
    }
  }, [content, isEditing]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setInternalEditing(true);
    setEditValue(content);
    eventBus.emit("UI:EDIT_NOTE_CONTENT", { noteId, entity: "Note" });
    onStartEditing?.();
  };

  const handleSave = () => {
    setInternalEditing(false);
    eventBus.emit("UI:SAVE_NOTE_CONTENT", {
      noteId,
      content: editValue,
      entity: "Note",
    });
    onSave?.(editValue);
  };

  const handleCancel = () => {
    setInternalEditing(false);
    setEditValue(content);
    onCancel?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    } else if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    }
  };

  // Editing mode
  if (isEditing) {
    return (
      <Box className={className} onClick={(e) => e.stopPropagation()}>
        <Textarea
          ref={textareaRef}
          value={editValue}
          onChange={handleChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          rows={rows}
          placeholder={placeholder}
          className="w-full border-2 border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Typography variant="small" className="text-[var(--color-muted-foreground)] mt-1">
          Ctrl+Enter to save, Esc to cancel
        </Typography>
      </Box>
    );
  }

  // Display mode
  const displayContent = showFullContent
    ? content || "No content"
    : content.length > previewLength
      ? `${content.substring(0, previewLength)}...`
      : content || "No content";

  return (
    <Box
      className={`cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 transition-colors ${className || ""}`}
      onClick={handleStartEditing}
      title="Click to edit content"
    >
      <Typography
        variant="body"
        className={`${content ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)] italic"}`}
      >
        {displayContent}
      </Typography>
    </Box>
  );
};

NoteContent.displayName = "NoteContent";
