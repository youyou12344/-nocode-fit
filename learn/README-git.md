# Git 学习笔记

## Git 别名 配置与使用
<!-- 2025/07/12 -->
Git 别名可以简化常用命令，提高开发效率。通过配置别名，可以将长命令简化为短命令。
```bash
# 设置别名
git config --global alias.ac '!git add . && git commit -m'

# 使用别名
git ac "提交信息 commit message"

# 查看全部别名
git config --global --get-regexp alias

# 查看特定别名 (验证设置)
git config --global alias.ac

# 删除别名 `--unset`
git config --global --unset alias.ac
```


