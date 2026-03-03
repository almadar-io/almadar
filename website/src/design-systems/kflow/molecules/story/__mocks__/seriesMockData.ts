/**
 * Shared mock data for Series/Season/Episode Storybook stories.
 */

import type {
  SeriesCreator,
  Episode,
  Season,
  Series,
  SeriesSummary,
  SeriesProgress,
  EpisodeProgress,
  SeasonProgress,
  StorySummary,
} from '../../../types/knowledge';

export const mockCreator: SeriesCreator = {
  uid: 'creator-001',
  displayName: 'Dr. Ada Lovelace',
  avatar: 'https://placehold.co/64x64/6366f1/ffffff?text=AL',
};

export const mockEpisodes: Episode[] = [
  {
    id: 'ep-1',
    title: 'The First Bug',
    description: 'How Grace Hopper found the first computer bug, and what debugging really means.',
    number: 1,
    stories: ['story-1a', 'story-1b', 'story-1c'],
    duration: 25,
    difficulty: 'beginner',
  },
  {
    id: 'ep-2',
    title: 'Off-by-One',
    description: 'The most common programming error. A fence post, a loop, and a missing element.',
    number: 2,
    stories: ['story-2a'],
    duration: 12,
    difficulty: 'beginner',
  },
  {
    id: 'ep-3',
    title: 'Race Conditions',
    description: 'When two threads walk into a bar at the same time.',
    number: 3,
    stories: ['story-3a', 'story-3b'],
    duration: 18,
    difficulty: 'intermediate',
  },
  {
    id: 'ep-4',
    title: 'Memory Leaks',
    description: 'The silent killer. Your program eats RAM until it crashes.',
    number: 4,
    stories: ['story-4a', 'story-4b', 'story-4c'],
    duration: 30,
    difficulty: 'advanced',
  },
];

export const mockSeasons: Season[] = [
  {
    id: 'season-1',
    title: 'Fundamentals',
    description: 'The basic bugs every developer encounters in their first year.',
    number: 1,
    coverImage: 'https://placehold.co/800x400/1e293b/ffffff?text=Season+1',
    episodes: [mockEpisodes[0], mockEpisodes[1]],
    status: 'published',
  },
  {
    id: 'season-2',
    title: 'Concurrency',
    description: 'Bugs that only appear when things run in parallel.',
    number: 2,
    coverImage: 'https://placehold.co/800x400/1e293b/ffffff?text=Season+2',
    episodes: [mockEpisodes[2], mockEpisodes[3]],
    status: 'published',
  },
];

export const mockSeries: Series = {
  id: 'series-001',
  title: 'The Debugging Chronicles',
  description: 'A journey through the most infamous bugs in computing history. Each episode teaches a debugging technique through interactive stories and challenges.',
  creator: mockCreator,
  domain: 'formal',
  tags: ['debugging', 'programming', 'computer-science'],
  coverImage: 'https://placehold.co/1200x600/0f172a/ffffff?text=The+Debugging+Chronicles',
  seasons: mockSeasons,
  status: 'featured',
  subscriberCount: 4280,
  rating: 4.7,
  createdAt: '2026-01-15T00:00:00Z',
  updatedAt: '2026-02-28T00:00:00Z',
};

export const mockSeriesSummary: SeriesSummary = {
  id: mockSeries.id,
  title: mockSeries.title,
  creator: mockCreator,
  domain: 'formal',
  coverImage: mockSeries.coverImage,
  seasonCount: 2,
  episodeCount: 4,
  subscriberCount: 4280,
  rating: 4.7,
  status: 'featured',
};

const ep1Progress: EpisodeProgress = {
  episodeId: 'ep-1',
  storiesCompleted: 3,
  storiesTotal: 3,
  status: 'completed',
};

const ep2Progress: EpisodeProgress = {
  episodeId: 'ep-2',
  storiesCompleted: 1,
  storiesTotal: 1,
  status: 'completed',
};

const ep3Progress: EpisodeProgress = {
  episodeId: 'ep-3',
  storiesCompleted: 1,
  storiesTotal: 2,
  status: 'in_progress',
};

const season1Progress: SeasonProgress = {
  seasonId: 'season-1',
  episodesCompleted: 2,
  episodesTotal: 2,
  episodeProgress: {
    'ep-1': ep1Progress,
    'ep-2': ep2Progress,
  },
};

const season2Progress: SeasonProgress = {
  seasonId: 'season-2',
  episodesCompleted: 0,
  episodesTotal: 2,
  episodeProgress: {
    'ep-3': ep3Progress,
  },
};

export const mockSeriesProgress: SeriesProgress = {
  seriesId: 'series-001',
  subscribed: true,
  seasonsCompleted: 1,
  seasonsTotal: 2,
  seasonProgress: {
    'season-1': season1Progress,
    'season-2': season2Progress,
  },
  currentEpisodeId: 'ep-3',
  currentStoryId: 'story-3b',
};

export const mockStoryMap: Record<string, StorySummary> = {
  'story-1a': {
    id: 'story-1a',
    title: 'The Moth in the Machine',
    teaser: 'Grace Hopper finds a literal bug.',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 8,
    seriesId: 'series-001',
    episodeId: 'ep-1',
  },
  'story-1b': {
    id: 'story-1b',
    title: 'Print Statement Debugging',
    teaser: 'The oldest trick in the book.',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 10,
    seriesId: 'series-001',
    episodeId: 'ep-1',
  },
  'story-1c': {
    id: 'story-1c',
    title: 'The Debugger',
    teaser: 'Step through code, one line at a time.',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 7,
    seriesId: 'series-001',
    episodeId: 'ep-1',
  },
  'story-2a': {
    id: 'story-2a',
    title: 'Fence Posts and Loops',
    teaser: 'Why there are 11 fence posts in a 10-section fence.',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 12,
    seriesId: 'series-001',
    episodeId: 'ep-2',
  },
  'story-3a': {
    id: 'story-3a',
    title: 'The Bank Transfer',
    teaser: 'Two transactions, one account, zero locks.',
    domain: 'formal',
    difficulty: 'intermediate',
    duration: 10,
    seriesId: 'series-001',
    episodeId: 'ep-3',
  },
  'story-3b': {
    id: 'story-3b',
    title: 'Mutex and Semaphore',
    teaser: 'Traffic lights for threads.',
    domain: 'formal',
    difficulty: 'intermediate',
    duration: 8,
    seriesId: 'series-001',
    episodeId: 'ep-3',
  },
  'story-4a': {
    id: 'story-4a',
    title: 'The Leaking Faucet',
    teaser: 'Allocated memory that never gets freed.',
    domain: 'formal',
    difficulty: 'advanced',
    duration: 10,
    seriesId: 'series-001',
    episodeId: 'ep-4',
  },
  'story-4b': {
    id: 'story-4b',
    title: 'Garbage Collection',
    teaser: 'Let the runtime clean up after you.',
    domain: 'formal',
    difficulty: 'advanced',
    duration: 12,
    seriesId: 'series-001',
    episodeId: 'ep-4',
  },
  'story-4c': {
    id: 'story-4c',
    title: 'Profiling Memory',
    teaser: 'Tools to find the leak before it sinks the ship.',
    domain: 'formal',
    difficulty: 'advanced',
    duration: 8,
    seriesId: 'series-001',
    episodeId: 'ep-4',
  },
};

export const mockCreatorOtherSeries: SeriesSummary[] = [
  {
    id: 'series-002',
    title: 'Algorithm Adventures',
    creator: mockCreator,
    domain: 'formal',
    coverImage: 'https://placehold.co/400x200/1e293b/ffffff?text=Algorithms',
    seasonCount: 3,
    episodeCount: 12,
    subscriberCount: 3100,
    rating: 4.5,
    status: 'published',
  },
  {
    id: 'series-003',
    title: 'Data Structure Dungeons',
    creator: mockCreator,
    domain: 'formal',
    coverImage: 'https://placehold.co/400x200/1e293b/ffffff?text=Data+Structures',
    seasonCount: 2,
    episodeCount: 8,
    subscriberCount: 2200,
    rating: 4.3,
    status: 'published',
  },
];
