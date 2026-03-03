import type { Meta, StoryObj } from "@storybook/react";
import {
  ProjectDetailBoard,
  type ProjectDetailData,
} from "./ProjectDetailBoard";

const mockProject: ProjectDetailData = {
  id: "proj-1",
  name: "Sustainable Irrigation Initiative",
  description:
    "A comprehensive project to implement drip irrigation across all cooperative farms, reducing water usage by 40% while improving crop yield. This initiative involves soil analysis, equipment procurement, installation, and farmer training.",
  status: "active",
  priority: "high",
  ownerId: "user-001",
  ownerName: "Ahmad Al-Rashid",
  teamId: "team-agri-01",
  teamName: "Agricultural Innovation Team",
  members: [
    {
      id: "mem-1",
      userId: "user-001",
      userName: "Ahmad Al-Rashid",
      role: "Project Lead",
      joinedAt: "2025-10-01T00:00:00Z",
    },
    {
      id: "mem-2",
      userId: "user-002",
      userName: "Fatima Hassan",
      role: "Technical Advisor",
      joinedAt: "2025-10-05T00:00:00Z",
    },
    {
      id: "mem-3",
      userId: "user-003",
      userName: "Carlos Mendoza",
      role: "Field Coordinator",
      joinedAt: "2025-10-08T00:00:00Z",
    },
    {
      id: "mem-4",
      userId: "user-004",
      userName: "Priya Sharma",
      role: "Data Analyst",
      joinedAt: "2025-11-01T00:00:00Z",
    },
  ],
  memberCount: 4,
  progress: 65,
  startDate: "2025-10-01T00:00:00Z",
  endDate: "2026-06-30T00:00:00Z",
  createdAt: "2025-09-15T00:00:00Z",
  updatedAt: "2026-02-15T00:00:00Z",
  tags: ["irrigation", "sustainability", "water-conservation"],
  goals: [
    "Reduce water consumption by 40% across all partner farms",
    "Install drip systems on 50 hectares by Q2 2026",
    "Train 120 farmers on system maintenance",
    "Achieve ROI within 18 months of installation",
  ],
  milestones: [
    { name: "Soil analysis completed", completed: true, dueDate: "2025-11-15T00:00:00Z" },
    { name: "Equipment procurement finalized", completed: true, dueDate: "2025-12-31T00:00:00Z" },
    { name: "Phase 1 installation (20 hectares)", completed: false, dueDate: "2026-03-15T00:00:00Z" },
    { name: "Farmer training program launch", completed: false, dueDate: "2026-04-01T00:00:00Z" },
    { name: "Phase 2 installation (30 hectares)", completed: false, dueDate: "2026-06-30T00:00:00Z" },
  ],
};

const meta: Meta<typeof ProjectDetailBoard> = {
  title: "Clients/Winning-11/Organisms/ProjectDetailBoard",
  component: ProjectDetailBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    editEvent: "EDIT_PROJECT",
    deleteEvent: "DELETE_PROJECT",
    backEvent: "BACK",
    addMemberEvent: "ADD_MEMBER",
    removeMemberEvent: "REMOVE_MEMBER",
    addGoalEvent: "ADD_GOAL",
    viewMemberEvent: "VIEW_MEMBER",
  },
};
export default meta;
type Story = StoryObj<typeof ProjectDetailBoard>;

export const Default: Story = {
  args: {
    entity: mockProject,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: undefined,
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to load project details"),
  },
};

export const CompletedProject: Story = {
  args: {
    entity: {
      ...mockProject,
      status: "completed",
      progress: 100,
      milestones: mockProject.milestones?.map((m) => ({
        ...m,
        completed: true,
      })),
    },
  },
};

export const PlanningPhase: Story = {
  args: {
    entity: {
      ...mockProject,
      status: "planning",
      progress: 10,
      members: mockProject.members?.slice(0, 2),
      memberCount: 2,
      milestones: [],
      goals: ["Define project scope and deliverables", "Identify key stakeholders"],
    },
  },
};
