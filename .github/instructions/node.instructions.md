---
applyTo: "**/package.json,**/routes/**,**/controllers/**,**/services/**,**/*.mjs"
---

# Node Rules

## DEFAULT SEVERITY

Route:
Low

Controller:
Low

Service:
Medium

Package.json:
High

Authentication:
High

Shared middleware:
High

---

## RULES

- Preserve response shape.
- Preserve status code conventions.
- Follow existing layering.
- Follow existing module boundaries.
- No new dependencies without approval.
- Prefer native Node.js APIs.
- Never hardcode configuration.
