import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useGetAnalysisQuery } from "../redux/api/analysisapi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { LayoutList, CheckCircle2, CircleDashed, Clock, TrendingUp, Activity, Menu } from "lucide-react";

export default function Analysis() {
  const { data } = useGetAnalysisQuery();
  const [isOpen, setIsOpen] = useState(false);
  
  const stats = data?.analysis || {};

  const total = stats.total || 0;
  const completed = stats.completed || 0;
  const pending = stats.pending || 0;
  const progress = stats.progress || 0;
  const completionRate = stats.completionRate || 0;
  const last7Days = stats.last7Days || [];

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
  ];

  const COLORS = ["#10b981", "#6366f1", "#f59e0b"];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 relative overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] left-[-10%] w-[70%] md:w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply" />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        <Navbar />

        <div className="md:hidden px-4 sm:px-6 py-3 flex items-center bg-white/60 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white rounded-xl shadow-sm text-slate-600 border border-slate-100 active:scale-95 transition-all"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
          <span className="ml-4 font-bold text-slate-800 tracking-tight">Performance</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-10 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

            <div className="mb-2 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Performance</h1>
              <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">An overview of your workspace productivity.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard title="Total Tasks" value={total} icon={LayoutList} color="text-blue-600" bg="bg-blue-50" />
              <StatCard title="Completed" value={completed} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
              <StatCard title="Pending" value={pending} icon={CircleDashed} color="text-slate-500" bg="bg-slate-100" />
              <StatCard title="In Progress" value={progress} icon={Clock} color="text-indigo-600" bg="bg-indigo-50" />
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">Completion Rate</h3>
                <span className="text-xl md:text-2xl font-black text-blue-600">{completionRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 md:h-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/80 backdrop-blur-xl p-3 sm:p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 pl-2">
                  <TrendingUp className="text-blue-500" size={18} /> Trend (Last 7 Days)
                </h3>
                {/* Removed fixed min-width to allow complete scaling */}
                <div className="w-full h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={last7Days} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        dy={10} 
                        /* Optional: on very small screens, you can angle the text if names are long */
                        // angle={-45} textAnchor="end"
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        width={30} 
                        tickFormatter={(value) => Math.round(value)}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f1f5f9' }} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
                      />
                      <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/60 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 md:mb-6 flex items-center gap-2">
                  <Activity className="text-indigo-500" size={18} /> Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      outerRadius={85} 
                      innerRadius={50} 
                      stroke="none" 
                      label={{ fill: '#64748b', fontSize: 11 }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[1.25rem] md:rounded-[1.5rem] border border-slate-200/60 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
      <div>
        <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{value}</h2>
      </div>
      <div className={`${bg} p-2.5 md:p-3 rounded-xl md:rounded-2xl`}>
        <Icon size={22} className={`${color} group-hover:scale-110 transition-transform duration-300`} strokeWidth={2.5} />
      </div>
    </div>
  );
}