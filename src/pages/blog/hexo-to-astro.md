---
title: 从 Hexo 迁移到 Astro
pubDate: 2026-04-22
tags: [Hexo, Astro, 博客, 迁移]
description: 记录将博客从 Hexo 迁移到 Astro 的完整过程，包括踩坑和解决方案。
---

# 从 Hexo 迁移到 Astro

> 越努力，越幸运。

## 为什么要迁移

Hexo 是一个非常成熟的静态博客框架，但随着博客文章越来越多，Hexo 的构建速度开始变慢，每次改主题都要折腾一堆配置。而 Astro 以「内容为核心」的理念深深吸引了我——它默认零 JS、按需加载、构建速度极快，非常适合个人博客。

## 迁移过程

### 1. 创建 Astro 项目

```bash
pnpm create astro@latest
pnpm add @astrojs/mdx
pnpm add @astrojs/sitemap
pnpm add @astrojs/rss
```

### 2. 目录结构对比

| Hexo | Astro |
|------|-------|
| `source/_posts/` | `src/content/blog/` |
| `themes/` | `src/layouts/`, `src/components/`, `src/styles/` |
| `scaffolds/` | `src/content/config.ts` |
| `_config.yml` | `astro.config.mjs` |

Astro 的 Content Collections 是我最喜欢的功能——类型安全、查询方便，完美替代了 Hexo 的 front-matter。

### 3. 批量迁移文章

Hexo 的 Markdown 文件格式与 Astro 兼容，只需要：

1. 把所有 `.md` 文件从 `source/_posts/` 复制到 `src/content/blog/`
2. 修改文件扩展名从 `.md` 改为 `.mdx`（可选，但推荐）
3. 在 front-matter 中补充 `pubDate` 字段

```bash
# 批量处理
for f in source/_posts/*.md; do
  new="${f%.md}.mdx"
  # 添加 pubDate
done
```

### 4. 迁移主题

我的博客主题参考了阮一峰老师和 windliang 的风格，使用 Astro 重写后代码量大幅减少：

```astro
---
// BaseLayout.astro - 只需几十行
import '../styles/global.css';
const { title } = Astro.props;
---
<html>
  <body>
    <nav>...</nav>
    <main>
      <slot />
    </main>
  </body>
</html>
```

Astro 的组件化让主题维护变得极其简单。

### 5. GitHub Actions 自动部署

Hexo 时代的 `.travis.yml` 已经过时，改用 GitHub Actions：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 6. GitHub Pages 的 Jekyll 坑

部署到 GitHub Pages 时遇到了一个经典问题——GitHub Pages 默认用 Jekyll 构建，但 Astro 生成的静态文件会被 Jekyll 错误地处理：

**解决方案：** 在仓库根目录创建 `.nojekyll` 文件：

```bash
touch .nojekyll
```

这样 GitHub Pages 就不会用 Jekyll 处理，直接托管 Astro 构建的静态文件。

## 踩坑记录

### 坑 1：代码块语法高亮失效

**症状**：Shiki 生成的内联 `style="color:..."` 被 CSS 覆盖，代码块所有文字同一颜色。

**根因**：global.css 中有类似这样的代码：

```css
pre {
  background-color: #f6f8fa;
}
pre code {
  color: #333;  /* ← 这行覆盖了 Shiki 的内联颜色！ */
}
```

**解决**：移除所有 `pre`、`pre code` 的样式覆盖，直接用 Shiki 主题：

```js
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',  // 白底 + 语法高亮
      wrap: true,
    },
  },
});
```

### 坑 2：GitHub Pages 构建报错

**症状**：Jekyll 解析错误 `Liquid Exception: ...`。

**原因**：GitHub Pages 误用 Jekyll 构建 Astro 项目。

**解决**：创建 `.nojekyll` + 在 GitHub Settings → Pages → Source 选择 "GitHub Actions"。

## 迁移后的效果

- **构建速度**：从 Hexo 的 15s+ 降到约 2s
- **代码量**：主题代码从 300+ 行减少到约 100 行
- **可维护性**：Content Collections 提供类型安全，迁移后新增文章非常方便
- **SEO**：自动生成 sitemap

## 总结

Hexo 到 Astro 的迁移比想象中顺利，最大的收获是理解了 Astro「内容优先」的设计理念。如果你也在考虑迁移博客，不妨一试。

> 越努力，越幸运。

---

*迁移完成时间：2026-04-22*
