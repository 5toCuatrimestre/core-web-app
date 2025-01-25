import React, { useContext } from "react";
import { Tree } from "antd";
import {
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { StyleContext } from "../core/StyleContext";
import { useNavigate } from "react-router-dom";

const treeData = [
  {
    title: "Estadísticas",
    key: "statistics",
    icon: <BarChartOutlined style={{ color: "inherit" }} />, // Dinámico
    children: [
      {
        title: "Meseros",
        key: "statistics/waiter",
      },
      {
        title: "Ventas",
        key: "statistics/sells",
      },
    ],
  },
  //Usuarios
  {
    title: "Usuarios",
    key: "users",
    icon: <TeamOutlined style={{ color: "inherit" }} />, // Dinámico
    children: [
      {
        title: "Líderes",
        key: "users/leaders",
      },
      {
        title: "Meseros",
        key: "users/waiters",
      },
    ],
  },
  {
    title: "Estilos",
    key: "styles",
    icon: <SettingOutlined style={{ color: "inherit" }} />,
  },
];

export function Sidebar() {
  const { style } = useContext(StyleContext);
  const navigate = useNavigate();

  const onSelect = (selectedKeys, info) => {
    console.log(info)
    const selectedKey = selectedKeys[0]; 
    navigate(`/${selectedKey}`); 
  };

  return (
    <div
      style={{
        backgroundColor: style.lightBackgroundColor,
        height: "100vh",
        width: 180,
      }}
      className="p-2"
    >
      <Tree
        showIcon
        treeData={treeData.map((node) => ({ 
          ...node,
          icon: React.isValidElement(node.icon)
            ? React.cloneElement(node.icon, {
                style: { color: style.baseColor },
              })
            : null,
          children: node.children?.map((child) => ({
            ...child,
            style: { color: style.lightBackgroundColor, },
          })),

        }))}
        onSelect={onSelect}
        defaultExpandAll
        style={{ paddingTop: 10, paddingBottom: 10, color: style.baseColor }}
      />
    </div>
  );
}
