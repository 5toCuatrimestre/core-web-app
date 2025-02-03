import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {BaseLayout} from "./pages/layouts/BaseLayout";
import { Login } from "./pages/auth/login";
import { Style } from "./pages/style/style";
import { Users } from "./pages/user/users";
import { Statistics } from "./pages/statistics/statistics";
import { Products } from "./pages/products/products";


function App() {
  const isLoggedIn = true;

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route index path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        {isLoggedIn && (
          <Route element={<BaseLayout />}>
            <Route path="/styles" element={<Style />} />
            <Route path="/users" element={<Users />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/products" element={<Products/>} />
          </Route>
        )}

        {/* Rutas de error */}
        {/* <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
