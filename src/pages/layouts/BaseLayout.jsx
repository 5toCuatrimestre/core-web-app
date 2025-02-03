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
        width={isSidebarOpen ? 192 : 64} // Ajusta el ancho según el estado
        className="bg-white transition-all duration-200 ease-in-out overflow-hidden flex"
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
