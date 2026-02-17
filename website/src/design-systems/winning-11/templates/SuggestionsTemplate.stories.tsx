import type { Meta, StoryObj } from "@storybook/react";
import { SuggestionsTemplate, type SuggestionData } from "./SuggestionsTemplate";

const mockSuggestions: SuggestionData[] = [
  {
    id: "sug-1",
    suggestedUserId: "user-10",
    suggestedUserName: "Jennifer Martinez",
    suggestedUserCategory: "Technology",
    compatibilityScore: 92,
    reason: "High psychological compatibility and shared interests in AI/ML. Both active in tech community events.",
    mutualConnections: 5,
    sharedInterests: ["Machine Learning", "Startups", "Product Management"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "sug-2",
    suggestedUserId: "user-11",
    suggestedUserName: "Robert Chang",
    suggestedUserCategory: "Finance",
    compatibilityScore: 78,
    reason: "Complementary skills in finance and technology. Potential mentorship opportunity.",
    mutualConnections: 3,
    sharedInterests: ["Fintech", "Investment"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "sug-3",
    suggestedUserId: "user-12",
    suggestedUserName: "Amanda Foster",
    suggestedUserCategory: "Design",
    compatibilityScore: 85,
    reason: "Strong collaboration potential based on communication style alignment.",
    mutualConnections: 8,
    sharedInterests: ["UX Design", "Design Systems", "Accessibility"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "sug-4",
    suggestedUserId: "user-13",
    suggestedUserName: "Thomas Wright",
    suggestedUserCategory: "Engineering",
    compatibilityScore: 65,
    reason: "Shared professional background and similar career trajectory.",
    mutualConnections: 2,
    sharedInterests: ["Backend Development"],
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "sug-5",
    suggestedUserId: "user-14",
    suggestedUserName: "Michelle Lee",
    suggestedUserCategory: "Marketing",
    compatibilityScore: 45,
    reason: "Potential for cross-functional collaboration opportunities.",
    mutualConnections: 1,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
  {
    id: "sug-6",
    suggestedUserId: "user-15",
    suggestedUserName: "Kevin Brooks",
    suggestedUserCategory: "Sales",
    compatibilityScore: 88,
    reason: "Excellent trust score match and high reliability ratings from mutual connections.",
    mutualConnections: 6,
    sharedInterests: ["B2B", "Enterprise", "Partnerships"],
    status: "accepted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
];

const meta: Meta<typeof SuggestionsTemplate> = {
  title: "Clients/Winning-11/Templates/SuggestionsTemplate",
  component: SuggestionsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockSuggestions,
  },
};

export const HighCompatibility: Story = {
  args: {
    entity: mockSuggestions.filter((s) => s.compatibilityScore >= 80),
  },
};

export const ModerateCompatibility: Story = {
  args: {
    entity: mockSuggestions.filter(
      (s) => s.compatibilityScore >= 50 && s.compatibilityScore < 80
    ),
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
    isLoading: false,
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to generate suggestions"),
  },
};

export const SingleSuggestion: Story = {
  args: {
    entity: [mockSuggestions[0]],
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockSuggestions,
    showHeader: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockSuggestions,
    title: "Recommended Connections",
    subtitle: "People you should connect with",
  },
};
