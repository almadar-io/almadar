import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "./TodoList";

const meta: Meta<typeof TodoList> = {
  title: "Builder/Organisms/TodoList",
  component: TodoList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const Empty: Story = {
  args: {
    todos: [],
    showHeader: true,
  },
};

export const WithTodos: Story = {
  args: {
    todos: [
      { id: "1", task: "Create Task entity", status: "completed" },
      { id: "2", task: "Add TaskManagement trait", status: "completed" },
      { id: "3", task: "Implement state machine", status: "in_progress" },
      { id: "4", task: "Add render-ui effects", status: "pending" },
      { id: "5", task: "Validate schema", status: "pending" },
    ],
    showHeader: true,
  },
};

export const AllCompleted: Story = {
  args: {
    todos: [
      { id: "1", task: "Create Task entity", status: "completed" },
      { id: "2", task: "Add TaskManagement trait", status: "completed" },
      { id: "3", task: "Implement state machine", status: "completed" },
      { id: "4", task: "Add render-ui effects", status: "completed" },
      { id: "5", task: "Validate schema", status: "completed" },
    ],
    showHeader: true,
  },
};

export const AllPending: Story = {
  args: {
    todos: [
      { id: "1", task: "Analyze requirements", status: "pending" },
      { id: "2", task: "Design schema structure", status: "pending" },
      { id: "3", task: "Implement entities", status: "pending" },
      { id: "4", task: "Add traits", status: "pending" },
    ],
    showHeader: true,
  },
};

export const WithoutHeader: Story = {
  args: {
    todos: [
      { id: "1", task: "Create Task entity", status: "completed" },
      { id: "2", task: "Add validation", status: "in_progress" },
    ],
    showHeader: false,
  },
};

export const WithProgress: Story = {
  args: {
    todos: [
      { id: "1", task: "Step 1", status: "completed" },
      { id: "2", task: "Step 2", status: "completed" },
      { id: "3", task: "Step 3", status: "completed" },
      { id: "4", task: "Step 4", status: "in_progress" },
      { id: "5", task: "Step 5", status: "pending" },
      { id: "6", task: "Step 6", status: "pending" },
      { id: "7", task: "Step 7", status: "pending" },
      { id: "8", task: "Step 8", status: "pending" },
      { id: "9", task: "Step 9", status: "pending" },
      { id: "10", task: "Step 10", status: "pending" },
    ],
    showHeader: true,
  },
};

export const LongContent: Story = {
  args: {
    todos: [
      {
        id: "1",
        task: "Implement comprehensive error handling with retry logic and user-friendly error messages",
        status: "completed",
      },
      {
        id: "2",
        task: "Add authentication middleware with JWT token validation and refresh token support",
        status: "in_progress",
      },
      {
        id: "3",
        task: "Create database migration scripts for PostgreSQL and MongoDB compatibility",
        status: "pending",
      },
    ],
    showHeader: true,
  },
};

export const WithActivityDetails: Story = {
  args: {
    todos: [
      {
        id: "1",
        task: "Read schema file",
        status: "completed",
      },
      {
        id: "2",
        task: "Update schema version",
        status: "in_progress",
        latestActivity: {
          type: "tool_call",
          content: "Editing schema.orb",
          timestamp: Date.now(),
          tool: "edit_file",
        },
      },
      {
        id: "3",
        task: "Validate changes",
        status: "pending",
      },
    ],
    showHeader: true,
  },
};
