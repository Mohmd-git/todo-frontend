import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2, Circle, ArrowRight, UserPlus } from "lucide-react";
import { useRegisterMutation } from "../redux/api/authapi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const hasUppercase = /[A-Z]/.test(username);
  const hasNumberInUsername = /\d/.test(username);
  const hasMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const hasNoSpace = !/\s/.test(password);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = hasUppercase && hasNumberInUsername && hasMinLength && hasNumber && hasSpecialChar && hasNoSpace && isValidEmail;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid) return toast.error("Please fix validation errors");
    
    try {
      await register({ username, email, password }).unwrap();
      localStorage.setItem("verifyEmail", email);
      toast.success("OTP sent to your email 🎉");
      navigate("/verify-otp");
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 relative overflow-hidden font-sans selection:bg-indigo-500/30 p-4">
      
      {/* Premium Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <form 
        onSubmit={handleRegister} 
        className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-5 sm:px-10 sm:py-4 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md transition-all duration-300 hover:border-white/10"
      >
        <div className="mb-2 text-center">
          <div className="bg-zinc-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/5 shadow-inner">
            <UserPlus className="text-indigo-400" size={28} strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-sm text-zinc-400 font-medium">Enter your details to get started.</p>
        </div>

        <div className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
              Username
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} strokeWidth={2.5} />
              <input
                type="text" placeholder="SuperAdmin1" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
              />
            </div>
            {username.length > 0 && (
              <div className="mt-3 flex gap-4 px-1">
                <DarkValidation isValid={hasUppercase} text="1 uppercase" />
                <DarkValidation isValid={hasNumberInUsername} text="1 number" />
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} strokeWidth={2.5} />
              <input
                type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-zinc-950/50 border ${email.length > 0 && !isValidEmail ? 'border-rose-900/50 focus:border-rose-500' : 'border-white/10 focus:border-indigo-500'} text-white pl-11 pr-4 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 ${email.length > 0 && !isValidEmail ? 'focus:ring-rose-500/50' : 'focus:ring-indigo-500/50'} focus:bg-zinc-900/50 transition-all duration-300`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} strokeWidth={2.5} />
              <input
                type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950/50 border border-white/10 text-white pl-11 pr-12 py-3.5 rounded-2xl text-[15px] font-medium placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-zinc-900/50 transition-all duration-300"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none">
                {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-1 px-1">
              <DarkValidation isValid={hasMinLength} text="6+ chars" />
              <DarkValidation isValid={hasNumber} text="1 number" />
              <DarkValidation isValid={hasSpecialChar} text="1 special char" />
              <DarkValidation isValid={hasNoSpace} text="No spaces" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit" 
            disabled={!isFormValid || isLoading}
            className="w-full mt-2 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:bg-zinc-800 disabled:bg-none disabled:text-zinc-500 disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              <>
                <span>Register</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        <p className="text-sm text-center text-zinc-500 mt-8 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

// Validation Component
function DarkValidation({ isValid, text }) {
  return (
    <div className="flex items-center gap-2">
      {isValid ? (
        <CheckCircle2 className="text-emerald-500" size={14} strokeWidth={3} />
      ) : (
        <Circle className="text-zinc-600" size={14} strokeWidth={2.5} />
      )}
      <span className={`text-[12px] font-semibold tracking-wide transition-colors duration-300 ${isValid ? "text-zinc-300" : "text-zinc-500"}`}>
        {text}
      </span>
    </div>
  );
}