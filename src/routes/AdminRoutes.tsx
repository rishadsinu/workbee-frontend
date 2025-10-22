import { Route, Routes } from "react-router-dom";

//Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/layout/AdminLayout";
import Users from "@/pages/admin/UserManagement";
import WorkerManagement from "@/pages/admin/WorkerManagement";
import NewAppliersManagement from "@/pages/admin/NewAppliers";

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            
            <Route path="dashboard" element={<AdminLayout/>} >
                <Route index element={<AdminDashboard/>} />
                <Route path="users" element={<Users/>} />
                <Route path="workers" element={<WorkerManagement/>} />
                <Route path="new-appliers" element={<NewAppliersManagement/>} />
            </Route>
            
        </Routes>
    )
}

export default AdminRoute