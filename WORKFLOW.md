# CEF Operational Workflow

Instructions guide.

Verification decides.

---

# PHASE 0 — DEFINE

Capture:

- objective
- acceptance criteria
- scope

Populate TASK_STATE.md.

Predict:

- Severity
- Confidence

before opening any AI session.

---

# PHASE 1 — PLAN

Preferred:

- Copilot Plan Mode

Fallback:

- Chat planning

Output:

- scope
- assumptions
- risks
- implementation strategy

No edits.

---

# PHASE 2 — REVIEW

Human validation.

Verify:

- objective
- scope
- assumptions
- severity
- confidence

Approve before implementation.

---

# PHASE 3 — IMPLEMENT

One task.

One session.

Prefer:

- @specific-file

Avoid:

- @workspace

unless required.

Standard prompt:

Implement the approved plan in TASK_STATE.md.

Stay within the approved scope.

Follow ENGINE.md.

Report only:

Changed

Validation

Risks

Confidence

---

# PHASE 4 — VERIFY

Evidence hierarchy:

1. Tests
2. Build
3. Lint
4. Runtime verification
5. Manual inspection

Review changed lines.

Update in TASK_STATE.md:

- Verified
- Metrics

Validate that reported evidence matches actual execution.

---

# PHASE 5 — RED TEAM REVIEW

Required for:

- High
- Critical

Prompt:

You are a hostile reviewer.

Find only:

- broken contracts
- regressions
- hidden risks
- missing edge cases
- invalid validation

No praise.

Do not modify files.

---

# PHASE 6 — CLOSE

Run the CEF Close Task prompt.

Update TASK_STATE metrics.

Generate one append-only entry for:

docs/metrics/log.md

Review generated metrics.

Verify that logged values are supported by evidence.

Commit only justified changes.

Archive or delete TASK_STATE.md.

Permanent decisions become ADRs.

Task state never becomes documentation.
