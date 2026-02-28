import { Routes, Route, Navigate } from "react-router-dom";

// User Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Todos from "./pages/Todos";
import History from "./pages/History";
import Analysis from "./pages/Analysis";
import Profile from "./pages/Profile";

// Admin Pages
import Admin from "./pages/Admin";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";
import AdminLogin from "./pages/AdminLogin";
import AdminVerify from "./pages/AdminVerify";

// Layouts
import PublicLayout from "./protected layout/PublicLayout";
import ProtectedLayout from "./protected layout/ProtectedLayout";
import AdminProtectedLayout from "./protected layout/AdminProtectedLayout";

export default function App() {
  return (
    <Routes>
      {/* --- PUBLIC USER ROUTES --- */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Route>

      {/* --- PROTECTED USER ROUTES --- */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Todos />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* --- ADMIN AUTH ROUTES (Public-ish) --- */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/verify" element={<AdminVerify />} />

      {/* --- PROTECTED ADMIN ROUTES (Consolidated) --- */}
      <Route element={<AdminProtectedLayout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>

      {/* --- CATCH ALL / 404 --- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}