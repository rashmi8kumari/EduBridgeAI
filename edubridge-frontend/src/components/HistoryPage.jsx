import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const HistoryPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/eval/all').then(res => {
      setRecords(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📜 Evaluation History</h2>

      {records.length === 0 ? (
        <div className="alert alert-info">No records uploaded yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Score</th>
                <th>Feedback</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{r.studentName}</td>
                  <td>{r.score}</td>
                  <td>{r.feedback}</td>
                  <td>{new Date(r.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
