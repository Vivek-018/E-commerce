import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; // Adjust the import path as needed
import SearchBtn from "../SearchBtn";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              E-Commerce
            </Link>
          </div>

          <SearchBtn/>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:text-gray-300">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
