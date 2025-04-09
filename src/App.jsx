// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from 'react';
import { BaseLayout } from "./pages/layouts/BaseLayout";
import { Login } from "./pages/auth/login";
import { Style } from "./pages/style/style";
import { Waiter } from "./pages/waiter/waiter";
import { Ticket } from "./pages/waiter/ticket";
import { Users } from "./pages/user/users";
import { Statistics } from "./pages/statistics/statistics";
import { Products } from "./pages/products/products";
import { Dish } from "./pages/dish/dish";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoadingSpinner } from "./components/loadingSpinner";
import { getToken } from "./services/storage";

// Componente para manejar la redirección del login
const LoginRoute = () => {
  const location = useLocation();
  const token = getToken();

  if (token && token !== "undefined") {
    // Si hay un token válido, redirige a la página anterior o a /user por defecto
    const from = location.state?.from?.pathname || "/user";
    return <Navigate to={from} replace />;
  }

  return <Login />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta pública con verificación de token */}
        <Route path="/login" element={<LoginRoute />} />

        <Route path="/waiter/:sellId" element={<Waiter />} />
        <Route path="/ticket/:sellId" element={<Ticket />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/style" element={<Style />} />
            <Route path="/sp" element={<LoadingSpinner />} />
            <Route path="/user" element={<Users />} />
            <Route path="/statistic" element={<Statistics />} />
            <Route path="/product" element={<Products />} />
            <Route path="/dish" element={<Dish />} />
          </Route>
        </Route>

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
