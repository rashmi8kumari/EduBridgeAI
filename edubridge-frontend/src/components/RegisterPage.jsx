import React, { useState } from 'react';
import api from '../api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleSubmit = async () => {
    try {
      await api.post('/auth/register', form);
      alert('Registered successfully. Now login.');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default RegisterPage;
