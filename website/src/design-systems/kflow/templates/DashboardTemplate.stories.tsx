import type { Meta, StoryObj } from '@storybook/react';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Settings,
  Trophy,
  TrendingUp,
  Target,
  Flame,
  Plus,
  Search,
  Star,
  Clock,
  CheckCircle,
  Bookmark,
} from 'lucide-react';
import { DashboardTemplate } from './DashboardTemplate';
import type { DashboardTemplateEntity } from './DashboardTemplate';
import type { AppShellEntity } from './AppShellTemplate';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'KFlow/Templates/DashboardTemplate',
  component: DashboardTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

const baseShell: AppShellEntity = {
  navigationItems: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: true },
    { id: 'stories', label: 'Stories', icon: BookOpen, href: '/stories' },
    { id: 'library', label: 'Library', icon: Library, href: '/library' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, href: '/achievements' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ],
  user: {
    name: 'Sara Al-Rashid',
    email: 'sara@example.com',
  },
  activeRoute: '/dashboard',
  theme: 'light',
};

const defaultEntity: DashboardTemplateEntity = {
  shell: baseShell,
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
      description: 'From forces and motion to energy conservation and momentum.',
    },
    {
      id: 'path-crypto',
      graphId: 'graph-crypto-intro',
      name: 'Cryptography Basics',
      seedConcept: 'Symmetric Encryption',
      conceptCount: 12,
      levelCount: 3,
      description: 'Ciphers, hashing, and public-key cryptography explained through real exploits.',
    },
    {
      id: 'path-ecology',
      graphId: 'graph-ecology-web',
      name: 'Ecosystem Dynamics',
      seedConcept: 'Food Webs',
      conceptCount: 15,
      levelCount: 3,
      description: 'How energy flows through ecosystems and what happens when links break.',
    },
  ],
  quickActions: [
    { id: 'new-path', label: 'Create Path', icon: Plus, description: 'Start a new learning path' },
    { id: 'explore', label: 'Explore Stories', icon: Search, description: 'Browse the story catalog' },
    { id: 'favorites', label: 'Favorites', icon: Star, description: 'View saved stories' },
  ],
  recentActivity: [
    { id: 'act-1', type: 'lesson', title: 'Completed "Gravity Wells" in Physics Fundamentals', timestamp: '2 hours ago', icon: CheckCircle },
    { id: 'act-2', type: 'story', title: 'Started "The Password That Wasn\'t"', timestamp: '5 hours ago', icon: BookOpen },
    { id: 'act-3', type: 'bookmark', title: 'Bookmarked "The Prisoner\'s Choice"', timestamp: 'Yesterday', icon: Bookmark },
  ],
};

export const Default: Story = {
  args: { entity: defaultEntity },
};

export const EmptyState: Story = {
  args: {
    entity: {
      shell: baseShell,
      welcomeName: 'Sara',
      stats: [],
      jumpBackInStories: [],
      learningPaths: [],
      quickActions: [],
      recentActivity: [],
    },
  },
};

export const WithAchievements: Story = {
  args: {
    entity: {
      ...defaultEntity,
      achievements: [
        { id: 'ach-1', title: 'First Story Completed', earnedAt: '2026-01-15' },
        { id: 'ach-2', title: '7-Day Streak', earnedAt: '2026-02-01' },
        { id: 'ach-3', title: 'Path Pioneer', earnedAt: '2026-02-20' },
        { id: 'ach-4', title: 'Knowledge Explorer', earnedAt: '2026-02-28' },
      ],
    },
  },
};

export const NewUser: Story = {
  args: {
    entity: {
      shell: {
        ...baseShell,
        user: {
          name: 'New Learner',
          email: 'newlearner@example.com',
        },
      },
      welcomeName: 'New Learner',
      stats: [
        { label: 'Learning Paths', value: 0, icon: TrendingUp, trend: 'flat' },
        { label: 'Concepts Mastered', value: 0, icon: BookOpen, trend: 'flat' },
        { label: 'Lessons Completed', value: 0, icon: Target, trend: 'flat' },
        { label: 'Day Streak', value: 1, icon: Flame, trend: 'up' },
      ],
      jumpBackInStories: [],
      learningPaths: [],
      quickActions: [
        { id: 'new-path', label: 'Create Path', icon: Plus, description: 'Start a new learning path' },
        { id: 'explore', label: 'Explore Stories', icon: Search, description: 'Browse the story catalog' },
      ],
      recentActivity: [],
    },
  },
};
