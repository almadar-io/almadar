import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const CDN = 'https://almadar-kflow-assets.web.app';

const storyEntity: KnowledgeStoryEntity = {
  id: 'mars-bug',
  title: 'The $125 Million Bug',
  teaser: 'How a unit conversion error destroyed a Mars orbiter',
  domain: 'science',
  difficulty: 'beginner',
  duration: 12,
  coverImage: `${CDN}/stories/the-125-million-bug/cover.png`,
  hookQuestion: 'Why did NASA lose a $125 million Mars orbiter?',
  hookNarrative: 'In 1999, the Mars Climate Orbiter approached the Red Planet after a 9-month journey. Mission control held their breath. Then — silence. The spacecraft was gone. The investigation revealed a mistake so simple, it could fit on a post-it note.',
  scenes: [
    { title: 'Two Teams, One Mission', narrative: "At Lockheed Martin in Denver, engineers built the spacecraft's thruster software. At NASA's Jet Propulsion Laboratory in Pasadena, navigators plotted its course. Both teams were brilliant. But they made one critical assumption about each other.", illustration: `${CDN}/stories/the-125-million-bug/scenes/scene-1.png` },
    { title: 'The Launch', narrative: 'December 11, 1998. The Mars Climate Orbiter launched perfectly. For nine months, it sailed through space, sending back data. The navigation team noticed small course deviations, but nothing alarming — they corrected with thruster burns.', illustration: `${CDN}/stories/the-125-million-bug/scenes/scene-2.png` },
    { title: 'Something Wrong', narrative: 'As the orbiter approached Mars, the deviations grew. Each thruster correction seemed slightly off. The navigation team ran their models again and again. The math was right. The data was clean. But the trajectory kept drifting.', illustration: `${CDN}/stories/the-125-million-bug/scenes/scene-3.png` },
    { title: 'Impact', narrative: "On September 23, 1999, the orbiter began its insertion burn behind Mars. It never emerged. The spacecraft had descended to just 57 km above the surface — far below the 226 km planned orbit. Mars' atmosphere tore it apart.", illustration: `${CDN}/stories/the-125-million-bug/scenes/scene-4.png` },
    { title: 'The Post-it Note', narrative: "The investigation team found the bug in days. Lockheed's software output thruster force in **pound-force seconds**. NASA's navigation system expected **newton seconds**. One team used Imperial. The other used metric. Nobody checked. 1 lbf·s = 4.448 N·s. That factor of 4.448 cost $125 million.", illustration: `${CDN}/stories/the-125-million-bug/scenes/scene-5.png` },
  ],
  principle: 'Dimensional Analysis — Always Track Your Units',
  explanation: "Every physical quantity has **dimensions** (length, mass, time, force). When you combine quantities in equations, the dimensions must be consistent on both sides.\n\n**The rule is simple**: if the units don't match, the answer is wrong — no matter how good the math is.\n\nDimensional analysis catches errors *before* they become disasters.",
  pattern: '**Before combining values from different sources:**\n1. Identify the units of each value\n2. Convert all values to a common unit system\n3. Verify dimensional consistency\n4. Document the unit convention',
  tryItQuestion: 'A European car spec lists fuel efficiency as 5.9 L/100km. An American rental site shows 40 MPG. Which is more efficient?',
  tryItOptions: [
    'The European car (5.9 L/100km)',
    'The American car (40 MPG)',
    'They are approximately equal',
    'Cannot compare without conversion',
  ],
  tryItCorrectIndex: 2,
  gameType: 'sequencer',
  gameConfig: {
    id: 'mars-fix',
    title: 'Fix the Trajectory',
    description: 'Arrange the steps in the correct order to fix the unit conversion error.',
    availableActions: [
      { id: 'identify', name: 'Identify Mismatch', category: 'analysis', iconEmoji: '🔍', description: 'Identify the unit mismatch (lbf·s vs N·s)' },
      { id: 'convert', name: 'Convert to SI', category: 'conversion', iconEmoji: '🔄', description: 'Convert all values to SI (newton-seconds)' },
      { id: 'recalculate', name: 'Recalculate', category: 'compute', iconEmoji: '🧮', description: 'Recalculate the trajectory correction' },
      { id: 'verify', name: 'Verify Altitude', category: 'validation', iconEmoji: '✅', description: 'Verify orbit insertion altitude (226 km)' },
    ],
    maxSlots: 4,
    allowDuplicates: false,
    solutions: [['identify', 'convert', 'recalculate', 'verify']],
    successMessage: 'Mission saved! The orbiter enters a stable orbit at 226 km.',
    failMessage: 'The trajectory is still off. Try a different order.',
    hint: 'First find the problem, then fix the units before recalculating.',
  },
  assets: {
    terrain: {},
    effects: {
      star: Array.from({ length: 9 }, (_, i) => `${CDN}/shared/effects/particles/star_0${i + 1}.png`),
    },
    worldMapFeatures: {},
    audio: {
      music: `${CDN}/shared/audio/music/alpha-dance.ogg`,
      sfx: {
        stepAdvance: `${CDN}/shared/audio/sfx/confirmation_001.ogg`,
        correctAnswer: `${CDN}/shared/audio/sfx/jingles-hit_00.ogg`,
        wrongAnswer: `${CDN}/shared/audio/sfx/error_001.ogg`,
        gameComplete: `${CDN}/shared/audio/sfx/upgrade1.ogg`,
        cardPlace: `${CDN}/shared/audio/sfx/card-slide-1.ogg`,
        uiClick: `${CDN}/shared/audio/sfx/select_001.ogg`,
      },
    },
  },
  resolution: 'You just proved you could have caught the bug that destroyed the Mars Climate Orbiter. The fix was simple — a unit conversion check that any engineer could implement. NASA now mandates dimensional analysis reviews on every mission. The $125 million lesson changed spaceflight forever.',
  learningPoints: [
    'Every physical quantity has dimensions that must be tracked',
    'Unit mismatches are the most common source of engineering disasters',
    'Dimensional analysis is a cheap, reliable error-catching technique',
    'Always document and verify unit conventions at system boundaries',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S4/E2/The 125 Million Bug',
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Hook: Story = { args: { entity: { ...storyEntity, currentStep: 0 } } };
export const Narrative: Story = { args: { entity: { ...storyEntity, currentStep: 1 } } };
export const Lesson: Story = { args: { entity: { ...storyEntity, currentStep: 2 } } };
export const Game: Story = { args: { entity: { ...storyEntity, currentStep: 3 } } };
export const Reward: Story = {
  args: {
    entity: {
      ...storyEntity,
      currentStep: 4,
      gameResult: { score: 100, time: 45, attempts: 2 },
      isComplete: true,
    },
  },
};
