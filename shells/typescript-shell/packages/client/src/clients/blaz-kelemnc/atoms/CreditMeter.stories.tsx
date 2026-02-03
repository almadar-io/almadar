import type { Meta, StoryObj } from "@storybook/react";
import { CreditMeter, CreditData } from "./CreditMeter";

const meta: Meta<typeof CreditMeter> = {
  title: "Blaz-Klemenc/Atoms/CreditMeter",
  component: CreditMeter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    compact: {
      control: "boolean",
    },
    showActionButton: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreditMeter>;

// Sample credit data
const baseCreditData: CreditData = {
  id: "credit-1",
  traineeId: "trainee-1",
  totalCredits: 10,
  remainingCredits: 7,
};

export const Default: Story = {
  args: {
    data: baseCreditData,
  },
};

export const FullCredits: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 10,
    },
  },
};

export const MediumCredits: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 4,
    },
  },
};

export const LowCredits: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 2,
    },
  },
};

export const NoCredits: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 0,
    },
  },
};

export const ExpiringCredits: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  },
};

export const ExpiresTomorrow: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 3,
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    },
  },
};

export const Compact: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5,
    },
    compact: true,
  },
};

export const CompactExpiring: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 5,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    compact: true,
  },
};

export const Small: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 6,
    },
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 8,
    },
    size: "lg",
  },
};

export const WithoutActionButton: Story = {
  args: {
    data: {
      ...baseCreditData,
      remainingCredits: 2,
    },
    showActionButton: false,
  },
};

export const UsingDirectProps: Story = {
  args: {
    remainingCredits: 5,
    totalCredits: 20,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
};
