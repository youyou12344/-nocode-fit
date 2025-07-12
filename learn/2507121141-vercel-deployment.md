# Vercel 部署教程

## 🚀 简介

Vercel 是一个现代化的静态网站托管平台，特别适合 React、Vue、Next.js 等前端项目。

## ✅ 优势

- 完全免费：个人项目免费使用
- 自动部署：连接 GitHub 后，每次 push 自动部署
- 全球 CDN：访问速度快
- 自动 HTTPS：免费 SSL 证书
- 零配置：大部分项目开箱即用

## 📋 部署步骤

### 1. 准备项目

确保你的项目有正确的构建配置：

```json
// package.json
{
  "scripts": {
    "build": "vite build"
  }
}
```

### 2. 创建 vercel.json 配置

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. 部署到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 保持默认设置，点击 "Deploy"

### 4. 配置环境变量（如需要）

如果你的项目需要环境变量，在 Vercel 控制台：
- 进入项目设置
- 找到 "Environment Variables"
- 添加需要的变量

## 🔧 常见问题解决

### 构建失败

1. 检查构建命令：确保 `package.json` 中有正确的 `build` 脚本
2. 检查输出目录：确保 `vercel.json` 中的 `outputDirectory` 正确
3. 查看构建日志：在 Vercel 控制台查看详细错误信息

### 路由问题

如果使用 React Router，确保 `vercel.json` 中有正确的重写规则：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 移动端访问问题

在中国大陆，Vercel 可能存在访问问题：
- 网络延迟高
- 部分地区可能被墙
- 建议使用国内 CDN 或 GitHub Pages

## 🌐 自定义域名

1. 在 Vercel 控制台添加域名
2. 配置 DNS 解析
3. 等待 DNS 传播（通常几分钟到几小时）

## 📱 移动端优化

确保你的项目有移动端适配：

```jsx
// 在 index.html 中添加
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

// 在 CSS 中使用响应式设计
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## 💡 最佳实践

1. 使用环境变量：不要硬编码敏感信息
2. 优化构建：减少包大小，提高加载速度
3. 测试部署：在部署前本地测试构建
4. 监控性能：使用 Vercel Analytics 监控网站性能
