import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CheckCircle, Clock, List, Users } from "lucide-react";
import { useGetAdminDashboardQuery } from "../redux/api/adminApi";

const Admin = () => {
  const { data, isLoading, error } = useGetAdminDashboardQuery();

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading dashboard</div>;

  const stats = data?.stats;

  const chartData = [
    { name: "Completed", value: stats?.completed || 0, color: "#6366f1" },
    { name: "In Progress", value: stats?.inProgress || 0, color: "#f59e0b" },
    { name: "Pending", value: stats?.pending || 0, color: "#94a3b8" },
  ];

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-8 overflow-y-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
            <p className="text-slate-500">Live admin analytics</p>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card title="Total Users" value={stats?.totalUsers || 0} icon={<Users className="text-blue-600" />} />
            <Card title="Total Tasks" value={stats?.totalTasks || 0} icon={<List className="text-indigo-600" />} />
            <Card title="Completed" value={stats?.completed || 0} icon={<CheckCircle className="text-emerald-600" />} />
            <Card title="Pending" value={stats?.pending || 0} icon={<Clock className="text-amber-600" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6">Task Distribution</h3>

              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Users Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6">Users Overview</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-sm uppercase border-b">
                      <th className="pb-4">Username</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Total Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.users?.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-slate-50">
                        <td className="py-4 font-medium">{user.username}</td>
                        <td className="py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="py-4">{user.totalTasks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-slate-500 text-sm">{title}</h4>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

export default Admin;