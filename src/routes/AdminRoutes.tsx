import { Route, Routes } from "react-router-dom";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/layout/AdminLayout";

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            
            <Route
                path="dashboard"
                element={
                    <AdminLayout>
                        <AdminDashboard />
                    </AdminLayout>
                }
            />
        </Routes>
    )
}

export default AdminRoute