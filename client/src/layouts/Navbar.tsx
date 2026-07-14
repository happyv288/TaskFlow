import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            <Link to="/">TaskFlow</Link>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3"
                >
                  {user?.avatar ? (
                    <img
                      src={`http://localhost:5000${user.avatar}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl text-gray-700 dark:text-gray-200 overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {user?.name}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      🏠 Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      👤 Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      ⚙️ Settings
                    </Link>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4 transition-colors duration-300">
            <button
              onClick={toggleTheme}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {token ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700">
                    <img
                      src={
                        user?.avatar
                          ? `http://localhost:5000${user.avatar}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name || "User",
                            )}&background=2563eb&color=fff`
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-600"
                >
                  🏠 Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-600"
                >
                  👤 Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-600"
                >
                  ⚙️ Settings
                </Link>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
