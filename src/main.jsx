// ================================================
// 第一步：入口文件（项目启动流程）
// 1. 查看 src/main.jsx
// 学习笔记: 这是 React 应用的入口文件，负责挂载根组件 <App />。
// 这里可以看到 ReactDOM 的渲染逻辑，以及全局样式的引入。
// ================================================

import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // 引入根组件
import "./index.css"; // 引入全局样式

// ================================================
// 📒 学习笔记: React 18 推荐使用 createRoot 方法进行挂载
// - root 元素是在 根目录的 index.html 中定义的
// ================================================
ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
