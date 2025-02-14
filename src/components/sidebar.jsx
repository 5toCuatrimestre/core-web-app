import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RiRestaurantLine } from "react-icons/ri";
import { MdOutlineFastfood } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPencilAlt } from "react-icons/fa";
import { MenuOpen, Menu } from "@mui/icons-material";
import { StyleContext } from "../core/StyleContext";
import { TooltipC } from "./tooltipC";
import { Card } from "@heroui/card";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/modal"; // Modal de HeroUI

// Definición de los elementos del menú
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
  const location = useLocation();

  // Estados para la sección de perfil
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Funciones de manejo
  const handleChangePhoto = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    console.log("Cerrando sesión...");
    // Aquí iría la lógica de logout
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const isProfileActive = location.pathname === "/profile";

  return (
    <div
      className={`h-full flex flex-col ${isSidebarOpen ? "w-48" : "w-16"}`}
      style={{ background: style.BgCard }}
    >
      {/* Botón de Toggle */}
      <div className="p-3 flex justify-between items-center">
        <span
          className={`${isSidebarOpen ? "block" : "hidden"} text-lg font-semibold`}
          style={{ color: style.BgButton }}
        >
          Menú
        </span>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 rounded-full shadow-md"
          style={{ color: style.BgButton, background: style.BgCard }}
        >
          {isSidebarOpen ? <MenuOpen /> : <Menu />}
        </button>
      </div>

      {/* Lista de menú */}
      <ul className="flex-grow">
        {menuItems.map(({ title, key, icon }) => {
          const isActive = location.pathname === key;
          return (
            <TooltipC
              key={key}
              content={title}
              showArrow={false}
              placement="right"
            >
              <li
                className={`flex items-center py-2 px-4 cursor-pointer transition-all duration-200 ease-in-out ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } ${isActive ? "font-bold" : ""}`}
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
                  className={`${isSidebarOpen ? "block" : "hidden"}`}
                  style={{ color: isActive ? style.BgCard : style.BgButton }}
                >
                  {title}
                </span>
              </li>
            </TooltipC>
          );
        })}
      </ul>

      {/* Sección de Perfil */}
      <div className="relative p-3 mt-auto">
        <div
          className={`relative flex items-center cursor-pointer ${
            isSidebarOpen ? "justify-start" : "justify-center"
          }`}
          onMouseEnter={() => setShowProfileCard(true)}
          onMouseLeave={() => setShowProfileCard(false)}
          onClick={handleChangePhoto} // Abrir modal al hacer clic
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Perfil"
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: style.BgButton }}
            />
          ) : (
            <CgProfile className="text-3xl" style={{ color: style.BgButton }} />
          )}
          {/* Icono de lápiz para cambiar foto */}
          {showProfileCard && (
            <FaPencilAlt
              className="absolute -top-4 text-xl"
              style={{ color: style.BgButton }}
              onClick={handleChangePhoto}
            />
          )}
          {/* Card pequeña de HeroUI que se despliega al pasar el ratón */}
          {showProfileCard && (
            <Card
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 p-2 flex flex-col items-center transition-opacity duration-200"
              style={{ background: style.BgCard }}
            >
              <Button
                onPress={handleLogout}
                className="text-xs text-red-500 hover:underline"
              >
                Cerrar Sesión
              </Button>
              <Button
                onPress={handleChangePhoto}
                className="text-xs text-blue-500 hover:underline mt-1"
              >
                Cambiar Foto de Perfil
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de HeroUI para subir imagen */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card className="p-4 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Cambiar Foto de Perfil</h2>
          <form
            onSubmit={handleModalSubmit}
            className="w-full flex flex-col items-center"
          >
            <input type="file" onChange={handlePhotoSelect} className="mb-2" />
            <Button
              type="submit"
              className="w-full"
              style={{ background: style.BgButton, color: style.BgCard }}
            >
              Subir Foto
            </Button>
          </form>
        </Card>
      </Modal>
    </div>
  );
}

export default Sidebar;
