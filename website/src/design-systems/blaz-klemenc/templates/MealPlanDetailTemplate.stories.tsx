import type { Meta, StoryObj } from "@storybook/react";
import { MealPlanDetailTemplate } from "./MealPlanDetailTemplate";

const meta: Meta<typeof MealPlanDetailTemplate> = {
  title: "Blaz-Klemenc/Templates/MealPlanDetailTemplate",
  component: MealPlanDetailTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MealPlanDetailTemplate>;

// Sample trainee data
const sampleTrainee = {
  id: "trainee-1",
  name: "Ana Kovac",
  email: "ana.kovac@example.com",
};

// Sample meal plan entity data
const sampleEntity = {
  id: "mp-1",
  traineeId: "trainee-1",
  trainerId: "trainer-1",
  title: "High Protein Recovery Day",
  description:
    "This meal plan is designed for post-heavy-lifting recovery. Focus on lean proteins spread throughout the day to maximize muscle protein synthesis. Include plenty of vegetables for micronutrients and fiber. Hydration is key - aim for 3+ liters of water.",
  date: new Date(),
  calories: 2200,
  protein: 180,
  carbs: 200,
  fat: 65,
  aiAnalysis:
    "Excellent protein distribution across meals (approximately 45g per main meal). The carbohydrate timing is well-structured with higher intake around training. Consider adding more omega-3 rich foods like salmon or walnuts. Fiber intake is adequate at ~30g. Overall, this is a well-balanced plan for muscle recovery.",
  shareLink: "https://app.blazklemenc.com/meal/abc123",
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  trainee: sampleTrainee,
};

const minimalEntity = {
  id: "mp-2",
  title: "Basic Plan",
  date: new Date(),
  calories: 1800,
  protein: 140,
  carbs: 180,
  fat: 55,
};

const noAnalysisEntity = {
  id: "mp-3",
  traineeId: "trainee-2",
  title: "Pre-Competition Nutrition",
  description: "Carb loading strategy for the upcoming competition weekend.",
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  calories: 2800,
  protein: 150,
  carbs: 380,
  fat: 70,
  createdAt: new Date(),
  trainee: sampleTrainee,
};

export const Default: Story = {
  args: {
    entity: sampleEntity,
  },
};

export const Loading: Story = {
  args: {
    entity: { title: "", date: new Date(), calories: 0, protein: 0, carbs: 0, fat: 0 },
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    entity: { title: "", date: new Date(), calories: 0, protein: 0, carbs: 0, fat: 0 },
    error: { message: "Failed to load meal plan details." } as Error,
  },
};

export const NotFound: Story = {
  args: {
    entity: { title: "", date: new Date(), calories: 0, protein: 0, carbs: 0, fat: 0 },
  },
};

export const WithoutAIAnalysis: Story = {
  args: {
    entity: noAnalysisEntity,
  },
};

export const AnalysisLoading: Story = {
  args: {
    entity: noAnalysisEntity,
    isAnalyzing: true,
  },
};

export const WithoutShareLink: Story = {
  args: {
    entity: {
      ...sampleEntity,
      shareLink: undefined,
    },
  },
};

export const WithoutTrainee: Story = {
  args: {
    entity: {
      ...sampleEntity,
      trainee: undefined,
    },
  },
};

export const MinimalData: Story = {
  args: {
    entity: minimalEntity,
  },
};

export const HighCaloriePlan: Story = {
  args: {
    entity: {
      ...sampleEntity,
      title: "Bulking Phase Nutrition",
      calories: 3500,
      protein: 220,
      carbs: 450,
      fat: 100,
      description: "High calorie surplus for maximum muscle growth phase.",
      aiAnalysis:
        "Very high calorie intake suitable for aggressive bulking. Protein is adequate at 1.8g/kg. Consider spacing meals 3-4 hours apart for optimal digestion. Monitor weight gain - aim for 0.5-1kg per week maximum to minimize fat gain.",
    },
  },
};

export const LowCaloriePlan: Story = {
  args: {
    entity: {
      ...sampleEntity,
      title: "Cutting Phase Nutrition",
      calories: 1500,
      protein: 180,
      carbs: 100,
      fat: 45,
      description:
        "Moderate deficit for fat loss while preserving muscle mass.",
      aiAnalysis:
        "Sustainable caloric deficit of approximately 500 calories. High protein intake will help preserve muscle mass. Consider adding refeed days every 7-10 days. Monitor energy levels during training and adjust if needed.",
    },
  },
};
