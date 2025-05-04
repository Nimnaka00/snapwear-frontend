import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./components/Shop";
import TryOn from "./pages/ai/TryOn"; 
import Chatbot from "./pages/ai/Chatbot";
import ProductPage from "./pages/product/ProductPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/chatbot" element={<Chatbot/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
