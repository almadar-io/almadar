import type { Meta, StoryObj } from "@storybook/react";
import { CreditsBoard } from "./CreditsBoard";
import type { CreditData } from "../atoms/CreditMeter";

const now = new Date();
const daysFromNow = (days: number): Date => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d;
};

const mockCredits: CreditData[] = [
  {
    id: "credit-1",
    traineeId: "user-1",
    trainerId: "trainer-1",
    totalCredits: 20,
    remainingCredits: 14,
    expiresAt: daysFromNow(30).toISOString(),
    createdAt: daysFromNow(-60).toISOString(),
  },
  {
    id: "credit-2",
    traineeId: "user-2",
    trainerId: "trainer-1",
    totalCredits: 10,
    remainingCredits: 2,
    expiresAt: daysFromNow(5).toISOString(),
    createdAt: daysFromNow(-25).toISOString(),
  },
  {
    id: "credit-3",
    traineeId: "user-3",
    trainerId: "trainer-1",
    totalCredits: 15,
    remainingCredits: 0,
    expiresAt: daysFromNow(-3).toISOString(),
    createdAt: daysFromNow(-90).toISOString(),
  },
  {
    id: "credit-4",
    traineeId: "user-4",
    trainerId: "trainer-1",
    totalCredits: 30,
    remainingCredits: 28,
    expiresAt: daysFromNow(60).toISOString(),
    createdAt: daysFromNow(-10).toISOString(),
  },
];

const meta: Meta<typeof CreditsBoard> = {
  title: "Blaz-Klemenc/Organisms/CreditsBoard",
  component: CreditsBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CreditsBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockCredits },
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
    error: new Error("Failed to load credits"),
  },
};

export const AllActive: Story = {
  args: {
    entity: {
      items: mockCredits.filter(
        (c) => c.expiresAt && new Date(c.expiresAt) > daysFromNow(7),
      ),
    },
  },
};
