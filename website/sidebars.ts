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
          href: "pathname:///stdlib.html",
        },
        {
          type: "link",
          label: "Behaviors",
          href: "pathname:///behaviors.html",
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
