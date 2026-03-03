'use client';
/**
 * useOrbitalHistory Hook
 *
 * Provides version control timeline for OrbitalSchema changes.
 * Tracks changesets and snapshots, supports reverting to previous versions.
 */

import { useState, useEffect, useCallback } from 'react';
import type { OrbitalSchema } from '@almadar/core';

// =============================================================================
// Types
// =============================================================================

export interface ChangeSummary {
  added: number;
  modified: number;
  removed: number;
}

export interface HistoryTimelineItem {
  id: string;
  type: 'changeset' | 'snapshot';
  version: number;
  timestamp: number;
  description: string;
  source?: string;
  summary?: ChangeSummary;
  reason?: string;
}

export interface RevertResult {
  success: boolean;
  error?: string;
  restoredSchema?: OrbitalSchema;
}

export interface UseOrbitalHistoryOptions {
  appId: string | null;
  /** Firebase auth token for authenticated API requests */
  authToken?: string | null;
  /** User ID for x-user-id header (required for Firestore path) */
  userId?: string | null;
  onHistoryChange?: (timeline: HistoryTimelineItem[]) => void;
  onRevertSuccess?: (restoredSchema: OrbitalSchema) => void;
}

export interface UseOrbitalHistoryResult {
  timeline: HistoryTimelineItem[];
  currentVersion: number;
  isLoading: boolean;
  error: string | null;
  revertToSnapshot: (snapshotId: string) => Promise<RevertResult>;
  refresh: () => Promise<void>;
}

// =============================================================================
// Hook Implementation
// =============================================================================

export function useOrbitalHistory(options: UseOrbitalHistoryOptions): UseOrbitalHistoryResult {
  const { appId, authToken, userId, onHistoryChange, onRevertSuccess } = options;

  // Helper to create headers with auth token and user ID
  const getHeaders = useCallback((): HeadersInit => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    if (userId) {
      headers['x-user-id'] = userId;
    }
    return headers;
  }, [authToken, userId]);

  const [timeline, setTimeline] = useState<HistoryTimelineItem[]>([]);
  const [currentVersion, setCurrentVersion] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!appId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch changesets and snapshots in parallel
      const headers = getHeaders();
      const [changesetsRes, snapshotsRes] = await Promise.all([
        fetch(`/api/graphs/${appId}/history/changesets`, { headers }),
        fetch(`/api/graphs/${appId}/history/snapshots`, { headers }),
      ]);

      if (!changesetsRes.ok) {
        throw new Error(`Failed to fetch changesets: ${changesetsRes.status}`);
      }
      if (!snapshotsRes.ok) {
        throw new Error(`Failed to fetch snapshots: ${snapshotsRes.status}`);
      }

      const changesetsData = await changesetsRes.json();
      const snapshotsData = await snapshotsRes.json();

      // Map changesets to timeline items
      const changesetItems: HistoryTimelineItem[] = (changesetsData.changesets || []).map((cs: {
        id: string;
        version: number;
        timestamp: number;
        source?: string;
        summary?: ChangeSummary;
      }) => ({
        id: cs.id,
        type: 'changeset' as const,
        version: cs.version,
        timestamp: cs.timestamp,
        description: `Version ${cs.version}`,
        source: cs.source,
        summary: cs.summary,
      }));

      // Map snapshots to timeline items
      const snapshotItems: HistoryTimelineItem[] = (snapshotsData.snapshots || []).map((snap: {
        id: string;
        version: number;
        timestamp: number;
        reason?: string;
      }) => ({
        id: snap.id,
        type: 'snapshot' as const,
        version: snap.version,
        timestamp: snap.timestamp,
        description: snap.reason || `Snapshot v${snap.version}`,
        reason: snap.reason,
      }));

      // Merge and sort by timestamp (newest first)
      const mergedTimeline = [...changesetItems, ...snapshotItems].sort(
        (a, b) => b.timestamp - a.timestamp
      );

      setTimeline(mergedTimeline);

      // Update current version from the latest item
      if (mergedTimeline.length > 0) {
        setCurrentVersion(mergedTimeline[0].version);
      }
    } catch (err) {
      console.error('[useOrbitalHistory] Failed to load history:', err);
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setIsLoading(false);
    }
  }, [appId, getHeaders]);

  const revertToSnapshot = useCallback(async (snapshotId: string): Promise<RevertResult> => {
    if (!appId) {
      return { success: false, error: 'No app ID provided' };
    }

    try {
      const response = await fetch(`/api/graphs/${appId}/history/revert/${snapshotId}`, {
        method: 'POST',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to revert: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.schema) {
        // Refresh timeline after successful revert
        await refresh();

        // Call success callback with restored schema
        onRevertSuccess?.(data.schema);

        return {
          success: true,
          restoredSchema: data.schema,
        };
      }

      return {
        success: false,
        error: data.error || 'Unknown error during revert',
      };
    } catch (err) {
      console.error('[useOrbitalHistory] Failed to revert:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to revert',
      };
    }
  }, [appId, getHeaders, refresh, onRevertSuccess]);

  // Load history on mount and when appId/authToken/userId changes
  // Wait for authToken and userId to be available before fetching
  useEffect(() => {
    if (appId && authToken && userId) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId, authToken, userId]);

  // Call onHistoryChange when timeline changes (separate effect to avoid infinite loop)
  useEffect(() => {
    onHistoryChange?.(timeline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]);

  return {
    timeline,
    currentVersion,
    isLoading,
    error,
    revertToSnapshot,
    refresh,
  };
}
