# Almadar Website Agent: Builder Mode

## Problem

We have three agent codebases that don't share code:

| Codebase | Purpose | Size | Deployment |
|----------|---------|------|------------|
| `packages/almadar-agent/` | Full agent framework (LangGraph, workspace, git, sessions, memory, orchestration) | 42,690 LOC | npm `@almadar/agent` |
| `tools/orbital-agent/` | CLI agent + neural pipeline (GFlowNet, JEPA, 30+ tools, eval) | 7,558 LOC | Local CLI (`orb`) |
| `almadar/agent/` | Standalone Express server, chat-only | 200 LOC | Firebase App Hosting |

The problems:

1. The neural pipeline (GFlowNet, graph transformer, edit predictor) is trapped in `tools/orbital-agent/` and unreachable from the website or the framework.
2. `tools/orbital-agent/` reinvents concepts that `@almadar/agent` already has (agent loop, tool registry, provider routing, auto-fix), but with different APIs.
3. `almadar/agent/` (the server) uses neither framework. It talks to `@almadar/llm` and `@almadar/skills` directly with a hand-rolled chat loop.
4. Adding builder mode to the server by copying files from orbital-agent would create a third copy of agent logic.

---

## Architecture: Three Layers

Instead of copying code into the server, we decompose `@almadar/agent` into composable layers that all three consumers can use. The neural pipeline merges into the framework as a new module. The CLI and server become thin consumers.

```
┌─────────────────────────────────────────────────────────────┐
│                    CONSUMERS (thin)                          │
│                                                             │
│  almadar/agent/          tools/orbital-agent/   apps/builder│
│  (Express server)        (CLI)                  (IDE)       │
│  - HTTP routes           - Commander.js CLI      - React UI │
│  - SSE streaming         - Terminal UI           - Monaco   │
│  - Rate limiting         - Local filesystem      - Preview  │
│  - CORS/Helmet           - Eval framework                   │
└──────────┬──────────────────────┬──────────────────┬────────┘
           │                      │                  │
           ▼                      ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│              @almadar/agent  (npm framework)                │
│                                                             │
│  ┌─ Core (LangGraph required) ────────────────────────────┐ │
│  │                                                        │ │
│  │  agent/                                                │ │
│  │    AgentLoop          LangGraph agent loop + tool call │ │
│  │    ToolRegistry       Register + dispatch tools        │ │
│  │    SystemPrompt       Compose prompts from skills      │ │
│  │    ProviderRouter     Complexity-based model selection  │ │
│  │    AutoFix            Validation error repair          │ │
│  │    EventTransformer   Raw events -> typed SSE events   │ │
│  │                                                        │ │
│  │  orchestration/                                        │ │
│  │    ComplexityClassifier  Simple/medium/complex          │ │
│  │    FixingOrchestrator    Error-specific fix planning    │ │
│  │                                                        │ │
│  │  orbitals/                                             │ │
│  │    OrbitalGenerator   Single orbital via LLM           │ │
│  │    OrbitalCombiner    Deterministic merge              │ │
│  │    BatchGenerator     Parallel generation              │ │
│  │                                                        │ │
│  │  neural/              ← NEW (from orbital-agent)       │ │
│  │    GoalParser         NL -> GoalSpec struct            │ │
│  │    NeuralPipeline     GFlowNet end-to-end              │ │
│  │    SchemaGenerator    Python inference bridge           │ │
│  │                                                        │ │
│  │  tools/               (pure functions, injectable I/O) │ │
│  │    validateSchema()   Runs orbital validate            │ │
│  │    combineOrbitals()  Merges orbital definitions       │ │
│  │    generateOrbital()  Single orbital via LLM           │ │
│  │    queryStructure()   Schema introspection             │ │
│  │    schemaChunking()   Extract/apply chunks             │ │
│  │                                                        │ │
│  │  types/                                                │ │
│  │    ToolDefinition, GoalSpec, AgentTurn, SSEEvent       │ │
│  │    NeuralPipelineResult, ValidationResult              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ Adapters (I/O, pluggable) ───────────────────────────┐ │
│  │                                                        │ │
│  │  persistence/                                          │ │
│  │    MemoryBackend      In-process (server, CLI)         │ │
│  │    FirestoreBackend   Cloud (builder app)              │ │
│  │                                                        │ │
│  │  workspace/                                            │ │
│  │    WorkspaceManager   File I/O abstraction             │ │
│  │    GitSink            Auto-commit writes               │ │
│  │    FirestoreSink      Backup writes                    │ │
│  │    MemorySink         In-memory (server, tests)        │ │
│  │                                                        │ │
│  │  session/                                              │ │
│  │    SessionManager     Thread lifecycle                 │ │
│  │    LangGraphAdapter   Checkpoint-based (builder)       │ │
│  │    StatelessAdapter   Per-request (server)             │ │
│  │                                                        │ │
│  │  memory/                                               │ │
│  │    MemoryManager      User prefs + project context     │ │
│  │    PreferenceLearner  Learn patterns from usage        │ │
│  │                                                        │ │
│  │  safety/                                               │ │
│  │    RateLimiter, CircuitBreaker, AuditLog               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ Required ───────────────────────────────────────────┐   │
│  │  @langchain/langgraph   Agent loop + tool dispatch    │   │
│  │  @langchain/core        Message types + tool schemas  │   │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ Optional Integrations (heavy deps) ─────────────────┐ │
│  │  Firestore backends   (peer dep: firebase-admin)       │ │
│  │  Git operations       (peer dep: simple-git)           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
           │                      │
           ▼                      ▼
┌─────────────────────┐  ┌────────────────────┐
│  @almadar/llm       │  │  @almadar/skills   │
│  Multi-provider LLM │  │  Skill generators  │
└─────────────────────┘  └────────────────────┘
```

### Key Principle: LangGraph Everywhere, I/O Injected

LangGraph is the agent runtime for all consumers. It handles the LLM call loop, tool call parsing across providers (OpenAI function calling, Anthropic tool use, DeepSeek), parallel tool dispatch, message graph management, and optional checkpointing. Reimplementing this would be duplicating 2000+ lines of battle-tested orchestration code.

What varies between consumers is the I/O: how tools read/write files, how sessions persist, how events stream to the UI. All I/O is injected:

```typescript
// Core: takes a schema string, returns validation result
async function validateSchema(
  schema: string,
  executor: (cmd: string, args: string[]) => Promise<{ stdout: string; code: number }>
): Promise<ValidationResult>

// Server adapter: writes temp file, runs orbital binary
const serverExecutor = async (cmd, args) => {
  const tmpFile = `/tmp/orbital-${uuid()}.orb`;
  await writeFile(tmpFile, schema);
  const result = await exec(cmd, [...args, tmpFile]);
  await unlink(tmpFile);
  return result;
};

// CLI adapter: uses real file path
const cliExecutor = async (cmd, args) => exec(cmd, args);
```

This means:
- The server uses `MemorySink` + `StatelessAdapter` + temp-file executors
- The CLI uses direct filesystem + `MemoryBackend`
- The builder app uses `GitSink` + `FirestoreBackend` + `LangGraphAdapter`

Same core code, different I/O adapters.

---

## What Changes in @almadar/agent

### New Module: `neural/`

Absorb from `tools/orbital-agent/src/neural/`:

| File | What It Does | Dependencies |
|------|-------------|--------------|
| `goal-parser.ts` | Extracts GoalSpec (entity count, fields, traits) from natural language | `@almadar/llm` |
| `neural-pipeline.ts` | End-to-end: parse goal, run GFlowNet, validate, auto-fix | GoalParser, SchemaGenerator, validateSchema, autoFix |
| `schema-generator.ts` | Wraps Python GFlowNet inference as subprocess | Injectable executor |
| `infer.py` + deps | Python inference (GFlowNet + graph encoder) | PyTorch (CPU) |

The neural pipeline becomes a first-class generation path alongside the LLM agent loop:

```typescript
// @almadar/agent exports
export { GoalParser, parseGoal } from './neural/goal-parser.js';
export { NeuralPipeline, runNeuralPipeline } from './neural/neural-pipeline.js';
export { SchemaGenerator } from './neural/schema-generator.js';
export type { GoalSpec, NeuralPipelineResult } from './neural/types.js';
```

### Refactored Module: `agent/`

`createSkillAgent()` already uses LangGraph for tool calling and orchestration. The refactoring makes the checkpointer pluggable, not optional:

```typescript
// All consumers use the same LangGraph-based agent
export { createSkillAgent, resumeSkillAgent } from './agent/skill-agent.js';
```

The difference between consumers is the checkpointer and session backend:

```typescript
// Server: in-memory checkpointer, no persistence across requests
const agent = await createSkillAgent({
  skill: 'kflow-orbitals',
  checkpointer: new MemoryCheckpointer(),   // dies with the request
  tools: builderTools,
});

// CLI: in-memory checkpointer, optional resume from saved state
const agent = await createSkillAgent({
  skill: 'kflow-orbitals',
  checkpointer: new MemoryCheckpointer(),
  tools: cliTools,
});

// Builder app: Firestore checkpointer, resumable across sessions
const agent = await createSkillAgent({
  skill: 'kflow-orbitals',
  checkpointer: new FirestoreCheckpointer(db),
  tools: fullTools,
  sessionManager: firestoreSessionManager,
});
```

LangGraph handles tool call parsing, dispatch, parallel execution, and the message loop for all three. The server just doesn't persist checkpoints beyond the request lifecycle.

### Refactored Module: `tools/`

Tools become pure functions with injectable I/O. Currently `tools/orbital-agent/src/tools/validate.ts` calls `exec()` directly. After refactoring:

```typescript
// Before (orbital-agent): coupled to filesystem
export async function validate(schemaPath: string): Promise<ValidationResult> {
  const { stdout } = await exec('orbital', ['validate', schemaPath]);
  return parseValidationOutput(stdout);
}

// After (@almadar/agent): injectable executor
export function createValidateTool(
  executor: CommandExecutor
): ToolDefinition {
  return {
    name: 'validate',
    description: 'Validate an .orb schema',
    parameters: z.object({ schema: z.string() }),
    async execute({ schema }) {
      return executor.validateSchema(schema);
    },
  };
}
```

### New Export: `builder` subpath

A convenience module that creates a LangGraph agent pre-configured for builder use (no workspace, no git, no Firestore):

```typescript
// @almadar/agent/builder
export { createBuilderTools } from './tools/builder-tools.js';
export { MemoryCheckpointer } from './persistence/memory-checkpointer.js';

// createBuilderTools returns the safe subset of tools for web use:
// - validate (via CommandExecutor)
// - generate_orbital (via LLM subagent)
// - combine_orbitals (deterministic merge)
// - query_schema_structure (introspection)
// - neural_generate (via PythonExecutor, optional)
// - auto_fix (LLM-based error repair)
//
// Excluded: compile, verify, lint, scaffold, git, filesystem,
//           design-system, deploy, screenshot

export function createBuilderTools(config: {
  executor: CommandExecutor;        // How to run `orbital validate`
  pythonExecutor?: PythonExecutor;  // How to run GFlowNet inference
}): ToolDefinition[];
```

The consumer (server, CLI, builder app) calls `createSkillAgent()` with these tools. LangGraph handles everything else: the LLM decides which tools to call, LangGraph dispatches them, collects results, and loops until the agent signals completion.

---

## What Changes in tools/orbital-agent

After the refactoring, `tools/orbital-agent/` becomes a thin CLI over `@almadar/agent`:

```typescript
// tools/orbital-agent/src/cli.ts (simplified)
import { AgentLoop, NeuralPipeline, createBuilderTools } from '@almadar/agent';
import { LLMClient } from '@almadar/llm';

// CLI-specific: filesystem executor, terminal UI, eval framework
import { createFilesystemExecutor } from './adapters/filesystem.js';
import { createTerminalUI } from './ui/terminal.js';

const executor = createFilesystemExecutor(process.cwd());
const llm = new LLMClient({ provider: 'deepseek' });

// Uses the same core as the server, different adapters
const result = await generateSchema(prompt, 'auto', {
  llm,
  executor,
  onEvent: (e) => terminalUI.render(e),
});
```

What stays in orbital-agent (CLI-specific):
- Commander.js CLI entry point
- Terminal UI (spinners, colors, cost display)
- Local filesystem adapter (CommandExecutor impl)
- Eval framework (neural-eval, dream-eval)
- Design system tools (scaffold, pattern-sync, verify)

What moves to @almadar/agent (shared):
- `src/neural/*` (goal parser, pipeline, schema generator, infer.py)
- `src/agent/auto-fix.ts` (validation repair)
- `src/agent/provider-router.ts` (complexity routing, merged with existing orchestration/provider-router.ts)
- `src/agent/system-prompt.ts` (prompt composition)
- `src/tools/validate.ts`, `combine-orbitals.ts`, `generate-orbital.ts` (as injectable tools)

What gets deleted (replaced by @almadar/agent):
- `src/agent/agent-loop.ts` (replaced by LangGraph-based createSkillAgent)
- `src/agent/create-agent.ts` (replaced by createSkillAgent with MemoryCheckpointer)
- `src/agent/tool-registry.ts` (replaced by createAgentTools from @almadar/agent)

---

## What Changes in almadar/agent (server)

The server becomes a thin HTTP layer over `@almadar/agent/builder`:

```
almadar/agent/
├── src/
│   ├── index.ts                 # Express app, uses @almadar/server middleware
│   ├── routes/
│   │   ├── chat.ts              # /api/agent/chat (existing Q&A)
│   │   ├── builder.ts           # /api/agent/builder (NEW: schema generation)
│   │   └── health.ts            # /health
│   └── adapters/
│       ├── server-executor.ts   # Temp-file based command executor
│       └── python-executor.ts   # GFlowNet subprocess manager
├── models/                      # Trained weights (bundled in image)
│   ├── gflownet-best.pt
│   ├── graph-model-best.pt
│   └── edit-predictor-best.pt
├── python/                      # Python inference scripts
│   ├── infer.py
│   ├── decompose_schema.py
│   ├── gflownet.py
│   └── graph_model.py
├── package.json
└── apphosting.yaml
```

**Dependencies:**

| Package | What the server uses from it |
|---------|------------------------------|
| `@almadar/agent` | `createSkillAgent`, `createBuilderTools`, `transformAgentEvent`, `MemoryCheckpointer` (the agent framework, LangGraph, tool calling) |
| `@almadar/server` | Express middleware (error handling, validation, async wrappers), rate limiting. NOT data services, event bus, or WebSocket. |
| `@almadar/llm` | `LLMClient` for chat mode streaming |
| `@almadar/skills` | Skill generators (chat skill, generation skills) |
| `express`, `cors`, `helmet` | HTTP layer |

Currently `almadar/agent/` doesn't use `@almadar/server` at all. It hand-rolls Express middleware. As we add builder mode, we should use `@almadar/server/middleware` for error handling, request validation, and auth (for rate limit tiers), rather than reimplementing them.

The builder route wires up `@almadar/agent`'s LangGraph-based agent with server-specific adapters:

```typescript
// src/routes/builder.ts
import { createSkillAgent, createBuilderTools, transformAgentEvent,
         MemoryCheckpointer } from '@almadar/agent';
import { serverExecutor } from '../adapters/server-executor.js';

router.post('/builder', async (req, res) => {
  const { prompt, mode, threadId, options } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // Create agent with server adapters
  // LangGraph handles tool call parsing, dispatch, and the message loop
  const { agent, threadId: tid } = await createSkillAgent({
    skill: mode === 'neural' ? 'neural-generation' : 'kflow-orbitals',
    checkpointer: new MemoryCheckpointer(),  // no persistence beyond request
    tools: createBuilderTools({ executor: serverExecutor }),
    provider: options?.provider || 'deepseek',
    model: options?.model,
    threadId,
  });

  // Stream LangGraph events as SSE
  for await (const rawEvent of agent.stream({ prompt })) {
    const sseEvent = transformAgentEvent(rawEvent);
    if (sseEvent) {
      res.write(`data: ${JSON.stringify(sseEvent)}\n\n`);
    }
  }

  res.end();
});

router.post('/builder/validate', async (req, res) => {
  const result = await serverExecutor.validateSchema(req.body.schema);
  res.json(result);
});

router.post('/builder/edit', async (req, res) => {
  // Same pattern: createSkillAgent + stream events
});
```

No agent logic in the server. LangGraph handles tool calling, dispatch, and the message loop. The server only handles HTTP, SSE framing, and adapter wiring.

---

## Dependency Graph After Refactoring

```
@almadar/skills ──────────────────────────────────────┐
@almadar/llm ─────────────────────────────────────────┤
@almadar/core ─────────────────────────────────────────┤
@langchain/langgraph ─────────────────────────────────┤
                                                       ▼
                                              @almadar/agent
                                              (npm framework)
                                                       │
                                              @almadar/server
                                              (shared infra)
                                                       │
                    ┌──────────────────────────────────┼──────────────────┐
                    ▼                                  ▼                  ▼
            almadar/agent/                   tools/orbital-agent/    apps/builder/
            (server)                         (CLI)                  (IDE)
            deps:                            deps:                  deps:
              @almadar/agent                   @almadar/agent        @almadar/agent
              @almadar/server (middleware)      @almadar/llm          @almadar/server
              @almadar/llm                     @almadar/skills       @almadar/llm
              @almadar/skills                  commander, ora        @almadar/skills
              express, cors, helmet                                  react, monaco
```

---

## Builder API

### `POST /api/agent/builder`

SSE streaming endpoint.

```typescript
// Request
{
  prompt: string;                          // "Build a todo app with categories"
  mode: "neural" | "llm" | "auto";        // Generation strategy
  threadId?: string;                       // Resume conversation
  options?: {
    provider?: string;                     // LLM provider override
    model?: string;                        // Model override
    maxFixRounds?: number;                 // Auto-fix iterations (default: 3)
    samples?: number;                      // GFlowNet samples (default: 5)
    temperature?: number;                  // GFlowNet temperature (default: 0.8)
  };
}

// SSE Events
{ type: "start", data: { threadId, mode } }
{ type: "status", data: { phase: "parsing" | "generating" | "validating" | "fixing" | "done" } }
{ type: "message", data: { role: "assistant", content: "..." } }
{ type: "schema", data: { orb: "..." } }
{ type: "validation", data: { pass: boolean, errors: [], warnings: [] } }
{ type: "fix", data: { round: 1, description: "..." } }
{ type: "goal", data: { entities: 2, traits: 4, ... } }
{ type: "neural", data: { steps: 23, goalMatch: 0.78, actions: [...] } }
{ type: "done", data: { success: boolean, schema: "..." } }
{ type: "error", data: { error: "..." } }
```

### `POST /api/agent/builder/validate`

Stateless, no SSE.

```typescript
// Request
{ schema: string }

// Response
{ valid: boolean, errors: [], warnings: [] }
```

### `POST /api/agent/builder/edit`

SSE streaming, same event protocol as `/builder`.

```typescript
// Request
{
  schema: string;
  instruction: string;
  threadId?: string;
}
```

### Mode Selection

```
"auto" (default):
  1. Parse goal -> estimate complexity
  2. Simple (1-2 entities) -> neural first
     - goalMatch > 0.7 + validates -> done
     - Otherwise -> fall back to LLM
  3. Complex (3+ entities) -> LLM agent loop

"neural":
  GFlowNet pipeline. 2-10s, <$0.01/request.

"llm":
  Agent loop with DeepSeek. 30-120s, $0.05-0.15/request.
```

---

## Implementation Phases

### Phase 1: Absorb neural pipeline + add builder tools to @almadar/agent

Refactor the existing `packages/almadar-agent/` package:

1. **Add `neural/` module** by moving `tools/orbital-agent/src/neural/*` into `packages/almadar-agent/src/neural/`. Adapt imports to use `@almadar/llm` instead of direct provider calls.

2. **Add `MemoryCheckpointer`** to `persistence/`. This is a simple in-memory LangGraph checkpointer for consumers that don't need Firestore persistence (server, CLI). LangGraph requires a checkpointer to function, but it doesn't have to persist anywhere.

3. **Make tools injectable.** Refactor `tools/validate.ts`, `tools/combine-orbitals.ts`, `tools/generate-orbital.ts` to accept a `CommandExecutor` interface instead of calling `exec()` directly. This lets the server use temp files, the CLI use real paths, and tests use mocks.

4. **Add `builder` export subpath** (`packages/almadar-agent/builder`) with `createBuilderTools()` that returns the safe subset of tools (validate, generate, combine, neural, auto-fix). No filesystem, git, or design-system tools.

5. **Publish @almadar/agent@3.0.0** with the new modules.

### Phase 2: Slim down tools/orbital-agent

Replace orbital-agent's internal implementations with imports from `@almadar/agent`:

1. Delete `tools/orbital-agent/src/neural/` (now in @almadar/agent)
2. Delete `tools/orbital-agent/src/agent/agent-loop.ts`, `auto-fix.ts`, `provider-router.ts` (now in @almadar/agent)
3. Import from `@almadar/agent` instead
4. Keep CLI-specific code: Commander entry, terminal UI, eval framework, filesystem adapter, design system tools

### Phase 3: Builder endpoint in almadar/agent server

1. Add `@almadar/agent` as a dependency of `almadar/agent/`
2. Implement `src/adapters/server-executor.ts` (temp-file based `orbital validate`)
3. Implement `src/adapters/python-executor.ts` (GFlowNet subprocess)
4. Implement `src/routes/builder.ts` using `@almadar/agent/builder`
5. Copy Python inference scripts + model weights into the repo
6. Test locally with `npm run dev`

### Phase 4: Frontend builder component

Build `AlmadarBuilder.tsx` shared component:

1. Input bar for prompts
2. Generation progress display (phase, mode, neural stats)
3. Schema preview with syntax highlighting
4. Validation status
5. Download / copy / "Open in Studio" actions

Wire into:
- `orb.almadar.io`: simple "try it" builder in the hero section
- `studio.almadar.io`: Monaco editor + agent sidebar

### Phase 5: Deploy with Python runtime

1. Update `apphosting.yaml` to install PyTorch CPU
2. Bundle model weights in the Docker image (~50MB)
3. Configure Cloud Run: 2 CPU, 1GB memory, scale-to-zero
4. Deploy and verify neural pipeline works in production

### Phase 6: Edit mode + eval

1. Implement `/api/agent/builder/edit` endpoint
2. Port eval framework to run against deployed server
3. Set up regression testing on each deploy

---

## Neural Pipeline Details

### Python Subprocess

GFlowNet inference runs in Python. The `PythonExecutor` adapter manages the subprocess:

```typescript
interface PythonExecutor {
  infer(goal: GoalSpec, options: InferOptions): Promise<InferResult>;
}

// Option A: Subprocess per request (simple, stateless)
class SubprocessPythonExecutor implements PythonExecutor {
  async infer(goal, options) {
    const goalFile = `/tmp/goal-${uuid()}.json`;
    await writeFile(goalFile, JSON.stringify(goal));
    const { stdout } = await exec('python3', [
      'python/infer.py',
      '--goal-file', goalFile,
      '--samples', String(options.samples),
      '--temperature', String(options.temperature),
      '--model-dir', 'models/',
    ]);
    await unlink(goalFile);
    return JSON.parse(stdout);
  }
}

// Option B: Long-running Python worker (warm models, lower latency)
class WorkerPythonExecutor implements PythonExecutor {
  // Spawns infer.py in server mode, communicates via stdin/stdout
  // Models loaded once on startup, reused across requests
}
```

Start with Option A. Optimize to Option B when latency matters.

### Model Weights

Three trained models (~50MB total):

| Model | File | Purpose | Loaded By |
|-------|------|---------|-----------|
| GFlowNet | `gflownet-best.pt` | Schema generation policy (96% valid rate) | `infer.py` |
| Graph Encoder | `graph-model-best.pt` | Schema-to-embedding (shared encoder) | `infer.py` |
| Edit Predictor | `edit-predictor-best.pt` | Edit outcome prediction, 99.7% accuracy (JEPA) | `infer.py` |

Source: `packages/almadar-test-schemas/training-data/models/`

---

## Frontend Integration

### orb.almadar.io (Try It)

```
┌─────────────────────────────────────────────────────┐
│  [Input bar: "Describe what you want to build..."]  │
│                                                     │
│  ┌─ Generation Panel ────────────────────────────┐  │
│  │ Phase: Generating...                          │  │
│  │ Mode: Neural (GFlowNet)                       │  │
│  │ Goal: 2 entities, 5 traits, 8 transitions     │  │
│  │ Steps: 23/50  GoalMatch: 0.78                 │  │
│  │                                               │  │
│  │ [Live .orb schema preview, syntax highlighted] │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌─ Validation ──────────────────────────────────┐  │
│  │ ✓ 0 errors, 0 warnings                       │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  [Download .orb]  [Open in Studio]  [Edit further]  │
└─────────────────────────────────────────────────────┘
```

### studio.almadar.io (Full Editor)

```
┌──────────────────────────┬──────────────────────────┐
│  Monaco Editor (.orb)    │  Agent Sidebar            │
│                          │                           │
│  {                       │  [Chat input]             │
│    "name": "todo-app",   │                           │
│    "entities": [...],    │  > Add a priority field   │
│    "traits": [...]       │    to Todo with values    │
│  }                       │    low, medium, high      │
│                          │                           │
│                          │  [Schema diff preview]    │
│                          │  [Apply] [Reject]         │
│                          │                           │
│  ──────────────────────  │  ─────────────────────    │
│  Validation: ✓ 0 errors  │  Mode: LLM (DeepSeek)    │
│  [Validate] [Download]   │  Cost: $0.02              │
└──────────────────────────┴──────────────────────────┘
```

---

## Cost Model

| Mode | LLM Calls | Time | Cost/Request | Use Case |
|------|-----------|------|-------------|----------|
| Neural (GFlowNet) | 1 (goal parse) | 2-10s | <$0.01 | Simple apps, demos, try-it |
| Neural + fix | 2-4 | 5-20s | <$0.03 | Simple apps needing repair |
| LLM (DeepSeek) | 6-15 | 30-120s | $0.05-0.15 | Medium complexity |
| LLM (Anthropic) | 6-15 | 30-120s | $0.15-0.35 | Complex multi-entity |

---

## Server Resources

```yaml
runConfig:
  cpu: 2
  memoryMiB: 1024
  minInstances: 0
  maxInstances: 5
  concurrency: 10
```

---

## Security

- Rate limiting: 10 generations/hour per IP (anonymous), 50/hour authenticated
- Schema size limit: 500KB
- Prompt length limit: 2000 characters
- Temp files in /tmp with UUID names, cleaned up immediately
- No user code execution
- Model weights read-only

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Neural generation success (1-2 entity) | >80% |
| LLM generation success (all complexities) | >95% |
| Time to first schema (neural) | <5s |
| Time to first schema (LLM) | <60s |
| Validation pass rate (first attempt) | >70% neural, >90% LLM |
| Monthly cost (1000 gen/day) | <$300 |
