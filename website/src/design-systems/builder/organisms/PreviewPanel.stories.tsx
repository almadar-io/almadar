import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PreviewPanel } from './PreviewPanel';
import { Box, Typography, VStack, HStack } from '@almadar/ui';

const meta: Meta<typeof PreviewPanel> = {
  title: 'Organisms/PreviewPanel',
  component: PreviewPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PreviewPanel>;

/** Fake app content to simulate the runtime slot */
const FakeAppContent = () => (
  <VStack gap="md" className="p-6 h-full" style={{ backgroundColor: 'var(--color-background)' }}>
    <HStack align="center" justify="between">
      <Typography variant="h3">Task Manager</Typography>
      <Box
        className="px-3 py-1 rounded-full text-sm"
        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
      >
        + New Task
      </Box>
    </HStack>
    <Box
      className="rounded-lg border p-4 flex-1"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <VStack gap="sm">
        {['Design homepage', 'Fix login bug', 'Write tests', 'Deploy v2'].map((task, i) => (
          <HStack
            key={i}
            align="center"
            justify="between"
            className="p-3 rounded-lg"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <Typography variant="body2">{task}</Typography>
            <Box
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: i === 0 ? 'var(--color-success)' : 'var(--color-muted)',
                color: i === 0 ? 'white' : 'var(--color-foreground)',
              }}
            >
              {i === 0 ? 'Done' : i === 1 ? 'In Progress' : 'Todo'}
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  </VStack>
);

export const Default: Story = {
  args: {
    entity: {
      appName: 'Task Manager',
      inspectMode: false,
      currentPageName: 'TasksPage',
      pageNames: ['TasksPage', 'SettingsPage', 'DashboardPage'],
      isExecutingEvent: false,
      previewTheme: 'wireframe',
      previewMode: 'light',
    },
    runtimeSlot: <FakeAppContent />,
  },
  decorators: [
    (Story) => (
      <Box className="h-screen">
        <Story />
      </Box>
    ),
  ],
};

export const InspectModeActive: Story = {
  args: {
    ...Default.args,
    entity: {
      ...Default.args!.entity!,
      inspectMode: true,
    },
  },
  decorators: Default.decorators,
};

export const ExecutingEvent: Story = {
  args: {
    ...Default.args,
    entity: {
      ...Default.args!.entity!,
      isExecutingEvent: true,
    },
  },
  decorators: Default.decorators,
};

export const SinglePage: Story = {
  args: {
    ...Default.args,
    entity: {
      ...Default.args!.entity!,
      pageNames: ['TasksPage'],
      currentPageName: 'TasksPage',
    },
  },
  decorators: Default.decorators,
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  decorators: Default.decorators,
};
