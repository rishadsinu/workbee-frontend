import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
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


