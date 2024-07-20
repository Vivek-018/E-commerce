import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Singup from "./pages/Singup.jsx";
import Cart from "./components/Cart.jsx";
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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "Signup",
        element: <Singup />,
      },
      {
        path: "Product",
        element: <Product />,
      },
      {
        path: "productdetail",
        element: <Productdetail />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
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
        element: <AdminDashboard />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
