import React, { useState, useContext, useEffect } from "react";
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
import { useAllStyles } from "../../hooks/useStyles";
import { LoadingSpinner } from "../../components/loadingSpinner";
import toast from 'react-hot-toast';

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
  const { data: styles, isLoading, isError } = useAllStyles(); 
  
  // Estado inicial con colores predeterminados
  const defaultColors = {
    H1: "#ffffff",
    H2: "#cccccc",
    H3: "#aaaaaa",
    P: "#000000",
    BgCard: "#222222",
    BgInterface: "#111111",
    BgButton: "#c7c7c7",
  };
  
  // Inicializamos themes con un array vacío para evitar errores antes de que los datos estén disponibles
  const [themes, setThemes] = useState([]);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(null);
  const [colors, setColors] = useState(defaultColors);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalColors, setOriginalColors] = useState(null);
  
  // Cargar los temas cuando los datos estén disponibles
  useEffect(() => {
    if (styles && styles.result && Array.isArray(styles.result)) {
      setThemes(styles.result);
      
      // Buscar el tema activo
      const activeIndex = styles.result.findIndex(style => style.status === true);
      if (activeIndex >= 0) {
        setSelectedThemeIndex(activeIndex);
        
        // Asegurarnos de que todos los valores de color sean strings
        const activeTheme = styles.result[activeIndex];
        const formattedTheme = {};
        
        Object.keys(activeTheme).forEach(key => {
          if (colorLabels[key]) {
            formattedTheme[key] = typeof activeTheme[key] === 'string' 
              ? activeTheme[key] 
              : (activeTheme[key] === true ? '#000000' : '#' + activeTheme[key].toString(16).padStart(6, '0'));
          } else {
            formattedTheme[key] = activeTheme[key];
          }
        });
        
        setColors(formattedTheme);
        setOriginalColors(formattedTheme);
      }
    }
  }, [styles]);

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
    const newColors = { ...colors, [key]: color.toHexString() };
    setColors(newColors);
    setHasChanges(JSON.stringify(newColors) !== JSON.stringify(originalColors));
  };

  // Guardar cambios en el contexto global
  const handleSaveChanges = async () => {
    if (isSaving || !hasChanges) return;
    
    setIsSaving(true);
    try {
      await updateGlobalStyle(colors, colors.styleId);
      setOriginalColors(colors);
      setHasChanges(false);
      toast.success('Estilo actualizado correctamente', {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('Error al actualizar el estilo', {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Manejar selección de un tema (solo uno a la vez)
  const handleThemeSelection = (index) => {
    if (selectedThemeIndex === index) return; // No hacer nada si ya está seleccionado
    setSelectedThemeIndex(index);
    
    // Asegurarnos de que todos los valores de color sean strings antes de actualizar el estado
    const selectedTheme = themes[index];
    const formattedTheme = {};
    
    Object.keys(selectedTheme).forEach(key => {
      if (colorLabels[key]) {
        // Si es un valor de color, asegurarse de que sea un string
        formattedTheme[key] = typeof selectedTheme[key] === 'string' 
          ? selectedTheme[key] 
          : (selectedTheme[key] === true ? '#000000' : '#' + selectedTheme[key].toString(16).padStart(6, '0'));
      } else {
        formattedTheme[key] = selectedTheme[key];
      }
    });
    
    setColors(formattedTheme);
    setHasChanges(true); // Activar hasChanges cuando se selecciona un nuevo template
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>Error al cargar estilos</div>
      ) : (
        <div className="h-full overflow-y-auto">
          <div
            className="w-full grid grid-cols-1 lg:grid-cols-[2fr_4fr_1fr] gap-4 p-2 sm:p-4"
            style={{ backgroundColor: style.BgInterface }}
          >
            {/* PRIMERA COLUMNA: Temas predefinidos */}
            <Card
              className="shadow-lg flex flex-col order-2 lg:order-1"
              style={{ background: style.BgCard }}
            >
              <CardHeader className="flex flex-col items-start text-left space-y-2 p-4">
                <h1 className="text-lg font-bold" style={{ color: style.H2 }}>
                  Temas anteriores
                </h1>
                <p className="text-sm" style={{ color: style.H3 }}>
                  Selecciona uno para aplicarlo
                </p>
              </CardHeader>

              <CardBody className="flex flex-col gap-4 p-4">
                {themes.map((previewColors, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 rounded-xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ 
                      backgroundColor: typeof previewColors.BgInterface === 'string' 
                        ? previewColors.BgInterface 
                        : '#111111' 
                    }}
                    onClick={() => handleThemeSelection(index)}
                  >
                    <div
                      className="p-2 rounded-lg w-full text-left"
                      style={{ 
                        backgroundColor: typeof previewColors.BgCard === 'string' 
                          ? previewColors.BgCard 
                          : '#222222' 
                      }}
                    >
                      <h2
                        className="text-base font-bold"
                        style={{ 
                          color: typeof previewColors.H1 === 'string' 
                            ? previewColors.H1 
                            : '#ffffff' 
                        }}
                      >
                        {colorLabels.H1}
                      </h2>
                      <p className="text-sm" style={{ 
                        color: typeof previewColors.H2 === 'string' 
                          ? previewColors.H2 
                          : '#cccccc' 
                      }}>
                        {colorLabels.H2}
                      </p>
                      <p className="text-xs" style={{ 
                        color: typeof previewColors.H3 === 'string' 
                          ? previewColors.H3 
                          : '#aaaaaa' 
                      }}>
                        {colorLabels.H3}
                      </p>
                      <Button
                        className="mt-2"
                        style={{
                          background: typeof previewColors.BgButton === 'string' 
                            ? previewColors.BgButton 
                            : '#c7c7c7',
                          color: typeof previewColors.P === 'string' 
                            ? previewColors.P 
                            : '#000000',
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

            {/* SEGUNDA COLUMNA: Vista Previa */}
            <Card
              className="shadow-lg flex flex-col order-1 lg:order-2"
              style={{ background: style.BgCard }}
            >
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
                <div>
                  <h1 className="text-xl font-bold" style={{ color: style.H2 }}>
                    Vista Previa
                  </h1>
                  <p className="text-sm" style={{ color: style.H3 }}>
                    Observa los resultados aquí
                  </p>
                </div>
              </CardHeader>

              <CardBody className="p-4 lg:p-10">
                <div className="overflow-x-auto">
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
              <CardFooter className="p-4">
                <Button
                  onPress={handleSaveChanges}
                  style={{ background: style.BgButton, color: style.P }}
                  className="w-full md:w-auto md:ml-auto"
                  isDisabled={!hasChanges || isSaving}
                >
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </CardFooter>
            </Card>

            {/* TERCERA COLUMNA: Ajuste manual de colores */}
            <Card
              className="shadow-lg flex flex-col order-3"
              style={{ background: style.BgCard }}
            >
              <CardHeader className="flex flex-col items-start text-left space-y-2 p-4">
                <h1 className="text-lg font-bold" style={{ color: style.H2 }}>
                  Ajuste Manual
                </h1>
                <p className="text-sm" style={{ color: style.H3 }}>
                  Modifica cada color
                </p>
              </CardHeader>

              <CardBody className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4">
                {Object.entries(colors).map(([key, value]) => {
                  // Solo mostrar los color pickers para propiedades que son colores
                  if (!colorLabels[key]) return null;
                  
                  // Asegurarse de que el valor sea un string válido para ColorPicker
                  const colorValue = typeof value === 'string' ? value : '#000000';
                  
                  return (
                    <div key={key} className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-black/5">
                      <h3
                        className="mb-2 text-sm font-medium capitalize"
                        style={{ color: style.H3 }}
                      >
                        {colorLabels[key]}
                      </h3>
                      <ColorPicker
                        value={colorValue}
                        onChange={(color) => handleColorChange(key, color)}
                        className="w-8 h-8 sm:w-6 sm:h-6"
                      />
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}