import type { Meta, StoryObj } from "@storybook/react";
import { TeamDetailTemplate, type TeamDetailData } from "./TeamDetailTemplate";

const mockTeam: TeamDetailData = {
  id: "team-1",
  name: "Core Platform",
  description: "Responsible for the core trust scoring algorithm and platform infrastructure. This team maintains the heart of the Winning-11 platform, ensuring reliability, accuracy, and scalability.",
  type: "department",
  status: "active",
  leaderId: "user-1",
  leaderName: "Alex Thompson",
  memberCount: 8,
  maxMembers: 12,
  averageTrustScore: 85,
  cohesionScore: 88,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  tags: ["Engineering", "Core", "Infrastructure"],
  goals: [
    "Maintain 99.9% platform uptime",
    "Improve trust score calculation speed by 50%",
    "Reduce false positive rate in fraud detection",
    "Implement real-time score updates",
  ],
  members: [
    { id: "tm-1", userId: "user-1", userName: "Alex Thompson", role: "leader", trustScore: 92, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString() },
    { id: "tm-2", userId: "user-2", userName: "Sarah Chen", role: "member", trustScore: 88, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 150).toISOString() },
    { id: "tm-3", userId: "user-3", userName: "Mike Rodriguez", role: "member", trustScore: 85, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString() },
    { id: "tm-4", userId: "user-4", userName: "Emily Watson", role: "member", trustScore: 82, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString() },
    { id: "tm-5", userId: "user-5", userName: "David Kim", role: "member", trustScore: 86, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString() },
    { id: "tm-6", userId: "user-6", userName: "Lisa Park", role: "observer", trustScore: 79, joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
  ],
};

const meta: Meta<typeof TeamDetailTemplate> = {
  title: "Clients/Winning-11/Templates/TeamDetailTemplate",
  component: TeamDetailTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockTeam,
  },
};

export const ProjectTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      type: "project",
      name: "Mobile App Launch",
    },
  },
};

export const CrossFunctionalTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      type: "cross-functional",
      name: "Enterprise Solutions",
    },
  },
};

export const TemporaryTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      type: "temporary",
      name: "Security Task Force",
      maxMembers: 5,
      memberCount: 4,
    },
  },
};

export const InactiveTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      status: "inactive",
    },
  },
};

export const HighCohesion: Story = {
  args: {
    entity: {
      ...mockTeam,
      cohesionScore: 95,
      averageTrustScore: 91,
    },
  },
};

export const LowCohesion: Story = {
  args: {
    entity: {
      ...mockTeam,
      cohesionScore: 45,
      averageTrustScore: 62,
    },
  },
};

export const NoGoals: Story = {
  args: {
    entity: {
      ...mockTeam,
      goals: undefined,
    },
  },
};

export const NoMembers: Story = {
  args: {
    entity: {
      ...mockTeam,
      members: undefined,
      memberCount: 0,
    },
  },
};

export const SmallTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      members: mockTeam.members?.slice(0, 2),
      memberCount: 2,
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
    error: new Error("Failed to load team details"),
  },
};

export const NotFound: Story = {
  args: {
    entity: undefined,
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockTeam,
    showBack: false,
  },
};
