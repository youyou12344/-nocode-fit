# Python3 学习笔记

## Python3 http.server
<!-- 2025/07/12 -->
Python3 内置的 `http.server` 模块提供了简单的 HTTP 文件服务器功能，特别适合本地开发和静态网站预览。

### 基础用法
```bash
# 启动 HTTP 服务器（默认端口 8000）
python3 -m http.server

# 指定端口启动
python3 -m http.server 3000

# 指定主机和端口
python3 -m http.server 3000 --bind 127.0.0.1
```

### 命令参数详解
- `python3` - Python 3.x 解释器
- `-m` - 模块执行标志，将后面的参数作为模块名执行
- `http.server` - Python 标准库中的 HTTP 服务器模块
- `3000` - 端口号（可选，默认 `8000` ）
  - `3000` - React 开发常用端口
  - `8080` - 传统 Web 开发端口
  - `8000` - Python 默认 端口
  - `5000` - Flask 开发端口


### 开发环境 | 静态网站预览
本项目具体实践：
```bash
# 1 进入项目构建目录 + 2 启动服务器
cd dist && python3 -m http.server 3000

# 1.1 检查端口是否被占用
lsof -i:3000
# 输出
# COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
# Python  91575 lijing    4u  IPv4 0x607e07e6863707af      0t0  TCP *:hbci (LISTEN)

# 1.2 终止进程
# kill -9 [PID]
kill -9 91575

# 3 浏览器访问： 测试静态资源加载
http://localhost:3000
```
