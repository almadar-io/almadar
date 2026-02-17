import type { Meta, StoryObj } from "@storybook/react";
import { ProgressChart, ChartDataPoint } from "./ProgressChart";

const meta: Meta<typeof ProgressChart> = {
  title: "Blaz-Klemenc/Molecules/ProgressChart",
  component: ProgressChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressChart>;

// Generate sample data for weight progress
const weightProgressData: ChartDataPoint[] = [
  { date: "2024-01-01", value: 85, label: "Weight (kg)" },
  { date: "2024-01-08", value: 84.5, label: "Weight (kg)" },
  { date: "2024-01-15", value: 84, label: "Weight (kg)" },
  { date: "2024-01-22", value: 83.2, label: "Weight (kg)" },
  { date: "2024-01-29", value: 82.8, label: "Weight (kg)" },
  { date: "2024-02-05", value: 82.5, label: "Weight (kg)" },
];

// Lift progress data
const liftProgressData: ChartDataPoint[] = [
  { date: "2024-01-01", value: 80, label: "Squat (kg)" },
  { date: "2024-01-08", value: 85, label: "Squat (kg)" },
  { date: "2024-01-15", value: 87.5, label: "Squat (kg)" },
  { date: "2024-01-22", value: 90, label: "Squat (kg)" },
  { date: "2024-01-29", value: 92.5, label: "Squat (kg)" },
  { date: "2024-02-05", value: 95, label: "Squat (kg)" },
];

// Wellness score data
const wellnessData: ChartDataPoint[] = [
  { date: "2024-01-01", value: 7, label: "Wellness Score" },
  { date: "2024-01-02", value: 6, label: "Wellness Score" },
  { date: "2024-01-03", value: 8, label: "Wellness Score" },
  { date: "2024-01-04", value: 7, label: "Wellness Score" },
  { date: "2024-01-05", value: 9, label: "Wellness Score" },
  { date: "2024-01-06", value: 8, label: "Wellness Score" },
  { date: "2024-01-07", value: 7, label: "Wellness Score" },
];

export const Default: Story = {
  args: {
    data: weightProgressData,
    metric: "Weight Progress",
    unit: "kg",
  },
};

export const LiftProgress: Story = {
  args: {
    data: liftProgressData,
    metric: "Squat Progress",
    unit: "kg",
    chartType: "line",
  },
};

export const BarChart: Story = {
  args: {
    data: wellnessData,
    metric: "Weekly Wellness",
    chartType: "bar",
  },
};

export const WithUnit: Story = {
  args: {
    data: weightProgressData,
    metric: "Body Weight",
    unit: "kg",
  },
};

export const WeekDateRange: Story = {
  args: {
    data: wellnessData,
    metric: "Wellness Score",
    dateRange: "week",
  },
};

export const MonthDateRange: Story = {
  args: {
    data: liftProgressData,
    metric: "Lift Tracking",
    unit: "kg",
    dateRange: "month",
  },
};

export const WithDateSelector: Story = {
  args: {
    data: weightProgressData,
    metric: "Weight Over Time",
    unit: "kg",
    showDateSelector: true,
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
    metric: "No Data Yet",
  },
};

export const SingleDataPoint: Story = {
  args: {
    data: [{ date: "2024-01-15", value: 85, label: "Starting Weight" }],
    metric: "Initial Measurement",
    unit: "kg",
  },
};
