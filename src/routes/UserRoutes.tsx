
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/user/Home";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import Otp from "@/pages/user/VerifyOtp";
import ForgotPassword from "@/pages/user/ForgotPassword";
import ResetPassword from "@/pages/user/ResetPassword"
import TaskBookForm from "@/pages/user/TaskBookForm";

const UserRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="otp" element={<Otp/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="reset-password/:token" element={<ResetPassword/>} />
        <Route path="task-booking" element={<TaskBookForm/>} />
    </Routes>
  )
}

export default UserRoute





