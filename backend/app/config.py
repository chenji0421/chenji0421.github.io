"""应用配置。

用 pydantic-settings 从环境变量 / 后端目录下的 .env 读取配置。
敏感信息（数据库密码等）永远只放 .env，不要写死在代码里。
参考仓库根目录的 .env.example。
"""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/ 目录的绝对路径，用于定位 .env
BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    # 应用基本信息
    app_name: str = "chenji0421-backend"
    app_version: str = "0.1.0"

    # 默认 SQLite，开箱即用；
    # 想用 PostgreSQL 时设置环境变量 DATABASE_URL，例如：
    #   DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/chenji
    database_url: str = "sqlite:///./chenji0421.db"

    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",  # 同时支持 backend/.env
        env_file_encoding="utf-8",
    )


settings = Settings()
