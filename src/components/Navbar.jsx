import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Car, LogOut, LogIn, UserPlus, Plus } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
          >
            <Car className="h-6 w-6" />
            <span className="font-bold text-xl">AutoHub</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === "/" ? "bg-blue-800" : ""}`}
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cars"
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === "/cars" ? "bg-blue-800" : ""}`}
              >
                Browse Cars
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user && location.pathname !== "/create" && (
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 
                  hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Car
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 
                  hover:bg-red-700 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                {location.pathname !== "/login" && (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 
                      hover:bg-blue-700 rounded-md transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Link>
                )}
                {location.pathname !== "/register" && (
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 
                      hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Register
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button - Add mobile menu functionality if needed */}
      <div className="md:hidden flex items-center px-4 py-2">
        <button className="text-gray-300 hover:text-white">
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
