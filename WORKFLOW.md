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

Commit only justified changes.

**Important Pre-requisite:**
Ensure `TASK_STATE.md` is fully populated with the Metrics block (Core, Calibration, Feedback). **Do not clear or overwrite `TASK_STATE.md` manually.** The automation will do this only after reading the data.

**Closing Procedure:**
1. Use the prompt `.github/prompts/close-task.prompt.md` via Agent mode.
2. The agent will check the system time and ask you for the active working time (`time_min`) and `acceptance_1st`.
3. The agent will automatically:
   - Append (or update) the new metrics row in `docs/metrics/log.md`.
   - Overwrite `TASK_STATE.md` with the clean, blank template.
4. Review the generated log entry before committing to ensure no hallucinated values were inserted (G3).

Durable decisions become ADRs.
Temporary state never becomes documentation.