import type { Meta, StoryObj } from "@storybook/react";
import { MealPlansBoard } from "./MealPlansBoard";
import type { MealPlanData } from "../molecules/MealPlanCard";

const mockMealPlans: MealPlanData[] = [
  {
    id: "meal-1",
    traineeId: "user-1",
    title: "High Protein Cutting Plan",
    description: "Calorie-controlled plan focused on muscle preservation",
    date: "2026-02-18",
    calories: 2200,
    protein: 180,
    carbs: 200,
    fat: 70,
    aiAnalysis: "Well-balanced macro split for cutting phase.",
  },
  {
    id: "meal-2",
    traineeId: "user-2",
    title: "Bulking Meal Plan",
    description: "Caloric surplus plan for muscle gain",
    date: "2026-02-18",
    calories: 3200,
    protein: 200,
    carbs: 380,
    fat: 100,
  },
  {
    id: "meal-3",
    traineeId: "user-1",
    title: "Recovery Day Nutrition",
    description: "Light meals for rest days with anti-inflammatory foods",
    date: "2026-02-17",
    calories: 1800,
    protein: 140,
    carbs: 180,
    fat: 60,
    aiAnalysis: "Good recovery nutrition with adequate protein.",
  },
  {
    id: "meal-4",
    traineeId: "user-3",
    title: "Competition Prep",
    description: "Strict macro-counted plan for upcoming competition",
    date: "2026-02-16",
    calories: 1900,
    protein: 220,
    carbs: 130,
    fat: 55,
  },
];

const meta: Meta<typeof MealPlansBoard> = {
  title: "Blaz-Klemenc/Organisms/MealPlansBoard",
  component: MealPlansBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MealPlansBoard>;

export const Default: Story = {
  args: {
    entity: { items: mockMealPlans },
    createEvent: "CREATE",
    searchEvent: "SEARCH",
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
    error: new Error("Failed to load meal plans"),
  },
};
