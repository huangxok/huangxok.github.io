# HKBlog

我的个人技术博客，记录前端开发学习笔记、技术踩坑和生活感悟。

🔗 访问博客：https://huangxok.github.io

## 📝 关于博客

- **技术栈**：前端开发（HTML/CSS/JS/TS/Vue/React/Node.js）
- **记录内容**：学习笔记、开发踩坑、开源项目、电子书格式研究
- **写作时间**：2016 年至今
- **动力源泉**：努力不一定成功，放弃一定会很轻松

## 🛠️ 技术栈

本博客基于 [Astro](https://astro.build) 构建，Astro 是一个现代化的静态站点生成器，专注于高性能和简洁体验。

- **框架**：Astro 6
- **包管理**：pnpm
- **部署**：GitHub Pages
- **主题**：自定义卡片风格

## 🚀 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm build
```

## 📂 文章结构

```
src/
├── content/
│   └── blog/           # 所有博客文章（Markdown 格式）
├── layouts/            # 页面布局
├── components/         # 组件（卡片、页头、页脚等）
├── pages/              # 页面路由
└── styles/             # 全局样式
```

## ✨ 功能特性

- 🏠 卡片风格首页，展示所有文章
- 🏷️ 标签分类，方便按主题浏览
- 📅 文章按时间倒序排列
- 🌙 代码语法高亮（Shiki）
- 📱 响应式设计，适配移动端
- ⚡ 静态生成，加载极快

## 📝 写作指南

新增文章只需在 `src/content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
pubDate: 2026-04-22
tags: [前端, JavaScript]
description: 文章简介（可选）
---

这里是文章正文...
```

## 📜 许可

MIT License
