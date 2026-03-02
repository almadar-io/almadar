import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Overview",
    },
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/introduction"],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "core-concepts/entities",
        "core-concepts/traits",
        "core-concepts/pages",
        "core-concepts/closed-circuit",
        "core-concepts/patterns",
        "core-concepts/standard-library",
      ],
    },
    {
      type: "category",
      label: "Downloads",
      items: ["downloads/cli", "downloads/skills"],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        {
          type: "category",
          label: "Beginner",
          items: [
            "tutorials/beginner/complete-orbital",
            "tutorials/beginner/task-manager",
          ],
        },
        {
          type: "category",
          label: "Intermediate",
          items: [
            "tutorials/intermediate/ui-patterns",
            "tutorials/intermediate/guards",
            "tutorials/intermediate/cross-orbital",
          ],
        },
        {
          type: "category",
          label: "Advanced",
          items: [
            "tutorials/advanced/full-app",
            "tutorials/advanced/ai-generation",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Community",
      items: ["community/contributing"],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/standard-library",
        "reference/behaviors",
      ],
    },
  ],
};

export default sidebars;
