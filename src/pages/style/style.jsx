import React, { useState, useContext } from "react";
import { ColorPicker } from "antd";
import { StyleContext } from "../../core/StyleContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";

export function Style() {
  const { handleColorChange: updateGlobalStyle } = useContext(StyleContext);
  const { style } = useContext(StyleContext);

  // 🎨 Definir tres temas predefinidos
  const themes = [
    {
      H1: "#ffffff",
      H2: "#cccccc",
      H3: "#aaaaaa",
      P: "#eeeeee",
      BgCard: "#222222",
      BgInterface: "#111111",
      BgButton: "#555555",
    },
    {
      H1: "#000000",
      H2: "#333333",
      H3: "#555555",
      P: "#666666",
      BgCard: "#f0f0f0",
      BgInterface: "#ffffff",
      BgButton: "#dddddd",
    },
    {
      H1: "#ffffff",
      H2: "#ffffff",
      H3: "#ffffff",
      P: "#000000",
      BgCard: "#05004a",
      BgInterface: "#1f24ab",
      BgButton: "#ffffff",
    },
  ];

  const [selectedThemeIndex, setSelectedThemeIndex] = useState(null);
  const [colors, setColors] = useState(themes[0]); // Inicia con el primer tema

  // Etiquetas de colores
  const colorLabels = {
    H1: "Encabezado 1",
    H2: "Encabezado 2",
    H3: "Encabezado 3",
    P: "Texto",
    BgCard: "Tarjeta",
    BgInterface: "Interfaz",
    BgButton: "Botón",
  };

  // Actualizar colores al cambiar manualmente
  const handleColorChange = (key, color) => {
    setColors((prev) => ({ ...prev, [key]: color.toHexString() }));
  };

  // Guardar cambios en el contexto global
  const handleSaveChanges = () => {
    updateGlobalStyle(colors);
  };

  // Manejar selección de un tema (Solo se permite uno a la vez)
  const handleThemeSelection = (index) => {
    if (selectedThemeIndex === index) return; // Si ya está seleccionado, no hacer nada
    setSelectedThemeIndex(index);
    setColors(themes[index]); // Aplica el tema seleccionado a los ColorPickers
  };

  return (
    <div className="h-full max-w-8xl grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
      <Card
        className="shadow-lg p-6 flex flex-col col-span-2 overflow-y-hidden"
        style={{ background: style.BgCard }}
      >
        <CardHeader>
          <h1 className="text-xl font-bold" style={{ color: style.H2 }}>
            Selecciona los colores
          </h1>
          <Button
            onPress={handleSaveChanges}
            style={{ background: style.BgButton, color: style.P }}
            className="absolute top-4 right-4"
          >
            Guardar Cambios
          </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Fila de ColorPickers */}
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center text-xs">
                <h3 className="capitalize text-lg" style={{ color: style.H3 }}>
                  {colorLabels[key]}
                </h3>
                <ColorPicker
                  value={value}
                  onChange={(color) => handleColorChange(key, color)}
                  className="w-6 h-6 mt-1"
                />
              </div>
            ))}
          </div>

          {/* Preview de la configuración actual */}
          <div
            className="p-4 rounded-lg flex items-center justify-center w-full max-w-lg mx-auto mb-10"
            style={{ backgroundColor: colors.BgInterface }}
          >
            <div
              className="p-2 rounded-xl w-full text-left"
              style={{ backgroundColor: colors.BgCard }}
            >
              <h1 className="text-xl" style={{ color: colors.H1 }}>
                {colorLabels.H1}
              </h1>
              <h2 className="text-lg" style={{ color: colors.H2 }}>
                {colorLabels.H2}
              </h2>
              <h3 className="text-sm" style={{ color: colors.H3 }}>
                {colorLabels.H3}
              </h3>
              <Button
                className="mt-2"
                style={{ background: colors.BgButton, color: colors.P }}
              >
                {colorLabels.BgButton}
              </Button>
            </div>
          </div>

          {/* Tres previews de diseño con temas predefinidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themes.map((previewColors, index) => (
              <div
                key={index}
                className="p-4 rounded-xl relative flex items-center justify-center w-full max-w-lg mx-auto cursor-pointer"
                style={{ backgroundColor: previewColors.BgInterface }}
                onClick={() => handleThemeSelection(index)}
              >
                <div
                  className="p-2 rounded-lg w-full text-left"
                  style={{ backgroundColor: previewColors.BgCard }}
                >
                  <h1
                    className="text-xl font-bold"
                    style={{ color: previewColors.H1 }}
                  >
                    {colorLabels.H1}
                  </h1>
                  <h2 className="text-lg" style={{ color: previewColors.H2 }}>
                    {colorLabels.H2}
                  </h2>
                  <h3 className="text-sm" style={{ color: previewColors.H3 }}>
                    {colorLabels.H3}
                  </h3>
                  <Button
                    className="mt-2"
                    style={{
                      background: previewColors.BgButton,
                      color: previewColors.P,
                    }}
                  >
                    {colorLabels.BgButton}
                  </Button>
                </div>
                {/* Checkbox en la esquina superior derecha */}
                <Checkbox
                  isSelected={selectedThemeIndex === index} // ✅ Esta es la forma correcta
                  className="absolute top-2 right-2 z-20 bg-white rounded-lg shadow-md"
                  onChange={() => handleThemeSelection(index)}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
