# ORCHESTRATION.md

## Diagram

    ┌─────────┐     ┌────────────┐     ┌───────────┐
    │  Alert  │────▶│ Dispatcher │────▶│ Classify  │
    └─────────┘     └────────────┘     └─────┬─────┘
                                             │
                         ┌───────────────────┼───────────────────┐
                         ▼                   ▼                   ▼
                    ┌─────────┐        ┌─────────┐        ┌─────────┐
                    │  Sev1   │        │  Sev2   │        │  Sev3   │
                    └────┬────┘        └────┬────┘        └────┬────┘
                         ▼                  ▼                  ▼
                    ┌──────────┐     ┌───────────┐     ┌───────────┐
                    │ Escalate │     │ Auto-fix  │     │ Auto-fix  │
                    │ + Human  │     │ + Verify  │     │ + Close   │
                    └──────────┘     └───────────┘     └───────────┘


## Workflow
Automatic On-call

## Objective
Respond to incidents automatically with triage, initial mitigation, and human escalation when appropriate.

## Roles
- **Dispatcher:** classifies alert and assigns flow.
- **Automatic responder:** executes first response runbook.
- **Escalator:** notifies human on-call if threshold is exceeded.

## Flow
1. Alert ingestion
2. Classification (sev1/sev2/sev3)
3. Allowed automatic action (safe list)
4. Post-action verification
5. Escalation or closure

## Suggested SLA
- Ack: <5 min
- Initial mitigation: <15 min
- Sev1 escalation: immediate

## Guardrails
- Forbidden to execute destructive automatic actions.
- Every action must be audited with timestamp.

## Deliverable
- Timeline
- Preliminary root cause
- Actions taken
