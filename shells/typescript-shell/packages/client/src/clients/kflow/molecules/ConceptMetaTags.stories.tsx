import type { Meta, StoryObj } from '@storybook/react';
import { ConceptMetaTags } from './ConceptMetaTags';

const meta: Meta<typeof ConceptMetaTags> = {
  title: 'KFlow/Molecules/ConceptMetaTags',
  component: ConceptMetaTags,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConceptMetaTags>;

export const Default: Story = {
  args: {
    layer: 2,
    parents: ['Machine Learning', 'Statistics'],
  },
};

export const WithLayerOnly: Story = {
  args: {
    layer: 3,
    parents: [],
  },
};

export const SeedConcept: Story = {
  args: {
    layer: 0,
    isSeed: true,
    parents: [],
  },
};

export const SeedWithParents: Story = {
  args: {
    layer: 1,
    isSeed: true,
    parents: ['Mathematics'],
  },
};

export const ManyParents: Story = {
  args: {
    layer: 4,
    parents: ['Deep Learning', 'Neural Networks', 'Backpropagation', 'Optimization'],
  },
};

export const ParentsOnly: Story = {
  args: {
    parents: ['Parent Concept 1', 'Parent Concept 2'],
  },
};

export const HighLayer: Story = {
  args: {
    layer: 7,
    parents: ['Advanced Topic'],
  },
};
