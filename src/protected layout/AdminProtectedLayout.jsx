import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedLayout = () => {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default AdminProtectedLayout;