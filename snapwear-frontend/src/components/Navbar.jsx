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
    const storedUser = JSON.parse(localStorage.getItem('snapwear-user'));
    setUser(storedUser);
  }, [location.pathname]);

  const handleProtectedRoute = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login', {
        state: { message: `Please log in to access ${path === '/tryon' ? 'Virtual Try-On' : 'AI Stylist'}.` }
      });
    }
  };

  const navLinkStyle = (path) => `relative inline-block text-snow font-medium overflow-hidden
    ${location.pathname === path ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-full after:bg-mintGreen' : ''} 
    before:content-[''] before:absolute before:left-0 before:bottom-[-6px] before:h-[2px] before:w-0 
    before:bg-mintGreen before:transition-all before:duration-500 hover:before:w-full before:rounded-full`;

  return (
    <nav className="w-full h-[100px] bg-bgColor px-6 md:px-20 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="SnapWear Logo"
            className="w-[117px] h-[81.47px] object-contain cursor-pointer transition-transform hover:scale-105"
          />
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-snow">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 focus:outline-none transition-transform"
            >
              Categories
              <FiChevronDown
                size={24}
                className={`transition-transform duration-300 ease-in-out transform ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`}
              />
            </button>
            <div
              className={`absolute top-10 left-0 w-[115px] bg-bgColor border border-mintGreen rounded-[8px] flex flex-col items-center justify-center space-y-2 text-snow z-50 transform transition-all duration-300 ease-in-out origin-top ${
                dropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-90 invisible -translate-y-2'
              }`}
            >
              <p className="cursor-pointer hover:underline">Men</p>
              <p className="cursor-pointer hover:underline">Women</p>
              <p className="cursor-pointer hover:underline">Kids</p>
            </div>
          </div>

          <Link to="/shop" className={navLinkStyle('/shop')}>Shop</Link>
          <button onClick={() => handleProtectedRoute('/tryon')} className={navLinkStyle('/tryon')}>Virtual Try-On</button>
          <button onClick={() => handleProtectedRoute('/chatbot')} className={navLinkStyle('/chatbot')}>AI Stylist</button>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-snow font-poppins font-medium text-[16px]">
          <Link to="/cart" className="flex items-center gap-1 cursor-pointer">
            <FiShoppingCart size={24} />
            <span>My Cart</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-1 cursor-pointer">
              <PiUserCircleBold size={24} />
              <span>{user.lastName}</span>
            </div>
          ) : (
            <Link to="/register" className="flex items-center gap-1 cursor-pointer">
              <PiUserCircleBold size={24} />
              <span>Sign up</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-snow font-poppins font-medium text-[16px]">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 focus:outline-none"
          >
            Categories <FiChevronDown size={24} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-0' : '-rotate-90'}`} />
          </button>
          {dropdownOpen && (
            <div className="ml-4 border-l border-mintGreen pl-4 space-y-2">
              <p className="cursor-pointer hover:underline">Men</p>
              <p className="cursor-pointer hover:underline">Women</p>
              <p className="cursor-pointer hover:underline">Kids</p>
            </div>
          )}
          <Link to="/shop" onClick={() => setMenuOpen(false)} className={navLinkStyle('/shop')}>Shop</Link>
          <button onClick={() => { handleProtectedRoute('/tryon'); setMenuOpen(false); }} className={navLinkStyle('/tryon')}>Virtual Try-On</button>
          <button onClick={() => { handleProtectedRoute('/chatbot'); setMenuOpen(false); }} className={navLinkStyle('/chatbot')}>AI Stylist</button>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <FiShoppingCart size={24} /> My Cart
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <PiUserCircleBold size={24} /> {user.lastName}
            </div>
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
