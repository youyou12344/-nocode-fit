<!--
 * @Date: 2025-07-02 19:27:39
 * @LastEditTime: 2025-07-02 19:49:36
-->
# 饮食热量计算器

本项目是一个基于 Web 的饮食热量计算器，帮助用户根据个人身体数据和活动水平，科学计算每日所需热量，适用于健身、减脂和健康管理等场景。

## 目录结构说明

```
nocode-fit/
├── src/                # 源码目录
│   ├── components/     # 通用 UI 组件
│   ├── lib/            # 工具函数
│   ├── pages/          # 页面组件
│   ├── index.css       # 全局样式
│   ├── main.jsx        # 应用入口
│   └── nav-items.jsx   # 导航配置
├── public/             # 公共资源（如有）
├── index.html          # HTML 模板
├── package.json        # 项目依赖与脚本
├── tailwind.config.js  # Tailwind CSS 配置
├── postcss.config.js   # PostCSS 配置
├── vite.config.js      # Vite 配置
└── README.md           # 项目说明文档
```

- `src/components/`：存放可复用的 UI 组件
- `src/lib/`：工具函数和通用逻辑
- `src/pages/`：页面级组件（如首页 Index.jsx）
- `src/index.css`：全局样式文件
- `src/main.jsx`：React 应用入口
- `index.html`：主 HTML 模板
- `package.json`：依赖与脚本管理
- `tailwind.config.js`、`postcss.config.js`、`vite.config.js`：相关工具和构建配置

## 主要功能
- 输入年龄、性别、身高、体重、活动水平
- 自动计算基础代谢率（BMR）
- 自动计算每日总能量消耗（TDEE）
- 推荐减脂期每日热量摄入（TDEE 的 85%）
- 结果实时展示，界面美观友好

## 技术栈
- React 18
- Vite
- Tailwind CSS
- Radix UI
- 其他现代前端库

## 快速开始
1. 安装依赖
```
npm install
```
2. 启动开发服务器
```
npm run dev
```

访问 http://localhost:5173 查看应用。

<!-- ## 在线预览
（如有线上部署，可在此处添加访问链接。例如：https://your-demo-link.com）

## 项目截图
（可在此处插入项目主要界面的截图。例如：）

![主界面截图](./screenshot.png) -->

<!-- ## 贡献指南
欢迎大家参与贡献！
1. Fork 本仓库
2. 新建分支进行开发
3. 提交 Pull Request
4. 等待审核合并

如有建议或 bug，欢迎提交 Issue。

## 常见问题（FAQ）
**Q: 如何切换主题？**
A: 目前暂未支持主题切换，后续版本将考虑加入。

**Q: 计算结果是否科学？**
A: 计算公式基于常用健康管理标准，仅供参考，具体请结合个人实际情况。

## License
MIT -->
