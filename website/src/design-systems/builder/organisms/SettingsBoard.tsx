/**
 * SettingsBoard - Organism containing all settings page logic
 *
 * Manages tab navigation, settings content rendering, and event emission.
 * Used by SettingsTemplate as a thin wrapper.
 *
 * Events Emitted:
 * - UI:{tabChangeEvent} - When switching between settings tabs
 * - UI:{saveEvent} - When saving settings (future)
 * - UI:{resetEvent} - When resetting settings (future)
 */

import React, { useState } from 'react';
import { Box, useEventBus } from '@almadar/ui';
import { GitHubIntegration } from './GitHubIntegration';

export type SettingsTab = 'general' | 'integrations' | 'appearance' | 'advanced';

export interface SettingsBoardProps {
  /** Optional className for styling */
  className?: string;
  /** Event name emitted on tab change */
  tabChangeEvent: string;
  /** Event name emitted on save */
  saveEvent: string;
  /** Event name emitted on reset */
  resetEvent: string;
}

const tabs: { id: SettingsTab; label: string; icon: string }[] = [
  { id: 'general', label: 'General', icon: '\u2699\uFE0F' },
  { id: 'integrations', label: 'Integrations', icon: '\uD83D\uDD17' },
  { id: 'appearance', label: 'Appearance', icon: '\uD83C\uDFA8' },
  { id: 'advanced', label: 'Advanced', icon: '\uD83D\uDD27' },
];

export const SettingsBoard: React.FC<SettingsBoardProps> = ({
  className,
  tabChangeEvent,
}) => {
  const { emit } = useEventBus();
  const [activeTab, setActiveTab] = useState<SettingsTab>('integrations');

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    emit(`UI:${tabChangeEvent}`, { tab });
  };

  return (
    <Box className={className}>
      {/* Header */}
      <Box className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Settings</h1>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Manage your Builder preferences and integrations
          </p>
        </Box>
      </Box>

      {/* Content */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Box className="flex gap-8">
          {/* Sidebar Navigation */}
          <Box className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors border"
                  style={
                    activeTab === tab.id
                      ? {
                          backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
                          color: 'var(--color-info)',
                          borderColor: 'color-mix(in srgb, var(--color-info) 30%, transparent)',
                        }
                      : {
                          color: 'var(--color-foreground)',
                          borderColor: 'transparent',
                        }
                  }
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </Box>

          {/* Main Content */}
          <Box className="flex-1 min-w-0">
            {activeTab === 'general' && (
              <Box>
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">General Settings</h2>
                <Box className="space-y-4">
                  <p className="text-sm text-[var(--color-muted-foreground)]">General settings coming soon...</p>
                </Box>
              </Box>
            )}

            {activeTab === 'integrations' && (
              <Box>
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Integrations</h2>
                <Box className="space-y-6">
                  {/* GitHub Integration */}
                  <GitHubIntegration />

                  {/* Placeholder for other integrations */}
                  <Box className="p-6 border-2 border-dashed rounded-lg text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      More integrations coming soon...
                      <br />
                      (Stripe, Twilio, SendGrid, etc.)
                    </p>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'appearance' && (
              <Box>
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Appearance</h2>
                <Box className="space-y-4">
                  <p className="text-sm text-[var(--color-muted-foreground)]">Theme and appearance settings coming soon...</p>
                </Box>
              </Box>
            )}

            {activeTab === 'advanced' && (
              <Box>
                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Advanced Settings</h2>
                <Box className="space-y-4">
                  <p className="text-sm text-[var(--color-muted-foreground)]">Advanced settings coming soon...</p>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

SettingsBoard.displayName = 'SettingsBoard';
