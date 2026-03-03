'use client';
/**
 * GitHub Integration Hooks
 *
 * React hooks for GitHub OAuth and repository management.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

/**
 * GitHub connection status
 */
export interface GitHubStatus {
  connected: boolean;
  username?: string;
  avatarUrl?: string;
  scopes?: string[];
  connectedAt?: number;
  lastUsedAt?: number;
}

/**
 * GitHub repository
 */
export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  isPrivate: boolean;
  description: string | null;
  defaultBranch: string;
  url: string;
}

/**
 * API base URL
 */
const API_BASE = (typeof process !== 'undefined' && process.env?.VITE_API_URL)
  ? process.env.VITE_API_URL
  : 'http://localhost:3000';

/**
 * Get user ID from context/auth
 * TODO: Replace with actual auth context
 */
function getUserId(): string {
  // This should come from your auth context
  return localStorage.getItem('userId') || 'anonymous';
}

/**
 * Fetch with auth headers
 */
async function fetchWithAuth<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const userId = getUserId();

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || error.message || 'Request failed');
  }

  return response.json();
}

/**
 * Hook to get GitHub connection status
 */
export function useGitHubStatus() {
  return useQuery<GitHubStatus>({
    queryKey: ['github', 'status'],
    queryFn: () => fetchWithAuth<GitHubStatus>('/api/github/status'),
    staleTime: 60000, // 1 minute
    retry: false,
  });
}

/**
 * Hook to connect GitHub (initiate OAuth flow)
 */
export function useConnectGitHub() {
  const connectGitHub = useCallback(() => {
    const userId = getUserId();
    const state = btoa(JSON.stringify({ userId, returnUrl: window.location.href }));
    window.location.href = `${API_BASE}/api/github/oauth/authorize?state=${state}`;
  }, []);

  return { connectGitHub };
}

/**
 * Hook to disconnect GitHub
 */
export function useDisconnectGitHub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchWithAuth('/api/github/disconnect', { method: 'POST' }),
    onSuccess: () => {
      // Invalidate status query
      queryClient.invalidateQueries({ queryKey: ['github', 'status'] });
      // Clear repos cache
      queryClient.removeQueries({ queryKey: ['github', 'repos'] });
    },
  });
}

/**
 * Hook to list GitHub repositories
 */
export function useGitHubRepos(page = 1, perPage = 30) {
  return useQuery<{ repos: GitHubRepo[]; page: number; perPage: number }>({
    queryKey: ['github', 'repos', page, perPage],
    queryFn: () => fetchWithAuth(`/api/github/repos?page=${page}&per_page=${perPage}`),
    enabled: true, // Only fetch if user is connected
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get repository details
 */
export function useGitHubRepo(owner: string, repo: string, enabled = true) {
  return useQuery<{ repo: GitHubRepo }>({
    queryKey: ['github', 'repo', owner, repo],
    queryFn: () => fetchWithAuth(`/api/github/repos/${owner}/${repo}`),
    enabled: enabled && !!owner && !!repo,
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to list repository branches
 */
export function useGitHubBranches(owner: string, repo: string, enabled = true) {
  return useQuery<{ branches: string[] }>({
    queryKey: ['github', 'branches', owner, repo],
    queryFn: () => fetchWithAuth(`/api/github/repos/${owner}/${repo}/branches`),
    enabled: enabled && !!owner && !!repo,
    staleTime: 60000, // 1 minute
  });
}
