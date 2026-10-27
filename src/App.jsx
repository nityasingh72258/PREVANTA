import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";

import StudentDashboard from "./Pages/StudentDashboard";
import ReportIssue from "./Pages/ReportIssue";
import ComplaintDetails from "./Pages/ComplaintDetails";
import ComplaintTracking from "./Pages/ComplaintTracking";

import DispatcherDashboard from "./Admin/DispatcherDashboard";
import ComplaintReview from "./Admin/ComplaintReview";

import PatternIntelligence from "./Pages/PatternIntelligence";
import WhatIfSimulator from "./Pages/WhatIfSimulator";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Student View */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/report"
          element={<ReportIssue />}
        />

        <Route
          path="/complaint"
          element={<ComplaintDetails />}
        />

        <Route
          path="/tracking"
          element={<ComplaintTracking />}
        />


        {/* Admin View */}

        <Route
          path="/admin"
          element={<DispatcherDashboard />}
        />

        <Route
          path="/admin/complaint"
          element={<ComplaintReview />}
        />

        {/* New PREVANTA Features */}

<Route
  path="/pattern-intelligence"
  element={<PatternIntelligence />}
/>

<Route
  path="/what-if-simulator"
  element={<WhatIfSimulator />}
/>

      </Routes>

    </BrowserRouter>

  );
}


export default App;