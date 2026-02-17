import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ComponentTreeBoard } from "./ComponentTreeBoard";

const meta: Meta<typeof ComponentTreeBoard> = {
  title: "Builder/Organisms/ComponentTreeBoard",
  component: ComponentTreeBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "600px", width: "100%", backgroundColor: "var(--color-background)" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onComponentSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ComponentTreeBoard>;

// =============================================================================
// Mock Schemas
// =============================================================================

const defaultSchema = {
  ui: {
    pages: [
      {
        name: "TasksPage",
        path: "/tasks",
        isInitial: true,
        purpose: "Main task management page",
        components: [
          {
            type: "PageHeader",
            props: { title: "Tasks", actions: [{ label: "New Task", event: "CREATE" }] },
            children: [],
          },
          {
            type: "EntityTable",
            props: { entity: "Task", columns: ["title", "status", "assignee"] },
            children: [
              {
                type: "TableColumn",
                props: { field: "title", sortable: true },
              },
              {
                type: "TableColumn",
                props: { field: "status", sortable: true },
              },
              {
                type: "Show",
                props: { when: "@state.isAdmin" },
                children: [
                  {
                    type: "TableColumn",
                    props: { field: "assignee" },
                  },
                ],
              },
            ],
          },
          {
            type: "FormSection",
            props: {
              entity: "Task",
              fields: ["title", "status"],
              onSubmit: "SAVE",
              onClick: "SUBMIT_FORM",
            },
            children: [],
          },
        ],
      },
      {
        name: "DashboardPage",
        path: "/dashboard",
        purpose: "Overview dashboard",
        components: [
          {
            type: "PageHeader",
            props: { title: "Dashboard" },
          },
          {
            type: "StatsGrid",
            props: { columns: 3 },
            children: [
              { type: "StatCard", props: { label: "Total Tasks", value: 42 } },
              { type: "StatCard", props: { label: "Active", value: 12 } },
              { type: "StatCard", props: { label: "Completed", value: 30 } },
            ],
          },
        ],
      },
    ],
  },
};

const deepNestingSchema = {
  ui: {
    pages: [
      {
        name: "ComplexPage",
        path: "/complex",
        components: [
          {
            type: "Layout",
            props: { direction: "horizontal" },
            children: [
              {
                type: "Sidebar",
                props: { width: 240 },
                children: [
                  {
                    type: "Navigation",
                    props: {},
                    children: [
                      { type: "NavItem", props: { label: "Home", path: "/" } },
                      { type: "NavItem", props: { label: "Tasks", path: "/tasks" } },
                      {
                        type: "NavGroup",
                        props: { label: "Settings" },
                        children: [
                          { type: "NavItem", props: { label: "General", path: "/settings/general" } },
                          { type: "NavItem", props: { label: "Security", path: "/settings/security" } },
                          {
                            type: "NavGroup",
                            props: { label: "Advanced" },
                            children: [
                              { type: "NavItem", props: { label: "API Keys", path: "/settings/api" } },
                              { type: "NavItem", props: { label: "Webhooks", path: "/settings/webhooks" } },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "MainContent",
                props: {},
                children: [
                  {
                    type: "ErrorBoundary",
                    props: {},
                    children: [
                      { type: "Spinner", props: { size: "lg" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const emptySchema = {
  ui: {
    pages: [],
  },
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    schema: defaultSchema,
  },
};

export const WithSelection: Story = {
  args: {
    schema: defaultSchema,
    selectedPageId: "TasksPage",
  },
};

export const Empty: Story = {
  args: {
    schema: emptySchema,
  },
};

export const DeepNesting: Story = {
  args: {
    schema: deepNestingSchema,
  },
};
