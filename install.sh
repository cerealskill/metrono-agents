#!/usr/bin/env bash
# install.sh — metrono-agents installer
# Usage: curl -fsSL https://raw.githubusercontent.com/cerealskill/openclaw-agents/main/install.sh | bash -s <slug>
set -e


SLUG="${1:-}"
LANG="${2:-EN}"
REPO="cerealskill/openclaw-agents"
BRANCH="main"
RAW="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
API="https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1"

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'


if [ -z "$SLUG" ]; then
  echo -e "${RED}Usage: curl -fsSL .../install.sh | bash -s <agent-slug> [EN|ES]${RESET}"
  exit 1
fi

LANG_UPPER=$(echo "$LANG" | tr '[:lower:]' '[:upper:]')
if [ "$LANG_UPPER" != "EN" ] && [ "$LANG_UPPER" != "ES" ]; then
  echo -e "${RED}Invalid language: $LANG. Use EN or ES.${RESET}"
  exit 1
fi

echo -e "${BOLD}${CYAN}metrono-agents installer${RESET}"
echo ""

echo "→ Looking up agent '${SLUG}'..."

# Fetch tree to temp file to avoid stdin conflicts
TMP=$(mktemp)
curl -fsSL "$API" -o "$TMP"


# Try to find agent or workflow path in the selected language
AGENT_PATH=""
WORKFLOW_PATH=""
if command -v python3 &>/dev/null; then
  AGENT_PATH=$(python3 -c "
import json, sys
slug = sys.argv[1]
lang = sys.argv[2]
with open(sys.argv[3]) as f:
    tree = json.load(f).get('tree', [])
prefix = f'agents/{lang}/'
paths = [x['path'] for x in tree if x.get('type') == 'tree' and x['path'].startswith(prefix) and (x['path'].endswith('/' + slug) or x['path'].split('/')[-1] == slug)]
print(paths[0] if paths else '')
" "$SLUG" "$LANG_UPPER" "$TMP" 2>/dev/null)
  WORKFLOW_PATH=$(python3 -c "
import json, sys
slug = sys.argv[1]
lang = sys.argv[2]
with open(sys.argv[3]) as f:
    tree = json.load(f).get('tree', [])
prefix = f'workflow/{lang}/'
paths = [x['path'] for x in tree if x.get('type') == 'tree' and x['path'].startswith(prefix) and (x['path'].endswith('/' + slug) or x['path'].split('/')[-1] == slug)]
print(paths[0] if paths else '')
" "$SLUG" "$LANG_UPPER" "$TMP" 2>/dev/null)
elif command -v jq &>/dev/null; then
  AGENT_PATH=$(jq -r --arg slug "$SLUG" --arg lang "$LANG_UPPER" '.tree[] | select(.type=="tree") | .path | select(startswith("agents/"+$lang+"/") and (. == $slug or endswith("/" + $slug)))' "$TMP" | head -1)
  WORKFLOW_PATH=$(jq -r --arg slug "$SLUG" --arg lang "$LANG_UPPER" '.tree[] | select(.type=="tree") | .path | select(startswith("workflow/"+$lang+"/") and (. == $slug or endswith("/" + $slug)))' "$TMP" | head -1)
fi

rm -f "$TMP"


if [ -n "$AGENT_PATH" ]; then
  echo -e "  Found agent: ${CYAN}${AGENT_PATH}${RESET}"
  echo ""
  # Use slug as workspace name and default install path (no interactive prompts when piped)
  WS_NAME="$SLUG"
  WS_PATH="${HOME}/.openclaw/workspace-${WS_NAME}"
  echo -e "  Workspace name: ${CYAN}${WS_NAME}${RESET}"
  echo -e "  Install path:   ${CYAN}${WS_PATH}${RESET}"
  echo ""
  echo "→ Downloading bundle files..."
  mkdir -p "$WS_PATH"
  FILES=(SOUL.md IDENTITY.md USER.md AGENTS.md HEARTBEAT.md TOOLS.md BOOTSTRAP.md)
  for f in "${FILES[@]}"; do
    URL="${RAW}/${AGENT_PATH}/${f}"
    if curl -fsSL "$URL" -o "${WS_PATH}/${f}" 2>/dev/null; then
      echo -e "  ${GREEN}✓${RESET} ${f}"
    else
      echo -e "  (skipped ${f} — not found)"
    fi
  done
  echo ""
  echo "→ Registering agent in OpenClaw..."
  if command -v openclaw &>/dev/null; then
    openclaw agents add "$WS_NAME" --workspace "$WS_PATH" --non-interactive && \
      echo -e "  ${GREEN}✓${RESET} Agent '${WS_NAME}' registered" || \
      echo -e "  (openclaw agents add failed — workspace is ready at ${WS_PATH})"
  else
    echo -e "  (openclaw CLI not found — workspace ready at ${WS_PATH})"
    echo -e "  Run manually: openclaw agents add ${WS_NAME} --workspace ${WS_PATH}"
  fi
  echo ""
  echo -e "${GREEN}${BOLD}✓ Done!${RESET}"
  echo -e "  Workspace: ${CYAN}${WS_PATH}${RESET}"
  echo -e "  Start a chat: ${CYAN}openclaw chat --workspace ${WS_PATH}${RESET}"
  exit 0
fi

# If not agent, try workflow
if [ -n "$WORKFLOW_PATH" ]; then
  echo -e "  Found workflow: ${CYAN}${WORKFLOW_PATH}${RESET}"
  echo ""
  WS_NAME="$SLUG"
  WS_PATH="${HOME}/.openclaw/workspace-${WS_NAME}"
  mkdir -p "$WS_PATH"
  URL="${RAW}/${WORKFLOW_PATH}/ORCHESTRATION.md"
  if curl -fsSL "$URL" -o "${WS_PATH}/ORCHESTRATION.md" 2>/dev/null; then
    echo -e "  ${GREEN}✓${RESET} ORCHESTRATION.md"
    echo ""
    echo -e "${GREEN}${BOLD}✓ Workflow installed in agent workspace${RESET}"
    echo -e "  Workspace: ${CYAN}${WS_PATH}${RESET}"
    exit 0
  else
    echo -e "${RED}✗ Failed to download ORCHESTRATION.md${RESET}"
    exit 1
  fi
fi

echo -e "${RED}✗ Agent or workflow '${SLUG}' not found in metrono-agents for language ${LANG_UPPER}${RESET}"
exit 1
