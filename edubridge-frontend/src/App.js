import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadPage from "./components/UploadPage";
import HistoryPage from "./components/HistoryPage";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UploadNotePage from "./components/UploadNotePage";
import ViewNotesPage from "./components/ViewNotesPage";
import DashboardPage from "./components/DashboardPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route
          path="/register"
          element={<RegisterPage onLogin={(user) => setUser(user)} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={(user) => setUser(user)} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/upload-note"
          element={
            user && user.role === "teacher" ? (
              <UploadNotePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/view-notes" element={<ViewNotesPage />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
