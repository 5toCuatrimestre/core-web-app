import React from "react";
import { Layout } from "antd";
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}> 
      <Sider width={180} style={{ overflow: "auto" }}>
        <Sidebar/>
      </Sider>

      {/* Main Content */}
      <Content style={{ padding: "16px"}}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default BaseLayout;
