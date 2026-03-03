import type { Meta, StoryObj } from "@storybook/react";
import { InvitesBoard, type InviteData } from "./InvitesBoard";

const mockInvites: InviteData[] = [
  {
    id: "inv-1",
    email: "sarah.johnson@agritech.com",
    code: "INV-8X3K-Q9M2",
    status: "pending",
    invitedByName: "Ahmad Al-Rashid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "inv-2",
    email: "marcus.chen@greenfield.co",
    code: "INV-7F2P-L5N8",
    status: "sent",
    invitedByName: "Ahmad Al-Rashid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "inv-3",
    email: "elena.rodriguez@farmcoop.org",
    code: "INV-4D9R-W1T6",
    status: "redeemed",
    invitedByName: "Fatima Hassan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    redeemedByUserId: "user-456",
  },
  {
    id: "inv-4",
    email: "james.okafor@harvest.io",
    code: "INV-6B7Y-H3K9",
    status: "expired",
    invitedByName: "Fatima Hassan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "inv-5",
    email: "priya.sharma@seedbank.net",
    code: "INV-2A5M-Z8P1",
    status: "revoked",
    invitedByName: "Ahmad Al-Rashid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
];

const meta: Meta<typeof InvitesBoard> = {
  title: "Clients/Winning-11/Organisms/InvitesBoard",
  component: InvitesBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    createEvent: "CREATE_INVITE",
    viewEvent: "VIEW_INVITE",
    revokeEvent: "REVOKE_INVITE",
    searchEvent: "SEARCH_INVITE",
    filterEvent: "FILTER_INVITE",
  },
};
export default meta;
type Story = StoryObj<typeof InvitesBoard>;

export const Default: Story = {
  args: {
    entity: mockInvites,
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
    error: new Error("Failed to load invitations"),
  },
};

export const AllPending: Story = {
  args: {
    entity: mockInvites.filter(
      (inv) => inv.status === "pending" || inv.status === "sent",
    ),
  },
};

export const WithCustomTitle: Story = {
  args: {
    entity: mockInvites,
    title: "Team Invitations",
    subtitle: "Manage invitations for your agricultural cooperative",
  },
};
