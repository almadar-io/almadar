/**
 * StoriesShellTemplate
 *
 * Pure template: StoriesNavHeader fixed at top, optional breadcrumb bar,
 * then children filling remaining viewport.
 * No hooks, no state - passes entity fields through to child molecules.
 */

import React from 'react';
import { Box, VStack, Breadcrumb } from '@almadar/ui';
import type { BreadcrumbItem } from '@almadar/ui';
import { StoriesNavHeader } from '../molecules/StoriesNavHeader';
import type { StoriesActiveRoute, StoriesNavUser } from '../molecules/StoriesNavHeader';

export interface StoriesShellEntity {
  activeRoute: StoriesActiveRoute;
  user?: StoriesNavUser;
  breadcrumbs?: BreadcrumbItem[];
}

export interface StoriesShellTemplateProps {
  entity: StoriesShellEntity;
  children: React.ReactNode;
  className?: string;
}

export const StoriesShellTemplate: React.FC<StoriesShellTemplateProps> = ({
  entity,
  children,
  className,
}) => (
  <VStack gap="none" className={`min-h-screen bg-[var(--color-background)] ${className ?? ''}`}>
    <StoriesNavHeader activeRoute={entity.activeRoute} user={entity.user} />
    {entity.breadcrumbs && entity.breadcrumbs.length > 0 && (
      <Box className="px-6 py-2 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <Breadcrumb items={entity.breadcrumbs} />
      </Box>
    )}
    <Box className="flex-1 overflow-y-auto">
      {children}
    </Box>
  </VStack>
);

StoriesShellTemplate.displayName = 'StoriesShellTemplate';
