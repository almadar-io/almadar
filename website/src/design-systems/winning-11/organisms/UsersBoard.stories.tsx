import type { Meta, StoryObj } from "@storybook/react";
import { UsersBoard, type UserData } from "./UsersBoard";

const mockUsers: UserData[] = [
  {
    id: "user-0012",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    status: "active",
    primaryCategory: "Engineering Lead",
    connectionSlots: 20,
    usedSlots: 14,
    isBetaUser: true,
    createdAt: "2025-03-10T08:00:00Z",
    lastActiveAt: "2026-02-18T14:30:00Z",
  },
  {
    id: "user-0034",
    name: "Marcus Rivera",
    email: "marcus.r@example.com",
    status: "active",
    primaryCategory: "Marketing Director",
    connectionSlots: 15,
    usedSlots: 11,
    isBetaUser: false,
    createdAt: "2025-06-22T10:00:00Z",
    lastActiveAt: "2026-02-17T09:15:00Z",
  },
  {
    id: "user-0056",
    name: "Aiko Tanaka",
    email: "aiko.tanaka@example.com",
    status: "pending",
    primaryCategory: "Data Scientist",
    connectionSlots: 10,
    usedSlots: 0,
    isBetaUser: false,
    createdAt: "2026-02-10T12:00:00Z",
  },
  {
    id: "user-0078",
    name: "Dmitri Volkov",
    email: "d.volkov@example.com",
    status: "suspended",
    connectionSlots: 10,
    usedSlots: 5,
    createdAt: "2025-09-05T07:00:00Z",
    lastActiveAt: "2025-12-20T16:45:00Z",
  },
  {
    id: "user-0090",
    name: "Fatima Al-Rashid",
    email: "fatima.ar@example.com",
    status: "active",
    primaryCategory: "UX Researcher",
    connectionSlots: 12,
    usedSlots: 8,
    isBetaUser: true,
    createdAt: "2025-04-18T11:00:00Z",
    lastActiveAt: "2026-02-18T08:00:00Z",
  },
];

const meta: Meta<typeof UsersBoard> = {
  title: "Clients/Winning-11/Organisms/UsersBoard",
  component: UsersBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof UsersBoard>;

export const Default: Story = {
  args: {
    entity: mockUsers,
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};

export const Empty: Story = {
  args: {
    entity: [],
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load users"),
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockUsers,
    title: "Team Members",
    subtitle: "Manage your team roster and permissions",
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};

export const NoHeaderNoFilters: Story = {
  args: {
    entity: mockUsers,
    showHeader: false,
    showSearch: false,
    showFilters: false,
    createEvent: "CREATE",
    viewEvent: "VIEW",
    editEvent: "EDIT",
    searchEvent: "SEARCH",
  },
};
