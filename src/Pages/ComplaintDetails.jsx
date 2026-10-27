import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./ComplaintDetails.css";

function ComplaintDetails() {

  const navigate = useNavigate();

  const [complaint] = useState(() => {
    const savedComplaint = localStorage.getItem("complaint");

    return savedComplaint
      ? JSON.parse(savedComplaint)
      : null;
  });

  function handleSubmitComplaint() {

    if (!complaint) {
      return;
    }

    const submittedComplaint = {
      ...complaint,
      submitted: true,
      status: "Pending"
    };

    localStorage.setItem(
      "complaint",
      JSON.stringify(submittedComplaint)
    );

    navigate("/tracking");
  }

  return (
    <>
      <Navbar />

      <main className="details-page">

        <div className="details-card">

          <p className="small-title">
            REVIEW BEFORE SUBMIT
          </p>

          <h1>
            Complaint Details
          </h1>

          {complaint ? (
            <>

              <div className="detail-item">
                <span>Issue Category</span>
                <strong>{complaint.category}</strong>
              </div>

              <div className="detail-item">
                <span>Hostel</span>
                <strong>{complaint.hostel}</strong>
              </div>

              <div className="detail-item">
                <span>Block</span>
                <strong>{complaint.block}</strong>
              </div>

              <div className="detail-item">
                <span>Room</span>
                <strong>{complaint.room}</strong>
              </div>

              <div className="detail-item">
                <span>Exact Location</span>
                <strong>{complaint.location}</strong>
              </div>

              <div className="detail-item">
                <span>Photo</span>
                <strong>{complaint.photo}</strong>
              </div>

              <div className="description-box">

                <span>
                  Description
                </span>

                <p>
                  {complaint.description}
                </p>

              </div>

              <div className="details-buttons">

                <Link to="/report">
                  <button className="back-btn">
                    Back
                  </button>
                </Link>

                <button
                  className="submit-complaint-btn"
                  onClick={handleSubmitComplaint}
                >
                  Submit Complaint
                </button>

              </div>

            </>
          ) : (

            <p>
              No complaint details available.
            </p>

          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ComplaintDetails;