import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ErrorAlert } from "./ErrorAlert";

const meta: Meta<typeof ErrorAlert> = {
  title: "Builder/Molecules/Agent/ErrorAlert",
  component: ErrorAlert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorAlert>;

export const Default: Story = {
  args: {
    message: "Something went wrong",
  },
};

export const WithCode: Story = {
  args: {
    message: "Internal server error occurred while processing the request",
    code: "ERR_500",
  },
};

export const WithRetry: Story = {
  args: {
    message: "Failed to connect to the server",
    onRetry: fn(),
  },
};

export const WithDismiss: Story = {
  args: {
    message: "The operation could not be completed",
    onDismiss: fn(),
  },
};

export const WithAll: Story = {
  args: {
    message: "Schema compilation failed due to invalid trait reference",
    code: "COMPILE_ERR_042",
    onRetry: fn(),
    onDismiss: fn(),
  },
};
