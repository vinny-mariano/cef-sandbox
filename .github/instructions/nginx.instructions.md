---
applyTo: "**/*.conf,**/nginx/**,**/sites-available/**,**/sites-enabled/**"
---

# Nginx Rules

## DEFAULT SEVERITY

High or Critical.

---

## RULES

- Explain impact before changes.
- Preserve location conventions.
- Preserve upstream conventions.
- Preserve header conventions.
- Prefer targeted edits.
- Avoid restructuring unrelated blocks.

Production changes require:

- validation path
- rollback path

Validation example:

nginx -t

If not executed report:

Not executed.
