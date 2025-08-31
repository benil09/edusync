import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../Components/ThemeToggle";
import { useUserStore } from "../store/useUserStore.js";

export default function Navbar() {
  const { user, loading, logout } = useUserStore();
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow-sm border-b/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              edu<span className="text-orange-500">Connect</span>
            </Link>
          </div>

          {/* Middle: Nav buttons */}
          <nav className="hidden md:flex flex-1 justify-center space-x-6 ">
            <Link
              to="/courses"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm transition-colors"
              aria-label="Courses"
            >
              Courses
            </Link>
            <Link
              to="/resources"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm transition-colors"
              aria-label="Resources"
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm transition-colors"
              aria-label="About"
            >
              About
            </Link>
            <Link
              to="/main"
              className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm transition-colors"
              aria-label="About"
            >
              Main
            </Link>

          </nav>

          {/* Right: Auth */}
          <div className="flex items-center space-x-3 ml-auto">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-orange-500 font-bold text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                aria-label="Logout"
                type="button"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 font-bold text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                aria-label="Login"
              >
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
