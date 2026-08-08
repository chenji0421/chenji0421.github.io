"""ORM 模型：定义数据长什么样。

这里用 SQLAlchemy 定义了两张表：posts（博客文章）和 projects（项目）。
tags 在数据库里存成逗号分隔的字符串，方便新手理解；
tag_list 属性把它转成列表给 API 返回。
"""

from datetime import date, datetime

from sqlalchemy import Column, Date, DateTime, Integer, String, Text

from .database import Base


class Post(Base):
    """博客文章表"""

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    excerpt = Column(Text, default="")       # 列表页摘要
    content = Column(Text, default="")       # 正文（示例里先用占位文本）
    date = Column(Date, default=date.today)  # 发布日期
    tags = Column(String(500), default="")   # 逗号分隔，如 "Python,学习路线"
    created_at = Column(DateTime, default=datetime.utcnow)

    @property
    def tag_list(self) -> list[str]:
        return [t.strip() for t in (self.tags or "").split(",") if t.strip()]


class Project(Base):
    """项目表"""

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, default="")
    tags = Column(String(500), default="")
    status = Column(String(50), default="计划中")  # 已上线 / 学习中 / 计划中 …
    link = Column(String(500), default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    @property
    def tag_list(self) -> list[str]:
        return [t.strip() for t in (self.tags or "").split(",") if t.strip()]
