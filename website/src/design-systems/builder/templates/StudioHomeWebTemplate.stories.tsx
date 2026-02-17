import type { Meta, StoryObj } from "@storybook/react";
import { StudioHomeWebTemplate } from "./StudioHomeWebTemplate";

const meta: Meta<typeof StudioHomeWebTemplate> = {
  title: "Builder/Templates/StudioHomeWebTemplate",
  component: StudioHomeWebTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudioHomeWebTemplate>;

const mockProjects = [
  {
    id: "1",
    name: "Task Manager",
    description: "A comprehensive task management application with kanban boards",
    updatedAt: "2 hours ago",
    orbitalsCount: 3,
    traitsCount: 5,
    pagesCount: 4,
  },
  {
    id: "2",
    name: "E-Commerce Store",
    description: "Online store with product catalog and checkout",
    updatedAt: "1 day ago",
    orbitalsCount: 6,
    traitsCount: 12,
    pagesCount: 8,
  },
  {
    id: "3",
    name: "Blog Platform",
    description: "Content management system for blogs",
    updatedAt: "3 days ago",
    orbitalsCount: 4,
    traitsCount: 7,
    pagesCount: 5,
  },
  {
    id: "4",
    name: "Fitness Tracker",
    description: "Track workouts, nutrition, and progress",
    updatedAt: "1 week ago",
    orbitalsCount: 5,
    traitsCount: 10,
    pagesCount: 6,
  },
  {
    id: "5",
    name: "Learning Platform",
    description: "Educational content delivery system",
    updatedAt: "2 weeks ago",
    orbitalsCount: 8,
    traitsCount: 15,
    pagesCount: 10,
  },
];

const MockAgentPanel = () => (
  <div style={{ padding: "16px", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "12px", background: "var(--color-muted)", borderRadius: "8px", marginBottom: "12px" }}>
      <p style={{ fontSize: "14px", color: "var(--color-foreground)" }}>
        Welcome! I can help you create orbital schemas. Try saying:
      </p>
      <ul style={{ fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "8px" }}>
        <li>Create a task management app</li>
        <li>Build an e-commerce store</li>
        <li>Make a blog platform</li>
      </ul>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    entity: { projects: mockProjects },
    agentPanel: <MockAgentPanel />,
  },
};

export const Empty: Story = {
  args: {
    entity: { projects: [] },
    agentPanel: <MockAgentPanel />,
  },
};

export const Loading: Story = {
  args: {
    entity: { projects: [] },
    isLoading: true,
    agentPanel: <MockAgentPanel />,
  },
};

export const WithSelectedProject: Story = {
  args: {
    entity: { projects: mockProjects, selectedProject: mockProjects[0] },
    agentPanel: <MockAgentPanel />,
  },
};

export const WithSearch: Story = {
  args: {
    entity: { projects: mockProjects, searchQuery: "task" },
    agentPanel: <MockAgentPanel />,
  },
};

export const SingleProject: Story = {
  args: {
    entity: { projects: [mockProjects[0]] },
    agentPanel: <MockAgentPanel />,
  },
};

export const ManyProjects: Story = {
  args: {
    entity: {
      projects: [
        ...mockProjects,
        { id: "6", name: "Project 6", updatedAt: "1 month ago" },
        { id: "7", name: "Project 7", updatedAt: "1 month ago" },
        { id: "8", name: "Project 8", updatedAt: "2 months ago" },
        { id: "9", name: "Project 9", updatedAt: "2 months ago" },
      ],
    },
    agentPanel: <MockAgentPanel />,
  },
};

export const WithoutAgentPanel: Story = {
  args: {
    entity: { projects: mockProjects },
  },
};
