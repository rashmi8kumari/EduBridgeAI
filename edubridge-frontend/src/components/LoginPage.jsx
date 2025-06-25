import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      onLogin(res.data.user);
      navigate('/history');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.msg || 'Server error'));
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        {/* Branding */}
        <div className="text-center mb-4">
          <h1 style={{ color: '#6C63FF', fontWeight: '700' }}>EduBridge AI</h1>
          <p style={{ color: '#3D3D3D' }}>
            Welcome back! Sign in to access smart learning tools.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}>
          <h4 className="mb-4 text-center" style={{ color: '#FF6584' }}>
            🔐 Login
          </h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-3">
              <label className="form-label" style={{ color: '#3D3D3D' }}>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: '#3D3D3D' }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#6C63FF', color: 'white' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center mt-5" style={{ color: '#777', fontSize: '0.9rem' }}>
          <p className="mt-4 mb-1">New here? Please <strong>Register</strong> to continue.</p>
          <hr />
          <p>
            © {new Date().getFullYear()} <strong style={{ color: '#6C63FF' }}>EduBridge AI</strong>. All rights reserved.
            <br />
            Need help? Contact <a href="mailto:support@edubridge.ai">support@edubridge.ai</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;






