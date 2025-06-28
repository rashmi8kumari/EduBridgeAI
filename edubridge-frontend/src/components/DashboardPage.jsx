import React, { useEffect, useState } from 'react';
import api from '../api';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 Dashboard Overview</h2>
      {!stats ? (
        <p>Loading stats...</p>
      ) : (
        <div className="row g-4">
          <StatCard label="Total Users" value={stats.users} />
          <StatCard label="Students" value={stats.students} />
          <StatCard label="Teachers" value={stats.teachers} />
          <StatCard label="Notes Uploaded" value={stats.notes} />
          <StatCard label="Evaluations Done" value={stats.evaluations} />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="col-md-4">
    <div className="card text-white bg-secondary h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{label}</h5>
        <h2>{value}</h2>
      </div>
    </div>
  </div>
);

export default DashboardPage;

