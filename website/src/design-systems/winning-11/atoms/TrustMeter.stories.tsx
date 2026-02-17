import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrustMeter } from './TrustMeter';

const meta: Meta<typeof TrustMeter> = {
  title: 'Clients/Winning-11/Atoms/TrustMeter',
  component: TrustMeter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['low', 'medium', 'high', 'verified'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Low: Story = {
  args: {
    level: 'low',
    showLabel: true,
  },
};

export const Medium: Story = {
  args: {
    level: 'medium',
    showLabel: true,
  },
};

export const High: Story = {
  args: {
    level: 'high',
    showLabel: true,
  },
};

export const Verified: Story = {
  args: {
    level: 'verified',
    showLabel: true,
  },
};

export const WithCustomScore: Story = {
  args: {
    level: 'high',
    score: 87,
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    level: 'high',
    size: 'sm',
    showLabel: true,
  },
};

export const Large: Story = {
  args: {
    level: 'verified',
    size: 'lg',
    showLabel: true,
  },
};

export const NoLabel: Story = {
  args: {
    level: 'medium',
    showLabel: false,
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TrustMeter level="low" />
      <TrustMeter level="medium" />
      <TrustMeter level="high" />
      <TrustMeter level="verified" />
    </div>
  ),
};
