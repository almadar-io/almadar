import type { Meta, StoryObj } from "@storybook/react";
import { RuntimeLoading, RuntimeError, RuntimeEmpty } from "./RuntimeStates";

// =============================================================================
// RuntimeLoading
// =============================================================================

const loadingMeta: Meta<typeof RuntimeLoading> = {
  title: "Builder/Molecules/RuntimeLoading",
  component: RuntimeLoading,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default loadingMeta;
type LoadingStory = StoryObj<typeof RuntimeLoading>;

export const Loading: LoadingStory = {
  args: {},
};

export const LoadingWithMessage: LoadingStory = {
  args: {
    message: "Compiling orbital schema...",
  },
};

export const LoadingFullScreen: LoadingStory = {
  parameters: { layout: "fullscreen" },
  args: {
    message: "Initializing runtime environment...",
    fullScreen: true,
  },
};

// =============================================================================
// RuntimeError
// =============================================================================

export const Error: StoryObj<typeof RuntimeError> = {
  render: (args) => <RuntimeError {...args} />,
  args: {
    message: "Failed to compile schema. Check your orbital definition.",
  },
};

export const ErrorWarning: StoryObj<typeof RuntimeError> = {
  render: (args) => <RuntimeError {...args} />,
  args: {
    title: "Deprecation Notice",
    message: "The 'view' trait category is deprecated. Use 'interaction' instead.",
    variant: "warning",
  },
};

export const ErrorWithDetail: StoryObj<typeof RuntimeError> = {
  render: (args) => <RuntimeError {...args} />,
  args: {
    title: "Connection Failed",
    message: "Could not reach the compilation server.",
    detail: "POST https://api.almadar.dev/compile returned 502 Bad Gateway",
    variant: "error",
  },
};

// =============================================================================
// RuntimeEmpty
// =============================================================================

export const Empty: StoryObj<typeof RuntimeEmpty> = {
  render: (args) => <RuntimeEmpty {...args} />,
  args: {
    title: "No Traits Found",
  },
};

export const EmptyWithDescription: StoryObj<typeof RuntimeEmpty> = {
  render: (args) => <RuntimeEmpty {...args} />,
  args: {
    title: "No Pages Defined",
    description:
      "This orbital schema has no pages. Add a page with a path and trait references to see the runtime preview.",
  },
};
