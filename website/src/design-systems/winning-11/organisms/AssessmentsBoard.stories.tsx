import type { Meta, StoryObj } from "@storybook/react";
import { AssessmentsBoard, type AssessmentData } from "./AssessmentsBoard";

// Mock data matching the AssessmentData interface
const mockAssessments: AssessmentData[] = [
  {
    id: "assess-1",
    userId: "u-101",
    userName: "Sarah Chen",
    status: "completed",
    type: "Trust Compatibility",
    score: 87,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    questionCount: 20,
    answeredCount: 20,
  },
  {
    id: "assess-2",
    userId: "u-102",
    userName: "James Rivera",
    status: "in_progress",
    type: "Relationship Strength",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    questionCount: 15,
    answeredCount: 9,
  },
  {
    id: "assess-3",
    userId: "u-103",
    userName: "Aisha Patel",
    status: "pending",
    type: "Network Influence",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    questionCount: 25,
    answeredCount: 0,
  },
  {
    id: "assess-4",
    userId: "u-104",
    userName: "Tom Nakamura",
    status: "expired",
    type: "Community Fit",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    questionCount: 10,
    answeredCount: 3,
  },
  {
    id: "assess-5",
    userId: "u-105",
    userName: "Maria Gonzalez",
    status: "completed",
    type: "Trust Compatibility",
    score: 92,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    questionCount: 20,
    answeredCount: 20,
  },
];

const meta: Meta<typeof AssessmentsBoard> = {
  title: "Clients/Winning-11/Organisms/AssessmentsBoard",
  component: AssessmentsBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    createEvent: "CREATE_ASSESSMENT",
    viewEvent: "VIEW_ASSESSMENT",
    editEvent: "EDIT_ASSESSMENT",
    searchEvent: "SEARCH_ASSESSMENTS",
    filterEvent: "FILTER_ASSESSMENTS",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockAssessments,
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
    error: new Error("Failed to load assessments"),
  },
};

export const CompletedOnly: Story = {
  args: {
    entity: mockAssessments.filter((a) => a.status === "completed"),
    title: "Completed Assessments",
    subtitle: "All finished assessments with scores",
  },
};

export const NoHeaderNoSearch: Story = {
  args: {
    entity: mockAssessments,
    showHeader: false,
    showSearch: false,
  },
};
