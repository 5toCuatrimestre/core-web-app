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
    <Layout style={{ height: "100vh" }}>
      {/* Sider con tamaño dinámico */}
      <Sider
        width={isSidebarOpen ? 192 : 64} // Ajusta el ancho según el estado
        style={{
          background: "white",
          transition: "all .2s ease-in-out",
          overflow: "hidden", 
        }}
        className="flex"
      >
        {/* Pasamos el estado y función de toggle al Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Sider>
      {/* Contenido principal */}
      <Content style={{ padding: "16px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
