/**
 * YouTube Integrator Unit Tests
 *
 * Tests for YouTube integrator with mocked API responses.
 *
 * @packageDocumentation
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { EventBus, IntegratorError } from '../types.js';
import { youtubeIntegrator } from '../youtube.js';

// ============================================================================
// Test Fixtures
// ============================================================================

function createMockEventBus(): EventBus & {
  emittedEvents: Array<{ event: string; payload?: unknown }>;
} {
  const emittedEvents: Array<{ event: string; payload?: unknown }> = [];
  return {
    emittedEvents,
    emit: (event, payload) => emittedEvents.push({ event, payload }),
    on: () => () => {},
    once: () => {},
  };
}

const mockSearchResponse = {
  items: [
    {
      id: { videoId: 'abc123' },
      snippet: {
        title: 'Test Video',
        description: 'A test video',
        thumbnails: {
          medium: { url: 'https://example.com/thumb.jpg' },
        },
        channelTitle: 'Test Channel',
        publishedAt: '2024-01-01T00:00:00Z',
      },
    },
  ],
  pageInfo: { totalResults: 1, resultsPerPage: 10 },
};

const mockVideoResponse = {
  items: [
    {
      id: 'abc123',
      snippet: {
        title: 'Test Video',
        description: 'A detailed test video',
        thumbnails: {
          high: { url: 'https://example.com/thumb-high.jpg' },
        },
        channelTitle: 'Test Channel',
        channelId: 'channel123',
        publishedAt: '2024-01-01T00:00:00Z',
        tags: ['test', 'video'],
      },
      statistics: {
        viewCount: '1000',
        likeCount: '100',
        commentCount: '10',
      },
      contentDetails: {
        duration: 'PT5M30S',
      },
    },
  ],
};

const mockChannelResponse = {
  items: [
    {
      id: 'channel123',
      snippet: {
        title: 'Test Channel',
        description: 'A test channel',
        thumbnails: {
          medium: { url: 'https://example.com/channel-thumb.jpg' },
        },
        customUrl: '@testchannel',
      },
      statistics: {
        subscriberCount: '10000',
        videoCount: '50',
        viewCount: '500000',
      },
    },
  ],
};

// ============================================================================
// Setup / Teardown
// ============================================================================

beforeEach(() => {
  // Set API key for tests
  process.env.YOUTUBE_API_KEY = 'test-api-key';
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.YOUTUBE_API_KEY;
});

// ============================================================================
// Integrator Configuration Tests
// ============================================================================

describe('YouTube Integrator Configuration', () => {
  it('should have correct name and category', () => {
    expect(youtubeIntegrator.name).toBe('youtube');
    expect(youtubeIntegrator.category).toBe('media');
  });

  it('should define all three actions', () => {
    expect(youtubeIntegrator.actions).toHaveLength(3);
    expect(youtubeIntegrator.actions.map((a) => a.name)).toEqual([
      'search',
      'getVideo',
      'getChannel',
    ]);
  });

  it('should have search action with correct params', () => {
    const searchAction = youtubeIntegrator.actions.find((a) => a.name === 'search');
    expect(searchAction).toBeDefined();
    expect(searchAction?.params).toHaveLength(3);
    expect(searchAction?.params[0].name).toBe('query');
    expect(searchAction?.params[0].required).toBe(true);
  });

  it('should have getVideo action with correct params', () => {
    const getVideoAction = youtubeIntegrator.actions.find((a) => a.name === 'getVideo');
    expect(getVideoAction).toBeDefined();
    expect(getVideoAction?.params).toHaveLength(1);
    expect(getVideoAction?.params[0].name).toBe('videoId');
  });

  it('should have getChannel action with correct params', () => {
    const getChannelAction = youtubeIntegrator.actions.find(
      (a) => a.name === 'getChannel'
    );
    expect(getChannelAction).toBeDefined();
    expect(getChannelAction?.params).toHaveLength(1);
    expect(getChannelAction?.params[0].name).toBe('channelId');
  });

  it('should report configured when API key is set', () => {
    expect(youtubeIntegrator.isConfigured?.()).toBe(true);
  });

  it('should report not configured when API key is missing', () => {
    delete process.env.YOUTUBE_API_KEY;
    expect(youtubeIntegrator.isConfigured?.()).toBe(false);
  });
});

// ============================================================================
// Parameter Validation Tests
// ============================================================================

describe('YouTube Integrator Validation', () => {
  it('should validate search with valid query', () => {
    const result = youtubeIntegrator.validateParams?.('search', { query: 'test' });
    expect(result?.valid).toBe(true);
  });

  it('should reject search without query', () => {
    const result = youtubeIntegrator.validateParams?.('search', {});
    expect(result?.valid).toBe(false);
    expect(result?.errors).toContain('query is required and must be a string');
  });

  it('should reject search with non-string query', () => {
    const result = youtubeIntegrator.validateParams?.('search', { query: 123 });
    expect(result?.valid).toBe(false);
  });

  it('should validate search with optional maxResults', () => {
    const result = youtubeIntegrator.validateParams?.('search', {
      query: 'test',
      maxResults: 20,
    });
    expect(result?.valid).toBe(true);
  });

  it('should reject invalid maxResults', () => {
    const result = youtubeIntegrator.validateParams?.('search', {
      query: 'test',
      maxResults: 100,
    });
    expect(result?.valid).toBe(false);
    expect(result?.errors).toContain('maxResults must be a number between 1 and 50');
  });

  it('should validate getVideo with valid videoId', () => {
    const result = youtubeIntegrator.validateParams?.('getVideo', { videoId: 'abc123' });
    expect(result?.valid).toBe(true);
  });

  it('should reject getVideo without videoId', () => {
    const result = youtubeIntegrator.validateParams?.('getVideo', {});
    expect(result?.valid).toBe(false);
    expect(result?.errors).toContain('videoId is required and must be a string');
  });

  it('should validate getChannel with valid channelId', () => {
    const result = youtubeIntegrator.validateParams?.('getChannel', {
      channelId: 'channel123',
    });
    expect(result?.valid).toBe(true);
  });

  it('should reject getChannel without channelId', () => {
    const result = youtubeIntegrator.validateParams?.('getChannel', {});
    expect(result?.valid).toBe(false);
    expect(result?.errors).toContain('channelId is required and must be a string');
  });

  it('should reject unknown action', () => {
    const result = youtubeIntegrator.validateParams?.('unknownAction', {});
    expect(result?.valid).toBe(false);
    expect(result?.errors).toContain('Unknown action: unknownAction');
  });
});

// ============================================================================
// Search Action Tests (Mocked)
// ============================================================================

describe('YouTube Search Action', () => {
  it('should search and emit success', async () => {
    const eventBus = createMockEventBus();

    // Mock fetch
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSearchResponse),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'typescript tutorial' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('SEARCH_COMPLETE');

    const payload = eventBus.emittedEvents[0].payload as any[];
    expect(payload).toHaveLength(1);
    expect(payload[0].videoId).toBe('abc123');
    expect(payload[0].title).toBe('Test Video');
  });

  it('should emit error on API failure', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        json: () =>
          Promise.resolve({
            error: { code: 403, message: 'Access denied' },
          }),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('SEARCH_FAILED');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.code).toBe('FORBIDDEN');
  });
});

// ============================================================================
// GetVideo Action Tests (Mocked)
// ============================================================================

describe('YouTube GetVideo Action', () => {
  it('should get video and emit success', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockVideoResponse),
      })
    );

    await youtubeIntegrator.execute(
      'getVideo',
      { videoId: 'abc123' },
      eventBus,
      { onSuccess: 'VIDEO_COMPLETE', onError: 'VIDEO_FAILED' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('VIDEO_COMPLETE');

    const payload = eventBus.emittedEvents[0].payload as any;
    expect(payload.id).toBe('abc123');
    expect(payload.title).toBe('Test Video');
    expect(payload.viewCount).toBe(1000);
    expect(payload.duration).toBe('PT5M30S');
  });

  it('should emit null for non-existent video', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })
    );

    await youtubeIntegrator.execute(
      'getVideo',
      { videoId: 'nonexistent' },
      eventBus,
      { onSuccess: 'VIDEO_COMPLETE', onError: 'VIDEO_FAILED' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('VIDEO_COMPLETE');
    expect(eventBus.emittedEvents[0].payload).toBeNull();
  });
});

// ============================================================================
// GetChannel Action Tests (Mocked)
// ============================================================================

describe('YouTube GetChannel Action', () => {
  it('should get channel and emit success', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockChannelResponse),
      })
    );

    await youtubeIntegrator.execute(
      'getChannel',
      { channelId: 'channel123' },
      eventBus,
      { onSuccess: 'CHANNEL_COMPLETE', onError: 'CHANNEL_FAILED' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('CHANNEL_COMPLETE');

    const payload = eventBus.emittedEvents[0].payload as any;
    expect(payload.id).toBe('channel123');
    expect(payload.name).toBe('Test Channel');
    expect(payload.subscriberCount).toBe(10000);
    expect(payload.videoCount).toBe(50);
  });
});

// ============================================================================
// Error Handling Tests
// ============================================================================

describe('YouTube Error Handling', () => {
  it('should emit NOT_CONFIGURED when API key missing', async () => {
    delete process.env.YOUTUBE_API_KEY;
    const eventBus = createMockEventBus();

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.code).toBe('NOT_CONFIGURED');
  });

  it('should emit RATE_LIMITED on 429 response', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        json: () =>
          Promise.resolve({
            error: { code: 429, message: 'Rate limit exceeded' },
          }),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.code).toBe('RATE_LIMITED');
  });

  it('should emit NOT_FOUND on 404 response', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () =>
          Promise.resolve({
            error: { code: 404, message: 'Video not found' },
          }),
      })
    );

    await youtubeIntegrator.execute(
      'getVideo',
      { videoId: 'nonexistent' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.code).toBe('NOT_FOUND');
  });

  it('should emit error for unknown action', async () => {
    const eventBus = createMockEventBus();

    await youtubeIntegrator.execute(
      'unknownAction',
      {},
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.message).toContain('Unknown action');
  });
});

// ============================================================================
// Timeout Tests
// ============================================================================

describe('YouTube Timeout Handling', () => {
  it('should emit TIMEOUT when request times out', async () => {
    const eventBus = createMockEventBus();

    // Mock fetch to simulate abort
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => {
        const error = new Error('Aborted');
        error.name = 'AbortError';
        return Promise.reject(error);
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' },
      { timeout: 100 }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');

    const error = eventBus.emittedEvents[0].payload as IntegratorError;
    expect(error.code).toBe('TIMEOUT');
  });
});
