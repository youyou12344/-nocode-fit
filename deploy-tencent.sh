#!/bin/bash

# 腾讯云 COS 部署脚本
# 使用方法: ./deploy-tencent.sh

set -e

echo "🚀 开始部署到腾讯云 COS..."

# 检查是否安装了 coscmd
if ! command -v coscmd &> /dev/null; then
    echo "❌ 未安装 coscmd，请先安装："
    echo "pip install coscmd"
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
yarn build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist 目录不存在"
    exit 1
fi

# 上传到腾讯云 COS
echo "☁️ 上传到腾讯云 COS..."
coscmd upload -r dist/ /

echo "✅ 部署完成！"
echo "🌐 访问地址: https://your-bucket-name.cos.ap-beijing-1.myqcloud.com"
echo "💡 建议配置 CDN 加速以获得更好的访问体验" 