import React, { createContext, useState, useEffect } from "react";
import { LoadingSpinner } from "../components/loadingSpinner";
import { useAllStyles } from "../hooks/useStyles";
import { updateStyle } from "../api/styleApi"; // Asumiendo que tienes estos hooks

export const StyleContext = createContext();

export function StyleContextProvider({ children }) {
  const [style, setStyle] = useState(null);
  const { data: styles, isLoading, isError } = useAllStyles(); // Consulta los estilos desde la base de datos

  const handleColorChange = (newColors, selectedStyleId) => {
    const newStyle = {
      H1: newColors.H1,
      H2: newColors.H2,
      H3: newColors.H3,
      P: newColors.P,
      BgCard: newColors.BgCard,
      BgInterface: newColors.BgInterface,
      BgButton: newColors.BgButton,
      status: true,
    };
  
    setStyle(newStyle);
    localStorage.setItem("style", JSON.stringify(newStyle));
  
    // Llamada a la función updateStyle para actualizar en la base de datos
    updateStyle(selectedStyleId, newStyle)
      .then((updatedStyle) => {
        console.log("Estilo actualizado:", updatedStyle);
      })
      .catch((error) => {
        console.error("Error al actualizar el estilo:", error);
      });
  };

  useEffect(() => {
    if (styles) {
      // Verificar si 'styles' es un objeto y si tiene la propiedad 'result' (en caso de que la API la use)
      const allStyles = Array.isArray(styles) ? styles : styles.result || [];

      // Filtrar los estilos activos
      const activeStyles = allStyles.filter(style => style.status === true);

      if (activeStyles.length > 0) {
        // Tomamos el primer estilo activo
        setStyle(activeStyles[0]);
      } else {
        // Si no hay un estilo activo, verificar el almacenamiento local
        const savedStyle = localStorage.getItem("style");
        if (savedStyle) {
          setStyle(JSON.parse(savedStyle));
        } else {
          // Establecer un estilo por defecto
          const defaultStyle = {
            H1: "#ffffff",
            H2: "#ffffff",
            H3: "#ffffff",
            P: "#000000",
            BgCard: "#05004a",
            BgInterface: "#1f24ab",
            BgButton: "#ffffff",
          };
          setStyle(defaultStyle);
          localStorage.setItem("style", JSON.stringify(defaultStyle));
        }
      }
    }
  }, [styles]); // Dependencia para que se ejecute cuando 'styles' cambie

  useEffect(() => {
    // Sincronización con localStorage para cuando se actualicen los estilos
    const syncStyleWithLocalStorage = () => {
      const savedStyle = localStorage.getItem("style");
      if (savedStyle) {
        setStyle(JSON.parse(savedStyle));
      }
    };

    window.addEventListener("storage", syncStyleWithLocalStorage);

    return () => {
      window.removeEventListener("storage", syncStyleWithLocalStorage);
    };
  }, []);

  // Mostrar un spinner si estamos cargando los estilos o si hay un error
  if (isLoading || !style) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading styles</div>;
  }

  return (
    <StyleContext.Provider value={{ style, handleColorChange }}>
      {children}
    </StyleContext.Provider>
  );
}
