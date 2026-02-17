import type { Meta, StoryObj } from "@storybook/react";
import { GitHubRepoPicker } from "./GitHubRepoPicker";

/**
 * GitHubRepoPicker requires a live GitHub API connection via
 * `useGitHubRepos` and `useGitHubBranches` hooks from `@almadar/ui/hooks`.
 * In Storybook, the dropdowns will show "Loading repositories..." until
 * the hooks resolve (which requires a valid GitHub token in context).
 */
const meta: Meta<typeof GitHubRepoPicker> = {
  title: "Builder/Molecules/GitHubRepoPicker",
  component: GitHubRepoPicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "GitHub repository and branch picker. Requires a live GitHub API connection " +
          "to populate dropdowns. In Storybook without a GitHub token, the selects will " +
          "remain in their loading/empty state.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GitHubRepoPicker>;

export const Default: Story = {
  args: {
    onRepoSelect: () => {},
    onBranchSelect: () => {},
  },
};
