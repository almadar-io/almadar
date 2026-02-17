import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalVisualizationBoard } from "./OrbitalVisualizationBoard";

const meta: Meta<typeof OrbitalVisualizationBoard> = {
  title: "Builder/Organisms/OrbitalVisualizationBoard",
  component: OrbitalVisualizationBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "500px",
          backgroundColor: "var(--color-background)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrbitalVisualizationBoard>;

// =============================================================================
// Mock Schemas
// =============================================================================

const simpleSchema = {
  orbitals: [
    {
      entity: { name: "Task" },
      traits: [{ name: "TaskInteraction" }],
      pages: [{ name: "TasksPage" }],
    },
  ],
};

const mediumSchema = {
  orbitals: [
    {
      entity: { name: "Task" },
      traits: [{ name: "TaskInteraction" }, { name: "TaskFilter" }],
      pages: [{ name: "TasksPage" }],
    },
    {
      entity: { name: "User" },
      traits: [{ name: "UserInteraction" }],
      pages: [{ name: "UsersPage" }],
    },
    {
      entity: { name: "Project" },
      traits: [{ name: "ProjectInteraction" }],
      pages: [{ name: "ProjectsPage" }],
    },
  ],
};

const complexSchema = {
  orbitals: [
    { entity: { name: "Product" }, traits: [{ name: "ProductInteraction" }, { name: "InventorySync" }], pages: [{ name: "ProductsPage" }] },
    { entity: { name: "Order" }, traits: [{ name: "OrderInteraction" }, { name: "OrderWorkflow" }], pages: [{ name: "OrdersPage" }, { name: "OrderDetailPage" }] },
    { entity: { name: "Payment" }, traits: [{ name: "PaymentInteraction" }], pages: [{ name: "PaymentsPage" }] },
    { entity: { name: "Customer" }, traits: [{ name: "CustomerInteraction" }, { name: "CustomerSegment" }], pages: [{ name: "CustomersPage" }] },
    { entity: { name: "Report" }, traits: [{ name: "ReportInteraction" }], pages: [{ name: "ReportsPage" }, { name: "DashboardPage" }] },
    { entity: { name: "Shipping" }, traits: [{ name: "ShippingInteraction" }, { name: "TrackingSync" }], pages: [{ name: "ShippingPage" }] },
    { entity: { name: "Return" }, traits: [{ name: "ReturnInteraction" }], pages: [{ name: "ReturnsPage" }] },
    { entity: { name: "Coupon" }, traits: [{ name: "CouponInteraction" }], pages: [{ name: "CouponsPage" }] },
  ],
  traits: [{ name: "GlobalNotifications" }, { name: "Analytics" }],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    entity: mediumSchema,
    size: "lg",
  },
};

export const SingleOrbital: Story = {
  args: {
    entity: simpleSchema,
    size: "md",
  },
};

export const HighComplexity: Story = {
  args: {
    entity: complexSchema,
    size: "xl",
  },
};

export const DirectComplexity: Story = {
  name: "Direct Complexity Override",
  args: {
    entity: "Task",
    complexity: 45,
    size: "lg",
  },
};

export const SmallSize: Story = {
  args: {
    entity: mediumSchema,
    size: "sm",
    showLabel: false,
  },
};

export const NoAnimation: Story = {
  args: {
    entity: complexSchema,
    size: "lg",
    animated: false,
  },
};

export const AllOrbitalTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-end" }}>
      {[1, 5, 12, 20, 35, 50, 70].map((c) => (
        <OrbitalVisualizationBoard key={c} entity="demo" complexity={c} size="sm" />
      ))}
    </div>
  ),
};
