import type { Meta, StoryObj } from "@storybook/react";
import { TraineeComparison, TraineeComparisonData } from "./TraineeComparison";

const meta: Meta<typeof TraineeComparison> = {
  title: "Blaz-Klemenc/Organisms/TraineeComparison",
  component: TraineeComparison,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: { type: "number", min: 2, max: 6 },
      description: "Maximum trainees visible at once",
    },
    highlightMetric: {
      control: { type: "select" },
      options: [
        "totalLifts",
        "avgWeightImprovement",
        "consistencyScore",
        "totalSessions",
        "avgWellnessScore",
        "milestonesAchieved",
        "currentStreak",
        "bestLift",
        "bodyFatChange",
        "weightChange",
      ],
      description: "Metric to highlight by default",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TraineeComparison>;

// Sample trainee comparison data
const sampleTrainees: TraineeComparisonData[] = [
  {
    id: "trainee-1",
    name: "Ana Kovac",
    email: "ana@example.com",
    metrics: {
      totalLifts: 245,
      avgWeightImprovement: 12.5,
      consistencyScore: 92,
      totalSessions: 48,
      avgWellnessScore: 8.2,
      milestonesAchieved: 7,
      currentStreak: 21,
      bestLift: 85,
      bodyFatChange: -3.2,
      weightChange: -2.5,
    },
  },
  {
    id: "trainee-2",
    name: "Marko Horvat",
    email: "marko@example.com",
    metrics: {
      totalLifts: 312,
      avgWeightImprovement: 18.3,
      consistencyScore: 88,
      totalSessions: 52,
      avgWellnessScore: 7.8,
      milestonesAchieved: 9,
      currentStreak: 14,
      bestLift: 140,
      bodyFatChange: -1.8,
      weightChange: 3.2,
    },
  },
  {
    id: "trainee-3",
    name: "Luka Novak",
    email: "luka@example.com",
    metrics: {
      totalLifts: 178,
      avgWeightImprovement: 8.7,
      consistencyScore: 75,
      totalSessions: 35,
      avgWellnessScore: 7.2,
      milestonesAchieved: 4,
      currentStreak: 5,
      bestLift: 95,
      bodyFatChange: -0.5,
      weightChange: -1.0,
    },
  },
  {
    id: "trainee-4",
    name: "Maja Krajnc",
    email: "maja@example.com",
    metrics: {
      totalLifts: 289,
      avgWeightImprovement: 15.2,
      consistencyScore: 95,
      totalSessions: 56,
      avgWellnessScore: 8.8,
      milestonesAchieved: 11,
      currentStreak: 35,
      bestLift: 70,
      bodyFatChange: -4.5,
      weightChange: -3.8,
    },
  },
  {
    id: "trainee-5",
    name: "Jan Vidmar",
    email: "jan@example.com",
    metrics: {
      totalLifts: 198,
      avgWeightImprovement: 10.1,
      consistencyScore: 82,
      totalSessions: 40,
      avgWellnessScore: 7.5,
      milestonesAchieved: 5,
      currentStreak: 12,
      bestLift: 120,
      bodyFatChange: -2.0,
      weightChange: 1.5,
    },
  },
  {
    id: "trainee-6",
    name: "Petra Zupan",
    email: "petra@example.com",
    metrics: {
      totalLifts: 156,
      avgWeightImprovement: 6.3,
      consistencyScore: 68,
      totalSessions: 28,
      avgWellnessScore: 6.8,
      milestonesAchieved: 3,
      currentStreak: 3,
      bestLift: 55,
      bodyFatChange: 0.5,
      weightChange: 0.8,
    },
  },
];

export const Default: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 4,
    highlightMetric: "consistencyScore",
  },
};

export const Empty: Story = {
  args: {
    trainees: [],
    maxVisible: 4,
  },
};

export const TwoTrainees: Story = {
  args: {
    trainees: sampleTrainees.slice(0, 2),
    maxVisible: 4,
    highlightMetric: "consistencyScore",
  },
};

export const ThreeTrainees: Story = {
  args: {
    trainees: sampleTrainees.slice(0, 3),
    maxVisible: 4,
    highlightMetric: "avgWeightImprovement",
  },
};

export const SixTrainees: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 4,
    highlightMetric: "totalSessions",
  },
};

export const ShowAllSix: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 6,
    highlightMetric: "milestonesAchieved",
  },
};

export const HighlightStrength: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 4,
    highlightMetric: "bestLift",
  },
};

export const HighlightBodyComposition: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 4,
    highlightMetric: "bodyFatChange",
  },
};

export const HighlightStreak: Story = {
  args: {
    trainees: sampleTrainees,
    maxVisible: 4,
    highlightMetric: "currentStreak",
  },
};

export const TopPerformers: Story = {
  args: {
    trainees: sampleTrainees.filter((t) => t.metrics.consistencyScore >= 85),
    maxVisible: 4,
    highlightMetric: "consistencyScore",
  },
};
