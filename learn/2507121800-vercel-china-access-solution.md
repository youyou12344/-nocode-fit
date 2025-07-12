# Vercel 中国大陆访问解决方案

## 问题描述
Vercel 部署的项目在中国大陆无法正常访问，出现白屏或网络错误。

## 解决方案

### 方案一：腾讯云 COS + CDN（推荐）

#### 1. 构建静态文件
```bash
# 构建项目
yarn build

# 构建产物在 dist 目录
```

#### 2. 上传到腾讯云 COS
```bash
# 安装腾讯云 CLI
pip install coscmd

# 配置 COS
coscmd config -a <SecretId> -s <SecretKey> -b <BucketName> -r <Region>

# 上传文件
coscmd upload -r dist/ /
```

#### 3. 配置 CDN 加速
- 在腾讯云控制台开启 CDN
- 配置自定义域名
- 设置 HTTPS 证书

#### 4. 自动化部署脚本
```bash
#!/bin/bash
# deploy.sh

echo "开始构建..."
yarn build

echo "上传到腾讯云 COS..."
coscmd upload -r dist/ /

echo "刷新 CDN 缓存..."
# 需要配置 CDN 刷新 API

echo "部署完成！"
```

### 方案二：GitHub Pages

#### 1. 配置 GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Build
        run: yarn build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 2. 启用 GitHub Pages
- 仓库设置 → Pages
- Source 选择 "GitHub Actions"

### 方案三：阿里云 OSS + CDN

#### 1. 上传到阿里云 OSS
```bash
# 安装阿里云 CLI
pip install ossutil

# 配置
ossutil config

# 上传
ossutil cp -r dist/ oss://your-bucket/
```

#### 2. 配置 CDN
- 在阿里云控制台配置 CDN
- 绑定自定义域名

### 方案四：使用国内云服务商

#### 1. 华为云
- 使用华为云 OBS 存储
- 配置华为云 CDN

#### 2. 百度云
- 使用百度云 BOS 存储
- 配置百度云 CDN

## 推荐配置

### 腾讯云 COS 配置
```json
{
  "bucket": "your-bucket-name",
  "region": "ap-beijing-1",
  "domain": "https://your-domain.com"
}
```

### CDN 配置
- 开启 Gzip 压缩
- 配置缓存策略
- 启用 HTTPS
- 配置安全防护

## 成本对比

| 方案 | 存储费用 | CDN 费用 | 总费用/月 |
|------|----------|----------|-----------|
| 腾讯云 COS + CDN | ¥0.099/GB | ¥0.21/GB | ~¥5-20 |
| 阿里云 OSS + CDN | ¥0.12/GB | ¥0.24/GB | ~¥6-25 |
| GitHub Pages | 免费 | 免费 | 免费 |

## 自动化部署

### 使用 GitHub Actions
```yaml
name: Deploy to Tencent Cloud

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Build
        run: yarn build
        
      - name: Deploy to Tencent Cloud COS
        uses: tencentyun/cos-action@v1
        with:
          secret_id: ${{ secrets.TENCENT_SECRET_ID }}
          secret_key: ${{ secrets.TENCENT_SECRET_KEY }}
          bucket: ${{ secrets.COS_BUCKET }}
          region: ${{ secrets.COS_REGION }}
          local_path: ./dist
          remote_path: /
```

## 注意事项

1. **域名备案**：使用国内 CDN 需要域名备案
2. **HTTPS 证书**：配置 SSL 证书确保安全访问
3. **缓存策略**：合理配置缓存提高访问速度
4. **监控告警**：设置访问监控和异常告警

## 快速开始

1. 选择腾讯云 COS + CDN 方案
2. 创建 COS 存储桶
3. 配置 CDN 加速
4. 上传构建文件
5. 绑定自定义域名

推荐使用腾讯云方案，性价比较高且服务稳定。 