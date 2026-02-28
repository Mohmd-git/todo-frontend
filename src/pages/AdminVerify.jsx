import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("Full URL:", location.search); //  check query string
    console.log("Token from URL:", token);     //  check extracted token

    if (token) {
      localStorage.setItem("adminToken", token);
      console.log("Token stored in localStorage:", localStorage.getItem("adminToken")); 
      navigate("/admin");
    } else {
      console.log("No token found in URL");
      navigate("/admin-login");
    }
  }, [location, navigate]);

  return <div className="p-10 text-center">Verifying...</div>;
};

export default AdminVerify;