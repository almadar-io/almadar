import type { Meta, StoryObj } from "@storybook/react";
import { DomainLogicView } from "./DomainLogicView";
import type { DomainLogicViewProps } from "./DomainLogicView";

const meta: Meta<typeof DomainLogicView> = {
  title: "Builder/Templates/DomainLogicView",
  component: DomainLogicView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainLogicView>;

const mockEntities: DomainLogicViewProps["entities"] = [
  {
    name: "Task",
    description: "A work item that can be assigned and tracked",
    fields: [
      { name: "title", fieldType: "string" },
      { name: "status", fieldType: "enum", enumValues: ["pending", "active", "done"] },
      { name: "priority", fieldType: "number" },
    ],
    relationships: [
      { relationshipType: "belongs_to", targetEntity: "User", alias: "assignee" },
    ],
    states: ["pending", "active", "done"],
    initialState: "pending",
  },
  {
    name: "User",
    description: "Application user who can own and manage tasks",
    fields: [
      { name: "name", fieldType: "string" },
      { name: "email", fieldType: "string" },
      { name: "role", fieldType: "enum", enumValues: ["admin", "member"] },
    ],
    relationships: [],
  },
];

const mockPages: DomainLogicViewProps["pages"] = [
  {
    name: "TasksPage",
    description: "Main task management page",
    url: "/tasks",
    sections: [
      { name: "header", description: "Page header with create button" },
      { name: "table", description: "Task list table" },
    ],
    actions: [
      { trigger: "Create Task", action: "Open create task form" },
      { trigger: "Edit Task", action: "Open edit task form" },
    ],
  },
  {
    name: "DashboardPage",
    description: "Overview dashboard with task metrics",
    url: "/dashboard",
    sections: [
      { name: "stats", description: "Task statistics cards" },
      { name: "recent", description: "Recently updated tasks" },
    ],
    actions: [],
  },
];

const mockBehaviors: DomainLogicViewProps["behaviors"] = [
  {
    name: "TaskInteraction",
    entityName: "Task",
    states: ["Browsing", "Creating", "Editing", "Viewing", "Deleting"],
    initialState: "Browsing",
    transitions: [
      { fromState: "Browsing", toState: "Creating", event: "CREATE" },
      { fromState: "Browsing", toState: "Viewing", event: "VIEW" },
      { fromState: "Creating", toState: "Browsing", event: "SAVE" },
      { fromState: "Creating", toState: "Browsing", event: "CANCEL" },
      { fromState: "Viewing", toState: "Editing", event: "EDIT" },
      { fromState: "Editing", toState: "Browsing", event: "SAVE" },
    ],
    ticks: [],
    rules: ["Only admins can delete tasks", "Tasks must have a title"],
  },
];

const mockDomainText = `entity Task {
  title: string required
  status: enum(pending, active, done)
  priority: number

  belongs_to User as assignee

  states: pending -> active -> done
}

entity User {
  name: string required
  email: string required
  role: enum(admin, member)
}

page TasksPage "/tasks" {
  header: Page header with create button
  table: Task list table
}
`;

export const Default: Story = {
  args: {
    entities: mockEntities,
    pages: mockPages,
    behaviors: mockBehaviors,
    domainText: mockDomainText,
    defaultTab: "structured",
  },
};

export const RawEditor: Story = {
  args: {
    entities: mockEntities,
    pages: mockPages,
    behaviors: mockBehaviors,
    domainText: mockDomainText,
    defaultTab: "editor",
    hasChanges: true,
  },
};

export const Summary: Story = {
  args: {
    entities: mockEntities,
    pages: mockPages,
    behaviors: mockBehaviors,
    domainText: mockDomainText,
    defaultTab: "summary",
    summary:
      "This is a task management application with two main entities: Task and User. Tasks can be created, assigned, and tracked through a simple workflow (pending -> active -> done). Users have roles (admin, member) that control access permissions. The main TasksPage provides CRUD operations on tasks.",
  },
};

export const WithErrors: Story = {
  args: {
    entities: mockEntities,
    pages: mockPages,
    behaviors: mockBehaviors,
    domainText: mockDomainText,
    defaultTab: "structured",
    errors: [
      {
        message: "Entity 'Task' field 'priority' should be required for proper validation",
        severity: "warning",
        sectionId: "entity_Task",
      },
      {
        message: "Behavior 'TaskInteraction' has unreachable state 'Deleting' - no incoming transitions",
        severity: "error",
        sectionId: "behavior_TaskInteraction",
      },
    ],
  },
};
