# metrono-agents

A curated collection of production-ready OpenClaw agent bundles.

Unlike other agent repos that only ship a `SOUL.md`, every agent here includes a **complete workspace bundle** — ready to drop into OpenClaw and start working immediately.

## What's inside each agent

```
agents/<slug>/
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
2. Copy the folder to your OpenClaw workspace
3. OpenClaw detects `BOOTSTRAP.md` → onboarding starts automatically

```bash
cp -r agents/pedro-sre/* ~/.openclaw/workspace/
```

## Agents

| Agent | Category | Description |
|-------|----------|-------------|
| [Pedro SRE](./agents/pedro-sre) | DevOps | Senior SRE for GCP/GKE infrastructure |

## Submit an agent

1. Fork this repo
2. Copy `agents/_template/` → `agents/your-agent-slug/`
3. Fill in all files
4. Submit a PR

## License

MIT
