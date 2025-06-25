import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewNotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes/all');
        setNotes(res.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">📘 Notes Library</h2>
        <p className="text-muted">Explore all notes uploaded by teachers for student learning</p>
        <hr className="w-25 mx-auto" />
      </div>

      {notes.length === 0 ? (
        <div className="alert alert-warning text-center">No notes available yet.</div>
      ) : (
        <div className="row g-4">
          {notes.map((note) => (
            <div className="col-md-6 col-lg-4" key={note._id}>
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-semibold mb-2">
                    📄 {note.title}
                  </h5>

                  <span className="badge bg-secondary mb-3" style={{ width: 'fit-content' }}>
                    {note.subject}
                  </span>

                  <p className="card-text mb-3 text-muted" style={{ minHeight: '60px' }}>
                    {note.description}
                  </p>

                  {note.fileUrl && (
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm mt-auto"
                    >
                      🔗 View Note
                    </a>
                  )}
                </div>

                <div className="card-footer bg-light text-muted small">
                  Uploaded on: <strong>{new Date(note.createdAt).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewNotesPage;



