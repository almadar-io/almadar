/**
 * YouTube Data API Integrator
 *
 * Implements ServiceIntegrator for YouTube Data API v3.
 * Supports search, getVideo, and getChannel actions.
 *
 * @packageDocumentation
 */

import type {
  ServiceIntegrator,
  EventBus,
  IntegratorCallbacks,
  IntegratorError,
  ExecutionContext,
} from './types.js';

// ============================================================================
// Configuration
// ============================================================================

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_MAX_RESULTS = 10;

/**
 * Get YouTube API key from environment.
 */
function getApiKey(): string | undefined {
  return process.env.YOUTUBE_API_KEY;
}

// ============================================================================
// Retry Logic
// ============================================================================

interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
};

/**
 * Calculate exponential backoff delay.
 */
function calculateBackoff(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelayMs * Math.pow(2, attempt);
  return Math.min(delay, config.maxDelayMs);
}

/**
 * Check if error is retryable (transient).
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    // Retry on network errors, rate limits, and server errors
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('econnreset') ||
      message.includes('rate limit') ||
      message.includes('503') ||
      message.includes('429')
    );
  }
  return false;
}

/**
 * Sleep for specified milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// API Request Helper
// ============================================================================

interface YouTubeApiResponse<T> {
  items?: T[];
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  error?: {
    code: number;
    message: string;
    errors?: Array<{ reason: string; message: string }>;
  };
}

/**
 * Make a request to YouTube API with retry logic.
 */
async function makeYouTubeRequest<T>(
  endpoint: string,
  params: Record<string, string>,
  context?: ExecutionContext
): Promise<T[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY environment variable is not set');
  }

  const retryConfig: RetryConfig = context?.retry
    ? {
        maxAttempts: context.retry.maxAttempts,
        baseDelayMs: context.retry.backoffMs,
        maxDelayMs: context.retry.backoffMs * 10,
      }
    : DEFAULT_RETRY_CONFIG;

  const timeout = context?.timeout ?? DEFAULT_TIMEOUT;

  const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`);
  url.searchParams.set('key', apiKey);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < retryConfig.maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data: YouTubeApiResponse<T> = await response.json();

      if (!response.ok || data.error) {
        // Always include HTTP status code in error message for categorization
        const statusCode = data.error?.code || response.status;
        const baseMessage = data.error?.message || response.statusText;
        const errorMessage = `HTTP ${statusCode}: ${baseMessage}`;
        const error = new Error(errorMessage);

        // Check if retryable
        if (isRetryableError(error) && attempt < retryConfig.maxAttempts - 1) {
          lastError = error;
          const delay = calculateBackoff(attempt, retryConfig);
          await sleep(delay);
          continue;
        }

        throw error;
      }

      return data.items ?? [];
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }

        if (isRetryableError(error) && attempt < retryConfig.maxAttempts - 1) {
          lastError = error;
          const delay = calculateBackoff(attempt, retryConfig);
          await sleep(delay);
          continue;
        }

        throw error;
      }
      throw error;
    }
  }

  throw lastError || new Error('Max retry attempts exceeded');
}

// ============================================================================
// Response Transformers
// ============================================================================

interface YouTubeSearchItem {
  id: { videoId?: string; channelId?: string; playlistId?: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    tags?: string[];
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails?: {
    duration: string;
  };
}

interface YouTubeChannelItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    customUrl?: string;
  };
  statistics?: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
}

/**
 * Transform search results to consistent format.
 */
function transformSearchResults(
  items: YouTubeSearchItem[]
): Array<{
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}> {
  return items
    .filter((item) => item.id.videoId) // Only videos
    .map((item) => ({
      videoId: item.id.videoId!,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url ||
        '',
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
}

/**
 * Transform video details to consistent format.
 */
function transformVideoDetails(
  items: YouTubeVideoItem[]
): {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  tags: string[];
} | null {
  if (items.length === 0) return null;

  const item = items[0];
  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail:
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      '',
    channelTitle: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    publishedAt: item.snippet.publishedAt,
    viewCount: parseInt(item.statistics?.viewCount || '0', 10),
    likeCount: parseInt(item.statistics?.likeCount || '0', 10),
    commentCount: parseInt(item.statistics?.commentCount || '0', 10),
    duration: item.contentDetails?.duration || '',
    tags: item.snippet.tags || [],
  };
}

/**
 * Transform channel details to consistent format.
 */
function transformChannelDetails(
  items: YouTubeChannelItem[]
): {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  customUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
} | null {
  if (items.length === 0) return null;

  const item = items[0];
  return {
    id: item.id,
    name: item.snippet.title,
    description: item.snippet.description,
    thumbnail:
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url ||
      '',
    customUrl: item.snippet.customUrl || '',
    subscriberCount: parseInt(item.statistics?.subscriberCount || '0', 10),
    videoCount: parseInt(item.statistics?.videoCount || '0', 10),
    viewCount: parseInt(item.statistics?.viewCount || '0', 10),
  };
}

// ============================================================================
// Action Implementations
// ============================================================================

/**
 * Search for YouTube videos.
 */
async function searchVideos(
  params: Record<string, unknown>,
  context?: ExecutionContext
): Promise<ReturnType<typeof transformSearchResults>> {
  const query = params.query as string;
  const maxResults = (params.maxResults as number) || DEFAULT_MAX_RESULTS;
  const type = (params.type as string) || 'video';

  const items = await makeYouTubeRequest<YouTubeSearchItem>(
    'search',
    {
      part: 'snippet',
      q: query,
      maxResults: String(maxResults),
      type,
    },
    context
  );

  return transformSearchResults(items);
}

/**
 * Get video details by ID.
 */
async function getVideoDetails(
  params: Record<string, unknown>,
  context?: ExecutionContext
): Promise<ReturnType<typeof transformVideoDetails>> {
  const videoId = params.videoId as string;

  const items = await makeYouTubeRequest<YouTubeVideoItem>(
    'videos',
    {
      part: 'snippet,statistics,contentDetails',
      id: videoId,
    },
    context
  );

  return transformVideoDetails(items);
}

/**
 * Get channel details by ID.
 */
async function getChannelDetails(
  params: Record<string, unknown>,
  context?: ExecutionContext
): Promise<ReturnType<typeof transformChannelDetails>> {
  const channelId = params.channelId as string;

  const items = await makeYouTubeRequest<YouTubeChannelItem>(
    'channels',
    {
      part: 'snippet,statistics',
      id: channelId,
    },
    context
  );

  return transformChannelDetails(items);
}

// ============================================================================
// YouTube Integrator
// ============================================================================

/**
 * YouTube Data API integrator.
 *
 * Provides search, getVideo, and getChannel actions for YouTube content.
 *
 * @example
 * ```typescript
 * await youtubeIntegrator.execute(
 *   'search',
 *   { query: 'typescript tutorial', maxResults: 5 },
 *   eventBus,
 *   { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
 * );
 * ```
 */
export const youtubeIntegrator: ServiceIntegrator = {
  name: 'youtube',
  description: 'YouTube Data API - search videos, get video/channel details',
  category: 'media',
  actions: [
    {
      name: 'search',
      description: 'Search for YouTube videos',
      params: [
        { name: 'query', type: 'string', required: true, description: 'Search query' },
        {
          name: 'maxResults',
          type: 'number',
          required: false,
          description: 'Maximum results (1-50)',
          defaultValue: 10,
        },
        {
          name: 'type',
          type: 'string',
          required: false,
          description: 'Result type (video, channel, playlist)',
          defaultValue: 'video',
        },
      ],
      responseShape: {
        videoId: 'string',
        title: 'string',
        description: 'string',
        thumbnail: 'string',
        channelTitle: 'string',
        publishedAt: 'string',
      },
    },
    {
      name: 'getVideo',
      description: 'Get video details by ID',
      params: [
        { name: 'videoId', type: 'string', required: true, description: 'YouTube video ID' },
      ],
      responseShape: {
        id: 'string',
        title: 'string',
        description: 'string',
        viewCount: 'number',
        likeCount: 'number',
        duration: 'string',
      },
    },
    {
      name: 'getChannel',
      description: 'Get channel details by ID',
      params: [
        { name: 'channelId', type: 'string', required: true, description: 'YouTube channel ID' },
      ],
      responseShape: {
        id: 'string',
        name: 'string',
        description: 'string',
        subscriberCount: 'number',
        videoCount: 'number',
      },
    },
  ],

  async execute(
    action: string,
    params: Record<string, unknown>,
    eventBus: EventBus,
    callbacks: IntegratorCallbacks,
    context?: ExecutionContext
  ): Promise<void> {
    try {
      let result: unknown;

      switch (action) {
        case 'search':
          result = await searchVideos(params, context);
          break;
        case 'getVideo':
          result = await getVideoDetails(params, context);
          break;
        case 'getChannel':
          result = await getChannelDetails(params, context);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      eventBus.emit(callbacks.onSuccess, result);
    } catch (error) {
      const integratorError: IntegratorError = {
        code: 'YOUTUBE_API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      };

      // Categorize error codes
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          integratorError.code = 'TIMEOUT';
        } else if (error.message.includes('API_KEY')) {
          integratorError.code = 'NOT_CONFIGURED';
        } else if (error.message.includes('403')) {
          integratorError.code = 'FORBIDDEN';
        } else if (error.message.includes('404')) {
          integratorError.code = 'NOT_FOUND';
        } else if (error.message.includes('429')) {
          integratorError.code = 'RATE_LIMITED';
        }
      }

      eventBus.emit(callbacks.onError, integratorError);
    }
  },

  validateParams(
    action: string,
    params: Record<string, unknown>
  ): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    switch (action) {
      case 'search':
        if (!params.query || typeof params.query !== 'string') {
          errors.push('query is required and must be a string');
        }
        if (params.maxResults !== undefined) {
          const max = params.maxResults as number;
          if (typeof max !== 'number' || max < 1 || max > 50) {
            errors.push('maxResults must be a number between 1 and 50');
          }
        }
        break;
      case 'getVideo':
        if (!params.videoId || typeof params.videoId !== 'string') {
          errors.push('videoId is required and must be a string');
        }
        break;
      case 'getChannel':
        if (!params.channelId || typeof params.channelId !== 'string') {
          errors.push('channelId is required and must be a string');
        }
        break;
      default:
        errors.push(`Unknown action: ${action}`);
    }

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
  },

  isConfigured(): boolean {
    return !!getApiKey();
  },
};

// ============================================================================
// Registration Helper
// ============================================================================

/**
 * Register the YouTube integrator with the registry.
 */
export function registerYouTubeIntegrator(): void {
  // Import here to avoid circular dependencies
  import('./registry.js').then(({ registerIntegrator, hasIntegrator }) => {
    if (!hasIntegrator('youtube')) {
      registerIntegrator(youtubeIntegrator, true);
    }
  });
}
