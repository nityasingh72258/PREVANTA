import { Link } from "react-router-dom";
import "./ComplaintReview.css";

function ComplaintReview() {
  const complaint = {
    category: "Electrical",
    title: "Broken Ceiling Fan",
    hostel: "Boys Hostel",
    block: "B Block",
    room: "B-204",
    location: "Room B-204",
    description:
      "Ceiling fan is making unusual noise and is not working properly.",
    date: "25 Sep 2026",
    status: "Pending",
  };

  return (
    <div className="review-page">

      {/* Header */}
      <header className="review-header">

        <div className="review-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6mO4WlFVPhoq2HCTWNWquE_9Y4ixUtAFAxVk7Jlb7lQCwZMy6d9-Bgg&s=10"
            alt="College Logo"
          />

          <div>
            <h2>PREVANTA</h2>
            <p>Dispatcher Panel</p>
          </div>
        </div>

        <Link to="/admin" className="back-dashboard">
          ← Dashboard
        </Link>

      </header>

      {/* Main */}
      <main className="review-container">

        <div className="review-heading">
          <span>COMPLAINT REVIEW</span>
          <h1>{complaint.title}</h1>
          <p>Review the reported infrastructure issue.</p>
        </div>

        {/* Complaint Information */}
        <section className="review-card">

          <div className="review-card-heading">
            <h2>Complaint Information</h2>

            <span className="review-status">
              {complaint.status}
            </span>
          </div>

          <div className="review-grid">

            <div className="review-item">
              <label>Category</label>
              <p>{complaint.category}</p>
            </div>

            <div className="review-item">
              <label>Reported Date</label>
              <p>{complaint.date}</p>
            </div>

            <div className="review-item">
              <label>Hostel</label>
              <p>{complaint.hostel}</p>
            </div>

            <div className="review-item">
              <label>Block</label>
              <p>{complaint.block}</p>
            </div>

            <div className="review-item">
              <label>Room</label>
              <p>{complaint.room}</p>
            </div>

            <div className="review-item">
              <label>Location</label>
              <p>{complaint.location}</p>
            </div>

          </div>

          <div className="description-box">

            <label>Description</label>

            <p>
              {complaint.description}
            </p>

          </div>

          {/* Actions */}
          <div className="review-actions">

            <button className="progress-btn">
              Mark In Progress
            </button>

            <button className="resolve-btn">
              Mark Resolved
            </button>

            <button className="chairman-review-btn">
              Notify Chairman
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ComplaintReview;