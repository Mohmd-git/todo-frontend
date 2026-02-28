import { UserCircle, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/appSlices/authSlice";

import { apiSlice } from "../redux/backendApiRedux/apiSlice";
import { profileApi } from "../redux/api/profileapi";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const name =
    user?.name || (user?.email ? user.email.split("@")[0] : "User");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll animation logic
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop || window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () =>
      window.removeEventListener("scroll", handleScroll, true);
  }, []);

  // ✅ Clean Logout
  const handleLogout = () => {
    setOpen(false);

    // Clear redux auth
    dispatch(logout());

    // Clear localStorage safely
    localStorage.clear();

    // Reset all RTK Query caches
    dispatch(apiSlice.util.resetApiState());
    dispatch(profileApi.util.resetApiState());

    // Redirect
    navigate("/login", { replace: true });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="absolute top-6 right-6 z-40">
      <div ref={ref} className="relative">
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_8px_40px_rgb(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-500 p-1.5"
        >
          <span
            className={`text-sm font-bold text-slate-700 transition-all duration-500 overflow-hidden whitespace-nowrap ${
              isScrolled
                ? "max-w-0 opacity-0 ml-0 mr-0"
                : "max-w-[150px] opacity-100 ml-3 mr-2"
            }`}
          >
            {name}
          </span>

          <div className="bg-slate-100 text-slate-600 rounded-full p-1.5 shrink-0">
            <UserCircle size={20} strokeWidth={2.5} />
          </div>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-4 w-52 bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] border border-slate-100 overflow-hidden transition-all duration-300 origin-top-right ${
            open
              ? "opacity-100 scale-100 visible translate-y-0"
              : "opacity-0 scale-90 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors group"
            >
              <User
                size={18}
                strokeWidth={2.5}
                className="text-slate-400 group-hover:text-slate-900"
              />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors group"
            >
              <LogOut
                size={18}
                strokeWidth={2.5}
                className="text-rose-400 group-hover:text-rose-600"
              />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}