#!/usr/bin/env bash
# install.sh — metrono-agents installer
# Usage: curl -fsSL https://raw.githubusercontent.com/cerealskill/metrono-agents/main/install.sh | bash -s <slug>
set -e

SLUG="${1:-}"
REPO="cerealskill/metrono-agents"
BRANCH="main"
RAW="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
API="https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1"

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

if [ -z "$SLUG" ]; then
  echo -e "${RED}Usage: curl -fsSL .../install.sh | bash -s <agent-slug>${RESET}"
  exit 1
fi

echo -e "${BOLD}${CYAN}metrono-agents installer${RESET}"
echo ""

echo "→ Looking up agent '${SLUG}'..."

# Fetch tree to temp file to avoid stdin conflicts
TMP=$(mktemp)
curl -fsSL "$API" -o "$TMP"

# Find path using python3 (reads from file, not stdin)
AGENT_PATH=""
if command -v python3 &>/dev/null; then
  AGENT_PATH=$(python3 -c "
import json, sys
slug = sys.argv[1]
with open(sys.argv[2]) as f:
    tree = json.load(f).get('tree', [])
paths = [x['path'] for x in tree if x.get('type') == 'tree' and (x['path'] == slug or x['path'].endswith('/' + slug))]
print(paths[0] if paths else '')
" "$SLUG" "$TMP" 2>/dev/null)
elif command -v jq &>/dev/null; then
  AGENT_PATH=$(jq -r --arg slug "$SLUG" '.tree[] | select(.type=="tree") | .path | select(. == $slug or endswith("/" + $slug))' "$TMP" | head -1)
fi

rm -f "$TMP"

if [ -z "$AGENT_PATH" ]; then
  echo -e "${RED}✗ Agent '${SLUG}' not found in metrono-agents${RESET}"
  exit 1
fi

echo -e "  Found: ${CYAN}${AGENT_PATH}${RESET}"
echo ""

# Ask for workspace name and path
read -p "Workspace name [${SLUG}]: " WS_NAME
WS_NAME="${WS_NAME:-$SLUG}"

DEFAULT_PATH="${HOME}/.openclaw/workspace-${WS_NAME}"
read -p "Install path [${DEFAULT_PATH}]: " WS_PATH
WS_PATH="${WS_PATH:-$DEFAULT_PATH}"

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
