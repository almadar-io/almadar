/**
 * StudioStatsTemplate
 *
 * Page: Stats | Entity: StudioStatsEntity | ViewType: dashboard
 * Events: UI:NAVIGATE_HOME
 *
 * Full-page template for the statistics dashboard.
 * Includes header chrome and delegates content to StatsBoard organism.
 */

import React from "react";
import { Box, HStack, VStack, Typography, Icon, ThemeToggle } from "@almadar/ui";
import { Activity } from "lucide-react";
import { StatsBoard } from "../organisms/StatsBoard";

export type { AppStats } from "../organisms/StatsBoard";

export interface StudioStatsEntity {
  apps: import("../organisms/StatsBoard").AppStats[];
}

export interface StudioStatsTemplateProps {
  /** Entity containing stats data */
  entity: StudioStatsEntity | string;

  /** Apps data (compiler pattern — passed as binding) */
  apps?: unknown;

  /** Loading state */
  isLoading?: boolean;

  /** Sidebar slot */
  sidebarSlot?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;
}

export const StudioStatsTemplate: React.FC<StudioStatsTemplateProps> = ({
  entity: rawEntity,
  apps,
  isLoading,
  sidebarSlot,
  className,
}) => {
  const entity: StudioStatsEntity =
    typeof rawEntity === "string"
      ? { apps: (apps as import("../organisms/StatsBoard").AppStats[]) || [] }
      : rawEntity;

  return (
    <HStack className={`h-screen bg-[var(--color-background)] ${className || ''}`} align="stretch">
      {/* Sidebar */}
      <Box className="hidden lg:block">{sidebarSlot}</Box>

      <VStack className="flex-1 overflow-hidden" align="stretch">
        {/* Header */}
        <Box
          as="header"
          className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]"
        >
          <HStack align="center" className="gap-3">
            <Icon icon={Activity} size="lg" className="text-[var(--color-primary)]" />
            <VStack>
              <Typography variant="h5" className="text-[var(--color-foreground)]">
                Statistics
              </Typography>
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                Overview of your applications
              </Typography>
            </VStack>
          </HStack>
          <ThemeToggle size="sm" />
        </Box>

        {/* Content */}
        <Box className="flex-1 overflow-y-auto p-6">
          <StatsBoard
            apps={entity.apps}
            isLoading={isLoading}
          />
        </Box>
      </VStack>
    </HStack>
  );
};

StudioStatsTemplate.displayName = "StudioStatsTemplate";

export default StudioStatsTemplate;
