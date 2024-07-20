import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Dashboard = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <nav className="mt-4">
            <ul>
              <li>
                <Link
                  to="/dashboard/overview"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <Outlet />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Dashboard;

// import React from "react";
// import { Outlet } from "react-router-dom";

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Outlet />
//     </div>
//   );
// }
// export default Dashboard;
