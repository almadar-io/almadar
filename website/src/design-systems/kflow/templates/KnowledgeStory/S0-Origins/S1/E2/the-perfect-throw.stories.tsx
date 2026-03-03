import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const CDN = 'https://almadar-kflow-assets.web.app';

const storyEntity: KnowledgeStoryEntity = {
  id: 'the-perfect-throw',
  title: 'The Perfect Throw',
  teaser: 'At what angle should you throw a ball to make it go the farthest?',
  domain: 'science',
  difficulty: 'beginner',
  duration: 10,
  coverImage: `${CDN}/stories/the-perfect-throw/cover.png`,
  hookQuestion: 'At what angle should you throw a ball to make it go the farthest?',
  hookNarrative: "Galileo Galilei rolled balls down ramps in Pisa. He discovered that a thrown ball traces a perfect parabola — the same curve whether you're throwing a basketball or launching a cannonball. The optimal angle is neither straight up nor nearly flat. The answer is a beautiful 45°, and it comes from a surprising trade-off.",
  scenes: [
    { title: "Galileo's Ramps", narrative: "In the 1590s, Galileo rolled bronze balls down inclined planes in Pisa. He timed them with a water clock — counting drips as the balls accelerated. His discovery: falling objects accelerate uniformly, regardless of mass. And horizontal and vertical motion are independent.", illustration: `${CDN}/stories/the-perfect-throw/scenes/scene-1.png` },
    { title: 'Two Motions, One Trajectory', narrative: 'A thrown ball moves horizontally at constant speed AND falls vertically under gravity. These two independent motions combine into a parabola. The horizontal range depends on both components: throw too steeply and the ball goes high but not far. Throw too flat and it hits the ground before gaining distance.', illustration: `${CDN}/stories/the-perfect-throw/scenes/scene-2.png` },
    { title: 'The Angle Trade-off', narrative: "Throw straight up (90°): maximum height, zero range. Throw flat (0°): maximum horizontal speed, but gravity pulls it down instantly. The optimum balances both: 45° gives equal horizontal and vertical velocity components.", illustration: `${CDN}/stories/the-perfect-throw/scenes/scene-3.png` },
    { title: 'The Range Equation', narrative: "Range = v² sin(2θ) / g. At 45°, sin(90°) = 1, the maximum possible value. Doubling the velocity quadruples the range. On the Moon (g = 1.62 m/s²), you'd throw 6x farther than on Earth.", illustration: `${CDN}/stories/the-perfect-throw/scenes/scene-4.png` },
    { title: 'Real-World Complications', narrative: "Air resistance breaks the 45° rule. Baseballs peak at ~35° because drag slows them more at high altitudes. Golf balls at ~12° because backspin creates lift. Javelin throwers aim for ~30°.", illustration: `${CDN}/stories/the-perfect-throw/scenes/scene-5.png` },
  ],
  principle: 'Projectile Motion and Optimization',
  explanation: "Projectile motion decomposes into:\n- Horizontal: constant velocity (v₀ cos θ)\n- Vertical: accelerating under gravity (v₀ sin θ − gt)\n\nRange R = v² sin(2θ) / g. Maximum at θ = 45°. This is an optimization problem: finding the input (angle) that maximizes the output (range).",
  pattern: '1. Decompose motion into independent components\n2. Write the range equation as a function of angle\n3. Find the angle that maximizes range (45° in vacuum)\n4. Test with a simulation to verify\n5. Adjust for real-world factors',
  tryItQuestion: "On the Moon, gravity is 1.62 m/s² (vs Earth's 9.81). If you throw a ball at 45° with the same speed, how does the range change?",
  tryItOptions: [
    'About 6x farther — range is inversely proportional to gravity',
    "The same — angle matters more than gravity",
    'About 2x farther — gravity has a square root effect',
    "Shorter — there's no atmosphere to provide lift",
  ],
  tryItCorrectIndex: 0,
  gameType: 'physics-lab',
  gameConfig: {
    preset: {
      id: 'projectile-challenge',
      name: 'Hit the Target',
      description: 'Adjust launch angle and velocity to land the ball on the target platform at 250m.',
      domain: 'natural',
      gravity: { x: 0, y: 9.81 },
      bodies: [
        { id: 'ball', x: 50, y: 350, vx: 80, vy: -120, mass: 1, radius: 10, color: '#e94560', fixed: false },
        { id: 'ground', x: 300, y: 390, vx: 0, vy: 0, mass: 1000, radius: 400, color: '#333', fixed: true },
      ],
      showVelocity: true,
      parameters: {
        angle: { value: 30, min: 0, max: 90, step: 1, label: 'Launch angle (deg)' },
        velocity: { value: 80, min: 10, max: 200, step: 5, label: 'Initial velocity (m/s)' },
      },
    },
    targetLabel: 'Horizontal Range',
    targetValue: 250,
    tolerance: 20,
    measurementLabel: 'Range',
    measurementUnit: 'm',
  },
  assets: {
    terrain: {},
    effects: {
      spark: Array.from({ length: 7 }, (_, i) => `${CDN}/shared/effects/particles/spark_0${i + 1}.png`),
    },
    worldMapFeatures: {},
    audio: {
      music: `${CDN}/shared/audio/music/alpha-dance.ogg`,
      sfx: {
        stepAdvance: `${CDN}/shared/audio/sfx/confirmation_001.ogg`,
        correctAnswer: `${CDN}/shared/audio/sfx/jingles-hit_00.ogg`,
        wrongAnswer: `${CDN}/shared/audio/sfx/error_001.ogg`,
        gameComplete: `${CDN}/shared/audio/sfx/upgrade1.ogg`,
        uiClick: `${CDN}/shared/audio/sfx/select_001.ogg`,
      },
    },
  },
  resolution: "At 45°, the ball reaches maximum range. Galileo discovered this by rolling balls down ramps in Pisa. Four centuries later, it guides everything from basketball shots to satellite launches. The optimization principle — finding the input that maximizes output — is one of the most powerful ideas in all of science and engineering.",
  learningPoints: [
    'Projectile motion has two independent components: horizontal (constant) and vertical (accelerating)',
    'The range equation R = v²sin(2θ)/g shows that 45° gives maximum range in vacuum',
    'Doubling velocity quadruples range (v² relationship)',
    'Air resistance lowers the optimal angle in practice (35° for baseballs, ~12° for golf)',
    'This is an optimization problem: finding the input that maximizes output',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S1/E2/The Perfect Throw',
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
      gameResult: { score: 95, time: 82, attempts: 3 },
      isComplete: true,
    },
  },
};
