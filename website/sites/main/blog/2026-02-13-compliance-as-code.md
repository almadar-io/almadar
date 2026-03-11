---
slug: compliance-as-code
title: "Compliance as Code: When Your Architecture Enforces the Law"
authors: [osamah]
tags: [enterprise, compliance, architecture]
---

Checklists don't work. Training doesn't stick. Audits find problems months after they happen.

What if your software architecture made non-compliance impossible?

<!-- truncate -->

<OrbitalDiagram />

## The Checklist Failure

Every regulated industry relies on checklists:

- Healthcare: "Did you verify patient identity before administering medication?"
- Finance: "Did you obtain two approvals for transactions over $10,000?"
- Government: "Did you complete all mandatory inspection fields before closing the case?"

The problem: checklists are *suggestions*. They depend on humans remembering, caring, and having time. Under pressure, steps get skipped. In emergencies, protocols get bypassed. During crunch, shortcuts become standard practice.

The result: compliance failures discovered months later during audits, leading to fines, lawsuits, and harm.

## The Architecture-First Alternative

What if the software *couldn't* skip steps?

Not a warning dialog. Not a red banner. The transition itself doesn't exist unless the conditions are met.

In Almadar, this is how every workflow works. A government inspection system we built demonstrates the pattern:

```json
{
  "name": "InspectionWorkflow",
  "entity": {
    "name": "Inspection",
    "fields": [
      { "name": "phase", "type": "enum", "values": ["introduction", "content", "preparation", "record", "closing"] },
      { "name": "legalBasis", "type": "string" },
      { "name": "findings", "type": "string" },
      { "name": "measures", "type": "string" },
      { "name": "inspectorSignature", "type": "boolean", "default": false },
      { "name": "subjectSignature", "type": "boolean", "default": false },
      { "name": "caseNumber", "type": "string" }
    ]
  }
}
```

### Phase Transitions with Guards

Each phase transition is guarded by legal requirements:

```json
{
  "from": "Introduction",
  "to": "Content",
  "event": "PROCEED",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.caseNumber"]
  ],
  "effects": [
    ["set", "@entity.phase", "content"],
    ["log", "info", "Phase transition: Introduction → Content"]
  ]
}
```

The inspector *cannot* move to the Content phase without entering the legal basis and case number. There's no "skip" button. There's no override. The transition doesn't exist until the guard evaluates to true.

### The Closing Guard: Everything Must Be Complete

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ],
  "effects": [
    ["set", "@entity.phase", "closing"],
    ["persist", "update", "Inspection", "@entity"],
    ["emit", "INSPECTION_COMPLETED"]
  ]
}
```

To close an inspection:
- Legal basis must be filled
- Findings must be documented
- Measures must be specified
- Inspector must have signed
- Subject must have signed

Miss any one, and the system stays in the Record phase. Not with an error message — the CLOSE button simply doesn't transition. The state machine *doesn't have a path* to Closing without all conditions met.

## Why This Is Different from Validation

Traditional validation:

```javascript
function closeInspection(inspection) {
  if (!inspection.legalBasis) {
    showError("Legal basis required");
    return; // But what if someone removes this check?
  }
  if (!inspection.findings) {
    showError("Findings required");
    return; // And this one?
  }
  // ... maybe 20 more checks
  // What if a new developer doesn't add the check for a new field?

  inspection.phase = "closing";
  save(inspection);
}
```

Problems:
1. **Validation can be bypassed** — a direct API call skips the frontend validation
2. **Validation can be incomplete** — a new required field gets added but the check doesn't
3. **Validation lives in code** — auditors can't verify it without reading JavaScript
4. **Validation is scattered** — frontend, backend, database each have their own version

Almadar guards:
1. **Cannot be bypassed** — the state machine is the only path. No API backdoor.
2. **Cannot be incomplete** — the compiler warns about unguarded transitions
3. **Live in the schema** — auditors read JSON, not code
4. **Are the single source of truth** — one guard, enforced everywhere

## The Audit Trail Problem (Solved)

Regulated industries need audit trails. Traditional approach: log statements scattered through code, hopefully covering every action.

In Almadar, every state transition is inherently logged:

```
[2025-05-30T10:15:32Z] Inspection INS-2025-0847
  Transition: Introduction → Content
  Event: PROCEED
  User: inspector-042
  Guard: passed (legalBasis=filled, caseNumber=INS-2025-0847)
  Effects: [set phase, log]
```

The audit trail isn't a feature you add. It's a consequence of the architecture. Every transition that fires has a `from` state, `to` state, event, user, timestamp, and guard result.

## Real-World Applications

### Healthcare: Medication Administration

```json
{
  "from": "Prepared",
  "to": "Administered",
  "event": "ADMINISTER",
  "guard": ["and",
    ["=", "@entity.patientVerified", true],
    ["=", "@entity.medicationVerified", true],
    ["=", "@entity.dosageVerified", true],
    ["=", "@entity.allergyCheckPassed", true],
    ["not", "@entity.expired"]
  ]
}
```

Five checks. All mandatory. The nurse can't administer medication without passing every one.

### Finance: Transaction Approval

```json
{
  "from": "PendingApproval",
  "to": "Approved",
  "event": "APPROVE",
  "guard": ["and",
    ["!=", "@payload.approverId", "@entity.requesterId"],
    [">=", "@user.approvalLimit", "@entity.amount"],
    ["if",
      [">", "@entity.amount", 50000],
      [">=", "@entity.approvalCount", 2],
      true
    ]
  ]
}
```

- Requester can't approve their own transaction
- Approver must have sufficient approval limit
- Transactions over $50k require two approvals

### Manufacturing: Quality Control

```json
{
  "from": "Testing",
  "to": "Released",
  "event": "RELEASE",
  "guard": ["and",
    [">=", "@entity.testsPassed", "@entity.testsRequired"],
    ["=", "@entity.defectsFound", 0],
    ["not-empty", "@entity.qualitySignoff"]
  ]
}
```

No product ships without passing all tests, having zero defects, and quality sign-off.

## The Schema as Specification

Here's the real power: **the schema IS the regulatory specification**.

When an auditor asks "how do you ensure inspections can't be closed without all fields complete?", you don't point them to code. You show them the schema:

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE_INSPECTION",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["=", "@entity.inspectorSignature", true]
  ]
}
```

A non-technical auditor can read this. It says: to go from Record to Closing, the legal basis must not be empty, findings must not be empty, and the inspector must have signed.

The specification and the implementation are the same artifact. They can never drift apart.

## The Takeaway

Compliance isn't a feature you bolt on. It's architecture.

State machine guards make non-compliance impossible — not discouraged, not warned against, *impossible*. The state machine has no transition to the next phase without the required conditions being true.

For regulated industries, this means:
- **Zero skipped steps** — guards enforce every requirement
- **Built-in audit trails** — every transition is logged by nature
- **Readable specifications** — auditors review JSON, not code
- **No drift** — schema is specification and implementation

The question isn't "how do we make people follow the checklist?" It's "how do we make the checklist unnecessary?"

Learn more about [guard clauses](/blog/guard-clauses-state-machines) and the [closed circuit pattern](/blog/closed-circuit-pattern).
