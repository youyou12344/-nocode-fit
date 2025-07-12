// 第一步：入口文件（项目启动流程）
// 2. 查看 src/App.jsx
// React 应用的入口文件
// 学习笔记: 这是整个应用的主组件，通常负责 全局布局 和 路由配置 。
// 可以在这里了解页面是如何组织和切换的。

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const App = () => (
  // 学习笔记: 这里可以设置 全局的布局、导航栏、路由等
  <QueryClientProvider client={queryClient}>
    {/* 气泡框组件 */}
    <TooltipProvider>
      {/* 消息通知组件 */}
      <Toaster />
      {/* 路由配置 */}
      <BrowserRouter>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
