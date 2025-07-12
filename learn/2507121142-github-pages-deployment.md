# GitHub Pages 部署完整指南

## 📋 目录
- [简介与优势](#-简介与优势)
- [快速开始](#-快速开始)
- [详细部署步骤](#-详细部署步骤)
- [高级配置](#-高级配置)
- [常见问题解决](#-常见问题解决)
- [最佳实践](#-最佳实践)
- [GitHub Actions 深度解析](#github-actions-自动执行分析)

## 🚀 简介与优势

### 什么是 GitHub Pages？
GitHub Pages 是 GitHub 提供的免费静态网站托管服务，支持直接从 GitHub 仓库自动部署网站。

### ✨ 核心优势

| 特性 | 说明 |
|------|------|
| 💰 完全免费 | 无任何费用，无流量限制 |
| 🌏 国内访问稳定 | 比 Vercel 在中国访问更稳定 |
| 🔄 自动部署 | 使用 GitHub Actions 自动构建和部署 |
| 📝 版本控制 | 与代码仓库完全集成，支持回滚 |
| 🌐 自定义域名 | 支持绑定自己的域名 |
| 🔒 HTTPS 支持 | 自动提供 SSL 证书 |

## ⚡ 快速开始

### 前置条件
- ✅ GitHub 账户
- ✅ 本地 Git 环境  
- ✅ Node.js 项目（React/Vue/Vanilla JS 等）

### 一键部署流程
1. 推送代码到 GitHub
2. 创建 GitHub Actions 工作流
3. 配置 GitHub Pages 设置
4. 自动部署完成

## 📋 详细部署步骤

### 步骤 1: 项目准备

确保 [`package.json`](../package.json) 包含构建脚本：

```json
{
  "name": "your-project",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    // 你的依赖
  }
}
```

### 步骤 2: 创建 GitHub Actions 工作流

在项目根目录创建 [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)：

```yaml
name: 🚀 Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

# 设置 GITHUB_TOKEN 权限
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发部署
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout
      uses: actions/checkout@v4
      
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'yarn'  # 或 'npm'
        
    - name: 📦 Install dependencies
      run: yarn install --frozen-lockfile
      
    - name: 🔨 Build
      run: yarn build
      env:
        NODE_ENV: production
      
    - name: 📁 Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./dist
      
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build-and-deploy
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: 🚀 Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### 步骤 3: 配置 GitHub Pages

1. 进入仓库设置
   - 点击 `Settings` 标签
   - 左侧菜单找到 `Pages`

2. 配置部署源
   - Source: 选择 `GitHub Actions`
   - 保存设置

### 步骤 4: 配置 Actions 权限

1. 进入 Settings → Actions → General
2. 找到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 勾选 "Allow GitHub Actions to create and approve pull requests"
5. 保存设置

### 步骤 5: 推送代码

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "✨ Add GitHub Pages deployment workflow"

# 推送到远程仓库
git push origin main
```

### 步骤 6: 监控部署

1. 进入 Actions 标签
2. 查看工作流运行状态
3. 等待部署完成
4. 访问你的网站

## 🔧 高级配置

### 自定义构建配置

#### Vite 配置优化
```javascript
// [vite.config.js](../vite.config.js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

#### 环境变量配置
```javascript
// 在构建时输出环境变量信息
console.log('=== 构建环境变量信息 ===')
console.log('VERCEL:', process.env.VERCEL)
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('========================')
```

### 自定义域名配置

1. 在 Pages 设置中添加自定义域名
2. 配置 DNS 解析：

| 记录类型 | 名称 | 值 |
|---------|------|-----|
| CNAME | @ | `username.github.io` |
| CNAME | www | `username.github.io` |

3. 创建 CNAME 文件
```bash
# 在 public 目录下创建 CNAME 文件
echo "your-domain.com" > public/CNAME
```

### 404 页面配置

创建 `public/404.html` 文件：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>页面未找到</title>
</head>
<body>
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <a href="/">返回首页</a>
</body>
</html>
```

## 🚨 常见问题解决

### 1. 权限错误

错误信息：
```
remote: Permission to username/repo.git denied to github-actions[bot].
```

解决方案：
1. 检查 Actions 权限设置（见步骤4）
2. 如果有分支保护规则，临时关闭 `gh-pages` 分支保护

### 构建失败

常见原因：
1. 包管理器不匹配：确保工作流中使用正确的包管理器
2. 构建命令错误：检查 `package.json` 中的脚本
3. 依赖问题：确保所有依赖都已安装
4. 不需要手动创建 `gh-pages` 分支 ！GitHub Actions 会自动创建这个分支。

解决方案：
```yaml
# 如果使用 npm
cache: 'npm'
run: npm ci
run: npm run build

# 如果使用 yarn
cache: 'yarn'
run: yarn install --frozen-lockfile
run: yarn build
```

### 页面空白

可能原因：
1. 路由问题：SPA 应用需要配置重写规则
2. 文件路径错误：检查 `publish_dir` 设置

解决方案：
在 [`index.html`](../index.html) 中确保正确的 base 路径：

```html
<script type="module" src="/src/main.jsx"></script>
```


## 🎯 网站地址

部署成功后，你的网站地址会是：
```bash
https://youyou12344.github.io/yy12344-fit
# https://你的用户名.github.io/仓库名
```


## 💡 最佳实践

1. 使用 GitHub Actions：自动化部署流程
2. 测试构建：在本地先测试 `npm run build`
3. 检查权限：确保 Actions 有写入权限
4. 监控部署：关注 Actions 运行状态



## GitHub Actions 自动执行分析

### 概述
本文档分析了 yy12344-fit 项目的 GitHub Actions 自动执行流程，包括读取的文件和执行的操作。

### 读取的文件

#### 1. 配置文件
- [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) - GitHub Actions 工作流配置文件
- [`package.json`](../package.json) - 项目依赖和脚本配置
- [`yarn.lock`](../yarn.lock) - 依赖锁定文件
- [`vite.config.js`](../vite.config.js) - Vite 构建配置

#### 2. 源代码文件
- [`src/`](../src/) 目录下的所有源代码文件 - React 组件和页面
- 其他配置文件 - 如 [`tailwind.config.js`](../tailwind.config.js)、[`postcss.config.js`](../postcss.config.js) 等

### 执行流程

#### 触发条件
- 当代码推送到 `main` 分支时
- 当向 `main` 分支创建 Pull Request 时

#### 详细步骤

##### 步骤 1: Checkout
```yaml
- name: Checkout
  uses: actions/checkout@v3
```
- 使用 `actions/checkout@v3` 检出代码到 Ubuntu 最新版本环境

##### 步骤 2: 设置 Node.js 环境
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18'
    cache: 'yarn'
```
- 使用 `actions/setup-node@v3` 设置 Node.js 18 版本
- 配置 yarn 缓存以加速依赖安装

##### 步骤 3: 安装依赖
```yaml
- name: Install dependencies
  run: yarn install --frozen-lockfile
```
- 执行 `yarn install --frozen-lockfile` 安装项目依赖
- 使用锁定文件确保依赖版本一致性

##### 步骤 4: 构建项目
```yaml
- name: Build
  run: yarn build
```
- 执行 `yarn build` 命令
- 这会运行 `vite build`，根据 `vite.config.js` 的配置进行构建
- 构建过程中会输出环境变量信息（通过 console.log 输出）
- 构建产物输出到 `dist/` 目录

##### 步骤 5: 部署到 GitHub Pages
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: github.ref == 'refs/heads/main'
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```
- 使用 `peaceiris/actions-gh-pages@v3` 部署到 GitHub Pages
- 只有在 `main` 分支上才会执行部署
- 将 `dist/` 目录的内容发布到 GitHub Pages

### 环境变量设置

在构建过程中，GitHub Actions 会自动设置以下环境变量：

- `GITHUB_ACTIONS=true` - 标识当前在 GitHub Actions 环境中
- `NODE_ENV=production` - 生产环境标识
- `VERCEL` - 未设置（因为这是 GitHub Actions，不是 Vercel）

### 构建输出

在 [`vite.config.js`](../vite.config.js) 中添加了环境变量输出：

```javascript
// 在构建时输出环境变量取值
console.log('=== 构建环境变量信息 ===');
console.log('VERCEL:', process.env.VERCEL);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('========================');
```

## 🔄 分支部署机制详解

### main 分支 vs gh-pages 分支

#### 📝 main 分支的作用
- 🖥️ 开发分支：存放所有源码、配置文件、文档等
- 🚀 触发部署：每次推送到 main 分支时，GitHub Actions 自动运行
- 📝 版本控制：完整的项目历史记录和协作开发

#### 🌐 gh-pages 分支的作用
- 🌐 部署分支：专门用于 GitHub Pages 静态网站托管
- 📁 静态文件：只包含构建后的静态文件（如 `dist/` 目录内容）
- 🤖 自动管理：由 GitHub Actions 自动创建和更新，无需手动维护

### 🔄 完整工作流程

```mermaid
graph LR
    A[本地开发] --> B[推送到 main 分支]
    B --> C[GitHub Actions 触发]
    C --> D[构建项目 dist/]
    D --> E[推送到 gh-pages 分支]
    E --> F[GitHub Pages 发布网站]
```

#### 详细步骤说明

1. 🖥️ 开发阶段：在 main 分支进行代码开发和提交
2. 🚀 推送触发：推送到 main 分支后，GitHub Actions 自动启动
3. 🔨 构建过程：Actions 执行 `yarn build`，生成 `dist/` 目录
4. 📤 自动部署：Actions 将 `dist/` 内容推送到 gh-pages 分支
5. 🌐 网站发布：GitHub Pages 读取 gh-pages 分支，发布为网站

### ❓ 常见疑问解答

#### Q: 为什么不用 main 分支直接部署？
A: 分离开发和部署的好处：
- 🔒 安全性：main 分支包含源码和配置，不适合直接暴露
- ⚡ 效率：gh-pages 分支只包含静态资源，加载更快
- 📊 管理：便于版本控制和回滚操作
- 👥 协作：开发者和访问者使用不同的分支

#### Q: 需要手动管理 gh-pages 分支吗？
A: 完全不需要！
- 🤖 GitHub Actions 自动创建和更新 gh-pages 分支
- 🎯 你只需要专注于 main 分支的开发
- ⚡ 部署过程完全自动化

#### Q: 如何查看部署状态？
A: 通过以下方式监控：
- 📊 GitHub 仓库的 Actions 标签页
- 📝 查看 gh-pages 分支的提交历史
- 🌐 访问你的网站地址验证部署结果

### 🎯 最佳实践建议

1. 🎯 专注开发：只在 main 分支进行开发工作
2. 🤖 自动化部署：让 GitHub Actions 处理所有部署流程
3. 📊 监控状态：定期检查 Actions 运行状态和网站访问
4. 📝 版本管理：通过 main 分支的提交历史管理版本

```
