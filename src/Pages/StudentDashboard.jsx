
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./StudentDashboard.css";

function StudentDashboard() {
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    function loadComplaint() {
      try {
        const saved = localStorage.getItem("complaint");
        setComplaint(saved ? JSON.parse(saved) : null);
      } catch {
        setComplaint(null);
      }
    }

    loadComplaint();

    const interval = setInterval(loadComplaint, 1000);
    window.addEventListener("storage", loadComplaint);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadComplaint);
    };
  }, []);

  const submittedComplaint =
    complaint?.submitted === true ? complaint : null;

  const status = submittedComplaint?.status || "Pending";

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <p className="small-title">STUDENT PORTAL</p>
            <h1>Student Dashboard</h1>
            <p>Manage and track your infrastructure complaints.</p>
          </div>

          <Link to="/report">
            <button className="report-btn">+ Report New Issue</button>
          </Link>
        </div>

        <section className="stats">
          <div className="stat-card">
            <span>Total Complaints</span>
            <strong>{submittedComplaint ? 1 : 0}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{submittedComplaint && status === "Pending" ? 1 : 0}</strong>
          </div>

          <div className="stat-card">
            <span>In Progress</span>
            <strong>{submittedComplaint && status === "In Progress" ? 1 : 0}</strong>
          </div>

          <div className="stat-card">
            <span>Resolved</span>
            <strong>{submittedComplaint && status === "Resolved" ? 1 : 0}</strong>
          </div>
        </section>

        <section className="complaint-section">
          <h2>My Recent Complaint</h2>

          {submittedComplaint ? (
            <div className="complaint-card">
              <div>
                <p className="complaint-category">
                  {submittedComplaint.category}
                </p>

                <h3>
                  {submittedComplaint.title ||
                    submittedComplaint.description ||
                    "Infrastructure Complaint"}
                </h3>

                <p>
                  {[submittedComplaint.hostel, submittedComplaint.block,
                    submittedComplaint.room]
                    .filter(Boolean)
                    .join(" • ")}
                </p>

                <p className="description">
                  {submittedComplaint.description}
                </p>
              </div>

              <div className="complaint-right">
                <span
                  className={
                    status === "Resolved"
                      ? "status-resolved"
                      : status === "In Progress"
                      ? "status-progress"
                      : "status-pending"
                  }
                >
                  {status}
                </span>

                <Link to="/tracking">
                  <button>Track Complaint</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="complaint-card">
              <div>
                <h3>No complaints yet</h3>
                <p>Submit a complaint to see it here.</p>
              </div>

              <div className="complaint-right">
                <Link to="/report">
                  <button>Report New Issue</button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default StudentDashboard;
