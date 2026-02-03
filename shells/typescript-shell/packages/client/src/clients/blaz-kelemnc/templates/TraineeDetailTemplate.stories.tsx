import type { Meta, StoryObj } from "@storybook/react";
import { TraineeDetailTemplate } from "./TraineeDetailTemplate";

// Define types inline to avoid bundling issues
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "trainee";
  phone?: string;
  createdAt?: Date;
}

interface TraineeStats {
  totalLifts: number;
  totalSessions: number;
  avgWellnessScore: number;
  currentStreak: number;
  milestonesAchieved: number;
}

interface CreditData {
  id: string;
  traineeId: string;
  totalCredits: number;
  remainingCredits: number;
  expiresAt?: Date;
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

const meta: Meta<typeof TraineeDetailTemplate> = {
  title: "Blaz-Klemenc/Templates/TraineeDetailTemplate",
  component: TraineeDetailTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TraineeDetailTemplate>;

// Sample trainee data
const sampleTrainee: UserData = {
  id: "trainee-1",
  name: "Ana Kovac",
  email: "ana.kovac@example.com",
  role: "trainee",
  phone: "+386 40 123 456",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
};

const sampleTrainer: UserData = {
  id: "trainer-1",
  name: "Blaz Klemenc",
  email: "blaz@trainer.com",
  role: "trainer",
  phone: "+386 30 111 222",
  createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
};

const sampleStats: TraineeStats = {
  totalLifts: 245,
  totalSessions: 48,
  avgWellnessScore: 8.2,
  currentStreak: 21,
  milestonesAchieved: 7,
};

const sampleCreditData: CreditData = {
  id: "credit-1",
  traineeId: "trainee-1",
  totalCredits: 20,
  remainingCredits: 12,
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

const sampleProgressData: ChartDataPoint[] = [
  { date: "2024-01-01", label: "Week 1", value: 65 },
  { date: "2024-01-08", label: "Week 2", value: 70 },
  { date: "2024-01-15", label: "Week 3", value: 68 },
  { date: "2024-01-22", label: "Week 4", value: 75 },
  { date: "2024-01-29", label: "Week 5", value: 78 },
  { date: "2024-02-05", label: "Week 6", value: 82 },
  { date: "2024-02-12", label: "Week 7", value: 80 },
  { date: "2024-02-19", label: "Week 8", value: 85 },
];

export const Default: Story = {
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    creditData: sampleCreditData,
    progressData: sampleProgressData,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: { message: "Failed to load trainee details." } as Error,
  },
};

export const NotFound: Story = {
  args: {
    data: undefined,
  },
};

export const TrainerView: Story = {
  args: {
    data: sampleTrainer,
  },
};

export const WithoutStats: Story = {
  args: {
    data: sampleTrainee,
    creditData: sampleCreditData,
  },
};

export const WithoutCredits: Story = {
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    progressData: sampleProgressData,
  },
};

export const WithoutProgress: Story = {
  args: {
    data: sampleTrainee,
    stats: sampleStats,
    creditData: sampleCreditData,
  },
};

export const MinimalData: Story = {
  args: {
    data: {
      id: "trainee-2",
      name: "New Trainee",
      email: "new@example.com",
      role: "trainee",
    },
  },
};

export const HighPerformer: Story = {
  args: {
    data: sampleTrainee,
    stats: {
      totalLifts: 520,
      totalSessions: 96,
      avgWellnessScore: 9.1,
      currentStreak: 45,
      milestonesAchieved: 15,
    },
    creditData: {
      ...sampleCreditData,
      totalCredits: 50,
      remainingCredits: 35,
    },
    progressData: sampleProgressData,
  },
};
