import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./ReportIssue.css";

function ReportIssue() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);

  const [complaint, setComplaint] = useState({
    category: "",
    description: "",
    hostel: "",
    block: "",
    room: "",
    location: ""
  });

  // Student verification check
  useEffect(() => {
    const verified =
      sessionStorage.getItem("studentVerified");

    if (verified !== "true") {
      navigate("/register");
    }
  }, [navigate]);

  // Input change
  function handleChange(event) {
    const { name, value } = event.target;

    setComplaint({
      ...complaint,
      [name]: value
    });
  }

  // Submit
  function handleSubmit(event) {
    event.preventDefault();

    const finalComplaint = {
      ...complaint,

      photo: photo
        ? photo.name
        : "No photo attached",

      status: "Pending",

      submitted: false,

      studentName:
        sessionStorage.getItem("studentName"),

      studentRollNo:
        sessionStorage.getItem("studentRollNo"),

      studentEmail:
        sessionStorage.getItem("studentEmail")
    };

    localStorage.setItem(
      "complaint",
      JSON.stringify(finalComplaint)
    );

    navigate("/complaint");
  }

  return (
    <>
      <Navbar />

      <main className="report-page">

        <div className="form-container">

          {/* Heading */}

          <p className="small-title">
            NEW COMPLAINT
          </p>

          <h1>
            Report Infrastructure Issue
          </h1>

          <p className="form-intro">
            Report any hostel or campus
            infrastructure problem.
          </p>


          <form onSubmit={handleSubmit}>

            {/* ISSUE CATEGORY */}

            <div className="form-group">

              <label>
                Issue Category
              </label>

              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Structural">
                  Structural
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Describe the Problem
              </label>

              <textarea
                name="description"
                value={complaint.description}
                onChange={handleChange}
                placeholder="Describe what is wrong..."
                required
              />

            </div>


            {/* LOCATION */}

            <h2>
              Location
            </h2>


            {/* LOCATION TYPE + BLOCK */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Location Type
                </label>

                <select
                  name="hostel"
                  value={complaint.hostel}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Location
                  </option>

                  <option value="Boys Hostel">
                    Boys Hostel
                  </option>

                  <option value="Girls Hostel">
                    Girls Hostel
                  </option>

                  <option value="Academic Block">
                    Academic Block
                  </option>

                  <option value="Administrative Block">
                    Administrative Block
                  </option>

                  <option value="Library">
                    Library
                  </option>

                  <option value="Laboratory">
                    Laboratory
                  </option>

                  <option value="Canteen">
                    Canteen
                  </option>

                  <option value="Sports Area">
                    Sports Area
                  </option>

                  <option value="Parking Area">
                    Parking Area
                  </option>

                  <option value="Other Campus Area">
                    Other Campus Area
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Block / Building
                </label>

                <select
                  name="block"
                  value={complaint.block}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Block / Building
                  </option>

                  <option value="A Block">
                    A Block
                  </option>

                  <option value="B Block">
                    B Block
                  </option>

                  <option value="C Block">
                    C Block
                  </option>

                  <option value="D Block">
                    D Block
                  </option>

                  <option value="Main Building">
                    Main Building
                  </option>

                  <option value="Other Building">
                    Other Building
                  </option>

                </select>

              </div>

            </div>


            {/* ROOM + EXACT LOCATION */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Room Number
                  <span className="optional">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  name="room"
                  value={complaint.room}
                  onChange={handleChange}
                  placeholder="Example: B-204"
                />

              </div>


              <div className="form-group">

                <label>
                  Exact Location / Area
                </label>

                <input
                  type="text"
                  name="location"
                  value={complaint.location}
                  onChange={handleChange}
                  placeholder="Example: Near main entrance"
                  required
                />

              </div>

            </div>


            {/* PHOTO */}

            <h2>
              Upload Evidence
            </h2>

            <div className="upload-box">

              <label>
                Add a photo of the problem
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setPhoto(
                    event.target.files[0]
                  );
                }}
              />

              {photo && (
                <p className="file-name">
                  Selected: {photo.name}
                </p>
              )}

            </div>


            {/* BUTTON */}

            <button
              className="submit-btn"
              type="submit"
            >
              Continue to Complaint Details
            </button>

          </form>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ReportIssue;