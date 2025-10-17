import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthService } from "@/services/auth-service";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      const googleUser = localStorage.getItem("user")

      if (googleUser) {
        setUser(JSON.parse(googleUser))
        return;
      }

      if (!token) return;

      try {
        // const res = await axios.get("http://localhost:4000/auth/verify", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        const res = await AuthService.verifyUser(token)

        if (res.data.success) {
          setUser(res.data.data);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    verifyUser();
  }, []);


  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
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
        {/* <ul className="flex space-x-8 text-gray-800 font-medium">
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
        </ul> */}

        {/* Right side */}
        <div className="flex items-center space-x-4 relative">
          <button className="p-2 rounded-full border hover:bg-gray-100 transition">
            <Sun className="w-5 h-5" />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="p-2 rounded-full border hover:bg-gray-100 transition"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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

