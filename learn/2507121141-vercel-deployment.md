# Vercel 部署教程
Vercel 是一个现代化的静态网站托管平台，特别适合 React、Vue、Next.js 等前端项目。


优势如下：
- 完全免费：个人项目免费使用
- 自动部署：连接 GitHub 后，每次 push 自动部署
- 全球 CDN：访问速度快
- 自动 HTTPS：免费 SSL 证书
- 零配置：大部分项目开箱即用


## ⭕️ 待实践
- 使用环境变量：不要硬编码敏感信息
- 监控性能：使用 Vercel Analytics 监控网站性能


## 1 部署步骤

### 1.1 准备项目
确保项目有正确的构建配置 ，
参考 [`package.json`](../package.json) 中的 scripts 配置 `build`

### 1.2 创建 vercel.json 配置
参考项目根目录的 [`vercel.json`](../vercel.json) 文件

### 1.3 部署到 Vercel
1. 访问 [vercel.com](https://vercel.com) ✅
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 保持默认设置，点击 "Deploy" (需5分钟)
6. 生成可访问的域名地址 https://nocode-fit.vercel.app/



## 2 实践遇到的问题
在手机上访问 https://nocode-fit.vercel.app/ 白屏，提示网络错误，
因为 Vercel 部署的项目在**中国大陆无法访问**。





## x 其他
- VerCel: Version Cell “卖版本"或”版本细胞”
- 方法3：功能记忆
  - V = Version (版本) Version control
  - E = Easy (简单) Easy to use
  - R = React (React友好) **React** friendly
  - C = Cloud (云端) Cloud platform
  - E = Express (快速) Easy deployment
  - L = Lightning (闪电般快速) Lightning fast
- 方法4：品牌记忆
  - 记住它是 **Next.js** 的创造者
  - Next.js → Vercel (同一个团队)
