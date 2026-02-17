import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileTemplate, type UserProfileData } from "./UserProfileTemplate";

const mockUser: UserProfileData = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  status: "active",
  primaryCategory: "Technology",
  connectionSlots: 150,
  usedSlots: 45,
  isBetaUser: true,
  inviteCode: "ALEX2024",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  assessmentId: "assess-123",
  trustScoreId: "ts-456",
};

const meta: Meta<typeof UserProfileTemplate> = {
  title: "Clients/Winning-11/Templates/UserProfileTemplate",
  component: UserProfileTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockUser,
  },
};

export const ActiveUser: Story = {
  args: {
    entity: {
      ...mockUser,
      status: "active",
    },
  },
};

export const PendingUser: Story = {
  args: {
    entity: {
      ...mockUser,
      status: "pending",
      assessmentId: undefined,
      trustScoreId: undefined,
    },
  },
};

export const SuspendedUser: Story = {
  args: {
    entity: {
      ...mockUser,
      status: "suspended",
    },
  },
};

export const BetaUser: Story = {
  args: {
    entity: {
      ...mockUser,
      isBetaUser: true,
    },
  },
};

export const HighConnectionUsage: Story = {
  args: {
    entity: {
      ...mockUser,
      connectionSlots: 150,
      usedSlots: 145,
    },
  },
};

export const NoAssessmentOrTrustScore: Story = {
  args: {
    entity: {
      ...mockUser,
      assessmentId: undefined,
      trustScoreId: undefined,
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
    error: new Error("Failed to load user profile"),
  },
};

export const NotFound: Story = {
  args: {
    entity: undefined,
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockUser,
    showBack: false,
  },
};
