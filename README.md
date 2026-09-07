# AI科学社 · 武汉市吴家山中学

**Attention Is All You Need!**

让好奇心，拥有实现的工具。与AI智能体协作，制作应用、连接传感器、开展科学探索，把想法变成真实作品。

网站：https://sherlock-ccnu.github.io/ai-science-club/

## 页面内容

- 社团介绍与应用、硬件、科学三个项目方向。
- AI发展史：2006—2026年14个精选节点，附原始资料，支持时间筛选。
- K10 × Mind+：连接步骤、8个入门项目和官方教程。
- 老师制作的 Motion Lab 运动实验室、指定视频及 WorkBuddy 入口。
- 课前准备清单，进度只保存在当前浏览器，不提交个人信息。

## 开发与部署

需要 Node.js 22 和 npm。

```sh
npm ci
npm run dev
```

`npm run build` 生成静态文件至 `dist/client`，同时保留可选的 Sites 构建兼容文件。

推送到 `main` 后，GitHub Actions 自动构建并部署 GitHub Pages。构建时设置 `GITHUB_PAGES=true`，资源基础路径自动切换为 `/ai-science-club/`。本地开发仍使用根路径。

## 内容维护

- `src/App.jsx`：首页、资源卡片、项目灵感与课前清单。
- `src/ResourceGuides.jsx`：AI发展史和K10学习手册。
- `src/styles.css`、`src/resource-guides.css`：页面与学习手册样式。
- `public/assets/lab-hero.png`：实验室插画。

实验室插画支持拖动景深效果（2.5D）；悬浮立方体使用 Three.js 实时3D。网站不包含教师管理后台。

网站不展示社团QQ群号。AI发展史采用精选节点，工具权益以官方实际页面为准。
