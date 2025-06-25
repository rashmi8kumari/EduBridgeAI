import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        EduBridge
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Upload
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
                History
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
                <span className="navbar-text text-light me-3">👋 {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-outline-light btn-sm">
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

