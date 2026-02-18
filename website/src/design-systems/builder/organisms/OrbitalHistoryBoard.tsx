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
import { Button, Typography, Badge, Box, VStack, HStack, Icon } from '@almadar/ui';

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
    <Box
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
      <Box
        className="absolute left-6 top-0 bottom-0 w-0.5 -z-10"
        style={{ backgroundColor: 'var(--color-muted)' }}
      />

      {/* Header */}
      <HStack
        className="p-3 cursor-pointer"
        align="start"
        gap="sm"
        onClick={onToggleExpand}
      >
        {/* Timeline dot */}
        <Box
          className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isSnapshot ? 'var(--color-accent)' : 'var(--color-muted)',
            color: isSnapshot ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
          }}
        >
          {isSnapshot ? (
            <Icon icon={Camera} size="sm" />
          ) : (
            <Icon icon={GitBranch} size="sm" />
          )}
        </Box>

        {/* Content */}
        <VStack gap="xs" className="flex-1 min-w-0">
          {/* Version and type badge */}
          <HStack gap="xs" align="center" className="mb-1">
            <Typography
              variant="label"
              className="font-mono font-medium text-sm"
              style={{ color: 'var(--color-foreground)' }}
            >
              v{item.version}
            </Typography>
            <Typography
              variant="caption"
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
            </Typography>
            {isCurrent && (
              <Typography
                variant="caption"
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-info) 20%, transparent)',
                  color: 'var(--color-info)',
                }}
              >
                Current
              </Typography>
            )}
          </HStack>

          {/* Timestamp */}
          <HStack gap="xs" align="center" className="text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
            <Icon icon={Clock} size="xs" />
            <Box title={formatFullDate(item.timestamp)} display="inline-block">
              <Typography
                variant="caption"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {formatRelativeTime(item.timestamp)}
              </Typography>
            </Box>
            {item.source && (
              <HStack
                gap="xs"
                align="center"
                className="ml-2 px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'var(--color-muted)' }}
              >
                <Icon icon={Bot} size="xs" />
                <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
                  {item.source}
                </Typography>
              </HStack>
            )}
          </HStack>

          {/* Description */}
          <Typography variant="body2" weight="medium" style={{ color: 'var(--color-foreground)' }}>
            {item.description}
          </Typography>

          {/* Change summary for changesets */}
          {item.summary && (
            <HStack gap="xs" align="center" className="mt-2">
              {item.summary.added > 0 && (
                <HStack
                  gap="xs"
                  align="center"
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-success)',
                    backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
                  }}
                >
                  <Icon icon={Plus} size="xs" />
                  <Typography variant="caption" style={{ color: 'var(--color-success)' }}>
                    {item.summary.added}
                  </Typography>
                </HStack>
              )}
              {item.summary.modified > 0 && (
                <HStack
                  gap="xs"
                  align="center"
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-warning)',
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)',
                  }}
                >
                  <Icon icon={Edit} size="xs" />
                  <Typography variant="caption" style={{ color: 'var(--color-warning)' }}>
                    {item.summary.modified}
                  </Typography>
                </HStack>
              )}
              {item.summary.removed > 0 && (
                <HStack
                  gap="xs"
                  align="center"
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    color: 'var(--color-error)',
                    backgroundColor: 'color-mix(in srgb, var(--color-error) 15%, transparent)',
                  }}
                >
                  <Icon icon={Minus} size="xs" />
                  <Typography variant="caption" style={{ color: 'var(--color-error)' }}>
                    {item.summary.removed}
                  </Typography>
                </HStack>
              )}
            </HStack>
          )}

          {/* Snapshot reason */}
          {item.reason && (
            <Typography variant="caption" className="mt-1" style={{ color: 'var(--color-accent)' }}>
              Reason: {item.reason}
            </Typography>
          )}
        </VStack>

        {/* Expand/collapse icon */}
        <Button variant="ghost" size="sm" style={{ color: 'var(--color-muted-foreground)', padding: 0 }}>
          {isExpanded ? (
            <Icon icon={ChevronDown} size="sm" />
          ) : (
            <Icon icon={ChevronRight} size="sm" />
          )}
        </Button>
      </HStack>

      {/* Expanded content with revert action */}
      {isExpanded && isSnapshot && !isCurrent && (
        <Box
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
            <Icon icon={Undo2} size="sm" className="mr-1" />
            {isReverting ? 'Restoring...' : 'Restore to this snapshot'}
          </Button>
        </Box>
      )}
    </Box>
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
    <VStack
      gap="none"
      className={`h-full ${className}`}
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      {/* Header */}
      <HStack
        justify="between"
        align="center"
        className="px-4 py-3 border-b"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <HStack gap="sm" align="center">
          <Icon icon={History} size="md" style={{ color: 'var(--color-muted-foreground)' }} />
          <Typography variant="label" weight="semibold" style={{ color: 'var(--color-foreground)' }}>
            Schema History
          </Typography>
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
            (v{currentVersion}, {timeline.length} items)
          </Typography>
        </HStack>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <Icon icon={RefreshCw} size="sm" animation={isLoading ? 'spin' : 'none'} />
        </Button>
      </HStack>

      {/* Success message */}
      {revertResult?.success && (
        <HStack
          gap="sm"
          align="center"
          className="mx-4 mt-3 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
          }}
        >
          <Icon icon={CheckCircle} size="md" style={{ color: 'var(--color-success)' }} />
          <Typography variant="body2" style={{ color: 'var(--color-success)' }}>
            Successfully restored to snapshot
          </Typography>
        </HStack>
      )}

      {/* Error message */}
      {(error || revertResult?.error) && (
        <HStack
          gap="sm"
          align="center"
          className="mx-4 mt-3 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)',
          }}
        >
          <Icon icon={AlertCircle} size="md" style={{ color: 'var(--color-error)' }} />
          <Typography variant="body2" style={{ color: 'var(--color-error)' }}>
            {error || revertResult?.error}
          </Typography>
        </HStack>
      )}

      {/* Content */}
      <Box
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight }}
      >
        {/* Loading state */}
        {isLoading && timeline.length === 0 && (
          <VStack align="center" justify="center" gap="sm" className="py-12" style={{ color: 'var(--color-muted-foreground)' }}>
            <Icon icon={RefreshCw} size="xl" animation="spin" style={{ color: 'var(--color-muted-foreground)' }} />
            <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
              Loading history...
            </Typography>
          </VStack>
        )}

        {/* Empty state */}
        {!isLoading && timeline.length === 0 && (
          <VStack align="center" justify="center" gap="sm" className="py-12" style={{ color: 'var(--color-muted-foreground)' }}>
            <Icon
              icon={GitBranch}
              size="xl"
              style={{ color: 'var(--color-muted-foreground)', opacity: 0.5 }}
              className="w-12 h-12"
            />
            <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
              No history yet
            </Typography>
            <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              Changes will appear here after updates
            </Typography>
          </VStack>
        )}

        {/* Timeline items */}
        {timeline.length > 0 && (
          <Box className="relative pl-4">
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
          </Box>
        )}
      </Box>
    </VStack>
  );
}

OrbitalHistoryBoard.displayName = 'OrbitalHistoryBoard';
