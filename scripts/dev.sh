#!/usr/bin/env bash
# 开发环境一键启动脚本（macOS / Linux / Git Bash）
# 用法：bash scripts/dev.sh
# 会同时启动后端(FastAPI)和前端(Vite)，Ctrl+C 一起停止。
set -euo pipefail
cd "$(dirname "$0")/.."

echo "➜ 检查前端依赖 ..."
if [ ! -d frontend/node_modules ]; then
  echo "   ⚠️  未安装依赖，先执行 npm install ..."
  (cd frontend && npm install)
fi

echo "➜ 启动后端：http://127.0.0.1:8000/docs"
(cd backend && uvicorn app.main:app --reload) &
BACK_PID=$!

echo "➜ 启动前端：http://localhost:5173"
(cd frontend && npm run dev) &
FRONT_PID=$!

trap 'echo ""; echo "已停止全部服务"; kill $BACK_PID $FRONT_PID 2>/dev/null || true' INT TERM

wait
