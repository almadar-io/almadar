import type { Meta, StoryObj } from "@storybook/react";
import { CreditExpirationAlert } from "./CreditExpirationAlert";

const meta: Meta<typeof CreditExpirationAlert> = {
  title: "Blaz-Klemenc/Atoms/CreditExpirationAlert",
  component: CreditExpirationAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreditExpirationAlert>;

// Helper to create dates relative to now
const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export const ExpiresTomorrow: Story = {
  args: {
    expiresAt: daysFromNow(1),
    credits: 5,
    traineeId: "trainee-1",
  },
};

export const ExpiresIn3Days: Story = {
  args: {
    expiresAt: daysFromNow(3),
    credits: 8,
    traineeId: "trainee-2",
  },
};

export const ExpiresIn7Days: Story = {
  args: {
    expiresAt: daysFromNow(7),
    credits: 3,
    traineeId: "trainee-3",
  },
};

export const AlreadyExpired: Story = {
  args: {
    expiresAt: daysFromNow(-1),
    credits: 2,
    traineeId: "trainee-4",
  },
};

export const LowCreditsExpiring: Story = {
  args: {
    expiresAt: daysFromNow(2),
    credits: 1,
    traineeId: "trainee-5",
  },
};

export const Dismissible: Story = {
  args: {
    expiresAt: daysFromNow(5),
    credits: 5,
    dismissible: true,
    onDismiss: () => console.log("Dismissed"),
  },
};

export const NotDismissible: Story = {
  args: {
    expiresAt: daysFromNow(3),
    credits: 4,
    dismissible: false,
  },
};
