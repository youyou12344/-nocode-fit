# 腾讯云 COS + CDN 部署教程

## 🚀 简介

腾讯云对象存储 COS + CDN 是一个高性能的静态网站托管解决方案，特别适合中国大陆用户，访问速度快，稳定性好。

## ✅ 优势

- **国内访问速度快**：CDN 节点遍布全国
- **免费额度充足**：每月 50GB 存储 + 10GB 流量
- **稳定性好**：腾讯云基础设施支持
- **HTTPS 免费**：自动提供 SSL 证书
- **自定义域名**：支持绑定自己的域名

## 📋 部署步骤

### 1. 注册腾讯云账号

1. **访问 [腾讯云官网](https://cloud.tencent.com/)**
2. **使用微信或手机号注册**
3. **完成实名认证**（必须）

### 2. 开通 COS 对象存储

1. **登录腾讯云控制台**
2. **搜索 "对象存储 COS"**
3. **点击 "立即使用"**
4. **选择 "标准存储"**（免费额度足够）

### 3. 创建存储桶

1. **点击 "创建存储桶"**
2. **配置信息**：
   - **名称**：`nocode-fit`（必须全局唯一）
   - **地域**：选择离你最近的（如：广州、上海、北京）
   - **访问权限**：选择 "公有读私有写"
   - **其他选项**：保持默认
3. **点击 "确定"**

### 4. 构建项目

在本地构建你的项目：

```bash
# 如果使用 yarn
yarn build

# 如果使用 npm
npm run build
```

构建完成后会生成 `dist` 文件夹。

### 5. 上传项目文件

1. **进入你的存储桶**
2. **点击 "对象管理"**
3. **点击 "上传文件"**
4. **选择 `dist` 文件夹下的所有内容**（不是整个 dist 文件夹，而是里面的文件和文件夹）
5. **上传到存储桶的根目录**

### 6. 配置静态网站托管

1. **在存储桶左侧菜单找到 "基础配置"**
2. **点击 "静态网站托管"**
3. **启用静态网站托管**
4. **设置首页文档为 `index.html`**
5. **设置 404 页面为 `index.html` 或 `404.html`**
6. **保存设置**

### 7. 配置 CDN 加速

1. **在腾讯云顶部搜索 "CDN"**
2. **进入 CDN 控制台**
3. **点击 "添加域名"**
4. **配置信息**：
   - **加速域名**：如 `yourdomain.cdn.dnsv1.com`（可以用自己的域名，需备案）
   - **源站类型**：选择 "对象存储 COS"
   - **源站地址**：选择你刚才创建的存储桶
5. **点击 "确定"**
6. **等待 CDN 配置生效**（通常几分钟）

### 8. 访问你的网站

配置完成后，你会获得一个 CDN 加速域名，直接用这个域名访问即可。

## 🔧 常见问题解决

### 上传文件问题

**问题**：上传整个 `dist` 文件夹导致路径错误
**解决**：只上传 `dist` 文件夹内的内容，不要上传 `dist` 文件夹本身

### 访问权限问题

**问题**：网站无法访问
**解决**：
1. 确保存储桶权限设置为 "公有读私有写"
2. 检查静态网站托管是否已启用
3. 确认首页文档设置正确

### CDN 配置问题

**问题**：CDN 域名无法访问
**解决**：
1. 等待 CDN 配置生效（通常 5-10 分钟）
2. 检查源站配置是否正确
3. 确认域名解析是否正常

## 🌐 自定义域名配置

### 1. 域名备案

如果你的域名未备案，需要先在腾讯云进行备案。

### 2. 添加自定义域名

1. **在 CDN 控制台添加自定义域名**
2. **配置 DNS 解析**：
   - 类型：CNAME
   - 记录：你的域名
   - 值：CDN 提供的 CNAME 地址
3. **等待 DNS 传播**（通常几分钟到几小时）

### 3. 配置 HTTPS

1. **在 CDN 控制台申请免费证书**
2. **配置强制 HTTPS 跳转**
3. **等待证书生效**

## 💰 费用说明

### 免费额度

- **存储费用**：每月 50GB 免费
- **流量费用**：每月 10GB 免费
- **请求费用**：每月 100 万次免费

### 超出免费额度

- **存储**：0.099 元/GB/月
- **流量**：0.5 元/GB
- **请求**：0.01 元/万次

## 📱 移动端优化

确保你的项目有移动端适配：

```html
<!-- 在 index.html 中添加 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

```css
/* 使用响应式 CSS */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## 🔒 安全配置

### 1. 防盗链设置

在 CDN 控制台配置防盗链：
- 设置允许的 Referer
- 配置 IP 白名单

### 2. 缓存策略

配置合适的缓存策略：
- 静态资源：长期缓存
- HTML 文件：短期缓存

## 💡 最佳实践

1. **选择合适的存储类型**：标准存储适合静态网站
2. **配置 CDN 缓存**：提高访问速度
3. **监控费用**：关注使用量，避免超出免费额度
4. **定期备份**：重要数据定期备份

## 🔗 相关链接

- [腾讯云 COS 官方文档](https://cloud.tencent.com/document/product/436)
- [腾讯云 CDN 官方文档](https://cloud.tencent.com/document/product/228)
- [静态网站托管指南](https://cloud.tencent.com/document/product/436/31937)
- [CDN 加速 COS 指南](https://cloud.tencent.com/document/product/228/30987) 