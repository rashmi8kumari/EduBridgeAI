import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: '#212529' }}>
      <Link className="navbar-brand fw-bold text-white" to="/">
        📘 EduBridge
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mx-auto">

          {/* ✅ Dashboard link for all logged-in users */}
          {user && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
          )}

          {user?.role === 'teacher' && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/upload-note">
                Upload Notes
              </Link>
            </li>
          )}

          {user?.role === 'student' && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/view-notes">
                View Notes
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/history">
                Evaluation History
              </Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item d-flex align-items-center me-3 text-light">
                👋 {user.name}
              </li>
              <li className="nav-item">
                <button
                  onClick={onLogout}
                  className="btn btn-outline-light btn-sm"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;










