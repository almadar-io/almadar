import type { Meta, StoryObj } from "@storybook/react";
import { AIBuilderTemplate } from "./AIBuilderTemplate";
import type { AIBuilderEntity } from "./AIBuilderTemplate";

const meta: Meta<typeof AIBuilderTemplate> = {
  title: "Builder/Templates/AIBuilderTemplate",
  component: AIBuilderTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AIBuilderTemplate>;

const baseEntity: AIBuilderEntity = {
  status: "idle",
  activities: [],
  todos: [],
  schemaDiffs: [],
  schemaSummary: null,
  currentAppId: null,
  user: {
    displayName: "Jane Doe",
    email: "jane@example.com",
    photoURL: null,
  },
  schemaValidated: null,
  agentError: null,
  threadId: null,
  isAnalyzing: false,
  analysisResult: null,
  questionAnswers: {},
  showQuestionsModal: false,
  showJSONViewer: false,
  graphData: null,
  graphLoading: false,
  graphError: null,
  provider: "anthropic",
  skillMode: "standard",
  generationMode: "quick",
  interrupt: null,
};

const MockSidebar = () => (
  <div
    style={{
      width: 256,
      height: "100%",
      background: "var(--color-card)",
      borderRight: "1px solid var(--color-border)",
      padding: 16,
    }}
  >
    <p style={{ fontSize: 14, color: "var(--color-muted-foreground)" }}>
      Sidebar Content
    </p>
  </div>
);

export const Default: Story = {
  args: {
    entity: baseEntity,
  },
};

export const Processing: Story = {
  args: {
    entity: {
      ...baseEntity,
      status: "running",
      threadId: "thread_abc123",
      activities: [
        {
          type: "message",
          role: "user",
          content: "Build me a task management app",
          timestamp: Date.now() - 5000,
        },
        {
          type: "message",
          role: "assistant",
          content: "I'll create a task management application with CRUD operations...",
          timestamp: Date.now() - 3000,
          isStreaming: true,
        },
      ],
    },
  },
};

export const WithAllSlots: Story = {
  args: {
    entity: {
      ...baseEntity,
      status: "complete",
      currentAppId: "app_123",
      threadId: "thread_abc123",
      activities: [
        {
          type: "message",
          role: "user",
          content: "Build me a task management app",
          timestamp: Date.now() - 10000,
        },
        {
          type: "message",
          role: "assistant",
          content: "I've created your Task Manager application with full CRUD support.",
          timestamp: Date.now() - 5000,
        },
      ],
      todos: [
        { id: "1", title: "Define entities", status: "completed" },
        { id: "2", title: "Create traits", status: "completed" },
        { id: "3", title: "Set up pages", status: "in_progress" },
      ],
      schemaDiffs: [
        { path: "/orbitals/0/entity/name", op: "add", after: "Task" },
        { path: "/orbitals/0/traits/0/name", op: "add", after: "TaskInteraction" },
      ],
      schemaSummary: {
        name: "TaskManager",
        stateCount: 5,
        eventCount: 8,
        entityCount: 1,
        pageCount: 1,
      },
      schemaValidated: true,
      sidebarSlot: <MockSidebar />,
    },
  },
};

export const WithError: Story = {
  args: {
    entity: {
      ...baseEntity,
      status: "error",
      agentError: "Failed to generate schema: Invalid entity reference 'Project' not found in orbitals.",
      activities: [
        {
          type: "message",
          role: "user",
          content: "Build a project tracker",
          timestamp: Date.now() - 5000,
        },
        {
          type: "error",
          content: "Generation failed",
          timestamp: Date.now() - 2000,
        },
      ],
    },
  },
};

export const Interrupted: Story = {
  args: {
    entity: {
      ...baseEntity,
      status: "interrupted",
      threadId: "thread_abc123",
      activities: [
        {
          type: "message",
          role: "user",
          content: "Build an e-commerce platform",
          timestamp: Date.now() - 10000,
        },
      ],
      interrupt: {
        type: "clarification",
        message: "I need more details about the product catalog. How should products be categorized?",
        actions: [
          { id: "flat", label: "Flat list", description: "Simple product list without categories" },
          { id: "nested", label: "Nested categories", description: "Hierarchical category tree" },
        ],
      },
    },
  },
};
