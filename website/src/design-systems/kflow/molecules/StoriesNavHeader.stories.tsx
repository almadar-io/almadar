import type { Meta, StoryObj } from '@storybook/react';
import { StoriesNavHeader } from './StoriesNavHeader';

const meta: Meta<typeof StoriesNavHeader> = {
  title: 'KFlow/Molecules/StoriesNavHeader',
  component: StoriesNavHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoriesNavHeader>;

export const CatalogActive: Story = {
  args: {
    activeRoute: 'catalog',
    user: { name: 'Osamah', avatar: undefined },
  },
};

export const ExploreActive: Story = {
  args: {
    activeRoute: 'explore',
    user: { name: 'Osamah' },
  },
};

export const StoryActive: Story = {
  args: {
    activeRoute: 'story',
    user: { name: 'Osamah' },
  },
};

export const SignedOut: Story = {
  args: {
    activeRoute: 'catalog',
  },
};
