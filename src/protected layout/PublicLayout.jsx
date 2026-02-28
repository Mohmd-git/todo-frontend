import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const allowRoutes = [
    "/reset-password",
    "/forgot-password",
    "/verify-otp",
  ];

  const isAllowedRoute = allowRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (token && !isAllowedRoute) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;