import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PreviewDashboardTemplate } from "./PreviewDashboardTemplate";
import type { PreviewNavItem } from "./PreviewDashboardTemplate";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Settings,
  BarChart,
  CreditCard,
} from "lucide-react";

const meta: Meta<typeof PreviewDashboardTemplate> = {
  title: "Builder/Templates/PreviewDashboardTemplate",
  component: PreviewDashboardTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreviewDashboardTemplate>;

const defaultNavItems: PreviewNavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Products", icon: Package, badge: 24 },
  { label: "Orders", icon: FileText, badge: 3 },
];

const MockContent = ({ text }: { text: string }) => (
  <div
    style={{
      padding: 24,
      background: "var(--color-card)",
      borderRadius: 8,
      border: "1px solid var(--color-border)",
    }}
  >
    <h2
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: "var(--color-foreground)",
        marginBottom: 12,
      }}
    >
      {text}
    </h2>
    <p style={{ fontSize: 14, color: "var(--color-muted-foreground)" }}>
      This area represents the main page content rendered by the Orbital Runtime.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    appName: "TaskManager",
    navItems: defaultNavItems,
    pageTitle: "Dashboard",
    children: <MockContent text="Dashboard Overview" />,
  },
};

export const SinglePage: Story = {
  args: {
    appName: "SimpleApp",
    navItems: [{ label: "Home", icon: LayoutDashboard, active: true }],
    pageTitle: "Home",
    children: <MockContent text="Single Page Application" />,
  },
};

export const ManyPages: Story = {
  args: {
    appName: "EnterpriseApp",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Products", icon: Package, badge: 142 },
      { label: "Orders", icon: FileText, badge: 18 },
      { label: "Customers", icon: Users, badge: 5 },
      { label: "Cart", icon: ShoppingCart },
      { label: "Analytics", icon: BarChart },
      { label: "Payments", icon: CreditCard },
      { label: "Settings", icon: Settings },
    ],
    pageTitle: "Dashboard",
    children: <MockContent text="Enterprise Dashboard" />,
  },
};

export const WithContent: Story = {
  args: {
    appName: "E-Commerce",
    navItems: defaultNavItems,
    pageTitle: "Products",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {["Revenue", "Orders", "Customers"].map((label) => (
            <div
              key={label}
              style={{
                padding: 20,
                background: "var(--color-card)",
                borderRadius: 8,
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "var(--color-muted-foreground)",
                  marginBottom: 4,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "var(--color-foreground)",
                }}
              >
                {label === "Revenue" ? "$12,340" : label === "Orders" ? "156" : "89"}
              </p>
            </div>
          ))}
        </div>
        <MockContent text="Product Catalog" />
      </div>
    ),
  },
};
