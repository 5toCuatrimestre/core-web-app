// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BaseLayout } from "./pages/layouts/BaseLayout";
import { Login } from "./pages/auth/login";
import { Style } from "./pages/style/style";
import { Users } from "./pages/user/users";
import { Statistics } from "./pages/statistics/statistics";
import { Products } from "./pages/products/products";
import { Dish } from "./pages/dish/dish";
import QuizApp from "./pages/QuizApp";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            <Route path="/style" element={<Style />} />
            <Route path="/user" element={<Users />} />
            <Route path="/statistic" element={<Statistics />} />
            <Route path="/product" element={<Products />} />
            <Route path="/dish" element={<Dish />} />
            <Route path="/qp" element={<QuizApp />} />
          </Route>
        </Route>

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
