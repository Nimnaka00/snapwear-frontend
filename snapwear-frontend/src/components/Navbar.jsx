// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { PiUserCircleBold } from "react-icons/pi";
import logo from '../assets/navbar/logo-white.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('snapwear-user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [location.pathname]);

  const handleProtectedRoute = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login', {
        state: {
          message: `Please log in to access ${
            path === '/tryon' ? 'Virtual Try-On' : 'AI Stylist'
          }.`
        }
      });
    }
  };

  const navLinkStyle = (path) =>
    `relative inline-block text-snow font-medium overflow-hidden ${
      location.pathname === path
        ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-full after:bg-mintGreen'
        : ''
    } before:content-[""] before:absolute before:left-0 before:bottom-[-6px] before:h-[2px] before:w-0 before:bg-mintGreen before:transition-all before:duration-500 hover:before:w-full before:rounded-full`;

  return (
    <nav className="w-full h-[90px] bg-bgColor px-6 md:px-20 py-4 z-50">
      <div className="relative flex items-center h-full">
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="SnapWear Logo"
            className="w-[80px] md:w-[117px] h-auto object-contain cursor-pointer transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop: Center Nav Links */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="flex items-center gap-1 text-snow font-poppins font-medium text-[16px]"
            >
              Categories
              <FiChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-[115px] bg-bgColor border border-mintGreen rounded-[8px] flex flex-col items-center space-y-2 text-snow z-50">
                <p className="cursor-pointer hover:underline">Men</p>
                <p className="cursor-pointer hover:underline">Women</p>
                <p className="cursor-pointer hover:underline">Kids</p>
              </div>
            )}
          </div>
          <Link to="/shop" className={navLinkStyle('/shop')}>Shop</Link>
          <button onClick={() => handleProtectedRoute('/tryon')} className={navLinkStyle('/tryon')}>
            Virtual Try-On
          </button>
          <button onClick={() => handleProtectedRoute('/chatbot')} className={navLinkStyle('/chatbot')}>
            AI Stylist
          </button>
        </div>

        {/* Desktop: Cart & User */}
        <div className="ml-auto hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          <Link to="/cart" className="flex items-center gap-1">
            <FiShoppingCart size={24} />
            <span>My Cart</span>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto z-50">
          <button onClick={() => setMenuOpen(o => !o)} className="text-snow">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="absolute inset-0 top-0 bg-bgColor pt-[90px] px-6 flex flex-col space-y-6 text-snow font-poppins font-medium text-[18px] z-40">
          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="flex items-center gap-2"
            >
              Categories
              <FiChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="mt-3 ml-4 border-l border-mintGreen pl-4 space-y-2">
                <p className="cursor-pointer hover:underline">Men</p>
                <p className="cursor-pointer hover:underline">Women</p>
                <p className="cursor-pointer hover:underline">Kids</p>
              </div>
            )}
          </div>

          <Link to="/shop" onClick={() => setMenuOpen(false)} className={navLinkStyle('/shop')}>
            Shop
          </Link>
          <button onClick={() => { handleProtectedRoute('/tryon'); setMenuOpen(false); }} className={navLinkStyle('/tryon')}>
            Virtual Try-On
          </button>
          <button onClick={() => { handleProtectedRoute('/chatbot'); setMenuOpen(false); }} className={navLinkStyle('/chatbot')}>
            AI Stylist
          </button>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <FiShoppingCart size={24} /> My Cart
          </Link>
          {user ? (
            <Link to="/user/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <PiUserCircleBold size={24} /> {user.lastName}
            </Link>
          ) : (
            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <PiUserCircleBold size={24} /> Sign up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
