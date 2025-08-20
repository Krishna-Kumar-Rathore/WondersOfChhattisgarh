import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CGIcon from '../components/CG_Icon.jpg'

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (userId && userName) {
      setUser({ id: userId, name: userName, isAdmin });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={CGIcon} 
              className="object-cover transition-transform duration-300 rounded-full shadow-sm w-14 h-14 group-hover:scale-105 hover:shadow-amber-400"
            />
            <Link to="/" className="text-2xl font-bold text-primary-600">
              Wonder of Chhattisgarh
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/"
              className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
            >
              Be Inspired
            </Link>
            <Link
              to="/places"
              className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
            >
              Places To Go
            </Link>
            <Link
              to="/things-to-do"
              className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
            >
              Things To Do
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/wishlist"
                  className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
                >
                  Wishlist
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 transition-colors hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="bg-white border-t md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Be Inspired
            </Link>
            <Link
              to="/places"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Places To Go
            </Link>
            <Link
              to="/things-to-do"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Things To Do
            </Link>

            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 font-medium text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="px-3 py-2 text-gray-700">Hi, {user.name}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 font-medium text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
