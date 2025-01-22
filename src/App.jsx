import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard/dasboard";

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
