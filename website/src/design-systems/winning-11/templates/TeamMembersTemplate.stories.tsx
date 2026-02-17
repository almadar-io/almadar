import type { Meta, StoryObj } from "@storybook/react";
import { TeamMembersTemplate, type TeamMemberData } from "./TeamMembersTemplate";

const mockMembers: TeamMemberData[] = [
  {
    id: "tm-1",
    teamId: "team-1",
    userId: "user-1",
    userName: "Alex Thompson",
    userEmail: "alex.thompson@example.com",
    role: "leader",
    status: "active",
    trustScore: 92,
    contributionScore: 95,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "tm-2",
    teamId: "team-1",
    userId: "user-2",
    userName: "Sarah Chen",
    userEmail: "sarah.chen@example.com",
    role: "member",
    status: "active",
    trustScore: 88,
    contributionScore: 82,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 150).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "tm-3",
    teamId: "team-1",
    userId: "user-3",
    userName: "Mike Rodriguez",
    userEmail: "mike.r@example.com",
    role: "member",
    status: "active",
    trustScore: 85,
    contributionScore: 78,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "tm-4",
    teamId: "team-1",
    userId: "user-4",
    userName: "Emily Watson",
    userEmail: "emily.watson@example.com",
    role: "member",
    status: "inactive",
    trustScore: 82,
    contributionScore: 65,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "tm-5",
    teamId: "team-1",
    userId: "user-5",
    userName: "David Kim",
    userEmail: "david.kim@example.com",
    role: "member",
    status: "active",
    trustScore: 86,
    contributionScore: 88,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    id: "tm-6",
    teamId: "team-1",
    userId: "user-6",
    userName: "Lisa Park",
    userEmail: "lisa.park@example.com",
    role: "observer",
    status: "active",
    trustScore: 79,
    contributionScore: 45,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "tm-7",
    teamId: "team-1",
    userId: "user-7",
    userName: "James Wilson",
    userEmail: "james.w@example.com",
    role: "member",
    status: "pending",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

const meta: Meta<typeof TeamMembersTemplate> = {
  title: "Clients/Winning-11/Templates/TeamMembersTemplate",
  component: TeamMembersTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1",
  },
};

export const LeadersOnly: Story = {
  args: {
    entity: mockMembers.filter((m) => m.role === "leader"),
    teamName: "Core Platform",
    teamId: "team-1",
  },
};

export const MembersOnly: Story = {
  args: {
    entity: mockMembers.filter((m) => m.role === "member"),
    teamName: "Core Platform",
    teamId: "team-1",
  },
};

export const ObserversOnly: Story = {
  args: {
    entity: mockMembers.filter((m) => m.role === "observer"),
    teamName: "Core Platform",
    teamId: "team-1",
  },
};

export const ActiveOnly: Story = {
  args: {
    entity: mockMembers.filter((m) => m.status === "active"),
    teamName: "Core Platform",
    teamId: "team-1",
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
    teamName: "Core Platform",
  },
};

export const Empty: Story = {
  args: {
    entity: [],
    isLoading: false,
    teamName: "New Team",
    teamId: "team-new",
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load team members"),
    teamName: "Core Platform",
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1",
    showBack: false,
  },
};

export const NoSearch: Story = {
  args: {
    entity: mockMembers,
    teamName: "Core Platform",
    teamId: "team-1",
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockMembers,
    teamId: "team-1",
    title: "Platform Team Members",
  },
};

export const SmallTeam: Story = {
  args: {
    entity: mockMembers.slice(0, 2),
    teamName: "Small Team",
    teamId: "team-small",
  },
};
