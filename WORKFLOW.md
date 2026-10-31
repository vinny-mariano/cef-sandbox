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

One chat.

Prefer:

@specific-file

Avoid:

@workspace

unless required.

Standard implementation prompt:

Implement the approved plan in TASK_STATE.md.

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
4. Runtime validation
5. Manual inspection

Review every changed line.

Update TASK_STATE.md.

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

Commit only justified changes.

Remove or archive TASK_STATE.md.

Permanent decisions become ADRs.

Task state never becomes documentation.
