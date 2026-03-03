import type { Meta, StoryObj } from "@storybook/react";
import {
  TrustIntelligenceBoard,
  type TrustIntelligenceEntity,
  type TrustScoreData,
} from "./TrustIntelligenceBoard";

const mockTopPerformers: TrustScoreData[] = [
  {
    id: "ts-1",
    userId: "user-0012",
    overallScore: 95,
    reliabilityScore: 97,
    consistencyScore: 92,
    communicationScore: 96,
    trend: "up",
    rank: 1,
    totalUsers: 150,
  },
  {
    id: "ts-2",
    userId: "user-0034",
    overallScore: 91,
    reliabilityScore: 89,
    consistencyScore: 94,
    communicationScore: 90,
    trend: "stable",
    rank: 2,
    totalUsers: 150,
  },
  {
    id: "ts-3",
    userId: "user-0056",
    overallScore: 88,
    reliabilityScore: 85,
    consistencyScore: 90,
    communicationScore: 89,
    trend: "up",
    rank: 3,
    totalUsers: 150,
  },
];

const mockEntity: TrustIntelligenceEntity = {
  userScore: {
    id: "ts-current",
    userId: "user-0001",
    overallScore: 78,
    reliabilityScore: 82,
    consistencyScore: 75,
    communicationScore: 77,
    trend: "up",
    rank: 12,
    totalUsers: 150,
  },
  networkAverage: 65,
  topPerformers: mockTopPerformers,
  recentChanges: [
    { date: "Feb 18", change: 3 },
    { date: "Feb 17", change: -1 },
    { date: "Feb 16", change: 5 },
    { date: "Feb 15", change: 2 },
  ],
};

const meta: Meta<typeof TrustIntelligenceBoard> = {
  title: "Clients/Winning-11/Organisms/TrustIntelligenceBoard",
  component: TrustIntelligenceBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof TrustIntelligenceBoard>;

export const Default: Story = {
  args: {
    entity: mockEntity,
    refreshEvent: "REFRESH",
    calculateEvent: "CALCULATE",
    viewUserEvent: "VIEW_USER",
    viewDetailsEvent: "VIEW_DETAILS",
  },
};

export const Loading: Story = {
  args: {
    entity: undefined,
    isLoading: true,
    refreshEvent: "REFRESH",
    calculateEvent: "CALCULATE",
    viewUserEvent: "VIEW_USER",
    viewDetailsEvent: "VIEW_DETAILS",
  },
};

export const Empty: Story = {
  args: {
    entity: {},
    refreshEvent: "REFRESH",
    calculateEvent: "CALCULATE",
    viewUserEvent: "VIEW_USER",
    viewDetailsEvent: "VIEW_DETAILS",
  },
};

export const ErrorState: Story = {
  args: {
    entity: undefined,
    error: new Error("Failed to calculate trust metrics"),
    refreshEvent: "REFRESH",
    calculateEvent: "CALCULATE",
    viewUserEvent: "VIEW_USER",
    viewDetailsEvent: "VIEW_DETAILS",
  },
};

export const LowScore: Story = {
  args: {
    entity: {
      ...mockEntity,
      userScore: {
        id: "ts-low",
        userId: "user-0099",
        overallScore: 32,
        reliabilityScore: 28,
        consistencyScore: 35,
        communicationScore: 33,
        trend: "down",
        rank: 140,
        totalUsers: 150,
      },
    },
    refreshEvent: "REFRESH",
    calculateEvent: "CALCULATE",
    viewUserEvent: "VIEW_USER",
    viewDetailsEvent: "VIEW_DETAILS",
  },
};
