
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./ComplaintTracking.css";

function ComplaintTracking() {
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

  if (!complaint || !complaint.submitted) {
    return (
      <>
        <Navbar />
        <main className="tracking-page">
          <div className="no-complaint">
            <h1>No Complaint Found</h1>
            <p>Please submit your complaint first.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const status = complaint.status || "Pending";
  const isPending = status === "Pending";
  const isProgress = status === "In Progress";
  const isResolved = status === "Resolved";

  return (
    <>
      <Navbar />

      <main className="tracking-page">
        <div className="tracking-container">

          <div className="tracking-header">
            <div>
              <p className="tracking-label">COMPLAINT TRACKING</p>
              <h1>Track Your Complaint</h1>
              <p>Monitor the current status of your complaint.</p>
            </div>

            <div
              className={`current-status ${
                isProgress ? "progress" : isResolved ? "resolved" : ""
              }`}
            >
              <span className="status-dot"></span>
              <div>
                <small>CURRENT STATUS</small>
                <strong>{status}</strong>
              </div>
            </div>
          </div>

          <div
            className={`status-message ${
              isProgress
                ? "message-progress"
                : isResolved
                ? "message-resolved"
                : "message-pending"
            }`}
          >
            <span>{isResolved ? "✓" : isProgress ? "⏳" : "ℹ"}</span>
            <div>
              <strong>
                {isResolved
                  ? "Complaint Resolved"
                  : isProgress
                  ? "Work in Progress"
                  : "Complaint Submitted"}
              </strong>
              <p>
                {isResolved
                  ? "Your complaint has been marked as resolved."
                  : isProgress
                  ? "The authority is working on your complaint."
                  : "Your complaint is waiting for review."}
              </p>
            </div>
          </div>

          <section className="complaint-card">
            <div className="card-title">
              <h2>Complaint Details</h2>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span>Issue Category</span>
                <strong>{complaint.category || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Issue</span>
                <strong>
                  {complaint.title || complaint.description || "Not provided"}
                </strong>
              </div>

              <div className="detail-item">
                <span>Location Type</span>
                <strong>{complaint.hostel || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Block / Building</span>
                <strong>{complaint.block || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Room Number</span>
                <strong>{complaint.room || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Exact Location</span>
                <strong>{complaint.location || "Not provided"}</strong>
              </div>

              <div className="detail-item full-width">
                <span>Description</span>
                <strong>{complaint.description || "Not provided"}</strong>
              </div>

              <div className="detail-item full-width">
                <span>Photo</span>
                <strong>{complaint.photo || "No photo attached"}</strong>
              </div>
            </div>
          </section>

          <section className="timeline-card">
            <h2>Complaint Progress</h2>

            <div className="timeline">
              <div className="timeline-item active">
                <div className="timeline-icon">✓</div>
                <div className="timeline-content">
                  <h3>Complaint Submitted</h3>
                  <p>Your complaint has been submitted successfully.</p>
                </div>
              </div>

              <div
                className={`timeline-item ${
                  isProgress || isResolved ? "active" : ""
                }`}
              >
                <div className="timeline-icon">
                  {isProgress || isResolved ? "✓" : "2"}
                </div>
                <div className="timeline-content">
                  <h3>Under Review / In Progress</h3>
                  <p>The responsible authority reviews the complaint.</p>
                </div>
              </div>

              <div
                className={`timeline-item ${isResolved ? "active" : ""}`}
              >
                <div className="timeline-icon">
                  {isResolved ? "✓" : "3"}
                </div>
                <div className="timeline-content">
                  <h3>Resolved</h3>
                  <p>The complaint is marked resolved after the work is completed.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default ComplaintTracking;
