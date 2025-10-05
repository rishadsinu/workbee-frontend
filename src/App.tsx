import { BrowserRouter as Router } from "react-router-dom";

// import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "./components/mode-toggle";

import UserRoute from "./routes/UserRoutes";
import AdminRoute from "./routes/AdminRoutes";

const App = () => {
  return (

    <Router>
      <UserRoute />
      <AdminRoute />

      {/* dark and light mode setep */}
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
      </ThemeProvider> */}
      
    </Router>

  );
};

export default App;
