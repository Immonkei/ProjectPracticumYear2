import React, { useState, useEffect } from 'react';
import { Gift, User, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLoginToggle = () => setIsLoggedIn(!isLoggedIn);

  const navLinks = [
    { name: 'Home', key: 'home' },
    { name: 'About Us', key: 'about' },
    { name: 'Jobs', key: 'jobs' },
    { name: 'Services', key: 'services' },
  ];

  const linkClass =
    'relative text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium px-3 py-2 rounded-md hover:bg-blue-50';
  const activeClass =
    'relative text-blue-600 font-semibold px-3 py-2 rounded-md bg-blue-50 after:absolute after:-bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-blue-600 after:rounded-full';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 h-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 h-full">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="p-1 bg-blue-100 rounded-lg">
              <Gift className="text-blue-600 w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-gray-800">Thrive</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                to={`/${link.key === 'home' ? '' : link.key}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 text-sm font-medium h-10 flex items-center hover:shadow-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium h-10 flex items-center hover:shadow-md transform hover:scale-105"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 h-10 hover:shadow-sm"
              >
                <div className="p-1 bg-blue-100 rounded-full">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span>My Account</span>
              </NavLink>
            )}

            <button
              onClick={handleLoginToggle}
              className="ml-2 px-3 py-1 text-xs border border-gray-300 rounded-md h-8 flex items-center hover:bg-gray-50 transition-all duration-200 text-gray-600"
              title="Demo: Toggle login state"
            >
              {isLoggedIn ? 'Logout Demo' : 'Login Demo'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                to={`/${link.key === 'home' ? '' : link.key}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full block px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full block px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-center"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">My Account</span>
              </NavLink>
            )}

            <button
              onClick={() => {
                handleLoginToggle();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-600"
            >
              {isLoggedIn ? 'Demo: Logout' : 'Demo: Login'}
            </button>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
};

export default NavBar;
