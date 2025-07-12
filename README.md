# 饮食热量计算器

本项目是一个基于 Web 的饮食热量计算器，帮助用户根据个人身体数据和活动水平，科学计算每日所需热量，适用于健身、减脂和健康管理等场景。

## 目录结构说明

```
nocode-fit/
├── src/                # 源码目录
│   ├── components/     # 通用 UI 组件
│   ├── lib/            # 工具函数
│   ├── pages/          # 页面组件
│   ├── index.css       # 全局样式
│   ├── main.jsx        # 应用入口
│   └── nav-items.jsx   # 导航配置
├── public/             # 公共资源（如有）
├── index.html          # HTML 模板
├── package.json        # 项目依赖与脚本
├── tailwind.config.js  # Tailwind CSS 配置
├── postcss.config.js   # PostCSS 配置
├── vite.config.js      # Vite 配置
└── README.md           # 项目说明文档
```

- `src/components/`：存放可复用的 UI 组件
- `src/lib/`：工具函数和通用逻辑
- `src/pages/`：页面级组件（如首页 Index.jsx）
- `src/index.css`：全局样式文件
- `src/main.jsx`：React 应用入口
- `index.html`：主 HTML 模板
- `package.json`：依赖与脚本管理
- `tailwind.config.js`、`postcss.config.js`、`vite.config.js`：相关工具和构建配置

## 主要功能
- 输入年龄、性别、身高、体重、活动水平
- 自动计算基础代谢率（BMR）
- 自动计算每日总能量消耗（TDEE）
- 推荐减脂期每日热量摄入（TDEE 的 85%）
- 结果实时展示，界面美观友好

## 技术栈
- React 18
- Vite
- Tailwind CSS
- Radix UI
- 其他现代前端库

## 快速开始
```
nvm use v20
```
1. 安装依赖
```
yarn install
```
1. 启动开发服务器
```
yarn dev
```

访问 http://localhost:8080 查看应用。

<!-- ## 在线预览
（如有线上部署，可在此处添加访问链接。例如：https://your-demo-link.com）

## 项目截图
（可在此处插入项目主要界面的截图。例如：）

![主界面截图](./screenshot.png) -->

<!-- ## 贡献指南
欢迎大家参与贡献！
1. Fork 本仓库
2. 新建分支进行开发
3. 提交 Pull Request
4. 等待审核合并

如有建议或 bug，欢迎提交 Issue。

## 常见问题（FAQ）
**Q: 如何切换主题？**
A: 目前暂未支持主题切换，后续版本将考虑加入。

**Q: 计算结果是否科学？**
A: 计算公式基于常用健康管理标准，仅供参考，具体请结合个人实际情况。

## License
MIT -->


## 依赖说明

### 前端框架与基础库
- **react / react-dom**：核心前端库，用于构建用户界面。
- **react-router-dom**：React 路由库，实现页面跳转和路由管理。

### UI 组件与样式
- **@radix-ui/react-***：Radix UI 提供的一系列无样式、可访问性的 React 组件（如按钮、对话框、选择器等），方便快速搭建现代 UI。
- **tailwindcss**：原子化 CSS 框架，极大提升开发效率和样式一致性。
  - Tailwind CSS 实际上是一个 PostCSS 插件
  - Vite 负责热更新和打包，PostCSS 负责处理 CSS，Tailwind 负责生成和裁剪样式。
  - Tailwind 只会把你项目中真正用到的工具类（如 bg-gray-100、p-8 等）生成到最终的 CSS 文件里，没用到的不会生成。
- **tailwindcss-animate**：为 Tailwind CSS 提供动画支持。
- **clsx / class-variance-authority**：用于动态拼接 className，简化样式逻辑。
- **lucide-react**：一套现代化的 React 图标库。
- **framer-motion**：强大的 React 动画库，提升交互体验。

### 表单与数据处理
- **react-hook-form**：高性能、易用的表单管理库。
- **@hookform/resolvers**：为 react-hook-form 提供校验支持（如 zod）。
- **zod**：声明式数据校验库，常与表单结合使用。
- **date-fns**：现代 JavaScript 日期工具库，处理日期更方便。

### 网络与数据
- **axios**：流行的 HTTP 请求库，简化与后端的数据交互。
- **@tanstack/react-query**：强大的数据获取、缓存和同步库，提升数据管理体验。
- **@supabase/supabase-js**：Supabase 的 JS 客户端，支持云端数据库和认证（如有用到）。

### 其他常用库
- **recharts**：基于 React 的图表库，适合数据可视化。
- **embla-carousel-react**：React 轮播图组件。
- **cmdk**：命令面板组件，提升交互体验。
- **html-to-image**：将 HTML 元素导出为图片。
- **input-otp**：输入验证码的 UI 组件。
- **sonner**：优雅的消息通知组件。
- **vaul**：抽屉式弹窗组件。

### 开发与构建工具
- **vite**：极速前端构建工具，开发体验极佳。
- **@vitejs/plugin-react**：Vite 的 React 插件。
- **eslint 及相关插件**：代码规范和质量检查。
- **postcss / autoprefixer**：CSS 处理和兼容性增强。

> 更多依赖请参考 package.json 文件。
