
import { useEffect, useState } from "react";
import "./DispatcherDashboard.css";

function DispatcherDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    function loadComplaints() {
      try {
        const saved = localStorage.getItem("complaint");

        if (saved) {
          const complaint = JSON.parse(saved);

          if (complaint && complaint.submitted === true) {
            setComplaints([
              {
                ...complaint,
                id: complaint.id || 1,
                title:
                  complaint.title ||
                  complaint.description ||
                  "Infrastructure Complaint",
                location: [
                  complaint.hostel,
                  complaint.block,
                  complaint.room,
                  complaint.location,
                ]
                  .filter(Boolean)
                  .join(" - "),
                status: complaint.status || "Pending",
                date: complaint.date || "Recently reported",
              },
            ]);
          } else {
            setComplaints([]);
          }
        } else {
          setComplaints([]);
        }
      } catch {
        setComplaints([]);
      }
    }

    loadComplaints();

    const interval = setInterval(loadComplaints, 1000);
    window.addEventListener("storage", loadComplaints);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadComplaints);
    };
  }, []);

  const updateStatus = (id, newStatus) => {
    setComplaints((current) => {
      const updated = current.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: newStatus }
          : complaint
      );

      if (updated[0]) {
        const saved = localStorage.getItem("complaint");

        if (saved) {
          const original = JSON.parse(saved);
          localStorage.setItem(
            "complaint",
            JSON.stringify({ ...original, status: newStatus })
          );
        }
      }

      return updated;
    });
  };

  const sendToChairman = (id) => {
    setComplaints((current) => {
      const updated = current.map((complaint) =>
        complaint.id === id
          ? { ...complaint, chairman: true }
          : complaint
      );

      const saved = localStorage.getItem("complaint");

      if (saved) {
        const original = JSON.parse(saved);
        localStorage.setItem(
          "complaint",
          JSON.stringify({ ...original, chairman: true })
        );
      }

      return updated;
    });

    alert("Complaint has been marked for Chairman notification.");
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;
  const inProgressComplaints = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;
  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6mO4WlFVPhoq2HCTWNWquE_9Y4ixUtAFAxVk7Jlb7lQCwZMy6d9-Bgg&s=10"
            alt="College Logo"
            className="admin-logo"
          />

          <div>
            <h2>PREVANTA</h2>
            <p>Dispatcher Panel</p>
          </div>
        </div>

        <div className="admin-title">
          <span>Authority Dashboard</span>
        </div>
      </header>

      <main className="admin-container">
        <div className="dashboard-heading">
          <div>
            <h1>Complaint Dashboard</h1>
            <p>
              Review, manage and resolve reported campus infrastructure issues.
            </p>
          </div>
        </div>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <h3>Total Complaints</h3>
            <strong>{totalComplaints}</strong>
          </div>

          <div className="admin-stat-card">
            <h3>Pending</h3>
            <strong>{pendingComplaints}</strong>
          </div>

          <div className="admin-stat-card">
            <h3>In Progress</h3>
            <strong>{inProgressComplaints}</strong>
          </div>

          <div className="admin-stat-card">
            <h3>Resolved</h3>
            <strong>{resolvedComplaints}</strong>
          </div>
        </section>

        <section className="complaints-section">
          <div className="section-heading">
            <h2>All Complaints</h2>
            <span>{totalComplaints} Reports</span>
          </div>

          <div className="complaints-list">
            {complaints.length === 0 ? (
              <div className="admin-complaint-card">
                <h3>No complaints submitted yet</h3>
                <p>Submitted student complaints will appear here.</p>
              </div>
            ) : (
              complaints.map((complaint) => (
                <div className="admin-complaint-card" key={complaint.id}>
                  <div className="complaint-top">
                    <div>
                      <span className="category-badge">
                        {complaint.category}
                      </span>

                      <h3>{complaint.title}</h3>

                      <p className="complaint-location">
                        📍 {complaint.location}
                      </p>
                    </div>

                    <span
                      className={`status-badge ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <p className="complaint-description">
                    {complaint.description}
                  </p>

                  <div className="complaint-info">
                    <span>
                      <b>Reported:</b> {complaint.date}
                    </span>

                    <span>
                      <b>Complaint ID:</b> #{complaint.id}
                    </span>
                  </div>

                  <div className="complaint-actions">
                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(complaint.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <button
                      className="chairman-btn"
                      onClick={() => sendToChairman(complaint.id)}
                    >
                      {complaint.chairman
                        ? "Sent to Chairman ✓"
                        : "Notify Chairman"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DispatcherDashboard;
