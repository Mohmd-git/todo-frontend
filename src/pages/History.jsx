import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { X, CalendarDays, CheckCircle2, Clock, Inbox, Menu } from "lucide-react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGetHistoryQuery } from "../redux/api/todoapi";

export default function History() {
  const { data, isLoading } = useGetHistoryQuery();
  const history = data?.history || [];

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const truncateText = (text, limit = 80) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const filteredHistory = selectedDate
    ? history.filter(item =>
        dayjs(item.createdAt).isSame(selectedDate, "day")
      )
    : history;

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-zinc-900 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[140px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 blur-[140px] pointer-events-none mix-blend-multiply" />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        <Navbar />

        <div className="md:hidden px-6 py-4 flex items-center bg-white/60 backdrop-blur-xl border-b border-zinc-200/50 sticky top-0 z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white rounded-xl shadow-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all border border-zinc-100"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
          <span className="ml-4 font-bold text-zinc-800 tracking-tight">History</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-24 sm:p-10 sm:pt-28 lg:p-12 lg:pt-32 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl shadow-sm border border-emerald-200/50">
                  <CheckCircle2 className="text-emerald-600" size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-800 tracking-tight">
                    Completed Tasks
                  </h1>
                  <p className="text-zinc-500 font-medium mt-1 text-sm">
                    Review your past accomplishments
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 sm:gap-4 bg-white/60 backdrop-blur-xl p-2 sm:p-2.5 rounded-2xl border border-zinc-200/60 shadow-sm w-full md:w-auto">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex-1 min-w-0 md:w-48">
                    <DatePicker
                      label="Filter by date"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{
                        textField: { 
                          size: "small",
                          fullWidth: true,
                          sx: {
                            fieldset: { border: 'none' },
                            input: { color: '#3f3f46', fontWeight: 600, fontSize: '0.875rem' },
                            label: { color: '#a1a1aa', fontSize: '0.875rem' }
                          }
                        },
                        popper: {
                          sx: { zIndex: 9999 }
                        }
                      }}
                      className="bg-zinc-50/50 rounded-xl w-full"
                    />
                  </div>
                </LocalizationProvider>

                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="shrink-0 text-zinc-400 hover:text-rose-500 text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 transition-all text-center"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="relative flex h-10 w-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-emerald-500"></span>
                </div>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-24 px-6 rounded-[2.5rem] border border-dashed border-zinc-200 bg-zinc-50/50 flex flex-col items-center">
                <div className="bg-white h-20 w-20 rounded-[2rem] shadow-sm flex items-center justify-center mb-5 border border-zinc-100">
                  <Inbox className="text-zinc-300" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-zinc-800 tracking-tight">No history found</h3>
                <p className="text-zinc-500 mt-2 font-medium">
                  {selectedDate ? "No tasks were completed on this date." : "You haven't completed any tasks yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {filteredHistory.map(item => (
                  <div
                    key={item._id}
                    className="group bg-white/60 backdrop-blur-lg rounded-[2rem] border border-zinc-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-emerald-200 transition-all duration-400 p-6 flex flex-col h-full transform hover:-translate-y-1"
                  >
                    <p className="text-zinc-800 font-medium leading-relaxed flex-1 text-[15px]">
                      {truncateText(item.task)}
                    </p>

                    {item.task?.length > 80 && (
                      <button
                        onClick={() => setSelectedTask(item)}
                        className="text-emerald-600 font-semibold text-sm mt-3 text-left hover:text-emerald-700 transition-colors inline-flex items-center gap-1 w-max"
                      >
                        Read full task →
                      </button>
                    )}

                    <div className="mt-6 pt-5 border-t border-zinc-100 space-y-3">
                      <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-500">
                        <CalendarDays size={14} className="text-zinc-400" flex-shrink-0 />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Created</span>
                          <span className="text-zinc-600">
                            {dayjs(item.createdAt).format("DD MMM YYYY • HH:mm")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-500">
                        <Clock size={14} className="text-emerald-400" flex-shrink-0 />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-emerald-600/70">Completed</span>
                          <span className="text-zinc-600">
                            {dayjs(item.createdAt).format("DD MMM YYYY • HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          <div 
            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.1)] relative overflow-hidden flex flex-col max-h-[85vh] transform transition-transform duration-300 scale-100"
          >
            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight">
                  Task Details
                </h2>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 bg-white border border-zinc-200 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar">
              <div className="bg-zinc-50/50 border border-zinc-100 p-5 sm:p-6 rounded-2xl sm:rounded-3xl">
                <p className="whitespace-pre-wrap text-zinc-700 leading-relaxed font-medium text-sm sm:text-[15px]">
                  {selectedTask.task}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-zinc-200 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                  <CalendarDays className="text-zinc-400" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">Created At</span>
                    <span className="text-sm font-semibold text-zinc-700 mt-0.5">
                      {dayjs(selectedTask.createdAt).format("DD MMM YYYY, HH:mm")}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                  <Clock className="text-emerald-500" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-600/70">Completed At</span>
                    <span className="text-sm font-semibold text-emerald-800 mt-0.5">
                      {dayjs(selectedTask.createdAt).format("DD MMM YYYY, HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}