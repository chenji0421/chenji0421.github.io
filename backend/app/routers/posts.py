"""博客文章接口：
- GET /api/posts        文章列表
- GET /api/posts/{id}   单篇文章
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Post
from ..schemas import PostRead

router = APIRouter(prefix="/api/posts", tags=["posts"])


def _to_dict(post: Post) -> dict:
    """把 ORM 对象转成纯字典，tags 用逗号字符串转成列表。"""
    return {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "content": post.content,
        "date": post.date,
        "tags": post.tag_list,
    }


@router.get("", response_model=list[PostRead])
def list_posts(db: Session = Depends(get_db)):
    """返回全部文章，按发布日期倒序。"""
    posts = db.query(Post).order_by(Post.date.desc()).all()
    return [_to_dict(p) for p in posts]


@router.get("/{post_id}", response_model=PostRead)
def get_post(post_id: int, db: Session = Depends(get_db)):
    """按 id 返回单篇文章；不存在则返回 404。"""
    post = db.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return _to_dict(post)
