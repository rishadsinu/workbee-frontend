import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth-service";
import ProfileDropDownMenu from "./profile-drop-down";
import { AuthHelper } from "@/utils/auth-helper";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = AuthHelper.getToken();
      const googleUser = AuthHelper.getUser();

      // If logged in using Google
      if (googleUser) {
        setUser(googleUser);

        if (!AuthHelper.getUserId()) {
          AuthHelper.setUserId(googleUser._id || googleUser.id);
        }
        return;
      }

      if (!token) return;

      try {
        // Backend verification
        const res = await AuthService.verifyUser();

        if (res.data.success) {
          const loggedUser = res.data.data;

          setUser(loggedUser);
          AuthHelper.setUserId(loggedUser._id || loggedUser.id);
        } else {
          AuthHelper.clearAuth();
          setUser(null);
        }
      } catch {
        AuthHelper.clearAuth();
        setUser(null);
      }
    };

    verifyUser();
  }, []);


  const handleLogout = () => {
    AuthHelper.clearAuth();
    setUser(null);
    navigate("/");
  };


  const handleNavigation = (path: string) => navigate(path);

  return (
    <header className="w-full flex justify-center mt-8">
      <nav className="w-[90%] max-w-8xl bg-white rounded-full shadow-sm border flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="text-2xl font-bold text-gray-900">WorkBee</div>

        {/* Links */}
        <ul className="flex space-x-8 text-gray-800 font-medium">
          <li>
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-black hover:font-semibold transition"
            >
              About Us
            </button>
          </li>

          {/* <li>
            <button
              onClick={() => handleNavigation("/worker/worker-dashboard")}
              className="hover:text-black hover:font-semibold transition"
            >
              {user?.role?.includes("worker")
                ? "Worker Dashboard"
                : "Apply to become a worker"}
            </button>
          </li> */}
          <li>
            <button
              onClick={() => {
                if (user?.role?.includes("worker")) {
                  handleNavigation("/worker/worker-dashboard");
                } else {
                  handleNavigation("/worker/apply-worker");
                }
              }}
              className="hover:text-black hover:font-semibold transition"
            >
              {user?.role?.includes("worker")
                ? "Worker Dashboard"
                : "Apply to become a worker"}
            </button>
          </li>


          <li>
            <button
              onClick={() => handleNavigation("/questions")}
              className="hover:text-black hover:font-semibold transition"
            >
              How It Works
            </button>
          </li>


        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full border hover:bg-gray-100 transition">
            <Sun className="w-5 h-5" />
          </button>

          {user ? (
            <ProfileDropDownMenu user={user} onLogout={handleLogout} />
          ) : (
            <Button
              onClick={() => handleNavigation("/login")}
              className="rounded-full px-5"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
