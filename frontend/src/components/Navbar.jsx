import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  // console.log(isLogin);
  const userId = localStorage.getItem("userId");
  // console.log('User ID:', userId);

  useEffect(() => {
    if (userId) {
      const fetchUsername = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/v1/user/user/${userId}`
          );
          setUsername(data.user?.username);
          // console.log(data.user?.username);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchUsername();
    }
  }, [isLogin, userId]);

  const handleLogOut = async () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 ${menuOpen ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-expanded={menuOpen}
                aria-hidden="true"
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
          <div className="flex-1 flex items-center justify-around sm:items-stretch sm:justify-start">
            <a
              href="/"
              className="ml-3 flex-shrink-0 text-white text-xl font-semibold"
            >
              BlogApp
            </a>
            {isLogin && (
              <span className="text-xl capitalize text-white font-semibold sm:hidden">
                Welcome, {username}
              </span>
            )}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLogin && (
                  <>
                    <a
                      href="/"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </a>
                    <a
                      href="/createblog"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Create Blog
                    </a>
                    <a
                      href="/myblogs"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Blog
                    </a>
                  </>
                )}
                {isLogin ? (
                  <>
                    <a
                      onClick={handleLogOut}
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >
                      Log out
                    </a>
                    <span className="text-white px-3 py-2 rounded-md text-sm font-medium">
                      Welcome, {username}
                    </span>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLogin && (
              <>
                <a
                  href="/"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>
                <a
                  href="/createblog"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Create Blog
                </a>
                <a
                  href="/myblogs"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Blog
                </a>
              </>
            )}
            {isLogin ? (
              <a
                onClick={handleLogOut}
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log Out
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
