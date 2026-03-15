---
slug: learning-from-interruptions
title: "Learning from Interruptions: How Our AI Remembers Your Preferences (Without Being Creepy)"
authors: [osamah]
tags: [architecture, ai]
image: /img/blog/learning-from-interruptions.png
---

![Learning from Interruptions: How Our AI Remembers Your Preferences](/img/blog/learning-from-interruptions.png)

Every time you approve or reject an AI's action, it learns. After 5 approvals, that action happens automatically.

<!-- truncate -->

## The Human-in-the-Loop Problem

AI agents need supervision. They might:
- Execute the wrong command
- Suggest unsafe operations
- Make expensive API calls
- Access sensitive data

So we add interruptions:
```
AI: "I want to run: rm -rf /data/old-logs"
[APPROVE] [REJECT] [MODIFY]
```

But this creates friction. Every action needs approval. The AI feels slow.

**The solution?** Learn from interruptions.

## How Interrupt Memory Works

### Step 1: Record the Decision

When you approve or reject:

```typescript
await sessionManager.recordInterruptDecision(
  sessionId,
  userId,
  {
    toolName: 'execute',
    toolArgs: { command: 'rm -rf /data/old-logs' },
    decision: 'approved',
    reason: 'Safe cleanup of old logs',
  }
);
```

This creates an **InterruptRecord**:

```typescript
interface InterruptRecord {
  interruptId: string;
  sessionId: string;
  userId: string;
  toolName: string;
  toolArgs: Record<string, unknown>;
  decision: 'approved' | 'rejected' | 'modified';
  modifiedArgs?: Record<string, unknown>;
  reason?: string;
  timestamp: Date;
}
```

### Step 2: Update Tool Preferences

Each decision updates your **ToolApprovalPreference**:

```typescript
interface ToolApprovalPreference {
  userId: string;
  toolName: string;
  autoApprove: boolean;
  confidence: number;
  approvedCount: number;
  rejectedCount: number;
  lastDecisionAt: Date;
}
```

The learning algorithm:

```typescript
// After each decision
const approvedCount = previous.approvedCount + (decision === 'approved' ? 1 : 0);
const rejectedCount = previous.rejectedCount + (decision === 'rejected' ? 1 : 0);
const total = approvedCount + rejectedCount;
const approvalRate = approvedCount / total;

// Auto-approve if:
// - At least 5 decisions (min sample size)
// - Approval rate > 80%
const autoApprove = total >= 5 && approvalRate > 0.8;

// Confidence grows with more data
const confidence = Math.min(0.95, total * 0.1);
```

### Step 3: Auto-Approve Future Actions

Next time the AI wants to use that tool:

```typescript
const shouldAutoApprove = await sessionManager.shouldAutoApproveTool(
  userId,
  'execute'
);

if (shouldAutoApprove) {
  // Execute without interruption
} else {
  // Show approval dialog
}
```

## Real-World Example

**Week 1: New user, everything interrupts**

| Action | Decision | Count |
|--------|----------|-------|
| Execute `ls` | ✅ Approved | 1/0 |
| Execute `cat file.txt` | ✅ Approved | 2/0 |
| Execute `rm temp.txt` | ✅ Approved | 3/0 |
| Execute `git status` | ✅ Approved | 4/0 |
| Execute `git commit` | ✅ Approved | 5/0 |

**Week 2: Pattern emerges**

| Action | Decision | Stats |
|--------|----------|-------|
| Execute `ls` | ✅ Auto-approved | 6/0 (100%) |
| Execute `cat` | ✅ Auto-approved | 4/0 (100%) |
| Execute `rm` | ⛔ Interrupts | 3/2 (60%) |
| Execute `npm publish` | ⛔ Interrupts | 1/3 (25%) |

**Result:**
- Safe, common commands execute immediately
- Destructive operations still need approval
- High-stakes actions always interrupt

## Privacy and Control

### User Control

Users can:
- View all recorded decisions
- Delete interrupt history
- Disable auto-approval globally
- Require approval for specific tools

```typescript
// Disable auto-approval for dangerous tools
await memoryManager.updateToolPreference(userId, 'execute', {
  autoApprove: false,  // Always ask for shell commands
});
```

### What We Store

✅ **We store:**
- Tool names (execute, persist, call-service)
- Decision (approved/rejected)
- Timestamp
- Anonymized patterns

❌ **We don't store:**
- Sensitive argument values
- File contents
- API responses
- Passwords or secrets

### Transparency

Every auto-approved action is logged:

```
[2025-04-11 10:23:45] Auto-approved: execute
  Reason: 95% approval rate over 20 decisions
  User: user_123
  Session: sess_456
```

## The Learning Curve

Different tools learn at different rates:

| Tool | Learn Speed | Why |
|------|-------------|-----|
| `read_file` | Fast | Low risk, consistent |
| `write_file` | Medium | Medium risk |
| `execute` | Slow | High risk, context-dependent |
| `call_service` | Never | Always requires approval |

### Confidence Thresholds

```typescript
const THRESHOLDS = {
  read_file: { minDecisions: 3, minRate: 0.9 },
  write_file: { minDecisions: 5, minRate: 0.85 },
  execute: { minDecisions: 10, minRate: 0.9 },
  call_service: { minDecisions: Infinity, minRate: 1.0 }, // Never auto
};
```

## Code Example: Complete Flow

```typescript
// Internal: Almadar's interrupt learning system
// (This is how it works under the hood — not a public API)

const memoryManager = createMemoryManager(db);
const sessionManager = createSessionManager({
  memoryManager,
});

// The agent is created with interrupt learning enabled
const agent = createAgent({
  skill: 'kflow-orbitals',
  workDir: '/workspace',
  userId: 'user_123',
  // Interrupt config based on learned preferences
  noInterrupt: false,
});

// Run the agent
const result = await agent.run({
  input: 'Create a User entity',
});

// During execution, user made these decisions:
// - Approved: execute 'ls'
// - Approved: execute 'orbital validate'
// - Approved: execute 'git status'
// - Rejected: execute 'rm -rf /'
// - Approved: execute 'orbital compile'

// Record all interrupts
for (const interrupt of result.interrupts) {
  await sessionManager.recordInterruptDecision(
    threadId,
    'user_123',
    {
      toolName: interrupt.toolName,
      toolArgs: interrupt.toolArgs,
      decision: interrupt.decision,
      reason: interrupt.reason,
    }
  );
}

// Check what we've learned
const preferences = await memoryManager.getUserToolPreferences('user_123');
for (const pref of preferences) {
  console.log(`${pref.toolName}: ${pref.approvedCount}/${pref.rejectedCount} ` +
              `(${Math.round(pref.approvedCount/(pref.approvedCount+pref.rejectedCount)*100)}%) ` +
              `- Auto: ${pref.autoApprove}`);
}

// Output:
// execute: 4/1 (80%) - Auto: false (need 5+ at 80%)
// validate: 1/0 (100%) - Auto: false (need 3+ at 90%)
// compile: 1/0 (100%) - Auto: false
```

## Real-World Analogy: Smart Home Assistant

Think of it like a smart home:

**Week 1:**
- You: "Turn off the lights"
- Assistant: "Should I turn off all lights?" [Yes] [No]
- You: [Yes]

**Week 2:**
- You: "Turn off the lights"
- Assistant: *Turns off lights* (learned you always say yes)

**But:**
- You: "Unlock the front door"
- Assistant: "Confirm unlock?" [Yes] [No]
- Always asks because security > convenience

The assistant learns patterns but respects boundaries.

## Benefits

### For Users
- ✅ Less friction over time
- ✅ Still in control
- ✅ Transparent learning
- ✅ Privacy-respecting

### For AI Agents
- ✅ Faster execution
- ✅ Better user experience
- ✅ Contextual understanding
- ✅ Safer defaults

### For Teams
- ✅ Consistent patterns across users
- ✅ Audit trail of decisions
- ✅ Identifies risky tool usage

## The Takeaway

Interruptions don't have to be annoying. They can be **learning opportunities**.

Every approval teaches the AI:
- What you consider safe
- Your preferred workflows
- Which actions need scrutiny

Over time, the AI becomes an extension of your intent — fast when it should be fast, careful when it should be careful.

That's not just automation. That's **collaboration**.

Learn more about [Orbital Memory](./ai-orbital-memory).
