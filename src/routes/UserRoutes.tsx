
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/user/Home";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import Otp from "@/pages/user/VerifyOtp";

const UserRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="otp" element={<Otp/>}/>
    </Routes>
  )
}

export default UserRoute





