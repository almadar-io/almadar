/**
 * DashboardTemplate
 *
 * Pure template wrapping DashboardBoard inside AppShellTemplate.
 * No hooks, no state - passes entity fields through.
 *
 * Events Emitted (via DashboardBoard + AppShellBoard):
 * - UI:QUICK_ACTION, UI:ACTIVITY_CLICK, UI:LEARNING_PATH_CLICK
 * - UI:CREATE_LEARNING_PATH, UI:DELETE_LEARNING_PATH
 * - UI:STORY_SELECT (via JumpBackInRow)
 * - UI:NAV_CLICK, UI:TOGGLE_SIDEBAR, UI:TOGGLE_THEME, UI:SIGN_OUT
 */

import React from 'react';
import { AppShellTemplate } from './AppShellTemplate';
import type { AppShellEntity } from './AppShellTemplate';
import { DashboardBoard } from '../organisms/DashboardBoard';
import type { DashboardEntity } from '../organisms/DashboardBoard';

export type { DashboardEntity, DashboardStat, DashboardActivity, DashboardLearningPath, DashboardQuickAction } from '../organisms/DashboardBoard';

export interface DashboardTemplateEntity extends DashboardEntity {
  shell: AppShellEntity;
}

export interface DashboardTemplateProps {
  entity: DashboardTemplateEntity;
  className?: string;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  entity,
  className,
}) => (
  <AppShellTemplate entity={entity.shell}>
    <DashboardBoard entity={entity} className={className} />
  </AppShellTemplate>
);

DashboardTemplate.displayName = 'DashboardTemplate';
