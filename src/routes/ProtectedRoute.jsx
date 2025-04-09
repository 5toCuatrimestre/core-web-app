// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/storage";
import {jwtDecode} from "jwt-decode"; // opcional, para validar la expiración

export const ProtectedRoute = () => {
  const token = getToken();

  // Verifica que exista el token y no sea la cadena "undefined"
  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  // Opcional: decodifica el token y verifica su fecha de expiración
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      // Token caducado
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // Si falla la decodificación, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si todo es correcto, se renderiza el contenido protegido
  return <Outlet />;
};
