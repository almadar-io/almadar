import type { Meta, StoryObj } from "@storybook/react";
import { BodyMeasurementInput, BodyMeasurementData } from "./BodyMeasurementInput";

const meta: Meta<typeof BodyMeasurementInput> = {
  title: "Blaz-Klemenc/Molecules/BodyMeasurementInput",
  component: BodyMeasurementInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BodyMeasurementInput>;

const previousMeasurements: Partial<BodyMeasurementData> = {
  weight: 82,
  height: 180,
  bodyFat: 18,
  muscleMass: 38,
  chest: 102,
  waist: 84,
  hips: 98,
  leftArm: 35,
  rightArm: 35.5,
  leftThigh: 58,
  rightThigh: 58.5,
};

export const Default: Story = {
  args: {},
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40,
    },
  },
};

export const WithPreviousComparison: Story = {
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40,
      chest: 104,
      waist: 82,
    },
    previousData: previousMeasurements,
    showComparison: true,
  },
};

export const FullMeasurements: Story = {
  args: {
    initialData: {
      weight: 80,
      height: 180,
      bodyFat: 16,
      muscleMass: 40,
      chest: 104,
      waist: 82,
      hips: 97,
      leftArm: 36,
      rightArm: 36.5,
      leftThigh: 59,
      rightThigh: 59,
      notes: "Good progress this month. Visible muscle definition improving.",
    },
    previousData: previousMeasurements,
    showComparison: true,
  },
};

export const NoComparison: Story = {
  args: {
    initialData: {
      weight: 85,
      bodyFat: 20,
    },
    showComparison: false,
  },
};

export const WithTraineeId: Story = {
  args: {
    traineeId: "trainee-123",
    initialData: {
      weight: 75,
      height: 175,
    },
  },
};

export const ImprovedMetrics: Story = {
  args: {
    initialData: {
      weight: 78,
      bodyFat: 14,
      muscleMass: 42,
      waist: 78,
    },
    previousData: {
      weight: 82,
      bodyFat: 18,
      muscleMass: 38,
      waist: 84,
    },
    showComparison: true,
  },
};
