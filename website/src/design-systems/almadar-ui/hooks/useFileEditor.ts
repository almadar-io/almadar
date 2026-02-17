/**
 * useFileEditor Hook
 *
 * Manages file editing state and operations.
 */

import { useState, useCallback } from 'react';
import type { UseExtensionsResult } from './useExtensions';
import type { UseFileSystemResult } from './useFileSystem';
import type { OrbitalSchema } from '@almadar/core';

// =============================================================================
// Types
// =============================================================================

export interface OpenFile {
  path: string;
  content: string;
  isDirty: boolean;
  language?: string;
}

export interface UseFileEditorOptions {
  extensions: UseExtensionsResult;
  fileSystem: UseFileSystemResult;
  onSchemaUpdate?: (schema: OrbitalSchema) => Promise<void>;
}

export interface FileEditResult {
  success: boolean;
  action?: 'updated_schema' | 'converted_extension' | 'saved_extension' | 'saved';
  error?: string;
}

export interface UseFileEditorResult {
  openFiles: OpenFile[];
  activeFile: OpenFile | null;
  isSaving: boolean;
  openFile: (path: string) => Promise<void>;
  closeFile: (path: string) => void;
  setActiveFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  handleFileEdit: (path: string, content: string) => Promise<FileEditResult>;
  saveFile: (path: string) => Promise<void>;
  saveAllFiles: () => Promise<void>;
}

// =============================================================================
// Hook Implementation
// =============================================================================

export function useFileEditor(options: UseFileEditorOptions): UseFileEditorResult {
  const { extensions, fileSystem, onSchemaUpdate } = options;

  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const activeFile = openFiles.find(f => f.path === activeFilePath) || null;

  const openFile = useCallback(async (path: string) => {
    // Check if already open
    const existing = openFiles.find(f => f.path === path);
    if (existing) {
      setActiveFilePath(path);
      return;
    }

    try {
      const content = await fileSystem.readFile(path);
      const ext = extensions.getExtensionForFile(path);

      const newFile: OpenFile = {
        path,
        content,
        isDirty: false,
        language: ext?.language,
      };

      setOpenFiles(prev => [...prev, newFile]);
      setActiveFilePath(path);
    } catch (err) {
      console.error('[useFileEditor] Failed to open file:', err);
    }
  }, [openFiles, fileSystem, extensions]);

  const closeFile = useCallback((path: string) => {
    setOpenFiles(prev => prev.filter(f => f.path !== path));

    if (activeFilePath === path) {
      const remaining = openFiles.filter(f => f.path !== path);
      setActiveFilePath(remaining.length > 0 ? remaining[0].path : null);
    }
  }, [activeFilePath, openFiles]);

  const setActiveFile = useCallback((path: string) => {
    setActiveFilePath(path);
  }, []);

  const updateFileContent = useCallback((path: string, content: string) => {
    setOpenFiles(prev =>
      prev.map(f =>
        f.path === path ? { ...f, content, isDirty: true } : f
      )
    );
  }, []);

  const handleFileEdit = useCallback(async (path: string, content: string): Promise<FileEditResult> => {
    try {
      // Save the file
      await fileSystem.writeFile(path, content);

      // Determine the action based on file type
      let action: FileEditResult['action'] = 'saved';

      if (path.endsWith('.orb') || path.endsWith('schema.json')) {
        try {
          const schema = JSON.parse(content) as OrbitalSchema;
          await onSchemaUpdate?.(schema);
          action = 'updated_schema';
        } catch {
          // Not valid JSON, just save as file
        }
      } else if (path.includes('/extensions/')) {
        action = path.endsWith('.new') ? 'converted_extension' : 'saved_extension';
      }

      return { success: true, action };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to save file',
      };
    }
  }, [fileSystem, onSchemaUpdate]);

  const saveFile = useCallback(async (path: string) => {
    const file = openFiles.find(f => f.path === path);
    if (!file) return;

    setIsSaving(true);
    try {
      await fileSystem.writeFile(path, file.content);

      setOpenFiles(prev =>
        prev.map(f =>
          f.path === path ? { ...f, isDirty: false } : f
        )
      );

      // Check if this is a schema file
      if (path.endsWith('.orb') || path.endsWith('schema.json')) {
        try {
          const schema = JSON.parse(file.content) as OrbitalSchema;
          await onSchemaUpdate?.(schema);
        } catch {
          // Not valid JSON, ignore
        }
      }
    } catch (err) {
      console.error('[useFileEditor] Failed to save file:', err);
    } finally {
      setIsSaving(false);
    }
  }, [openFiles, fileSystem, onSchemaUpdate]);

  const saveAllFiles = useCallback(async () => {
    setIsSaving(true);
    try {
      const dirtyFiles = openFiles.filter(f => f.isDirty);
      for (const file of dirtyFiles) {
        await saveFile(file.path);
      }
    } finally {
      setIsSaving(false);
    }
  }, [openFiles, saveFile]);

  return {
    openFiles,
    activeFile,
    isSaving,
    openFile,
    closeFile,
    setActiveFile,
    updateFileContent,
    handleFileEdit,
    saveFile,
    saveAllFiles,
  };
}
