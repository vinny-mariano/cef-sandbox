---
applyTo: "**/package.json,**/routes/**,**/controllers/**,**/services/**,**/*.mjs"
---

# Node Rules

## DEFAULT SEVERITY

Routes:
Low

Controllers:
Low

Services:
Medium

Package.json:
High

Authentication:
High

Shared Middleware:
High

---

## RULES

- Preserve response shape.
- Preserve status code conventions.
- Follow existing layering.
- Preserve module boundaries.
- No new dependencies without approval.
- Prefer native Node.js APIs.
- Never hardcode configuration values.
