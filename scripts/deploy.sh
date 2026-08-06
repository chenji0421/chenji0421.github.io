#!/usr/bin/env bash
# 一键提交并推送 GitHub Pages 站点
# 用法：bash scripts/deploy.sh "提交说明"
set -euo pipefail

cd "$(dirname "$0")/.."

MSG="${1:-chore: update site}"
BRANCH="$(git branch --show-current)"

echo "→ 提交：$MSG"
git add -A
git commit -m "$MSG" || { echo "⚠️ 没有可提交的变更"; exit 0; }

echo "→ 推送到 origin/$BRANCH ..."
git push origin "$BRANCH"

echo "✅ 已推送！GitHub Pages 约 1~3 分钟生效。"
