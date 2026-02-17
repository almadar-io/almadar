import type { Meta, StoryObj } from "@storybook/react";
import { StudioHomeElectronTemplate } from "./StudioHomeElectronTemplate";

const meta: Meta<typeof StudioHomeElectronTemplate> = {
  title: "Builder/Templates/StudioHomeElectronTemplate",
  component: StudioHomeElectronTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudioHomeElectronTemplate>;

const mockRecentFiles = [
  {
    path: "/Users/dev/projects/task-manager/schema.orb",
    name: "task-manager.orb",
    lastOpened: "2 hours ago",
  },
  {
    path: "/Users/dev/projects/ecommerce/schema.orb",
    name: "ecommerce.orb",
    lastOpened: "Yesterday",
  },
  {
    path: "/Users/dev/projects/blog/schema.orb",
    name: "blog-platform.orb",
    lastOpened: "3 days ago",
  },
  {
    path: "/Users/dev/projects/fitness/schema.orb",
    name: "fitness-tracker.orb",
    lastOpened: "1 week ago",
  },
  {
    path: "/Users/dev/projects/learning/schema.orb",
    name: "learning-platform.orb",
    lastOpened: "2 weeks ago",
  },
];

export const Default: Story = {
  args: {
    entity: { recentFiles: mockRecentFiles, version: "1.0.0" },
  },
};

export const Empty: Story = {
  args: {
    entity: { recentFiles: [], version: "1.0.0" },
  },
};

export const SingleFile: Story = {
  args: {
    entity: { recentFiles: [mockRecentFiles[0]], version: "1.0.0" },
  },
};

export const ManyFiles: Story = {
  args: {
    entity: {
      recentFiles: [
        ...mockRecentFiles,
        { path: "/path/to/project6.orb", name: "project6.orb", lastOpened: "1 month ago" },
        { path: "/path/to/project7.orb", name: "project7.orb", lastOpened: "1 month ago" },
        { path: "/path/to/project8.orb", name: "project8.orb", lastOpened: "2 months ago" },
      ],
      version: "1.0.0",
    },
  },
};

export const BetaVersion: Story = {
  args: {
    entity: { recentFiles: mockRecentFiles, version: "1.1.0-beta.1" },
  },
};

export const LongPaths: Story = {
  args: {
    entity: {
      recentFiles: [
        {
          path: "/Users/developer/Documents/Projects/Very/Long/Path/To/Project/schema.orb",
          name: "schema.orb",
          lastOpened: "Just now",
        },
        {
          path: "/Users/developer/Desktop/Another/Really/Long/Directory/Structure/project.orb",
          name: "project.orb",
          lastOpened: "1 hour ago",
        },
      ],
      version: "1.0.0",
    },
  },
};
