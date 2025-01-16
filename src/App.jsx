import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./login";
import { Dashboard } from "./dasboard";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
