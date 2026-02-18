import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { NoteContent } from "./NoteContent";

const meta: Meta<typeof NoteContent> = {
  title: "KFlow/Molecules/NoteContent",
  component: NoteContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NoteContent>;

export const Default: Story = {
  args: {
    noteId: "note-1",
    content:
      "This is a sample note content. It can contain detailed information about the topic being studied.",
    showFullContent: true,
    onSave: action("UI:SAVE_NOTE_CONTENT"),
    onStartEditing: action("UI:EDIT_NOTE_CONTENT"),
  },
};

export const Truncated: Story = {
  args: {
    noteId: "note-2",
    content:
      "This is a much longer note content that will be truncated in the preview mode. It contains extensive information that the user has written about the topic. The full content would be shown when clicked to edit.",
    showFullContent: false,
    previewLength: 100,
    onSave: action("UI:SAVE_NOTE_CONTENT"),
  },
};

export const Editing: Story = {
  args: {
    noteId: "note-3",
    content: "Edit this content...",
    isEditing: true,
    onChange: action("onChange"),
    onSave: action("UI:SAVE_NOTE_CONTENT"),
    onCancel: action("onCancel"),
  },
};

export const Empty: Story = {
  args: {
    noteId: "note-4",
    content: "",
    placeholder: "Start writing your notes here...",
    onSave: action("UI:SAVE_NOTE_CONTENT"),
  },
};

export const LongContent: Story = {
  args: {
    noteId: "note-5",
    content: `# Photosynthesis Notes

Photosynthesis is the process by which plants convert light energy into chemical energy.

## Key Points:
1. Takes place in chloroplasts
2. Uses water and carbon dioxide
3. Produces glucose and oxygen

## The Light Reactions
- Occur in thylakoid membranes
- Convert light energy to ATP and NADPH
- Split water molecules (photolysis)

## The Calvin Cycle
- Occurs in the stroma
- Uses ATP and NADPH from light reactions
- Fixes CO2 into glucose

## Important Equations
6CO2 + 6H2O + light energy → C6H12O6 + 6O2`,
    showFullContent: true,
    rows: 10,
    onSave: action("UI:SAVE_NOTE_CONTENT"),
  },
};

export const CustomPreviewLength: Story = {
  args: {
    noteId: "note-6",
    content:
      "This content will be truncated at a custom length. Only the first 50 characters will be shown in preview mode.",
    showFullContent: false,
    previewLength: 50,
    onSave: action("UI:SAVE_NOTE_CONTENT"),
  },
};
