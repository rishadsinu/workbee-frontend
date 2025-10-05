import { useNavigate } from "react-router-dom"


const AdminDashboard = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }
  return (
    <div>
      <h1>Admin DashBoard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminDashboard
