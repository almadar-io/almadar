/**
 * GitHub Repository Picker
 *
 * Allows users to select a GitHub repository and branch.
 */

import React, { useState, useEffect } from 'react';
import { VStack, Typography, Label, Select } from '@almadar/ui';
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

  const repoOptions = repos.map((repo) => ({
    value: repo.fullName,
    label: `${repo.fullName} ${repo.isPrivate ? '(Private)' : '(Public)'}`,
  }));

  const branchOptions = branches.map((branch) => ({
    value: branch,
    label: `${branch}${branch === selectedRepo?.defaultBranch ? ' (default)' : ''}`,
  }));

  return (
    <VStack gap="md" className={className}>
      {/* Repository Select */}
      <VStack gap="sm">
        <Label htmlFor="github-repo" className="block text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
          Repository
        </Label>
        <Select
          id="github-repo"
          value={selectedRepo?.fullName || ''}
          onChange={handleRepoChange}
          disabled={reposLoading}
          placeholder={reposLoading ? 'Loading repositories...' : 'Select a repository'}
          options={repoOptions}
        />
        {selectedRepo && (
          <Typography variant="caption" className="mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            {selectedRepo.description || 'No description'}
          </Typography>
        )}
      </VStack>

      {/* Branch Select */}
      {selectedRepo && (
        <VStack gap="sm">
          <Label htmlFor="github-branch" className="block text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
            Branch
          </Label>
          <Select
            id="github-branch"
            value={selectedBranch || ''}
            onChange={handleBranchChange}
            disabled={branchesLoading}
            placeholder={branchesLoading ? 'Loading branches...' : 'Select a branch'}
            options={branchOptions}
          />
        </VStack>
      )}
    </VStack>
  );
};

GitHubRepoPicker.displayName = 'GitHubRepoPicker';
