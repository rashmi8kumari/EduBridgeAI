import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadNotePage = () => {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    fileUrl: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await api.post('/notes/upload', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("✅ Note uploaded successfully!");
      setForm({ title: '', subject: '', description: '', fileUrl: '' });
    } catch (err) {
      alert("❌ Error uploading note: " + (err.response?.data?.msg || "Server error"));
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📄 Upload Note</h2>
      <form className="shadow p-4 bg-light rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Note Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            placeholder="Enter subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">File URL (Google Drive or PDF link)</label>
          <input
            type="url"
            className="form-control"
            name="fileUrl"
            placeholder="Enter file URL"
            value={form.fileUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Add any extra details"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Note'}
        </button>
      </form>
    </div>
  );
};

export default UploadNotePage;


