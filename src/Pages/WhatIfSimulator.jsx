
import { useState } from "react";
import "./WhatIfSimulator.css";

function WhatIfSimulator() {
  const [scenario, setScenario] = useState("now");
  const [deadline, setDeadline] = useState("3");

  const steps =
    scenario === "now"
      ? [
          "Complaint reviewed by the responsible authority",
          "Issue assigned for inspection",
          `Follow-up deadline set to ${deadline} days`,
          "Action evidence checked before closure",
        ]
      : [
          "Complaint remains awaiting action",
          "Follow-up may be delayed",
          "Escalation may be required after the deadline",
          "Issue remains open until verified",
        ];

  return (
    <div className="whatif-page">
      <header className="whatif-header">
        <span className="whatif-tag">PREVANTA PLANNING TOOL</span>
        <h1>What-If Impact Simulator</h1>
        <p>
          Compare two response workflows to understand how
          timely action can improve complaint handling.
        </p>
      </header>

      <div className="whatif-notice">
        This is a workflow demonstration, not a prediction of
        accident probability or real-world damage.
      </div>

      <section className="whatif-panel">
        <h2>Choose a scenario</h2>

        <div className="whatif-options">
          <button
            className={scenario === "now" ? "selected" : ""}
            onClick={() => setScenario("now")}
          >
            <span>Option A</span>
            <strong>Action Taken Early</strong>
            <small>Review and assign the complaint promptly.</small>
          </button>

          <button
            className={scenario === "delayed" ? "selected" : ""}
            onClick={() => setScenario("delayed")}
          >
            <span>Option B</span>
            <strong>Action Delayed</strong>
            <small>Complaint waits before follow-up begins.</small>
          </button>
        </div>

        <label className="whatif-label" htmlFor="deadline">
          Follow-up deadline
        </label>

        <select
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        >
          <option value="1">1 day</option>
          <option value="3">3 days</option>
          <option value="7">7 days</option>
        </select>
      </section>

      <section className="whatif-result">
        <h2>
          {scenario === "now"
            ? "Early Action Workflow"
            : "Delayed Action Workflow"}
        </h2>

        <p className="whatif-result-description">
          {scenario === "now"
            ? "The process starts with review, assignment and a clear follow-up deadline."
            : "The complaint may remain pending longer, so follow-up and escalation become important."}
        </p>

        <div className="whatif-steps">
          {steps.map((step, index) => (
            <div className="whatif-step" key={step}>
              <span className="whatif-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="whatif-footer">
        <strong>Prevention principle</strong>
        <p>
          Early review, clear responsibility and verified
          action can help prevent unresolved issues from being
          overlooked.
        </p>
      </footer>
    </div>
  );
}

export default WhatIfSimulator;
