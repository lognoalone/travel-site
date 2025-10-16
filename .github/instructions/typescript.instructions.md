# TypeScript 编码规范（适用于本仓库 travel-site）

此文档为本仓库（Vue 3 + TypeScript + Vite + Tailwind + Pinia）提供一套实用的 TypeScript 编码规范与最佳实践，便于团队保持一致性、可维护性与可扩展性。

目标：提高类型安全、减少运行时错误、保持代码可读且易于重构。

目录：
- 语言与工具配置
- 风格与格式
- 类型系统与接口
- Vue 组件（script setup / 组合式 API）
- 状态管理（Pinia）
- 异步/HTTP（axios）
- 错误处理与日志
- 测试与类型检查
- Git/提交与 CI

---

## 1. 语言与工具配置

- 项目启用严格模式（`tsconfig.json` 中 `strict: true`）。
- 在 `tsconfig.json` 中使用 `baseUrl: "."` 和 `paths`（`@/*` -> `src/*`），统一导入别名。
- 使用 `vue-tsc` 做类型检查（在 CI 中运行）。
- 使用 ESLint + TypeScript 插件（`@typescript-eslint`）和 Prettier 保持风格一致。

推荐 devDependencies：
- typescript, vue-tsc, eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, prettier

---

## 2. 风格与格式

- 每个文件使用明确的导出。首选 `export`（具名导出），避免默认导出以便重命名和重构。
- 使用 2 或 4 个空格缩进（项目统一），并在 Prettier 中配置。
- 文件命名：TypeScript 文件使用 `.ts` 或 `.d.ts`；Vue 组件使用 `.vue`。
- 组件、类型、接口、枚举命名：PascalCase（如 `MyComponent.vue`, `UserProfile`）。
- 变量、函数、store 使用 camelCase。
- 常量使用 UPPER_SNAKE 或 PascalCase（如 `API_BASE_URL` 或 `DefaultTimeout`），团队约定一致即可。

---

## 3. 类型系统与接口

- 优先使用具体类型，避免 `any`。只有在极端情况下才使用 `any`，并加注释说明原因。
- 使用 `unknown` 代替 `any`，并在处理前进行类型收窄（type narrowing）。
- 将公共数据结构抽象到 `src/types/index.ts`（或按域拆分到 `src/types/**`）。例如：描述一个目的地的类型应包含 id、name、price 等字段。

- 使用 `Readonly` / `readonly` 表达只读意图（如 props 接收的对象）。
- 对于可能为 null/undefined 的值使用 `?` 或 `| null`，并在使用前进行空值判断。
- 优先使用 `interface` 定义对象形状，在需要交叉/映射类型时使用 `type`。

示例说明：
- `ApiResponse<T>`：应是一个泛型结构，包含 `data` 字段，可能还有 `meta` 字段用于分页或元数据。

---

## 4. Vue 组件（script setup / 组合式 API）

- 使用 `<script setup lang="ts">`，组合式 API 为首选。
- Props: 使用类型定义并明确指定默认值和校验（若需要）。

示例说明（伪代码）：
- 在组件中通过 `defineProps` 声明 props 的类型；通过 `defineEmits` 声明事件签名。
- 将复杂逻辑抽离成 composables（如 `useFetchDestinations`、`useBookingForm`）。

- 组件目录结构示例：
  - `src/components/MyComponent/MyComponent.vue`
  - `src/components/MyComponent/index.ts`（导出）

- 模板中避免复杂表达式，将复杂逻辑移至计算属性或方法中。
- 使用 `v-bind`、`v-on` 的简写，但确保可读性。

---

## 5. 状态管理（Pinia）

- 使用 Pinia 的组合式 API：`defineStore` + TypeScript 入口文件 `src/store/index.ts`。
- 为 store 定义接口，导出类型安全的 getter/action/state。

示例说明（伪代码）：
- 定义一个 `BookingState`，其中包含 `cart: BookingItem[]`。
- 使用 `defineStore('booking', { state: () => ({ cart: [] }), actions: { add(item) { ... } } })` 实现添加逻辑。

- Store action 中如需异步调用，返回 Promise 并在需要的地方进行 await 和错误处理。

---

## 6. 异步 / HTTP（axios）

- 所有 HTTP 调用使用 `src/utils/http.ts` 或 `src/api/*` 封装 axios 实例，设置统一的拦截器（请求/响应）和超时/基础URL配置。
- 将接口返回类型定义在 `src/types` 中，并在请求方法中使用泛型。

示例说明（伪代码）：
- `fetchDestinations()` 返回 `ApiResponse<Destination[]>`，在内部通过 `http.get('/destinations')` 调用。

- 对外暴露的 API 函数应始终处理错误或将错误以已知类型抛出，便于上层组件统一处理。
- 对于用户可见的错误，显示友好错误信息；对于开发/日志级错误，保留详细信息到控制台或上报系统。

---

## 7. 错误处理与日志

- 不在 UI 中直接抛出未经处理的异常。
- 使用 try/catch 包裹异步逻辑并处理错误。
- 在开发环境中使用 `console.error` 打印完整错误，在生产环境中考虑上报（如 Sentry）。

示例说明：
- 在 API 调用处使用 try/catch，catch 中使用用户友好的提示，并把完整错误记录到日志或上报系统。

---

## 8. 测试与类型检查

- 在 CI 中运行 `vue-tsc --noEmit` 或 `vue-tsc` 来进行类型检查。
- 为核心逻辑添加单元测试（Jest 或 Vitest）：价格计算、表单验证、路由跳转等。
- 在本地开发时，推荐定期运行 `npm run typecheck`（可在 package.json 添加脚本）。

示例脚本（说明）：
- 在 `package.json` 中添加 `typecheck`（运行 `vue-tsc --noEmit`）和 `test`（运行 `vitest`）。

---

## 9. Git / 提交与 CI

- Commit message 使用 Conventional Commits（feat/fix/docs/...），便于自动生成 changelog。
- 在 push 前运行 lint-staged（格式化 & 类型检查）以阻止低质量提交。
- CI 流程示例：
  - 安装依赖
  - 运行类型检查 `vue-tsc`
  - 运行 ESLint
  - 运行单元测试
  - 构建预览（可选）

---

## 10. 额外建议（实践小贴士）

- 使用 `readonly` 或 `as const` 来表达不变数据。
- 在大型表单或复杂逻辑中使用 `zod` / `yup` / `vee-validate` 做运行时验证，同时保持类型匹配（zod 可以生成 TS 类型）。
- 把副作用（如 localStorage、cookie、analytics）封装到 utils 中，并注入到 composables/store 中，方便单测与替换。
- 当需要临时使用 `any`，在代码中加注释说明并在后续 issue 中修复以避免技术债务。

---

如果你愿意，我可以：
- 将这份规范加入到项目 README 中的“开发指南”部分；
- 基于本规范生成 ESLint / Prettier 的推荐配置文件（`.eslintrc.cjs` / `.prettierrc`）；
- 在 CI 中添加 `vue-tsc` 与 lint 的示例 workflow（`.github/workflows/ci.yml`）。

告诉我接下来你希望我执行哪一步（例如：生成 ESLint 配置并在本地验证）。
