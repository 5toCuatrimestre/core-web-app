import React, { createContext, useState, useEffect } from "react";
import { LoadingSpinner } from "../components/loadingSpinner";

export const StyleContext = createContext();

export function StyleContextProvider({ children }) {
  const [style, setStyle] = useState(null);

  const handleColorChange = (newColors) => {
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
  };

  useEffect(() => {
    const savedStyle = localStorage.getItem("style");
    if (savedStyle) {
      setStyle(JSON.parse(savedStyle));
    } else {
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
  }, []);

  useEffect(() => {
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

  if (!style) {
    return <LoadingSpinner />;
  }

  return (
    <StyleContext.Provider value={{ style, handleColorChange }}>
      {children}
    </StyleContext.Provider>
  );
}
