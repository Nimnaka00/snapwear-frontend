import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./components/Shop";
import TryOn from "./pages/ai/TryOn"; 
import Chatbot from "./pages/ai/Chatbot";
import ProductPage from "./pages/product/ProductPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/setnewpassword" element={<SetNewPassword/>}/>
        <Route path="/shop" element={<Shop />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/chatbot" element={<Chatbot/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
