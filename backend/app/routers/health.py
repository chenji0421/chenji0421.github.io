"""健康检查接口：GET /api/health

部署之后（或 docker-compose 里）可以用它确认服务是否活着、数据库是否连得上。
"""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..schemas import HealthOut

router = APIRouter(prefix="/api/health", tags=["health"])


@router.get("", response_model=HealthOut)
def health(db: Session = Depends(get_db)) -> HealthOut:
    """返回服务状态与数据库连通性。"""
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception:
        db_status = "unavailable"

    return HealthOut(
        status="ok",
        version=settings.app_version,
        database=db_status,
    )
