import Link from 'next/link';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import '../../bigskyeats-blog/globals.css';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean; // Prop to determine current theme
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`px-6 md:px-28 py-5 bg-gray-100 text-gray-700`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <span className="font-bold text-xl">My Logo</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-gray-100 shadow-md md:static md:w-auto md:flex md:items-center md:space-x-6 md:shadow-none`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {/* Theme Toggle Button */}
            <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
              <button
                onClick={toggleTheme}
                className="px-5 py-3 focus:outline-none"
              >
                {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
