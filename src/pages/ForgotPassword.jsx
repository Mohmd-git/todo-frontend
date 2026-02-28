import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useForgotPasswordMutation } from "../redux/api/authapi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      setSuccess(true);
      setEmail("");
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
                <ShieldAlert className="text-indigo-400" size={28} />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Forgot Password?
              </h1>

              <p className="text-sm text-zinc-400 font-medium">
                Enter your email address and we will send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
                    Email Address
                  </label>

                  <div className="relative group">
                    <Mail
                      className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors"
                      size={18}
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

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span>Sending link...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 hover:text-indigo-400 transition-colors group"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to log in
              </Link>
            </div>
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
              Reset Link Sent Successfully
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              A secure password reset link has been sent.
              <br />
              Please check your inbox.
              <br />
              If you don’t see it, kindly check your spam or junk folder.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}1