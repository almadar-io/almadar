import type { Meta, StoryObj } from "@storybook/react";
import { ProjectsBoard, type ProjectData } from "./ProjectsBoard";

const mockProjects: ProjectData[] = [
  {
    id: "proj-1",
    name: "Sustainable Irrigation Initiative",
    description:
      "Implement drip irrigation across cooperative farms to reduce water usage by 40%.",
    status: "active",
    priority: "high",
    ownerId: "user-001",
    ownerName: "Ahmad Al-Rashid",
    teamName: "Agricultural Innovation Team",
    memberCount: 8,
    progress: 65,
    startDate: "2025-10-01T00:00:00Z",
    endDate: "2026-06-30T00:00:00Z",
    createdAt: "2025-09-15T00:00:00Z",
    tags: ["irrigation", "sustainability"],
  },
  {
    id: "proj-2",
    name: "Heritage Seed Bank",
    description:
      "Catalog and preserve indigenous seed varieties for long-term food security.",
    status: "planning",
    priority: "medium",
    ownerId: "user-002",
    ownerName: "Fatima Hassan",
    teamName: "Biodiversity Unit",
    memberCount: 4,
    progress: 15,
    startDate: "2026-01-15T00:00:00Z",
    endDate: "2026-12-31T00:00:00Z",
    createdAt: "2025-12-01T00:00:00Z",
    tags: ["seeds", "heritage"],
  },
  {
    id: "proj-3",
    name: "Farmer Training Program",
    description:
      "Comprehensive training modules for sustainable farming practices and modern techniques.",
    status: "active",
    priority: "critical",
    ownerId: "user-003",
    ownerName: "Carlos Mendoza",
    teamName: "Education & Outreach",
    memberCount: 12,
    progress: 42,
    startDate: "2025-11-01T00:00:00Z",
    endDate: "2026-05-31T00:00:00Z",
    createdAt: "2025-10-20T00:00:00Z",
    tags: ["training", "education"],
  },
  {
    id: "proj-4",
    name: "Solar Greenhouse Expansion",
    description:
      "Extend greenhouse capacity with solar-powered climate control systems.",
    status: "completed",
    priority: "high",
    ownerId: "user-001",
    ownerName: "Ahmad Al-Rashid",
    teamName: "Infrastructure Team",
    memberCount: 6,
    progress: 100,
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-12-15T00:00:00Z",
    createdAt: "2025-05-10T00:00:00Z",
    tags: ["solar", "greenhouse"],
  },
  {
    id: "proj-5",
    name: "Market Access Platform",
    description:
      "Digital platform connecting farmers directly with buyers for fair-trade produce.",
    status: "paused",
    priority: "low",
    ownerId: "user-004",
    ownerName: "Priya Sharma",
    memberCount: 3,
    progress: 30,
    startDate: "2025-09-01T00:00:00Z",
    createdAt: "2025-08-15T00:00:00Z",
    tags: ["marketplace", "digital"],
  },
];

const meta: Meta<typeof ProjectsBoard> = {
  title: "Clients/Winning-11/Organisms/ProjectsBoard",
  component: ProjectsBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};
export default meta;
type Story = StoryObj<typeof ProjectsBoard>;

export const Default: Story = {
  args: {
    entity: mockProjects,
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
    error: new Error("Failed to load projects"),
  },
};

export const WithCustomTitle: Story = {
  args: {
    entity: mockProjects,
    title: "Cooperative Projects",
    subtitle: "All active and planned initiatives across the cooperative",
  },
};

export const NoFilters: Story = {
  args: {
    entity: mockProjects,
    showFilters: false,
    showSearch: false,
  },
};
