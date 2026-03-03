import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileBoard, type UserProfileData } from "./UserProfileBoard";

const mockUser: UserProfileData = {
  id: "user-0012",
  name: "Sarah Chen",
  email: "sarah.chen@example.com",
  status: "active",
  primaryCategory: "Engineering Lead",
  connectionSlots: 20,
  usedSlots: 14,
  isBetaUser: true,
  inviteCode: "WIN11-SC-2025",
  createdAt: "2025-03-10T08:00:00Z",
  lastActiveAt: "2026-02-18T14:30:00Z",
  assessmentId: "assess-0042",
  trustScoreId: "ts-0012",
};

const meta: Meta<typeof UserProfileBoard> = {
  title: "Clients/Winning-11/Organisms/UserProfileBoard",
  component: UserProfileBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof UserProfileBoard>;

export const Default: Story = {
  args: {
    entity: mockUser,
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const Loading: Story = {
  args: {
    entity: undefined,
    isLoading: true,
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const Empty: Story = {
  args: {
    entity: undefined,
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const ErrorState: Story = {
  args: {
    entity: undefined,
    error: new Error("Failed to load user profile"),
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const PendingUser: Story = {
  args: {
    entity: {
      id: "user-0099",
      name: "Jordan Miller",
      email: "jordan.miller@example.com",
      status: "pending",
      primaryCategory: "Product Design",
      connectionSlots: 10,
      usedSlots: 0,
      isBetaUser: false,
      createdAt: "2026-02-15T12:00:00Z",
    },
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const SuspendedUser: Story = {
  args: {
    entity: {
      id: "user-0045",
      name: "Alex Kovalev",
      email: "alex.k@example.com",
      status: "suspended",
      connectionSlots: 10,
      usedSlots: 7,
      createdAt: "2025-08-22T09:00:00Z",
      lastActiveAt: "2026-01-05T11:00:00Z",
    },
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockUser,
    showBack: false,
    editEvent: "EDIT",
    backEvent: "BACK",
    viewConnectionsEvent: "VIEW_CONNECTIONS",
    viewTeamsEvent: "VIEW_TEAMS",
    viewInvitesEvent: "VIEW_INVITES",
  },
};
