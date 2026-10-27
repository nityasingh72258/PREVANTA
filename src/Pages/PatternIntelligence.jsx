
import { useState } from "react";
import "./PatternIntelligence.css";

const patterns = [
  {
    id: 1,
    title: "Repeated Fan Complaints",
    location: "Boys Hostel - Block A",
    category: "Electrical",
    reports: 4,
    days: 7,
    reason:
      "Multiple reports mention fan problems in the same hostel block.",
    status: "Needs Review",
  },
  {
    id: 2,
    title: "Recurring Water Leakage",
    location: "Girls Hostel - Block B",
    category: "Water",
    reports: 3,
    days: 10,
    reason:
      "Similar leakage complaints have been reported repeatedly.",
    status: "Needs Review",
  },
  {
    id: 3,
    title: "Damaged Corridor Wall",
    location: "Academic Block",
    category: "Building",
    reports: 2,
    days: 5,
    reason:
      "More than one report refers to damage in the same area.",
    status: "Under Review",
  },
];

function PatternIntelligence() {
  const [filter, setFilter] = useState("All");
  const [reviewed, setReviewed] = useState([]);

  const visiblePatterns = patterns.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Reviewed") return reviewed.includes(item.id);
    return !reviewed.includes(item.id);
  });

  return (
    <div className="pattern-page">
      <header className="pattern-header">
        <span className="pattern-tag">PREVANTA INTELLIGENCE</span>
        <h1>Pattern Intelligence</h1>
        <p>
          Identify recurring campus complaints and send them
          for early human review.
        </p>
      </header>

      <div className="pattern-notice">
        Demo data only. These alerts identify repeated reports;
        they do not predict accidents.
      </div>

      <div className="pattern-summary">
        <div className="pattern-stat">
          <span>Patterns Found</span>
          <strong>{patterns.length}</strong>
        </div>
        <div className="pattern-stat">
          <span>Awaiting Review</span>
          <strong>
            {patterns.filter((p) => !reviewed.includes(p.id)).length}
          </strong>
        </div>
        <div className="pattern-stat">
          <span>Reviewed</span>
          <strong>{reviewed.length}</strong>
        </div>
      </div>

      <div className="pattern-toolbar">
        <h2>Recurring Issues</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter patterns"
        >
          <option>All</option>
          <option>Needs Review</option>
          <option>Reviewed</option>
        </select>
      </div>

      <div className="pattern-list">
        {visiblePatterns.map((item) => (
          <article className="pattern-card" key={item.id}>
            <div className="pattern-card-top">
              <span className="pattern-category">{item.category}</span>
              <span className="pattern-status">
                {reviewed.includes(item.id)
                  ? "Reviewed"
                  : item.status}
              </span>
            </div>

            <h3>{item.title}</h3>
            <p className="pattern-location">{item.location}</p>

            <div className="pattern-details">
              <div>
                <span>Similar reports</span>
                <strong>{item.reports}</strong>
              </div>
              <div>
                <span>Reported within</span>
                <strong>{item.days} days</strong>
              </div>
            </div>

            <div className="pattern-reason">
              <strong>Why was this flagged?</strong>
              <p>{item.reason}</p>
            </div>

            <button
              className="pattern-button"
              onClick={() =>
                setReviewed((old) =>
                  old.includes(item.id)
                    ? old.filter((id) => id !== item.id)
                    : [...old, item.id]
                )
              }
            >
              {reviewed.includes(item.id)
                ? "Reopen Review"
                : "Mark as Reviewed"}
            </button>
          </article>
        ))}

        {visiblePatterns.length === 0 && (
          <p className="pattern-empty">No patterns in this filter.</p>
        )}
      </div>
    </div>
  );
}

export default PatternIntelligence;
