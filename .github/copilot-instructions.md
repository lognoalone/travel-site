# Copilot 使用说明（基于 PRD）

此文件将产品需求文档（PRD）转存为 Copilot 指南，用于在此仓库中为自动化编码和补全提供上下文与约束。

## 1. 网站概述

这是一个现代化的响应式旅游网站，专注于提供优质的旅游目的地浏览和预订服务。网站采用蓝色和绿色为主色调，体现自然和专业的设计风格，为用户提供轻松愉悦的浏览体验。

目标：快速搭建可交付的前端应用，包含主页和预订页面，支持响应式设计与良好用户体验。

用户旅程：
- 浏览首页，发现热门目的地
- 查看目的地详情
- 在预订页面填写信息并提交订单
- 订阅新闻通讯以获取优惠信息

## 2. 页面功能要点（供 Copilot 参考）

### 主页（Home Page）
- 响应式导航栏（logo、目的地、预订、联系我们）
- 全屏轮播/英雄图（优先使用 Unsplash 或 Pexels 图片）
- 目的地搜索与筛选（按地区、类型）
- 热门目的地网格展示（卡片包含图片、名称、描述、最低价格、"了解更多"）
- 用户评价区、订阅框、页脚
- 设计：蓝色/绿色主题，整洁现代，可访问性考虑（对比、语义化标签）

### 预订页面（Booking Page）
- 预订表单：目的地、出发/返回日期、人数、房间类型、附加服务
- 实时价格计算（基础费用 + 房间费用 * 天数 + 附加服务）
- 预订摘要与支付方式占位（实际支付可在后端或第三方集成）
- 表单验证、友好错误提示
- 可在 URL 查询参数传入目的地 ID（从详情页跳转）

## 3. 技术栈（必须使用）
- Vue 3
- TypeScript
- Tailwind CSS
- Vite（构建工具）
- Vue Router（路由）
- Pinia（状态管理）
- axios（HTTP 客户端）

可选/辅助库：
- date-fns（日期处理）
- swiper（轮播）
- vee-validate（表单验证）
- vue-i18n（国际化）

开发约定：
- 以组件化、组合式 API（script setup）为主
- 使用 `@/` 别名映射到 `src/`
- Tailwind 原子类作为主样式方式，适量抽象为组件类

## 4. 响应式与设计规范
- 主要断点：移动（<640px）、平板（640–1024px）、桌面（>1024px）
- 主色：
  - 深蓝：#1E40AF
  - 深绿：#059669
  - 浅蓝：#60A5FA
  - 浅绿：#34D399
- 图片来源：优先使用 Unsplash / Pexels（高质量、免费）
- 无障碍：确保按钮、表单控件具备 aria-label 或语义元素；颜色对比满足可读性

## 5. 项目目录（参考）

```
travel-site/
├── .github/
│   └── copilot-instructions.md    # 本文件
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   └── booking/
│   ├── views/
│   │   ├── HomeView.vue
│   │   └── BookingView.vue
│   ├── router/
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 6. 开发与运行（给 Copilot 建议的步骤）
- 安装依赖：`npm install`（在本地或 CI 中）
- 启动开发服务器：`npm run dev`（默认端口 5173）
- 构建：`npm run build`
- 预览构建：`npm run preview`

备注：如果遇到 PostCSS / Tailwind 相关错误，优先检查 `postcss.config.js`、`tailwind.config.js` 与 `package.json` 中的 `type` 字段（ESM vs CommonJS），并确保 Tailwind/PostCSS 版本兼容。

## 7. 与 Copilot 交互提示（写给 Copilot 的简短指令）
- 当被要求生成组件、页面或样式时，请遵循上述技术栈和颜色规则。
- 优先使用响应式 Tailwind 原子类；在复杂或重复样式时抽象为可重用类或小组件。
- 图片占位使用 Unsplash 或 Pexels 的直接 URL（或建议在运行时通过 API 加载），并在组件中添加懒加载（`loading="lazy"`）。
- 生成路由或 API 调用时，使用 `axios` 并把请求封装到 `src/utils` 下的函数；为数据交互提供模拟数据示例。
- 写测试时优先覆盖核心逻辑（价格计算、表单验证、路由跳转）。

## 8. 性能与可扩展性建议
- 图片懒加载与按需尺寸；生产环境下通过 CDN 或图像服务处理
- 组件懒加载（路由按需加载）
- 将较大的静态数据移到 JSON 文件或后端服务并缓存
- 在 CI/CD 中运行静态类型检查和 lint（例如 `vue-tsc`、ESLint）

---

如果需要，我可以：
- 将本文件作为仓库的 Copilot 指令自动关联（通过 `.github` 目录），或
- 把 PRD 内容扩展为 `README.md` 或贡献指南（CONTRIBUTING.md），并创建对应的 issues 和初始任务板。

请告诉我是否要将此文件提交到远程仓库或进一步修改文本内容。
