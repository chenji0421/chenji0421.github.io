# 部署与更新指南

这个仓库是 GitHub Pages **用户站点**，访问地址为 `https://chenji0421.github.io`。
用户站点的规则：**网站内容直接放在 `main` 分支的根目录**，推送后自动发布。

## 首次部署（只需一次）

1. 仓库已启用 GitHub Pages 的情况下，什么都不用做，`main` 分支就是线上内容。
2. 如果还没启用：
   - 打开仓库 → `Settings` → 左侧 `Pages`
   - `Build and deployment` 选择 `Deploy from a branch`
   - 分支选择 `main`，目录选 `/ (root)`，保存
   - 等 1~3 分钟，访问 `https://chenji0421.github.io` 即可看到站点

## 每次更新

### 发布前：自检（推荐）

```bash
python scripts/check.py
```

会检查 HTML 标签配对、锚点、资源引用、占位文本、疑似密钥等。
**0 错误**再推送。

### 方式 A：使用脚本（推荐）

```bash
bash scripts/deploy.sh "更新内容"
```

脚本会自动 `git add`、`commit`、`push`。Windows（Git Bash）可以直接运行。

### 方式 B：手动

```bash
git add -A
git commit -m "更新内容"
git push origin main
```

## 常见问题

**Q：推送后网站没变化？**
A：GitHub Pages 构建需要 1~3 分钟，稍等并刷新（可强制刷新 Ctrl+F5）。

**Q：改了内容但只在本地看到，线上还是旧的？**
A：确认 `git push` 成功，并且页面 URL 是 `https://chenji0421.github.io`（不是本地路径）。

**Q：想换一个主题色？**
A：改 `css/style.css` 顶部的 `--accent` 和 `--accent-2`，全站颜色会统一变化。
