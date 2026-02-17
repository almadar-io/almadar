import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlantCard } from './PlantCard';

const meta: Meta<typeof PlantCard> = {
  title: 'Clients/Winning-11/Molecules/PlantCard',
  component: PlantCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    growthPoints: {
      control: { type: 'range', min: 0, max: 100 },
    },
    healthStatus: {
      control: 'select',
      options: ['thriving', 'healthy', 'declining', 'withering'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Green Valley Farm',
    category: 'Organic Producer',
    growthPoints: 45,
    healthStatus: 'healthy',
  },
};

export const NewRelationship: Story = {
  args: {
    name: 'Sunrise Orchards',
    category: 'Fruit Supplier',
    growthPoints: 15,
    healthStatus: 'healthy',
    visualMetaphor: 'seedling',
  },
};

export const EstablishedPartner: Story = {
  args: {
    name: 'Heritage Grains Co.',
    category: 'Grain Supplier',
    growthPoints: 85,
    healthStatus: 'thriving',
    visualMetaphor: 'flowering',
  },
};

export const NeedsAttention: Story = {
  args: {
    name: 'Mountain Dairy',
    category: 'Dairy Producer',
    growthPoints: 60,
    healthStatus: 'declining',
    missedOutreachCount: 2,
  },
};

export const WithCareNeeds: Story = {
  args: {
    name: 'River Valley Produce',
    category: 'Vegetable Supplier',
    growthPoints: 50,
    healthStatus: 'healthy',
    missedOutreachCount: 1,
  },
};

export const Clickable: Story = {
  args: {
    name: 'Coastal Fisheries',
    category: 'Seafood Supplier',
    growthPoints: 70,
    healthStatus: 'healthy',
    onClick: () => alert('Card clicked!'),
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid w-[600px] grid-cols-2 gap-4">
      <PlantCard
        name="Green Valley Farm"
        category="Organic Producer"
        growthPoints={85}
        healthStatus="thriving"
        visualMetaphor="flowering"
      />
      <PlantCard
        name="Sunrise Orchards"
        category="Fruit Supplier"
        growthPoints={45}
        healthStatus="declining"
        missedOutreachCount={1}
      />
      <PlantCard
        name="Heritage Grains"
        category="Grain Supplier"
        growthPoints={20}
        healthStatus="healthy"
        visualMetaphor="seedling"
      />
      <PlantCard
        name="Mountain Dairy"
        category="Dairy Producer"
        growthPoints={65}
        healthStatus="healthy"
        missedOutreachCount={2}
      />
    </div>
  ),
};
