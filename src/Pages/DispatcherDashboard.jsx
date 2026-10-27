import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./DispatcherDashboard.css";

function DispatcherDashboard() {

  const [complaint, setComplaint] = useState(null);

  const [status, setStatus] = useState("Pending");

  // ---------------------------------------
  // COMPLAINT LOAD KARNA
  // ---------------------------------------

  function loadComplaint() {

    const savedComplaint =
      localStorage.getItem("complaint");

    if (savedComplaint) {

      const data = JSON.parse(savedComplaint);

      setComplaint(data);

      setStatus(
        data.status || "Pending"
      );

    } else {

      // Demo complaint
      const demoComplaint = {
        category: "Electrical",
        description:
          "Ceiling fan is making unusual noise and is not working properly.",
        hostel: "Boys Hostel",
        block: "B Block",
        room: "B-204",
        location: "Near study area",
        photo: "No photo attached",
        status: "Pending",
        submitted: true,
        studentName: "Demo Student",
        studentRollNo: "2403580100095",
        studentEmail: "student@college.edu"
      };

      localStorage.setItem(
        "complaint",
        JSON.stringify(demoComplaint)
      );

      setComplaint(demoComplaint);

      setStatus("Pending");
    }
  }


  // ---------------------------------------
  // PAGE LOAD
  // ---------------------------------------

  useEffect(() => {

    loadComplaint();

    // Agar student side se complaint change ho
    const handleStorage = () => {
      loadComplaint();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };

  }, []);


  // ---------------------------------------
  // STATUS CHANGE
  // ---------------------------------------

  function handleStatusChange(event) {

    const newStatus =
      event.target.value;

    setStatus(newStatus);

    if (!complaint) {
      return;
    }

    const updatedComplaint = {
      ...complaint,
      status: newStatus
    };

    // Admin state update
    setComplaint(updatedComplaint);

    // SAME COMPLAINT DATA STUDENT TRACKING KE LIYE
    localStorage.setItem(
      "complaint",
      JSON.stringify(updatedComplaint)
    );
  }


  // ---------------------------------------
  // QUICK STATUS BUTTON
  // ---------------------------------------

  function changeStatus(newStatus) {

    if (!complaint) {
      return;
    }

    const updatedComplaint = {
      ...complaint,
      status: newStatus
    };

    setStatus(newStatus);

    setComplaint(updatedComplaint);

    localStorage.setItem(
      "complaint",
      JSON.stringify(updatedComplaint)
    );
  }


  // ---------------------------------------
  // STATUS CLASS
  // ---------------------------------------

  function getStatusClass() {

    if (status === "In Progress") {
      return "status-progress";
    }

    if (status === "Resolved") {
      return "status-resolved";
    }

    return "status-pending";
  }


  if (!complaint) {

    return (
      <main className="admin-page">

        <div className="admin-empty">

          <h1>
            No Complaint Found
          </h1>

          <p>
            There is currently no complaint
            available for review.
          </p>

        </div>

      </main>
    );
  }


  return (

    <main className="admin-page">

      <div className="admin-container">


        {/* -------------------------------- */}
        {/* ADMIN HEADER */}
        {/* -------------------------------- */}

        <header className="admin-header">

          <div className="admin-brand">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6mO4WlFVPhoq2HCTWNWquE_9Y4ixUtAFAxVk7Jlb7lQCwZMy6d9-Bgg&s=10"
              alt="College Logo"
            />

            <div>

              <h1>
                PREVANTA
              </h1>

              <p>
                Dispatcher Panel
              </p>

            </div>

          </div>


          <Link
            to="/"
            className="admin-home-link"
          >
            Back to Home
          </Link>

        </header>


        {/* -------------------------------- */}
        {/* PAGE TITLE */}
        {/* -------------------------------- */}

        <section className="admin-title">

          <div>

            <p className="admin-label">
              AUTHORITY DASHBOARD
            </p>

            <h2>
              Complaint Management
            </h2>

            <p>
              Review reported infrastructure
              problems and update their status.
            </p>

          </div>

        </section>


        {/* -------------------------------- */}
        {/* STATS */}
        {/* -------------------------------- */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <span>
              TOTAL COMPLAINTS
            </span>

            <strong>
              1
            </strong>

          </div>


          <div className="admin-stat-card">

            <span>
              PENDING
            </span>

            <strong>
              {status === "Pending" ? 1 : 0}
            </strong>

          </div>


          <div className="admin-stat-card">

            <span>
              IN PROGRESS
            </span>

            <strong>
              {status === "In Progress" ? 1 : 0}
            </strong>

          </div>


          <div className="admin-stat-card">

            <span>
              RESOLVED
            </span>

            <strong>
              {status === "Resolved" ? 1 : 0}
            </strong>

          </div>

        </section>


        {/* -------------------------------- */}
        {/* COMPLAINT CARD */}
        {/* -------------------------------- */}

        <section className="admin-complaint-card">


          <div className="complaint-top">

            <div>

              <p className="complaint-category">
                {complaint.category}
              </p>

              <h2>
                Infrastructure Complaint
              </h2>

            </div>


            <div
              className={`admin-status ${getStatusClass()}`}
            >
              {status}
            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="admin-description">

            <span>
              PROBLEM DESCRIPTION
            </span>

            <p>
              {complaint.description}
            </p>

          </div>


          {/* DETAILS */}

          <div className="admin-details-grid">


            <div className="admin-detail">

              <span>
                STUDENT
              </span>

              <strong>
                {complaint.studentName ||
                  "Not Available"}
              </strong>

            </div>


            <div className="admin-detail">

              <span>
                ROLL NUMBER
              </span>

              <strong>
                {complaint.studentRollNo ||
                  "Not Available"}
              </strong>

            </div>


            <div className="admin-detail">

              <span>
                LOCATION TYPE
              </span>

              <strong>
                {complaint.hostel}
              </strong>

            </div>


            <div className="admin-detail">

              <span>
                BLOCK / BUILDING
              </span>

              <strong>
                {complaint.block}
              </strong>

            </div>


            <div className="admin-detail">

              <span>
                ROOM
              </span>

              <strong>
                {complaint.room ||
                  "Not Applicable"}
              </strong>

            </div>


            <div className="admin-detail">

              <span>
                EXACT LOCATION
              </span>

              <strong>
                {complaint.location}
              </strong>

            </div>


          </div>


          {/* -------------------------------- */}
          {/* STATUS CONTROL */}
          {/* -------------------------------- */}

          <div className="status-control">

            <div>

              <label>
                Update Complaint Status
              </label>

              <p>
                Changes will immediately be
                reflected on the student
                tracking page.
              </p>

            </div>


            <select
              value={status}
              onChange={handleStatusChange}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>


          {/* -------------------------------- */}
          {/* QUICK BUTTONS */}
          {/* -------------------------------- */}

          <div className="admin-actions">

            <button
              className="pending-btn"
              onClick={() =>
                changeStatus("Pending")
              }
            >
              Mark Pending
            </button>


            <button
              className="progress-btn"
              onClick={() =>
                changeStatus("In Progress")
              }
            >
              Mark In Progress
            </button>


            <button
              className="resolved-btn"
              onClick={() =>
                changeStatus("Resolved")
              }
            >
              Mark Resolved
            </button>

          </div>


          {/* -------------------------------- */}
          {/* TRACKING LINK */}
          {/* -------------------------------- */}

          <div className="student-view">

            <p>
              Student View
            </p>

            <Link to="/tracking">
              Open Complaint Tracking →
            </Link>

          </div>

        </section>

      </div>

    </main>

  );
}

export default DispatcherDashboard;