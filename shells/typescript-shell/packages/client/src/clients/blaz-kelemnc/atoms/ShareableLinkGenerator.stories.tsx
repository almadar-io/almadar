import type { Meta, StoryObj } from "@storybook/react";
import { ShareableLinkGenerator } from "./ShareableLinkGenerator";

const meta: Meta<typeof ShareableLinkGenerator> = {
  title: "Blaz-Klemenc/Atoms/ShareableLinkGenerator",
  component: ShareableLinkGenerator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareableLinkGenerator>;

export const Default: Story = {
  args: {
    resourceType: "MealPlan",
    resourceId: "mp-123",
  },
};

export const WithExistingLink: Story = {
  args: {
    resourceType: "MealPlan",
    resourceId: "mp-456",
    existingLink: "https://app.blazklemenc.com/share/meal-plan/abc123xyz",
  },
};

export const SessionLink: Story = {
  args: {
    resourceType: "TrainingSession",
    resourceId: "ts-789",
    existingLink: "https://app.blazklemenc.com/share/session/def456uvw",
  },
};

export const Compact: Story = {
  args: {
    resourceType: "MealPlan",
    resourceId: "mp-compact",
    existingLink: "https://app.blazklemenc.com/share/xyz",
    compact: true,
  },
};

export const WithExpiration: Story = {
  args: {
    resourceType: "MealPlan",
    resourceId: "mp-expire",
    expiresInDays: 7,
  },
};
