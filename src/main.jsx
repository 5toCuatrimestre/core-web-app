// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { StyleContextProvider } from "./core/StyleContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <StyleContextProvider>
          <App />
        </StyleContextProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  </StrictMode>
);
