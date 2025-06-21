import React, { useEffect, useState } from 'react';
import api from '../api';

const HistoryPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/eval/all').then(res => {
      setRecords(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Evaluation History</h2>
      {records.length === 0 && <p>No records yet.</p>}
      {records.map((r, index) => (
        <div key={index} style={{ borderBottom: '1px solid gray', marginBottom: '1rem' }}>
          <p><b>Name:</b> {r.studentName}</p>
          <p><b>Score:</b> {r.score}</p>
          <p><b>Feedback:</b> {r.feedback}</p>
          <p><b>Submitted:</b> {new Date(r.submittedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
