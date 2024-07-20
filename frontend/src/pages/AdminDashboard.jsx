import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="mb-4">
        <ul className="space-x-4">
          <li>
            <Link to="users" className="text-blue-500">Users</Link>
          </li>
          <li>
            <Link to="orders" className="text-blue-500">Orders</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
