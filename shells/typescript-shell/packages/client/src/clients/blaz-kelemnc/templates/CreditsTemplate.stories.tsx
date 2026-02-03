import type { Meta, StoryObj } from "@storybook/react";
import { CreditsTemplate } from "./CreditsTemplate";

// Define inline to avoid circular import issues
interface CreditData {
  id: string;
  traineeId: string;
  totalCredits: number;
  remainingCredits: number;
  expiresAt?: Date;
}

const meta: Meta<typeof CreditsTemplate> = {
  title: "Blaz-Klemenc/Templates/CreditsTemplate",
  component: CreditsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
    showFilters: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CreditsTemplate>;

// Helper to generate dates
const getDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Sample credits data
const sampleCredits: CreditData[] = [
  {
    id: "credit-1",
    traineeId: "trainee-1",
    totalCredits: 20,
    remainingCredits: 15,
    expiresAt: getDate(60),
  },
  {
    id: "credit-2",
    traineeId: "trainee-2",
    totalCredits: 10,
    remainingCredits: 3,
    expiresAt: getDate(5), // expiring soon
  },
  {
    id: "credit-3",
    traineeId: "trainee-3",
    totalCredits: 30,
    remainingCredits: 28,
    expiresAt: getDate(90),
  },
  {
    id: "credit-4",
    traineeId: "trainee-4",
    totalCredits: 15,
    remainingCredits: 0,
    expiresAt: getDate(-10), // expired
  },
  {
    id: "credit-5",
    traineeId: "trainee-5",
    totalCredits: 20,
    remainingCredits: 8,
    expiresAt: getDate(3), // expiring very soon
  },
  {
    id: "credit-6",
    traineeId: "trainee-6",
    totalCredits: 25,
    remainingCredits: 20,
    expiresAt: getDate(45),
  },
  {
    id: "credit-7",
    traineeId: "trainee-7",
    totalCredits: 10,
    remainingCredits: 2,
    expiresAt: getDate(-5), // expired
  },
  {
    id: "credit-8",
    traineeId: "trainee-8",
    totalCredits: 50,
    remainingCredits: 42,
    expiresAt: getDate(120),
  },
];

export const Default: Story = {
  args: {
    items: sampleCredits,
    title: "Credit Management",
    subtitle: "Manage trainee credit packages and balances",
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
    error: { message: "Failed to load credits." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Credit Management",
    subtitle: "Manage trainee credit packages and balances",
  },
};

export const ActiveOnly: Story = {
  args: {
    items: sampleCredits.filter((c) => {
      const exp = new Date(c.expiresAt!);
      const now = new Date();
      const diffDays = Math.ceil(
        (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diffDays > 7;
    }),
    title: "Active Credits",
    subtitle: "Credits with more than 7 days validity",
  },
};

export const ExpiringOnly: Story = {
  args: {
    items: sampleCredits.filter((c) => {
      const exp = new Date(c.expiresAt!);
      const now = new Date();
      const diffDays = Math.ceil(
        (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diffDays > 0 && diffDays <= 7;
    }),
    title: "Expiring Credits",
    subtitle: "Credits expiring within 7 days",
  },
};

export const ExpiredOnly: Story = {
  args: {
    items: sampleCredits.filter((c) => new Date(c.expiresAt!) < new Date()),
    title: "Expired Credits",
    subtitle: "Credits that have expired",
  },
};

export const AllHealthy: Story = {
  args: {
    items: [
      {
        id: "h1",
        traineeId: "t1",
        totalCredits: 20,
        remainingCredits: 18,
        expiresAt: getDate(60),
      },
      {
        id: "h2",
        traineeId: "t2",
        totalCredits: 15,
        remainingCredits: 12,
        expiresAt: getDate(45),
      },
      {
        id: "h3",
        traineeId: "t3",
        totalCredits: 30,
        remainingCredits: 25,
        expiresAt: getDate(90),
      },
    ],
    title: "Healthy Credits",
    subtitle: "All credits in good standing",
  },
};

export const AllCritical: Story = {
  args: {
    items: [
      {
        id: "c1",
        traineeId: "t1",
        totalCredits: 10,
        remainingCredits: 1,
        expiresAt: getDate(2),
      },
      {
        id: "c2",
        traineeId: "t2",
        totalCredits: 15,
        remainingCredits: 2,
        expiresAt: getDate(3),
      },
      {
        id: "c3",
        traineeId: "t3",
        totalCredits: 20,
        remainingCredits: 0,
        expiresAt: getDate(-1),
      },
    ],
    title: "Critical Credits",
    subtitle: "Credits requiring immediate attention",
  },
};

export const NoHeader: Story = {
  args: {
    items: sampleCredits,
    showHeader: false,
    showFilters: true,
  },
};

export const MinimalView: Story = {
  args: {
    items: sampleCredits,
    showHeader: true,
    showSearch: false,
    showFilters: false,
  },
};
