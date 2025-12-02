import { Route, Routes } from "react-router-dom";
import Home from "@/pages/user/Home";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import Otp from "@/pages/user/VerifyOtp";
import ForgotPassword from "@/pages/user/ForgotPassword";
import ResetPassword from "@/pages/user/ResetPassword";
import TaskBookForm from "@/pages/user/TaskBookForm";
import Dashboard from "@/pages/user/UserDashboard";

// inner dashboard components
import DashboardHome from "@/components/user/dashboard/DashboardHome";
import MyWorks from "@/components/user/dashboard/MyWorks";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="otp" element={<Otp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="task-booking" element={<TaskBookForm />} />

      {/* User Dashboard Routes */}
      <Route path="/user-dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="works" element={<MyWorks />} />
      </Route>
    </Routes>
  );
};

export default UserRoute;
