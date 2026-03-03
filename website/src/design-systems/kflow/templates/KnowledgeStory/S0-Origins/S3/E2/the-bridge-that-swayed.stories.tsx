import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const storyEntity: KnowledgeStoryEntity = {
  id: 'bridge-sway',
  title: 'The Bridge That Swayed',
  teaser: "London's Millennium Bridge opened to 80,000 pedestrians and immediately started wobbling.",
  domain: 'formal',
  difficulty: 'intermediate',
  duration: 12,
  hookQuestion: 'How can pedestrians make a bridge wobble just by walking on it?',
  hookNarrative: "On June 10, 2000, London's Millennium Bridge opened to the public. Within minutes of the first crowds crossing, the bridge began to sway sideways. Pedestrians grabbed the rails and instinctively adjusted their steps to match the rhythm — which only made it worse. The bridge was closed two days later.",
  scenes: [
    { title: 'Grand Opening', narrative: "The bridge was designed by Lord Foster and Arup. It was the first new Thames crossing in central London in a century. On opening day, 80,000–100,000 people crossed. Engineers had tested for vertical loads and wind. Not synchronized lateral footfall." },
    { title: 'The First Wobble', narrative: 'At 1.3–1.5 people per square meter, the bridge began swaying side to side — up to 70mm of lateral movement. People widened their stance and adjusted their rhythm to keep balance.' },
    { title: 'Synchronized Walking', narrative: "The cruel feedback loop: bridge sways left, pedestrians shift right, synchronizing their footsteps. Hundreds of people stepping in unison pump energy into the bridge at its natural frequency. More sway, more sync, more energy." },
    { title: 'Engineers Investigate', narrative: "The bridge's lateral natural frequency was ~1 Hz — exactly normal walking pace. This coincidence created **synchronous lateral excitation**, a phenomenon barely studied before 2000. The bridge wasn't weak — it was resonant." },
    { title: 'The Damper Solution', narrative: '37 viscous dampers (shock absorbers) and 52 tuned mass dampers (counter-oscillating masses) were installed under the deck, at piers, and at abutments. The bridge reopened in 2002. The wobble was gone.' },
  ],
  principle: 'Resonance and Tuned Mass Dampers',
  explanation: "Resonance occurs when a periodic force matches a structure's natural frequency, amplifying vibrations dramatically.\n\nTuned mass dampers counter this by swinging out of phase, canceling the motion. Viscous dampers bleed energy as heat.",
  pattern: '1. Identify natural frequency\n2. Check for excitation sources at that frequency\n3. Add damping: viscous (absorb energy) or TMD (cancel oscillation)\n4. Verify damped response',
  tryItQuestion: 'A building sways at 0.5 Hz in strong wind. What frequency should a tuned mass damper be tuned to?',
  tryItOptions: [
    '0.5 Hz — match the natural frequency to cancel oscillation',
    '1.0 Hz — double the frequency to overpower it',
    '0.25 Hz — half the frequency to slow it down',
    'Any frequency — dampers work the same regardless',
  ],
  tryItCorrectIndex: 0,
  gameType: 'builder',
  gameConfig: {
    id: 'bridge-damper-blueprint',
    title: 'Design the Damper System',
    description: 'Place the correct damper component in each of 6 critical positions on the Millennium Bridge blueprint.',
    components: [
      { id: 'viscous-deck-north', label: 'Viscous Deck Damper (North)', description: 'Fluid-based shock absorber for the north deck section', category: 'viscous' },
      { id: 'viscous-deck-south', label: 'Viscous Deck Damper (South)', description: 'Fluid-based shock absorber for the south deck section', category: 'viscous' },
      { id: 'tmd-pier-east', label: 'Tuned Mass Damper (East Pier)', description: 'Counter-oscillating mass tuned to 1 Hz for the east pier', category: 'tmd' },
      { id: 'tmd-pier-west', label: 'Tuned Mass Damper (West Pier)', description: 'Counter-oscillating mass tuned to 1 Hz for the west pier', category: 'tmd' },
      { id: 'tmd-abutment-north', label: 'TMD (North Abutment)', description: 'Counter-oscillating mass for the north bank', category: 'tmd' },
      { id: 'tmd-abutment-south', label: 'TMD (South Abutment)', description: 'Counter-oscillating mass for the south bank', category: 'tmd' },
    ],
    slots: [
      { id: 'slot-deck-north', label: 'North Deck Section', description: 'High-traffic area — strongest lateral sway', acceptsComponentId: 'viscous-deck-north' },
      { id: 'slot-deck-south', label: 'South Deck Section', description: 'High-traffic area near Tate Modern', acceptsComponentId: 'viscous-deck-south' },
      { id: 'slot-pier-east', label: 'East Pier Base', description: 'Primary resonance node', acceptsComponentId: 'tmd-pier-east' },
      { id: 'slot-pier-west', label: 'West Pier Base', description: 'Secondary resonance node', acceptsComponentId: 'tmd-pier-west' },
      { id: 'slot-abutment-north', label: 'North Abutment', description: 'Bridge meets north bank', acceptsComponentId: 'tmd-abutment-north' },
      { id: 'slot-abutment-south', label: 'South Abutment', description: 'Bridge meets south bank', acceptsComponentId: 'tmd-abutment-south' },
    ],
    successMessage: 'Viscous dampers on the deck absorb footfall energy. TMDs at piers and abutments cancel resonance. This matches the actual Arup retrofit.',
    failMessage: 'Think about where force is applied (deck) versus structural nodes (piers, abutments).',
    hint: 'Viscous dampers go where people walk. TMDs go at structural connection points.',
  },
  resolution: "The Millennium Bridge reopened in 2002 after a £5 million retrofit. The incident revolutionized pedestrian bridge design worldwide — engineers now routinely test for synchronous lateral excitation.",
  learningPoints: [
    "Resonance amplifies vibrations when a force matches a structure's natural frequency",
    "The bridge's ~1 Hz lateral frequency matched normal walking pace",
    'Synchronized lateral excitation is a crowd phenomenon — the bridge forces people to walk in step',
    'Tuned mass dampers cancel oscillation by moving out of phase',
    'Viscous dampers convert kinetic energy to heat through fluid friction',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S3/E2/The Bridge That Swayed',
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
      gameResult: { score: 100, time: 90, attempts: 3 },
      isComplete: true,
    },
  },
};
