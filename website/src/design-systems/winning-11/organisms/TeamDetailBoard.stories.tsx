import type { Meta, StoryObj } from "@storybook/react";
import {
  TeamDetailBoard,
  type TeamDetailData,
  type TeamMemberData,
} from "./TeamDetailBoard";

const mockMembers: TeamMemberData[] = [
  {
    id: "mem-1",
    userId: "user-201",
    userName: "Sarah Chen",
    role: "leader",
    trustScore: 95,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
  },
  {
    id: "mem-2",
    userId: "user-202",
    userName: "Marcus Johnson",
    role: "member",
    trustScore: 82,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
  {
    id: "mem-3",
    userId: "user-203",
    userName: "Aisha Patel",
    role: "member",
    trustScore: 78,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: "mem-4",
    userId: "user-204",
    userName: "Tom Wilson",
    role: "observer",
    trustScore: 60,
    joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

const mockTeam: TeamDetailData = {
  id: "team-1",
  name: "Regenerative Farming Initiative",
  description:
    "A cross-functional team focused on advancing regenerative agriculture practices across the regional network. We collaborate on research, share best practices, and coordinate community outreach programs.",
  type: "cross-functional",
  status: "active",
  leaderId: "user-201",
  leaderName: "Sarah Chen",
  members: mockMembers,
  memberCount: 4,
  maxMembers: 10,
  averageTrustScore: 79,
  cohesionScore: 85,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  tags: ["Regenerative", "Research", "Community"],
  goals: [
    "Onboard 20 new farms to regenerative practices by Q3",
    "Publish quarterly knowledge-sharing reports",
    "Establish 3 regional pilot programs",
    "Achieve 90% member engagement rate",
  ],
};

const meta: Meta<typeof TeamDetailBoard> = {
  title: "Clients/Winning-11/Organisms/TeamDetailBoard",
  component: TeamDetailBoard,
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
    entity: mockTeam,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const Empty: Story = {
  args: {
    entity: undefined,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to load team details"),
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const NoMembers: Story = {
  args: {
    entity: {
      ...mockTeam,
      members: [],
      memberCount: 0,
    },
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const MinimalTeam: Story = {
  args: {
    entity: {
      id: "team-2",
      name: "New Project Team",
      type: "project" as const,
      status: "active" as const,
      leaderId: "user-301",
      leaderName: "Alex Kim",
      memberCount: 1,
      createdAt: new Date().toISOString(),
    },
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const ArchivedTeam: Story = {
  args: {
    entity: {
      ...mockTeam,
      status: "archived" as const,
      type: "temporary" as const,
      name: "Q4 2025 Sprint Team",
    },
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};

export const WithoutBackButton: Story = {
  args: {
    entity: mockTeam,
    showBack: false,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    viewMemberEvent: "VIEW_MEMBER",
    addGoalEvent: "ADD_GOAL",
  },
};
