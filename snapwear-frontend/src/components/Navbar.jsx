import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { PiUserCircleBold } from "react-icons/pi";
import logo from '../assets/navbar/logo-white.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-bgColor px-6 md:px-20 py-4 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="SnapWear Logo"
            className="w-[117px] h-[81.47px] object-contain cursor-pointer"
          />
        </Link>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-snow">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          {/* Categories with dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 focus:outline-none"
            >
              Categories <FiChevronDown size={24} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-10 left-0 w-[115px] bg-bgColor border border-mintGreen rounded-[8px] flex flex-col items-center justify-center space-y-2 text-snow z-50">
                <p className="cursor-pointer hover:underline">Men</p>
                <p className="cursor-pointer hover:underline">Women</p>
                <p className="cursor-pointer hover:underline">Kids</p>
              </div>
            )}
          </div>

          <Link to="/shop" className="hover:underline" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/tryon" className="hover:underline" onClick={() => setMenuOpen(false)}>Virtual Try-On</Link>
          <Link to="/chatbot" className="hover:underline" onClick={() => setMenuOpen(false)}>AI Stylist</Link>
        </div>

        {/* Desktop Cart and Sign Up */}
        <div className="hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          <Link to="/cart" className="flex items-center gap-1 cursor-pointer">
            <FiShoppingCart size={24} />
            <span>My Cart</span>
          </Link>
          <Link to="/register" className="flex items-center gap-1 cursor-pointer">
            <PiUserCircleBold size={24} />
            <span>Sign up</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-snow font-poppins font-medium text-[16px]">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            Categories <FiChevronDown size={24} />
          </button>
          {dropdownOpen && (
            <div className="ml-4 border-l border-mintGreen pl-4 space-y-2">
              <p className="cursor-pointer hover:underline">Men</p>
              <p className="cursor-pointer hover:underline">Women</p>
              <p className="cursor-pointer hover:underline">Kids</p>
            </div>
          )}
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/tryon" className="hover:underline">Virtual Try-On</Link>
          <Link to="/chatbot" className="hover:underline">AI Stylist</Link>
          <Link to="/cart" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <FiShoppingCart size={24} /> My Cart
          </Link>
          <Link to="/register" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <PiUserCircleBold size={24} /> Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
