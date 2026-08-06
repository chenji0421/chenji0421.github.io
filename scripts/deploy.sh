#!/usr/bin/env bash
# 一键提交并推送 GitHub Pages 站点
# 用法：bash scripts/deploy.sh "提交说明"
set -euo pipefail

cd "$(dirname "$0")/.."

MSG="${1:-chore: update site}"
BRANCH="$(git branch --show-current)"

# 发布前自检（可选依赖 Python，没装就跳过）
if command -v python >/dev/null 2>&1; then
  echo "→ 运行自检脚本 ..."
  python scripts/check.py
  echo "→ 自检完成（上方如有警告请留意）"
elif command -v python3 >/dev/null 2>&1; then
  echo "→ 运行自检脚本 ..."
  python3 scripts/check.py
  echo "→ 自检完成（上方如有警告请留意）"
else
  echo "⚠️  未检测到 Python，跳过自检"
fi

echo "→ 提交：$MSG"
git add -A
git commit -m "$MSG" || { echo "⚠️ 没有可提交的变更"; exit 0; }

echo "→ 推送到 origin/$BRANCH ..."
git push origin "$BRANCH"

echo "✅ 已推送！GitHub Pages 约 1~3 分钟生效。"
