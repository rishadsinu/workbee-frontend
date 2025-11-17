import FloatingIcons from "@/components/common/animatedIcons"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { AuthHelper } from "@/utils/user-auth-helper"


const VerifyOtp = () => {
  const [otp, setOtp] = useState("")

  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:4000/auth/verifyOtp', { userId, otp });

      if (res.data.success) {
        AuthHelper.setToken(res.data.data.token)
        alert(res.data.message);
        navigate('/');
      } else {
        alert(res.data.message || 'OTP verification failed');
      }

    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'OTP verification failed');
    }
  };


  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* TaskBee Logo */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-2 pl-2">
            <img onClick={() => navigate('/')} src={Logo} alt="TaskBee Logo" className="h-9 w-35" />
          </div>
        </div>


        <main className="relative flex items-center min-h-screen px-6 max-w-7xl mx-auto">

          {/* icons */}
          <div className="flex-1">
            <FloatingIcons />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 max-w-md mx-auto mr-25">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 text-center mb-5">
                    Enter verification code we have sent to your email
                  </label>

                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                        value={otp[index] || ''}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow empty value (backspace) OR single digit
                          if (value === "" || /^[0-9]$/.test(value)) {
                            const newOtp = otp.split("");
                            newOtp[index] = value;
                            setOtp(newOtp.join(""));

                            // Auto focus next input if a digit is typed
                            if (value !== "" && index < 4) {
                              document.getElementById(`otp-${index + 1}`)?.focus();
                            }
                          }
                        }}

                        onKeyDown={(e) => {
                          // Handle backspace
                          if (e.key === 'Backspace' && !otp[index] && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pastedData = e.clipboardData.getData('text').slice(0, 5);
                          if (pastedData.match(/^[0-9]+$/)) {
                            setOtp(pastedData);
                          }
                        }}
                        required
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full  rounded-lg transition-colors focus:ring-2 focus:ring-blue-500"
                >
                  Verify OTP
                </Button>
                {/* Resend Section */}
                <p className="text-center text-sm text-gray-600">
                  Didn’t receive the code?{" "}
                  <button
                    type="button"
                    onClick={() => alert("Resend OTP clicked")}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Resend OTP
                  </button>
                </p>
              </form>


            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default VerifyOtp
