# ORCHESTRATION.md

## Diagram

    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ Executor │────▶│ Auditor  │────▶│  Signer  │
    └──────────┘     └──────────┘     └──────────┘
         │                │                │
         ▼                ▼                ▼
    ┌─────────┐     ┌──────────┐     ┌──────────┐
    │ Changes │     │ Evidence │     │ Approved │
    └─────────┘     └──────────┘     └──────────┘


## Workflow
Audit Mode (one executes, another audits, another signs)

## Objective
Ensure independence between execution, control, and final approval.

## Roles
- **Executor:** makes changes.
- **Auditor:** validates technical/process compliance.
- **Signer:** approves final release.

## Rules
- Auditor cannot be the executor.
- Signer reviews auditor's evidence, not just summary.
- No signature without complete evidence.

## Minimum evidence
- What changed
- Why it changed
- What tests were run
- Audit result

## Closure
- Explicit signature
- Exception log (if any)
