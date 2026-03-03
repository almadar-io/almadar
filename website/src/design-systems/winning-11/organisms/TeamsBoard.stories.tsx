import type { Meta, StoryObj } from "@storybook/react";
import { TeamsBoard, type TeamData } from "./TeamsBoard";

const mockTeams: TeamData[] = [
  {
    id: "team-1",
    name: "Product Engineering",
    description: "Core product development team responsible for platform features and infrastructure.",
    type: "department",
    status: "active",
    leaderId: "user-0012",
    leaderName: "Sarah Chen",
    memberCount: 8,
    maxMembers: 12,
    averageTrustScore: 82,
    cohesionScore: 76,
    createdAt: "2025-06-15T10:00:00Z",
    tags: ["engineering", "product", "core"],
  },
  {
    id: "team-2",
    name: "Q1 Launch Campaign",
    description: "Cross-functional team for the Q1 product launch initiative.",
    type: "cross-functional",
    status: "active",
    leaderId: "user-0034",
    leaderName: "Marcus Rivera",
    memberCount: 5,
    maxMembers: 8,
    averageTrustScore: 71,
    cohesionScore: 68,
    createdAt: "2025-11-01T08:30:00Z",
    tags: ["launch", "marketing", "cross-team"],
  },
  {
    id: "team-3",
    name: "Data Analytics",
    description: "Team focused on data insights, reporting, and ML pipelines.",
    type: "project",
    status: "active",
    leaderId: "user-0056",
    leaderName: "Aiko Tanaka",
    memberCount: 4,
    maxMembers: 6,
    averageTrustScore: 88,
    cohesionScore: 91,
    createdAt: "2025-09-20T14:00:00Z",
    tags: ["data", "analytics"],
  },
  {
    id: "team-4",
    name: "Onboarding Sprint",
    description: "Temporary team for improving user onboarding flow.",
    type: "temporary",
    status: "inactive",
    leaderId: "user-0078",
    memberCount: 3,
    createdAt: "2026-01-10T09:00:00Z",
  },
];

const meta: Meta<typeof TeamsBoard> = {
  title: "Clients/Winning-11/Organisms/TeamsBoard",
  component: TeamsBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof TeamsBoard>;

export const Default: Story = {
  args: {
    entity: mockTeams,
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
    error: new Error("Failed to load teams"),
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockTeams,
    title: "My Teams",
    subtitle: "View and manage all your collaborative teams",
  },
};

export const NoHeaderNoSearch: Story = {
  args: {
    entity: mockTeams,
    showHeader: false,
    showSearch: false,
  },
};
