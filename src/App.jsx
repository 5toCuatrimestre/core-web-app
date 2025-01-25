import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Style } from "./pages/style/style";
import { Users } from "./pages/user/users";
import { StatisticsSells } from "./pages/statistics/statistics-sells";
import { StatisticsWaiter } from "./pages/statistics/statistics-waiter";
import BaseLayout from "./pages/layouts/BaseLayout";

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
            {/*Por ahora */}
            <Route path="/users/waiters" element={<Users />} />
            <Route path="/users/leaders" element={<Users />} />
            <Route path="/statistics" element={<StatisticsSells />} />
            <Route path="/statistics/sells" element={<StatisticsSells />} />
            <Route path="/statistics/waiter" element={<StatisticsWaiter />} />
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
