import { Route , Routes} from "react-router-dom";
import Login from "@/pages/auth/Login";

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="admin" element={<Login/>}/>
        </Routes>
    )
}

export default AdminRoute