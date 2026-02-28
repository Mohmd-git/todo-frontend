import React, { useState, useMemo } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useGetAdminDashboardQuery } from "../redux/api/adminApi";
import { Trophy } from "lucide-react";

const AdminAnalytics = () => {
  const { data, isLoading } = useGetAdminDashboardQuery();
  const [search, setSearch] = useState("");

  console.log("data", data)

  const users = data?.users || [];

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.completionRate - a.completionRate);
  }, [users, search]);

  const topPerformer = filteredUsers[0];

  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-8 overflow-y-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                User Performance Analytics
              </h1>
              <p className="text-slate-500">
                Track productivity and completion rates
              </p>
            </div>

            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-slate-500">
              Loading analytics...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  isTop={topPerformer?._id === user._id}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const UserCard = ({ user, isTop }) => {
  const badgeColor =
    user.performance === "Good"
      ? "bg-emerald-100 text-emerald-600"
      : user.performance === "Average"
      ? "bg-amber-100 text-amber-600"
      : "bg-rose-100 text-rose-600";

  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition hover:shadow-md ${
        isTop ? "ring-2 ring-indigo-500" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-slate-800">{user.email}</h3>
          <p className="text-xs text-slate-400">
            Last Activity:{" "}
            {user.lastActivity
              ? new Date(user.lastActivity).toLocaleDateString()
              : "No Activity"}
          </p>
        </div>

        {isTop && (
          <div className="flex items-center gap-1 text-indigo-600 text-sm font-bold">
            <Trophy size={16} />
            Top
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <Stat label="Total" value={user.totalTasks} />
        <Stat label="Completed" value={user.completedTasks} />
        <Stat label="In Progress" value={user.inProgressTasks} />
        <Stat label="Pending" value={user.pendingTasks} />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-indigo-600">
          {user.completionRate}%
        </div>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
        >
          {user.performance}
        </span>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-slate-50 p-3 rounded-xl text-center">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="font-bold text-slate-700">{value}</p>
  </div>
);

export default AdminAnalytics;