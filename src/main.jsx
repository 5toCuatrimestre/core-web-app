import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { StyleContextProvider } from "./core/StyleContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <StyleContextProvider>
        <App />
      </StyleContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
