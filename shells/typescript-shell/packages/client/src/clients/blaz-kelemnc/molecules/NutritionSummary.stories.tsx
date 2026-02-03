import type { Meta, StoryObj } from "@storybook/react";
import { NutritionSummary, NutritionData } from "./NutritionSummary";

const meta: Meta<typeof NutritionSummary> = {
  title: "Blaz-Klemenc/Molecules/NutritionSummary",
  component: NutritionSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NutritionSummary>;

const balancedNutrition: NutritionData = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 70,
};

export const Default: Story = {
  args: {
    summary: balancedNutrition,
  },
};

export const HighProtein: Story = {
  args: {
    summary: {
      calories: 2200,
      protein: 200,
      carbs: 180,
      fat: 65,
    },
  },
};

export const LowCarb: Story = {
  args: {
    summary: {
      calories: 1800,
      protein: 160,
      carbs: 80,
      fat: 100,
    },
  },
};

export const HighCalorie: Story = {
  args: {
    summary: {
      calories: 3500,
      protein: 200,
      carbs: 400,
      fat: 100,
    },
  },
};

export const LowCalorie: Story = {
  args: {
    summary: {
      calories: 1200,
      protein: 100,
      carbs: 100,
      fat: 40,
    },
  },
};

export const WithTargets: Story = {
  args: {
    summary: balancedNutrition,
    targets: {
      calories: 2200,
      protein: 160,
      carbs: 220,
      fat: 75,
    },
  },
};

export const ExceedingTargets: Story = {
  args: {
    summary: {
      calories: 2500,
      protein: 180,
      carbs: 280,
      fat: 90,
    },
    targets: {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 70,
    },
  },
};

export const WeeklyPeriod: Story = {
  args: {
    summary: balancedNutrition,
    period: "week",
  },
};

export const Compact: Story = {
  args: {
    summary: balancedNutrition,
    compact: true,
  },
};

export const CompactWithTargets: Story = {
  args: {
    summary: balancedNutrition,
    targets: {
      calories: 2200,
      protein: 160,
      carbs: 220,
      fat: 75,
    },
    compact: true,
  },
};
