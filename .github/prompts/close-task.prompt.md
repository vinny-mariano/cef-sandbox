# CEF Close Task & Reset

You are in Phase 6 (Close). The task has been verified and approved by the human.

## PRE-FLIGHT CHECK (Gate)
Before doing anything else, read the current `TASK_STATE.md`.
- If the `METRICS` section is empty or missing the `Calibration` and `Framework Feedback` data, **STOP immediately**.
- Output ONLY: "Erro de Fechamento: O TASK_STATE.md está vazio ou incompleto. Por favor, preencha as métricas antes de rodar o Close Task."
- Do NOT generate a log line with `UNKNOWN` values. Do not proceed.

## HUMAN INPUT (Required)
Ask the human for:
1. `acceptance_1st` (Y or N)
2. `time_min` (Check system time or git history to estimate wall-clock time. Ask the human for the *active* working time excluding breaks).

*Do not proceed until the human provides these values.*

## YOUR TASK
1. Read the current `TASK_STATE.md`.
2. Extract the calibration and feedback metrics.
3. Construct one row in the Markdown table format using the human inputs and the extracted metrics.
4. **Check `docs/metrics/log.md`**: If a row for this Task ID already exists, update it. If not, append the new row.
5. **Overwrite** `TASK_STATE.md` with the blank template provided below.
6. Report strictly:
   - "Log updated."
   - "TASK_STATE reset."
   - [Show the line you added to the log]

## LOG FORMAT
| Date | Task | Sev_P | Sev_A | Conf_P | Conf_A | Iter | Time | First | Scope | Rules_Caught | Rules_Friction |
|------|------|------|------|------|------|------|------|------|------|------|------|
| YYYY-MM-DD | [Task ID/Objective] | [L/M/H] | [L/M/H] | [H/M/L] | [H/M/L] | [Number] | [time_min] | [acceptance_1st] | [Y/N] | [Rules] | [Rules] |

## BLANK TEMPLATE FOR TASK_STATE.md
```markdown
# TASK STATE

Ephemeral task context.

One ACTIVE block per task.

---

## ACTIVE

Task ID:

Status:
planned | implementing | verifying | done

Objective:

Acceptance:

Scope:

Severity:

Confidence:

Assumptions:

Plan:

Verified:

Open Risks:

---

## METRICS

### Core

time_min:

iterations:

acceptance_1st:

scope_escape:

### Calibration

sev_pred:

sev_actual:

conf_pred:

conf_actual:

### Framework Feedback

rules_caught:

rules_friction:

### Validation

validation_summary:

### Notes

observations: