import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayerNavigator } from './LayerNavigator';

const meta: Meta<typeof LayerNavigator> = {
  title: 'KFlow/Molecules/LayerNavigator',
  component: LayerNavigator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LayerNavigator>;

const sampleLayers = [
  { number: 0, name: 'Foundations', conceptCount: 5, completed: true },
  { number: 1, name: 'Basics', conceptCount: 8, completed: true },
  { number: 2, name: 'Intermediate', conceptCount: 12, completed: false },
  { number: 3, name: 'Advanced', conceptCount: 7, completed: false },
  { number: 4, name: 'Expert', conceptCount: 4, completed: false },
];

export const Default: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 2,
  },
};

export const FirstLayer: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 0,
  },
};

export const LastLayer: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 4,
  },
};

export const WithNames: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 2,
    showNames: true,
  },
};

export const WithCounts: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 2,
    showCounts: true,
  },
};

export const WithNamesAndCounts: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 1,
    showNames: true,
    showCounts: true,
  },
};

export const Compact: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 2,
    compact: true,
  },
};

export const CompactWithName: Story = {
  args: {
    layers: sampleLayers,
    currentLayer: 2,
    compact: true,
    showNames: true,
  },
};

export const FewLayers: Story = {
  args: {
    layers: [
      { number: 0, name: 'Introduction', completed: true },
      { number: 1, name: 'Core Concepts', completed: false },
    ],
    currentLayer: 1,
    showNames: true,
  },
};

export const ManyLayers: Story = {
  args: {
    layers: Array.from({ length: 10 }, (_, i) => ({
      number: i,
      name: `Layer ${i}`,
      conceptCount: Math.floor(Math.random() * 15) + 3,
      completed: i < 4,
    })),
    currentLayer: 4,
    showCounts: true,
  },
};
