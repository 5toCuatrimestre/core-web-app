import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import { StyleContext } from "../../core/StyleContext";
import { Button } from "@heroui/react";
import { ModalL } from "../../components/modalL";
import { removeToken } from "../../services/storage";

const { Sider, Content } = Layout;

export function BaseLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); // Estado global para la foto de perfil
  const { style } = useContext(StyleContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider
        width={isSidebarOpen ? 192 : 64}
        className="transition-transform duration-300 ease-in-out overflow-hidden flex will-change-transform"
        style={{ transform: `translateX(0)` }}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          togglePopover={() => setIsPopoverOpen((prev) => !prev)}
          openModal={() => setIsModalOpen(true)}
          profilePhoto={profilePhoto} // Pasamos la foto de perfil
        />
      </Sider>

      <Content
        className="p-4 overflow-auto h-full"
        style={{ background: style.BgInterface }}
      >
        <Outlet />

        {isPopoverOpen && (
          <div
            className={`fixed bottom-1 left-14 rounded-lg border-1 shadow-md p-2 z-50 gap-2 flex flex-col
      transition-all duration-300 ease-in-out transform ${isPopoverOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{
              background: style.BgCard,
              borderColor: style.BgButton,
            }}
          >
            <Button
              className="text-left hover:opacity-75 rounded px-4 py-2"
              style={{ background: style.BgButton, color: style.P }}
              onClick={() => {
                removeToken();
                navigate("/");
              }}
            >
              Cerrar sesión
            </Button>
            <Button
              className="text-left hover:opacity-75 rounded px-4 py-2"
              style={{ background: style.BgButton, color: style.P }}
              onClick={() => setIsModalOpen(true)}
            >
              Modificar logo
            </Button>
          </div>
        )}

        {/* Modal para modificar logo */}
        <ModalL
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setProfilePhoto={setProfilePhoto}
        />
      </Content>
    </Layout>
  );
}

export default BaseLayout;
