import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamingDisplay } from './StreamingDisplay';

const meta: Meta<typeof StreamingDisplay> = {
  title: 'KFlow/Molecules/StreamingDisplay',
  component: StreamingDisplay,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StreamingDisplay>;

export const Loading: Story = {
  args: {
    content: '',
    loadingTitle: 'Generating goal...',
  },
};

export const PartialTitle: Story = {
  args: {
    content: '{"title": "Learn Machine Learning Fundamentals"',
  },
};

export const PartialWithDescription: Story = {
  args: {
    content: `{
  "title": "Learn Machine Learning Fundamentals",
  "description": "A comprehensive journey through the core concepts of ML, from basic algorithms to neural networks."`,
  },
};

export const WithMetadata: Story = {
  args: {
    content: `{
  "title": "Master Python Programming",
  "description": "From beginner to advanced Python development.",
  "type": "skill",
  "target": "professional",
  "estimatedTime": 120`,
  },
};

export const WithMilestones: Story = {
  args: {
    content: `{
  "title": "Complete Web Development Bootcamp",
  "description": "Full-stack web development from HTML to React.",
  "type": "course",
  "target": "career-change",
  "estimatedTime": 200,
  "milestones": [
    {"title": "HTML & CSS Basics", "description": "Learn the fundamentals of web markup"},
    {"title": "JavaScript Essentials", "description": "Master vanilla JavaScript"},
    {"title": "React Framework", "description": "Build modern React applications"}
  ]
}`,
  },
};

export const StreamingMilestones: Story = {
  args: {
    content: `{
  "title": "Data Science Path",
  "description": "Become a data scientist.",
  "milestones": [
    {"title": "Statistics Fundamentals", "description": "Learn probability and statistics"},
    {"title": "Python for Data Science"`,
  },
};

export const CompleteGoal: Story = {
  args: {
    content: JSON.stringify(
      {
        title: 'AI Engineering Certificate',
        description:
          'Complete certification in artificial intelligence and machine learning engineering.',
        type: 'certification',
        target: 'career-advancement',
        estimatedTime: 300,
        milestones: [
          {
            id: 'ml-basics',
            title: 'Machine Learning Basics',
            description: 'Supervised and unsupervised learning',
          },
          {
            id: 'deep-learning',
            title: 'Deep Learning',
            description: 'Neural networks and deep learning frameworks',
          },
          {
            id: 'nlp',
            title: 'Natural Language Processing',
            description: 'Text processing and language models',
          },
          {
            id: 'cv',
            title: 'Computer Vision',
            description: 'Image recognition and object detection',
          },
          {
            id: 'deployment',
            title: 'Model Deployment',
            description: 'Production ML systems and MLOps',
          },
        ],
      },
      null,
      2
    ),
  },
};

export const WithRawToggle: Story = {
  args: {
    content: `{
  "title": "Frontend Development",
  "description": "Modern frontend development skills.",
  "type": "skill",
  "milestones": [
    {"title": "React Fundamentals"}
  ]
}`,
    showRawToggle: true,
  },
};
