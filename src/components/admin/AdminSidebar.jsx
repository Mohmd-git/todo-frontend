import React, { useState } from "react";
import { LayoutDashboard, Users, BarChart3, LogOut, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard", end: true },
    { to: "/admin/analytics", icon: <BarChart3 size={20} />, label: "Analytics", end: false },
    { to: "/admin/users", icon: <Users size={20} />, label: "Users", end: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <>
      {/* 1. Hamburger Button - Hidden when Sidebar is open OR on Desktop */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700"
        >
          <Menu size={24} />
        </button>
      )}

      {/* 2. Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. The Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 p-6 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:top-0 h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Header with Brand and Close Button */}
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">TaskMaster</h1>
          </div>

          {/* Close Button - Only visible on Mobile when open */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "hover:bg-slate-800 hover:text-white"}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;