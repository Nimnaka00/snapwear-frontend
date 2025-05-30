import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./components/Shop";
import TryOn from "./pages/ai/TryOn"; 
import Chatbot from "./pages/ai/Chatbot";
import Register from "./pages/auth/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/chatbot" element={<Chatbot/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
