import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Box } from '@almadar/ui';

/**
 * GitHubIntegration uses hooks (useGitHubStatus, useConnectGitHub, useDisconnectGitHub)
 * that require a backend provider. These stories render static representations
 * of the component's visual states instead.
 */
const meta: Meta = {
  title: 'Builder/Organisms/GitHubIntegration',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// =============================================================================
// Static visual representations (hooks require providers)
// =============================================================================

/** Disconnected state - prompts user to connect */
export const Disconnected: StoryObj = {
  render: () => (
    <Card>
      <Box className="p-6">
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center gap-3">
            <Box className="text-2xl">&#x1f419;</Box>
            <Box>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>GitHub Integration</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Connect GitHub to enable automatic PR creation</p>
            </Box>
          </Box>
          <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted-foreground)' }}>Not Connected</span>
        </Box>
        <Box className="mt-4 space-y-4">
          <Box className="space-y-2">
            <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>When you connect GitHub:</p>
            <ul className="text-sm space-y-1 ml-4" style={{ color: 'var(--color-foreground)' }}>
              <li className="flex items-start gap-2"><span>&#10003;</span><span>Agent can clone your repositories</span></li>
              <li className="flex items-start gap-2"><span>&#10003;</span><span>Automatically create pull requests with changes</span></li>
              <li className="flex items-start gap-2"><span>&#10003;</span><span>Work on issues directly from GitHub</span></li>
            </ul>
          </Box>
          <button className="w-full px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
            Connect GitHub
          </button>
        </Box>
      </Box>
    </Card>
  ),
};

/** Connected state - shows user info and permissions */
export const Connected: StoryObj = {
  render: () => (
    <Card>
      <Box className="p-6">
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center gap-3">
            <Box className="text-2xl">&#x1f419;</Box>
            <Box>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>GitHub Integration</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Connected - agent can create PRs automatically</p>
            </Box>
          </Box>
          <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' }}>Connected</span>
        </Box>
        <Box className="mt-4 space-y-4">
          <Box className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
            <Box className="w-10 h-10 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
            <Box className="flex-1">
              <p className="font-medium" style={{ color: 'var(--color-foreground)' }}>@almadar-dev</p>
              <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Connected Feb 15, 2026</p>
            </Box>
          </Box>
          <Box>
            <p className="text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Permissions:</p>
            <Box className="flex flex-wrap gap-1">
              {['repo', 'read:user', 'workflow'].map((scope) => (
                <span key={scope} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted-foreground)' }}>{scope}</span>
              ))}
            </Box>
          </Box>
          <Box className="p-3 border rounded-lg" style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-info) 30%, transparent)' }}>
            <p className="text-sm" style={{ color: 'var(--color-info)' }}>
              <strong>GitHub tools enabled</strong><br />
              The agent can now clone repositories, create branches, commit changes, and create pull requests automatically.
            </p>
          </Box>
        </Box>
      </Box>
    </Card>
  ),
};

/** Loading state - checking connection */
export const Loading: StoryObj = {
  render: () => (
    <Card>
      <Box className="p-6">
        <Box className="flex items-center gap-2">
          <Box className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-info)' }} />
          <span style={{ color: 'var(--color-foreground)' }}>Checking GitHub connection...</span>
        </Box>
      </Box>
    </Card>
  ),
};
