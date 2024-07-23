import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutBtn;