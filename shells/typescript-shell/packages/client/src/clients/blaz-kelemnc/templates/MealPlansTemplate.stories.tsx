import type { Meta, StoryObj } from "@storybook/react";
import { MealPlansTemplate } from "./MealPlansTemplate";

// Define types inline to avoid bundling issues
interface MealPlanData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  description?: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  aiAnalysis?: string;
  shareLink?: string;
}

const meta: Meta<typeof MealPlansTemplate> = {
  title: "Blaz-Klemenc/Templates/MealPlansTemplate",
  component: MealPlansTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showHeader: { control: "boolean" },
    showSearch: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MealPlansTemplate>;

// Helper to generate dates
const getDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Sample meal plans data
const sampleMealPlans: MealPlanData[] = [
  {
    id: "mp-1",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "High Protein Day",
    description:
      "Focus on lean proteins for muscle recovery after heavy lifting session",
    date: getDate(0),
    calories: 2200,
    protein: 180,
    carbs: 200,
    fat: 65,
    aiAnalysis:
      "Excellent protein distribution. Consider adding more vegetables for micronutrients.",
    shareLink: "https://app.blazklemenc.com/meal/abc123",
  },
  {
    id: "mp-2",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "Rest Day Nutrition",
    description: "Lower calorie day with focus on recovery nutrients",
    date: getDate(1),
    calories: 1800,
    protein: 140,
    carbs: 180,
    fat: 55,
  },
  {
    id: "mp-3",
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    title: "Pre-Competition Meal Plan",
    description: "Carb loading strategy for upcoming competition",
    date: getDate(2),
    calories: 2800,
    protein: 150,
    carbs: 380,
    fat: 70,
    aiAnalysis:
      "Good carb timing. Ensure adequate hydration alongside this meal plan.",
  },
  {
    id: "mp-4",
    traineeId: "trainee-3",
    trainerId: "trainer-1",
    title: "Weight Loss Phase",
    description: "Moderate deficit with high satiety foods",
    date: getDate(-1),
    calories: 1600,
    protein: 160,
    carbs: 120,
    fat: 50,
    aiAnalysis: "Sustainable deficit. Monitor energy levels during training.",
    shareLink: "https://app.blazklemenc.com/meal/def456",
  },
  {
    id: "mp-5",
    traineeId: "trainee-4",
    trainerId: "trainer-1",
    title: "Bulking Plan",
    description: "Caloric surplus for muscle gain phase",
    date: getDate(-2),
    calories: 3200,
    protein: 200,
    carbs: 400,
    fat: 90,
  },
  {
    id: "mp-6",
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    title: "Training Day Nutrition",
    description: "Optimized for pre and post workout nutrition",
    date: getDate(3),
    calories: 2400,
    protein: 170,
    carbs: 280,
    fat: 60,
    aiAnalysis: "Perfect macro timing around workouts. Well structured.",
  },
];

export const Default: Story = {
  args: {
    items: sampleMealPlans,
    title: "Meal Plans",
    subtitle: "Create and manage nutrition plans for your trainees",
    showHeader: true,
    showSearch: true,
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
    error: { message: "Failed to load meal plans." } as Error,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Meal Plans",
    subtitle: "Create and manage nutrition plans for your trainees",
  },
};

export const WithAIAnalysis: Story = {
  args: {
    items: sampleMealPlans.filter((mp) => mp.aiAnalysis),
    title: "AI-Analyzed Meal Plans",
    subtitle: "Plans with AI nutritional insights",
  },
};

export const WithoutAIAnalysis: Story = {
  args: {
    items: sampleMealPlans.filter((mp) => !mp.aiAnalysis),
    title: "Pending Analysis",
    subtitle: "Plans awaiting AI review",
  },
};

export const HighCalorie: Story = {
  args: {
    items: sampleMealPlans.filter((mp) => (mp.calories || 0) >= 2400),
    title: "High Calorie Plans",
    subtitle: "Bulking and performance nutrition",
  },
};

export const LowCalorie: Story = {
  args: {
    items: sampleMealPlans.filter((mp) => (mp.calories || 0) < 2000),
    title: "Deficit Plans",
    subtitle: "Weight management nutrition",
  },
};

export const NoHeader: Story = {
  args: {
    items: sampleMealPlans,
    showHeader: false,
    showSearch: true,
  },
};
