import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Chatbot from "../pages/ai/Chatbot"; // <-- import your Chatbot page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />

      {/* AI Chatbot */}
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
};

export default AppRoutes;
