import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import { FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import logo from '../assets/navbar/logo-white.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="h-[96px] w-full bg-[#13151B] flex items-center justify-between px-20 relative">
      {/* Logo */}
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="SnapWear Logo"
            className="w-[117px] h-[81.47px] object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-6 text-[#FBFBFB] font-poppins font-medium text-[16px] relative">
        
        {/* Categories with dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            Categories <FiChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-10 left-0 w-[115px] h-[104px] bg-[#13151B] border border-[#D6FFF6] rounded-[8px] flex flex-col items-center justify-center space-y-2 text-[#FBFBFB] z-50">
              <p className="cursor-pointer hover:underline">Men</p>
              <p className="cursor-pointer hover:underline">Women</p>
              <p className="cursor-pointer hover:underline">Kids</p>
            </div>
          )}
        </div>

        {/* Other Navlinks */}
        <a href="/shop" className="hover:underline">Shop</a>
        <a href="/tryon" className="hover:underline">Virtual Try-On</a>
        <a href="/chatbot" className="hover:underline">AI Stylist</a>
      </div>

      {/* Cart and Account */}
      <div className="flex items-center space-x-6 text-[#FBFBFB] font-poppins font-medium text-[16px]">
        <div className="flex items-center gap-1 cursor-pointer">
          <FiShoppingCart size={18} />
          <span>My Cart</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaUserCircle size={18} />
          <span>My Account</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
