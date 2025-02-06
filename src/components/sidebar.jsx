import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { BiDish } from "react-icons/bi";
import { RiRestaurantLine } from "react-icons/ri";
import { MdOutlineFastfood } from "react-icons/md";
import { StyleContext } from "../core/StyleContext";
import { MenuOpen, Menu } from "@mui/icons-material";

const menuItems = [
  { title: "Estadísticas", key: "statistic", icon: <BarChartOutlined /> },
  { title: "Usuarios", key: "user", icon: <TeamOutlined /> },
  { title: "Productos", key: "product", icon: <MdOutlineFastfood /> },
  { title: "Carta", key: "dish", icon: <RiRestaurantLine /> },
  { title: "Estilos", key: "style", icon: <SettingOutlined /> },
];

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { style } = useContext(StyleContext);
  const navigate = useNavigate();

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

      {/* Lista de Menú */}
      <ul className="flex-grow">
        {menuItems.map(({ title, key, icon }) => (
          <li
            key={key}
            className={`flex items-center py-2 px-4 cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
            onClick={() => navigate(`/${key}`)}
          >
            {React.cloneElement(icon, {
              style: { color: style.baseColor },
              className: isSidebarOpen ? "text-2xl mr-2" : "text-3xl",
            })}
            <span
              className={`${isSidebarOpen ? "block text-1xl" : "hidden"}`}
              style={{ color: style.baseColor }}
            >
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
