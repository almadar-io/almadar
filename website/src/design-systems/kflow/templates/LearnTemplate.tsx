/**
 * LearnTemplate
 *
 * Pure template wrapping LearnBoard inside AppShellTemplate.
 * No hooks, no state - passes entity fields through.
 *
 * Events Emitted (via LearnBoard + AppShellBoard):
 * - UI:LEARNING_PATH_CLICK, UI:CREATE_LEARNING_PATH, UI:DELETE_LEARNING_PATH
 * - UI:NAV_CLICK, UI:TOGGLE_SIDEBAR, UI:TOGGLE_THEME, UI:SIGN_OUT
 */

import React from 'react';
import { AppShellTemplate } from './AppShellTemplate';
import type { AppShellEntity } from './AppShellTemplate';
import { LearnBoard } from '../organisms/LearnBoard';
import type { LearnEntity } from '../organisms/LearnBoard';

export type { LearnEntity, LearnPathItem } from '../organisms/LearnBoard';

export interface LearnTemplateEntity extends LearnEntity {
  shell: AppShellEntity;
}

export interface LearnTemplateProps {
  entity: LearnTemplateEntity;
  className?: string;
}

export const LearnTemplate: React.FC<LearnTemplateProps> = ({
  entity,
  className,
}) => (
  <AppShellTemplate entity={entity.shell}>
    <LearnBoard entity={entity} className={className} />
  </AppShellTemplate>
);

LearnTemplate.displayName = 'LearnTemplate';
