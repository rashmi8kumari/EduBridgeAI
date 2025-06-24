import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Upload</Link>
      {user && <Link to="/history" style={{ margin: '0 10px' }}>History</Link>}
      {!user && <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && (
        <>
          <span style={{ marginLeft: '10px' }}>👋 Welcome, {user.name}</span>
          <button style={{ marginLeft: '10px' }} onClick={handleLogoutClick}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;

