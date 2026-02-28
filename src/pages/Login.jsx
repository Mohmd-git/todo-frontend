import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { setCredentials } from "../redux/appSlices/authSlice";
import { useLoginMutation } from "../redux/api/authapi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await Login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          token: user.token,
          user: user.user,
        })
      );

      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      if (error?.data?.message === "Please verify your email before login") {
        toast.warning("Please verify your email first");
        navigate("/verify-otp", { state: { email } });
        return;
      }

      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 relative overflow-hidden font-sans selection:bg-indigo-500/30 p-4">
      
      {/* Premium Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <form
        onSubmit={handleLogin}
        className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md transition-all duration-300 hover:border-white/10"
      >
        <div className="mb-10 text-center">
          <div className="bg-zinc-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/5 shadow-inner">
            <Sparkles className="text-indigo-400" size={28} strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 font-medium">
            Log in to continue managing your tasks.
          </p>
        </div>

        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
              Email Address
            </label>
            <div className="relative group">
              <Mail 
                className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" 
                size={18} 
                strokeWidth={2.5} 
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
              Password
            </label>
            <div className="relative group">
              <Lock 
                className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" 
                size={18} 
                strokeWidth={2.5} 
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm gap-4 sm:gap-0">
          <Link
            to="/forgot-password"
            className="text-zinc-400 hover:text-white font-medium transition-colors"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}