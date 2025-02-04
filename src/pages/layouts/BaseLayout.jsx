import React, { useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

export function BaseLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Layout className="h-screen overflow-hidden">
      {/* Sider con tamaño dinámico */}
      <Sider
        width={isSidebarOpen ? 192 : 64}
        className="bg-white transition-transform duration-300 ease-in-out overflow-hidden flex will-change-transform"
        style={{ transform: `translateX(0)` }}
      >
        {/* Pasamos el estado y función de toggle al Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Sider>
      {/* Contenido principal */}
      <Content className="p-4 overflow-auto h-full">
        <Outlet />
      </Content>
    </Layout>
  );
}
