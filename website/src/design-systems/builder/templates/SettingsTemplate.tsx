/**
 * SettingsTemplate - Thin wrapper for settings page
 *
 * Delegates all logic to SettingsBoard organism.
 *
 * Events Emitted:
 * - UI:SETTINGS_TAB_CHANGE - When switching between settings tabs
 * - UI:SETTINGS_SAVE - When saving settings (future)
 */

import React from 'react';
import { SettingsBoard } from '../organisms/SettingsBoard';

export type { SettingsTab } from '../organisms/SettingsBoard';

export interface SettingsTemplateProps {
  /** Optional className for styling */
  className?: string;
}

export const SettingsTemplate: React.FC<SettingsTemplateProps> = ({ className }) => (
  <SettingsBoard
    className={className}
    tabChangeEvent="SETTINGS_TAB_CHANGE"
    saveEvent="SETTINGS_SAVE"
    resetEvent="SETTINGS_RESET"
  />
);

SettingsTemplate.displayName = 'SettingsTemplate';
