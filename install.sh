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

# Find agent path from GitHub tree
echo "→ Looking up agent '${SLUG}'..."
AGENT_PATH=$(curl -fsSL "$API" | grep -o '"path":"[^"]*'"${SLUG}"'[^"]*"' | head -1 | sed 's/"path":"//;s/"//' | sed "s|/${SLUG}.*||")/${SLUG}

if [ -z "$AGENT_PATH" ] || [ "$AGENT_PATH" = "/${SLUG}" ]; then
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
