import type { Meta, StoryObj } from "@storybook/react";
import { UsersTemplate, type UserData } from "./UsersTemplate";

const mockUsers: UserData[] = [
  {
    id: "user-1",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    status: "active",
    primaryCategory: "Technology",
    connectionSlots: 150,
    usedSlots: 45,
    isBetaUser: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    status: "active",
    primaryCategory: "Finance",
    connectionSlots: 100,
    usedSlots: 78,
    isBetaUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "user-3",
    name: "Mike Rodriguez",
    email: "mike.r@example.com",
    status: "pending",
    primaryCategory: "Marketing",
    connectionSlots: 50,
    usedSlots: 0,
    isBetaUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "user-4",
    name: "Emily Watson",
    email: "emily.watson@example.com",
    status: "suspended",
    primaryCategory: "Healthcare",
    connectionSlots: 75,
    usedSlots: 32,
    isBetaUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "user-5",
    name: "David Kim",
    email: "david.kim@example.com",
    status: "active",
    primaryCategory: "Engineering",
    connectionSlots: 150,
    usedSlots: 120,
    isBetaUser: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
  {
    id: "user-6",
    name: "Lisa Park",
    email: "lisa.park@example.com",
    status: "active",
    primaryCategory: "Design",
    connectionSlots: 80,
    usedSlots: 55,
    isBetaUser: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

const meta: Meta<typeof UsersTemplate> = {
  title: "Clients/Winning-11/Templates/UsersTemplate",
  component: UsersTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockUsers,
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
    isLoading: false,
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load users"),
  },
};

export const FewUsers: Story = {
  args: {
    entity: mockUsers.slice(0, 2),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockUsers,
    showHeader: false,
  },
};

export const NoSearchOrFilters: Story = {
  args: {
    entity: mockUsers,
    showSearch: false,
    showFilters: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockUsers,
    title: "Platform Members",
    subtitle: "All registered users on the platform",
  },
};
