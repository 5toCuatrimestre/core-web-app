import React, { useState, useContext } from "react";
import { ColorPicker } from "antd";
import { StyleContext } from "../../core/StyleContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";

export function Style() {
  const { handleColorChange: updateGlobalStyle } = useContext(StyleContext);
  const { style } = useContext(StyleContext);

  const [colors, setColors] = useState({
    H1: "#ffffff",
    H2: "#ffffff",
    H3: "#ffffff",
    P: "#000000",
    BgCard: "#05004a",
    BgInterface: "#1f24ab",
    BgButton: "#ffffff",
  });

  const [colorLabels, setcolorLabels] = useState({
    H1: "Encabezado 1",
    H2: "Encabezado 2",
    H3: "Encabezado 3",
    P: "Texto",
    BgCard: "Tarjeta",
    BgInterface: "Interfaz",
    BgButton: "Botón",
  });

  const handleColorChange = (key, color) => {
    setColors((prev) => ({ ...prev, [key]: color.toHexString() }));
  };

  const handleSaveChanges = () => {
    updateGlobalStyle(colors);
    console.log(colors);
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
          {/* Fila de color pickers */}
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center text-xs">
                <h3 className="capitalize text-lg" style={{ color: style.H3 }}>
                  {colorLabels[key] || key}
                </h3>
                <ColorPicker
                  defaultValue={value}
                  onChange={(color) => handleColorChange(key, color)}
                  className="w-6 h-6 mt-1" // Ajuste del tamaño del picker
                />
              </div>
            ))}
          </div>
          {/* Preview de los colores */}
          <div
            className="p-4 rounded-lg flex items-center justify-center w-full max-w-lg mx-auto mb-10"
            style={{ backgroundColor: colors.BgInterface }}
          >
            <div
              className="p-2 rounded-xl w-full text-left"
              style={{ backgroundColor: colors.BgCard }}
            >
              <h1 className="text-xl" style={{ color: colors.H1 }}>
                Encabezado 1
              </h1>
              <h2 className="text-lg" style={{ color: colors.H2 }}>
                Encabezado 2
              </h2>
              <h3 className="text-sm" style={{ color: colors.H3 }}>
                Encabezado 3
              </h3>
              <Button
                className="mt-2"
                style={{ background: colors.BgButton, color: colors.P }}
              >
                Botón
              </Button>
            </div>
          </div>
          {/* Tres previews de diseño */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[colors, colors, colors].map((previewColors, index) => (
              <div
                key={index}
                className="p-4 rounded-xl relative flex items-center justify-center w-full max-w-lg mx-auto"
                style={{ backgroundColor: previewColors.BgInterface }}
              >
                <div
                  className="p-2 rounded-lg w-full text-left"
                  style={{ backgroundColor: previewColors.BgCard }}
                >
                  <h1
                    className="text-xl font-bold"
                    style={{ color: previewColors.H1 }}
                  >
                    Encabezado 1
                  </h1>
                  <h2 className="text-lg" style={{ color: previewColors.H2 }}>
                    Encabezado 2
                  </h2>
                  <h3 className="text-sm" style={{ color: previewColors.H3 }}>
                    Encabezado 3
                  </h3>
                  <Button
                    className="mt-2"
                    style={{
                      background: previewColors.BgButton,
                      color: previewColors.P,
                    }}
                  >
                    Botón
                  </Button>
                </div>
                {/* Checkbox en la esquina superior derecha */}
                <Checkbox className="absolute top-2 right-2 z-20 bg-white rounded-lg shadow-md" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
