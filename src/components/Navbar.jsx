import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png';

const Navbar = ({ onLoginClick, isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="TripReview Logo" className="h-14 mb-1" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/blogs" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                Blogs
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/blogs" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                Blogs
              </Link>
            )}
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              Contact
            </Link>
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/blogs" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                Blogs
              </Link>
            )}
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              Contact
            </Link>
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 