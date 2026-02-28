import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Menu, Pencil, Check, Plus, Sparkles, ChevronDown, CircleDashed, Clock, CheckCircle2 } from "lucide-react";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
} from "../redux/api/todoapi";

export default function Todos() {
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, refetch } = useGetTodosQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const todos = data?.gettodolist || [];

  const addOrUpdateTodo = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    try {
      if (taskId) {
        await updateTodo({
          id: taskId,
          data: { task },
        }).unwrap();

        toast.success("Task updated");
        setTaskId(null);
      } else {
        await createTodo({ task }).unwrap();
        toast.success("Task created");
      }

      setTask("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const startEdit = (todo) => {
    setTask(todo.task);
    setTaskId(todo._id);
  };

  const updateStatus = async (todo, newStatus) => {
    try {
      await updateTodo({
        id: todo._id,
        data: { status: newStatus },
      }).unwrap();

      // Dynamic Toast Message based on the status selected
      if (newStatus === "completed") {
        toast.success("Task completed & stored in history 🎉");
      } else {
        toast.success(`Task moved to ${newStatus}`);
      }
      
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const pendingTodos = todos.filter((t) => t.status === "pending");
  const inProgressTodos = todos.filter((t) => t.status === "progress");

  return (
    // FIX 1: Changed min-h-screen to h-screen to lock the body height
    <div className="flex h-screen w-full bg-[#FAFAFA] text-zinc-900 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[140px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-400/20 blur-[140px] pointer-events-none mix-blend-multiply" />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* FIX 2: Added h-full so this column perfectly fits the screen height */}
      <div className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
        <Navbar />

        <div className="md:hidden px-6 py-4 flex items-center bg-white/60 backdrop-blur-xl border-b border-zinc-200/50 sticky top-0 z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white rounded-xl shadow-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* This div handles all the scrolling natively now */}
        <div className="flex-1 flex items-start justify-center pt-36 md:pt-40 pb-16 px-4 sm:px-8 overflow-y-auto custom-scrollbar w-full">
          <div className="w-full max-w-4xl space-y-16">
            
            {/* Super Premium Input (Command Palette Style) */}
            <form
              onSubmit={addOrUpdateTodo}
              className="group relative bg-white/70 backdrop-blur-2xl p-2.5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 flex flex-col sm:flex-row gap-3 transition-all duration-500 focus-within:shadow-[0_8px_40px_rgb(0,0,0,0.08)] focus-within:bg-white"
            >
              <div className="flex-1 relative flex items-center px-4">
                <Sparkles className="absolute left-6 text-zinc-300 group-focus-within:text-indigo-400 transition-colors duration-300" size={20} />
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder={taskId ? "Update this task..." : "What's on your mind?"}
                  rows={1}
                  className="w-full bg-transparent border-none pl-10 pr-4 py-4 resize-none focus:outline-none focus:ring-0 text-lg font-medium tracking-tight text-zinc-800 placeholder-zinc-400 overflow-hidden"
                  style={{ minHeight: '60px' }}
                />
              </div>

              <button
                type="submit"
                className={`self-end sm:self-auto sm:h-full px-8 py-4 rounded-3xl flex items-center justify-center gap-2.5 font-semibold text-white shadow-md transition-all duration-300 ${
                  taskId
                    ? "bg-zinc-900 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                }`}
              >
                {taskId ? (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    <span>Save Edit</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Create</span>
                  </>
                )}
              </button>
            </form>

            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-10 w-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-indigo-500"></span>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase">Syncing Workspace</p>
                </div>
              </div>
            )}

            {!isLoading && todos.length === 0 && (
              <div className="text-center py-20 px-6 rounded-[2.5rem] border border-dashed border-zinc-200 bg-zinc-50/50">
                <div className="bg-white h-16 w-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                  <Sparkles className="text-zinc-300" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800 tracking-tight">Zero tasks right now</h3>
                <p className="text-zinc-500 mt-2">Create a new task above to start building your day.</p>
              </div>
            )}

            {/* Lists Container */}
            <div className="space-y-12">
              {pendingTodos.length > 0 && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center gap-4 mb-6 px-2">
                    <h2 className="text-lg font-bold text-zinc-800 tracking-tight">To Do</h2>
                    <span className="bg-zinc-100/80 text-zinc-500 text-xs font-bold px-3 py-1 rounded-full border border-zinc-200">
                      {pendingTodos.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {pendingTodos.map((todo) => (
                      <TodoCard 
                        key={todo._id} 
                        todo={todo} 
                        startEdit={startEdit} 
                        updateStatus={updateStatus} 
                        deleteTodo={deleteTodo} 
                        refetch={refetch} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {inProgressTodos.length > 0 && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center gap-4 mb-6 px-2">
                    <h2 className="text-lg font-bold text-zinc-800 tracking-tight">In Progress</h2>
                    <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
                      {inProgressTodos.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {inProgressTodos.map((todo) => (
                      <TodoCard 
                        key={todo._id} 
                        todo={todo} 
                        startEdit={startEdit} 
                        updateStatus={updateStatus} 
                        deleteTodo={deleteTodo} 
                        refetch={refetch} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function TodoCard({ todo, startEdit, updateStatus, deleteTodo, refetch }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // NEW: Controls the custom popup
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusSelect = (newStatus) => {
    setIsDropdownOpen(false);
    if (newStatus !== todo.status) {
      updateStatus(todo, newStatus);
    }
  };

  // Opens the custom confirmation modal
  const triggerDelete = () => {
    if (isExploding) return;
    setShowConfirm(true);
  };

  // Actually executes the delete after user clicks "Destroy" in the modal
  const confirmDelete = async () => {
    setShowConfirm(false);
    setIsExploding(true);

    setTimeout(async () => {
      try {
        await deleteTodo(todo._id).unwrap();
        toast.success("Task Destroyed 💣💥");
        refetch();
      } catch {
        toast.error("Delete failed");
      }
    }, 500);
  };

  const statusConfig = {
    pending: { label: "To Do", bg: "bg-zinc-100/80", text: "text-zinc-600", border: "border-zinc-200/80", icon: CircleDashed, iconColor: "text-zinc-400" },
    progress: { label: "In Progress", bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200/50", icon: Clock, iconColor: "text-indigo-500" },
    completed: { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/50", icon: CheckCircle2, iconColor: "text-emerald-500" }
  };

  const currentStatus = statusConfig[todo.status] || statusConfig.pending;
  const CurrentIcon = currentStatus.icon;

  return (
    <>
      <div className={`group bg-white/60 backdrop-blur-lg p-5 rounded-2xl border border-zinc-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-zinc-300 transition-all duration-400 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-visible ${isDropdownOpen ? 'z-50' : 'z-10'} ${isExploding ? "scale-110 rotate-2 opacity-0 blur-sm" : "scale-100 rotate-0 opacity-100"}`}>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none rounded-2xl" />

        <div className="flex-1 pr-4 relative z-10">
          <p className="whitespace-pre-wrap font-medium text-zinc-800 leading-relaxed text-[15px]">
            {todo.task}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto relative z-10 w-full sm:w-auto justify-between sm:justify-end">
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all duration-200 ${currentStatus.bg} ${currentStatus.border} ${currentStatus.text} hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            >
              <CurrentIcon size={16} strokeWidth={2.5} className={currentStatus.iconColor} />
              <span className="text-sm font-bold tracking-tight">{currentStatus.label}</span>
              <ChevronDown size={14} strokeWidth={3} className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "opacity-50"}`} />
            </button>

            <div
              className={`absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-zinc-200/80 p-1.5 z-50 transition-all duration-200 origin-top-left ${
                isDropdownOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={() => handleStatusSelect("pending")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 text-left transition-colors group"
              >
                <CircleDashed size={16} strokeWidth={2.5} className="text-zinc-400 group-hover:text-zinc-600" />
                <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-800">To Do</span>
              </button>
              <button
                onClick={() => handleStatusSelect("progress")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 text-left transition-colors group"
              >
                <Clock size={16} strokeWidth={2.5} className="text-indigo-400 group-hover:text-indigo-600" />
                <span className="text-sm font-semibold text-zinc-600 group-hover:text-indigo-700">In Progress</span>
              </button>
              <div className="h-px bg-zinc-100 my-1 mx-2" />
              <button
                onClick={() => handleStatusSelect("completed")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-left transition-colors group"
              >
                <CheckCircle2 size={16} strokeWidth={2.5} className="text-emerald-400 group-hover:text-emerald-600" />
                <span className="text-sm font-semibold text-zinc-600 group-hover:text-emerald-700">Completed</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => startEdit(todo)}
            className="p-2.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            title="Edit Task"
          >
            <Pencil size={16} strokeWidth={2.5} />
          </button>

          {/* Bomb Delete Button -> Now triggers the custom popup */}
          <button
            onClick={triggerDelete}
            className="relative p-2.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            title="Destroy Task"
          >
            <span className={`transition-all duration-300 inline-block ${isExploding ? "scale-150" : ""}`}>
              💣
            </span>

            {isExploding && (
              <span className="absolute inset-0 flex items-center justify-center text-2xl animate-ping">
                💥
              </span>
            )}
          </button>

        </div>
      </div>

      {/* NEW: Custom Glassmorphism Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm px-4 transition-all">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-sm w-full border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-100 p-2.5 rounded-2xl">
                <span className="text-2xl block">💣</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Destroy Task?</h3>
            </div>
            
            <p className="text-zinc-500 text-[15px] leading-relaxed mb-8">
              Are you sure you want to blow up this task? This action is permanent and cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirm(false)} 
                className="px-5 py-2.5 rounded-xl text-zinc-600 bg-zinc-100 hover:bg-zinc-200 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                <span>💥</span> Yes, Destroy it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}