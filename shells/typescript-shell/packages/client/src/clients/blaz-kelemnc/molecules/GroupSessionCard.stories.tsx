import type { Meta, StoryObj } from "@storybook/react";
import { GroupSessionCard } from "./GroupSessionCard";

const meta: Meta<typeof GroupSessionCard> = {
  title: "Blaz-Klemenc/Molecules/GroupSessionCard",
  component: GroupSessionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GroupSessionCard>;

// Helper for dates
const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export const Default: Story = {
  args: {
    session: {
      id: "gs-1",
      title: "Morning HIIT Class",
      scheduledAt: daysFromNow(2),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 6,
      status: "scheduled",
      isGroupSession: true,
    },
  },
};

export const AlmostFull: Story = {
  args: {
    session: {
      id: "gs-2",
      title: "Power Yoga",
      scheduledAt: daysFromNow(1),
      duration: 75,
      maxParticipants: 10,
      currentParticipants: 9,
      status: "scheduled",
      isGroupSession: true,
    },
  },
};

export const Full: Story = {
  args: {
    session: {
      id: "gs-3",
      title: "Spin Class",
      scheduledAt: daysFromNow(3),
      duration: 45,
      maxParticipants: 10,
      currentParticipants: 10,
      status: "scheduled",
      isGroupSession: true,
    },
  },
};

export const InProgress: Story = {
  args: {
    session: {
      id: "gs-4",
      title: "CrossFit Session",
      scheduledAt: new Date(),
      duration: 60,
      maxParticipants: 12,
      currentParticipants: 8,
      status: "in-progress",
      isGroupSession: true,
    },
  },
};

export const Completed: Story = {
  args: {
    session: {
      id: "gs-5",
      title: "Boxing Fundamentals",
      scheduledAt: daysFromNow(-1),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 8,
      status: "completed",
      isGroupSession: true,
    },
  },
};

export const Cancelled: Story = {
  args: {
    session: {
      id: "gs-6",
      title: "Outdoor Bootcamp",
      scheduledAt: daysFromNow(1),
      duration: 90,
      maxParticipants: 15,
      currentParticipants: 5,
      status: "cancelled",
      isGroupSession: true,
    },
  },
};

export const WithYouTubeLink: Story = {
  args: {
    session: {
      id: "gs-7",
      title: "Recorded Session",
      scheduledAt: daysFromNow(-2),
      duration: 60,
      maxParticipants: 10,
      currentParticipants: 10,
      status: "completed",
      isGroupSession: true,
      youtubeLink: "https://youtube.com/watch?v=abc123",
    },
  },
};

export const LongDuration: Story = {
  args: {
    session: {
      id: "gs-8",
      title: "Marathon Prep Workshop",
      scheduledAt: daysFromNow(5),
      duration: 180,
      maxParticipants: 20,
      currentParticipants: 15,
      status: "scheduled",
      isGroupSession: true,
    },
  },
};

export const Compact: Story = {
  args: {
    session: {
      id: "gs-9",
      title: "Quick Session",
      scheduledAt: daysFromNow(1),
      duration: 30,
      maxParticipants: 8,
      currentParticipants: 4,
      status: "scheduled",
      isGroupSession: true,
    },
    compact: true,
  },
};
