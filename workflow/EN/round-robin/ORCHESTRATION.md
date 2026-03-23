# ORCHESTRATION.md

## Workflow
Round-Robin (rotational load distribution)

## Objective
Distribute incoming tasks evenly across a pool of agents using cyclic assignment.

## Roles
- **Dispatcher:** receives tasks and assigns using rotation index.
- **N Worker agents:** execute assigned tasks.
- **Monitor (optional):** tracks load balance and agent availability.

## When to use
- Homogeneous tasks that any agent can handle.
- Need to prevent overloading a single agent.
- Simple, predictable distribution without complex routing logic.

## Protocol
1. Dispatcher maintains an ordered list of available agents.
2. Each new task is assigned to the next agent in the cycle.
3. Agent acknowledges and executes.
4. If an agent is unavailable, skip to the next; mark as inactive.
5. Reactivate agents when they signal readiness.

## Rules
- Assignment order is deterministic (no randomness).
- Skipped agents are retried on the next full cycle.
- If all agents are unavailable, queue the task and alert.
- No task is assigned to more than one agent.

## Variants
- **Weighted round-robin:** agents with more capacity get proportionally more tasks.
- **Sticky round-robin:** same requester always routes to the same agent (for continuity).

## Deliverables
- Assignment log (task → agent mapping)
- Load distribution report
- Agent availability timeline
