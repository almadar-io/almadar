import type { Meta, StoryObj } from "@storybook/react";
import { TraineeCard, TraineeData } from "./TraineeCard";
import { CreditData } from "../atoms/CreditMeter";

const meta: Meta<typeof TraineeCard> = {
  title: "Blaz-Klemenc/Molecules/TraineeCard",
  component: TraineeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TraineeCard>;

const baseCredits: CreditData = {
  totalCredits: 10,
  remainingCredits: 8,
};

const baseTrainee: TraineeData = {
  id: "trainee-1",
  name: "John Smith",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  role: "trainee",
  credits: baseCredits,
  nextSession: {
    title: "Strength Training",
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
};

export const Default: Story = {
  args: {
    trainee: baseTrainee,
  },
};

export const WithProfileImage: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      profileImage: "https://i.pravatar.cc/150?u=john",
    },
  },
};

export const LowCredits: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Jane Doe",
      email: "jane@example.com",
      credits: {
        totalCredits: 10,
        remainingCredits: 2,
      },
    },
  },
};

export const NoUpcomingSession: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Mike Johnson",
      email: "mike@example.com",
      nextSession: undefined,
    },
  },
};

export const ExpiringCredits: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      credits: {
        totalCredits: 10,
        remainingCredits: 5,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
    },
  },
};

export const Compact: Story = {
  args: {
    trainee: baseTrainee,
    compact: true,
  },
};

export const HideActions: Story = {
  args: {
    trainee: baseTrainee,
    showActions: false,
  },
};

export const NoPhone: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Alex Brown",
      email: "alex@example.com",
      phone: undefined,
    },
  },
};

export const FullCredits: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Chris Green",
      credits: {
        totalCredits: 10,
        remainingCredits: 10,
      },
    },
  },
};

export const ZeroCredits: Story = {
  args: {
    trainee: {
      ...baseTrainee,
      name: "Pat Taylor",
      credits: {
        totalCredits: 10,
        remainingCredits: 0,
      },
    },
  },
};
