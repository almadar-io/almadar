import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StoriesShellTemplate } from './StoriesShellTemplate';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Container,
  SimpleGrid,
  Divider,
  Card,
  Badge,
  Icon,
} from '@almadar/ui';
import { BookOpen, TrendingUp, Award, Clock, Home, Compass, Library } from 'lucide-react';
import { StoryCatalogBoard } from '../organisms/StoryCatalogBoard';
import { DomainExplorerBoard } from '../organisms/DomainExplorerBoard';
import { SeriesViewBoard } from '../organisms/SeriesViewBoard';
import { StoryRewardView } from '../molecules/story/StoryRewardView';
import { StoryRabbitHole } from '../molecules/story/StoryRabbitHole';
import { JumpBackInRow } from '../molecules/story/JumpBackInRow';
import { ConceptStoryLink } from '../molecules/story/ConceptStoryLink';
import { StoryCard } from '../molecules/story/StoryCard';
import { DomainBadge } from '../atoms/DomainBadge';
import type { StorySummary, StoryBridge, UserStoryProgress, KnowledgeDomain, KnowledgeSubject } from '../types/knowledge';
import type { JumpBackInStory } from '../molecules/story/JumpBackInCard';
import {
  mockSeries,
  mockStoryMap,
  mockSeriesProgress,
  mockSeriesSummary,
  mockCreatorOtherSeries,
} from '../molecules/story/__mocks__/seriesMockData';

const meta: Meta<typeof StoriesShellTemplate> = {
  title: 'KFlow/Templates/StoriesShellTemplate',
  component: StoriesShellTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoriesShellTemplate>;

// ---------------------------------------------------------------------------
// Shared mock data
// ---------------------------------------------------------------------------

const storyLibrary: StorySummary[] = [
  {
    id: 'mars-bug',
    title: 'The $125 Million Bug',
    teaser: 'How a unit conversion error destroyed a Mars orbiter, and how you can prevent it.',
    domain: 'natural',
    difficulty: 'beginner',
    duration: 12,
    rating: 4.8,
    playCount: 2340,
    coverImage: 'https://placehold.co/400x200/1a1a2e/e94560?text=Mars+Orbiter',
  },
  {
    id: 'prisoners-choice',
    title: "The Prisoner's Choice",
    teaser: 'Can two rational opponents always find a better deal? Game theory says no.',
    domain: 'formal',
    difficulty: 'advanced',
    duration: 15,
    rating: 4.9,
    playCount: 890,
    coverImage: 'https://placehold.co/400x200/16213e/0f3460?text=Game+Theory',
  },
  {
    id: 'silk-road',
    title: 'The Silk Road',
    teaser: 'How ancient trade networks connected civilizations across continents.',
    domain: 'social',
    difficulty: 'intermediate',
    duration: 18,
    rating: 4.6,
    playCount: 1890,
    coverImage: 'https://placehold.co/400x200/2a2a3e/e0c097?text=Silk+Road',
  },
  {
    id: 'hot-gates',
    title: 'The Hot Gates',
    teaser: '300 Spartans held a pass. The physics of leverage explain why.',
    domain: 'natural',
    difficulty: 'intermediate',
    duration: 14,
    rating: 4.7,
    playCount: 1560,
    coverImage: 'https://placehold.co/400x200/1a1a2e/ff6b6b?text=Thermopylae',
  },
  {
    id: 'merchants-scale',
    title: "The Merchant's Scale",
    teaser: 'A medieval merchant receives a gold coin. Is it real? Archimedes knew the answer.',
    domain: 'social',
    difficulty: 'beginner',
    duration: 10,
    rating: 4.5,
    playCount: 1520,
    coverImage: 'https://placehold.co/400x200/2a2a3e/ffd700?text=Gold+Coins',
  },
  {
    id: 'perfect-throw',
    title: 'The Perfect Throw',
    teaser: 'A basketball arcs through the air. How does the brain calculate the perfect angle?',
    domain: 'natural',
    difficulty: 'beginner',
    duration: 11,
    rating: 4.4,
    playCount: 2100,
    coverImage: 'https://placehold.co/400x200/1a1a2e/f5a623?text=Projectile',
  },
  {
    id: 'grain-counter',
    title: 'The Grain Counter',
    teaser: 'When a king offered one grain doubled on each chessboard square, he had no idea what exponential growth meant.',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 9,
    rating: 4.3,
    playCount: 3200,
    coverImage: 'https://placehold.co/400x200/16213e/c0c0c0?text=Exponential',
  },
  {
    id: 'invisible-hand',
    title: 'The Invisible Hand',
    teaser: 'A Scottish professor watches a pin factory and discovers the engine of capitalism.',
    domain: 'social',
    difficulty: 'advanced',
    duration: 20,
    rating: 4.8,
    playCount: 780,
    coverImage: 'https://placehold.co/400x200/2a2a3e/85c1e9?text=Economics',
  },
  {
    id: 'smart-thermostat',
    title: 'The Smart Thermostat',
    teaser: 'Your house maintains 22 degrees. Feedback loops run the world.',
    domain: 'formal',
    difficulty: 'intermediate',
    duration: 13,
    rating: 4.6,
    playCount: 1050,
    coverImage: 'https://placehold.co/400x200/16213e/4ecdc4?text=Feedback+Loop',
  },
];

const inProgressStories: JumpBackInStory[] = [
  {
    ...storyLibrary[0],
    currentSection: 3,
    totalSections: 5,
  },
  {
    ...storyLibrary[2],
    currentSection: 1,
    totalSections: 7,
  },
  {
    ...storyLibrary[1],
    currentSection: 6,
    totalSections: 7,
  },
];

const bridges: StoryBridge[] = [
  { story: storyLibrary[1], connectionLabel: 'Decision Theory' },
  { story: storyLibrary[7], connectionLabel: 'Optimization' },
  { story: storyLibrary[8], connectionLabel: 'Control Systems' },
];

const user = { name: 'Osamah' };

// Breadcrumb presets for different navigation depths
const catalogBreadcrumbs = [
  { label: 'Stories', icon: Library, event: 'NAV_STORIES', isCurrent: true },
];

const exploreBreadcrumbs = [
  { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
  { label: 'Explore', icon: Compass, event: 'NAV_EXPLORE', isCurrent: true },
];

const storyBreadcrumbs = (domainLabel: string, storyTitle: string) => [
  { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
  { label: domainLabel, event: 'STORY_DOMAIN_FILTER' },
  { label: storyTitle, isCurrent: true },
];

const storyInSubjectBreadcrumbs = (domainLabel: string, subjectLabel: string, storyTitle: string) => [
  { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
  { label: 'Explore', icon: Compass, event: 'NAV_EXPLORE' },
  { label: domainLabel, event: 'STORY_DOMAIN_FILTER' },
  { label: subjectLabel, event: 'SELECT_SUBJECT' },
  { label: storyTitle, isCurrent: true },
];

// ---------------------------------------------------------------------------
// 1. Full Catalog Home — the main landing page
// ---------------------------------------------------------------------------

const CatalogHomeContent = () => (
  <VStack gap="none">
    {/* Jump Back In section */}
    <Container size="lg" padding="sm" className="py-6">
      <JumpBackInRow stories={inProgressStories} />
    </Container>

    <Divider />

    {/* Catalog */}
    <StoryCatalogBoard
      entity={{
        stories: storyLibrary,
        featuredStory: storyLibrary[3],
        domains: ['natural', 'formal', 'social'],
      }}
    />
  </VStack>
);

export const CatalogHome: Story = {
  args: {
    entity: { activeRoute: 'catalog', user, breadcrumbs: catalogBreadcrumbs },
    children: <CatalogHomeContent />,
  },
};

// ---------------------------------------------------------------------------
// 2. Catalog for new user — no in-progress stories
// ---------------------------------------------------------------------------

const NewUserCatalogContent = () => (
  <VStack gap="none">
    <Container size="lg" padding="sm" className="py-6">
      <JumpBackInRow stories={[]} />
    </Container>

    <Divider />

    <StoryCatalogBoard
      entity={{
        stories: storyLibrary,
        featuredStory: storyLibrary[6],
        domains: ['natural', 'formal', 'social'],
      }}
    />
  </VStack>
);

export const CatalogNewUser: Story = {
  args: {
    entity: { activeRoute: 'catalog' },
    children: <NewUserCatalogContent />,
  },
};

// ---------------------------------------------------------------------------
// 3. Story Complete — reward screen with rabbit hole
// ---------------------------------------------------------------------------

const StoryCompleteContent = () => (
  <StoryRewardView
    resolution="You proved you could have caught the bug that destroyed the Mars Climate Orbiter. The fix was simple: a unit conversion check that any engineer could implement. NASA now mandates dimensional analysis reviews on every mission. The $125 million lesson changed spaceflight forever."
    learningPoints={[
      'Every physical quantity has dimensions that must be tracked',
      'Unit mismatches are the most common source of engineering disasters',
      'Dimensional analysis is a cheap, reliable error-catching technique',
      'Always document and verify unit conventions at system boundaries',
    ]}
    gameResult={{ score: 100, time: 45, attempts: 2 }}
    coverImage="https://placehold.co/1600x900/1a1a2e/e94560?text=Mars+Orbiter+Complete"
    nextStory={storyLibrary[3]}
    bridges={bridges}
    primarySubjectId="physics"
    primarySubjectName="Physics"
    onShare={() => {}}
    onExploreMore={() => {}}
  />
);

export const StoryComplete: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: storyBreadcrumbs('Natural Sciences', 'The $125 Million Bug'),
    },
    children: <StoryCompleteContent />,
  },
};

// ---------------------------------------------------------------------------
// 4. Story Complete — end of series (generate CTA)
// ---------------------------------------------------------------------------

const EndOfSeriesContent = () => (
  <StoryRewardView
    resolution="You mapped the entire Silk Road trading network. From Chang'an to Constantinople, each stop was a node in a graph that shaped human civilization for two millennia."
    learningPoints={[
      'Trade networks are graphs with weighted edges',
      'Hub cities amplify cultural exchange non-linearly',
      'Route optimization predates computers by thousands of years',
    ]}
    gameResult={{ score: 85, time: 120, attempts: 1 }}
    coverImage="https://placehold.co/1600x900/2a2a3e/e0c097?text=Silk+Road+Complete"
    bridges={[
      { story: storyLibrary[4], connectionLabel: 'Ancient Commerce' },
      { story: storyLibrary[7], connectionLabel: 'Market Systems' },
    ]}
    primarySubjectId="history"
    primarySubjectName="History"
    onShare={() => {}}
    onExploreMore={() => {}}
  />
);

export const StoryCompleteEndOfSeries: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: storyBreadcrumbs('Social Sciences', 'The Silk Road'),
    },
    children: <EndOfSeriesContent />,
  },
};

// ---------------------------------------------------------------------------
// 5. Explorer with user progress
// ---------------------------------------------------------------------------

const domains: KnowledgeDomain[] = [
  { id: 'formal', name: 'Formal Sciences', domain: 'formal', description: 'Mathematics, Computer Science, Logic', subjectCount: 6, nodeCount: 2100, maxDepth: 11 },
  { id: 'natural', name: 'Natural Sciences', domain: 'natural', description: 'Physics, Chemistry, Biology', subjectCount: 4, nodeCount: 540, maxDepth: 9 },
  { id: 'social', name: 'Social Sciences', domain: 'social', description: 'Languages, Economics, History', subjectCount: 5, nodeCount: 1400, maxDepth: 13 },
];

const subjects: KnowledgeSubject[] = [
  { id: 'js', name: 'JavaScript', domain: 'formal', discipline: 'Computer Science', nodeCount: 371, maxDepth: 9, fileSize: 241022, rootNodeId: 'js-root' },
  { id: 'stats', name: 'Statistics', domain: 'formal', discipline: 'Mathematics', nodeCount: 254, maxDepth: 7, fileSize: 815175, rootNodeId: 'stats-root' },
  { id: 'python', name: 'Python', domain: 'formal', discipline: 'Computer Science', nodeCount: 228, maxDepth: 8, fileSize: 120000, rootNodeId: 'py-root' },
  { id: 'react', name: 'React', domain: 'formal', discipline: 'Computer Science', nodeCount: 183, maxDepth: 6, fileSize: 98000, rootNodeId: 'react-root' },
  { id: 'math', name: 'Mathematics', domain: 'formal', discipline: 'Mathematics', nodeCount: 234, maxDepth: 11, fileSize: 91000, rootNodeId: 'math-root' },
  { id: 'kotlin', name: 'Kotlin', domain: 'formal', discipline: 'Computer Science', nodeCount: 191, maxDepth: 5, fileSize: 135000, rootNodeId: 'kotlin-root' },
  { id: 'physics', name: 'Physics', domain: 'natural', discipline: 'Physics', nodeCount: 245, maxDepth: 7, fileSize: 190787, rootNodeId: 'phys-root' },
  { id: 'biology', name: 'Biology', domain: 'natural', discipline: 'Biology', nodeCount: 146, maxDepth: 6, fileSize: 85000, rootNodeId: 'bio-root' },
  { id: 'neuro', name: 'Neuroscience', domain: 'natural', discipline: 'Biology', nodeCount: 113, maxDepth: 9, fileSize: 72000, rootNodeId: 'neuro-root' },
  { id: 'cogsci', name: 'Cognitive Science', domain: 'natural', discipline: 'Cognitive Science', nodeCount: 36, maxDepth: 6, fileSize: 28000, rootNodeId: 'cog-root' },
  { id: 'spanish', name: 'Spanish', domain: 'social', discipline: 'Languages', nodeCount: 771, maxDepth: 6, fileSize: 189692, rootNodeId: 'es-root' },
  { id: 'slovenian', name: 'Slovenian', domain: 'social', discipline: 'Languages', nodeCount: 692, maxDepth: 6, fileSize: 175778, rootNodeId: 'sl-root' },
  { id: 'history', name: 'History', domain: 'social', discipline: 'History', nodeCount: 207, maxDepth: 5, fileSize: 95000, rootNodeId: 'hist-root' },
  { id: 'geography', name: 'Geography', domain: 'social', discipline: 'Geography', nodeCount: 176, maxDepth: 13, fileSize: 82000, rootNodeId: 'geo-root' },
  { id: 'drawing', name: 'Drawing', domain: 'social', discipline: 'Art', nodeCount: 204, maxDepth: 6, fileSize: 78000, rootNodeId: 'draw-root' },
];

const userProgress: UserStoryProgress = {
  storiesCompleted: ['mars-bug', 'silk-road', 'grain-counter', 'perfect-throw'],
  subjectProgress: {
    js: { completed: 3, total: 5, gamesPlayed: 2, averageScore: 85, timeSpentMinutes: 45 },
    stats: { completed: 1, total: 3, gamesPlayed: 1, averageScore: 92, timeSpentMinutes: 20 },
    python: { completed: 0, total: 2, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
    physics: { completed: 2, total: 4, gamesPlayed: 2, averageScore: 78, timeSpentMinutes: 35 },
    biology: { completed: 1, total: 2, gamesPlayed: 1, averageScore: 90, timeSpentMinutes: 15 },
    spanish: { completed: 0, total: 2, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
    history: { completed: 1, total: 3, gamesPlayed: 1, averageScore: 88, timeSpentMinutes: 25 },
    cogsci: { completed: 0, total: 0, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
    drawing: { completed: 0, total: 0, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
  },
  domainProgress: {
    formal: { completionPercent: 42, strongestSubject: 'Statistics', weakestSubject: 'Python' },
    natural: { completionPercent: 35, strongestSubject: 'Biology', weakestSubject: 'Cognitive Science' },
    social: { completionPercent: 18, strongestSubject: 'History', weakestSubject: 'Spanish' },
  },
  suggestedStories: [storyLibrary[8], storyLibrary[5]],
};

const ExploreContent = () => (
  <DomainExplorerBoard
    entity={{ domains, subjects, userProgress }}
    selectSubjectEvent="SELECT_SUBJECT"
  />
);

export const ExploreWithProgress: Story = {
  args: {
    entity: { activeRoute: 'explore', user, breadcrumbs: exploreBreadcrumbs },
    children: <ExploreContent />,
  },
};

// ---------------------------------------------------------------------------
// 6. Dashboard-style page — jump back in + concept links + suggestions
// ---------------------------------------------------------------------------

const DashboardContent = () => (
  <Container size="lg" padding="sm" className="py-6">
    <VStack gap="xl">
      {/* Stats summary */}
      <HStack gap="lg" className="flex-wrap">
        <Card className="p-4 flex-1 min-w-[180px]">
          <HStack gap="sm" align="center">
            <Icon icon={BookOpen} size="md" className="text-[var(--color-primary)]" />
            <VStack gap="xs">
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">Stories Completed</Typography>
              <Typography variant="h3" weight="bold">4</Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-4 flex-1 min-w-[180px]">
          <HStack gap="sm" align="center">
            <Icon icon={TrendingUp} size="md" className="text-[var(--color-success)]" />
            <VStack gap="xs">
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">Avg. Score</Typography>
              <Typography variant="h3" weight="bold">87%</Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-4 flex-1 min-w-[180px]">
          <HStack gap="sm" align="center">
            <Icon icon={Clock} size="md" className="text-[var(--color-warning)]" />
            <VStack gap="xs">
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">Time Spent</Typography>
              <Typography variant="h3" weight="bold">2.3h</Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-4 flex-1 min-w-[180px]">
          <HStack gap="sm" align="center">
            <Icon icon={Award} size="md" className="text-[var(--color-primary)]" />
            <VStack gap="xs">
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">Games Played</Typography>
              <Typography variant="h3" weight="bold">7</Typography>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      {/* Jump Back In */}
      <JumpBackInRow stories={inProgressStories} />

      <Divider />

      {/* Concept Story Links — "learn through stories" suggestions */}
      <VStack gap="md">
        <Typography variant="label" size="lg">Learn Through Stories</Typography>
        <SimpleGrid minChildWidth="320px" gap="md">
          <ConceptStoryLink
            conceptName="Dimensional Analysis"
            story={storyLibrary[0]}
          />
          <ConceptStoryLink
            conceptName="Game Theory"
            story={storyLibrary[1]}
          />
          <ConceptStoryLink
            conceptName="Trade Networks"
            story={storyLibrary[2]}
          />
          <ConceptStoryLink
            conceptName="Exponential Growth"
            story={storyLibrary[6]}
          />
        </SimpleGrid>
      </VStack>

      <Divider />

      {/* Suggested stories */}
      <VStack gap="md">
        <Typography variant="label" size="lg">Suggested For You</Typography>
        <HStack gap="md" className="overflow-x-auto pb-2">
          {storyLibrary.slice(4, 9).map((story) => (
            <Box key={story.id} className="min-w-[260px] max-w-[300px] flex-shrink-0">
              <StoryCard story={story} onClick={() => {}} />
            </Box>
          ))}
        </HStack>
      </VStack>
    </VStack>
  </Container>
);

export const Dashboard: Story = {
  args: {
    entity: { activeRoute: 'catalog', user },
    children: <DashboardContent />,
  },
};

// ---------------------------------------------------------------------------
// 7. Standalone Rabbit Hole — what user sees after finishing a story
// ---------------------------------------------------------------------------

const RabbitHoleFullContent = () => (
  <Box
    className="min-h-screen"
    style={{
      background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    }}
  >
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        {/* Completion header */}
        <VStack gap="sm" align="center">
          <Icon icon={Award} size="lg" className="text-yellow-400" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Story Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished "The $125 Million Bug" and scored 100 points.
          </Typography>
        </VStack>

        <Divider className="border-white/10" />

        {/* Full rabbit hole with all sections */}
        <StoryRabbitHole
          nextStory={storyLibrary[3]}
          bridges={[
            { story: storyLibrary[5], connectionLabel: 'Projectile Motion' },
            { story: storyLibrary[8], connectionLabel: 'Feedback Systems' },
            { story: storyLibrary[1], connectionLabel: 'Optimization Theory' },
          ]}
          primarySubjectId="physics"
          primarySubjectName="Physics"
        />

        <Divider className="border-white/10" />

        {/* Concept links from the completed story */}
        <VStack gap="md">
          <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
            Concepts From This Story
          </Typography>
          <VStack gap="sm">
            <ConceptStoryLink conceptName="Dimensional Analysis" story={storyLibrary[5]} />
            <ConceptStoryLink conceptName="Unit Systems" story={storyLibrary[8]} />
          </VStack>
        </VStack>
      </VStack>
    </Container>
  </Box>
);

export const RabbitHoleFull: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: storyInSubjectBreadcrumbs('Natural Sciences', 'Physics', 'The $125 Million Bug'),
    },
    children: <RabbitHoleFullContent />,
  },
};

// ---------------------------------------------------------------------------
// 8. Rabbit Hole — end of series, generate prompt
// ---------------------------------------------------------------------------

const RabbitHoleGenerateContent = () => (
  <Box
    className="min-h-screen"
    style={{
      background: 'linear-gradient(to bottom, #2a2a3e 0%, #1a1a2e 100%)',
    }}
  >
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Icon icon={Award} size="lg" className="text-yellow-400" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Series Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished all stories in the "Origins of Commerce" series.
          </Typography>
        </VStack>

        <Divider className="border-white/10" />

        {/* No nextStory → shows generate CTA */}
        <StoryRabbitHole
          bridges={[
            { story: storyLibrary[7], connectionLabel: 'Market Theory' },
            { story: storyLibrary[6], connectionLabel: 'Mathematical Foundations' },
          ]}
          primarySubjectId="history"
          primarySubjectName="History"
        />
      </VStack>
    </Container>
  </Box>
);

export const RabbitHoleEndOfSeries: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: storyInSubjectBreadcrumbs('Social Sciences', 'History', 'The Silk Road'),
    },
    children: <RabbitHoleGenerateContent />,
  },
};

// ---------------------------------------------------------------------------
// 9. Signed out — catalog browse only
// ---------------------------------------------------------------------------

export const SignedOutBrowse: Story = {
  args: {
    entity: { activeRoute: 'catalog' },
    children: (
      <StoryCatalogBoard
        entity={{
          stories: storyLibrary,
          featuredStory: storyLibrary[0],
          domains: ['natural', 'formal', 'social'],
        }}
      />
    ),
  },
};

// ---------------------------------------------------------------------------
// 10. Mobile-width catalog (decorator)
// ---------------------------------------------------------------------------

export const MobileCatalog: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    entity: { activeRoute: 'catalog', user },
    children: (
      <VStack gap="none">
        <Container size="lg" padding="sm" className="py-4">
          <JumpBackInRow stories={inProgressStories.slice(0, 1)} />
        </Container>
        <Divider />
        <StoryCatalogBoard
          entity={{
            stories: storyLibrary.slice(0, 4),
            domains: ['natural', 'formal', 'social'],
          }}
        />
      </VStack>
    ),
  },
};

// ---------------------------------------------------------------------------
// 11. Series View — full series page inside the shell
// ---------------------------------------------------------------------------

const SeriesViewContent = () => (
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

const seriesBreadcrumbs = [
  { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
  { label: 'Series', icon: Library, event: 'NAV_SERIES' },
  { label: 'The Debugging Chronicles', isCurrent: true },
];

export const SeriesView: Story = {
  args: {
    entity: {
      activeRoute: 'series',
      user,
      breadcrumbs: seriesBreadcrumbs,
    },
    children: <SeriesViewContent />,
  },
};

// ---------------------------------------------------------------------------
// 12. Series View (not subscribed, no progress)
// ---------------------------------------------------------------------------

const SeriesViewNewContent = () => (
  <SeriesViewBoard
    entity={{
      series: mockSeries,
      storyMap: mockStoryMap,
      isSubscribed: false,
    }}
  />
);

export const SeriesViewNew: Story = {
  args: {
    entity: {
      activeRoute: 'series',
      breadcrumbs: [
        { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
        { label: 'Series', icon: Library, event: 'NAV_SERIES' },
        { label: 'The Debugging Chronicles', isCurrent: true },
      ],
    },
    children: <SeriesViewNewContent />,
  },
};

// ---------------------------------------------------------------------------
// 13. Catalog with Series tab — catalog showing series cards
// ---------------------------------------------------------------------------

const seriesSummaries = [
  mockSeriesSummary,
  ...mockCreatorOtherSeries,
];

const CatalogWithSeriesContent = () => (
  <VStack gap="none">
    <Container size="lg" padding="sm" className="py-6">
      <JumpBackInRow stories={inProgressStories} />
    </Container>
    <Divider />
    <StoryCatalogBoard
      entity={{
        stories: storyLibrary,
        featuredStory: storyLibrary[3],
        domains: ['natural', 'formal', 'social'],
        series: seriesSummaries,
      }}
    />
  </VStack>
);

export const CatalogWithSeries: Story = {
  args: {
    entity: { activeRoute: 'catalog', user, breadcrumbs: catalogBreadcrumbs },
    children: <CatalogWithSeriesContent />,
  },
};

// ---------------------------------------------------------------------------
// 14. Rabbit Hole with Episode Continue — mid-episode completion
// ---------------------------------------------------------------------------

const RabbitHoleEpisodeContinueContent = () => (
  <Box
    className="min-h-screen"
    style={{
      background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    }}
  >
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Icon icon={Award} size="lg" className="text-yellow-400" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Story Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished "The Moth in the Machine" — Story 1 of 3 in this episode.
          </Typography>
        </VStack>

        <Divider className="border-white/10" />

        {/* Episode continue: next story in same episode */}
        <StoryRabbitHole
          nextStory={storyLibrary[3]}
          bridges={bridges}
          primarySubjectId="cs"
          primarySubjectName="Computer Science"
          episodeContinue={{
            type: 'story',
            title: 'Print Statement Debugging',
            subtitle: 'Story 2 of 3 in this episode',
            storyId: 'story-1b',
          }}
        />
      </VStack>
    </Container>
  </Box>
);

export const RabbitHoleEpisodeContinue: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: [
        { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
        { label: 'The Debugging Chronicles', event: 'NAV_SERIES' },
        { label: 'S1: Fundamentals', event: 'SEASON_SELECT' },
        { label: 'The Moth in the Machine', isCurrent: true },
      ],
    },
    children: <RabbitHoleEpisodeContinueContent />,
  },
};

// ---------------------------------------------------------------------------
// 15. Rabbit Hole — end of episode, next episode prompt
// ---------------------------------------------------------------------------

const RabbitHoleNextEpisodeContent = () => (
  <Box
    className="min-h-screen"
    style={{
      background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    }}
  >
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Icon icon={Award} size="lg" className="text-yellow-400" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Episode Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished all stories in "The First Bug". Ready for the next episode?
          </Typography>
        </VStack>

        <Divider className="border-white/10" />

        <StoryRabbitHole
          bridges={bridges}
          primarySubjectId="cs"
          primarySubjectName="Computer Science"
          episodeContinue={{
            type: 'episode',
            title: 'Off-by-One',
            subtitle: 'Season 1, Episode 2',
            storyId: 'story-2a',
          }}
        />
      </VStack>
    </Container>
  </Box>
);

export const RabbitHoleNextEpisode: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: [
        { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
        { label: 'The Debugging Chronicles', event: 'NAV_SERIES' },
        { label: 'S1: Fundamentals', event: 'SEASON_SELECT' },
        { label: 'The Debugger', isCurrent: true },
      ],
    },
    children: <RabbitHoleNextEpisodeContent />,
  },
};

// ---------------------------------------------------------------------------
// 16. Rabbit Hole — series complete celebration
// ---------------------------------------------------------------------------

const RabbitHoleSeriesCompleteContent = () => (
  <Box
    className="min-h-screen"
    style={{
      background: 'linear-gradient(to bottom, #0f3460 0%, #1a1a2e 50%, #16213e 100%)',
    }}
  >
    <Container size="md" padding="sm" className="py-12">
      <VStack gap="xl">
        <VStack gap="sm" align="center">
          <Icon icon={Award} size="lg" className="text-yellow-400" />
          <Typography variant="h2" weight="bold" className="text-white text-center">
            Story Complete!
          </Typography>
          <Typography variant="body" className="text-white/70 text-center max-w-lg">
            You finished "Profiling Memory" — the final story in The Debugging Chronicles.
          </Typography>
        </VStack>

        <Divider className="border-white/10" />

        <StoryRabbitHole
          bridges={bridges}
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

export const RabbitHoleSeriesComplete: Story = {
  args: {
    entity: {
      activeRoute: 'story',
      user,
      breadcrumbs: [
        { label: 'Stories', icon: Library, event: 'NAV_STORIES' },
        { label: 'The Debugging Chronicles', event: 'NAV_SERIES' },
        { label: 'S2: Concurrency', event: 'SEASON_SELECT' },
        { label: 'Profiling Memory', isCurrent: true },
      ],
    },
    children: <RabbitHoleSeriesCompleteContent />,
  },
};
