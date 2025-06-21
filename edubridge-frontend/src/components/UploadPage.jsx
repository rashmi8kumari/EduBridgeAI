import React, { useState } from 'react';
import api from '../api';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file || !studentName) return alert("All fields required");

    // 1. Upload file
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await api.post("/upload", formData);
    const filePath = uploadRes.data.path;

    // 2. Evaluate
    const evalRes = await api.post("/eval/evaluate", {
      path: filePath,
      studentName
    });

    setResult(evalRes.data);
  };

  return (
    <div>
      <h2>Upload Answer for Evaluation</h2>
      <input type="text" placeholder="Enter your name" onChange={(e) => setStudentName(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Submit for Evaluation</button>

      {result && (
        <div>
          <h3>Evaluation Result</h3>
          <p><b>Score:</b> {result.score}/5</p>
          <p><b>Feedback:</b> {result.feedback}</p>
          <p><b>Extracted Text:</b><br />{result.extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;


