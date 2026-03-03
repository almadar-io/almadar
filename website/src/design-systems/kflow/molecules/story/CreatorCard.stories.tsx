import type { Meta, StoryObj } from '@storybook/react';
import { CreatorCard } from './CreatorCard';
import { mockCreator } from './__mocks__/seriesMockData';

const meta: Meta<typeof CreatorCard> = {
  title: 'KFlow/Molecules/Story/CreatorCard',
  component: CreatorCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreatorCard>;

export const Default: Story = {
  args: {
    creator: {
      ...mockCreator,
      bio: 'Computer scientist, educator, and debugging enthusiast. Making complex topics accessible through storytelling.',
      seriesCount: 3,
    },
  },
};

export const WithoutBio: Story = {
  args: {
    creator: {
      ...mockCreator,
      seriesCount: 3,
    },
  },
};

export const Minimal: Story = {
  args: {
    creator: {
      uid: 'creator-minimal',
      displayName: 'New Creator',
    },
  },
};
