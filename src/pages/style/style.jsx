import React, { useState } from "react";
import { ColorPicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function Style() {
  const [colors, setColors] = useState({
    header1: "#4A90E2", // Azul moderno
    header2: "#50E3C2", // Verde agua
    header3: "#B8E986", // Verde pastel
    background1: "#F5F7FA", // Gris claro
    background2: "#D6EAF8", // Azul muy claro
  });
  const [logo, setLogo] = useState(null);

  const previousThemes = [
    {
      header1: "#4A90E2", // Azul moderno
      header2: "#50E3C2", // Verde agua
      header3: "#B8E986", // Verde pastel
      background1: "#F5F7FA", // Gris claro
      background2: "#D6EAF8", // Azul muy claro
    },
    {
      header1: "#F76C6C", // Rojo suave
      header2: "#FFA07A", // Salmón
      header3: "#FFD166", // Amarillo cálido
      background1: "#FFF5E1", // Crema
      background2: "#FDEBD0", // Durazno claro
    },
    {
      header1: "#6C5B7B", // Púrpura suave
      header2: "#C06C84", // Rosa antiguo
      header3: "#F67280", // Coral
      background1: "#F8E1F4", // Rosa claro
      background2: "#EFD9F2", // Lila claro
    },
  ];

  const handleColorChange = (key, color) => {
    setColors((prev) => ({ ...prev, [key]: color.toHexString() }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 h-full max-w-8xl bg-white shadow-xl rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
      <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-2">Selecciona los colores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center w-full">
          <div className="flex flex-col gap-2 items-center w-full max-w-xs md:max-w-sm">
            {Object.entries(colors)
              .filter(([key]) => key.includes("header"))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 justify-between w-full"
                >
                  <span className="capitalize w-28 text-right md:text-center">
                    {`Encabezado ${key.replace("header", "")}`}
                  </span>
                  <ColorPicker
                    defaultValue={value}
                    onChange={(color) => handleColorChange(key, color)}
                    className="w-10"
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 items-center w-full max-w-xs md:max-w-sm">
            {Object.entries(colors)
              .filter(([key]) => key.includes("background"))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 justify-between w-full"
                >
                  <span className="capitalize w-28 text-right md:text-center">
                    {key.replace("background", "Fondo ")}
                  </span>
                  <ColorPicker
                    defaultValue={value}
                    onChange={(color) => handleColorChange(key, color)}
                    className="w-10"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md"
            style={{ backgroundColor: colors.background1 }}
          >
            <h1
              className="text-lg font-semibold"
              style={{ color: colors.header1 }}
            >
              Encabezado 1
            </h1>
            <h2 className="text-md" style={{ color: colors.header2 }}>
              Encabezado 2
            </h2>
            <h3 className="text-sm" style={{ color: colors.header3 }}>
              Encabezado 3
            </h3>
            <div
              className="mt-2 p-2 rounded-lg"
              style={{ backgroundColor: colors.background2 }}
            >
              Fondo Secundario
            </div>
          </div>
        </div>

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Guardar Cambios
        </button>
      </div>

      <div className="flex flex-col gap-6 bg-gray-100 p-4 rounded-lg max-h-screen overflow-auto">
        <h2 className="text-xl font-bold">Temas Anteriores</h2>
        <div className="grid grid-cols-1 gap-3">
          {previousThemes.map((theme, i) => (
            <div
              key={i}
              className="relative p-4 border border-gray-300 rounded-lg shadow-md flex flex-col justify-center"
              style={{ backgroundColor: theme.background1 }}
            >
              <input
                type="checkbox"
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer appearance-none border-2 border-gray-500 rounded-md checked:bg-blue-500 checked:border-transparent self-start"
                onChange={() => console.log("Tema seleccionado:", theme)}
              />
              <div className="">
                <h1
                  className="text-lg font-semibold"
                  style={{ color: theme.header1 }}
                >
                  Encabezado 1
                </h1>
                <h2 className="text-md" style={{ color: theme.header2 }}>
                  Encabezado 2
                </h2>
                <h3 className="text-sm" style={{ color: theme.header3 }}>
                  Encabezado 3
                </h3>
                <div
                  className="mt-2 p-2 rounded-lg"
                  style={{ backgroundColor: theme.background2 }}
                >
                  Fondo Secundario
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-gray-100 p-4 rounded-lg max-h-screen overflow-auto shadow-md border border-gray-300">
        <h2 className="text-xl font-bold text-gray-800">Subir Logo</h2>
        <div className="flex flex-col items-center justify-center w-full bg-white p-4 rounded-lg shadow-md">
          <UploadOutlined className="text-5xl text-gray-500 mb-2" />
          <input
            type="file"
            accept=".png,.jpg,.svg"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:bg-blue-100 file:text-blue-800 file:hover:bg-blue-200 transition-all cursor-pointer"
          />
        </div>
        {logo && (
          <div className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow-md border border-gray-300">
            <span className="text-gray-700 text-sm font-medium">
              Vista previa
            </span>
            <img
              src={logo}
              alt="Logo preview"
              className="mt-3 max-h-32 object-contain border rounded-lg p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
