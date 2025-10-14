import { Routes, Route } from "react-router-dom";
import ApplyWorker from "@/pages/worker/ApplyWorker";

const WorkerRoutes = () => {
    return (
        <Routes>
            <Route path="apply-worker" element={<ApplyWorker/>} />
        </Routes>
    )
}

export default WorkerRoutes