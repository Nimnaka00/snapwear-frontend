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
import OTPVerification from "./pages/auth/OTPVerification";
import Product from "./components/Product";
import UserDashboardLayout from "./pages/user/UserDashboardLayout";
import PersonalData from "./components/user/PersonalData";
import PaymentMethods from "./components/user/PaymentMethods";
import Orders from "./components/user/Orders";
import Notifications from "./components/user/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/product1" element={<Product />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/user" element={<UserDashboardLayout />}>
          <Route path="dashboard" element={<PersonalData />} />
          <Route path="payment" element={<PaymentMethods />} />
          <Route path="orders" element={<Orders />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
