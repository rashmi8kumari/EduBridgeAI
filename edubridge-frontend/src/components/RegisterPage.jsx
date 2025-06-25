import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = ({ onLogin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate('/history');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.msg || 'Server error'));
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
            Smart learning solutions for modern classrooms and digital education.
          </p>
        </div>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow-sm"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}
        >
          <h4 className="mb-4 text-center" style={{ color: '#FF6584' }}>
            📝 Register New Account
          </h4>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#3D3D3D' }}>Full Name</label>
            <input
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#3D3D3D' }}>Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#3D3D3D' }}>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Choose a secure password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ color: '#3D3D3D' }}>Role</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#6C63FF', color: 'white' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Footer */}
        <footer className="text-center mt-5" style={{ color: '#777', fontSize: '0.9rem' }}>
          <p className="mt-4 mb-1">Already have an account? Please <strong>Login</strong>.</p>
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

export default RegisterPage;




