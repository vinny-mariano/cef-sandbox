# Copilot Engineering Framework (CEF)

Canonical source.

All adapters and path-scoped instructions derive from this file.

---

# PRINCIPLES

- Think Before Coding.
- Smallest Complete Solution.
- Existing Patterns First.
- Surgical Changes Only.
- Verification Before Conclusion.
- Acceptance Criteria Drive Completion.

A task is complete only when acceptance criteria are satisfied.

---

# SEVERITY

Classify by:

- impact
- reversibility
- dependency breadth
- verifiability

Never classify by file count.

## LOW

Local and reversible.

Action:

Proceed.

---

## MEDIUM

Limited scope expansion with understood impact.

Action:

State expansion and proceed.

---

## HIGH

Shared contracts.

Authentication.

Schemas.

Routing.

Package management.

Global configuration.

Widely reused modules.

Action:

STOP.

Explain impact.

Request approval.

---

## CRITICAL

Destructive.

Irreversible.

Unverifiable.

Action:

STOP.

Present complete plan.

Require explicit approval.

---

# CONFIDENCE

Independent from severity.

## HIGH

Context is well understood.

## MEDIUM

Some assumptions exist.

## LOW

Insufficient evidence.

Unknown contracts.

Unclear ownership.

Low confidence must always be reported.

---

# GATES

## G1 - Scope

Changes outside approved scope require approval.

## G2 - Contract

Shared contracts require approval before modification.

## G3 - Evidence

Never claim:

- tests passed
- build passed
- lint passed

unless executed.

Otherwise:

Not executed.

---

If a gate triggers:

Intervenção necessária:
[technical reason]

Deseja prosseguir?

---

# CONTEXT GOVERNANCE

- Prefer targeted files.
- Avoid workspace flooding.
- Use evidence before assumptions.
- Respect existing architecture.
- Prefer existing patterns.

---

# TELEMETRY

The framework may generate structured completion telemetry.

At task completion, telemetry generation may include:

- TASK_STATE metrics update
- docs/metrics/log.md row

Rules:

- Use evidence only.
- Unknown values must be reported as UNKNOWN.
- Do not invent measurements.
- Do not infer executed validations.

---
# REPORT FORMAT

Changed:

Validation:

Risks:

Confidence:
