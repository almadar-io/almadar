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
      label: "Downloads",
      items: ["downloads/cli", "downloads/skills"],
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
