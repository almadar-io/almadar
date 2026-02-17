/**
 * useFileSystem Hook
 *
 * Provides file system operations for WebContainer-based file management.
 * Handles booting, mounting files, reading/writing, and tree operations.
 */

import { useState, useCallback } from 'react';

// =============================================================================
// FileNode Type (defined locally to avoid dependency on FileTree component)
// =============================================================================

export interface FileNode {
  path: string;
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

// =============================================================================
// Types
// =============================================================================

export type FileSystemStatus = 'idle' | 'booting' | 'ready' | 'running' | 'error';

export interface FileSystemFile {
  path: string;
  content: string;
}

export interface SelectedFile {
  path: string;
  content: string;
  language?: string;
  isDirty?: boolean;
}

export interface UseFileSystemResult {
  status: FileSystemStatus;
  error: string | null;
  isLoading: boolean;
  files: FileNode[];
  selectedFile: SelectedFile | null;
  selectedPath: string | null;
  previewUrl: string | null;
  boot: () => Promise<void>;
  mountFiles: (files: FileSystemFile[] | Record<string, unknown>) => Promise<void>;
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, content: string) => Promise<void>;
  selectFile: (path: string) => Promise<void>;
  updateContent: (pathOrContent: string, content?: string) => void;
  updateSelectedContent: (content: string) => void;
  refreshTree: () => Promise<void>;
  runCommand: (command: string) => Promise<{ exitCode: number; output: string }>;
  startDevServer: () => Promise<void>;
}

// =============================================================================
// Hook Implementation
// =============================================================================

export function useFileSystem(): UseFileSystemResult {
  const [status, setStatus] = useState<FileSystemStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Map<string, string>>(new Map());

  const boot = useCallback(async () => {
    setStatus('booting');
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implement WebContainer boot
      console.log('[useFileSystem] Booting WebContainer...');
      await new Promise(resolve => setTimeout(resolve, 100));
      setStatus('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to boot');
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mountFiles = useCallback(async (filesToMount: FileSystemFile[] | Record<string, unknown>) => {
    setIsLoading(true);
    try {
      // Convert object format to array if needed
      let filesArray: FileSystemFile[];
      if (Array.isArray(filesToMount)) {
        filesArray = filesToMount;
      } else {
        // Convert FileSystemTree object to array
        filesArray = [];
        const flattenTree = (obj: Record<string, unknown>, basePath = '') => {
          for (const [key, value] of Object.entries(obj)) {
            const path = basePath ? `${basePath}/${key}` : key;
            if (value && typeof value === 'object' && 'file' in value) {
              const fileObj = value as { file: { contents: string } };
              filesArray.push({ path, content: fileObj.file.contents || '' });
            } else if (value && typeof value === 'object' && 'directory' in value) {
              const dirObj = value as { directory: Record<string, unknown> };
              flattenTree(dirObj.directory, path);
            }
          }
        };
        flattenTree(filesToMount);
      }

      // Store file contents
      const newContents = new Map<string, string>();
      for (const file of filesArray) {
        newContents.set(file.path, file.content);
      }
      setFileContents(newContents);

      // Build tree from files
      const newTree: FileNode[] = [];
      for (const file of filesArray) {
        const parts = file.path.split('/').filter(Boolean);
        let current = newTree;

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          const isFile = i === parts.length - 1;
          const currentPath = '/' + parts.slice(0, i + 1).join('/');

          let node = current.find(n => n.name === part);
          if (!node) {
            node = {
              path: currentPath,
              name: part,
              type: isFile ? 'file' : 'directory',
              children: isFile ? undefined : [],
            };
            current.push(node);
          }

          if (!isFile && node && node.children) {
            current = node.children;
          }
        }
      }

      setFiles(newTree);
      setStatus('running');
    } catch (err) {
      console.error('[useFileSystem] Failed to mount files:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const readFile = useCallback(async (path: string): Promise<string> => {
    return fileContents.get(path) || '';
  }, [fileContents]);

  const writeFile = useCallback(async (path: string, content: string) => {
    setFileContents(prev => {
      const next = new Map(prev);
      next.set(path, content);
      return next;
    });
  }, []);

  const selectFile = useCallback(async (path: string) => {
    const content = fileContents.get(path) || '';
    const ext = path.split('.').pop()?.toLowerCase() || '';

    const languageMap: Record<string, string> = {
      ts: 'typescript',
      tsx: 'typescript',
      js: 'javascript',
      jsx: 'javascript',
      json: 'json',
      md: 'markdown',
      css: 'css',
      html: 'html',
      orb: 'json',
    };

    setSelectedPath(path);
    setSelectedFile({
      path,
      content,
      language: languageMap[ext] || 'plaintext',
      isDirty: false,
    });
  }, [fileContents]);

  const updateContent = useCallback((pathOrContent: string, contentArg?: string) => {
    // Support both signatures: (path, content) and (content) - latter uses selectedPath
    const path = contentArg !== undefined ? pathOrContent : selectedPath;
    const content = contentArg !== undefined ? contentArg : pathOrContent;

    if (!path) {
      console.warn('[useFileSystem] updateContent called without path and no file selected');
      return;
    }

    setFileContents(prev => {
      const next = new Map(prev);
      next.set(path, content);
      return next;
    });
    if (selectedPath === path) {
      setSelectedFile(prev => prev ? { ...prev, content, isDirty: true } : null);
    }
  }, [selectedPath]);

  const updateSelectedContent = useCallback((content: string) => {
    setSelectedFile(prev => prev ? { ...prev, content, isDirty: true } : null);
  }, []);

  const refreshTree = useCallback(async () => {
    console.log('[useFileSystem] Refreshing tree');
  }, []);

  const runCommand = useCallback(async (command: string) => {
    console.log('[useFileSystem] Running command:', command);
    return { exitCode: 0, output: '' };
  }, []);

  const startDevServer = useCallback(async () => {
    console.log('[useFileSystem] Starting dev server');
    // TODO: Implement dev server start
    setPreviewUrl('http://localhost:5173');
  }, []);

  return {
    status,
    error,
    isLoading,
    files,
    selectedFile,
    selectedPath,
    previewUrl,
    boot,
    mountFiles,
    readFile,
    writeFile,
    selectFile,
    updateContent,
    updateSelectedContent,
    refreshTree,
    runCommand,
    startDevServer,
  };
}
