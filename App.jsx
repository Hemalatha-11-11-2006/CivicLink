import { Routes, Route } from "react-router-dom";

import CivicLinkApp from "./CivicLinkApp";
import IndustryDashboard from "./IndustryDashboard";
import UniversityPage from "./UniversityPage";
import GovernmentDashboard from "./GovernmentDashboard";

function App() {
  return (
    <Routes>

      <Route path="/" element={<CivicLinkApp />} />

      <Route
        path="/industry-dashboard"
        element={<IndustryDashboard />}
      />

      <Route
        path="/university-dashboard"
        element={<UniversityPage />}
      />

      <Route
        path="/government-dashboard"
        element={<GovernmentDashboard />}
      />

    </Routes>
  );
}

export default App;