import type { Meta, StoryObj } from "@storybook/react";
import { AIAnalysisPanel, AIAnalysisData } from "./AIAnalysisPanel";

const meta: Meta<typeof AIAnalysisPanel> = {
  title: "Blaz-Klemenc/Organisms/AIAnalysisPanel",
  component: AIAnalysisPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showRegenerate: {
      control: "boolean",
      description: "Show regenerate button",
    },
    isLoading: {
      control: "boolean",
      description: "Is analysis being regenerated",
    },
    compact: {
      control: "boolean",
      description: "Use compact display mode",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AIAnalysisPanel>;

// Sample analysis data
const fullAnalysis: AIAnalysisData = {
  id: "analysis-1",
  resourceType: "MealPlan",
  resourceId: "meal-plan-1",
  content:
    "Based on the nutritional data and training schedule, this meal plan provides adequate protein intake (1.8g/kg body weight) and is well-timed around workout sessions. The carbohydrate distribution supports training intensity while maintaining a moderate caloric deficit for body composition goals.",
  recommendations: [
    "Consider adding a pre-workout snack 1-2 hours before evening sessions",
    "Increase vegetable intake at lunch for better micronutrient balance",
    "Add omega-3 rich foods like salmon or walnuts twice per week",
    "Consider a casein protein source before bed for overnight recovery",
  ],
  warnings: [
    "Fiber intake is below recommended 25g/day - may affect digestive health",
    "Vitamin D levels may be insufficient - consider supplementation or sun exposure",
  ],
  highlights: [
    "Excellent protein distribution across meals",
    "Good hydration protocol with 3L daily target",
    "Meal timing aligns well with training schedule",
  ],
  generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  confidence: 0.87,
};

const minimalAnalysis: AIAnalysisData = {
  id: "analysis-2",
  resourceType: "ProgressEntry",
  resourceId: "progress-1",
  content:
    "Your progress over the last 4 weeks shows consistent improvement in strength metrics. Upper body lifts have increased by an average of 8%, while lower body shows a 12% improvement.",
  generatedAt: new Date(),
  confidence: 0.92,
};

const analysisWithWarnings: AIAnalysisData = {
  id: "analysis-3",
  resourceType: "TrainingSession",
  resourceId: "session-1",
  content:
    "Analysis of your recent training session reveals some areas that need attention for optimal progress and injury prevention.",
  warnings: [
    "Form breakdown observed during heavy squats - consider deload week",
    "RPE consistently exceeding target - risk of overtraining",
    "Recovery time between sets is too short for strength gains",
    "Left-right imbalance detected in single-leg movements",
  ],
  generatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
  confidence: 0.78,
};

const analysisWithHighlights: AIAnalysisData = {
  id: "analysis-4",
  resourceType: "User",
  resourceId: "user-1",
  content:
    "Excellent work this month! Your dedication to the program is showing clear results across multiple metrics.",
  highlights: [
    "100% session attendance rate this month",
    "Personal record in deadlift: 140kg",
    "Body fat reduced by 2.3%",
    "Sleep quality improved by 18%",
    "Consistency score at all-time high: 95%",
  ],
  generatedAt: new Date(),
  confidence: 0.95,
};

export const Default: Story = {
  args: {
    analysis: fullAnalysis,
    showRegenerate: true,
    isLoading: false,
    compact: false,
  },
};

export const Compact: Story = {
  args: {
    analysis: fullAnalysis,
    compact: true,
  },
};

export const Loading: Story = {
  args: {
    analysis: fullAnalysis,
    showRegenerate: true,
    isLoading: true,
  },
};

export const NoRegenerate: Story = {
  args: {
    analysis: fullAnalysis,
    showRegenerate: false,
  },
};

export const Minimal: Story = {
  args: {
    analysis: minimalAnalysis,
    showRegenerate: true,
  },
};

export const WithWarnings: Story = {
  args: {
    analysis: analysisWithWarnings,
    showRegenerate: true,
  },
};

export const WithHighlights: Story = {
  args: {
    analysis: analysisWithHighlights,
    showRegenerate: true,
  },
};

export const LowConfidence: Story = {
  args: {
    analysis: {
      ...fullAnalysis,
      confidence: 0.45,
      content:
        "Limited data available for comprehensive analysis. Consider logging more sessions and meals for better insights.",
    },
    showRegenerate: true,
  },
};

export const HighConfidence: Story = {
  args: {
    analysis: {
      ...fullAnalysis,
      confidence: 0.98,
    },
    showRegenerate: true,
  },
};
