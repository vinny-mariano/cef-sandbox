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

ENGINE.md

Core decision model.

WORKFLOW.md

Operational workflow.

TASK_STATE.md

Ephemeral task context.

docs/metrics/

Metrics and calibration.

.github/copilot-instructions.md

Global Copilot adapter.

.github/instructions/

Path-scoped instructions.

---

## Framework Goals

The goal is not minimizing tokens directly.

The goal is:

- fewer iterations
- less rework
- better scope control
- higher first-pass acceptance

---

## Design Philosophy

Instructions guide behavior.

Verification establishes facts.

Human review remains the final authority.

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

After 20 logged tasks:

- review metrics
- evaluate rule effectiveness
- decide v1.1 changes
