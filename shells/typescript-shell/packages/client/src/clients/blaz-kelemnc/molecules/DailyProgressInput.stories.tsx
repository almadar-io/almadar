import type { Meta, StoryObj } from "@storybook/react";
import { DailyProgressInput } from "./DailyProgressInput";

const meta: Meta<typeof DailyProgressInput> = {
  title: "Blaz-Klemenc/Molecules/DailyProgressInput",
  component: DailyProgressInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DailyProgressInput>;

export const Default: Story = {
  args: {},
};

export const WithExistingEntry: Story = {
  args: {
    existingEntry: {
      date: new Date(),
      sleepScore: 7,
      hungeriness: 5,
      tiredness: 4,
    },
  },
};

export const HighEnergy: Story = {
  args: {
    existingEntry: {
      date: new Date(),
      sleepScore: 9,
      hungeriness: 3,
      tiredness: 2,
    },
  },
};

export const LowEnergy: Story = {
  args: {
    existingEntry: {
      date: new Date(),
      sleepScore: 4,
      hungeriness: 8,
      tiredness: 8,
    },
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const CompactWithValues: Story = {
  args: {
    compact: true,
    existingEntry: {
      date: new Date(),
      sleepScore: 6,
      hungeriness: 5,
      tiredness: 6,
    },
  },
};

export const WithTraineeId: Story = {
  args: {
    traineeId: "trainee-123",
  },
};

export const WithDateSelector: Story = {
  args: {
    showDateSelector: true,
    date: new Date(),
  },
};
