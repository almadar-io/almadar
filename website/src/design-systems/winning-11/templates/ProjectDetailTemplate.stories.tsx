import type { Meta, StoryObj } from "@storybook/react";
import { ProjectDetailTemplate, type ProjectDetailData } from "./ProjectDetailTemplate";

const mockProject: ProjectDetailData = {
  id: "proj-1",
  name: "Trust Network v2.0",
  description: "Major upgrade to the trust scoring algorithm with improved accuracy and bias detection. This project involves retraining our ML models with expanded datasets and implementing new fairness constraints.",
  status: "active",
  priority: "high",
  ownerId: "user-1",
  ownerName: "Alex Thompson",
  teamId: "team-1",
  teamName: "Core Platform",
  memberCount: 8,
  progress: 65,
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  tags: ["AI/ML", "Algorithm", "Core"],
  goals: [
    "Improve trust score accuracy by 15%",
    "Reduce bias in scoring across demographics",
    "Implement real-time score updates",
    "Add explainability features for score breakdowns",
  ],
  milestones: [
    { name: "Data collection and preprocessing", completed: true, dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString() },
    { name: "Model architecture design", completed: true, dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
    { name: "Training pipeline setup", completed: true, dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
    { name: "Model training and validation", completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString() },
    { name: "A/B testing", completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() },
    { name: "Production rollout", completed: false, dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString() },
  ],
  members: [
    { id: "pm-1", userId: "user-1", userName: "Alex Thompson", role: "Project Lead", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString() },
    { id: "pm-2", userId: "user-2", userName: "Sarah Chen", role: "ML Engineer", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString() },
    { id: "pm-3", userId: "user-3", userName: "Mike Rodriguez", role: "Data Engineer", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString() },
    { id: "pm-4", userId: "user-4", userName: "Emily Watson", role: "QA Lead", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
    { id: "pm-5", userId: "user-5", userName: "David Kim", role: "DevOps", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
  ],
};

const meta: Meta<typeof ProjectDetailTemplate> = {
  title: "Clients/Winning-11/Templates/ProjectDetailTemplate",
  component: ProjectDetailTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockProject,
  },
};

export const CompletedProject: Story = {
  args: {
    entity: {
      ...mockProject,
      status: "completed",
      progress: 100,
      milestones: mockProject.milestones?.map((m) => ({ ...m, completed: true })),
    },
  },
};

export const PlanningPhase: Story = {
  args: {
    entity: {
      ...mockProject,
      status: "planning",
      progress: 0,
      milestones: mockProject.milestones?.map((m) => ({ ...m, completed: false })),
    },
  },
};

export const PausedProject: Story = {
  args: {
    entity: {
      ...mockProject,
      status: "paused",
      progress: 35,
    },
  },
};

export const CriticalPriority: Story = {
  args: {
    entity: {
      ...mockProject,
      priority: "critical",
    },
  },
};

export const NoMilestones: Story = {
  args: {
    entity: {
      ...mockProject,
      milestones: undefined,
    },
  },
};

export const NoGoals: Story = {
  args: {
    entity: {
      ...mockProject,
      goals: undefined,
    },
  },
};

export const NoMembers: Story = {
  args: {
    entity: {
      ...mockProject,
      members: undefined,
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
    error: new Error("Failed to load project details"),
  },
};

export const NotFound: Story = {
  args: {
    entity: undefined,
  },
};

export const NoBackButton: Story = {
  args: {
    entity: mockProject,
    showBack: false,
  },
};
