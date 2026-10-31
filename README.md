# Copilot Engineering Framework (CEF) v1.0

A lightweight engineering framework for GitHub Copilot focused on:

- reducing rework
- reducing scope creep
- minimizing unnecessary context
- improving implementation consistency

Designed for:

- React
- Node.js
- Nginx

---

## Architecture

ENGINE.md
Core engineering model.

WORKFLOW.md
Operational execution workflow.

TASK_STATE.md
Ephemeral task context.

.github/copilot-instructions.md
Global Copilot adapter.

.github/instructions/*.instructions.md
Path-scoped engineering rules.

---

## Core Concepts

The framework is based on two independent dimensions:

### Severity

How risky a change is.

### Confidence

How certain the implementation context is.

Severity drives approval.

Confidence drives caution.

---

## Goal

The goal is not reducing token cost.

The goal is:

- fewer iterations
- less rework
- less context flooding
- higher first-pass acceptance

---

## Design Philosophy

Instructions guide behavior.

Verification establishes facts.

Human review is the final control layer.
