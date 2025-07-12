# GitHub Pages 部署教程

## 🚀 简介

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，可以直接从 GitHub 仓库部署网站。

## ✅ 优势

- **完全免费**：无任何费用
- **国内访问稳定**：比 Vercel 在中国访问更稳定
- **自动部署**：使用 GitHub Actions 自动构建和部署
- **版本控制**：与代码仓库完全集成
- **自定义域名**：支持绑定自己的域名

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

### 2. 创建 GitHub Actions 工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'yarn'  # 或 'npm'，取决于你的包管理器
        
    - name: Install dependencies
      run: yarn install --frozen-lockfile  # 或 npm ci
      
    - name: Build
      run: yarn build  # 或 npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist  # 构建输出目录
```

### 3. 配置 GitHub Pages

1. **进入你的 GitHub 仓库**
2. **点击 Settings 标签**
3. **在左侧菜单找到 Pages**
4. **Source 选择 "GitHub Actions"**
5. **保存设置**

### 4. 配置 Actions 权限

1. **进入 Settings → Actions → General**
2. **找到 "Workflow permissions"**
3. **勾选 "Read and write permissions"**
4. **保存设置**

### 5. 推送代码

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 6. 检查部署状态

1. **进入 Actions 标签**
2. **查看工作流运行状态**
3. **等待部署完成**

## 🔧 常见问题解决

### 权限错误

如果遇到 `Permission denied` 错误：

```
remote: Permission to username/repo.git denied to github-actions[bot].
```

**解决方案**：
1. 检查 Actions 权限设置（见步骤4）
2. 如果有分支保护规则，临时关闭 `gh-pages` 分支保护

### 构建失败

**常见原因**：
1. **包管理器不匹配**：确保工作流中使用正确的包管理器
2. **构建命令错误**：检查 `package.json` 中的脚本
3. **依赖问题**：确保所有依赖都已安装

**解决方案**：
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

**可能原因**：
1. **路由问题**：SPA 应用需要配置重写规则
2. **文件路径错误**：检查 `publish_dir` 设置

**解决方案**：
在 `index.html` 中确保正确的 base 路径：

```html
<script type="module" src="/src/main.jsx"></script>
```

## 🌐 自定义域名

1. **在 Pages 设置中添加自定义域名**
2. **配置 DNS 解析**：
   - 类型：CNAME
   - 记录：你的域名
   - 值：`username.github.io`
3. **等待 DNS 传播**

## 📱 移动端优化

确保你的项目有移动端适配：

```jsx
// 在 index.html 中添加
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

// 使用响应式 CSS
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## 🎯 网站地址

部署成功后，你的网站地址会是：
```
https://你的用户名.github.io/仓库名
```

例如：`https://youyou12344.github.io/nocode-fit`

## 💡 最佳实践

1. **使用 GitHub Actions**：自动化部署流程
2. **测试构建**：在本地先测试 `npm run build`
3. **检查权限**：确保 Actions 有写入权限
4. **监控部署**：关注 Actions 运行状态

## 🔗 相关链接

- [GitHub Pages 官方文档](https://pages.github.com/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 