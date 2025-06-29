import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api';

const UploadNotePage = () => {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    file: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subject", form.subject);
    formData.append("description", form.description);
    formData.append("file", form.file);

    try {
      await api.post('/notes/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Note uploaded successfully!');
      setForm({ title: '', subject: '', description: '', file: null });
    } catch (err) {
      alert('Error uploading note: ' + (err.response?.data?.msg || 'Server error'));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-success">📤 Upload a Note</h2>

      <form className="shadow p-4 bg-light rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            placeholder="Enter title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            name="subject"
            className="form-control"
            placeholder="Enter subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Write a short description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Upload File (PDF, DOC)</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Upload Note
        </button>
      </form>
    </div>
  );
};

export default UploadNotePage;



