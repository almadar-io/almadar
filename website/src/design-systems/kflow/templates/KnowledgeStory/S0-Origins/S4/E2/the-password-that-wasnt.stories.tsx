import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const storyEntity: KnowledgeStoryEntity = {
  id: 'password-wasnt',
  title: "The Password That Wasn't",
  teaser: 'A hacker breaks into a "secure" system in 3 minutes. The password was 12 characters long.',
  domain: 'formal',
  difficulty: 'intermediate',
  duration: 12,
  hookQuestion: 'If your password is strong, why can a hacker still crack it in minutes?',
  hookNarrative: "A security auditor sits down at a terminal. The admin assures her their passwords are military grade — 12 characters, mixed case, numbers, symbols. She runs a single command. Three minutes later she's logged in as the CEO. The password wasn't weak. The system's handling of it was.",
  scenes: [
    { title: 'The Breach', narrative: 'She exploited how the system **stored** passwords. The database had a column of MD5 hashes: `5f4dcc3b5aa765d61d8327deb882cf99`. This was supposed to be secure.' },
    { title: 'Rainbow Tables', narrative: "MD5 hashes are fast to compute. Someone already hashed every common password into massive lookup tables called **rainbow tables**. She didn't crack the hash — she just looked it up." },
    { title: 'Hash Functions Explained', narrative: "A hash is one-way: you can't reverse it. But if two users have the same password, they have the same hash. Crack one, you've cracked every account with that password." },
    { title: 'Why MD5 Fails', narrative: 'A GPU computes **10 billion MD5 hashes per second**. Every 8-character password can be tried in hours. MD5 was designed for file integrity, not password security. Speed is the enemy.' },
    { title: 'The Salt Solution', narrative: '**Salting**: prepend a unique random string per user before hashing. Rainbow tables become useless. **bcrypt**: a deliberately slow hash — 100ms per hash instead of 1ns. 10 billion guesses/sec drops to 10/sec.' },
  ],
  principle: 'Password Hashing with Salts',
  explanation: "Secure password storage requires:\n1. **One-way hash** — can't recover the original\n2. **Unique random salt per user** — defeats rainbow tables\n3. **Slow hash function** (bcrypt/scrypt/Argon2) — defeats brute force",
  pattern: '1. Generate unique salt per user\n2. Hash with slow algorithm: bcrypt(salt + password)\n3. Store salt + hash\n4. Compare with constant-time function',
  tryItQuestion: 'Two users both choose "Summer2024!" — how does salting help?',
  tryItOptions: [
    'It makes the password longer',
    "Each user gets a unique salt, so their hashes are completely different — cracking one doesn't reveal the other",
    'It encrypts the salt so nobody can read it',
    'It adds special characters automatically',
  ],
  tryItCorrectIndex: 1,
  gameType: 'debugger',
  gameConfig: {
    id: 'login-code-debugger',
    title: 'Debug the Login System',
    description: 'This login function has 4 security bugs. Find all the lines that make the system vulnerable.',
    language: 'javascript',
    lines: [
      { id: 'line-1', content: 'async function login(username, password) {', isBug: false },
      { id: 'line-2', content: '  const user = await db.findUser(username);', isBug: false },
      { id: 'line-3', content: "  if (!user) return { error: 'Invalid credentials' };", isBug: false },
      { id: 'line-4', content: '  const hash = md5(password);', isBug: true, explanation: 'MD5 is too fast — 10 billion hashes/sec on a GPU. Use bcrypt.' },
      { id: 'line-5', content: '  // No salt added before hashing', isBug: true, explanation: 'Without a unique salt per user, identical passwords produce identical hashes. Rainbow tables work.' },
      { id: 'line-6', content: '  if (hash === user.passwordHash) {', isBug: true, explanation: 'Direct === is vulnerable to timing attacks. Use crypto.timingSafeEqual().' },
      { id: 'line-7', content: '    const token = generateSessionToken();', isBug: false },
      { id: 'line-8', content: '    return { success: true, token };', isBug: false },
      { id: 'line-9', content: '  }', isBug: false },
      { id: 'line-10', content: '  await log.write(`Failed: ${username}:${password}`);', isBug: true, explanation: 'Logging passwords in plaintext — if the log is compromised, attackers get password variants.' },
      { id: 'line-11', content: "  return { error: 'Invalid credentials' };", isBug: false },
      { id: 'line-12', content: '}', isBug: false },
    ],
    bugCount: 4,
    successMessage: 'All 4 bugs found! MD5 too fast, no salt, timing-vulnerable comparison, and plaintext password logging.',
    failMessage: 'There are 4 bugs. Look at: hash function choice, missing salt, comparison method, and what gets logged.',
    hint: '(1) How fast is the hash? (2) Same password = same hash? (3) Can timing leak info? (4) What sensitive data is logged?',
  },
  resolution: "Modern systems use bcrypt with per-user salts and ~100ms hash time. Brute-force that took seconds against MD5 now takes centuries. The lesson: security knowledge evolves, and yesterday's best practice becomes today's vulnerability.",
  learningPoints: [
    "Hash functions are one-way — you can't recover the password",
    'MD5 computes 10 billion hashes/sec on GPUs — far too fast for passwords',
    'Rainbow tables are precomputed hash→password lookups that defeat unsalted hashes',
    'A unique salt per user makes rainbow tables useless',
    "bcrypt's cost factor makes each hash deliberately slow",
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S4/E2/The Password That Wasnt',
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
      gameResult: { score: 100, time: 55, attempts: 2 },
      isComplete: true,
    },
  },
};
