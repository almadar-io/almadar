import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { NoteList } from "./NoteList";
import { NoteData } from "../molecules/NoteListItem";

const meta: Meta<typeof NoteList> = {
  title: "KFlow/Organisms/NoteList",
  component: NoteList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NoteList>;

const sampleNotes: NoteData[] = [
  {
    id: "note-1",
    title: "Photosynthesis Overview",
    content:
      "The process by which plants convert light energy into chemical energy.",
    tags: ["biology", "plants"],
    level: 0,
    hasChildren: true,
    isExpanded: true,
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "note-2",
    title: "Light Reactions",
    content: "Occurs in the thylakoid membrane. Produces ATP and NADPH.",
    tags: ["detail"],
    level: 1,
    hasChildren: false,
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "note-3",
    title: "Calvin Cycle",
    content: "Occurs in the stroma. Uses ATP and NADPH to fix CO2.",
    tags: ["detail"],
    level: 1,
    hasChildren: false,
    updatedAt: "2024-01-15T11:30:00Z",
  },
  {
    id: "note-4",
    title: "Cellular Respiration",
    content: "The reverse process - converting glucose back to energy.",
    tags: ["biology", "energy"],
    level: 0,
    hasChildren: false,
    updatedAt: "2024-01-16T09:00:00Z",
  },
];

export const Default: Story = {
  args: {
    notes: sampleNotes,
    selectedNoteId: undefined,
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE"),
    onEditNote: action("UI:EDIT_NOTE"),
    onToggleExpand: action("UI:EXPAND_NOTE"),
    onAddChild: action("UI:ADD_CHILD_NOTE"),
  },
};

export const WithSelection: Story = {
  args: {
    notes: sampleNotes,
    selectedNoteId: "note-2",
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE"),
    onEditNote: action("UI:EDIT_NOTE"),
  },
};

export const Loading: Story = {
  args: {
    notes: [],
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    notes: [],
    error: new globalThis.Error("Failed to load notes. Please try again."),
  },
};

export const Empty: Story = {
  args: {
    notes: [],
    emptyMessage:
      "No notes found. Click the button above to create your first note!",
  },
};

export const FlatList: Story = {
  args: {
    notes: [
      {
        id: "flat-1",
        title: "First Note",
        content: "This is the first note in a flat list.",
        tags: ["general"],
        level: 0,
      },
      {
        id: "flat-2",
        title: "Second Note",
        content: "This is the second note.",
        tags: ["general"],
        level: 0,
      },
      {
        id: "flat-3",
        title: "Third Note",
        content: "This is the third note.",
        tags: ["general"],
        level: 0,
      },
    ],
    onSelectNote: action("UI:SELECT_NOTE"),
  },
};

export const ManyNotes: Story = {
  args: {
    notes: Array.from({ length: 10 }, (_, i) => ({
      id: `note-${i}`,
      title: `Note ${i + 1}`,
      content: `This is the content of note ${i + 1}. It contains some sample text.`,
      tags: i % 2 === 0 ? ["even"] : ["odd"],
      level: 0,
      hasChildren: false,
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    })),
    onSelectNote: action("UI:SELECT_NOTE"),
    onDeleteNote: action("UI:DELETE_NOTE"),
  },
};

export const ShowFullContent: Story = {
  args: {
    notes: [
      {
        id: "long-1",
        title: "Detailed Notes",
        content: `# Photosynthesis

Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy.

## Key Components
- Chlorophyll (green pigment)
- Water (H2O)
- Carbon dioxide (CO2)
- Sunlight

## The Process
1. Light absorption by chlorophyll
2. Water splitting (photolysis)
3. Carbon fixation (Calvin cycle)

## Equation
6CO2 + 6H2O + light → C6H12O6 + 6O2`,
        tags: ["biology", "comprehensive"],
        level: 0,
      },
    ],
    showFullContent: true,
    onSelectNote: action("UI:SELECT_NOTE"),
  },
};
