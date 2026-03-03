import type { Meta, StoryObj } from "@storybook/react";
import {
  TeamMembersBoard,
  type TeamMemberData,
} from "./TeamMembersBoard";

const mockMembers: TeamMemberData[] = [
  {
    id: "tmem-1",
    teamId: "team-1",
    userId: "user-301",
    userName: "Sarah Chen",
    userEmail: "sarah.chen@example.com",
    role: "leader",
    status: "active",
    trustScore: 95,
    contributionScore: 88,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "tmem-2",
    teamId: "team-1",
    userId: "user-302",
    userName: "Marcus Johnson",
    userEmail: "marcus.j@example.com",
    role: "member",
    status: "active",
    trustScore: 82,
    contributionScore: 75,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "tmem-3",
    teamId: "team-1",
    userId: "user-303",
    userName: "Aisha Patel",
    userEmail: "aisha.p@example.com",
    role: "member",
    status: "active",
    trustScore: 78,
    contributionScore: 92,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "tmem-4",
    teamId: "team-1",
    userId: "user-304",
    userName: "Tom Wilson",
    userEmail: "tom.w@example.com",
    role: "observer",
    status: "active",
    trustScore: 60,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "tmem-5",
    teamId: "team-1",
    userId: "user-305",
    userEmail: "new.member@example.com",
    role: "member",
    status: "pending",
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const meta: Meta<typeof TeamMembersBoard> = {
  title: "Clients/Winning-11/Organisms/TeamMembersBoard",
  component: TeamMembersBoard,
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
    entity: mockMembers,
    teamName: "Regenerative Farming Initiative",
    teamId: "team-1",
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    teamName: "Regenerative Farming Initiative",
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
    teamName: "New Project Team",
    teamId: "team-2",
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load team members"),
  },
};

export const WithoutBackButton: Story = {
  args: {
    entity: mockMembers,
    teamName: "Regenerative Farming Initiative",
    showBack: false,
  },
};

export const WithoutSearch: Story = {
  args: {
    entity: mockMembers,
    teamName: "Regenerative Farming Initiative",
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockMembers,
    title: "Department Members",
  },
};

export const LeadersOnly: Story = {
  args: {
    entity: mockMembers.filter((m) => m.role === "leader"),
    teamName: "Regenerative Farming Initiative",
  },
};
