@echo off
REM 本地预览 Chenji Learning Hub（Windows，双击运行）
REM 起一个静态服务器：http://localhost:8000
cd /d "%~dp0\.."

echo [1/2] 运行自检（需安装 Python，可选）...
where python >nul 2>nul
if %errorlevel%==0 (
  python scripts\check.py
) else (
  echo     未检测到 Python，跳过自检
)

echo [2/2] 启动静态服务器 http://localhost:8000
python -m http.server 8000

echo.
echo 按 Ctrl+C 停止服务器。
pause
