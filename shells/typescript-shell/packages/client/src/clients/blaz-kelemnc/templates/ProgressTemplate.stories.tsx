import type { Meta, StoryObj } from "@storybook/react";
import { ProgressTemplate } from "./ProgressTemplate";

// Define types inline to avoid bundling issues
interface ProgressEntryData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  entryType:
    | "kinesiology_exam"
    | "special_exercise"
    | "milestone"
    | "assessment";
  title: string;
  description?: string;
  date: Date;
  status: "planned" | "in_progress" | "completed";
}

const meta: Meta<typeof ProgressTemplate> = {
  title: "Blaz-Klemenc/Templates/ProgressTemplate",
  component: ProgressTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
    showFilters: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressTemplate>;

// Helper to generate dates
const getDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Sample progress entries
const sampleProgressEntries: ProgressEntryData[] = [
  {
    id: "pe-1",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    entryType: "kinesiology_exam",
    title: "Initial Assessment",
    description:
      "Full body movement assessment and postural analysis for new trainee.",
    date: getDate(-30),
    status: "completed",
  },
  {
    id: "pe-2",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    entryType: "special_exercise",
    title: "Hip Flexor Mobilization",
    description:
      "Targeted exercises for tight hip flexors identified in assessment.",
    date: getDate(-14),
    status: "in_progress",
  },
  {
    id: "pe-3",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    entryType: "milestone",
    title: "First Pull-up",
    description:
      "Achieved first unassisted pull-up - major strength milestone!",
    date: getDate(-7),
    status: "completed",
  },
  {
    id: "pe-4",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    entryType: "assessment",
    title: "Monthly Progress Review",
    description: "Body composition and strength metrics review.",
    date: getDate(0),
    status: "planned",
  },
  {
    id: "pe-5",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    entryType: "kinesiology_exam",
    title: "Follow-up Assessment",
    description: "Re-evaluate movement patterns after 3 months of training.",
    date: getDate(7),
    status: "planned",
  },
  {
    id: "pe-6",
    traineeId: "trainee-3",
    trainerId: "trainer-1",
    entryType: "special_exercise",
    title: "Shoulder Rehabilitation",
    description: "Rotator cuff strengthening protocol post-injury.",
    date: getDate(-21),
    status: "completed",
  },
  {
    id: "pe-7",
    traineeId: "trainee-3",
    trainerId: "trainer-1",
    entryType: "milestone",
    title: "100kg Deadlift",
    description: "Reached 100kg deadlift milestone - 2x bodyweight!",
    date: getDate(-3),
    status: "completed",
  },
  {
    id: "pe-8",
    traineeId: "trainee-4",
    trainerId: "trainer-1",
    entryType: "assessment",
    title: "Initial Fitness Test",
    description: "Baseline measurements for new client.",
    date: getDate(-45),
    status: "completed",
  },
  {
    id: "pe-9",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    entryType: "special_exercise",
    title: "Core Stability Program",
    description: "Anti-rotation and stability exercises.",
    date: getDate(3),
    status: "planned",
  },
  {
    id: "pe-10",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    entryType: "milestone",
    title: "10kg Weight Loss",
    description: "Reached 10kg weight loss goal - incredible dedication!",
    date: getDate(-10),
    status: "completed",
  },
];

export const Default: Story = {
  args: {
    items: sampleProgressEntries,
    title: "Progress Tracking",
    subtitle: "Track trainee progress, exams, and milestones",
    showHeader: true,
    showSearch: true,
    showFilters: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    items: [],
    error: { message: "Failed to load progress entries." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Progress Tracking",
    subtitle: "Track trainee progress, exams, and milestones",
  },
};

export const KinesiologyExamsOnly: Story = {
  args: {
    items: sampleProgressEntries.filter(
      (e) => e.entryType === "kinesiology_exam",
    ),
    title: "Kinesiology Exams",
    subtitle: "Movement assessments and postural analyses",
  },
};

export const SpecialExercisesOnly: Story = {
  args: {
    items: sampleProgressEntries.filter(
      (e) => e.entryType === "special_exercise",
    ),
    title: "Special Exercises",
    subtitle: "Targeted rehabilitation and correction exercises",
  },
};

export const MilestonesOnly: Story = {
  args: {
    items: sampleProgressEntries.filter((e) => e.entryType === "milestone"),
    title: "Milestones",
    subtitle: "Achievements and personal records",
  },
};

export const AssessmentsOnly: Story = {
  args: {
    items: sampleProgressEntries.filter((e) => e.entryType === "assessment"),
    title: "Assessments",
    subtitle: "Progress reviews and fitness tests",
  },
};

export const CompletedOnly: Story = {
  args: {
    items: sampleProgressEntries.filter((e) => e.status === "completed"),
    title: "Completed Progress",
    subtitle: "All completed entries",
  },
};

export const PlannedOnly: Story = {
  args: {
    items: sampleProgressEntries.filter((e) => e.status === "planned"),
    title: "Upcoming Progress",
    subtitle: "Planned assessments and exercises",
  },
};

export const InProgressOnly: Story = {
  args: {
    items: sampleProgressEntries.filter((e) => e.status === "in_progress"),
    title: "Active Progress",
    subtitle: "Currently in progress",
  },
};
