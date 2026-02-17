import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalSchemaVisualizer } from "./OrbitalNetworkView";
import type { OrbitalSchema } from "@almadar/core";

const meta: Meta<typeof OrbitalSchemaVisualizer> = {
  title: "Builder/Organisms/OrbitalNetworkView",
  component: OrbitalSchemaVisualizer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrbitalSchemaVisualizer>;

// =============================================================================
// Helpers
// =============================================================================

/** Shorthand: build an Event object with key === name */
function ev(name: string) {
  return { key: name, name };
}

// =============================================================================
// Mock Schemas
// =============================================================================

/** Simple schema with 2 connected orbitals */
const simpleSchema: OrbitalSchema = {
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
          { name: "assigneeId", type: "relation", relation: { entity: "User", type: "many-to-one" } },
        ],
      },
      traits: [
        {
          name: "TaskInteraction",
          category: "interaction",
          linkedEntity: "Task",
          emits: [
            {
              event: "TASK_COMPLETED",
              description: "Fired when a task transitions to done",
              scope: "external",
              payload: [
                { name: "taskId", type: "string", required: true },
                { name: "completedBy", type: "string" },
              ],
            },
            {
              event: "TASK_ASSIGNED",
              description: "Fired when a task is assigned to a user",
              scope: "external",
              payload: [
                { name: "taskId", type: "string", required: true },
                { name: "userId", type: "string", required: true },
              ],
            },
          ],
          listens: [
            {
              event: "USER_DEACTIVATED",
              triggers: "REASSIGN",
              scope: "external",
              payloadMapping: { userId: "deactivatedUserId" },
            },
          ],
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Creating" },
              { name: "Viewing" },
              { name: "Editing" },
            ],
            events: [ev("INIT"), ev("CREATE"), ev("VIEW"), ev("EDIT"), ev("SAVE"), ev("CANCEL")],
            transitions: [
              {
                from: "Browsing",
                to: "Browsing",
                event: "INIT",
                effects: [
                  ["render-ui", "main", { type: "page-header", title: "Tasks" }],
                  ["render-ui", "main", { type: "entity-table", entity: "Task" }],
                ],
              },
              {
                from: "Browsing",
                to: "Creating",
                event: "CREATE",
                effects: [
                  ["render-ui", "modal", { type: "form-section", entity: "Task", submitEvent: "SAVE" }],
                ],
              },
              {
                from: "Creating",
                to: "Browsing",
                event: "SAVE",
                effects: [
                  ["persist", "create", "Task", "@payload.data"],
                  ["emit", "TASK_COMPLETED"],
                ],
              },
            ],
          },
        },
      ],
      pages: [
        { name: "TasksPage", path: "/tasks", traits: [{ ref: "TaskInteraction" }] },
      ],
    },
    {
      name: "UserManagement",
      entity: {
        name: "User",
        collection: "users",
        fields: [
          { name: "email", type: "string", required: true },
          { name: "name", type: "string", required: true },
          { name: "role", type: "enum", values: ["admin", "member", "viewer"] },
          { name: "active", type: "boolean" },
        ],
      },
      traits: [
        {
          name: "UserInteraction",
          category: "interaction",
          linkedEntity: "User",
          emits: [
            {
              event: "USER_DEACTIVATED",
              description: "Fired when a user account is deactivated",
              scope: "external",
              payload: [
                { name: "deactivatedUserId", type: "string", required: true },
              ],
            },
          ],
          listens: [
            {
              event: "TASK_ASSIGNED",
              triggers: "REFRESH_ASSIGNMENTS",
              scope: "external",
            },
          ],
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Viewing" },
              { name: "Editing" },
            ],
            events: [ev("INIT"), ev("VIEW"), ev("EDIT"), ev("SAVE")],
            transitions: [
              {
                from: "Browsing",
                to: "Browsing",
                event: "INIT",
                effects: [
                  ["render-ui", "main", { type: "page-header", title: "Users" }],
                  ["render-ui", "main", { type: "entity-table", entity: "User" }],
                ],
              },
            ],
          },
        },
      ],
      pages: [
        { name: "UsersPage", path: "/users", traits: [{ ref: "UserInteraction" }] },
      ],
    },
  ],
};

/** Complex schema with 5 interconnected orbitals */
const complexSchema: OrbitalSchema = {
  name: "ECommerce",
  version: "2.0.0",
  orbitals: [
    {
      name: "ProductCatalog",
      entity: {
        name: "Product",
        collection: "products",
        fields: [
          { name: "title", type: "string", required: true },
          { name: "price", type: "number" },
          { name: "stock", type: "number" },
        ],
      },
      traits: [
        {
          name: "ProductInteraction",
          category: "interaction",
          linkedEntity: "Product",
          emits: [
            { event: "PRODUCT_UPDATED", scope: "external", description: "Product details changed" },
            { event: "STOCK_DEPLETED", scope: "external", description: "Product stock reached zero", payload: [{ name: "productId", type: "string", required: true }] },
          ],
          listens: [
            { event: "ORDER_PLACED", triggers: "DECREMENT_STOCK", scope: "external", payloadMapping: { productId: "productId", quantity: "quantity" } },
            { event: "RETURN_PROCESSED", triggers: "INCREMENT_STOCK", scope: "external" },
          ],
          stateMachine: {
            states: [{ name: "Browsing", isInitial: true }, { name: "Editing" }],
            events: [ev("INIT"), ev("EDIT"), ev("SAVE")],
            transitions: [],
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
          { name: "status", type: "enum", values: ["pending", "confirmed", "shipped", "delivered"] },
        ],
      },
      traits: [
        {
          name: "OrderInteraction",
          category: "interaction",
          linkedEntity: "Order",
          emits: [
            { event: "ORDER_PLACED", scope: "external", description: "New order created", payload: [{ name: "productId", type: "string", required: true }, { name: "quantity", type: "number", required: true }] },
            { event: "ORDER_SHIPPED", scope: "external", description: "Order shipped to customer" },
            { event: "ORDER_DELIVERED", scope: "external" },
          ],
          listens: [
            { event: "PAYMENT_CONFIRMED", triggers: "CONFIRM_ORDER", scope: "external" },
            { event: "STOCK_DEPLETED", triggers: "CANCEL_ORDER", scope: "external" },
          ],
          stateMachine: {
            states: [{ name: "Browsing", isInitial: true }, { name: "Creating" }, { name: "Viewing" }],
            events: [ev("INIT"), ev("CREATE"), ev("VIEW")],
            transitions: [],
          },
        },
      ],
      pages: [
        { name: "OrdersPage", path: "/orders", traits: [{ ref: "OrderInteraction" }] },
      ],
    },
    {
      name: "PaymentGateway",
      entity: {
        name: "Payment",
        collection: "payments",
        fields: [
          { name: "amount", type: "number" },
          { name: "method", type: "enum", values: ["card", "bank", "wallet"] },
        ],
      },
      traits: [
        {
          name: "PaymentInteraction",
          category: "interaction",
          linkedEntity: "Payment",
          emits: [
            { event: "PAYMENT_CONFIRMED", scope: "external", description: "Payment successfully processed" },
            { event: "PAYMENT_FAILED", scope: "external" },
            { event: "REFUND_ISSUED", scope: "external" },
          ],
          listens: [
            { event: "ORDER_PLACED", triggers: "PROCESS_PAYMENT", scope: "external" },
            { event: "RETURN_PROCESSED", triggers: "ISSUE_REFUND", scope: "external" },
          ],
          stateMachine: {
            states: [{ name: "Idle", isInitial: true }, { name: "Processing" }],
            events: [ev("INIT"), ev("PROCESS")],
            transitions: [],
          },
        },
      ],
      pages: [
        { name: "PaymentsPage", path: "/payments", traits: [{ ref: "PaymentInteraction" }] },
      ],
    },
    {
      name: "CustomerSupport",
      entity: {
        name: "Return",
        collection: "returns",
        fields: [
          { name: "reason", type: "string" },
          { name: "status", type: "enum", values: ["requested", "approved", "completed"] },
        ],
      },
      traits: [
        {
          name: "ReturnInteraction",
          category: "interaction",
          linkedEntity: "Return",
          emits: [
            { event: "RETURN_PROCESSED", scope: "external", description: "Return approved and processed" },
          ],
          listens: [
            { event: "ORDER_DELIVERED", triggers: "ENABLE_RETURN", scope: "external" },
          ],
          stateMachine: {
            states: [{ name: "Browsing", isInitial: true }, { name: "Requesting" }],
            events: [ev("INIT"), ev("REQUEST")],
            transitions: [],
          },
        },
      ],
      pages: [
        { name: "ReturnsPage", path: "/returns", traits: [{ ref: "ReturnInteraction" }] },
      ],
    },
    {
      name: "Analytics",
      entity: {
        name: "Report",
        collection: "reports",
        fields: [
          { name: "title", type: "string" },
          { name: "generatedAt", type: "number" },
        ],
      },
      traits: [
        {
          name: "AnalyticsInteraction",
          category: "interaction",
          linkedEntity: "Report",
          emits: [],
          listens: [
            { event: "ORDER_PLACED", triggers: "LOG_ORDER", scope: "external" },
            { event: "PAYMENT_CONFIRMED", triggers: "LOG_REVENUE", scope: "external" },
            { event: "RETURN_PROCESSED", triggers: "LOG_RETURN", scope: "external" },
          ],
          stateMachine: {
            states: [{ name: "Dashboard", isInitial: true }],
            events: [ev("INIT")],
            transitions: [],
          },
        },
      ],
      pages: [
        { name: "AnalyticsPage", path: "/analytics", traits: [{ ref: "AnalyticsInteraction" }] },
      ],
    },
  ],
};

/** Single orbital with no connections */
const singleOrbitalSchema: OrbitalSchema = {
  name: "SimpleApp",
  version: "1.0.0",
  orbitals: [
    {
      name: "NoteManagement",
      entity: {
        name: "Note",
        collection: "notes",
        fields: [
          { name: "content", type: "string" },
          { name: "createdAt", type: "number" },
        ],
      },
      traits: [
        {
          name: "NoteInteraction",
          category: "interaction",
          linkedEntity: "Note",
          stateMachine: {
            states: [{ name: "Browsing", isInitial: true }, { name: "Editing" }],
            events: [ev("INIT"), ev("EDIT"), ev("SAVE")],
            transitions: [],
          },
        },
      ],
      pages: [
        { name: "NotesPage", path: "/notes", traits: [{ ref: "NoteInteraction" }] },
      ],
    },
  ],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    schema: simpleSchema,
  },
};

export const ComplexGraph: Story = {
  args: {
    schema: complexSchema,
  },
};

export const SingleOrbital: Story = {
  args: {
    schema: singleOrbitalSchema,
  },
};

export const EmptySchema: Story = {
  args: {
    schema: { name: "Empty", orbitals: [] },
  },
};

export const Loading: Story = {
  args: {
    schema: null,
  },
};
