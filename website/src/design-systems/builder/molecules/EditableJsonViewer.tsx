/**
 * Editable JSON Viewer Component
 *
 * Allows editing JSON data in a textarea and saving changes.
 *
 * Event Contract:
 * - Emits: UI:JSON_CHANGE - When JSON content is edited
 * - Payload: { value: object }
 */

import React, { useState, useCallback, useEffect } from "react";
import { Copy, Check, Save, X, Edit2 } from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Textarea,
  Alert,
} from '@almadar/ui';

export interface EditableJsonViewerProps {
  data: any;
  title?: string;
  maxHeight?: string;
  className?: string;
  onSave?: (updatedData: any) => Promise<void>;
  readOnly?: boolean;
}

export const EditableJsonViewer: React.FC<EditableJsonViewerProps> = ({
  data,
  title,
  maxHeight = "400px",
  className = "",
  onSave,
  readOnly = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isEditing && !editedJson) {
      try {
        setEditedJson(JSON.stringify(data, null, 2));
        setJsonError(null);
      } catch (err) {
        setJsonError("Failed to serialize data");
      }
    }
  }, [isEditing, data, editedJson]);

  const handleCopy = useCallback(async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  }, [data]);

  const handleEdit = useCallback(() => {
    try {
      setEditedJson(JSON.stringify(data, null, 2));
      setJsonError(null);
      setIsEditing(true);
    } catch (err) {
      setJsonError("Failed to serialize data");
    }
  }, [data]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditedJson("");
    setJsonError(null);
  }, []);

  const validateJson = useCallback(
    (jsonString: string): { valid: boolean; data?: any; error?: string } => {
      try {
        const parsed = JSON.parse(jsonString);
        return { valid: true, data: parsed };
      } catch (err) {
        return {
          valid: false,
          error: err instanceof Error ? err.message : "Invalid JSON",
        };
      }
    },
    [],
  );

  const handleJsonChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setEditedJson(value);
      const validation = validateJson(value);
      if (!validation.valid) {
        setJsonError(validation.error || "Invalid JSON");
      } else {
        setJsonError(null);
      }
    },
    [validateJson],
  );

  const handleSave = useCallback(async () => {
    if (!onSave) return;

    const validation = validateJson(editedJson);
    if (!validation.valid) {
      setJsonError(validation.error || "Invalid JSON");
      return;
    }

    setIsSaving(true);
    setJsonError(null);

    try {
      await onSave(validation.data);
      setIsEditing(false);
      setEditedJson("");
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }, [editedJson, onSave, validateJson]);

  if (!data) {
    return null;
  }

  return (
    <Box bg="surface" border rounded="lg" className={className} display="flex">
      <VStack gap="none" className="flex-1">
        {/* Header */}
        <Box padding="md" border className="border-t-0 border-l-0 border-r-0">
          <HStack justify="between" align="center">
            <Typography variant="h6" truncate>
              {title || "JSON Data"}
            </Typography>
            <HStack gap="xs">
              {!isEditing && (
                <>
                  {!readOnly && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                      leftIcon={<Edit2 className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    leftIcon={
                      copied ? (
                        <Check className="w-4 h-4 text-[var(--color-success)]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )
                    }
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </>
              )}
              {isEditing && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isSaving}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving || !!jsonError}
                    isLoading={isSaving}
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Save
                  </Button>
                </>
              )}
            </HStack>
          </HStack>
        </Box>

        {/* Content */}
        <Box padding="md" overflow="auto" style={{ maxHeight }}>
          {isEditing ? (
            <VStack gap="sm">
              {jsonError && <Alert variant="error" message={jsonError} />}
              <Textarea
                value={editedJson}
                onChange={handleJsonChange}
                onKeyDown={(e) => {
                  if (
                    (e.ctrlKey || e.metaKey) &&
                    e.key === "Enter" &&
                    !jsonError
                  ) {
                    e.preventDefault();
                    handleSave();
                  }
                  if (e.key === "Escape") {
                    handleCancel();
                  }
                }}
                className="font-mono text-xs min-h-[300px]"
                error={jsonError || undefined}
              />
              <Typography variant="caption" color="muted">
                Press Ctrl+Enter to save, Esc to cancel
              </Typography>
            </VStack>
          ) : (
            <Box
              as="pre"
              className="text-xs font-mono whitespace-pre-wrap overflow-auto"
            >
              <Typography variant="caption" className="font-mono" as="code">
                {JSON.stringify(data, null, 2)}
              </Typography>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default EditableJsonViewer;
