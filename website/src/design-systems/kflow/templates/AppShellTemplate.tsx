/**
 * AppShellTemplate
 *
 * Pure template: universal app chrome with sidebar navigation,
 * mobile header, theme toggle, and content slot.
 * No hooks, no state - passes entity fields through to AppShellBoard.
 *
 * Events Emitted (via AppShellBoard):
 * - UI:NAV_CLICK — user clicks a navigation item
 * - UI:TOGGLE_SIDEBAR — sidebar collapsed/expanded
 * - UI:TOGGLE_THEME — theme switch requested
 * - UI:SIGN_OUT — user signs out
 * - UI:USER_MENU — user avatar clicked
 */

import React from 'react';
import { AppShellBoard } from '../organisms/AppShellBoard';
import type { AppShellEntity } from '../organisms/AppShellBoard';

export type { AppShellEntity, AppShellNavItem, AppShellUser } from '../organisms/AppShellBoard';

export interface AppShellTemplateProps {
  entity: AppShellEntity;
  children: React.ReactNode;
  className?: string;
}

export const AppShellTemplate: React.FC<AppShellTemplateProps> = ({
  entity,
  children,
  className,
}) => (
  <AppShellBoard entity={entity} className={className}>
    {children}
  </AppShellBoard>
);

AppShellTemplate.displayName = 'AppShellTemplate';
