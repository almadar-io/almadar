import type { Meta, StoryObj } from '@storybook/react';
import { GraphLegend, NODE_TYPE_COLORS, EDGE_TYPE_COLORS } from './GraphLegend';

const meta: Meta<typeof GraphLegend> = {
  title: 'KFlow/Molecules/GraphLegend',
  component: GraphLegend,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GraphLegend>;

export const Default: Story = {
  args: {
    items: [
      { id: 'concept', label: 'Concept', color: NODE_TYPE_COLORS.concept },
      { id: 'topic', label: 'Topic', color: NODE_TYPE_COLORS.topic },
      { id: 'skill', label: 'Skill', color: NODE_TYPE_COLORS.skill },
    ],
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Node Types',
    items: [
      { id: 'concept', label: 'Concept', color: NODE_TYPE_COLORS.concept },
      { id: 'topic', label: 'Topic', color: NODE_TYPE_COLORS.topic },
      { id: 'skill', label: 'Skill', color: NODE_TYPE_COLORS.skill },
      { id: 'lesson', label: 'Lesson', color: NODE_TYPE_COLORS.lesson },
    ],
  },
};

export const WithCounts: Story = {
  args: {
    title: 'Graph Elements',
    items: [
      { id: 'concept', label: 'Concepts', color: NODE_TYPE_COLORS.concept, count: 24 },
      { id: 'topic', label: 'Topics', color: NODE_TYPE_COLORS.topic, count: 8 },
      { id: 'skill', label: 'Skills', color: NODE_TYPE_COLORS.skill, count: 15 },
      { id: 'lesson', label: 'Lessons', color: NODE_TYPE_COLORS.lesson, count: 32 },
    ],
  },
};

export const Interactive: Story = {
  args: {
    title: 'Toggle Visibility',
    interactive: true,
    items: [
      { id: 'concept', label: 'Concepts', color: NODE_TYPE_COLORS.concept, visible: true, count: 24 },
      { id: 'topic', label: 'Topics', color: NODE_TYPE_COLORS.topic, visible: true, count: 8 },
      { id: 'skill', label: 'Skills', color: NODE_TYPE_COLORS.skill, visible: false, count: 15 },
      { id: 'lesson', label: 'Lessons', color: NODE_TYPE_COLORS.lesson, visible: true, count: 32 },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Edge Types',
    direction: 'horizontal',
    items: [
      { id: 'prerequisite', label: 'Prerequisite', color: EDGE_TYPE_COLORS.prerequisite },
      { id: 'related', label: 'Related', color: EDGE_TYPE_COLORS.related },
      { id: 'contains', label: 'Contains', color: EDGE_TYPE_COLORS.contains },
      { id: 'references', label: 'References', color: EDGE_TYPE_COLORS.references },
    ],
  },
};

export const EdgeTypes: Story = {
  args: {
    title: 'Connection Types',
    items: [
      { id: 'prerequisite', label: 'Prerequisite', color: EDGE_TYPE_COLORS.prerequisite, count: 45 },
      { id: 'related', label: 'Related', color: EDGE_TYPE_COLORS.related, count: 28 },
      { id: 'contains', label: 'Contains', color: EDGE_TYPE_COLORS.contains, count: 12 },
    ],
  },
};

export const FullGraph: Story = {
  args: {
    title: 'Knowledge Graph Legend',
    interactive: true,
    items: [
      { id: 'concept', label: 'Concept', color: NODE_TYPE_COLORS.concept, visible: true, count: 156 },
      { id: 'topic', label: 'Topic', color: NODE_TYPE_COLORS.topic, visible: true, count: 42 },
      { id: 'skill', label: 'Skill', color: NODE_TYPE_COLORS.skill, visible: true, count: 89 },
      { id: 'lesson', label: 'Lesson', color: NODE_TYPE_COLORS.lesson, visible: true, count: 234 },
      { id: 'quiz', label: 'Quiz', color: NODE_TYPE_COLORS.quiz, visible: false, count: 67 },
      { id: 'resource', label: 'Resource', color: NODE_TYPE_COLORS.resource, visible: true, count: 45 },
    ],
  },
};
