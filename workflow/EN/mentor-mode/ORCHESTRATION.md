# ORCHESTRATION.md

## Workflow
Mentor Mode (senior reviews junior before delivery)

## Objective
Raise delivery quality and accelerate learning through guided review.

## Roles
- **Junior:** executes initial proposal.
- **Senior/Mentor:** reviews, corrects, teaches.

## Flow
1. Junior delivers functional draft.
2. Senior reviews against checklist.
3. Junior applies corrections.
4. Senior gives final approval.

## Mentor checklist
- Technical correctness
- Clarity and maintainability
- Risks and edge cases
- Quality of outgoing communication

## Key rule
- Nothing is delivered externally without senior review.

## Deliverables
- Final approved version
- Brief feedback for learning

## Diagram

    ┌──────────┐         ┌──────────┐
    │  Junior  │────────▶│  Senior  │
    │  Draft   │         │  Review  │
    └──────────┘         └────┬─────┘
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              ┌──────────┐        ┌──────────┐
              │ Approved │        │ Feedback │
              │  ✓ Ship  │        │ ↩ Redo   │
              └──────────┘        └────┬─────┘
                                       │
                                       ▼
                                 ┌──────────┐
                                 │  Junior  │
                                 │ Corrects │
                                 └──────────┘
