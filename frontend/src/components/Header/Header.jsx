// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../store/authSlice"; // Adjust this import path as needed
// import { toast } from "react-toastify";
// import SearchBtn from "../SearchBtn";
// import { ShoppingCart, Menu } from 'lucide-react';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const cartItemsCount = useSelector((state) => state.cart.totalQuantity);
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout()).unwrap();
//       toast.success("Logged out successfully");
//       navigate("/");
//     } catch (error) {
//       toast.error(error.message || "Logout failed. Please try again.");
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between py-4">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold">
//               E-Commerce
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <SearchBtn />
//           </div>
//           <nav className="hidden md:block">
//             <ul className="flex space-x-4 items-center">
//               <NavItems isAuthenticated={isAuthenticated} handleLogout={handleLogout} cartItemsCount={cartItemsCount} />
//             </ul>
//           </nav>
//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className="md:hidden bg-gray-700 px-4 py-2">
//           <SearchBtn />
//           <ul className="mt-2 space-y-2">
//             <NavItems isAuthenticated={isAuthenticated} handleLogout={handleLogout} cartItemsCount={cartItemsCount} />
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// const NavItems = ({ isAuthenticated, handleLogout, cartItemsCount }) => (
//   <>
//     <li>
//       <Link to="/" className="hover:text-gray-300 block py-1">
//         Home
//       </Link>
//     </li>
//     <li>
//       <Link to="/about" className="hover:text-gray-300 block py-1">
//         About
//       </Link>
//     </li>
//     <li>
//       <Link to="/contact" className="hover:text-gray-300 block py-1">
//         Contact
//       </Link>
//     </li>
//     {isAuthenticated ? (
//       <>
//         <li>
//           <Link to="/dashboard" className="hover:text-gray-300 block py-1">
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full text-left"
//           >
//             Logout
//           </button>
//         </li>
//         <li>
//           <Link to="/cart" className="relative hover:text-gray-300 flex items-center py-1">
//             <ShoppingCart size={24} />
//             {cartItemsCount > 0 && (
//               <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItemsCount}
//               </span>
//             )}
//             <span className="ml-2">Cart</span>
//           </Link>
//         </li>
//       </>
//     ) : (
//       <>
//         <li>
//           <Link
//             to="/login"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded block text-center"
//           >
//             Login
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signup"
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded block text-center"
//           >
//             Sign Up
//           </Link>
//         </li>
//       </>
//     )}
//   </>
// );

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { toast } from "react-toastify";
import SearchBtn from "../SearchBtn";
import { ShoppingCart, Menu } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);
  console.log(cartItemsCount);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Logout failed. Please try again.");
    }
  };

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              E-Commerce
            </Link>
          </div>
          <div className="hidden md:block">
            <SearchBtn />
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 items-center">
              <NavItems
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
                cartItemsCount={cartItemsCount}
              />
            </ul>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-2">
          <SearchBtn />
          <ul className="mt-2 space-y-2">
            <NavItems
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
              cartItemsCount={cartItemsCount}
            />
          </ul>
        </div>
      )}
    </header>
  );
};

const NavItems = ({ isAuthenticated, handleLogout, cartItemsCount }) => (
  <>
    <li>
      <Link to="/" className="hover:text-gray-300 block py-1">
        Home
      </Link>
    </li>
    <li>
      <Link to="/about" className="hover:text-gray-300 block py-1">
        About
      </Link>
    </li>
    <li>
      <Link to="/contact" className="hover:text-gray-300 block py-1">
        Contact
      </Link>
    </li>
    {isAuthenticated ? (
      <>
        <li>
          <Link to="/dashboard" className="hover:text-gray-300 block py-1">
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full text-left"
          >
            Logout
          </button>
        </li>
        <li>
          <Link
            to="/cart"
            className="relative hover:text-gray-300 flex items-center py-1"
          >
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            <span className="ml-2">Cart</span>
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded block text-center"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded block text-center"
          >
            Sign Up
          </Link>
        </li>
      </>
    )}
  </>
);

export default Header;
