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

1. Browse the agents below
2. Copy the folder contents to your OpenClaw workspace
3. OpenClaw detects `BOOTSTRAP.md` → onboarding starts automatically

```bash
cp -r agents/tech/sre/pedro-sre/* ~/.openclaw/workspace/
```

## Agents

### 🛠️ Tech

#### SRE

| Agent | Description | Install |
|-------|-------------|---------|
| [Pedro SRE](./agents/tech/sre/pedro-sre) | Senior SRE for GCP/GKE infrastructure. Operates clusters, reviews logs, manages deployments. | `cp -r agents/tech/sre/pedro-sre/* ~/.openclaw/workspace/` |

#### Development

| Agent | Description | Install |
|-------|-------------|---------|
| [Linus Dev](./agents/tech/dev/linus-dev) | Senior software engineer. Writes clean code, reviews PRs, debugs issues, documents systems. | `cp -r agents/tech/dev/linus-dev/* ~/.openclaw/workspace/` |

### 👤 Personal

#### Productivity

| Agent | Description | Install |
|-------|-------------|---------|
| [Atlas](./agents/personal/productivity/atlas) | Personal productivity assistant. Manages calendar, tasks, priorities, and daily routines. | `cp -r agents/personal/productivity/atlas/* ~/.openclaw/workspace/` |

### 💼 Business

_Coming soon — PRs welcome!_

### 🎨 Creative

_Coming soon — PRs welcome!_

## Submit an agent

1. Fork this repo
2. Copy `agents/_template/` → `agents/<category>/<subcategory>/<your-slug>/`
3. Fill in all 8 files
4. Submit a PR

### Categories

- `tech/` → devops, sre, security, development
- `business/` → sales, marketing, finance, hr
- `personal/` → productivity, health, travel
- `creative/` → writing, design, content

## Why full bundles?

Most agent repos ship only a `SOUL.md`. That tells the agent *who to be*, but not *how to operate*.

A full bundle includes heartbeat configs, tool notes, onboarding flows — everything needed for the agent to be productive from day one.

## License

MIT
