import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RiRestaurantLine } from "react-icons/ri";
import { MdOutlineFastfood } from "react-icons/md";
import { StyleContext } from "../core/StyleContext";
import { MenuOpen, Menu } from "@mui/icons-material";
import { TooltipC } from "./tooltipC";

const menuItems = [
  { title: "Estadísticas", key: "/statistic", icon: <BarChartOutlined /> },
  { title: "Usuarios", key: "/user", icon: <TeamOutlined /> },
  { title: "Productos", key: "/product", icon: <MdOutlineFastfood /> },
  { title: "Carta", key: "/dish", icon: <RiRestaurantLine /> },
  { title: "Estilos", key: "/style", icon: <SettingOutlined /> },
];

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { style } = useContext(StyleContext);
  const navigate = useNavigate();
  const location = useLocation(); // 📌 Obtiene la ruta actual

  return (
    <div
      className={`h-full flex flex-col ${isSidebarOpen ? "w-48" : "w-16"}`}
      style={{ background: style.BgCard }}
    >
      {/* Botón de Toggle */}
      <div className="p-3 flex justify-between items-center">
        <span
          className={`${isSidebarOpen ? "text-black" : "hidden"} text-lg font-semibold`}
          style={{ color: style.BgButton }}
        >
          Menú
        </span>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 text-black rounded-full shadow-md"
          style={{ color: style.BgButton, background: style.BgCard }}
        >
          {isSidebarOpen ? <MenuOpen /> : <Menu />}
        </button>
      </div>

      {/* Lista de Menú */}
      <ul className="flex-grow">
        {menuItems.map(({ title, key, icon }) => {
          const isActive = location.pathname === key; // 📌 Verifica si es la pestaña actual

          return (
            <TooltipC key={key} content={title} showArrow={false} placement="right">
              <li
                className={`flex items-center py-2 px-4 cursor-pointer transition-all duration-200 ease-in-out
                  ${isSidebarOpen ? "justify-start" : "justify-center"} 
                  ${isActive ? "font-bold" : ""}
                `}
                style={{
                  background: isActive ? style.BgButton : "transparent",
                  color: isActive ? style.BgCard : style.BgButton,
                }}
                onClick={() => navigate(key)}
              >
                {React.cloneElement(icon, {
                  style: { color: isActive ? style.BgCard : style.BgButton },
                  className: isSidebarOpen ? "text-2xl mr-2" : "text-3xl",
                })}
                <span
                  className={`${isSidebarOpen ? "block text-1xl" : "hidden"}`}
                  style={{ color: isActive ? style.BgCard : style.BgButton }}
                >
                  {title}
                </span>
              </li>
            </TooltipC>
          );
        })}
      </ul>
    </div>
  );
}
