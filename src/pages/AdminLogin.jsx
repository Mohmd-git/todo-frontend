import React, { useState } from "react";
import { toast } from "react-toastify";
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAdminLoginMutation } from "../redux/api/adminAuthApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await adminLogin({ email }).unwrap();
      setSuccess(true);
      setEmail("");
    } catch (error) {
      toast.error(error?.data?.message || "Unauthorized admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 relative overflow-hidden p-4">

      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md transition-all duration-300 hover:border-white/10">

        {!success ? (
          <>
            <div className="mb-8 text-center">
              <div className="bg-zinc-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/5 shadow-inner">
                <ShieldCheck className="text-indigo-400" size={28} />
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
                Admin Secure Access
              </h1>

              <p className="text-sm text-zinc-400 font-medium">
                Enter your authorized admin email to receive a secure magic login link.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative group mb-6">
                <Mail
                  className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@gmail.com"
                  className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
                />
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
                    <span>Send Secure Link</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fadeIn">
            <div className="flex justify-center mb-6">
              <CheckCircle2
                size={70}
                className="text-emerald-500 animate-bounce"
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-3">
              Link Sent Successfully
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed">
              A secure sign-in link has been sent. Please check your inbox.
              <br />
              If you don’t see it, kindly check your spam or junk folder.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminLogin;