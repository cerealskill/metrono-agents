# 🤖 PickUp! a Agent

> A curated marketplace of production-ready OpenClaw agent bundles.

Unlike other agent repos that only ship a `SOUL.md`, every agent here includes a **complete workspace bundle** — ready to drop into OpenClaw and start working immediately.

**[→ Browse the catalog](https://metrono-agents.vercel.app/)**

---

## What's inside each agent

```
agents/<category>/<subcategory>/<slug>/
  SOUL.md        ← personality, behavior, vibe
  IDENTITY.md    ← name, emoji, avatar
  USER.md        ← template for the human's info
  AGENTS.md      ← operational rules
  HEARTBEAT.md   ← periodic check config
  TOOLS.md       ← tool-specific notes
  BOOTSTRAP.md   ← onboarding flow on first install
  meta.yaml      ← marketplace metadata
```

---

## Install an agent

### One-liner (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/cerealskill/metrono-agents/main/install.sh | bash -s <slug>
```

The script downloads all bundle files and registers the workspace with `openclaw agents add`.

### Manual

```bash
cp -r agents/tech/sre/pedro-sre/* ~/.openclaw/workspace/
```

---

## Catalog

### 🛠️ Tech

| Agent | Role | Description |
|-------|------|-------------|
| [Pedro SRE](./agents/tech/sre/pedro-sre) | SRE | Senior SRE for GCP/GKE. Operates clusters, reviews logs, manages deployments. |
| [Linus Dev](./agents/tech/dev/linus-dev) | Dev | Senior software engineer. Clean code, PR reviews, debugging, documentation. |
| [Sentinel](./agents/tech/security/sentinel) | Security | Vulnerability scanning, access audits, threat monitoring. |

### 💼 Business

| Agent | Role | Description |
|-------|------|-------------|
| [Pipeline](./agents/business/sales/pipeline) | Sales | Lead scoring, follow-up automation, pipeline reporting. |

### 👤 Personal

| Agent | Role | Description |
|-------|------|-------------|
| [Atlas](./agents/personal/productivity/atlas) | Productivity | Calendar, tasks, priorities, daily routines. |
| [Sofía](./agents/personal/psicology/sofia-psicologa) | Psicología | Acompañamiento emocional, reflexión y bienestar personal. |

### 🎨 Creative

| Agent | Role | Description |
|-------|------|-------------|
| [Echo](./agents/creative/content/echo) | Content | Blog posts, social copy, newsletters, landing pages. |

---

## Contribute an agent

The easiest way is via the **web UI**: [metrono-agents.vercel.app/contribute](https://metrono-agents.vercel.app/contribute)

1. Sign in with Google
2. Complete the 3-step wizard (Basic info → Files → Review)
3. A PR is opened automatically — no git required

### Manual contribution

1. Fork this repo
2. Copy `agents/_template/` to your new path:
   ```
   agents/<category>/<subcategory>/<your-slug>/
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

### Agent quality checklist

- [ ] `SOUL.md` has a clear personality and operational rules
- [ ] `USER.md` is a generic template (no personal data)
- [ ] `BOOTSTRAP.md` has a natural onboarding conversation starter
- [ ] `meta.yaml` has accurate tags and category
- [ ] No hardcoded credentials or personal info

---

## Architecture

```
GitHub repo
  └── agents/**          ← static bundles (source of truth)
  └── scripts/
       └── build-registry.js  ← generates agents-data.ts + agents.json
  └── web/               ← Next.js 16 + Tailwind + TypeScript
       └── app/          ← App Router pages
       └── components/   ← AgentSearch, AgentCard, ContributeForm, AuthButton
       └── lib/
            └── agents-data.ts  ← auto-generated, embedded as TS const

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
