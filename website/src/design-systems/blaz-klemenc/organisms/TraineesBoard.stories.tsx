import type { Meta, StoryObj } from "@storybook/react";
import { TraineesBoard } from "./TraineesBoard";
import type { UserData } from "./TraineesBoard";

const mockUsers: UserData[] = [
  {
    id: "user-1",
    name: "Ana Kovac",
    email: "ana.kovac@example.com",
    role: "trainee",
    phone: "+386 40 123 456",
    createdAt: "2025-09-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Marko Horvat",
    email: "marko.horvat@example.com",
    role: "trainee",
    phone: "+386 41 234 567",
    createdAt: "2025-11-01T08:00:00Z",
  },
  {
    id: "user-3",
    name: "Blaz Klemenc",
    email: "blaz@example.com",
    role: "trainer",
    phone: "+386 41 987 654",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "user-4",
    name: "Luka Novak",
    email: "luka.novak@example.com",
    role: "trainee",
    createdAt: "2026-01-05T12:00:00Z",
  },
  {
    id: "user-5",
    name: "Maja Krajnc",
    email: "maja.krajnc@example.com",
    role: "trainer",
    phone: "+386 40 555 789",
    createdAt: "2024-06-20T09:00:00Z",
  },
];

const meta: Meta<typeof TraineesBoard> = {
  title: "Blaz-Klemenc/Organisms/TraineesBoard",
  component: TraineesBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TraineesBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockUsers },
  },
};

export const Loading: Story = {
  args: {
    entity: { items: [] },
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: { items: [] },
  },
};

export const ErrorState: Story = {
  args: {
    entity: { items: [] },
    error: new Error("Failed to load users"),
  },
};

export const TraineesOnly: Story = {
  args: {
    entity: { items: mockUsers.filter((u) => u.role === "trainee") },
    defaultRoleFilter: "trainee",
  },
};
