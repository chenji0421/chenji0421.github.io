#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
chenji0421.github.io · 发布前自检脚本

纯 Python 标准库实现，无需安装任何依赖。用法：

    python scripts/check.py

检查项：
  1. HTML 标签是否配对闭合（忽略自闭合与 void 标签）
  2. 锚点链接 href="#xxx" 是否有对应的 id
  3. href / src 引用的本地文件是否存在
  4. 是否残留 example.com、TODO 等占位文本
  5. 是否误提交疑似密钥 / token

退出码：有错误返回 1，仅警告返回 0。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors = []
warnings = []

# 无需闭合的 void 标签
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

TAG_RE = re.compile(r"<(/)?([a-zA-Z0-9]+)((?:\"[^\"]*\"|'[^']*'|[^>\"'])*)>")
ATTR_URL_RE = re.compile(r'(?:href|src)="([^"#:][^"]*)"')
ANCHOR_RE = re.compile(r'href="#([^"]+)"')
ID_RE = re.compile(r'id="([^"]+)"')
URL_RE = re.compile(r'href="(https?://[^"]+)"')
SECRET_RE = re.compile(
    r"[A-Za-z0-9_]{20,}\.[A-Za-z0-9_]{20,}\.[A-Za-z0-9_]{20,}"  # JWT / token
)
PLACEHOLDERS = ["example.com", "yourname", "YOUR_", "lorem", "TODO", "占位", "待定"]


def error(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def check_html(path: Path) -> None:
    text = path.read_text(encoding="utf-8")

    # ---- 1. 标签配对 ----
    stack = []
    for m in TAG_RE.finditer(text):
        closing, tag, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if tag in VOID_TAGS or attrs.strip().endswith("/"):
            continue
        if closing:
            if not stack or stack[-1] != tag:
                error(f"[{path.name}] </{tag}> 与栈顶 {stack[-1] if stack else '(空)'} 不匹配（第 {text[:m.start()].count(chr(10)) + 1} 行）")
                continue
            stack.pop()
        else:
            stack.append(tag)
    if stack:
        error(f"[{path.name}] 未闭合标签：{', '.join('<' + t + '>' for t in stack)}")

    # ---- 2. 锚点与 id ----
    ids = set(ID_RE.findall(text))
    for anchor in set(ANCHOR_RE.findall(text)):
        if anchor not in ids:
            warn(f"[{path.name}] 锚点 #/{anchor} 没有对应的 id")

    # ---- 3. 本地资源存在性 ----
    for ref in set(ATTR_URL_RE.findall(text)):
        # 跳过协议链接（mailto: / tel: / https: 等），只检查本地相对路径
        if ":" in ref.split("/", 1)[0]:
            continue
        target = ROOT / ref
        if not target.exists():
            error(f"[{path.name}] 引用的资源不存在：{ref}")

    # ---- 4. 占位文本 ----
    for line_no, line in enumerate(text.splitlines(), 1):
        low = line.lower()
        for p in PLACEHOLDERS:
            if p.lower() in low:
                warn(f"[{path.name}] 第 {line_no} 行疑似占位文本：{p}")
                break

    # ---- 5. 疑似密钥 ----
    for m in SECRET_RE.finditer(text):
        error(f"[{path.name}] 检测到疑似密钥/token（位置 {m.start()}），请立即检查！")

    # 外部链接只做统计，不做校验（离线时可能误报）
    external = len(URL_RE.findall(text))
    if external:
        print(f"   ℹ️  {path.name}：检测到 {external} 个外链（仅统计，不校验可达性）")


def main() -> int:
    html_files = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts)

    print("🔍 自检 chenji0421.github.io ...\n")
    for f in html_files:
        print(f"   📄 检查：{f.relative_to(ROOT)}")
        check_html(f)

    print()
    for e in errors:
        print(f"   ❌ [错误] {e}")
    for w in warnings:
        print(f"   ⚠️  [警告] {w}")
    print()
    print(f"结果：{len(errors)} 错误，{len(warnings)} 警告，共 {len(html_files)} 个 HTML 文件")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
