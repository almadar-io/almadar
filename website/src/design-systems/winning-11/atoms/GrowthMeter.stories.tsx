import type { Meta, StoryObj } from '@storybook/react-vite';
import { GrowthMeter } from './GrowthMeter';

const meta: Meta<typeof GrowthMeter> = {
  title: 'Clients/Winning-11/Atoms/GrowthMeter',
  component: GrowthMeter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Seedling: Story = {
  args: {
    progress: 15,
    showStageLabel: true,
  },
};

export const Sprouting: Story = {
  args: {
    progress: 35,
    showStageLabel: true,
  },
};

export const Growing: Story = {
  args: {
    progress: 60,
    showStageLabel: true,
  },
};

export const Flourishing: Story = {
  args: {
    progress: 90,
    showStageLabel: true,
  },
};

export const Complete: Story = {
  args: {
    progress: 100,
    showStageLabel: true,
  },
};

export const CustomStages: Story = {
  args: {
    progress: 50,
    stages: ['New', 'Building', 'Established', 'Partner'],
    showStageLabel: true,
  },
};

export const Small: Story = {
  args: {
    progress: 65,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    progress: 75,
    size: 'lg',
  },
};

export const NoAnimation: Story = {
  args: {
    progress: 50,
    animated: false,
  },
};

export const AllStages: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-6">
      <GrowthMeter progress={10} />
      <GrowthMeter progress={35} />
      <GrowthMeter progress={60} />
      <GrowthMeter progress={90} />
    </div>
  ),
};
