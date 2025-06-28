import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Upload Answer
            </Link>
          </li>

          {user?.role === 'teacher' && (
            <li className="nav-item">
              <Link className="nav-link" to="/upload-note">
                Upload Notes
              </Link>
            </li>
          )}

          {user?.role === 'student' && (
            <li className="nav-item">
              <Link className="nav-link" to="/view-notes">
                View Notes
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                Evaluation History
              </Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="navbar-text text-light me-3">
                  👋 {user.name}
                </span>
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


