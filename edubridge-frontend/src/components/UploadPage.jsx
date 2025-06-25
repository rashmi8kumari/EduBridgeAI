import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !studentName) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      // Step 1: Upload file
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await api.post("/upload", formData);
      const filePath = uploadRes.data.path;

      // Step 2: Evaluate file
      const evalRes = await api.post("/eval/evaluate", {
        path: filePath,
        studentName
      });

      setResult(evalRes.data);
    } catch (error) {
      alert("Something went wrong: " + (error.response?.data?.msg || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📤 Upload Answer for Evaluation</h2>

      <form onSubmit={handleUpload} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Upload Answer File (PDF/Image)</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Evaluation"}
        </button>
      </form>

      {result && (
        <div className="mt-5">
          <h3 className="text-success">✅ Evaluation Result</h3>
          <div className="border p-3 rounded bg-white shadow-sm">
            <p><strong>Score:</strong> {result.score} / 5</p>
            <p><strong>Feedback:</strong> {result.feedback}</p>
            <p><strong>Extracted Text:</strong></p>
            <pre className="bg-light p-2 rounded" style={{ whiteSpace: 'pre-wrap' }}>{result.extractedText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;



