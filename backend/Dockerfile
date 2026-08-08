# FastAPI 后端镜像
# 只在本地 docker compose 学习 / 展示时使用，GitHub Pages 不需要它。
FROM python:3.12-slim

WORKDIR /app

# 先装依赖（利用 Docker 层缓存，依赖不变时不用重新下载）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 再拷代码
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
