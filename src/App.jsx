import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import UserDashboardLayout from "./pages/user/UserDashboardLayout";
import PersonalData from "./components/user/PersonalData";
import PaymentMethods from "./components/user/PaymentMethods";
import Orders from "./components/user/Orders";
import Notifications from "./components/user/Notifications";
import CartPage from "./pages/cart-and-checkout/CartPage";
import CheckoutPage from "./pages/cart-and-checkout/CheckoutPage";
import OrderFailedModal from "./pages/cart-and-checkout/OrderFaildModal";
import OrderSuccessModal from "./pages/cart-and-checkout/OrderSuccessModal";
import PaymentPage from "./pages/cart-and-checkout/PaymentPage";

// Wrapper to control Navbar visibility
function LayoutWrapper({ children }) {
  const location = useLocation();

  // List of auth routes (where Navbar should be hidden)
  const authRoutes = [
    "/login",
    "/register",
    "/resetpassword",
    "/verify-otp",
    "/set-new-password",
  ];

  const isAuthPage = authRoutes.includes(location.pathname);
  const isUserDashboard = location.pathname.startsWith("/user");

  const hideNavbar = isAuthPage || isUserDashboard;

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />

          {/* Catalog / product */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* AI features */}
          <Route path="/tryon" element={<TryOn />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* User dashboard (protected by layout) */}
          <Route path="/user" element={<UserDashboardLayout />}>
            <Route path="dashboard" element={<PersonalData />} />
            <Route path="payment" element={<PaymentMethods />} />
            <Route path="orders" element={<Orders />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Cart / checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ordersuccessmodel" element={<OrderSuccessModal />} />
          <Route path="/orderfailedmodel" element={<OrderFailedModal />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
