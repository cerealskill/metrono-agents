# 🤖 PickUp! an Agent

> A curated marketplace of production-ready OpenClaw agent bundles and multi-agent workflows — available in English and Spanish.

Unlike other agent repos that only ship a `SOUL.md`, every agent here includes a **complete workspace bundle** — ready to drop into OpenClaw and start working immediately. Plus, a growing library of **orchestration workflows** for multi-agent collaboration.

**[→ Browse the catalog](https://craw-agents.vercel.app/)**

---

## What's inside each agent

```
agents/<lang>/<category>/<subcategory>/<slug>/
  SOUL.md        ← personality, behavior, vibe
  IDENTITY.md    ← name, emoji, avatar
  USER.md        ← template for the human's info
  AGENTS.md      ← operational rules
  HEARTBEAT.md   ← periodic check config
  TOOLS.md       ← tool-specific notes
  BOOTSTRAP.md   ← onboarding flow on first install
  meta.yaml      ← marketplace metadata
```

Agents are organized by language (`EN`/`ES`), then by category and subcategory.

## What's inside each workflow

```
workflow/<lang>/<slug>/
  ORCHESTRATION.md   ← diagram, roles, rules, evidence, closure (EN)
  ORQUESTACION.md    ← same structure in Spanish (ES)
```

Workflows define multi-agent collaboration patterns — how agents coordinate, vote, escalate, and hand off work.

---

## Install an agent

### One-liner (recommended)

```bash
# English (default)
curl -fsSL https://raw.githubusercontent.com/cerealskill/openclaw-agents/main/install.sh | bash -s <slug>

# Spanish
curl -fsSL https://raw.githubusercontent.com/cerealskill/openclaw-agents/main/install.sh | bash -s <slug> ES
```

The script downloads all bundle files into `~/.openclaw/workspace-<slug>` and registers the workspace with `openclaw agents add`.

### Manual

```bash
cp -r agents/EN/tech/sre/pedro-sre/* ~/.openclaw/workspace-pedro-sre/
```

---

## Agent Catalog

### 🛠️ Tech

| Agent | Role | Description | Lang |
|-------|------|-------------|------|
| [Pedro SRE](./agents/EN/tech/sre/pedro-sre) | SRE | Multi-cloud SRE (GCP, AWS, Azure). Kubernetes, Terraform, observability. | EN/ES |
| [Linus Dev](./agents/EN/tech/dev/linus-dev) | Dev | Senior engineer. Code review, debugging, architecture design. Python, TS, Go, SQL. | EN/ES |
| [Sentinel](./agents/EN/tech/security/sentinel) | Security | Threat modeling, infra/code audit, CVE management, incident response. | EN/ES |

### 💼 Business

| Agent | Role | Description | Lang |
|-------|------|-------------|------|
| [Pipeline](./agents/EN/business/sales/pipeline) | Sales | Lead scoring, outreach sequences, deal analysis, pipeline reporting. | EN/ES |

### 👤 Personal

| Agent | Role | Description | Lang |
|-------|------|-------------|------|
| [Atlas](./agents/ES/personal/productivity/atlas) | Productivity | GTD, time blocking, Eisenhower matrix, Pomodoro, daily routines. | ES |
| [Sofía](./agents/ES/personal/psicology/sofia-psicologa) | Psicología | CBT, humanist approach, mindfulness, ACT. Emotional support and wellbeing. | ES |

### 🎨 Creative

| Agent | Role | Description | Lang |
|-------|------|-------------|------|
| [Echo](./agents/EN/creative/content/echo) | Content | Blog posts, social copy, newsletters, landing pages. | EN/ES |

---

## Workflow Catalog

28 orchestration patterns available in English and Spanish:

| Workflow | Description |
|----------|-------------|
| [Audit Mode](./workflow/EN/audit-mode) | Executor + Auditor + Signer — 3-way approval |
| [Automatic On-Call](./workflow/EN/automatic-on-call) | Auto-rotation on-call scheduling |
| [Budget Router](./workflow/EN/budget-router) | Route by cost/budget efficiency |
| [Canary Rollout](./workflow/EN/canary-rollout) | Gradual deployment with staged rollout |
| [Chain of Thought](./workflow/EN/chain-of-thought) | Sequential reasoning steps |
| [Committee Mode](./workflow/EN/committee-mode) | Multi-agent voting on decisions |
| [Consensus Voting](./workflow/EN/consensus-voting) | Agreement-based decision making |
| [Escalation Chain](./workflow/EN/escalation-chain) | Tier-based escalation protocol |
| [Feedback Loop](./workflow/EN/feedback-loop) | Iterative improvement cycles |
| [Follow the Sun](./workflow/EN/follow-the-sun) | Global timezone handoff |
| [Hub and Spoke](./workflow/EN/hub-and-spoke) | Central coordination with distributed execution |
| [Incident Mode](./workflow/EN/incident-mode) | Crisis response protocol |
| [Map Reduce](./workflow/EN/map-reduce) | Divide-and-conquer parallel processing |
| [Mentor Mode](./workflow/EN/mentor-mode) | Teaching and knowledge transfer |
| [On-Demand Specialist](./workflow/EN/on-demand-specialist) | Expert consultation on-the-fly |
| [Pair Programming](./workflow/EN/pair-programming) | Driver + Navigator realtime collaboration |
| [Parallel Swarm](./workflow/EN/parallel-swarm) | Concurrent multi-agent execution |
| [RACI Matrix](./workflow/EN/raci-matrix) | Role-based responsibility assignment |
| [Red Team / Blue Team](./workflow/EN/red-team-blue-team) | Adversarial testing |
| [Research → Execution](./workflow/EN/research-execution) | Investigate first, then execute |
| [Retry / Rollback](./workflow/EN/retry-rollback) | Failure recovery with rollback |
| [Round Robin](./workflow/EN/round-robin) | Sequential agent rotation |
| [Stage Pipeline](./workflow/EN/stage-pipeline) | Multi-stage sequential workflow |
| [Technical Arbiter](./workflow/EN/technical-arbiter) | Technical dispute resolution |
| [Triage](./workflow/EN/triage) | Classify and prioritize incoming work |
| [Watchdog Supervisor](./workflow/EN/watchdog-supervisor) | Continuous monitoring and alerting |
| [Weekly Planning](./workflow/EN/weekly-planning) | Sprint planning and retrospective |
| [Workflow Composition](./workflow/EN/workflow-composition) | Nested and composable workflows |

---

## Contribute

The easiest way is via the **web UI**: [craw-agents.vercel.app/contribute](https://craw-agents.vercel.app/contribute)

1. Sign in with Google
2. Complete the 3-step wizard (Basic info → Files → Review)
3. A PR is opened automatically — no git required

### Manual contribution

1. Fork this repo
2. Copy `agents/_template/` to your new path:
   ```
   agents/<lang>/<category>/<subcategory>/<your-slug>/
   ```
3. Fill in all 8 files
4. Run the registry builder:
   ```bash
   node scripts/build-registry.js
   ```
5. Submit a PR

> **Note:** When your PR is merged, a GitHub Action automatically rebuilds the registry and triggers a Vercel redeploy — the agent appears on the site within ~1 minute.

### Categories

| Category | Subcategories |
|----------|--------------|
| `tech/` | `sre`, `dev`, `security`, `devops`, `data` |
| `business/` | `sales`, `marketing`, `finance`, `ops` |
| `personal/` | `productivity`, `health`, `learning`, `psicology` |
| `creative/` | `content`, `design`, `writing`, `music` |

### Quality checklist

- [ ] `SOUL.md` has a clear personality and operational rules
- [ ] `USER.md` is a generic template (no personal data)
- [ ] `BOOTSTRAP.md` has a natural onboarding conversation starter
- [ ] `meta.yaml` has accurate tags and category
- [ ] No hardcoded credentials or personal info

---

## Architecture

```
GitHub repo
  ├── agents/
  │    ├── EN/                  ← English agent bundles
  │    ├── ES/                  ← Spanish agent bundles
  │    └── _template/           ← scaffold for new agents
  ├── workflow/
  │    ├── EN/                  ← English orchestration patterns
  │    └── ES/                  ← Spanish orchestration patterns
  ├── scripts/
  │    └── build-registry.js    ← generates agents-data.ts, workflows-data.ts, JSON
  └── web/                      ← Next.js 16 + Tailwind v4 + TypeScript
       ├── app/                 ← App Router (agents, workflows, contribute, docs)
       ├── components/          ← AgentCard, WorkflowCard, Search, ContributeForm
       └── lib/
            ├── agents-data.ts      ← auto-generated agent registry
            └── workflows-data.ts   ← auto-generated workflow registry

CI/CD
  ├── push to main → GitHub Action rebuilds registry → commit [skip ci]
  └── any commit to main → GitHub webhook → Vercel deploy hook → auto-deploy
```

**Auth:** NextAuth v5 (Google OAuth) with JWT strategy — no database required.  
**Contributions:** PR-based workflow. `POST /api/contribute` creates a branch and opens a PR automatically.

---

## Why full bundles?

Most agent repos ship only a `SOUL.md`. That tells the agent *who to be*, but not *how to operate*.

A full bundle includes heartbeat configs, tool notes, and onboarding flows — everything needed for the agent to be productive from day one.

---

## License

MIT
