import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/assets/logo.png";
import FloatingIcons from "@/components/common/animatedIcons";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...registrationData } = form; 
      const res = await axios.post("http://localhost:4000/auth/register", registrationData);
      localStorage.setItem("token", res.data.token);
      alert("otp sent to your email address");
      navigate("/otp");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TaskBee Logo */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-2 pl-2">
          <img 
            onClick={() => navigate('/')} 
            src={Logo} 
            alt="TaskBee Logo" 
            className="h-9 w-35 cursor-pointer" 
          />
        </div>
      </div>

      <main className="relative flex items-center min-h-screen px-6 max-w-7xl mx-auto">
        {/* Left Side - Floating Icons */}
        <div className="flex-1">
          <FloatingIcons />
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1 max-w-md mx-auto mr-25">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h5 className="text-2xl font-bold text-gray-850 mb-2">Sign up</h5>
              <p className="text-sm text-gray-600">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-1.5">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-medium text-gray-700">
                  Enter your full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                  Enter your email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                  Create a password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700">
                  Confirm your password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={isLoading || !!(form.password && form.confirmPassword && form.password !== form.confirmPassword)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isLoading ? "Creating Account..." : "Sign up"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="flex-1 border-black text-black hover:bg-black hover:text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Sign in
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </Button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
