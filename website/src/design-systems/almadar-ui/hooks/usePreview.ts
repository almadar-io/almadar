/**
 * usePreview Hook
 *
 * Stub implementation for app preview state management.
 * Actual API calls should be implemented by the consuming client.
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { OrbitalSchema } from '@almadar/core';

export interface PreviewApp {
  id: string;
  name: string;
  status: 'loading' | 'ready' | 'error';
  schema?: OrbitalSchema;
  graphView: {
    version: string;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: number;
  read?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  autoDismiss?: boolean;
  dismissAfter?: number;
}

export interface NotificationsState {
  notifications: Notification[];
  isPanelOpen: boolean;
  closePanel: () => void;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export interface ErrorToast {
  message: string;
}

export interface UsePreviewResult {
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  loadError: string | null;
  app: PreviewApp | null;
  isFullscreen: boolean;
  isExecutingEvent: boolean;
  errorToast: ErrorToast | null;
  currentStateName: string | null;
  notifications: NotificationsState;
  startPreview: () => Promise<void>;
  stopPreview: () => Promise<void>;
  refresh: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleReset: () => Promise<void>;
  toggleFullscreen: () => void;
  setErrorToast: (toast: ErrorToast | null) => void;
  dismissErrorToast: () => void;
}

export interface UsePreviewOptions {
  appId?: string;
}

export function usePreview(options?: UsePreviewOptions): UsePreviewResult {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Start loading if we have an appId
  const [isLoading, setIsLoading] = useState(!!options?.appId);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [app, setApp] = useState<PreviewApp | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExecutingEvent, setIsExecutingEvent] = useState(false);
  const [errorToast, setErrorToast] = useState<ErrorToast | null>(null);
  const [currentStateName, setCurrentStateName] = useState<string | null>(null);
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const notifications: NotificationsState = useMemo(() => ({
    notifications: notificationsList,
    isPanelOpen,
    closePanel: () => setIsPanelOpen(false),
    dismissNotification: (id: string) => {
      setNotificationsList((prev) => prev.filter((n) => n.id !== id));
    },
    markAsRead: (id: string) => {
      setNotificationsList((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    },
    clearAll: () => setNotificationsList([]),
  }), [notificationsList, isPanelOpen]);

  // Load app data when appId changes
  // TODO: Implement actual app loading API call in consuming client
  useEffect(() => {
    const appId = options?.appId;
    if (!appId) {
      setApp(null);
      setIsLoading(false);
      return;
    }

    // Stub implementation - just set up preview URL without actual API call
    console.log('[usePreview] Setting up preview for app:', appId);
    setPreviewUrl(`/api/orbitals/${appId}`);
    setIsLoading(false);
  }, [options?.appId]);

  const startPreview = useCallback(async () => {
    // Preview is started automatically when app loads
    console.log('[usePreview] startPreview called');
  }, []);

  const stopPreview = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('[usePreview] Stopping preview server...');
      setPreviewUrl(null);
      setApp(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!previewUrl) return;
    console.log('[usePreview] Refreshing preview...');
    // Trigger iframe refresh by appending timestamp
    setPreviewUrl(`${previewUrl.split('?')[0]}?t=${Date.now()}`);
  }, [previewUrl]);

  const handleRefresh = useCallback(async () => {
    console.log('[usePreview] Handle refresh...');
    await refresh();
  }, [refresh]);

  const handleReset = useCallback(async () => {
    console.log('[usePreview] Resetting preview...');
    setError(null);
    setLoadError(null);
    setErrorToast(null);
    setIsExecutingEvent(false);
    setCurrentStateName(null);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const dismissErrorToast = useCallback(() => {
    setErrorToast(null);
  }, []);

  return {
    previewUrl,
    isLoading,
    error,
    loadError,
    app,
    isFullscreen,
    isExecutingEvent,
    errorToast,
    currentStateName,
    notifications,
    startPreview,
    stopPreview,
    refresh,
    handleRefresh,
    handleReset,
    toggleFullscreen,
    setErrorToast,
    dismissErrorToast,
  };
}
