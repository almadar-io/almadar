import type { Meta, StoryObj } from "@storybook/react";
import { TraineesTemplate } from "./TraineesTemplate";

// Define types inline to avoid bundling issues
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "trainee";
  phone?: string;
  createdAt?: Date;
}

const meta: Meta<typeof TraineesTemplate> = {
  title: "Blaz-Klemenc/Templates/TraineesTemplate",
  component: TraineesTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
    showFilters: { control: "boolean" },
    defaultRoleFilter: {
      control: { type: "select" },
      options: ["all", "trainer", "trainee"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TraineesTemplate>;

// Sample users data
const sampleUsers: UserData[] = [
  {
    id: "user-1",
    name: "Ana Kovac",
    email: "ana.kovac@example.com",
    role: "trainee",
    phone: "+386 40 123 456",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-2",
    name: "Marko Horvat",
    email: "marko.horvat@example.com",
    role: "trainee",
    phone: "+386 41 234 567",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-3",
    name: "Blaz Klemenc",
    email: "blaz@example.com",
    role: "trainer",
    phone: "+386 30 111 222",
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-4",
    name: "Luka Novak",
    email: "luka.novak@example.com",
    role: "trainee",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-5",
    name: "Maja Krajnc",
    email: "maja.krajnc@example.com",
    role: "trainee",
    phone: "+386 51 345 678",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-6",
    name: "Jan Vidmar",
    email: "jan.vidmar@example.com",
    role: "trainee",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-7",
    name: "Sara Petric",
    email: "sara@trainer.com",
    role: "trainer",
    phone: "+386 40 999 888",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
  },
  {
    id: "user-8",
    name: "Petra Zupan",
    email: "petra.zupan@example.com",
    role: "trainee",
    phone: "+386 31 456 789",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const Default: Story = {
  args: {
    items: sampleUsers,
    title: "Users",
    subtitle: "Manage trainers and trainees",
    showHeader: true,
    showSearch: true,
    showFilters: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    items: [],
    error: { message: "Failed to load users. Please try again." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Users",
    subtitle: "Manage trainers and trainees",
  },
};

export const TraineesOnly: Story = {
  args: {
    items: sampleUsers.filter((u) => u.role === "trainee"),
    defaultRoleFilter: "trainee",
    title: "Trainees",
    subtitle: "View all trainees",
  },
};

export const TrainersOnly: Story = {
  args: {
    items: sampleUsers.filter((u) => u.role === "trainer"),
    defaultRoleFilter: "trainer",
    title: "Trainers",
    subtitle: "View all trainers",
  },
};

export const NoHeader: Story = {
  args: {
    items: sampleUsers,
    showHeader: false,
    showSearch: true,
    showFilters: true,
  },
};

export const MinimalView: Story = {
  args: {
    items: sampleUsers,
    showHeader: true,
    showSearch: false,
    showFilters: false,
  },
};
