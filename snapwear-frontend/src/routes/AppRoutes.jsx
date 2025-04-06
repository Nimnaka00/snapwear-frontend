// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/shop/ProductDetails";
import Cart from "../pages/shop/Cart";
import Checkout from "../pages/checkout/Checkout";
import Profile from "../pages/profile/Profile";
import Chatbot from "../pages/ai/Chatbot";
import VirtualTryOn from "../pages/ai/VirtualTryOn";
import AdminPanel from "../pages/admin/AdminPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Shop */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* User + AI */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/tryon" element={<VirtualTryOn />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default AppRoutes;
