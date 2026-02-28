import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { ArrowLeft, CheckCircle2, Clock, Loader2, LayoutGrid, User } from "lucide-react";
import { useGetUsersQuery } from "../redux/api/userapi";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Connect to Real API
  const { data: response, isLoading } = useGetUsersQuery();
  const users = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex bg-[#f8fafc] min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0"> {/* min-w-0 prevents flex items from overflowing */}
        <AdminNavbar />
        
        <main className="p-4 md:p-8 overflow-y-auto">
          
          {/* Header Section */}
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                {selectedUser ? `${selectedUser.username}'s Tasks` : "Users Management"}
              </h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                {selectedUser 
                  ? `Viewing progress for ${selectedUser.email}` 
                  : `Monitoring ${users.length} active users`}
              </p>
            </div>
            {selectedUser && (
              <button 
                onClick={() => setSelectedUser(null)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition shadow-sm font-medium text-sm"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
          </div>

          {!selectedUser ? (
            <>
              {/* DESKTOP TABLE: Hidden on Mobile */}
              <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-8 py-5">User Details</th>
                      <th className="px-8 py-5">Activity</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-800 text-base">{user.username}</div>
                          <div className="text-sm text-slate-400 font-medium">{user.email}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-xl text-xs font-bold border border-indigo-100/50">
                            {user.tasks?.length || 0} Tasks
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all"
                          >
                            View Progress
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS: Visible only on small screens */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.map((user) => (
                  <div key={user._id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-transform" onClick={() => setSelectedUser(user)}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                           <User size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{user.username}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[150px]">{user.email}</p>
                        </div>
                      </div>
                      <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                        {user.tasks?.length || 0} Tasks
                      </span>
                    </div>
                    <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                      View Progress
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* TASK LIST: Grid already works well, just adjust padding and columns */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
              {selectedUser.tasks && selectedUser.tasks.length > 0 ? (
                selectedUser.tasks.map((task, index) => (
                  <div key={index} className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm transition-all group">
                    <div className="flex justify-between items-start mb-4 md:mb-5">
                      <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${
                        task.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {task.status === 'completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                      </div>
                      <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                        task.status === 'completed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base md:text-lg mb-2 truncate">
                      {task.task}
                    </h3>
                    <p className="text-slate-400 text-[11px] md:text-xs font-medium leading-relaxed">
                      Current phase: {task.status}. Monitoring updates.
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 md:py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                  <LayoutGrid className="text-slate-200 mb-4" size={40} />
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center px-4">No Active Tasks Found</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;