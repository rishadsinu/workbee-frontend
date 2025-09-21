import { useState, useEffect } from "react"
import { Bell, Star, User, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    // check user is logined
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) return;
            try {
                const res = await axios.get('http://localhost:4000/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },

                })
                setUser(res.data.payload)
            } catch (err) {
                localStorage.removeItem('token')
                setUser(null)
            }
        }
        verifyUser()
    }, [])

    // dark mode
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark")
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <nav className="w-full bg-background border-b border-border px-6 py-3">
            <div className="flex items-center justify-between w-full px-4">

                {/* app logo */}
                <div className="flex items-center gap-2 pl-2">
                    <img src={Logo} alt="TaskBee Logo" className="h-9 w-35" />
                </div>


                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
                        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Star className="h-4 w-4" />
                        <span className="sr-only">Favorites</span>
                    </Button>

                    {user ? (
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <User className="h-4 w-4" />
                            <span className="sr-only">User profile</span>
                        </Button>
                    ) : (
                        <Button onClick={() => navigate("/login")}>Login</Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
