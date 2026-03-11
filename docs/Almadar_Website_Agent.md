# Almadar Website Agent: Builder Mode

## Problem

We have three separate agent implementations:

| Codebase | What It Does | Where It Runs |
|----------|-------------|---------------|
| `packages/almadar-agent/` | Full agent framework (LangGraph, workspace, git, sessions, memory) | Builder app (apps/builder/) |
| `tools/orbital-agent/` | CLI agent + neural pipeline (GFlowNet, JEPA, 45 tools, eval) | Local CLI (`orb` command) |
| `almadar/agent/` | Standalone server with chat-only endpoint | Firebase App Hosting (website chat) |

The neural pipeline (GFlowNet, graph transformer, edit predictor) lives only in `tools/orbital-agent/` and can't be used from the website. The agent framework in `packages/almadar-agent/` has orchestration but no neural path. The standalone server in `almadar/agent/` can only answer questions.

We want users on `orb.almadar.io` and `studio.almadar.io` to build .orb schemas directly in the browser.

---

## Architecture

### Merge Strategy

Merge `tools/orbital-agent/` into `almadar/agent/` as the single agent server. The server exposes multiple modes:

```
almadar/agent/
├── src/
│   ├── index.ts                    # Express server entry
│   ├── routes/
│   │   ├── chat.ts                 # /api/agent/chat (existing Q&A)
│   │   ├── builder.ts              # /api/agent/builder (NEW: schema generation)
│   │   └── health.ts               # /health
│   │
│   ├── agent/                      # From tools/orbital-agent/src/agent/
│   │   ├── agent-loop.ts           # Core LLM loop (message history, compaction)
│   │   ├── auto-fix.ts             # Validation error fixing
│   │   ├── provider-router.ts      # Complexity-based provider selection
│   │   ├── system-prompt.ts        # Prompt composition from tools + skills
│   │   └── tool-registry.ts        # Tool registry (builder-safe subset)
│   │
│   ├── neural/                     # From tools/orbital-agent/src/neural/
│   │   ├── goal-parser.ts          # NL -> GoalSpec extraction
│   │   ├── schema-generator.ts     # GFlowNet inference wrapper
│   │   ├── neural-pipeline.ts      # Full pipeline: parse -> generate -> validate -> fix
│   │   └── infer.py                # Python GFlowNet inference (subprocess)
│   │
│   ├── tools/                      # From tools/orbital-agent/src/tools/ (safe subset)
│   │   ├── validate.ts             # orbital validate (in-memory, no filesystem)
│   │   ├── combine-orbitals.ts     # Merge orbital definitions
│   │   ├── generate-orbital.ts     # Single orbital generation via LLM
│   │   └── query-schema.ts         # Schema introspection
│   │
│   ├── eval/                       # From tools/orbital-agent/src/eval/
│   │   ├── neural-eval.ts          # Neural vs LLM comparison
│   │   └── runner.ts               # Eval CLI
│   │
│   └── models/                     # Trained model weights (or fetched from GCS)
│       ├── gflownet-best.pt
│       ├── graph-model-best.pt
│       └── edit-predictor-best.pt
```

### What We Keep vs Drop

**KEEP (no workspace/git/session needed):**

| Component | Source | Why |
|-----------|--------|-----|
| Agent loop | `tools/orbital-agent/src/agent/agent-loop.ts` | Core generation logic, message history, compaction |
| Auto-fix | `tools/orbital-agent/src/agent/auto-fix.ts` | Validation error repair |
| Provider router | `tools/orbital-agent/src/agent/provider-router.ts` | Smart model selection |
| System prompt builder | `tools/orbital-agent/src/agent/system-prompt.ts` | Compose prompts from skills + tools |
| Tool registry | `tools/orbital-agent/src/agent/tool-registry.ts` | Register tools for LLM (filtered subset) |
| Neural pipeline | `tools/orbital-agent/src/neural/*` | GFlowNet generation (the whole point) |
| Goal parser | `tools/orbital-agent/src/neural/goal-parser.ts` | NL to structured GoalSpec |
| Schema generator | `tools/orbital-agent/src/neural/schema-generator.ts` | GFlowNet inference |
| Validate tool | `tools/orbital-agent/src/tools/validate.ts` | `orbital validate` wrapper |
| Combine orbitals | `tools/orbital-agent/src/tools/combine-orbitals.ts` | Merge multiple orbitals |
| Generate orbital | `tools/orbital-agent/src/tools/generate-orbital.ts` | Single orbital via LLM |
| Query schema | `tools/orbital-agent/src/tools/filesystem.ts` (partial) | Schema introspection |
| Skills | `packages/almadar-skills/` | All skill generators (npm dependency) |
| LLM client | `packages/almadar-llm/` | Multi-provider streaming (npm dependency) |
| Eval framework | `tools/orbital-agent/src/eval/` | Quality benchmarking |

**DROP (requires workspace/git/sessions):**

| Component | Why Drop |
|-----------|----------|
| Workspace manager | No filesystem on server |
| Git client / sink | No git repos for web users |
| Firestore sink | No per-user project persistence (yet) |
| Session manager (LangGraph checkpoints) | Thread-level memory is sufficient |
| Memory manager (.orb memory files) | No user profiles |
| Scaffold tool | No project directory creation |
| Compile tool | No filesystem to write app/ to |
| Verify tool | No Playwright browser on server |
| Lint tool | No eslint on server |
| Design system tools | No filesystem |
| Multi-user / state-sync | Single-user per request |

---

## Builder Mode API

### Endpoint: `POST /api/agent/builder`

SSE streaming endpoint. Same protocol as the chat endpoint.

```typescript
// Request
{
  prompt: string;              // "Build a todo app with categories"
  mode: "neural" | "llm" | "auto";  // Generation strategy
  threadId?: string;           // Resume conversation
  options?: {
    provider?: string;         // LLM provider override
    model?: string;            // Model override
    maxFixRounds?: number;     // Auto-fix iterations (default: 3)
    samples?: number;          // GFlowNet samples (default: 5)
    temperature?: number;      // GFlowNet temperature (default: 0.8)
  };
}

// SSE Events (streamed)
{ type: "start", data: { threadId, mode } }
{ type: "status", data: { phase: "parsing" | "generating" | "validating" | "fixing" | "done" } }
{ type: "message", data: { role: "assistant", content: "..." } }  // Streamed text
{ type: "schema", data: { orb: "..." } }                          // Generated .orb content
{ type: "validation", data: { pass: boolean, errors: [], warnings: [] } }
{ type: "fix", data: { round: 1, description: "..." } }
{ type: "goal", data: { entities: 2, traits: 4, ... } }           // Parsed GoalSpec
{ type: "neural", data: { steps: 23, goalMatch: 0.78, actions: [...] } }
{ type: "done", data: { success: boolean, schema: "..." } }
{ type: "error", data: { error: "..." } }
```

### Mode Selection

```
"auto" (default):
  1. Parse goal to estimate complexity
  2. Simple (1-2 entities) -> try neural first
     - If neural succeeds (goalMatch > 0.7 + validates): done
     - If neural fails: fall back to LLM
  3. Complex (3+ entities) -> LLM agent loop
     - Decompose into orbitals
     - Generate each via subagent
     - Combine + validate + fix

"neural":
  Force GFlowNet pipeline. Fast (2-10s), cheap (<$0.01).
  Best for simple-medium schemas.

"llm":
  Force LLM agent loop. Slower (30-300s), costlier ($0.05-0.35).
  Best for complex multi-entity schemas.
```

### Endpoint: `POST /api/agent/builder/edit`

Edit an existing schema via the agent.

```typescript
// Request
{
  schema: string;              // Current .orb content
  instruction: string;         // "Add a comments entity with author and text"
  threadId?: string;
}

// SSE Events: same as builder, but starts from existing schema
```

### Endpoint: `POST /api/agent/builder/validate`

Stateless validation (no LLM, no generation).

```typescript
// Request
{ schema: string }

// Response (not SSE, regular JSON)
{
  valid: boolean;
  errors: [{ code: string, message: string, path: string }];
  warnings: [{ code: string, message: string, path: string }];
}
```

---

## Validation Without Filesystem

The `orbital validate` binary reads from a file path. For the server, we need to validate in-memory schemas. Two approaches:

**Option A: Temp file (simple)**
Write schema to `/tmp/orbital-{uuid}.orb`, run `orbital validate`, read result, delete file.

**Option B: stdin (if compiler supports it)**
Pipe schema to `orbital validate --stdin`. Requires a small Rust CLI change.

Start with Option A. It's fast enough (validate takes <100ms) and avoids compiler changes.

---

## Neural Pipeline on Server

### Python Subprocess

The GFlowNet inference runs in Python (`infer.py`). The server spawns it as a subprocess:

```typescript
const result = await execPythonInference({
  goalSpec,
  modelPath: './models/gflownet-best.pt',
  samples: 5,
  temperature: 0.8,
});
```

**Requirements on the server:**
- Python 3.10+ with PyTorch (CPU-only, no GPU needed)
- Model weights bundled in the Docker image (~50MB total)
- `infer.py` + `decompose_schema.py` + `gflownet.py` + `graph_model.py` copied to server

### Model Loading Strategy

**Cold start:** First inference loads models into memory (~2s). Subsequent calls reuse the loaded models.

**Option:** Keep a warm Python process that listens on a Unix socket or stdin for inference requests, avoiding subprocess overhead per request. This is an optimization for later.

---

## Frontend Integration

### orb.almadar.io

The Orb site gets a "Try It" builder experience:

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

### studio.almadar.io

Studio gets the full builder with a schema editor (Monaco) + agent sidebar:

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

## Implementation Phases

### Phase 1: Merge orbital-agent into almadar/agent

Copy the following from `tools/orbital-agent/src/` into `almadar/agent/src/`:

```
agent/agent-loop.ts
agent/auto-fix.ts
agent/provider-router.ts
agent/system-prompt.ts
agent/tool-registry.ts
neural/goal-parser.ts
neural/schema-generator.ts
neural/neural-pipeline.ts
neural/infer.py
tools/validate.ts
tools/combine-orbitals.ts
tools/generate-orbital.ts
```

Copy Python inference dependencies:
```
tools/training-data/decompose_schema.py
tools/training-data/gflownet.py
tools/training-data/graph_model.py
tools/training-data/schema_to_graph.py
```

Copy trained models:
```
packages/almadar-test-schemas/training-data/models/gflownet-best.pt
packages/almadar-test-schemas/training-data/models/graph-model-best.pt
packages/almadar-test-schemas/training-data/models/edit-predictor-best.pt
```

Update imports. Strip filesystem/git dependencies. The agent-loop and tools need to work with in-memory schema strings instead of file paths.

**Deliverable:** `almadar/agent/` has both chat mode and builder mode. Neural pipeline runs locally.

### Phase 2: Builder API endpoint

Implement `POST /api/agent/builder` with SSE streaming:

1. Parse request (prompt, mode, options)
2. If mode is "neural" or "auto" with simple goal: run neural pipeline
3. If mode is "llm" or auto-fallback: run agent loop
4. Stream events as SSE
5. Return final schema in `done` event

Implement `POST /api/agent/builder/validate` for stateless validation.

**Deliverable:** Builder endpoint works, returns .orb schemas via SSE.

### Phase 3: Frontend builder component

Build `AlmadarBuilder.tsx` shared component (like `AlmadarChat.tsx`):

1. Input bar for prompts
2. Generation progress (phase, mode, steps)
3. Schema preview (syntax highlighted)
4. Validation status
5. Download / copy / edit actions
6. Conversation mode for iterative edits

Wire into `orb.almadar.io` (simple builder) and `studio.almadar.io` (full editor).

**Deliverable:** Users can generate .orb schemas from the website.

### Phase 4: Deploy with Python runtime

Update the Firebase App Hosting config to include Python:

```yaml
build:
  command: |
    npm install && npm run build
    pip install torch --index-url https://download.pytorch.org/whl/cpu
run:
  runtime: nodejs22
  command: node dist/index.js
```

Bundle model weights in the Docker image. Configure Cloud Run with enough memory for PyTorch CPU inference (~1GB).

**Deliverable:** Neural pipeline runs in production.

### Phase 5: Edit mode

Implement `POST /api/agent/builder/edit`:

1. Accept existing schema + natural language instruction
2. Agent reads schema, understands structure
3. Applies edit (add entity, modify trait, change pattern, etc.)
4. Validates result
5. Returns diff + updated schema

This enables the Studio editor workflow where users iterate on schemas.

**Deliverable:** Users can edit existing schemas via natural language.

### Phase 6: Eval integration

Port `tools/orbital-agent/src/eval/` to run against the deployed server:

1. Neural eval: benchmark GFlowNet generation quality
2. Dream eval: full workflow (generate + validate)
3. Regression testing on each deploy

**Deliverable:** Continuous quality monitoring.

---

## Cost Model

| Mode | LLM Calls | Time | Cost/Request | Use Case |
|------|-----------|------|-------------|----------|
| Neural (GFlowNet) | 1 (goal parse) | 2-10s | <$0.01 | Simple apps, demos, try-it |
| Neural + fix | 2-4 | 5-20s | <$0.03 | Simple apps with validation errors |
| LLM (DeepSeek) | 6-15 | 30-120s | $0.05-0.15 | Medium complexity |
| LLM (Anthropic) | 6-15 | 30-120s | $0.15-0.35 | Complex multi-entity |

For the website "try it" flow, neural mode keeps costs near zero. The LLM fallback handles cases the neural model can't.

---

## Server Resource Requirements

```yaml
# apphosting.yaml
runConfig:
  cpu: 2              # Neural inference is CPU-bound
  memoryMiB: 1024     # PyTorch + model weights + Node.js
  minInstances: 0     # Scale to zero when idle
  maxInstances: 5     # Cap concurrent generations
  concurrency: 10     # Multiple chat requests per instance, 1 generation at a time
```

---

## Security

- **Rate limiting:** 10 generations/hour per IP (anonymous), 50/hour per authenticated user
- **Schema size limit:** 500KB max generated schema
- **Prompt length limit:** 2000 characters
- **No filesystem escape:** All validation via temp files in /tmp with UUID names, cleaned up immediately
- **No user code execution:** Server never runs user-provided code
- **Model weights are read-only:** Loaded once, never modified by requests

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Neural generation success rate | >80% for 1-2 entity apps |
| LLM generation success rate | >95% for all complexities |
| Time to first schema (neural) | <5s |
| Time to first schema (LLM) | <60s |
| Validation pass rate (first attempt) | >70% neural, >90% LLM |
| Monthly cost (1000 generations/day) | <$300 |
