# 腾讯云 COS 配置指南

## 快速配置步骤

### 1. 创建腾讯云账号
- 访问 [腾讯云官网](https://cloud.tencent.com/)
- 注册并实名认证账号

### 2. 创建 COS 存储桶
```bash
# 登录腾讯云控制台
# 进入对象存储 COS
# 创建存储桶
```

**配置参数：**
- 存储桶名称：`your-project-name`
- 所属地域：`北京`（推荐）
- 访问权限：`公有读私有写`
- 版本控制：`开启`

### 3. 获取访问密钥
```bash
# 控制台 → 访问管理 → API密钥管理
# 创建新的密钥对
```

**需要记录的信息：**
- SecretId
- SecretKey

### 4. 安装腾讯云 CLI
```bash
# 安装 coscmd
pip install coscmd

# 配置
coscmd config -a <SecretId> -s <SecretKey> -b <BucketName> -r <Region>
```

### 5. 配置 GitHub Secrets
在 GitHub 仓库设置中添加以下 Secrets：

| Secret 名称 | 值 |
|-------------|-----|
| `TENCENT_SECRET_ID` | 你的 SecretId |
| `TENCENT_SECRET_KEY` | 你的 SecretKey |
| `COS_BUCKET` | 存储桶名称 |
| `COS_REGION` | 地域（如：ap-beijing-1） |

### 6. 配置 CDN 加速

#### 开启 CDN
1. 进入腾讯云 CDN 控制台
2. 添加域名
3. 选择 COS 源站
4. 配置加速域名

#### 配置 HTTPS
1. 申请 SSL 证书
2. 配置到 CDN
3. 开启强制 HTTPS

#### 缓存配置
```json
{
  "*.html": "no-cache",
  "*.js": "max-age=31536000",
  "*.css": "max-age=31536000",
  "*.png": "max-age=31536000",
  "*.jpg": "max-age=31536000"
}
```

### 7. 域名配置

#### 自定义域名
1. 在 COS 控制台绑定自定义域名
2. 配置 CNAME 记录
3. 开启 HTTPS

#### 示例配置
```
域名: your-domain.com
CNAME: your-bucket-name.cos.ap-beijing-1.myqcloud.com
```

## 成本估算

### 存储费用
- 标准存储：¥0.099/GB/月
- 低频存储：¥0.08/GB/月

### CDN 费用
- 中国大陆：¥0.21/GB
- 海外：¥0.45/GB

### 示例项目（100MB）
- 存储费用：¥0.01/月
- CDN 费用：¥0.02/月（10GB 流量）
- **总费用：¥0.03/月**

## 常见问题

### Q: 如何刷新 CDN 缓存？
```bash
# 使用腾讯云 CLI
coscmd refresh -r https://your-domain.com/
```

### Q: 如何监控访问情况？
- 在 CDN 控制台查看访问统计
- 配置访问日志
- 设置告警规则

### Q: 如何备份数据？
```bash
# 下载所有文件
coscmd download -r / local-backup/
```

## 安全配置

### 防盗链设置
```json
{
  "Referer": {
    "Status": "Enabled",
    "RefererType": "White-List",
    "EmptyRefererAllow": "Deny",
    "DomainList": ["your-domain.com"]
  }
}
```

### 访问控制
- 设置 IP 白名单
- 配置签名 URL
- 启用 WAF 防护

## 性能优化

### 压缩配置
- 开启 Gzip 压缩
- 配置 Brotli 压缩
- 优化图片格式

### 缓存策略
- 静态资源长期缓存
- HTML 文件不缓存
- API 接口短时间缓存

## 监控告警

### 设置告警
1. 配置访问量告警
2. 设置错误率告警
3. 配置费用告警

### 日志分析
- 开启访问日志
- 配置日志投递
- 设置日志分析

## 最佳实践

1. **使用 CDN 加速**：提高访问速度
2. **配置 HTTPS**：确保安全访问
3. **合理缓存**：减少回源请求
4. **监控告警**：及时发现问题
5. **定期备份**：保护数据安全 