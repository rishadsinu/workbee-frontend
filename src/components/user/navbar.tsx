import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth-service";
import ProfileDropDownMenu from "./profile-drop-down";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      const googleUser = localStorage.getItem("user");

      if (googleUser) {
        const parsedUser = JSON.parse(googleUser);
        setUser(parsedUser);
        if (!localStorage.getItem("userId")) {
          localStorage.setItem("userId", parsedUser._id || parsedUser.id);
        }
        return;
      }

      if (!token) return;

      try {
        const res = await AuthService.verifyUser();

        if (res.data.success) {
          setUser(res.data.data);
          localStorage.setItem("userId", res.data.data._id || res.data.data.id);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setUser(null);
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
          <li>
            <button
              onClick={() => handleNavigation("/questions")}
              className="hover:text-black hover:font-semibold transition"
            >
              How It Works
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/contact")}
              className="hover:text-black hover:font-semibold transition"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Right side */}
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