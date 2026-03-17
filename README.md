# metrono-agents

A curated collection of production-ready OpenClaw agent bundles.

Unlike other agent repos that only ship a `SOUL.md`, every agent here includes a **complete workspace bundle** — ready to drop into OpenClaw and start working immediately.

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

## Install an agent

Copy the bundle to your OpenClaw workspace. The `BOOTSTRAP.md` will guide you through setup automatically.

```bash
cp -r agents/tech/sre/pedro-sre/* ~/.openclaw/workspace/
```

## Agents

### 🛠️ Tech

#### SRE

| Agent | Description |
|-------|-------------|
| [Pedro SRE](./agents/tech/sre/pedro-sre) | Senior SRE for GCP/GKE. Operates clusters, reviews logs, manages deployments. |

#### Development

| Agent | Description |
|-------|-------------|
| [Linus Dev](./agents/tech/dev/linus-dev) | Senior software engineer. Clean code, PR reviews, debugging, documentation. |

#### Security

| Agent | Description |
|-------|-------------|
| [Sentinel](./agents/tech/security/sentinel) | Security analyst. Vulnerability scanning, access audits, threat monitoring. |

### 💼 Business

#### Sales

| Agent | Description |
|-------|-------------|
| [Pipeline](./agents/business/sales/pipeline) | Sales assistant. Lead scoring, follow-up automation, pipeline reporting. |

### 👤 Personal

#### Productivity

| Agent | Description |
|-------|-------------|
| [Atlas](./agents/personal/productivity/atlas) | Personal productivity assistant. Calendar, tasks, priorities, daily routines. |

### 🎨 Creative

#### Content

| Agent | Description |
|-------|-------------|
| [Echo](./agents/creative/content/echo) | Content writer. Blog posts, social copy, newsletters, landing pages. |

---

## Submit an agent

We welcome contributions! Every agent must include all 8 files.

### Steps

1. Fork this repo
2. Copy `agents/_template/` to your new path:
   ```
   agents/<category>/<subcategory>/<your-slug>/
   ```
3. Fill in all 8 files (SOUL.md, IDENTITY.md, USER.md, AGENTS.md, HEARTBEAT.md, TOOLS.md, BOOTSTRAP.md, meta.yaml)
4. Run `node scripts/build-registry.js` to update the registry
5. Submit a PR

### Categories

| Category | Subcategories |
|----------|--------------|
| `tech/` | `sre`, `dev`, `security`, `devops` |
| `business/` | `sales`, `marketing`, `finance`, `hr` |
| `personal/` | `productivity`, `health`, `travel` |
| `creative/` | `content`, `design`, `video` |

### Agent quality checklist

- [ ] SOUL.md has a clear personality and operational rules
- [ ] USER.md is a template (no personal data)
- [ ] BOOTSTRAP.md has a natural onboarding conversation starter
- [ ] meta.yaml has accurate tags and category
- [ ] No hardcoded credentials or personal info

---

## Why full bundles?

Most agent repos ship only a `SOUL.md`. That tells the agent *who to be*, but not *how to operate*.

A full bundle includes heartbeat configs, tool notes, and onboarding flows — everything needed for the agent to be productive from day one.

## License

MIT
