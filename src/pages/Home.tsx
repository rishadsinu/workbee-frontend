// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button"

// const Home = () => {
//   const navigate = useNavigate()

//   return (
//     <div>
//       <h1>Home Page</h1>

//       <div className="flex min-h-svh flex-col items-center justify-center">
//         <Button onClick={() => navigate("/login")}>Login</Button>
//         <Button onClick={() => navigate("/register")}>Register</Button>
//       </div>
      
//     </div>
//   );
// };

// export default Home;

"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Shield, Users, Link, Truck, Crown, MessageCircle, Moon, Sun } from "lucide-react"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const iconGridItems = [
    { icon: Plus, delay: "0ms" },
    { icon: TrendingUp, delay: "100ms" },
    { icon: Shield, delay: "200ms" },
    { icon: Users, delay: "300ms" },
    { icon: Link, delay: "400ms" },
    { icon: Truck, delay: "500ms" },
    { icon: Crown, delay: "600ms" },
    { icon: MessageCircle, delay: "700ms" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-lg">🐝</span>
          </div>
          <span className="text-xl font-semibold text-foreground">TaskBee</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-10 h-10 rounded-full p-0">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => navigate("/login")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full"
          >
            Sign in
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-between px-6 py-20 max-w-7xl mx-auto">
        {/* Left Side - Hero Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-6xl font-bold text-foreground leading-tight mb-6">
            Assign your task
            <br />
            to someone in just
            <br />
            <span className="text-foreground">90 seconds.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            No more stress, no more
            <br />
            waiting.
          </p>

          <Button
            onClick={() => navigate("/register")}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg rounded-lg"
          >
            Assign Now
          </Button>
        </div>

        {/* Right Side - Icon Grid */}
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {iconGridItems.map((item, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: item.delay }}
              >
                <item.icon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
            ))}
            {/* Empty space for 3x3 grid */}
            <div className="w-20 h-20"></div>
          </div>
        </div>
      </main>

      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          variant="outline"
          className="bg-background border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Ask your concern to AI
        </Button>
      </div>
    </div>
  )
}

export default Home
