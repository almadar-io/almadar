import type { Meta, StoryObj } from '@storybook/react';
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Compass,
  Settings,
} from 'lucide-react';
import { LearnTemplate } from './LearnTemplate';
import type { LearnTemplateEntity } from './LearnTemplate';
import type { AppShellEntity } from './AppShellTemplate';

const meta: Meta<typeof LearnTemplate> = {
  title: 'KFlow/Templates/LearnTemplate',
  component: LearnTemplate,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LearnTemplate>;

const baseShell: AppShellEntity = {
  navigationItems: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'learn', label: 'Learn', icon: BookOpen, href: '/learn', active: true },
    { id: 'library', label: 'Library', icon: Library, href: '/library' },
    { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ],
  user: {
    name: 'Sara Al-Rashid',
    email: 'sara@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara',
  },
  activeRoute: '/learn',
  theme: 'light',
};

const defaultEntity: LearnTemplateEntity = {
  shell: baseShell,
  learningPaths: [
    {
      id: 'path-ml',
      graphId: 'graph-ml-fundamentals',
      name: 'Machine Learning Fundamentals',
      seedConcept: 'Supervised Learning',
      conceptCount: 24,
      levelCount: 5,
      description: 'From linear regression to neural networks, covering core ML algorithms and evaluation techniques.',
    },
    {
      id: 'path-websec',
      graphId: 'graph-web-security',
      name: 'Web Security',
      seedConcept: 'OWASP Top 10',
      conceptCount: 18,
      levelCount: 4,
      description: 'Cross-site scripting, SQL injection, authentication flaws, and how to defend against them.',
    },
    {
      id: 'path-quantum',
      graphId: 'graph-quantum-computing',
      name: 'Quantum Computing Primer',
      seedConcept: 'Qubits and Superposition',
      conceptCount: 14,
      levelCount: 3,
      description: 'Quantum gates, entanglement, and the basics of quantum algorithms like Grover search.',
    },
    {
      id: 'path-distributed',
      graphId: 'graph-distributed-systems',
      name: 'Distributed Systems',
      seedConcept: 'CAP Theorem',
      conceptCount: 20,
      levelCount: 4,
      description: 'Consensus protocols, replication strategies, and fault tolerance in modern distributed architectures.',
    },
  ],
  loading: false,
};

export const Default: Story = {
  args: { entity: defaultEntity },
};

export const EmptyState: Story = {
  args: {
    entity: {
      shell: baseShell,
      learningPaths: [],
      loading: false,
    },
  },
};

export const Loading: Story = {
  args: {
    entity: {
      shell: baseShell,
      learningPaths: [],
      loading: true,
    },
  },
};

export const WithError: Story = {
  args: {
    entity: {
      shell: baseShell,
      learningPaths: [],
      loading: false,
      error: 'Failed to load learning paths. Please check your connection and try again.',
    },
  },
};

export const SinglePath: Story = {
  args: {
    entity: {
      shell: baseShell,
      learningPaths: [
        {
          id: 'path-compiler',
          graphId: 'graph-compiler-design',
          name: 'Compiler Design',
          seedConcept: 'Lexical Analysis',
          conceptCount: 16,
          levelCount: 4,
          description: 'Tokenizers, parsers, AST construction, and code generation from first principles.',
        },
      ],
      loading: false,
    },
  },
};
