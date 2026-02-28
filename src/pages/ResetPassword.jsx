import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { KeyRound, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useResetPasswordMutation } from "../redux/api/authapi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const isMinLength = newPassword.length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        id,
        newPassword,
      }).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 relative overflow-hidden font-sans p-4">

      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md transition-all duration-300 hover:border-white/10">

        {!success ? (
          <>
            <div className="mb-10 text-center">
              <div className="bg-zinc-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/5 shadow-inner">
                <KeyRound className="text-indigo-400" size={28} />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Set New Password
              </h1>

              <p className="text-sm text-zinc-400 font-medium">
                Please enter your new secure password below.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
                    New Password
                  </label>

                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors"
                      size={18}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-12 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Condition */}
                  <div className="mt-3 text-xs">
                    <div className={`flex items-center gap-2 ${isMinLength ? "text-emerald-400" : "text-zinc-500"}`}>
                      <CheckCircle2 size={14} className={isMinLength ? "" : "opacity-40"} />
                      Password must be at least 10 characters
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isMinLength}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-sm text-center text-zinc-500 mt-8 font-medium">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2
                size={70}
                className="text-emerald-500 animate-bounce"
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-3">
              Password Updated Successfully
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Your password has been securely updated.
              <br />
              Redirecting you to login...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}