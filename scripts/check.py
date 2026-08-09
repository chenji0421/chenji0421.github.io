#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
chenji0421.github.io · 项目自检脚本（真实空框架版）

用法：
    python scripts/check.py

检查项：
  1. 关键文件是否存在（index.html / css / js / articles / games / docs / README …）
  2. Python 文件能否通过语法检查（用 ast 解析，不执行代码）
  3. 根目录 index.html 标签是否配对闭合、锚点与本地资源是否有效
  4. 页面路由完整性（8 个 hash 路由页面）
  5. js/content.js 是否为「空框架」结构（siteContent.articles / projects 存在）
  6. 是否残留 example.com 等占位文本（提醒用，不阻断）
  7. 是否误提交疑似密钥 / token（阻断）

退出码：有错误返回 1，仅警告返回 0。
"""
import ast
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors: list[str] = []
warnings: list[str] = []

# ---------- 1. 关键文件清单 ----------
KEY_FILES = [
    "index.html",              # 根目录静态主页（GitHub Pages 入口）
    "README.md",
    "CHANGELOG.md",
    "LICENSE",
    ".gitignore",
    "css/style.css",
    "js/content.js",
    "js/main.js",
    "data/plans.json",
    "articles/README.md",
    "articles/template.md",
    "games/README.md",
    "assets/avatar.svg",
    "assets/favicon.svg",
    "docs/README.md",
    "docs/roadmap.md",
    "docs/deployment.md",
    "scripts/check.py",
]

# 需要做语法检查的 Python 文件
PY_FILES = ["scripts/check.py"]

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

# ---------- 页面路由完整性 ----------
HASH_PAGES = ["home", "articles", "plans", "projects", "toolbox", "games", "about", "maintain"]

# ---------- js/content.js 空框架结构检查 ----------
CONTENT_CHECKS = {
    "siteContent 定义": r"var siteContent\s*=",
    "articles 数组": r"articles\s*:\s*\[\s*\]",
    "projects 数组": r"projects\s*:\s*\[\s*\]",
    "文章登记示例注释": r"文章登记示例",
    "项目登记示例注释": r"项目登记示例",
}


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

    # ---- 锚点与 id（hash 路由：#home → id="page-home"）----
    ids = set(ID_RE.findall(text))
    for anchor in set(ANCHOR_RE.findall(text)):
        if anchor not in ids and ("page-" + anchor) not in ids:
            warnings.append(f"[{path}] 锚点 #{anchor} 没有对应的 id")

    # ---- hash 路由页面 ----
    for page in HASH_PAGES:
        if f'id="page-{page}"' not in text:
            errors.append(f"[{path}] 缺少路由页面：page-{page}")

    # ---- 本地资源存在性 ----
    for ref in set(ATTR_URL_RE.findall(text)):
        if ":" in ref.split("/", 1)[0]:  # 跳过 mailto:/https: 等
            continue
        if not (ROOT / ref).exists():
            errors.append(f"[{path}] 引用的本地资源不存在：{ref}")


def check_content(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    for label, pattern in CONTENT_CHECKS.items():
        if not re.search(pattern, text):
            errors.append(f"[{path}] 缺少内容框架：{label}")


def scan_secrets(root: Path) -> None:
    """遍历所有文本文件，找疑似密钥。"""
    skip = {"node_modules", "dist", ".git", "__pycache__", ".venv", ".backup-20260809"}
    for p in root.rglob("*"):
        if not p.is_file() or any(part in skip for part in p.parts):
            continue
        if p.suffix.lower() not in {".py", ".js", ".json", ".yml", ".yaml", ".md", ".html", ".css", ".txt", ""}:
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
    print("🔍 自检 chenji0421.github.io（真实空框架版）...\n")

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

    # 3. HTML 校验
    print("   📄 检查根目录 index.html ...")
    root_html = ROOT / "index.html"
    if root_html.exists():
        check_html(root_html)

    # 4. content.js 空框架结构
    print("   🗂️  检查 js/content.js 空框架 ...")
    content_js = ROOT / "js" / "content.js"
    if content_js.exists():
        check_content(content_js)

    # 4.5 data/plans.json 公开计划格式
    print("   📋 检查 data/plans.json ...")
    plans_json = ROOT / "data" / "plans.json"
    if plans_json.exists():
        try:
            plans_data = json.loads(plans_json.read_text(encoding="utf-8"))
            if not isinstance(plans_data, dict) or not isinstance(plans_data.get("plans"), dict):
                errors.append("data/plans.json 结构应为 {\"year\": \"2026\", \"plans\": {}}")
            if not isinstance(plans_data.get("year", ""), str):
                errors.append("data/plans.json 的 year 字段应为字符串")
        except Exception as e:
            errors.append(f"data/plans.json JSON 解析失败：{e}")

    # 5. 占位提醒（只看根目录主页）
    if root_html.exists():
        check_placeholders(root_html)

    # 6. 密钥扫描（全仓库文本文件）
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
