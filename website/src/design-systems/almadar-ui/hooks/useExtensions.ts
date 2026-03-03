'use client';
/**
 * useExtensions Hook
 *
 * Manages loading and accessing language/editor extensions.
 */

import { useState, useEffect, useCallback } from 'react';

// =============================================================================
// Types
// =============================================================================

export interface Extension {
  id: string;
  name: string;
  language?: string;
  loaded: boolean;
}

export interface ExtensionEntry {
  file: string;
  language?: string;
}

export interface ExtensionManifest {
  languages: Record<string, { extensions: string[]; icon?: string; color?: string }>;
  extensions: ExtensionEntry[];
}

export interface UseExtensionsOptions {
  appId: string;
  loadOnMount?: boolean;
}

export interface UseExtensionsResult {
  extensions: Extension[];
  manifest: ExtensionManifest;
  isLoading: boolean;
  error: string | null;
  loadExtension: (extensionId: string) => Promise<void>;
  loadExtensions: () => Promise<void>;
  getExtensionForFile: (filename: string) => Extension | null;
}

// Default manifest
const defaultManifest: ExtensionManifest = {
  languages: {
    typescript: { extensions: ['.ts', '.tsx'], icon: 'ts', color: '#3178c6' },
    javascript: { extensions: ['.js', '.jsx'], icon: 'js', color: '#f7df1e' },
    json: { extensions: ['.json', '.orb'], icon: 'json', color: '#000000' },
    css: { extensions: ['.css'], icon: 'css', color: '#264de4' },
    html: { extensions: ['.html'], icon: 'html', color: '#e34c26' },
    markdown: { extensions: ['.md', '.mdx'], icon: 'md', color: '#083fa1' },
  },
  extensions: [],
};

// =============================================================================
// Hook Implementation
// =============================================================================

export function useExtensions(options: UseExtensionsOptions): UseExtensionsResult {
  const { appId, loadOnMount = true } = options;

  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [manifest] = useState<ExtensionManifest>(defaultManifest);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExtension = useCallback(async (extensionId: string) => {
    console.log('[useExtensions] Loading extension:', extensionId);
  }, []);

  const loadExtensions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const defaultExtensions: Extension[] = [
        { id: 'typescript', name: 'TypeScript', language: 'typescript', loaded: true },
        { id: 'javascript', name: 'JavaScript', language: 'javascript', loaded: true },
        { id: 'json', name: 'JSON', language: 'json', loaded: true },
        { id: 'css', name: 'CSS', language: 'css', loaded: true },
        { id: 'html', name: 'HTML', language: 'html', loaded: true },
        { id: 'markdown', name: 'Markdown', language: 'markdown', loaded: true },
      ];

      setExtensions(defaultExtensions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load extensions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getExtensionForFile = useCallback((filename: string): Extension | null => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext) return null;

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

    const language = languageMap[ext];
    if (!language) return null;

    return extensions.find(e => e.language === language) || null;
  }, [extensions]);

  useEffect(() => {
    if (!appId || !loadOnMount) return;

    const loadExtensions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const defaultExtensions: Extension[] = [
          { id: 'typescript', name: 'TypeScript', language: 'typescript', loaded: true },
          { id: 'javascript', name: 'JavaScript', language: 'javascript', loaded: true },
          { id: 'json', name: 'JSON', language: 'json', loaded: true },
          { id: 'css', name: 'CSS', language: 'css', loaded: true },
          { id: 'html', name: 'HTML', language: 'html', loaded: true },
          { id: 'markdown', name: 'Markdown', language: 'markdown', loaded: true },
        ];

        setExtensions(defaultExtensions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load extensions');
      } finally {
        setIsLoading(false);
      }
    };

    loadExtensions();
  }, [appId, loadOnMount]);

  return {
    extensions,
    manifest,
    isLoading,
    error,
    loadExtension,
    loadExtensions,
    getExtensionForFile,
  };
}
