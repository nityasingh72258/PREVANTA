import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  function handleVerification(event) {
    event.preventDefault();

    setMessage("");
    setVerified(false);

    // Input ko clean karna
    const cleanName = name.trim();
    const cleanRollNo = rollNo.trim();
    const cleanEmail = email.trim();

    // -----------------------------
    // NAME VALIDATION
    // -----------------------------
    if (cleanName.length < 2) {
      setMessage("Please enter a valid student name.");
      return;
    }

    // -----------------------------
    // ROLL NUMBER VALIDATION
    // Exactly 13 digits
    // -----------------------------
    const rollPattern = /^\d{13}$/;

    if (!rollPattern.test(cleanRollNo)) {
      setMessage(
        "Invalid Roll Number. Roll Number must contain exactly 13 digits."
      );
      return;
    }

    // -----------------------------
    // EMAIL VALIDATION
    // -----------------------------
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setMessage(
        "Please enter a valid Email ID."
      );
      return;
    }

    // -----------------------------
    // VERIFICATION SUCCESS
    // -----------------------------
    setVerified(true);

    setMessage(
      "Student verification successful! Redirecting..."
    );

    // Student information save
    sessionStorage.setItem(
      "studentVerified",
      "true"
    );

    sessionStorage.setItem(
      "studentName",
      cleanName
    );

    sessionStorage.setItem(
      "studentRollNo",
      cleanRollNo
    );

    sessionStorage.setItem(
      "studentEmail",
      cleanEmail
    );

    // Report page par redirect
    setTimeout(() => {
      navigate("/report");
    }, 1000);
  }

  return (
    <>
      <Navbar />

      <main className="register-page">

        <section className="register-card">

          {/* Heading */}

          <div className="register-heading">

            <span>
              STUDENT VERIFICATION
            </span>

            <h1>
              Verify Your Identity
            </h1>

            <p>
              Verify your student details before
              reporting a campus or hostel issue.
            </p>

          </div>


          {/* Form */}

          <form
            className="register-form"
            onSubmit={handleVerification}
          >

            {/* Student Name */}

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />

            </div>


            {/* Roll Number */}

            <div className="form-group">

              <label>
                Roll Number
              </label>

              <input
                type="text"
                placeholder="Enter 13 digit roll number"
                value={rollNo}
                onChange={(event) =>
                  setRollNo(event.target.value)
                }
                maxLength="13"
                required
              />

              <small>
                Roll number must contain exactly 13 digits
              </small>

            </div>


            {/* Email */}

            <div className="form-group">

              <label>
                Email ID
              </label>

              <input
                type="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>


            {/* Verify Button */}

            <button
              type="submit"
              className="verify-btn"
            >
              Verify Student
            </button>


            {/* Verification Message */}

            {message && (
              <div
                className={
                  verified
                    ? "verification-message success"
                    : "verification-message error"
                }
              >
                {message}
              </div>
            )}

          </form>


          {/* Security Note */}

          <div className="verification-note">

            <span>🔒</span>

            <p>
              Student verification is required
              before submitting a complaint.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Register;