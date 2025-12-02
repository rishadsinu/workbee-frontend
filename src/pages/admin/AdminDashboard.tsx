import { AuthHelper } from "@/utils/auth-helper";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    AuthHelper.clearAuth()
    navigate("/admin");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-black text-white px-3 py-1 rounded-full hover:bg-black-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;


