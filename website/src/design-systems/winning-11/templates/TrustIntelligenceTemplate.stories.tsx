import type { Meta, StoryObj } from "@storybook/react";
import {
  TrustIntelligenceTemplate,
  type TrustScoreData,
} from "./TrustIntelligenceTemplate";

const mockUserScore: TrustScoreData = {
  id: "ts-1",
  userId: "user-1",
  overallScore: 82,
  reliabilityScore: 85,
  consistencyScore: 78,
  communicationScore: 83,
  trend: "up",
  rank: 12,
  totalUsers: 150,
};

const mockTopPerformers: TrustScoreData[] = [
  { id: "ts-2", userId: "user-2", overallScore: 95, trend: "stable" },
  { id: "ts-3", userId: "user-3", overallScore: 92, trend: "up" },
  { id: "ts-4", userId: "user-4", overallScore: 89, trend: "up" },
  { id: "ts-5", userId: "user-5", overallScore: 87, trend: "down" },
  { id: "ts-6", userId: "user-6", overallScore: 85, trend: "stable" },
];

const mockRecentChanges = [
  { date: "Jan 28", change: 3 },
  { date: "Jan 27", change: -1 },
  { date: "Jan 26", change: 5 },
  { date: "Jan 25", change: 2 },
  { date: "Jan 24", change: -2 },
];

const meta: Meta<typeof TrustIntelligenceTemplate> = {
  title: "Clients/Winning-11/Templates/TrustIntelligenceTemplate",
  component: TrustIntelligenceTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: {
      userScore: mockUserScore,
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: mockRecentChanges,
    },
  },
};

export const HighScore: Story = {
  args: {
    entity: {
      userScore: {
        ...mockUserScore,
        overallScore: 95,
        reliabilityScore: 98,
        consistencyScore: 92,
        communicationScore: 95,
        rank: 3,
      },
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: mockRecentChanges,
    },
  },
};

export const LowScore: Story = {
  args: {
    entity: {
      userScore: {
        ...mockUserScore,
        overallScore: 35,
        reliabilityScore: 40,
        consistencyScore: 30,
        communicationScore: 35,
        trend: "down",
        rank: 120,
      },
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: mockRecentChanges,
    },
  },
};

export const TrendingDown: Story = {
  args: {
    entity: {
      userScore: {
        ...mockUserScore,
        trend: "down",
      },
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: [
        { date: "Jan 28", change: -3 },
        { date: "Jan 27", change: -2 },
        { date: "Jan 26", change: -1 },
      ],
    },
  },
};

export const NoUserScore: Story = {
  args: {
    entity: {
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: mockRecentChanges,
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to calculate trust metrics"),
  },
};

export const EmptyTopPerformers: Story = {
  args: {
    entity: {
      userScore: mockUserScore,
      networkAverage: 65,
      topPerformers: [],
      recentChanges: [],
    },
  },
};

export const CustomTitle: Story = {
  args: {
    entity: {
      userScore: mockUserScore,
      networkAverage: 65,
      topPerformers: mockTopPerformers,
      recentChanges: mockRecentChanges,
    },
    title: "Your Trust Dashboard",
  },
};
