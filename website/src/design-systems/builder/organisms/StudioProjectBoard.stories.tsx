import type { Meta, StoryObj } from '@storybook/react';
import { StudioProjectBoard } from './StudioProjectBoard';
import type { ProjectEntity } from './StudioProjectBoard';

const meta: Meta<typeof StudioProjectBoard> = {
  title: 'Builder/Organisms/StudioProjectBoard',
  component: StudioProjectBoard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof StudioProjectBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const baseProject: ProjectEntity = {
  project: {
    id: 'proj-1',
    name: 'TaskManager',
    description: 'A project management tool with tasks and boards.',
    version: '1.2.0',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-17',
    orbitalsCount: 3,
    traitsCount: 5,
    pagesCount: 4,
  },
  mode: 'hq',
  activeTab: 'story',
  validationStatus: 'valid',
  errorCount: 0,
  showAgentPanel: false,
};

const defaultEvents = {
  saveEvent: 'SAVE',
  compileEvent: 'COMPILE',
  deployEvent: 'DEPLOY',
  tabChangeEvent: 'TAB_CHANGE',
  toggleAgentEvent: 'TOGGLE_AGENT',
  toggleInspectorEvent: 'TOGGLE_INSPECTOR',
  modeChangeEvent: 'MODE_CHANGE',
  runTestsEvent: 'RUN_TESTS',
};

// =============================================================================
// Stories
// =============================================================================

/** Default HQ mode with story tab */
export const Default: Story = {
  args: {
    entity: baseProject,
    ...defaultEvents,
  },
};

/** Build mode with schema tab */
export const BuildMode: Story = {
  args: {
    entity: { ...baseProject, mode: 'build', activeTab: 'schema' },
    ...defaultEvents,
  },
};

/** With validation errors */
export const WithErrors: Story = {
  args: {
    entity: { ...baseProject, mode: 'build', activeTab: 'validation', validationStatus: 'invalid', errorCount: 5 },
    ...defaultEvents,
  },
};

/** With agent panel open */
export const WithAgentPanel: Story = {
  args: {
    entity: { ...baseProject, showAgentPanel: true },
    agentPanel: <div style={{ padding: 16, color: 'var(--color-muted-foreground)' }}>Agent panel content here</div>,
    ...defaultEvents,
  },
};

/** Validating state */
export const Validating: Story = {
  args: {
    entity: { ...baseProject, mode: 'build', validationStatus: 'validating' },
    ...defaultEvents,
  },
};
