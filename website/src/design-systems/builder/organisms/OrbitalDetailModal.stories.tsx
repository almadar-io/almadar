import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalVisualizerModal } from "./OrbitalDetailModal";
import type { OrbitalSchema } from "@almadar/core";

const meta: Meta<typeof OrbitalVisualizerModal> = {
  title: "Builder/Organisms/OrbitalDetailModal",
  component: OrbitalVisualizerModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof OrbitalVisualizerModal>;

// =============================================================================
// Helpers
// =============================================================================

function ev(name: string) {
  return { key: name, name };
}

// =============================================================================
// Mock Schemas
// =============================================================================

const singleTraitSchema: OrbitalSchema = {
  name: "TaskManager",
  version: "1.0.0",
  orbitals: [
    {
      name: "TaskManagement",
      entity: {
        name: "Task",
        collection: "tasks",
        fields: [
          { name: "title", type: "string", required: true },
          { name: "status", type: "enum", values: ["pending", "active", "done"] },
        ],
      },
      traits: [
        {
          name: "TaskInteraction",
          category: "interaction",
          linkedEntity: "Task",
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Creating" },
              { name: "Viewing" },
              { name: "Editing" },
              { name: "Deleting" },
            ],
            events: [
              ev("INIT"), ev("CREATE"), ev("VIEW"), ev("EDIT"),
              ev("DELETE"), ev("SAVE"), ev("CANCEL"), ev("CONFIRM_DELETE"),
            ],
            transitions: [
              {
                from: "Browsing", to: "Browsing", event: "INIT",
                effects: [
                  ["render-ui", "main", { type: "page-header", title: "Tasks" }],
                  ["render-ui", "main", { type: "entity-table", entity: "Task" }],
                ],
              },
              {
                from: "Browsing", to: "Creating", event: "CREATE",
                effects: [
                  ["render-ui", "modal", { type: "form-section", entity: "Task", submitEvent: "SAVE" }],
                ],
              },
              {
                from: "Creating", to: "Browsing", event: "SAVE",
                effects: [["persist", "create", "Task", "@payload.data"], ["render-ui", "modal", null], ["emit", "INIT"]],
              },
              {
                from: "Creating", to: "Browsing", event: "CANCEL",
                effects: [["render-ui", "modal", null]],
              },
              {
                from: "Browsing", to: "Viewing", event: "VIEW",
                effects: [["render-ui", "main", { type: "entity-detail", entity: "Task" }]],
              },
              {
                from: "Viewing", to: "Editing", event: "EDIT",
                effects: [["render-ui", "modal", { type: "form-section", entity: "Task", submitEvent: "SAVE" }]],
              },
              {
                from: "Editing", to: "Viewing", event: "SAVE",
                effects: [["persist", "update", "Task", "@payload.data"], ["render-ui", "modal", null]],
              },
              {
                from: "Editing", to: "Viewing", event: "CANCEL",
                effects: [["render-ui", "modal", null]],
              },
              {
                from: "Viewing", to: "Deleting", event: "DELETE",
                effects: [["render-ui", "modal", { type: "confirm-dialog", message: "Delete this task?" }]],
              },
              {
                from: "Deleting", to: "Browsing", event: "CONFIRM_DELETE",
                effects: [["persist", "delete", "Task", "@entity.id"], ["render-ui", "modal", null], ["emit", "INIT"]],
              },
              {
                from: "Deleting", to: "Viewing", event: "CANCEL",
                effects: [["render-ui", "modal", null]],
              },
              {
                from: "Viewing", to: "Browsing", event: "CANCEL",
                effects: [],
              },
            ],
          },
        },
      ],
      pages: [
        { name: "TasksPage", path: "/tasks", traits: [{ ref: "TaskInteraction" }] },
      ],
    },
  ],
};

const multiTraitSchema: OrbitalSchema = {
  name: "ECommerce",
  version: "1.0.0",
  orbitals: [
    {
      name: "ProductCatalog",
      entity: {
        name: "Product",
        collection: "products",
        fields: [
          { name: "title", type: "string", required: true },
          { name: "price", type: "number" },
        ],
      },
      traits: [
        {
          name: "ProductInteraction",
          category: "interaction",
          linkedEntity: "Product",
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Creating" },
              { name: "Editing" },
            ],
            events: [ev("INIT"), ev("CREATE"), ev("EDIT"), ev("SAVE"), ev("CANCEL")],
            transitions: [
              { from: "Browsing", to: "Browsing", event: "INIT", effects: [] },
              { from: "Browsing", to: "Creating", event: "CREATE", effects: [] },
              { from: "Creating", to: "Browsing", event: "SAVE", effects: [] },
              { from: "Creating", to: "Browsing", event: "CANCEL", effects: [] },
              { from: "Browsing", to: "Editing", event: "EDIT", effects: [] },
              { from: "Editing", to: "Browsing", event: "SAVE", effects: [] },
              { from: "Editing", to: "Browsing", event: "CANCEL", effects: [] },
            ],
          },
        },
      ],
      pages: [
        { name: "ProductsPage", path: "/products", traits: [{ ref: "ProductInteraction" }] },
      ],
    },
    {
      name: "OrderProcessing",
      entity: {
        name: "Order",
        collection: "orders",
        fields: [
          { name: "total", type: "number" },
          { name: "status", type: "enum", values: ["pending", "confirmed", "shipped"] },
        ],
      },
      traits: [
        {
          name: "OrderInteraction",
          category: "interaction",
          linkedEntity: "Order",
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Viewing" },
              { name: "Processing" },
            ],
            events: [ev("INIT"), ev("VIEW"), ev("PROCESS"), ev("CANCEL")],
            transitions: [
              { from: "Browsing", to: "Browsing", event: "INIT", effects: [] },
              { from: "Browsing", to: "Viewing", event: "VIEW", effects: [] },
              { from: "Viewing", to: "Processing", event: "PROCESS", effects: [] },
              { from: "Processing", to: "Browsing", event: "CANCEL", effects: [] },
              { from: "Viewing", to: "Browsing", event: "CANCEL", effects: [] },
            ],
          },
        },
      ],
      pages: [
        { name: "OrdersPage", path: "/orders", traits: [{ ref: "OrderInteraction" }] },
      ],
    },
  ],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    isOpen: true,
    schema: singleTraitSchema,
  },
};

export const MultipleTraits: Story = {
  args: {
    isOpen: true,
    schema: multiTraitSchema,
  },
};

export const PreselectedTrait: Story = {
  args: {
    isOpen: true,
    schema: multiTraitSchema,
    selectedTraitName: "OrderInteraction",
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    schema: singleTraitSchema,
  },
};
