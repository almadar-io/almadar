import type { Meta, StoryObj } from "@storybook/react";
import { InvitesTemplate, type InviteData } from "./InvitesTemplate";

const mockInvites: InviteData[] = [
  {
    id: "inv-1",
    email: "john.doe@example.com",
    code: "TRUST2024A",
    status: "pending",
    invitedById: "user-1",
    invitedByName: "Alex Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "inv-2",
    email: "jane.smith@example.com",
    code: "TRUST2024B",
    status: "sent",
    invitedById: "user-1",
    invitedByName: "Alex Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "inv-3",
    email: "bob.wilson@example.com",
    code: "TRUST2024C",
    status: "redeemed",
    invitedById: "user-2",
    invitedByName: "Sarah Chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    redeemedByUserId: "user-5",
  },
  {
    id: "inv-4",
    email: "alice.brown@example.com",
    code: "TRUST2024D",
    status: "expired",
    invitedById: "user-1",
    invitedByName: "Alex Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23).toISOString(),
  },
  {
    id: "inv-5",
    email: "charlie.davis@example.com",
    code: "TRUST2024E",
    status: "revoked",
    invitedById: "user-3",
    invitedByName: "Mike Rodriguez",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: "inv-6",
    email: "diana.lee@example.com",
    code: "TRUST2024F",
    status: "sent",
    invitedById: "user-1",
    invitedByName: "Alex Thompson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

const meta: Meta<typeof InvitesTemplate> = {
  title: "Clients/Winning-11/Templates/InvitesTemplate",
  component: InvitesTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockInvites,
  },
};

export const PendingOnly: Story = {
  args: {
    entity: mockInvites.filter(
      (i) => i.status === "pending" || i.status === "sent"
    ),
  },
};

export const RedeemedOnly: Story = {
  args: {
    entity: mockInvites.filter((i) => i.status === "redeemed"),
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
    error: new Error("Failed to load invitations"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockInvites,
    showHeader: false,
  },
};

export const NoSearch: Story = {
  args: {
    entity: mockInvites,
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockInvites,
    title: "Platform Invitations",
    subtitle: "Invite trusted individuals to join",
  },
};
