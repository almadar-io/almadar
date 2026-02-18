/**
 * GitHub Integration Component
 *
 * Displays GitHub connection status and allows users to connect/disconnect.
 */

import React from 'react';
import { Box, VStack, HStack, Button, Card, Avatar, Badge, Typography } from '@almadar/ui';
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
          <HStack className="items-center gap-2">
            <Box
              className="w-4 h-4 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-info)' }}
            />
            <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
              Checking GitHub connection...
            </Typography>
          </HStack>
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <Box className="p-6">
          <VStack style={{ color: 'var(--color-error)' }}>
            <Typography variant="body2" weight="medium" style={{ color: 'var(--color-error)' }}>
              Failed to check GitHub status
            </Typography>
            <Typography variant="caption" color="muted" className="mt-1">
              {error.message}
            </Typography>
          </VStack>
        </Box>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <Box className="p-6">
        {/* Header */}
        <HStack className="items-center justify-between mb-4">
          <HStack className="items-center gap-3">
            <Typography variant="large" as="span">🐙</Typography>
            <VStack>
              <Typography variant="h6" weight="semibold" style={{ color: 'var(--color-foreground)' }}>
                GitHub Integration
              </Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>
                {status?.connected
                  ? 'Connect GitHub to enable automatic PR creation'
                  : 'Connected - agent can create PRs automatically'}
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={status?.connected ? 'success' : 'secondary'}>
            {status?.connected ? 'Connected' : 'Not Connected'}
          </Badge>
        </HStack>

        {/* Connected State */}
        {status?.connected && (
          <VStack className="mt-4 gap-4">
            {/* User Info */}
            <HStack
              className="items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              {status.avatarUrl && (
                <Avatar src={status.avatarUrl} alt={status.username || 'GitHub User'} size="md" />
              )}
              <VStack className="flex-1">
                <Typography variant="body2" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                  @{status.username}
                </Typography>
                <Typography variant="caption" color="muted">
                  Connected {status.connectedAt ? new Date(status.connectedAt).toLocaleDateString() : ''}
                </Typography>
              </VStack>
            </HStack>

            {/* Scopes */}
            {status.scopes && status.scopes.length > 0 && (
              <VStack>
                <Typography variant="caption" color="muted" className="mb-2">
                  Permissions:
                </Typography>
                <HStack className="flex-wrap gap-1">
                  {status.scopes.map((scope) => (
                    <Badge key={scope} variant="secondary" size="sm">
                      {scope}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            )}

            {/* Actions */}
            <HStack className="gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDisconnect}
                disabled={disconnectMutation.isPending}
              >
                {disconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            </HStack>

            {/* Info Box */}
            <Box
              className="p-3 border rounded-lg"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
                borderColor: 'color-mix(in srgb, var(--color-info) 30%, transparent)',
              }}
            >
              <Typography variant="body2" style={{ color: 'var(--color-info)' }}>
                <Typography as="span" weight="bold" style={{ color: 'var(--color-info)' }}>
                  ✓ GitHub tools enabled
                </Typography>
                <br />
                The agent can now clone repositories, create branches, commit changes, and create pull requests
                automatically. No need to provide a token manually!
              </Typography>
            </Box>
          </VStack>
        )}

        {/* Disconnected State */}
        {!status?.connected && (
          <VStack className="mt-4 gap-4">
            {/* Benefits */}
            <VStack className="gap-2">
              <Typography variant="body2" weight="medium" style={{ color: 'var(--color-foreground)' }}>
                When you connect GitHub:
              </Typography>
              <VStack className="gap-1 ml-4">
                <HStack className="items-start gap-2">
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>✓</Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
                    Agent can clone your repositories
                  </Typography>
                </HStack>
                <HStack className="items-start gap-2">
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>✓</Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
                    Automatically create pull requests with changes
                  </Typography>
                </HStack>
                <HStack className="items-start gap-2">
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>✓</Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
                    Work on issues directly from GitHub
                  </Typography>
                </HStack>
                <HStack className="items-start gap-2">
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>✓</Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
                    No need to manually provide tokens
                  </Typography>
                </HStack>
              </VStack>
            </VStack>

            {/* Connect Button */}
            <Button onClick={handleConnect} className="w-full">
              <HStack className="items-center justify-center gap-2">
                <Typography as="span">🐙</Typography>
                <Typography as="span">Connect GitHub</Typography>
              </HStack>
            </Button>

            {/* Security Note */}
            <Box
              className="p-3 border rounded-lg"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <Typography variant="caption" style={{ color: 'var(--color-foreground)' }}>
                <Typography as="span" weight="bold" style={{ color: 'var(--color-foreground)' }}>
                  🔒 Secure OAuth Flow
                </Typography>
                <br />
                Your GitHub token will be encrypted and stored securely. You can disconnect at any time.
              </Typography>
            </Box>
          </VStack>
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
            <Typography variant="body2" style={{ color: 'var(--color-error)' }}>
              Failed to disconnect: {disconnectMutation.error?.message || 'Unknown error'}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

GitHubIntegration.displayName = 'GitHubIntegration';
