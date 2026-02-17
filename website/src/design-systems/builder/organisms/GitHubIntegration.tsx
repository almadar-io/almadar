/**
 * GitHub Integration Component
 *
 * Displays GitHub connection status and allows users to connect/disconnect.
 */

import React from 'react';
import { Box, Button, Card, Avatar, Badge } from '@almadar/ui';
import { useGitHubStatus, useConnectGitHub, useDisconnectGitHub } from '@almadar/ui/hooks';

export interface GitHubIntegrationProps {
  /** Optional className for styling */
  className?: string;
}

/**
 * GitHub Integration organism
 *
 * Shows connection status and provides connect/disconnect functionality.
 */
export const GitHubIntegration: React.FC<GitHubIntegrationProps> = ({ className }) => {
  const { data: status, isLoading, error } = useGitHubStatus();
  const { connectGitHub } = useConnectGitHub();
  const disconnectMutation = useDisconnectGitHub();

  const handleConnect = () => {
    connectGitHub();
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect GitHub?')) {
      disconnectMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <Box className="p-6">
          <Box className="flex items-center gap-2">
            <Box
              className="w-4 h-4 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-info)' }}
            />
            <span style={{ color: 'var(--color-foreground)' }}>Checking GitHub connection...</span>
          </Box>
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <Box className="p-6">
          <Box style={{ color: 'var(--color-error)' }}>
            <p className="font-medium">Failed to check GitHub status</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>{error.message}</p>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <Box className="p-6">
        {/* Header */}
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center gap-3">
            <Box className="text-2xl">🐙</Box>
            <Box>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>GitHub Integration</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                {status?.connected
                  ? 'Connect GitHub to enable automatic PR creation'
                  : 'Connected - agent can create PRs automatically'}
              </p>
            </Box>
          </Box>
          <Badge variant={status?.connected ? 'success' : 'secondary'}>
            {status?.connected ? 'Connected' : 'Not Connected'}
          </Badge>
        </Box>

        {/* Connected State */}
        {status?.connected && (
          <Box className="mt-4 space-y-4">
            {/* User Info */}
            <Box
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              {status.avatarUrl && (
                <Avatar src={status.avatarUrl} alt={status.username || 'GitHub User'} size="md" />
              )}
              <Box className="flex-1">
                <p className="font-medium" style={{ color: 'var(--color-foreground)' }}>@{status.username}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  Connected {status.connectedAt ? new Date(status.connectedAt).toLocaleDateString() : ''}
                </p>
              </Box>
            </Box>

            {/* Scopes */}
            {status.scopes && status.scopes.length > 0 && (
              <Box>
                <p className="text-xs mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Permissions:</p>
                <Box className="flex flex-wrap gap-1">
                  {status.scopes.map((scope) => (
                    <Badge key={scope} variant="secondary" size="sm">
                      {scope}
                    </Badge>
                  ))}
                </Box>
              </Box>
            )}

            {/* Actions */}
            <Box className="flex gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDisconnect}
                disabled={disconnectMutation.isPending}
              >
                {disconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            </Box>

            {/* Info Box */}
            <Box
              className="p-3 border rounded-lg"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
                borderColor: 'color-mix(in srgb, var(--color-info) 30%, transparent)',
              }}
            >
              <p className="text-sm" style={{ color: 'var(--color-info)' }}>
                <strong>✓ GitHub tools enabled</strong>
                <br />
                The agent can now clone repositories, create branches, commit changes, and create pull requests
                automatically. No need to provide a token manually!
              </p>
            </Box>
          </Box>
        )}

        {/* Disconnected State */}
        {!status?.connected && (
          <Box className="mt-4 space-y-4">
            {/* Benefits */}
            <Box className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>When you connect GitHub:</p>
              <ul className="text-sm space-y-1 ml-4" style={{ color: 'var(--color-foreground)' }}>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Agent can clone your repositories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Automatically create pull requests with changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Work on issues directly from GitHub</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>No need to manually provide tokens</span>
                </li>
              </ul>
            </Box>

            {/* Connect Button */}
            <Button onClick={handleConnect} className="w-full">
              <Box className="flex items-center justify-center gap-2">
                <span>🐙</span>
                <span>Connect GitHub</span>
              </Box>
            </Button>

            {/* Security Note */}
            <Box
              className="p-3 border rounded-lg"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <p className="text-xs" style={{ color: 'var(--color-foreground)' }}>
                <strong>🔒 Secure OAuth Flow</strong>
                <br />
                Your GitHub token will be encrypted and stored securely. You can disconnect at any time.
              </p>
            </Box>
          </Box>
        )}

        {/* Error State */}
        {disconnectMutation.isError && (
          <Box
            className="mt-4 p-3 border rounded-lg"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-error) 30%, transparent)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-error)' }}>
              Failed to disconnect: {disconnectMutation.error?.message || 'Unknown error'}
            </p>
          </Box>
        )}
      </Box>
    </Card>
  );
};

GitHubIntegration.displayName = 'GitHubIntegration';
