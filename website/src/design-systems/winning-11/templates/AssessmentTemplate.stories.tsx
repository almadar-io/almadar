import type { Meta, StoryObj } from "@storybook/react";
import { AssessmentTemplate, type AssessmentData } from "./AssessmentTemplate";

const mockAssessments: AssessmentData[] = [
  {
    id: "assess-1",
    userId: "user-1",
    userName: "Alex Thompson",
    status: "completed",
    type: "Psychological Compatibility",
    score: 85,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    questionCount: 50,
    answeredCount: 50,
  },
  {
    id: "assess-2",
    userId: "user-2",
    userName: "Sarah Chen",
    status: "in_progress",
    type: "Trust Assessment",
    startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    questionCount: 40,
    answeredCount: 25,
  },
  {
    id: "assess-3",
    userId: "user-3",
    userName: "Mike Rodriguez",
    status: "pending",
    type: "Psychological Compatibility",
    questionCount: 50,
    answeredCount: 0,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "assess-4",
    userId: "user-4",
    userName: "Emily Watson",
    status: "completed",
    type: "Leadership Style",
    score: 72,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    questionCount: 30,
    answeredCount: 30,
  },
  {
    id: "assess-5",
    userId: "user-5",
    userName: "David Kim",
    status: "expired",
    type: "Trust Assessment",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23).toISOString(),
    questionCount: 40,
    answeredCount: 15,
  },
  {
    id: "assess-6",
    userId: "user-6",
    userName: "Lisa Park",
    status: "completed",
    type: "Communication Preferences",
    score: 91,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    questionCount: 25,
    answeredCount: 25,
  },
];

const meta: Meta<typeof AssessmentTemplate> = {
  title: "Clients/Winning-11/Templates/AssessmentTemplate",
  component: AssessmentTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockAssessments,
  },
};

export const CompletedOnly: Story = {
  args: {
    entity: mockAssessments.filter((a) => a.status === "completed"),
  },
};

export const InProgressOnly: Story = {
  args: {
    entity: mockAssessments.filter((a) => a.status === "in_progress"),
  },
};

export const PendingOnly: Story = {
  args: {
    entity: mockAssessments.filter((a) => a.status === "pending"),
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
    error: new Error("Failed to load assessments"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockAssessments,
    showHeader: false,
  },
};

export const NoSearch: Story = {
  args: {
    entity: mockAssessments,
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockAssessments,
    title: "Trust Assessments",
    subtitle: "Complete assessments to improve your trust score",
  },
};
