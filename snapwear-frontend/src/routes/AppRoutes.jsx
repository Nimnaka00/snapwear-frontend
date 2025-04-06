// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

       {/* Auth */}
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default AppRoutes;
