import React, { useContext } from "react";
import { Tree } from "antd";
import {
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined, ProductOutlined
} from "@ant-design/icons";
import { StyleContext } from "../core/StyleContext";
import { useNavigate } from "react-router-dom";
import { MenuOpen, Menu} from "@mui/icons-material";

const treeData = [
  {
    title: "Estadísticas",
    key: "statistics",
    icon: <BarChartOutlined />,
  },
  {
    title: "Usuarios",
    key: "users",
    icon: <TeamOutlined />,
  },
  { title: "Productos", key: "products", icon: <ProductOutlined />},
  { title: "Estilos", key: "styles", icon: <SettingOutlined /> },
];

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { style } = useContext(StyleContext);
  const navigate = useNavigate();

  const onSelect = (selectedKeys, info) => {
    console.log(info);
    const selectedKey = selectedKeys[0];
    navigate(`/${selectedKey}`);
  };
  return (
    <div
      className={`h-full flex flex-col ${isSidebarOpen ? "w-48" : "w-16"} bg-white`}
    >
      {/* Botón de Toggle */}
      <div className="p-3 flex justify-between items-center">
        <span
          className={`${isSidebarOpen ? "text-black" : "hidden"} text-lg font-semibold`}
          style={{ color: style.baseColor }}
        >
          Menú
        </span>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 text-black rounded-full shadow-md"
          style={{ color: style.baseColor }}
        >
          {isSidebarOpen ? <MenuOpen /> : <Menu />}
        </button>
      </div>

      {/* Contenedor del Tree con ajuste dinámico */}
      <div className="flex-grow">
        <Tree
          treeData={treeData.map((node) => ({
            ...node,
            title: (
              <div className="flex items-center min-w-[64px]">
                {React.isValidElement(node.icon) &&
                  React.cloneElement(node.icon, {
                    style: { color: style.baseColor },
                    className: `${
                      isSidebarOpen
                        ? "text-black text-2xl mr-2" // Expandida: Ícono normal con margen a la derecha
                        : "text-black text-3xl pl-11" // Colapsada: Ícono más grande y sin margen
                    }`,
                  })}
                <span
                  className={`${isSidebarOpen ? "block text-1xl" : "invisible mt-4"}`}
                  style={{ color: style.baseColor }}
                >
                  {node.title}
                </span>
              </div>
            ),

            children: isSidebarOpen
              ? node.children?.map((child) => ({
                  ...child,
                  style: { color: style.lightBackgroundColor },
                }))
              : null,
          }))}
          onSelect={onSelect}
          defaultExpandAll
          className={`m-2 ${
            isSidebarOpen ? "pl-2" : "flex justify-center"
          }`}
        />
      </div>
    </div>
  );
}
