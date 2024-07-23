import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import  store  from "./store/store.js";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Signup from "./pages/Signup.jsx";
import Product from "./pages/Product.jsx";
import Productdetail from "./pages/Productdetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {
  Orders,
  OrdersList,
  Overview,
  Profile,
  Settings,
  UsersList,
} from "./components/index.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { fetchUser } from "./store/authSlice.js";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "productdetail",
        element: <Productdetail />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "users",
            element: <UsersList />,
          },
          {
            path: "orders",
            element: <OrdersList />,
          },
        ],
      },
    ],
  },
]);

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
