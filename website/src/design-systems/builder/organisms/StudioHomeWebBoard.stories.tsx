import type { Meta, StoryObj } from '@storybook/react';
import { StudioHomeWebBoard } from './StudioHomeWebBoard';
import type { Project, StudioHomeWebEntity } from './StudioHomeWebBoard';

const meta: Meta<typeof StudioHomeWebBoard> = {
  title: 'Builder/Organisms/StudioHomeWebBoard',
  component: StudioHomeWebBoard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof StudioHomeWebBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const sampleProjects: Project[] = [
  {
    id: 'p1',
    name: 'TaskManager',
    description: 'A project management tool with tasks, boards, and team collaboration.',
    updatedAt: now - 3_600_000,
    createdAt: now - 86_400_000 * 30,
    version: 3,
    stats: { states: 8, events: 12, pages: 4, entities: 3 },
    domain: { category: 'Productivity', subDomain: 'Project Management' },
    hasValidationErrors: false,
  },
  {
    id: 'p2',
    name: 'E-Commerce Store',
    description: 'Full checkout flow with cart, payment, and order tracking.',
    updatedAt: now - 86_400_000,
    createdAt: now - 86_400_000 * 60,
    version: 7,
    stats: { states: 15, events: 24, pages: 8, entities: 6 },
    domain: { category: 'Commerce' },
    hasValidationErrors: true,
  },
  {
    id: 'p3',
    name: 'CRM Dashboard',
    description: 'Customer relationship management with leads, deals, and contacts.',
    updatedAt: now - 86_400_000 * 3,
    createdAt: now - 86_400_000 * 90,
    version: 12,
    stats: { states: 10, events: 18, pages: 5, entities: 4 },
    domain: { category: 'Business', subDomain: 'Sales' },
    hasValidationErrors: false,
  },
];

const defaultEntity: StudioHomeWebEntity = {
  projects: sampleProjects,
  searchQuery: '',
  sortBy: 'updated',
};

const defaultEvents = {
  createProjectEvent: 'CREATE_PROJECT',
  openProjectEvent: 'OPEN_PROJECT',
  deleteProjectEvent: 'DELETE_PROJECT',
  previewProjectEvent: 'PREVIEW_PROJECT',
  searchEvent: 'SEARCH',
  sortEvent: 'SORT',
  importEvent: 'IMPORT',
};

// =============================================================================
// Stories
// =============================================================================

/** Default home view with projects */
export const Default: Story = {
  args: {
    entity: defaultEntity,
    ...defaultEvents,
  },
};

/** Empty state with no projects */
export const EmptyState: Story = {
  args: {
    entity: { projects: [] },
    ...defaultEvents,
  },
};

/** Loading state */
export const Loading: Story = {
  args: {
    entity: { projects: [] },
    isLoading: true,
    ...defaultEvents,
  },
};

/** Error state */
export const ErrorState: Story = {
  args: {
    entity: { projects: [] },
    error: 'Failed to load projects. Please check your network connection and try again.',
    ...defaultEvents,
  },
};

/** With a selected project */
export const WithSelection: Story = {
  args: {
    entity: { ...defaultEntity, selectedProject: sampleProjects[0] },
    ...defaultEvents,
  },
};
