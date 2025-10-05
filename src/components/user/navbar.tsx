
import { useState, useEffect } from "react"
import { Bell, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const res = await axios.get("http://localhost:4000/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.data.success) {
          setUser(res.data.data)
        } else {
          localStorage.removeItem("token")
          setUser(null)
        }
      } catch (err) {
        localStorage.removeItem("token")
        setUser(null)
      }
    }

    verifyUser()
  }, [])

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between w-full px-4">
        {/* app logo */}
        <div className="flex items-center gap-2 pl-2">
          <img src={Logo} alt="TaskBee Logo" className="h-9 w-35" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4 text-gray-700" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Star className="h-4 w-4 text-gray-700" />
            <span className="sr-only">Favorites</span>
          </Button>

          {user ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-9 w-9"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <User className="h-4 w-4 text-gray-700" />
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="h-7 px-4 text-xs cursor-pointer rounded-full bg-primary text-white hover:bg-primary/90"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
