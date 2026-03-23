# ORCHESTRATION.md

## Workflow
Parallel Swarm

## Objective
Accelerate execution by dividing work into independent pieces that run in parallel.

## Roles
- **Swarm coordinator:** partitions and consolidates.
- **N executor agents:** each on an isolated subproblem.
- **Final validator:** detects cross inconsistencies.

## When to use
- Highly parallelizable tasks.
- Short time window.

## Rules
1. Design partition without overlap.
2. Define output contract per agent.
3. Synchronize at fixed checkpoints.
4. Final merge with compatibility validation.

## Common risks
- Duplicate work
- Incompatibility between outputs
- Criteria drift

## Mitigation
- Unique output template
- Shared conventions
- Mandatory technical reconciliation at closure