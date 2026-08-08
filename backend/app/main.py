"""FastAPI 应用入口。

本地启动：
    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --reload

启动后浏览器打开 http://127.0.0.1:8000/docs 查看自动生成的接口文档。
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database_seed import init_db
from .routers import health, posts, projects


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时建表 + 首次运行时塞入示例数据
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="chenji0421 的全栈学习项目 · 后端 API 示例",
    lifespan=lifespan,
)

# 本地开发时前端跑在 5173 端口，需要允许跨域请求。
# 学习项目先全放开；正式上线时改成你的前端域名。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(posts.router)
app.include_router(projects.router)


@app.get("/")
def root():
    return {"message": "chenji0421 backend API", "docs": "/docs"}
