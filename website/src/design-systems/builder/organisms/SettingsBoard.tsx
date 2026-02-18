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
import { Box, VStack, HStack, Typography, Button, useEventBus } from '@almadar/ui';
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
      <Box
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
        className="border-b"
      >
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <VStack gap="xs">
            <Typography variant="h1">Settings</Typography>
            <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
              Manage your Builder preferences and integrations
            </Typography>
          </VStack>
        </Box>
      </Box>

      {/* Content */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HStack gap="xl" align="start">
          {/* Sidebar Navigation */}
          <Box className="w-64 flex-shrink-0">
            <Box as="nav" className="space-y-1">
              <VStack gap="xs">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    onClick={() => handleTabChange(tab.id)}
                    className="w-full justify-start border"
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
                    <HStack gap="sm" align="center">
                      <Typography as="span" variant="body1">{tab.icon}</Typography>
                      <Typography as="span" variant="body2">{tab.label}</Typography>
                    </HStack>
                  </Button>
                ))}
              </VStack>
            </Box>
          </Box>

          {/* Main Content */}
          <Box className="flex-1 min-w-0">
            {activeTab === 'general' && (
              <VStack gap="md">
                <Typography variant="h2">General Settings</Typography>
                <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                  General settings coming soon...
                </Typography>
              </VStack>
            )}

            {activeTab === 'integrations' && (
              <VStack gap="lg">
                <Typography variant="h2">Integrations</Typography>
                {/* GitHub Integration */}
                <GitHubIntegration />

                {/* Placeholder for other integrations */}
                <Box
                  className="p-6 border-2 border-dashed rounded-lg text-center"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                    More integrations coming soon...
                    <br />
                    (Stripe, Twilio, SendGrid, etc.)
                  </Typography>
                </Box>
              </VStack>
            )}

            {activeTab === 'appearance' && (
              <VStack gap="md">
                <Typography variant="h2">Appearance</Typography>
                <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                  Theme and appearance settings coming soon...
                </Typography>
              </VStack>
            )}

            {activeTab === 'advanced' && (
              <VStack gap="md">
                <Typography variant="h2">Advanced Settings</Typography>
                <Typography variant="body2" className="text-[var(--color-muted-foreground)]">
                  Advanced settings coming soon...
                </Typography>
              </VStack>
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

SettingsBoard.displayName = 'SettingsBoard';
