
import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./Home.css";
import "./HomeIntelligence.css";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero-section">
          <p className="tagline">
            <b>PREVENT BEFORE MISHAP</b>
          </p>

          <h1>
            Prevent Accidents
            <br />
            Before They Happen
          </h1>

          <p className="taglines">
            Report Early. Response Fast. Prevent Risk.
          </p>

          <p className="hero-text">
            Report hostel and campus infrastructure problems,
            track complaints, and help authorities resolve
            issues before they become serious.
          </p>

          <div className="hero-buttons">
            <Link to="/report">
              <button className="primary-btn">
                Report an Issue
              </button>
            </Link>

            <Link to="/tracking">
              <button className="secondary-btn">
                Track Complaint
              </button>
            </Link>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <h2>Report</h2>
            <p>
              Report hostel and campus infrastructure
              problems easily.
            </p>
          </div>

          <div className="feature-card">
            <h2>Track</h2>
            <p>
              Check the current status of your complaint.
            </p>
          </div>

          <div className="feature-card">
            <h2>Resolve</h2>
            <p>
              Authorities can review and resolve
              reported issues.
            </p>
          </div>
        </section>

        {/* PREVANTA Intelligence Features */}
        <section className="intelligence-section">
          <div className="intelligence-cards">
            <Link
              to="/pattern-intelligence"
              className="intelligence-card pattern-card"
            >
              <div className="intelligence-icon">🧠</div>

              <h3>Pattern Intelligence</h3>

              <p>
                Explore repeated campus complaints and identify
                common issue patterns.
              </p>

              <span className="intelligence-link">
                Explore Patterns <span>→</span>
              </span>
            </Link>

            <Link
              to="/what-if-simulator"
              className="intelligence-card simulator-card"
            >
              <div className="intelligence-icon">🔍</div>

              <h3>What-If Simulator</h3>

              <p>
                Explore hypothetical campus scenarios and
                understand possible outcomes.
              </p>

              <span className="intelligence-link">
                Open Simulator <span>→</span>
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
