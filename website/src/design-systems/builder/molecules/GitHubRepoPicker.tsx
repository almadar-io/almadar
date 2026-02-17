/**
 * GitHub Repository Picker
 *
 * Allows users to select a GitHub repository and branch.
 */

import React, { useState, useEffect } from 'react';
import { Box, Label } from '@almadar/ui';
import { useGitHubRepos, useGitHubBranches, type GitHubRepo } from '@almadar/ui/hooks';

export interface GitHubRepoPickerProps {
  /** Callback when repository is selected */
  onRepoSelect?: (repo: GitHubRepo | null) => void;
  /** Callback when branch is selected */
  onBranchSelect?: (branch: string | null) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * GitHub Repository Picker molecule
 *
 * Provides dropdowns for selecting repository and branch.
 */
export const GitHubRepoPicker: React.FC<GitHubRepoPickerProps> = ({
  onRepoSelect,
  onBranchSelect,
  className,
}) => {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const { data: reposData, isLoading: reposLoading } = useGitHubRepos();
  const { data: branchesData, isLoading: branchesLoading } = useGitHubBranches(
    selectedRepo?.owner || '',
    selectedRepo?.name || '',
    !!selectedRepo
  );

  const repos = reposData?.repos || [];
  const branches = branchesData?.branches || [];

  const handleRepoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const repoFullName = event.target.value;
    if (!repoFullName) {
      setSelectedRepo(null);
      setSelectedBranch(null);
      onRepoSelect?.(null);
      onBranchSelect?.(null);
      return;
    }

    const repo = repos.find((r) => r.fullName === repoFullName);
    if (repo) {
      setSelectedRepo(repo);
      setSelectedBranch(null);
      onRepoSelect?.(repo);
      onBranchSelect?.(null);
    }
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = event.target.value || null;
    setSelectedBranch(branch);
    onBranchSelect?.(branch);
  };

  // Auto-select default branch when branches load
  useEffect(() => {
    if (branches.length > 0 && !selectedBranch && selectedRepo?.defaultBranch) {
      const defaultBranch = branches.find((b) => b === selectedRepo.defaultBranch);
      if (defaultBranch) {
        setSelectedBranch(defaultBranch);
        onBranchSelect?.(defaultBranch);
      }
    }
  }, [branches, selectedBranch, selectedRepo, onBranchSelect]);

  return (
    <Box className={className}>
      {/* Repository Select */}
      <Box className="mb-4">
        <Label htmlFor="github-repo" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
          Repository
        </Label>
        <select
          id="github-repo"
          value={selectedRepo?.fullName || ''}
          onChange={handleRepoChange}
          disabled={reposLoading}
          className="w-full px-3 py-2 rounded-md shadow-sm disabled:cursor-not-allowed"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--color-border)',
            backgroundColor: reposLoading ? 'var(--color-muted)' : 'var(--color-card)',
            color: 'var(--color-foreground)',
            outlineColor: 'var(--color-primary)',
          }}
        >
          <option value="">
            {reposLoading ? 'Loading repositories...' : 'Select a repository'}
          </option>
          {repos.map((repo) => (
            <option key={repo.id} value={repo.fullName}>
              {repo.fullName} {repo.isPrivate ? '(Private)' : '(Public)'}
            </option>
          ))}
        </select>
        {selectedRepo && (
          <p className="mt-1 text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            {selectedRepo.description || 'No description'}
          </p>
        )}
      </Box>

      {/* Branch Select */}
      {selectedRepo && (
        <Box>
          <Label htmlFor="github-branch" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
            Branch
          </Label>
          <select
            id="github-branch"
            value={selectedBranch || ''}
            onChange={handleBranchChange}
            disabled={branchesLoading}
            className="w-full px-3 py-2 rounded-md shadow-sm disabled:cursor-not-allowed"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--color-border)',
              backgroundColor: branchesLoading ? 'var(--color-muted)' : 'var(--color-card)',
              color: 'var(--color-foreground)',
              outlineColor: 'var(--color-primary)',
            }}
          >
            <option value="">
              {branchesLoading ? 'Loading branches...' : 'Select a branch'}
            </option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
                {branch === selectedRepo.defaultBranch ? ' (default)' : ''}
              </option>
            ))}
          </select>
        </Box>
      )}
    </Box>
  );
};

GitHubRepoPicker.displayName = 'GitHubRepoPicker';
