import type { Meta, StoryObj } from "@storybook/react";
import { TeamsTemplate, type TeamData } from "./TeamsTemplate";

const mockTeams: TeamData[] = [
  {
    id: "team-1",
    name: "Core Platform",
    description: "Responsible for the core trust scoring algorithm and platform infrastructure.",
    type: "department",
    status: "active",
    leaderId: "user-1",
    leaderName: "Alex Thompson",
    memberCount: 12,
    maxMembers: 15,
    averageTrustScore: 85,
    cohesionScore: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
    tags: ["Engineering", "Core"],
  },
  {
    id: "team-2",
    name: "Mobile Team",
    description: "iOS and Android mobile application development.",
    type: "project",
    status: "active",
    leaderId: "user-2",
    leaderName: "Sarah Chen",
    memberCount: 6,
    maxMembers: 8,
    averageTrustScore: 82,
    cohesionScore: 91,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    tags: ["Mobile", "iOS", "Android"],
  },
  {
    id: "team-3",
    name: "Enterprise Solutions",
    description: "Enterprise integrations, SSO, and B2B features.",
    type: "cross-functional",
    status: "active",
    leaderId: "user-3",
    leaderName: "Mike Rodriguez",
    memberCount: 8,
    maxMembers: 10,
    averageTrustScore: 78,
    cohesionScore: 75,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    tags: ["Enterprise", "B2B"],
  },
  {
    id: "team-4",
    name: "Data Visualization",
    description: "Graph analytics and data visualization features.",
    type: "project",
    status: "active",
    leaderId: "user-4",
    leaderName: "Emily Watson",
    memberCount: 5,
    averageTrustScore: 88,
    cohesionScore: 92,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    tags: ["Analytics", "Visualization"],
  },
  {
    id: "team-5",
    name: "Security Task Force",
    description: "Temporary team for security audit and improvements.",
    type: "temporary",
    status: "active",
    leaderId: "user-5",
    leaderName: "David Kim",
    memberCount: 4,
    maxMembers: 5,
    averageTrustScore: 92,
    cohesionScore: 85,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    tags: ["Security", "Audit"],
  },
  {
    id: "team-6",
    name: "Design",
    description: "Product design and user experience team.",
    type: "department",
    status: "inactive",
    leaderId: "user-6",
    leaderName: "Lisa Park",
    memberCount: 4,
    maxMembers: 6,
    averageTrustScore: 86,
    cohesionScore: 94,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200).toISOString(),
    tags: ["Design", "UX"],
  },
];

const meta: Meta<typeof TeamsTemplate> = {
  title: "Clients/Winning-11/Templates/TeamsTemplate",
  component: TeamsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockTeams,
  },
};

export const ActiveOnly: Story = {
  args: {
    entity: mockTeams.filter((t) => t.status === "active"),
  },
};

export const DepartmentTeams: Story = {
  args: {
    entity: mockTeams.filter((t) => t.type === "department"),
  },
};

export const ProjectTeams: Story = {
  args: {
    entity: mockTeams.filter((t) => t.type === "project"),
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
    error: new Error("Failed to load teams"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockTeams,
    showHeader: false,
  },
};

export const NoSearch: Story = {
  args: {
    entity: mockTeams,
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockTeams,
    title: "Organization Teams",
    subtitle: "View and manage all teams",
  },
};
