import React, { useState, useContext } from "react";
import { ColorPicker } from "antd";
import { StyleContext } from "../../core/StyleContext";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { users } from "../../json/users";

// Ejemplo de ícono, si deseas alguno para header o similar
// import { FaUserCircle } from "react-icons/fa";

export function Style() {
  // Datos y columnas estáticas para la vista previa
  const previewColumns = [
    { name: "ID", uid: "user_id" },
    { name: "NOMBRE", uid: "name" },
    { name: "TELÉFONO", uid: "phone_number" },
    { name: "ROL", uid: "role" },
    { name: "ESTADO", uid: "status" },
    { name: "CREADO EN", uid: "created_at" },
    { name: "ACCIONES", uid: "actions" },
  ];
  // Solo usamos los primeros 3 usuarios para la vista previa
  const previewUsers = users.slice(0, 3);
  const { handleColorChange: updateGlobalStyle } = useContext(StyleContext);
  const { style } = useContext(StyleContext);

  // 🎨 Tres temas predefinidos
  const themes = [
    {
      H1: "#ffffff",
      H2: "#cccccc",
      H3: "#aaaaaa",
      P: "#000000",
      BgCard: "#222222",
      BgInterface: "#111111",
      BgButton: "#c7c7c7",
    },
    {
      H1: "#000000",
      H2: "#333333",
      H3: "#000000",
      P: "#ffffff",
      BgCard: "#f0f0f0",
      BgInterface: "#ffffff",
      BgButton: "#000000",
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
    H1: "Título 1",
    H2: "Título 2",
    H3: "Texto principal",
    P: "Texto botón",
    BgCard: "Fondo tarjeta",
    BgInterface: "Fondo interfaz",
    BgButton: "Botón",
  };

  // Actualizar colores al cambiar manualmente
  const handleColorChange = (key, color) => {
    setColors((prev) => ({ ...prev, [key]: color.toHexString() }));
  };

  // Guardar cambios en el contexto global
  const handleSaveChanges = () => {
    updateGlobalStyle(colors);
    console.log("Cambios de colores guardados");
  };

  // Manejar selección de un tema (solo uno a la vez)
  const handleThemeSelection = (index) => {
    if (selectedThemeIndex === index) return; // No hacer nada si ya está seleccionado
    setSelectedThemeIndex(index);
    setColors(themes[index]);
  };

  return (
    <div
      className="w-full h-full grid grid-cols-1 md:grid-cols-[2fr_4fr_1fr] gap-4"
      style={{ backgroundColor: style.BgInterface }}
    >
      {/* PRIMERA COLUMNA (2fr): Temas predefinidos */}
      <Card
        className="shadow-lg flex flex-col"
        style={{ background: style.BgCard }}
      >
        <CardHeader className="flex flex-col items-start text-left space-y-2">
          <h1 className="text-lg font-bold" style={{ color: style.H2 }}>
            Temas anteriores
          </h1>
          <p className="text-sm" style={{ color: style.H3 }}>
            Selecciona uno para aplicarlo
          </p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {themes.map((previewColors, index) => (
            <div
              key={index}
              className="p-4 rounded-xl relative flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: previewColors.BgInterface }}
              onClick={() => handleThemeSelection(index)}
            >
              <div
                className="p-2 rounded-lg w-full text-left"
                style={{ backgroundColor: previewColors.BgCard }}
              >
                <h2
                  className="text-base font-bold"
                  style={{ color: previewColors.H1 }}
                >
                  {colorLabels.H1}
                </h2>
                <p className="text-sm" style={{ color: previewColors.H2 }}>
                  {colorLabels.H2}
                </p>
                <p className="text-xs" style={{ color: previewColors.H3 }}>
                  {colorLabels.H3}
                </p>
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
              {/* Checkbox */}
              <Checkbox
                isSelected={selectedThemeIndex === index}
                className="absolute top-2 right-2 z-20 bg-white rounded-lg shadow-md"
                onChange={() => handleThemeSelection(index)}
              />
            </div>
          ))}
        </CardBody>
      </Card>

      {/* SEGUNDA COLUMNA (4fr): Vista Previa (la más grande) */}
      <Card
        className="shadow-lg flex flex-col"
        style={{ background: style.BgCard }}
      >
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-xl font-bold" style={{ color: style.H2 }}>
              Vista Previa
            </h1>
            <p className="text-sm" style={{ color: style.H3 }}>
              Observa los resultados aquí
            </p>
          </div>
        </CardHeader>

        {/* CardBody con 2 filas y 2 columnas */}
        <CardBody className="p-10">
          <div className="overflow-hidden">
            <Card style={{ background: colors.BgInterface, padding: "1rem" }}>
              {/* Forzamos el remount de la tabla usando JSON.stringify(colors) como key */}
              <div
                className="text-xl font-bold"
                style={{
                  color: colors.H1,
                }}
              >
                Titulo 1
              </div>
              <div
                className="text-lg font-medium mb-5"
                style={{
                  color: colors.H2,
                }}
              >
                Titulo 2
              </div>
              <div key={JSON.stringify(colors)}>
                <Table
                  style={{
                    background: colors.BgCard,
                    color: colors.P,
                  }}
                  classNames={{ wrapper: "p-0 m-0" }}
                  aria-label="Diseño de tabla"
                >
                  <TableHeader columns={previewColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        style={{
                          background: colors.BgButton,
                          color: colors.P,
                        }}
                      >
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={previewUsers}
                    emptyContent="No hay usuarios"
                  >
                    {(item) => (
                      <TableRow key={item.id} style={{ color: colors.H3 }}>
                        {(columnKey) => (
                          <TableCell>
                            {columnKey === "actions" ? (
                              <div
                                style={{
                                  background: colors.BgButton,
                                  color: colors.P,
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  textAlign: "center",
                                }}
                              >
                                Acciones
                              </div>
                            ) : (
                              item[columnKey] || ""
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            onPress={handleSaveChanges}
            style={{ background: style.BgButton, color: style.P }}
            className="w-full mt-2 md:mt-0"
          >
            Guardar Cambios
          </Button>
        </CardFooter>
      </Card>

      {/* TERCERA COLUMNA (1fr): Ajuste manual de colores (color pickers) */}
      <Card
        className="shadow-lg flex flex-col"
        style={{ background: style.BgCard }}
      >
        <CardHeader className="flex flex-col items-start text-left space-y-2">
          <h1 className="text-lg font-bold" style={{ color: style.H2 }}>
            Ajuste Manual
          </h1>
          <p className="text-sm" style={{ color: style.H3 }}>
            Modifica cada color
          </p>
        </CardHeader>

        <CardBody className="flex flex-wrap gap-4 justify-center">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center text-center">
              <h3
                className="mb-1 text-sm font-medium capitalize"
                style={{ color: style.H3 }}
              >
                {colorLabels[key]}
              </h3>
              <ColorPicker
                value={value}
                onChange={(color) => handleColorChange(key, color)}
                className="w-6 h-6"
              />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
