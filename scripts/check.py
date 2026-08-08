#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
chenji0421.github.io · 项目自检脚本（升级版）

用法：
    python scripts/check.py

检查项：
  1. 关键文件是否存在（README、frontend/package.json、backend/requirements.txt …）
  2. Python 文件能否通过语法检查（用 ast 解析，不执行代码）
  3. 根目录 index.html 标签是否配对闭合、锚点与本地资源是否有效
  4. 是否残留 example.com 等占位文本（提醒用，不阻断）
  5. 是否误提交疑似密钥 / token（阻断）

退出码：有错误返回 1，仅警告返回 0。
"""
import ast
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors: list[str] = []
warnings: list[str] = []

# ---------- 1. 关键文件清单 ----------
KEY_FILES = [
    "index.html",          # 根目录静态主页（GitHub Pages 入口）
    "README.md",
    "CHANGELOG.md",
    "LICENSE",
    ".gitignore",
    ".env.example",
    "docker-compose.yml",
    "frontend/package.json",
    "frontend/vite.config.js",
    "frontend/index.html",
    "frontend/src/App.jsx",
    "backend/requirements.txt",
    "backend/app/main.py",
    "docs/roadmap.md",
    "docs/deployment.md",
    "docs/architecture.md",
    "scripts/check.py",
    ".github/workflows/ci.yml",
    ".github/workflows/pages.yml",
]

# 需要做语法检查的 Python 文件
PY_FILES = [
    "scripts/check.py",
    "backend/app/main.py",
    "backend/app/config.py",
    "backend/app/models.py",
    "backend/app/schemas.py",
    "backend/app/database.py",
    "backend/app/database_seed.py",
    "backend/app/routers/posts.py",
    "backend/app/routers/projects.py",
    "backend/app/routers/health.py",
]

# ---------- HTML 校验工具 ----------
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
TAG_RE = re.compile(r"<(/)?([a-zA-Z0-9]+)((?:\"[^\"]*\"|'[^']*'|[^>\"'])*)>")
ATTR_URL_RE = re.compile(r'(?:href|src)="([^"#:][^"]*)"')
ANCHOR_RE = re.compile(r'href="#([^"]+)"')
ID_RE = re.compile(r'id="([^"]+)"')
SECRET_RE = re.compile(
    r"[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}"  # JWT / token
)


def check_python_syntax(path: Path) -> None:
    try:
        ast.parse(path.read_text(encoding="utf-8"))
    except SyntaxError as e:
        errors.append(f"[{path}] Python 语法错误：{e}")


def check_html(path: Path) -> None:
    text = path.read_text(encoding="utf-8")

    # ---- 标签配对 ----
    stack: list[str] = []
    for m in TAG_RE.finditer(text):
        closing, tag, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if tag in VOID_TAGS or attrs.strip().endswith("/"):
            continue
        if closing:
            if not stack or stack[-1] != tag:
                line = text[: m.start()].count("\n") + 1
                errors.append(
                    f"[{path}] </{tag}> 与栈顶 {stack[-1] if stack else '(空)'} 不匹配（第 {line} 行）"
                )
                continue
            stack.pop()
        else:
            stack.append(tag)
    if stack:
        errors.append(f"[{path}] 未闭合标签：{', '.join('<' + t + '>' for t in stack)}")

    # ---- 锚点与 id ----
    ids = set(ID_RE.findall(text))
    for anchor in set(ANCHOR_RE.findall(text)):
        if anchor not in ids:
            warnings.append(f"[{path}] 锚点 #{anchor} 没有对应的 id")

    # ---- 本地资源存在性 ----
    for ref in set(ATTR_URL_RE.findall(text)):
        if ":" in ref.split("/", 1)[0]:  # 跳过 mailto:/https: 等
            continue
        if not (ROOT / ref).exists():
            errors.append(f"[{path}] 引用的本地资源不存在：{ref}")


def scan_secrets(root: Path) -> None:
    """遍历所有文本文件，找疑似密钥。"""
    skip = {"node_modules", "dist", ".git", "__pycache__", ".venv"}
    for p in root.rglob("*"):
        if not p.is_file() or any(part in skip for part in p.parts):
            continue
        if p.suffix.lower() not in {".py", ".js", ".jsx", ".ts", ".json", ".yml", ".yaml", ".md", ".html", ".css", ".txt", ".env", ""}:
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for m in SECRET_RE.finditer(text):
            errors.append(f"[{p}] 检测到疑似密钥/token，请立即检查！")


def check_placeholders(path: Path) -> None:
    """提醒占位内容（不阻断，方便主人记得替换）。"""
    text = path.read_text(encoding="utf-8")
    for marker in ["example.com", "YOUR_PASSWORD", "your_token", "lorem"]:
        if marker in text:
            warnings.append(f"[{path}] 存在占位内容：{marker}")


def main() -> int:
    print("🔍 自检 chenji0421.github.io ...\n")

    # 1. 关键文件
    print("   📁 检查关键文件 ...")
    for rel in KEY_FILES:
        if (ROOT / rel).exists():
            print(f"      ✅ {rel}")
        else:
            errors.append(f"缺少关键文件：{rel}")
            print(f"      ❌ {rel}")

    # 2. Python 语法
    print("   🐍 检查 Python 语法 ...")
    for rel in PY_FILES:
        p = ROOT / rel
        if p.exists():
            check_python_syntax(p)

    # 3. HTML 校验（只看根目录静态主页，frontend/ 是 Vite 源码不算）
    print("   📄 检查根目录 index.html ...")
    root_html = ROOT / "index.html"
    if root_html.exists():
        check_html(root_html)

    # 4. 占位提醒（只看根目录主页）
    check_placeholders(root_html)

    # 5. 密钥扫描（全仓库文本文件）
    print("   🔑 扫描疑似密钥 ...")
    scan_secrets(ROOT)

    print()
    for e in errors:
        print(f"   ❌ [错误] {e}")
    for w in warnings:
        print(f"   ⚠️  [警告] {w}")
    print()
    print(f"结果：{len(errors)} 错误，{len(warnings)} 警告")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
