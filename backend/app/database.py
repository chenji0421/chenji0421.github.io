"""数据库连接与会话管理。

本地默认用 SQLite（无需安装任何东西）。
想切换 PostgreSQL 时，只需修改环境变量 DATABASE_URL。
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import settings

# 本地 SQLite 需要 check_same_thread=False（FastAPI 会跨线程使用会话）
_connect_args = (
    {"check_same_thread": False}
    if settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(settings.database_url, connect_args=_connect_args)

# 每个请求一个会话的工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 所有 ORM 模型都继承这个 Base
Base = declarative_base()


def get_db():
    """FastAPI 依赖：为每个请求提供一个数据库会话，用后自动关闭。"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
