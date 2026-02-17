import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherWidget } from './WeatherWidget';

const meta: Meta<typeof WeatherWidget> = {
  title: 'Clients/Winning-11/Molecules/WeatherWidget',
  component: WeatherWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    condition: {
      control: 'select',
      options: ['sunny', 'cloudy', 'rainy', 'stormy'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'stable'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sunny: Story = {
  args: {
    condition: 'sunny',
  },
};

export const Cloudy: Story = {
  args: {
    condition: 'cloudy',
    forecast: 'Some uncertainty in produce prices this week',
  },
};

export const Rainy: Story = {
  args: {
    condition: 'rainy',
    forecast: 'Market slowdown expected - nurture existing partners',
  },
};

export const Stormy: Story = {
  args: {
    condition: 'stormy',
    forecast: 'Significant market volatility - caution advised',
  },
};

export const WithTrend: Story = {
  args: {
    condition: 'sunny',
    trend: 'up',
    trendValue: 12,
    forecast: 'Demand for organic produce rising steadily',
  },
};

export const DownTrend: Story = {
  args: {
    condition: 'rainy',
    trend: 'down',
    trendValue: 5,
    forecast: 'Seasonal decrease in activity',
  },
};

export const StableTrend: Story = {
  args: {
    condition: 'cloudy',
    trend: 'stable',
    trendValue: 0,
    forecast: 'Market holding steady',
  },
};

export const Small: Story = {
  args: {
    condition: 'sunny',
    size: 'sm',
    trend: 'up',
    trendValue: 8,
  },
};

export const Large: Story = {
  args: {
    condition: 'sunny',
    size: 'lg',
    forecast: 'Perfect conditions for expanding your network',
    trend: 'up',
    trendValue: 15,
  },
};

export const Clickable: Story = {
  args: {
    condition: 'sunny',
    forecast: 'Click for detailed market analysis',
    event: 'VIEW_FORECAST',
  },
};

export const AllConditions: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-3">
      <WeatherWidget condition="sunny" trend="up" trendValue={12} />
      <WeatherWidget condition="cloudy" trend="stable" trendValue={0} />
      <WeatherWidget condition="rainy" trend="down" trendValue={5} />
      <WeatherWidget condition="stormy" trend="down" trendValue={18} />
    </div>
  ),
};
