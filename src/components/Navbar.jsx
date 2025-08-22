// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { PiUserCircleBold } from "react-icons/pi";
import logo from "../assets/navbar/logo-white.png";
import { countItems, getCart } from "../utils/cart";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartQty, setCartQty] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Sync user + close UI + refresh cart count on navigation
  useEffect(() => {
    const stored = localStorage.getItem("snapwear-user");
    setUser(stored ? JSON.parse(stored) : null);
    setDropdownOpen(false);
    setMenuOpen(false);
    setCartQty(countItems());
  }, [location.pathname]);

  // Listen for cart changes (localStorage + custom event)
  useEffect(() => {
    const refresh = () => setCartQty(countItems());
    const custom = () => setCartQty(countItems());
    window.addEventListener("storage", refresh);
    window.addEventListener("snapwear-cart-updated", custom);
    // initial load
    setCartQty(countItems());
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("snapwear-cart-updated", custom);
    };
  }, []);

  // Close dropdown/menu on outside click & Esc & scroll
  useEffect(() => {
    const onClickOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuButtonRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    const onScroll = () => setDropdownOpen(false);

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dropdownOpen, menuOpen]);

  const handleProtectedRoute = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", {
        state: {
          message: `Please log in to access ${
            path === "/tryon" ? "Virtual Try-On" : "AI Stylist"
          }.`,
        },
      });
    }
  };

  const handleGoCategory = (cat) => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(
      cat === "All" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`
    );
  };

  const navLinkStyle = (path) =>
    `relative inline-block text-snow font-medium overflow-hidden ${
      location.pathname === path
        ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-full after:bg-mintGreen'
        : ""
    } before:content-[""] before:absolute before:left-0 before:bottom-[-6px] before:h-[2px] before:w-0 before:bg-mintGreen before:transition-all before:duration-500 hover:before:w-full before:rounded-full`;

  return (
    <nav className="w-full h-[90px] bg-bgColor px-6 md:px-20 py-4 z-50 relative">
      <div className="relative flex items-center h-full">
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="SnapWear Logo"
            className="w-[80px] md:w-[117px] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop middle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1 text-snow font-poppins font-medium text-[16px]"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Categories
              <FiChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full mt-2 w-[140px] bg-bgColor border border-mintGreen rounded-[8px] text-snow z-[60] shadow-lg"
                role="menu"
              >
                <button
                  className="w-full text-left px-4 py-2 hover:underline"
                  onClick={() => handleGoCategory("Men")}
                >
                  Men
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:underline"
                  onClick={() => handleGoCategory("Women")}
                >
                  Women
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:underline"
                  onClick={() => handleGoCategory("Kids")}
                >
                  Kids
                </button>
              </div>
            )}
          </div>

          <Link to="/shop" className={navLinkStyle("/shop")}>
            Shop
          </Link>
          <button
            onClick={() => handleProtectedRoute("/tryon")}
            className={navLinkStyle("/tryon")}
          >
            Virtual Try-On
          </button>
          <button
            onClick={() => handleProtectedRoute("/chatbot")}
            className={navLinkStyle("/chatbot")}
          >
            AI Stylist
          </button>
        </div>

        {/* Desktop right */}
        <div className="ml-auto hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          <Link to="/cart" className="relative flex items-center gap-1">
            <FiShoppingCart size={24} />
            <span>My Cart</span>
            {cartQty > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-[10px] min-w-[18px] h-[18px] px-1 rounded-full bg-mintGreen text-[#13151B] font-bold">
                {cartQty}
              </span>
            )}
          </Link>
          {user ? (
            <Link to="/user/dashboard" className="flex items-center gap-1">
              <PiUserCircleBold size={24} />
              <span>{user.lastName}</span>
            </Link>
          ) : (
            <Link to="/register" className="flex items-center gap-1">
              <PiUserCircleBold size={24} />
              <span>Sign up</span>
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <div className="md:hidden ml-auto z-[70]">
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((o) => !o)}
            className="text-snow"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-0 bg-bgColor pt-[90px] px-6 flex flex-col space-y-6 text-snow font-poppins font-medium text-[18px] z-[65]"
        >
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2"
              aria-expanded={dropdownOpen}
            >
              Categories
              <FiChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="mt-3 ml-4 border-l border-mintGreen pl-4 space-y-2">
                <button
                  className="block text-left hover:underline"
                  onClick={() => handleGoCategory("Men")}
                >
                  Men
                </button>
                <button
                  className="block text-left hover:underline"
                  onClick={() => handleGoCategory("Women")}
                >
                  Women
                </button>
                <button
                  className="block text-left hover:underline"
                  onClick={() => handleGoCategory("Kids")}
                >
                  Kids
                </button>
              </div>
            )}
          </div>

          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle("/shop")}
          >
            Shop
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <FiShoppingCart size={24} /> My Cart
            {cartQty > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-[10px] min-w-[18px] h-[18px] px-1 rounded-full bg-mintGreen text-[#13151B] font-bold">
                {cartQty}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              to="/user/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <PiUserCircleBold size={24} /> {user.lastName}
            </Link>
          ) : (
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <PiUserCircleBold size={24} /> Sign up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
