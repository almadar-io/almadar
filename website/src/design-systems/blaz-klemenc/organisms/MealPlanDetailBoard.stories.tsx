import type { Meta, StoryObj } from "@storybook/react";
import { MealPlanDetailBoard } from "./MealPlanDetailBoard";
import type { MealPlanEntity } from "./MealPlanDetailBoard";

const mockMealPlan: MealPlanEntity = {
  id: "meal-1",
  traineeId: "user-1",
  trainerId: "trainer-1",
  title: "High Protein Cutting Plan",
  description:
    "A calorie-controlled meal plan focused on high protein intake to preserve muscle mass during a cutting phase. Includes 5 meals spread throughout the day.",
  date: "2026-02-18",
  calories: 2200,
  protein: 180,
  carbs: 200,
  fat: 70,
  createdAt: "2026-02-10T09:00:00Z",
  updatedAt: "2026-02-16T14:30:00Z",
  trainee: {
    id: "user-1",
    name: "Ana Kovac",
    email: "ana.kovac@example.com",
  },
};

const mockMealPlanWithAnalysis: MealPlanEntity = {
  ...mockMealPlan,
  aiAnalysis:
    "This meal plan provides an excellent macronutrient balance for a cutting phase. The protein intake of 180g supports muscle preservation while the moderate carb and fat levels maintain energy throughout the day. Consider adding more fiber-rich vegetables to improve satiety.",
  shareLink: "https://app.example.com/shared/meal-plan/abc123",
};

const meta: Meta<typeof MealPlanDetailBoard> = {
  title: "Blaz-Klemenc/Organisms/MealPlanDetailBoard",
  component: MealPlanDetailBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MealPlanDetailBoard>;

export const Default: Story = {
  args: {
    entity: mockMealPlan,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    analyzeEvent: "ANALYZE",
    shareEvent: "SHARE",
    backEvent: "BACK",
  },
};

export const WithAIAnalysis: Story = {
  args: {
    entity: mockMealPlanWithAnalysis,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    analyzeEvent: "ANALYZE",
    shareEvent: "SHARE",
    backEvent: "BACK",
  },
};

export const Loading: Story = {
  args: {
    entity: { title: "", date: "" },
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: { title: "", date: "" },
  },
};

export const ErrorState: Story = {
  args: {
    entity: { title: "", date: "" },
    error: new Error("Failed to load meal plan"),
  },
};

export const Analyzing: Story = {
  args: {
    entity: mockMealPlan,
    isAnalyzing: true,
    editEvent: "EDIT",
    deleteEvent: "DELETE",
    analyzeEvent: "ANALYZE",
    shareEvent: "SHARE",
    backEvent: "BACK",
  },
};
