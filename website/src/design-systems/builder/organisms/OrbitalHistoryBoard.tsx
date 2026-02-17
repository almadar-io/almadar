/**
 * OrbitalHistoryBoard Component
 *
 * Displays a unified timeline of changesets and snapshots for OrbitalSchema.
 * Supports:
 * - Visual differentiation between changesets (changes) and snapshots (restore points)
 * - Revert to snapshot functionality
 * - Change summary display (added, modified, removed)
 * - Real-time updates via SSE integration
 */

import React, { useState } from 'react';
import {
  History,
  GitBranch,
  Camera,
  Undo2,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Edit,
  Clock,
  Bot,
  AlertCircle,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@almadar/ui';

// =============================================================================
// Types (inlined from useOrbitalHistory hook)
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
}

export interface OrbitalHistoryBoardProps {
  /** Timeline items (merged changesets and snapshots) */
  timeline: HistoryTimelineItem[];
  /** Current version number */
  currentVersion: number;
  /** Whether history is loading */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Callback to revert to a snapshot */
  onRevertToSnapshot: (snapshotId: string) => Promise<RevertResult>;
  /** Callback to refresh history */
  onRefresh: () => Promise<void>;
  /** Maximum height of the timeline */
  maxHeight?: string;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Helpers
// =============================================================================

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}

function formatFullDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

// =============================================================================
// TimelineItem Component
// =============================================================================

interface TimelineItemCardProps {
  item: HistoryTimelineItem;
  isCurrent: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRevert: () => void;
  isReverting: boolean;
}

function TimelineItemCard({
  item,
  isCurrent,
  isExpanded,
  onToggleExpand,
  onRevert,
  isReverting,
}: TimelineItemCardProps) {
  const isSnapshot = item.type === 'snapshot';

  return (
    <div
      className="relative border rounded-lg transition-all duration-200"
      style={{
        backgroundColor: isSnapshot
          ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)'
          : 'var(--color-card)',
        borderColor: isSnapshot
          ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)'
          : 'var(--color-border)',
        ...(isCurrent ? { boxShadow: '0 0 0 2px var(--color-ring)' } : {}),
      }}
    >
      {/* Timeline connector line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-0.5 -z-10"
        style={{ backgroundColor: 'var(--color-muted)' }}
      />

      {/* Header */}
      <div
        className="flex items-start gap-3 p-3 cursor-pointer"
        onClick={onToggleExpand}
      >
        {/* Timeline dot */}
        <div
          className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isSnapshot ? 'var(--color-accent)' : 'var(--color-muted)',
            color: isSnapshot ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
          }}
        >
          {isSnapshot ? (
            <Camera className="w-4 h-4" />
          ) : (
            <GitBranch className="w-4 h-4" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Version and type badge */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-mono font-medium text-sm"
              style={{ color: 'var(--color-foreground)' }}
            >
              v{item.version}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: isSnapshot
                  ? 'color-mix(in srgb, var(--color-accent) 20%, transparent)'
                  : 'var(--color-muted)',
                color: isSnapshot
                  ? 'var(--color-accent)'
                  : 'var(--color-muted-foreground)',
              }}
            >
              {isSnapshot ? 'Snapshot' : 'Changeset'}
            </span>
            {isCurrent && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-info) 20%, transparent)',
                  color: 'var(--color-info)',
                }}
              >
                Current
              </span>
            )}
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1 text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
            <Clock className="w-3 h-3" />
            <span title={formatFullDate(item.timestamp)}>
              {formatRelativeTime(item.timestamp)}
            </span>
            {item.source && (
              <span
                className="flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'var(--color-muted)' }}
              >
                <Bot className="w-3 h-3" />
                <span>{item.source}</span>
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
            {item.description}
          </p>

          {/* Change summary for changesets */}
          {item.summary && (
            <div className="flex items-center gap-2 mt-2">
              {item.summary.added > 0 && (
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-success)',
                    backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
                  }}
                >
                  <Plus className="w-3 h-3" />
                  {item.summary.added}
                </span>
              )}
              {item.summary.modified > 0 && (
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-warning)',
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)',
                  }}
                >
                  <Edit className="w-3 h-3" />
                  {item.summary.modified}
                </span>
              )}
              {item.summary.removed > 0 && (
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-error)',
                    backgroundColor: 'color-mix(in srgb, var(--color-error) 15%, transparent)',
                  }}
                >
                  <Minus className="w-3 h-3" />
                  {item.summary.removed}
                </span>
              )}
            </div>
          )}

          {/* Snapshot reason */}
          {item.reason && (
            <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>
              Reason: {item.reason}
            </p>
          )}
        </div>

        {/* Expand/collapse icon */}
        <button style={{ color: 'var(--color-muted-foreground)' }}>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Expanded content with revert action */}
      {isExpanded && isSnapshot && !isCurrent && (
        <div
          className="border-t p-3"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onRevert();
            }}
            disabled={isReverting}
          >
            <Undo2 className="w-4 h-4 mr-1" />
            {isReverting ? 'Restoring...' : 'Restore to this snapshot'}
          </Button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function OrbitalHistoryBoard({
  timeline,
  currentVersion,
  isLoading,
  error,
  onRevertToSnapshot,
  onRefresh,
  maxHeight = '600px',
  className = '',
}: OrbitalHistoryBoardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [revertResult, setRevertResult] = useState<RevertResult | null>(null);

  const handleRevert = async (snapshotId: string) => {
    setRevertingId(snapshotId);
    setRevertResult(null);

    try {
      const result = await onRevertToSnapshot(snapshotId);
      setRevertResult(result);

      if (result.success) {
        await onRefresh();
      }
    } finally {
      setRevertingId(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${className}`}
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="flex items-center gap-2">
          <History className="w-5 h-5" style={{ color: 'var(--color-muted-foreground)' }} />
          <h3 className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
            Schema History
          </h3>
          <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            (v{currentVersion}, {timeline.length} items)
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Success message */}
      {revertResult?.success && (
        <div
          className="mx-4 mt-3 flex items-center gap-2 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
            color: 'var(--color-success)',
          }}
        >
          <CheckCircle className="w-5 h-5" />
          <span>Successfully restored to snapshot</span>
        </div>
      )}

      {/* Error message */}
      {(error || revertResult?.error) && (
        <div
          className="mx-4 mt-3 flex items-center gap-2 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)',
            color: 'var(--color-error)',
          }}
        >
          <AlertCircle className="w-5 h-5" />
          <span>{error || revertResult?.error}</span>
        </div>
      )}

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight }}
      >
        {/* Loading state */}
        {isLoading && timeline.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12" style={{ color: 'var(--color-muted-foreground)' }}>
            <RefreshCw className="w-8 h-8 mb-3 animate-spin" />
            <p className="text-sm">Loading history...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && timeline.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12" style={{ color: 'var(--color-muted-foreground)' }}>
            <GitBranch className="w-12 h-12 mb-3" style={{ color: 'var(--color-muted-foreground)', opacity: 0.5 }} />
            <p className="text-sm">No history yet</p>
            <p className="text-xs mt-1">Changes will appear here after updates</p>
          </div>
        )}

        {/* Timeline items */}
        {timeline.length > 0 && (
          <div className="relative pl-4">
            {timeline.map((item) => (
              <TimelineItemCard
                key={item.id}
                item={item}
                isCurrent={item.version === currentVersion}
                isExpanded={expandedId === item.id}
                onToggleExpand={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                onRevert={() => handleRevert(item.id)}
                isReverting={revertingId === item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

OrbitalHistoryBoard.displayName = 'OrbitalHistoryBoard';
