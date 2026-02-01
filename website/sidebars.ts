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
      label: "Reference",
      items: [
        {
          type: "link",
          label: "Standard Library",
          href: "/stdlib.html",
        },
        {
          type: "link",
          label: "Behaviors",
          href: "/behaviors.html",
        },
      ],
    },
    {
      type: "category",
      label: "Community",
      items: ["community/contributing"],
    },
  ],
};

export default sidebars;
