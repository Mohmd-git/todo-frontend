import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, CheckCircle2, History, LineChart, Hexagon } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Good practice to clear token too!
    navigate("/login");
  };

  const navItems = [
    { name: "Tasks", path: "/", icon: CheckCircle2 },
    { name: "History", path: "/history", icon: History },
    { name: "Analysis", path: "/analysis", icon: LineChart },
  ];

  return (
    <>
      {/* OVERLAY (mobile only) - Upgraded to frosted glass */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-zinc-200/60 min-h-screen flex flex-col
        transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-zinc-100/80">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-md shadow-indigo-500/20">
              <Hexagon className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-extrabold text-zinc-800 tracking-tight">
              Mytek<span className="text-zinc-500 font-medium ml-0.5">Todo</span>
            </h1>
          </div>

          {/* CLOSE ICON (mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 mt-6 px-4 space-y-1.5">
          <div className="px-3 mb-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            Main Menu
          </div>
          
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-[15px] transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-600 transition-colors"}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT / PROFILE SECTION */}
        <div className="p-4 border-t border-zinc-100/80 bg-zinc-50/50 mt-auto">
          <button
            onClick={logout}
            className="group flex items-center justify-between w-full px-4 py-3.5 rounded-2xl bg-white border border-zinc-200/60 hover:border-rose-200 hover:bg-rose-50 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-zinc-100 p-2 rounded-xl group-hover:bg-rose-100 transition-colors">
                <LogOut size={18} strokeWidth={2.5} className="text-zinc-500 group-hover:text-rose-600 transition-colors" />
              </div>
              <span className="text-sm font-bold text-zinc-600 group-hover:text-rose-600 transition-colors">
                Sign Out
              </span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}