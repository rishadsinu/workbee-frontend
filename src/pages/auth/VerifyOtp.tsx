import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Otp = () => {
  const [otp, setOtp] = useState("")

  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const handleVerify = async () => {
      try {
        const res = await axios.post('http://localhost:4000/verifyOtp',{userId, otp})
        localStorage.setItem('token',res.data.token)
        alert('Opt verified and registered successfully')
        navigate('/')
      } catch (error:any) {
        console.log(error)
        alert(error.response?.data?.message)
      }
  }

  return (
    <div>
      <form onSubmit={handleVerify}>
        <input type="text" placeholder="Enter Otp here" />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  )
}

export default Otp
