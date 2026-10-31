# Copilot Engineering Framework (CEF) v1.0

A lightweight engineering framework for GitHub Copilot.

Designed to:

- reduce rework
- reduce scope creep
- reduce unnecessary context usage
- improve first-pass implementation quality

Originally designed for:

- React
- Node.js
- Nginx

---

## Architecture

### ENGINE.md

Core decision model.

### WORKFLOW.md

Operational workflow.

### TASK_STATE.md

Ephemeral task context.

### docs/metrics/log.md

Append-only task metrics log.

### docs/metrics/review.md

Periodic framework review and calibration.

### .github/copilot-instructions.md

Global Copilot adapter.

### .github/instructions/

Path-scoped instructions.

### .github/prompts/

Reusable Copilot prompts.

---

## Framework Goals

The goal is not minimizing tokens directly.

The goal is:

- fewer iterations
- less rework
- better scope control
- higher first-pass acceptance

Telemetry generation and metrics collection exist to evaluate these outcomes.

---

## Design Philosophy

Instructions guide behavior.

Verification establishes facts.

Human review remains the final authority.

---

## Framework Lifecycle

Predict:

- Severity
- Confidence

Execute:

- Plan
- Implement
- Verify

Measure:

- First-pass success
- Iterations
- Scope escape
- Severity calibration
- Confidence calibration

Review:

- Rule effectiveness
- Friction
- Framework sustainability

---

## Freeze Protocol

CEF v1.0.0 remains frozen for the first 20 completed tasks.

Allowed changes during the trial:

- broken glob fixes
- broken links
- documentation mistakes

Not allowed:

- rule changes
- severity changes
- workflow changes

During the freeze period:

- log every completed task
- perform weekly reviews
- collect evidence before proposing changes

After 20 logged tasks:

- review metrics
- evaluate rule effectiveness
- identify friction points
- decide v1.1 changes
