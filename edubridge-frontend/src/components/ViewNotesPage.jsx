import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes/all');
        setNotes(res.data);

        const uniqueSubjects = [...new Set(res.data.map(note => note.subject))];
        setSubjects(uniqueSubjects);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = subjectFilter
    ? notes.filter(note => note.subject === subjectFilter)
    : notes;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">📘 Notes Library</h2>
        <p className="text-muted">Explore curated notes uploaded by teachers</p>
        <hr className="w-25 mx-auto" />
      </div>

      <div className="mb-4 text-end">
        <select
          className="form-select w-auto d-inline-block"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">🔎 Filter by Subject</option>
          {subjects.map((subj, i) => (
            <option key={i} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="alert alert-warning text-center">
          No notes available for selected subject.
        </div>
      ) : (
        <div className="row g-4">
          {filteredNotes.map((note) => (
            <div className="col-md-6 col-lg-4" key={note._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">
                    📄 {note.title}
                  </h5>
                  <span className="badge bg-info text-dark mb-2">
                    {note.subject}
                  </span>
                  <p className="card-text text-muted" style={{ minHeight: '60px' }}>
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
                <div className="card-footer small text-muted bg-light">
                  <div>
                    <strong>Teacher:</strong> {note.uploadedBy?.name || 'Unknown'} ({note.uploadedBy?.email})
                  </div>
                  <div>
                    <strong>Uploaded:</strong> {new Date(note.createdAt).toLocaleString()}
                  </div>
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







