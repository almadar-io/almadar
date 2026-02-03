import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { NoteListItem, NoteData } from "./NoteListItem";

const meta: Meta<typeof NoteListItem> = {
  title: "KFlow/Molecules/NoteListItem",
  component: NoteListItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NoteListItem>;

const sampleNote: NoteData = {
  id: "note-1",
  title: "Introduction to Photosynthesis",
  content:
    "Photosynthesis is the process by which plants convert light energy into chemical energy. This is fundamental to life on Earth.",
  tags: ["biology", "plants", "energy"],
  level: 0,
  isExpanded: true,
  hasChildren: false,
  updatedAt: "2024-01-15T10:30:00Z",
};

export const Default: Story = {
  args: {
    note: sampleNote,
    isSelected: false,
    onSelect: action("UI:SELECT_NOTE"),
    onDelete: action("UI:DELETE_NOTE"),
    onEdit: action("UI:EDIT_NOTE"),
  },
};

export const Selected: Story = {
  args: {
    note: sampleNote,
    isSelected: true,
    onSelect: action("UI:SELECT_NOTE"),
    onDelete: action("UI:DELETE_NOTE"),
    onEdit: action("UI:EDIT_NOTE"),
  },
};

export const WithChildren: Story = {
  args: {
    note: {
      ...sampleNote,
      hasChildren: true,
      isExpanded: true,
    },
    isSelected: false,
    onSelect: action("UI:SELECT_NOTE"),
    onToggleExpand: action("UI:EXPAND_NOTE"),
    onAddChild: action("UI:ADD_CHILD_NOTE"),
  },
  render: (args) => (
    <NoteListItem {...args}>
      <NoteListItem
        note={{
          id: "child-1",
          title: "Light Reactions",
          content: "The first stage of photosynthesis occurs in the thylakoid.",
          tags: ["detail"],
          level: 1,
        }}
        depth={1}
        onSelect={action("UI:SELECT_NOTE")}
      />
      <NoteListItem
        note={{
          id: "child-2",
          title: "Calvin Cycle",
          content: "The second stage occurs in the stroma.",
          tags: ["detail"],
          level: 1,
        }}
        depth={1}
        onSelect={action("UI:SELECT_NOTE")}
      />
    </NoteListItem>
  ),
};

export const Collapsed: Story = {
  args: {
    note: {
      ...sampleNote,
      hasChildren: true,
      isExpanded: false,
    },
    isSelected: false,
    onToggleExpand: action("UI:EXPAND_NOTE"),
  },
};

export const LongContent: Story = {
  args: {
    note: {
      ...sampleNote,
      content:
        "This is a much longer note content that demonstrates how the component handles text that exceeds the preview limit. The content will be truncated in the default view mode and only show the first 100 characters followed by an ellipsis to indicate there is more content available.",
    },
    showFullContent: false,
    onSelect: action("UI:SELECT_NOTE"),
  },
};

export const FullContent: Story = {
  args: {
    note: {
      ...sampleNote,
      content:
        "This is a much longer note content that demonstrates how the component handles text when showFullContent is true. All of the content will be displayed without truncation.",
    },
    showFullContent: true,
    onSelect: action("UI:SELECT_NOTE"),
  },
};

export const NoTags: Story = {
  args: {
    note: {
      ...sampleNote,
      tags: [],
    },
    onSelect: action("UI:SELECT_NOTE"),
  },
};

export const ManyTags: Story = {
  args: {
    note: {
      ...sampleNote,
      tags: ["biology", "plants", "energy", "chlorophyll", "glucose", "oxygen", "carbon-dioxide"],
    },
    onSelect: action("UI:SELECT_NOTE"),
  },
};

export const EmptyContent: Story = {
  args: {
    note: {
      ...sampleNote,
      content: "",
    },
    onSelect: action("UI:SELECT_NOTE"),
  },
};

export const NestedHierarchy: Story = {
  render: () => (
    <div className="space-y-2">
      <NoteListItem
        note={{
          id: "root",
          title: "Root Note",
          content: "This is the top level note.",
          hasChildren: true,
          isExpanded: true,
        }}
        depth={0}
        onSelect={action("select-root")}
        onToggleExpand={action("expand-root")}
      >
        <NoteListItem
          note={{
            id: "level-1",
            title: "Level 1 Note",
            content: "First level child.",
            hasChildren: true,
            isExpanded: true,
          }}
          depth={1}
          onSelect={action("select-level-1")}
          onToggleExpand={action("expand-level-1")}
        >
          <NoteListItem
            note={{
              id: "level-2",
              title: "Level 2 Note",
              content: "Second level child.",
              hasChildren: false,
            }}
            depth={2}
            onSelect={action("select-level-2")}
          />
        </NoteListItem>
      </NoteListItem>
    </div>
  ),
};
