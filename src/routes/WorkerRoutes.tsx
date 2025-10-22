import { Routes, Route } from "react-router-dom";
import ApplyWorker from "@/pages/worker/ApplyWorker";
import WorkerLayout from "@/layout/WorkerLayout";
import WorkerDashboard from "@/pages/worker/WorkerDashboard";
import WorkerLogin from "@/pages/worker/WorkerLogin";
import Works from "@/pages/worker/Works";

const WorkerRoutes = () => {
    return (
        <Routes>
            <Route path="worker-login" element={<WorkerLogin/>} />
            <Route path="apply-worker" element={<ApplyWorker/>} />

            <Route path="worker-dashboard" element={<WorkerLayout/>}>
                <Route index element={<WorkerDashboard/>} />
                <Route path="works" element={<Works/>} />
                
            </Route>
        </Routes>
    )
}

export default WorkerRoutes