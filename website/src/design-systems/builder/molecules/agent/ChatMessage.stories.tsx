import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "./ChatMessage";

const meta: Meta<typeof ChatMessage> = {
  title: "Builder/Molecules/ChatMessage",
  component: ChatMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["assistant", "user", "system", "tool"],
    },
    isStreaming: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const UserMessage: Story = {
  args: {
    role: "user",
    content:
      "Can you help me create a new orbital schema for a task management app?",
    timestamp: Date.now() - 120000,
  },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content:
      "I'd be happy to help you create an orbital schema for a task management app. Let me start by asking a few questions about your requirements:\n\n1. What entities do you need? (e.g., Task, Project, User)\n2. What actions should users be able to perform?\n3. Do you need any integrations?",
    timestamp: Date.now() - 60000,
  },
};

export const SystemMessage: Story = {
  args: {
    role: "system",
    content: "Schema validation completed. 0 errors found.",
    timestamp: Date.now(),
  },
};

export const ToolMessage: Story = {
  args: {
    role: "tool",
    content: "Read 45 lines from schema.orb",
    timestamp: Date.now() - 30000,
  },
};

export const StreamingMessage: Story = {
  args: {
    role: "assistant",
    content: "I'm analyzing your schema and looking for potential improvements",
    timestamp: Date.now(),
    isStreaming: true,
  },
};

export const LongMessage: Story = {
  args: {
    role: "assistant",
    content: `Here's the orbital schema I've created for your task management app:

\`\`\`json
{
  "name": "TaskManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "status", "type": "enum", "values": ["todo", "in_progress", "done"] }
        ]
      }
    }
  ]
}
\`\`\`

This schema includes the basic structure for managing tasks. Would you like me to add more features?`,
    timestamp: Date.now(),
  },
};

export const Conversation: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <ChatMessage
        role="user"
        content="Create a simple todo app schema"
        timestamp={Date.now() - 300000}
      />
      <ChatMessage
        role="assistant"
        content="I'll create a todo app schema for you. Let me first analyze your requirements..."
        timestamp={Date.now() - 240000}
      />
      <ChatMessage
        role="tool"
        content="Writing schema.orb..."
        timestamp={Date.now() - 180000}
      />
      <ChatMessage
        role="assistant"
        content="Done! I've created a schema with Task and Project entities. The schema includes CRUD operations and a kanban board view."
        timestamp={Date.now() - 120000}
      />
      <ChatMessage
        role="system"
        content="Schema validated successfully."
        timestamp={Date.now() - 60000}
      />
    </div>
  ),
};

export const WithoutTimestamp: Story = {
  args: {
    role: "assistant",
    content: "This message doesn't have a timestamp.",
  },
};
