import type { Meta, StoryObj } from "@storybook/react";
import { SuggestionsBoard, type SuggestionData } from "./SuggestionsBoard";

const mockSuggestions: SuggestionData[] = [
  {
    id: "sug-1",
    suggestedUserId: "user-101",
    suggestedUserName: "Elena Vasquez",
    suggestedUserCategory: "Sustainable Agriculture",
    compatibilityScore: 92,
    reason:
      "Both active in regenerative farming communities with overlapping supply chains.",
    mutualConnections: 8,
    sharedInterests: ["Organic Farming", "Soil Health", "Water Conservation"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "sug-2",
    suggestedUserId: "user-102",
    suggestedUserName: "Marcus Thompson",
    suggestedUserCategory: "Agricultural Technology",
    compatibilityScore: 78,
    reason:
      "Develops precision agriculture tools used by several of your connections.",
    mutualConnections: 4,
    sharedInterests: ["AgTech", "Data Analytics"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "sug-3",
    suggestedUserId: "user-103",
    suggestedUserName: "Yuki Tanaka",
    suggestedUserCategory: "Community Leadership",
    compatibilityScore: 65,
    reason:
      "Active community organizer in your region with complementary network reach.",
    mutualConnections: 2,
    sharedInterests: ["Community Building"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "sug-4",
    suggestedUserId: "user-104",
    suggestedUserName: "Amara Diallo",
    compatibilityScore: 45,
    reason: "Emerging leader in a related sector with growth potential.",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "sug-5",
    suggestedUserId: "user-105",
    suggestedUserName: "Oliver Schmidt",
    suggestedUserCategory: "Supply Chain Management",
    compatibilityScore: 85,
    reason:
      "Manages distribution networks that align closely with your operational footprint.",
    mutualConnections: 6,
    sharedInterests: ["Logistics", "Farm-to-Table", "Quality Assurance"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
];

const meta: Meta<typeof SuggestionsBoard> = {
  title: "Clients/Winning-11/Organisms/SuggestionsBoard",
  component: SuggestionsBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockSuggestions,
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load suggestions"),
  },
};

export const HighCompatibility: Story = {
  args: {
    entity: mockSuggestions.filter((s) => s.compatibilityScore >= 80),
  },
};

export const WithoutHeader: Story = {
  args: {
    entity: mockSuggestions,
    showHeader: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockSuggestions,
    title: "Recommended Connections",
    subtitle: "People who match your network profile",
  },
};
