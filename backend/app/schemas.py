"""Pydantic Schema：定义 API 的请求 / 响应结构。

这里的模型只负责「传输格式」，跟数据库的 ORM 模型是两回事。
"""

from datetime import date

from pydantic import BaseModel, ConfigDict


class PostRead(BaseModel):
    """博客文章的响应结构"""

    id: int
    title: str
    slug: str
    excerpt: str = ""
    content: str = ""
    date: date | None = None
    tags: list[str] = []

    model_config = ConfigDict(from_attributes=True)


class ProjectRead(BaseModel):
    """项目的响应结构"""

    id: int
    title: str
    description: str = ""
    tags: list[str] = []
    status: str = "计划中"
    link: str = ""

    model_config = ConfigDict(from_attributes=True)


class HealthOut(BaseModel):
    """健康检查的响应结构"""

    status: str
    version: str
    database: str
