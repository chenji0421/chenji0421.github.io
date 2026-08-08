# backend · FastAPI 后端 API 示例

一个结构清晰、适合新手学习的 FastAPI 后端。当前使用 **SQLite**（零配置），
数据是启动时自动写入的示例数据。未来可平滑切换到 PostgreSQL。

## 接口一览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 服务健康检查（含数据库连通性） |
| GET | `/api/posts` | 博客文章列表 |
| GET | `/api/posts/{id}` | 单篇文章 |
| GET | `/api/projects` | 项目列表 |
| GET | `/api/projects/{id}` | 单个项目 |
| GET | `/docs` | 自动生成的 Swagger 接口文档 |

## 本地启动

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

打开 http://127.0.0.1:8000/docs 即可看到接口文档并直接测试。

## 目录结构

```
backend/
├── app/
│   ├── main.py            # 应用入口：创建 FastAPI、注册路由、启动初始化
│   ├── config.py          # 配置：从环境变量 / .env 读取
│   ├── database.py        # 数据库引擎与会话管理
│   ├── database_seed.py   # 建表 + 示例数据
│   ├── models.py          # ORM 模型（posts / projects 两张表）
│   ├── schemas.py         # Pydantic 响应结构
│   └── routers/           # 按资源拆分的路由
│       ├── health.py
│       ├── posts.py
│       └── projects.py
├── requirements.txt
└── README.md
```

## 设计说明

- **每个文件一个职责**：路由只管「接收请求、返回结果」，模型管「数据长什么样」，
  schema 管「API 传输格式」，新手按文件看就能理清思路。
- **没有登录 / 权限系统**：这是刻意为之，先把核心流程跑通，后续再加。
- **SQLite 起步**：不需要安装数据库；改成 PostgreSQL 只需设置环境变量
  `DATABASE_URL`（参考仓库根目录 `.env.example`）。

## 未来计划

- 增加文章 / 项目的增删改接口（写操作）
- 接入 PostgreSQL（docker-compose 里已预留服务）
- 前端 BlogList 组件改为从这些接口拉真实数据
