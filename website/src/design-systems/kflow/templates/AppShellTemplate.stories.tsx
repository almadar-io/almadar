import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShellTemplate } from './AppShellTemplate';
import type { AppShellEntity } from './AppShellTemplate';
import { DashboardBoard } from '../organisms/DashboardBoard';
import { LearnBoard } from '../organisms/LearnBoard';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Container,
  SimpleGrid,
  Badge,
  ProgressBar,
  Button,
  Tabs,
  EmptyState,
  Avatar,
} from '@almadar/ui';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Compass,
  Settings,
  TrendingUp,
  Target,
  Flame,
  Plus,
  Search,
  Star,
  CheckCircle,
  Bookmark,
  Clock,
  Trophy,
  Users,
  Zap,
  MapPin,
  Brain,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

const meta: Meta<typeof AppShellTemplate> = {
  title: 'KFlow/Templates/AppShellTemplate',
  component: AppShellTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppShellTemplate>;

// ---------------------------------------------------------------------------
// Shared nav items
// ---------------------------------------------------------------------------

const baseNavItems: AppShellEntity['navigationItems'] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'learn', label: 'Learn', icon: BookOpen, href: '/learn' },
  { id: 'stories', label: 'Stories', icon: Library, href: '/stories' },
  { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

const withActive = (route: string) =>
  baseNavItems.map(item => ({ ...item, active: item.href === route }));

const loggedInUser = {
  name: 'Sara Al-Rashid',
  email: 'sara@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara',
};

// ---------------------------------------------------------------------------
// 1. Default — standard dashboard view with placeholder
// ---------------------------------------------------------------------------

const PlaceholderContent = ({ title, description }: { title: string; description?: string }) => (
  <Container size="lg" padding="sm" className="py-8">
    <VStack gap="lg">
      <Typography variant="h2" weight="bold">{title}</Typography>
      {description && (
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {description}
        </Typography>
      )}
      <Card className="p-6">
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          Page content renders here. The shell provides sidebar navigation,
          mobile header, theme toggle, and user controls.
        </Typography>
      </Card>
    </VStack>
  </Container>
);

export const Default: Story = {
  args: {
    entity: {
      navigationItems: withActive('/dashboard'),
      user: loggedInUser,
      activeRoute: '/dashboard',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <PlaceholderContent title="Dashboard" />,
  },
};

// ---------------------------------------------------------------------------
// 2. WithDashboardContent — full dashboard organism inside the shell
// ---------------------------------------------------------------------------

export const WithDashboardContent: Story = {
  name: 'Dashboard Route',
  args: {
    entity: {
      navigationItems: withActive('/dashboard'),
      user: loggedInUser,
      activeRoute: '/dashboard',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: (
      <DashboardBoard
        entity={{
          welcomeName: 'Sara',
          stats: [
            { label: 'Learning Paths', value: 5, icon: TrendingUp, trend: 'up' },
            { label: 'Concepts Mastered', value: 42, icon: BookOpen, trend: 'up' },
            { label: 'Lessons Completed', value: 128, icon: Target, trend: 'flat' },
            { label: 'Day Streak', value: 14, icon: Flame, trend: 'up' },
          ],
          jumpBackInStories: [
            {
              id: 'mars-bug',
              title: 'The $125 Million Bug',
              teaser: 'How a unit conversion error destroyed a Mars orbiter.',
              domain: 'science',
              difficulty: 'beginner',
              duration: 12,
              currentSection: 3,
              totalSections: 5,
            },
            {
              id: 'bridge-sway',
              title: 'The Bridge That Swayed',
              teaser: 'Resonance brought the Millennium Bridge to its knees.',
              domain: 'engineering',
              difficulty: 'intermediate',
              duration: 14,
              currentSection: 1,
              totalSections: 6,
            },
          ],
          learningPaths: [
            {
              id: 'path-physics',
              graphId: 'graph-physics-101',
              name: 'Physics Fundamentals',
              seedConcept: 'Newtonian Mechanics',
              conceptCount: 18,
              levelCount: 4,
              description: 'From forces and motion to energy conservation.',
            },
            {
              id: 'path-crypto',
              graphId: 'graph-crypto-intro',
              name: 'Cryptography Basics',
              seedConcept: 'Symmetric Encryption',
              conceptCount: 12,
              levelCount: 3,
              description: 'Ciphers, hashing, and public-key crypto.',
            },
          ],
          quickActions: [
            { id: 'new-path', label: 'Create Path', icon: Plus, description: 'Start a new learning path' },
            { id: 'explore', label: 'Explore Stories', icon: Search, description: 'Browse the story catalog' },
            { id: 'favorites', label: 'Favorites', icon: Star, description: 'View saved stories' },
          ],
          recentActivity: [
            { id: 'act-1', type: 'lesson', title: 'Completed "Gravity Wells"', timestamp: '2 hours ago', icon: CheckCircle },
            { id: 'act-2', type: 'story', title: 'Started "The Password That Wasn\'t"', timestamp: '5 hours ago', icon: BookOpen },
            { id: 'act-3', type: 'bookmark', title: 'Bookmarked "The Prisoner\'s Choice"', timestamp: 'Yesterday', icon: Bookmark },
          ],
          achievements: [
            { id: 'ach-1', title: 'First Story Completed', earnedAt: '2026-01-15' },
            { id: 'ach-2', title: '7-Day Streak', earnedAt: '2026-02-01' },
          ],
        }}
      />
    ),
  },
};

// ---------------------------------------------------------------------------
// 3. WithLearnContent — learn page organism inside the shell
// ---------------------------------------------------------------------------

export const WithLearnContent: Story = {
  name: 'Learn Route',
  args: {
    entity: {
      navigationItems: withActive('/learn'),
      user: loggedInUser,
      activeRoute: '/learn',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: (
      <LearnBoard
        entity={{
          learningPaths: [
            {
              id: 'path-ml',
              graphId: 'graph-ml-fundamentals',
              name: 'Machine Learning Fundamentals',
              seedConcept: 'Supervised Learning',
              conceptCount: 24,
              levelCount: 5,
              description: 'From linear regression to neural networks.',
            },
            {
              id: 'path-websec',
              graphId: 'graph-web-security',
              name: 'Web Security',
              seedConcept: 'OWASP Top 10',
              conceptCount: 18,
              levelCount: 4,
              description: 'XSS, SQL injection, and authentication flaws.',
            },
            {
              id: 'path-quantum',
              graphId: 'graph-quantum-computing',
              name: 'Quantum Computing Primer',
              seedConcept: 'Qubits and Superposition',
              conceptCount: 14,
              levelCount: 3,
              description: 'Quantum gates, entanglement, and algorithms.',
            },
          ],
          loading: false,
        }}
      />
    ),
  },
};

// ---------------------------------------------------------------------------
// Series / Stories imports and mock data
// ---------------------------------------------------------------------------

import { StoryCatalogBoard } from '../organisms/StoryCatalogBoard';
import { SeriesViewBoard } from '../organisms/SeriesViewBoard';
import { StoryHookView } from '../molecules/story/StoryHookView';
import { StoryRabbitHole } from '../molecules/story/StoryRabbitHole';
import {
  mockSeries,
  mockStoryMap,
  mockSeriesProgress,
  mockSeriesSummary,
  mockCreatorOtherSeries,
} from '../molecules/story/__mocks__/seriesMockData';
import type { StorySummary } from '../types/knowledge';

/**
 * Stories that belong to the series (some have seriesId set so the
 * SeriesCard badge shows up, connecting catalog to series).
 */
const catalogStories: StorySummary[] = [
  {
    id: 'mars-bug', title: 'The $125 Million Bug',
    teaser: 'How a unit conversion error destroyed a Mars orbiter.',
    domain: 'natural', difficulty: 'beginner', duration: 12, rating: 4.8, playCount: 2340,
    coverImage: 'https://placehold.co/400x200/1a1a2e/e94560?text=Mars+Orbiter',
  },
  {
    id: 'story-1a', title: 'The Moth in the Machine',
    teaser: 'Grace Hopper finds a literal bug.',
    domain: 'formal', difficulty: 'beginner', duration: 8, rating: 4.6, playCount: 1800,
    seriesId: 'series-001', episodeId: 'ep-1',
    coverImage: 'https://placehold.co/400x200/16213e/58cc02?text=Moth+in+Machine',
  },
  {
    id: 'prisoners-choice', title: "The Prisoner's Choice",
    teaser: 'Can two rational opponents always find a better deal?',
    domain: 'formal', difficulty: 'advanced', duration: 15, rating: 4.9, playCount: 890,
    coverImage: 'https://placehold.co/400x200/16213e/0f3460?text=Game+Theory',
  },
  {
    id: 'story-3a', title: 'The Bank Transfer',
    teaser: 'Two transactions, one account, zero locks.',
    domain: 'formal', difficulty: 'intermediate', duration: 10, rating: 4.5, playCount: 960,
    seriesId: 'series-001', episodeId: 'ep-3',
    coverImage: 'https://placehold.co/400x200/16213e/ce82ff?text=Race+Condition',
  },
  {
    id: 'silk-road', title: 'The Silk Road',
    teaser: 'How ancient trade networks connected civilizations.',
    domain: 'social', difficulty: 'intermediate', duration: 18, rating: 4.6, playCount: 1890,
    coverImage: 'https://placehold.co/400x200/2a2a3e/e0c097?text=Silk+Road',
  },
  {
    id: 'story-2a', title: 'Fence Posts and Loops',
    teaser: 'Why there are 11 fence posts in a 10-section fence.',
    domain: 'formal', difficulty: 'beginner', duration: 12, rating: 4.3, playCount: 1400,
    seriesId: 'series-001', episodeId: 'ep-2',
    coverImage: 'https://placehold.co/400x200/16213e/ffc800?text=Off+by+One',
  },
];

// ---------------------------------------------------------------------------
// 4. StoriesCatalog — catalog with Series tab (entry point)
// ---------------------------------------------------------------------------

/**
 * The catalog is the main Stories landing page. It has domain filter tabs
 * AND a "Series" tab. Stories that belong to a series show a series badge.
 * Clicking the badge (or the Series tab → a SeriesCard) navigates to the
 * series detail view.
 */
const CatalogContent = () => (
  <StoryCatalogBoard
    entity={{
      stories: catalogStories,
      featuredStory: catalogStories[0],
      domains: ['natural', 'formal', 'social'],
      series: [mockSeriesSummary, ...mockCreatorOtherSeries],
    }}
  />
);

export const StoriesCatalog: Story = {
  name: '4. Stories → Catalog',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <CatalogContent />,
  },
};

// ---------------------------------------------------------------------------
// 4a. SeriesDetail — user clicked a series card from the catalog
// ---------------------------------------------------------------------------

/**
 * The user clicked "The Debugging Chronicles" from the catalog's Series tab
 * (or from a story's series badge). This shows the full series page:
 * banner, stats, season tabs, episode list, creator section.
 *
 * From here, clicking an episode card navigates to the first story
 * in that episode (story 5).
 */
const SeriesDetailContent = () => (
  <SeriesViewBoard
    entity={{
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: true,
      progress: mockSeriesProgress,
      creatorOtherSeries: mockCreatorOtherSeries,
    }}
  />
);

export const SeriesDetail: Story = {
  name: '4a. Stories → Series Detail',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <SeriesDetailContent />,
  },
};

// ---------------------------------------------------------------------------
// 4b. EpisodeStory — playing a story from an episode
// ---------------------------------------------------------------------------

/**
 * The user clicked Episode 3 "Race Conditions" from the series detail,
 * which launched story-3a "The Bank Transfer". This is the cinematic
 * hook screen (first thing the reader sees).
 *
 * After this they'd scroll through scenes, lesson, game, then reward.
 */
const EpisodeStoryContent = () => (
  <StoryHookView
    title="The Bank Transfer"
    hookQuestion="What happens when two transactions hit the same account at the same time?"
    hookNarrative="A customer sends $100 to their landlord. At the exact same millisecond, a direct debit pulls $50 for electricity. The account has $120. Both transactions read the balance, both see $120, both proceed. The final balance? It depends on who writes last. Welcome to the world of **race conditions**."
    domain="formal"
    difficulty="intermediate"
    duration={10}
    coverImage="https://placehold.co/1600x900/16213e/ce82ff?text=The+Bank+Transfer"
    gameType="debugger"
    onBegin={() => {}}
  />
);

export const EpisodeStory: Story = {
  name: '4b. Stories → Series → Episode → Story',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <EpisodeStoryContent />,
  },
};

// ---------------------------------------------------------------------------
// 4c. StoryComplete — finished a story, continue to next in episode
// ---------------------------------------------------------------------------

/**
 * The user finished "The Bank Transfer" (story 1 of 2 in Episode 3).
 * The reward screen shows the EpisodeContinueCard instead of the
 * standard rabbit hole, prompting "Continue to next story in this episode".
 *
 * This is the key connection: stories flow into each other within
 * an episode, episodes chain within a season, seasons within a series.
 */
const StoryCompleteContent = () => (
  <Box className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #16213e 0%, #0f172a 100%)' }}>
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Trophy size={48} className="text-[var(--color-warning)]" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Story Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You proved that unsynchronized concurrent access is a recipe for data corruption.
          </Typography>
        </VStack>

        {/* Episode continue: next story in same episode */}
        <StoryRabbitHole
          bridges={[
            { story: catalogStories[2], connectionLabel: 'Decision Theory' },
            { story: catalogStories[4], connectionLabel: 'Distributed Systems' },
          ]}
          primarySubjectId="cs"
          primarySubjectName="Computer Science"
          episodeContinue={{
            type: 'story',
            title: 'Mutex and Semaphore',
            subtitle: 'Story 2 of 2 in "Race Conditions"',
            storyId: 'story-3b',
          }}
        />
      </VStack>
    </Container>
  </Box>
);

export const StoryCompleteEpisodeContinue: Story = {
  name: '4c. Stories → Series → Story Complete → Next Story',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <StoryCompleteContent />,
  },
};

// ---------------------------------------------------------------------------
// 4d. EpisodeComplete — finished all stories in an episode
// ---------------------------------------------------------------------------

/**
 * The user finished both stories in Episode 3. The EpisodeContinueCard
 * now shows "Next Episode: Memory Leaks" (Episode 4), rendered above the
 * standard rabbit hole for additional exploration.
 */
const EpisodeCompleteContent = () => (
  <Box className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #16213e 0%, #0f172a 100%)' }}>
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Trophy size={48} className="text-[var(--color-warning)]" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Episode Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished all stories in "Race Conditions". Ready for the next episode?
          </Typography>
        </VStack>

        <StoryRabbitHole
          bridges={[
            { story: catalogStories[2], connectionLabel: 'Optimization' },
          ]}
          primarySubjectId="cs"
          primarySubjectName="Computer Science"
          episodeContinue={{
            type: 'episode',
            title: 'Memory Leaks',
            subtitle: 'Season 2, Episode 4',
            storyId: 'story-4a',
          }}
        />
      </VStack>
    </Container>
  </Box>
);

export const EpisodeComplete: Story = {
  name: '4d. Stories → Series → Episode Complete → Next Episode',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <EpisodeCompleteContent />,
  },
};

// ---------------------------------------------------------------------------
// 4e. SeriesComplete — finished all episodes in the series
// ---------------------------------------------------------------------------

/**
 * The user finished every story in every episode across both seasons.
 * Celebration card with "Back to Series" button, plus rabbit hole
 * for further exploration.
 */
const SeriesCompleteContent = () => (
  <Box className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #0f3460 0%, #0f172a 100%)' }}>
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Trophy size={48} className="text-[var(--color-warning)]" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Series Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You mastered every episode in The Debugging Chronicles.
          </Typography>
        </VStack>

        <StoryRabbitHole
          bridges={[
            { story: catalogStories[2], connectionLabel: 'Advanced Logic' },
            { story: catalogStories[4], connectionLabel: 'Systems Thinking' },
          ]}
          primarySubjectId="cs"
          primarySubjectName="Computer Science"
          episodeContinue={{
            type: 'series_complete',
            title: 'The Debugging Chronicles',
            subtitle: 'You completed all 4 episodes across 2 seasons!',
            seriesId: 'series-001',
          }}
        />
      </VStack>
    </Container>
  </Box>
);

export const SeriesComplete: Story = {
  name: '4e. Stories → Series Complete',
  args: {
    entity: {
      navigationItems: withActive('/stories'),
      user: loggedInUser,
      activeRoute: '/stories',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <SeriesCompleteContent />,
  },
};

// ---------------------------------------------------------------------------
// 5. ExploreRoute — knowledge graph exploration
// ---------------------------------------------------------------------------

const ExploreContent = () => (
  <Container size="lg" padding="sm" className="py-8">
    <VStack gap="lg">
      <VStack gap="xs">
        <Typography variant="h2" weight="bold">Explore Knowledge</Typography>
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          Navigate through domains, subjects, and concepts
        </Typography>
      </VStack>

      <SimpleGrid cols={4} gap="md">
        {[
          { name: 'Physics', subjects: 8, concepts: 142, color: 'from-blue-500/20 to-blue-500/5', icon: Zap },
          { name: 'Computer Science', subjects: 12, concepts: 215, color: 'from-green-500/20 to-green-500/5', icon: Brain },
          { name: 'Mathematics', subjects: 6, concepts: 98, color: 'from-purple-500/20 to-purple-500/5', icon: Target },
          { name: 'Biology', subjects: 7, concepts: 110, color: 'from-emerald-500/20 to-emerald-500/5', icon: Sparkles },
        ].map((domain) => (
          <Card key={domain.name} className="p-5 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
            <VStack gap="md">
              <Box className={`h-16 w-16 rounded-[var(--radius-md)] bg-gradient-to-br ${domain.color} flex items-center justify-center`}>
                <domain.icon size={28} className="text-[var(--color-foreground)]" />
              </Box>
              <VStack gap="xs">
                <Typography variant="body" weight="bold">{domain.name}</Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {domain.subjects} subjects, {domain.concepts} concepts
                </Typography>
              </VStack>
              <ProgressBar value={Math.random() * 60 + 10} max={100} variant="default" />
            </VStack>
          </Card>
        ))}
      </SimpleGrid>

      <Card className="p-6">
        <VStack gap="md">
          <Typography variant="h4" weight="bold">Your Explorer Stats</Typography>
          <SimpleGrid cols={3} gap="md">
            <VStack gap="xs" align="center" className="p-4">
              <Typography variant="h3" weight="bold" className="text-[var(--color-primary)]">4</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">Domains Visited</Typography>
            </VStack>
            <VStack gap="xs" align="center" className="p-4">
              <Typography variant="h3" weight="bold" className="text-[var(--color-primary)]">42</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">Concepts Mastered</Typography>
            </VStack>
            <VStack gap="xs" align="center" className="p-4">
              <Typography variant="h3" weight="bold" className="text-[var(--color-primary)]">18</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">Stories Completed</Typography>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Card>
    </VStack>
  </Container>
);

export const ExploreRoute: Story = {
  name: 'Explore Route',
  args: {
    entity: {
      navigationItems: withActive('/explore'),
      user: loggedInUser,
      activeRoute: '/explore',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <ExploreContent />,
  },
};

// ---------------------------------------------------------------------------
// 6. SettingsRoute — user settings
// ---------------------------------------------------------------------------

const SettingsContent = () => (
  <Container size="md" padding="sm" className="py-8">
    <VStack gap="lg">
      <Typography variant="h2" weight="bold">Settings</Typography>

      <Card className="p-6">
        <VStack gap="lg">
          <Typography variant="h4" weight="bold">Profile</Typography>
          <HStack gap="md" align="center">
            <Avatar
              src={loggedInUser.avatar}
              alt={loggedInUser.name}
              size="lg"
              initials="S"
            />
            <VStack gap="xs">
              <Typography variant="body" weight="bold">{loggedInUser.name}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {loggedInUser.email}
              </Typography>
              <Badge variant="success" size="sm">Pro Member</Badge>
            </VStack>
          </HStack>
        </VStack>
      </Card>

      <Card className="p-6">
        <VStack gap="md">
          <Typography variant="h4" weight="bold">Learning Preferences</Typography>
          <VStack gap="sm">
            {[
              { label: 'Preferred Language', value: 'English + Arabic (Bilingual)' },
              { label: 'Difficulty Level', value: 'Intermediate' },
              { label: 'Daily Goal', value: '30 minutes' },
              { label: 'Notification Frequency', value: 'Daily digest' },
            ].map((pref) => (
              <HStack key={pref.label} justify="between" align="center" className="py-2 border-b border-[var(--color-border)] last:border-0">
                <Typography variant="body">{pref.label}</Typography>
                <Typography variant="body" className="text-[var(--color-muted-foreground)]">{pref.value}</Typography>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Card>

      <Card className="p-6">
        <VStack gap="md">
          <Typography variant="h4" weight="bold">Achievements</Typography>
          <SimpleGrid cols={2} gap="sm">
            {[
              { icon: Trophy, title: 'First Story', desc: 'Complete your first story' },
              { icon: Flame, title: '7-Day Streak', desc: 'Learn 7 days in a row' },
              { icon: GraduationCap, title: 'Path Pioneer', desc: 'Complete a learning path' },
              { icon: MapPin, title: 'Explorer', desc: 'Visit all 4 domains' },
            ].map((ach) => (
              <HStack key={ach.title} gap="sm" align="center" className="p-3 rounded-[var(--radius-sm)] bg-[var(--color-muted)]/50">
                <Box className="h-10 w-10 rounded-[var(--radius-sm)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <ach.icon size={18} className="text-[var(--color-primary)]" />
                </Box>
                <VStack gap="none">
                  <Typography variant="small" weight="bold">{ach.title}</Typography>
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">{ach.desc}</Typography>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Card>
    </VStack>
  </Container>
);

export const SettingsRoute: Story = {
  name: 'Settings Route',
  args: {
    entity: {
      navigationItems: withActive('/settings'),
      user: loggedInUser,
      activeRoute: '/settings',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <SettingsContent />,
  },
};

// ---------------------------------------------------------------------------
// 7. CollapsedSidebar — sidebar starts collapsed
// ---------------------------------------------------------------------------

export const CollapsedSidebar: Story = {
  args: {
    entity: {
      navigationItems: withActive('/dashboard'),
      user: loggedInUser,
      activeRoute: '/dashboard',
      theme: 'light',
      sidebarCollapsed: true,
      brandName: 'KFlow',
    },
    children: (
      <DashboardBoard
        entity={{
          welcomeName: 'Sara',
          stats: [
            { label: 'Learning Paths', value: 5, icon: TrendingUp, trend: 'up' },
            { label: 'Concepts Mastered', value: 42, icon: BookOpen, trend: 'up' },
            { label: 'Lessons Completed', value: 128, icon: Target, trend: 'flat' },
            { label: 'Day Streak', value: 14, icon: Flame, trend: 'up' },
          ],
          jumpBackInStories: [],
          learningPaths: [
            {
              id: 'path-physics',
              graphId: 'graph-physics-101',
              name: 'Physics Fundamentals',
              seedConcept: 'Newtonian Mechanics',
              conceptCount: 18,
              levelCount: 4,
            },
          ],
          quickActions: [
            { id: 'new-path', label: 'Create Path', icon: Plus },
            { id: 'explore', label: 'Explore', icon: Search },
          ],
          recentActivity: [],
        }}
      />
    ),
  },
};

// ---------------------------------------------------------------------------
// 8. NoUser — signed out state
// ---------------------------------------------------------------------------

export const NoUser: Story = {
  name: 'Signed Out',
  args: {
    entity: {
      navigationItems: withActive('/dashboard'),
      activeRoute: '/dashboard',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: (
      <Container size="md" padding="sm" className="py-16">
        <EmptyState
          title="Welcome to KFlow"
          description="Sign in to start your personalized learning journey through interactive knowledge stories."
          icon={GraduationCap}
          actionLabel="Sign In"
          onAction={() => {}}
        />
      </Container>
    ),
  },
};

// ---------------------------------------------------------------------------
// 9. WithBadges — nav items with badge counts
// ---------------------------------------------------------------------------

export const WithBadges: Story = {
  args: {
    entity: {
      navigationItems: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: true, badge: 3 },
        { id: 'learn', label: 'Learn', icon: BookOpen, href: '/learn', badge: 12 },
        { id: 'stories', label: 'Stories', icon: Library, href: '/stories', badge: 'New' },
        { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', badge: 1 },
      ],
      user: loggedInUser,
      activeRoute: '/dashboard',
      theme: 'light',
      brandName: 'KFlow',
    },
    children: <PlaceholderContent title="Dashboard" description="Nav items show notification badges for pending actions." />,
  },
};

// ---------------------------------------------------------------------------
// 10. DarkTheme — dark mode with dashboard content
// ---------------------------------------------------------------------------

export const DarkTheme: Story = {
  args: {
    entity: {
      navigationItems: withActive('/learn'),
      user: loggedInUser,
      activeRoute: '/learn',
      theme: 'dark',
      brandName: 'KFlow',
    },
    children: (
      <LearnBoard
        entity={{
          learningPaths: [
            {
              id: 'path-ml',
              graphId: 'graph-ml-fundamentals',
              name: 'Machine Learning Fundamentals',
              seedConcept: 'Supervised Learning',
              conceptCount: 24,
              levelCount: 5,
              description: 'From linear regression to neural networks.',
            },
            {
              id: 'path-websec',
              graphId: 'graph-web-security',
              name: 'Web Security',
              seedConcept: 'OWASP Top 10',
              conceptCount: 18,
              levelCount: 4,
              description: 'XSS, SQL injection, and authentication flaws.',
            },
          ],
          loading: false,
        }}
      />
    ),
  },
  decorators: [
    (StoryFn) => (
      <Box className="dark" style={{ colorScheme: 'dark' }}>
        <StoryFn />
      </Box>
    ),
  ],
};

// ---------------------------------------------------------------------------
// 11. CustomBranding — different brand name and logo
// ---------------------------------------------------------------------------

export const CustomBranding: Story = {
  name: 'Custom Branding',
  args: {
    entity: {
      navigationItems: withActive('/dashboard'),
      user: { name: 'Ahmed', email: 'ahmed@almadar.io' },
      activeRoute: '/dashboard',
      theme: 'light',
      brandName: 'Almadar Learn',
      logo: (
        <Box className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center rounded-[var(--radius-sm)]">
          <Typography variant="small" className="text-white font-bold text-sm">A</Typography>
        </Box>
      ),
    },
    children: <PlaceholderContent title="Custom Branded Shell" description="The shell supports custom brand names and logo components." />,
  },
};
