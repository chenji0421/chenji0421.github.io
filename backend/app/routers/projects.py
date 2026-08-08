"""项目接口：
- GET /api/projects        项目列表
- GET /api/projects/{id}   单个项目
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Project
from ..schemas import ProjectRead

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _to_dict(project: Project) -> dict:
    """把 ORM 对象转成纯字典。"""
    return {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "tags": project.tag_list,
        "status": project.status,
        "link": project.link,
    }


@router.get("", response_model=list[ProjectRead])
def list_projects(db: Session = Depends(get_db)):
    """返回全部项目。"""
    projects = db.query(Project).order_by(Project.id).all()
    return [_to_dict(p) for p in projects]


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """按 id 返回单个项目；不存在则返回 404。"""
    project = db.get(Project, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return _to_dict(project)
