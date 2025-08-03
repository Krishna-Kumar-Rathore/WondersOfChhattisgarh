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
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={CGIcon} // "src/assets/Photos/CG_Icon.jpg"
              alt="Chhattisgarh Logo"
              className="w-14 h-14 object-cover rounded-full shadow-sm group-hover:scale-105 hover:shadow-amber-400 transition-transform duration-300"
            />
            <Link to="/" className="text-2xl font-bold text-primary-600">
              Wonder of Chhattisgarh
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
            >
              Be Inspired
            </Link>
            <Link
              to="/places"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
            >
              Places To Go
            </Link>
            <Link
              to="/things-to-do"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
            >
              Things To Do
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
                >
                  Wishlist
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              <svg
                className="h-6 w-6"
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
        <div className="md:hidden bg-white border-t">
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
                    className="block px-3 py-2 text-primary-600 font-medium"
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
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600"
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
                  className="block px-3 py-2 text-primary-600 font-medium"
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
