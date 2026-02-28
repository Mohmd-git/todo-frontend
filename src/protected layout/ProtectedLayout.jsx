import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
//   console.log("token", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
