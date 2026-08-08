@echo off
REM 开发环境一键启动脚本（Windows，双击运行）
REM 需要先安装 Python 和 Node.js

cd /d "%~dp0\.."

echo [1/2] 启动后端 http://127.0.0.1:8000/docs
start "chenji-backend" cmd /k "cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload"

echo [2/2] 启动前端 http://localhost:5173
start "chenji-frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo 两个窗口都启动好了，关闭对应窗口即停止对应服务。
echo 如果窗口一闪而过，说明依赖没装好，请看 README。
pause
