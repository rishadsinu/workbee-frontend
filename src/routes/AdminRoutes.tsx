import { Route , Routes} from "react-router-dom";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLogin/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        </Routes>
    )
}

export default AdminRoute