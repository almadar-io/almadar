import type { Meta, StoryObj } from "@storybook/react";
import { MealPlanCard, MealPlanData } from "./MealPlanCard";

const meta: Meta<typeof MealPlanCard> = {
  title: "Blaz-Klemenc/Molecules/MealPlanCard",
  component: MealPlanCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MealPlanCard>;

const baseMealPlan: MealPlanData = {
  id: "mp-1",
  title: "High Protein Day",
  description: "Focus on lean proteins and vegetables. Perfect for training days.",
  date: new Date(),
  calories: 2200,
  protein: 180,
  carbs: 200,
  fat: 70,
};

export const Default: Story = {
  args: {
    data: baseMealPlan,
  },
};

export const WithAIAnalysis: Story = {
  args: {
    data: {
      ...baseMealPlan,
      aiAnalysis: "Great protein-to-calorie ratio! Consider adding more fiber-rich vegetables to improve satiety. The macros are well-balanced for muscle building.",
    },
  },
};

export const WithShareLink: Story = {
  args: {
    data: {
      ...baseMealPlan,
      shareLink: "https://app.blazklemenc.com/share/meal/abc123",
    },
  },
};

export const FullFeatured: Story = {
  args: {
    data: {
      ...baseMealPlan,
      aiAnalysis: "Excellent macro distribution for your goals. The protein timing around workouts is optimal.",
      shareLink: "https://app.blazklemenc.com/share/meal/xyz789",
    },
  },
};

export const Compact: Story = {
  args: {
    data: baseMealPlan,
    compact: true,
  },
};

export const CompactWithAI: Story = {
  args: {
    data: {
      ...baseMealPlan,
      aiAnalysis: "Well balanced meal plan",
    },
    compact: true,
  },
};

export const HideMacros: Story = {
  args: {
    data: baseMealPlan,
    showMacros: false,
  },
};

export const HideActions: Story = {
  args: {
    data: baseMealPlan,
    showActions: false,
  },
};

export const LowCalorie: Story = {
  args: {
    data: {
      ...baseMealPlan,
      title: "Rest Day - Low Calorie",
      description: "Light eating for recovery day",
      calories: 1500,
      protein: 120,
      carbs: 100,
      fat: 50,
    },
  },
};

export const HighCarb: Story = {
  args: {
    data: {
      ...baseMealPlan,
      title: "Pre-Competition Carb Load",
      description: "Maximize glycogen stores before competition",
      calories: 3000,
      protein: 150,
      carbs: 400,
      fat: 60,
    },
  },
};

export const NoDescription: Story = {
  args: {
    data: {
      id: "mp-simple",
      title: "Quick Meal Plan",
      date: new Date(),
      calories: 1800,
      protein: 140,
      carbs: 180,
      fat: 60,
    },
  },
};
