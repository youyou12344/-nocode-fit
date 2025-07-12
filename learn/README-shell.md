# Shell 快速参考


## 文件时间
<!-- 2025/07/12 -->
```bash
stat -f "格式字符串" 文件名 -t "时间格式"
# stat = status（状态） => 获取 文件详细状态信息
```

```bash
# 获取文件创建时间
stat -f "%SB" -t "%y%m%d%H%M" filename
# %SB：创建时间（Birth time）

# 获取文件修改时间（输出时间）
stat -f "%Sm" -t "%y%m%d%H%M" filename
# %Sm：修改时间（Modification time）

# 获取文件访问时间
stat -f "%Sa" -t "%y%m%d%H%M" filename
# %Sa：访问时间（Access time）

# 大小写和 前端 moment 相反
# `%y`：年份后两位（25）
# `%m`：月份（01-12）
# `%d`：日期（01-31）
# `%H`：小时（00-23）
# `%M`：分钟（00-59）
```


## 文件重命名
<!-- 2025/07/12 -->
```bash
# 基本重命名
mv oldname.md newname.md

# 添加时间前缀
mv file.md $(date +"%y%m%d%H%M")-file.md

# 批量重命名（添加创建时间前缀）
for file in *.md; do
    echo "处理: $file"
    timestamp=$(stat -f "%SB" -t "%y%m%d%H%M" "$file")
    mv "$file" "${timestamp}-${file}"
done
```

```bash
# mv 安全操作选项
mv file1 file2       # 不安全：静默强制覆盖
mv -i file1 file2    # 安全：覆盖前 交互式确认
mv -v file1 file2    # 安全：显示详细操作
mv -n file1 file2    # 安全：不覆盖已存在文件

# 推荐：组合使用安全参数
mv -iv oldname.md newname.md
```
