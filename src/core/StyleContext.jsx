import React, { createContext, useState, useEffect } from "react";
import { createStyle, getActiveStyle } from "../services/style";

export const StyleContext = createContext();

export function StyleContextProvider({ children }) {
    const [style, setStyle] = useState(null); 

    const adjustColorBrightness = (hex, amount) => {
        let usePound = false;

        if (hex[0] === "#") {
            hex = hex.slice(1);
            usePound = true;
        }

        const num = parseInt(hex, 16);
        let r = (num >> 16) + amount;
        let b = ((num >> 8) & 0x00ff) + amount;
        let g = (num & 0x0000ff) + amount;

        r = Math.max(Math.min(255, r), 0);
        b = Math.max(Math.min(255, b), 0);
        g = Math.max(Math.min(255, g), 0);

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0");
    };

    const handleColorChange = async (color) => {
        const hexColor = color.toHexString();
        const newStyle = {
            baseColor: hexColor,
            lightBackgroundColor: adjustColorBrightness(hexColor, 60),
            mediumBackgroundColor: adjustColorBrightness(hexColor, 30),
            darkBackgroundColor: adjustColorBrightness(hexColor, -30),
            status: true,
        };

        console.log(newStyle);

        await createStyle(newStyle);

        setStyle(newStyle);
        localStorage.setItem("style", JSON.stringify(newStyle));
    };

    useEffect(() => {
        const loadActiveStyle = async () => {
            try {
                const activeStyle = await getActiveStyle();
                if (activeStyle) {
                    setStyle(activeStyle);
                    localStorage.setItem("style", JSON.stringify(activeStyle));
                } else {
                    const defaultStyle = {
                        baseColor: "#1677ff",
                        lightBackgroundColor: "#5A9FFF",
                        mediumBackgroundColor: "#3388FF",
                        darkBackgroundColor: "#0A5FCC",
                    };
                    setStyle(defaultStyle);
                    localStorage.setItem("style", JSON.stringify(defaultStyle));
                }
            } catch (error) {
                console.error("Error loading active style from backend:", error);
                const savedStyle = localStorage.getItem("style");
                setStyle(savedStyle ? JSON.parse(savedStyle) : {
                    baseColor: "#1677ff",
                    lightBackgroundColor: "#5A9FFF",
                    mediumBackgroundColor: "#3388FF",
                    darkBackgroundColor: "#0A5FCC",
                });
            }
        };

        loadActiveStyle();
    }, []);

    const syncStyleWithLocalStorage = () => {
        const savedStyle = localStorage.getItem("style");
        if (savedStyle) {
            setStyle(JSON.parse(savedStyle));
        }
    };

    useEffect(() => {
        // Escucha cambios 
        window.addEventListener("storage", syncStyleWithLocalStorage);

        return () => {
            window.removeEventListener("storage", syncStyleWithLocalStorage);
        };
    }, []);

    if (!style) {
        return <div>Loading styles...</div>;
    }

    return (
        <StyleContext.Provider value={{ style, handleColorChange }}>
            {children}
        </StyleContext.Provider>
    );
}
