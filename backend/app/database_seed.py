"""示例数据 + 建表函数。

把「建表」「塞示例数据」单独放一个文件，main.py 只要在启动时调用 init_db() 即可。
数据源就是下面两个列表，想加文章 / 项目直接改这里。
"""

from datetime import date

from sqlalchemy.orm import Session

from . import models
from .database import Base, SessionLocal, engine

# 首次启动时会写入这些示例文章
SEED_POSTS = [
    models.Post(
        title="我为什么开始搭建个人网站",
        slug="why-i-built-this-site",
        excerpt="记录第一次建站的动机：不想再当一个「只收藏不学习」的旁观者。",
        content="（示例正文）这是从 FastAPI 后端返回的第一篇文章。",
        date=date(2026, 8, 1),
        tags="随笔,建站",
    ),
    models.Post(
        title="Python 学习路线记录",
        slug="python-learning-roadmap",
        excerpt="从 print(\"Hello World\") 到写小工具，我踩过的坑和接下来的计划。",
        content="（示例正文）Python 学习路上的一些记录。",
        date=date(2026, 8, 3),
        tags="Python,学习路线",
    ),
    models.Post(
        title="GitHub Pages 建站笔记",
        slug="github-pages-notes",
        excerpt="免费托管、自定义域名、CI/CD——GitHub Pages 入门踩坑记录。",
        content="（示例正文）GitHub Pages 部署笔记。",
        date=date(2026, 8, 5),
        tags="GitHub,部署",
    ),
]

SEED_PROJECTS = [
    models.Project(
        title="个人主页网站",
        description="静态主页 + React 前端 + FastAPI 后端的全栈学习仓库。",
        tags="HTML,CSS,JavaScript,React,FastAPI",
        status="已上线",
        link="https://chenji0421.github.io",
    ),
    models.Project(
        title="Python 文件整理工具",
        description="按扩展名 / 日期自动整理文件夹，练习 Python 标准库。",
        tags="Python,自动化",
        status="计划中",
        link="",
    ),
    models.Project(
        title="数据分析练习",
        description="用 pandas / matplotlib 做一些小数据集的分析练习。",
        tags="Python,pandas,matplotlib",
        status="学习中",
        link="",
    ),
]


def init_db() -> None:
    """建表；如果表是空的，就写入示例数据。"""
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()  # type: ignore
    try:
        if db.query(models.Post).count() == 0:
            db.add_all(SEED_POSTS)
        if db.query(models.Project).count() == 0:
            db.add_all(SEED_PROJECTS)
        db.commit()
    finally:
        db.close()
