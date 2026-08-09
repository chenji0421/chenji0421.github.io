#!/usr/bin/env bash
# 本地预览 Chenji Learning Hub（macOS / Linux / Git Bash）
# 用法：bash scripts/dev.sh
# 起一个静态服务器：http://localhost:8000
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ 运行自检（可选，需安装 Python）..."
if command -v python >/dev/null 2>&1; then
  python scripts/check.py || true
elif command -v python3 >/dev/null 2>&1; then
  python3 scripts/check.py || true
fi

echo "→ 启动静态服务器：http://localhost:8000"
if command -v python >/dev/null 2>&1; then
  python -m http.server 8000
elif command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 8000
else
  echo "⚠️  未检测到 Python，尝试用 npx serve ..."
  npx serve .
fi
