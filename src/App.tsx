import { BrowserRouter as Router} from "react-router-dom";
import UserRoute from "./routes/UserRoutes";
import AdminRoute from "./routes/AdminRoutes";

const App = () => {
  return (
    <Router>
      <UserRoute/>
      <AdminRoute/>
    </Router>
  );
};

export default App;
