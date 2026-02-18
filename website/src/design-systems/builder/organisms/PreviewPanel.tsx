/**
 * PreviewPanel - Embedded preview organism for Build mode
 *
 * Renders the app preview inside a "device frame" with a compact toolbar
 * for page selection, inspect mode, reset, and open-in-new-tab.
 *
 * Events Emitted:
 * - UI:PREVIEW_TOGGLE_INSPECT - Toggle inspect mode overlay
 * - UI:PREVIEW_RESET_STATE - Reset runtime state
 * - UI:PREVIEW_PAGE_SELECT - Switch to a different page { pageName }
 * - UI:PREVIEW_OPEN_STANDALONE - Open preview in a new tab
 */

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Icon,
  Badge,
  Select,
  useEventBus,
  cn,
} from '@almadar/ui';
import {
  MousePointerClick,
  RotateCcw,
  ExternalLink,
  Play,
  Loader2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PreviewPanelEntity {
  /** Application name shown in the toolbar */
  appName: string;
  /** Whether inspect mode overlay is active */
  inspectMode: boolean;
  /** Currently displayed page name */
  currentPageName: string | null;
  /** All available page names for the selector */
  pageNames: string[];
  /** Whether an event is currently being executed */
  isExecutingEvent: boolean;
}

export interface PreviewPanelProps {
  /** Entity containing preview state */
  entity: PreviewPanelEntity;
  /** The runtime content (PreviewDashboardLayout > ShadowPreviewContainer > OrbitalRuntime) */
  runtimeSlot: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  entity,
  runtimeSlot,
  className,
  isLoading,
}) => {
  const { emit } = useEventBus();
  const { inspectMode, currentPageName, pageNames, isExecutingEvent } = entity;

  const pageOptions = pageNames.map((name) => ({
    value: name,
    label: name,
  }));

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    emit('UI:PREVIEW_PAGE_SELECT', { pageName: e.target.value });
  };

  return (
    <VStack gap="none" className={cn('h-full', className)}>
      {/* ─── Compact Toolbar ──────────────────────────────────────────── */}
      <Box
        className="border-b px-3 py-2"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <HStack align="center" gap="sm">
          {/* Page selector */}
          {pageOptions.length > 1 ? (
            <Select
              options={pageOptions}
              value={currentPageName || pageOptions[0]?.value || ''}
              onChange={handlePageSelect}
              className="w-48 text-sm"
            />
          ) : (
            <HStack align="center" gap="xs">
              <Icon icon={Play} size="xs" className="text-[var(--color-primary)]" />
              <Typography variant="body2" className="font-medium">
                {currentPageName || pageNames[0] || 'Preview'}
              </Typography>
            </HStack>
          )}

          {/* Executing event indicator */}
          {isExecutingEvent && (
            <Badge variant="secondary" className="animate-pulse">
              <HStack align="center" gap="xs">
                <Icon icon={Loader2} size="xs" className="animate-spin" />
                <Typography variant="caption">Running...</Typography>
              </HStack>
            </Badge>
          )}

          {/* Spacer */}
          <Box className="flex-1" />

          {/* Inspect mode toggle */}
          <Button
            variant={inspectMode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => emit('UI:PREVIEW_TOGGLE_INSPECT', {})}
            title="Toggle inspect mode"
          >
            <HStack align="center" gap="xs">
              <Icon icon={MousePointerClick} size="sm" />
              <Typography as="span" variant="caption" className="hidden sm:inline">
                Inspect
              </Typography>
            </HStack>
          </Button>

          {/* Reset state */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit('UI:PREVIEW_RESET_STATE', {})}
            title="Reset app state"
          >
            <Icon icon={RotateCcw} size="sm" />
          </Button>

          {/* Open in new tab */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit('UI:PREVIEW_OPEN_STANDALONE', {})}
            title="Open preview in new tab"
          >
            <Icon icon={ExternalLink} size="sm" />
          </Button>
        </HStack>
      </Box>

      {/* ─── Device Frame ─────────────────────────────────────────────── */}
      <Box
        className="flex-1 overflow-hidden p-4"
        style={{ backgroundColor: 'var(--color-muted)' }}
      >
        {isLoading ? (
          <VStack align="center" justify="center" className="h-full">
            <Icon icon={Loader2} size="xl" className="animate-spin text-[var(--color-muted-foreground)]" />
            <Typography variant="body2" className="text-[var(--color-muted-foreground)] mt-2">
              Loading preview...
            </Typography>
          </VStack>
        ) : (
          <Box
            className="h-full rounded-lg overflow-hidden shadow-lg border"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-background)',
            }}
          >
            {runtimeSlot}
          </Box>
        )}
      </Box>
    </VStack>
  );
};

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
