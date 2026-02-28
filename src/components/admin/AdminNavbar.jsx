import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail") || "Admin";
  const initial = adminEmail.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin-login");
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-3 flex justify-between items-center transition-all">
      
      {/* Spacing for Mobile Toggle */}
      <div className="w-10 lg:hidden" />

      {/* ADDED ml-auto HERE to force it to the right */}
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        
        {/* Admin Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight truncate max-w-[150px]">
              {adminEmail}
            </p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              Admin
            </p>
          </div>
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {initial}
          </div>
        </div>

        <div className="hidden md:block h-6 w-px bg-slate-200" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-all duration-200"
        >
          <span className="text-sm font-semibold hidden md:inline">Logout</span>
          <div className="p-2 rounded-lg bg-slate-50 md:bg-transparent group-hover:bg-rose-50 transition-colors">
            <LogOut size={18} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;