import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard/dasboard";
import { Style } from "./pages/style/style";

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/style" element={<Style />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
