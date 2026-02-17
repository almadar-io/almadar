import type { Meta, StoryObj } from "@storybook/react";
import { ProjectsTemplate, type ProjectData } from "./ProjectsTemplate";

const mockProjects: ProjectData[] = [
  {
    id: "proj-1",
    name: "Trust Network v2.0",
    description: "Major upgrade to the trust scoring algorithm with improved accuracy and bias detection.",
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
    tags: ["AI/ML", "Algorithm", "Core"],
  },
  {
    id: "proj-2",
    name: "Mobile App Launch",
    description: "iOS and Android mobile application for the trust network platform.",
    status: "active",
    priority: "critical",
    ownerId: "user-2",
    ownerName: "Sarah Chen",
    teamId: "team-2",
    teamName: "Mobile Team",
    memberCount: 6,
    progress: 42,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 75).toISOString(),
    tags: ["Mobile", "iOS", "Android"],
  },
  {
    id: "proj-3",
    name: "Enterprise Integration",
    description: "API integrations for enterprise customers including SSO and SCIM provisioning.",
    status: "planning",
    priority: "medium",
    ownerId: "user-3",
    ownerName: "Mike Rodriguez",
    teamId: "team-3",
    teamName: "Enterprise",
    memberCount: 4,
    progress: 0,
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    tags: ["Enterprise", "API", "Integration"],
  },
  {
    id: "proj-4",
    name: "Graph Analytics Dashboard",
    description: "Interactive visualization dashboard for network graph analysis.",
    status: "completed",
    priority: "medium",
    ownerId: "user-4",
    ownerName: "Emily Watson",
    teamId: "team-4",
    teamName: "Data Viz",
    memberCount: 5,
    progress: 100,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 100).toISOString(),
    tags: ["Analytics", "Visualization", "D3.js"],
  },
  {
    id: "proj-5",
    name: "Security Audit",
    description: "Comprehensive security audit and penetration testing.",
    status: "paused",
    priority: "high",
    ownerId: "user-5",
    ownerName: "David Kim",
    teamId: "team-5",
    teamName: "Security",
    memberCount: 3,
    progress: 35,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    tags: ["Security", "Audit"],
  },
  {
    id: "proj-6",
    name: "Design System 2.0",
    description: "Updated design system with new components and accessibility improvements.",
    status: "active",
    priority: "low",
    ownerId: "user-6",
    ownerName: "Lisa Park",
    teamId: "team-6",
    teamName: "Design",
    memberCount: 4,
    progress: 78,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50).toISOString(),
    tags: ["Design", "UI/UX", "Accessibility"],
  },
];

const meta: Meta<typeof ProjectsTemplate> = {
  title: "Clients/Winning-11/Templates/ProjectsTemplate",
  component: ProjectsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockProjects,
  },
};

export const ActiveOnly: Story = {
  args: {
    entity: mockProjects.filter((p) => p.status === "active"),
  },
};

export const CompletedOnly: Story = {
  args: {
    entity: mockProjects.filter((p) => p.status === "completed"),
  },
};

export const HighPriority: Story = {
  args: {
    entity: mockProjects.filter(
      (p) => p.priority === "high" || p.priority === "critical"
    ),
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
    error: new Error("Failed to load projects"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockProjects,
    showHeader: false,
  },
};

export const NoSearchOrFilters: Story = {
  args: {
    entity: mockProjects,
    showSearch: false,
    showFilters: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockProjects,
    title: "Active Initiatives",
    subtitle: "Track and manage your team projects",
  },
};
