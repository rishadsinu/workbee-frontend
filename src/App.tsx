import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import WorkerRoutes from "./routes/WorkerRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User side */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Admin side */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Worker side */}
        <Route path="/worker/*" element={<WorkerRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
