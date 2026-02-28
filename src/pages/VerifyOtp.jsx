import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { setCredentials } from "../redux/appSlices/authSlice";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "../redux/api/authapi";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const email = localStorage.getItem("verifyEmail");

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // ⏳ Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        otp: otp.trim(),
      }).unwrap();

      dispatch(
        setCredentials({
          token: res.token,
          user: res.user,
        })
      );

      localStorage.removeItem("verifyEmail");

      toast.success("Email verified 🎉");

      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();

      toast.success("New OTP sent 📩");

      setTimer(60);
      setCanResend(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-xl w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="bg-zinc-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-indigo-400" size={28} />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Verify Your Email
          </h1>

          <p className="text-sm text-zinc-400 mt-2">
            Enter the 6-digit code sent to
            <br />
            <span className="text-white font-semibold">{email}</span>
          </p>
        </div>

        <input
          type="text"
          placeholder="••••••"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full bg-zinc-950 border border-white/10 text-white text-center text-3xl tracking-[0.5em] py-4 rounded-2xl font-bold mb-6 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <button
          onClick={handleVerify}
          disabled={isLoading || otp.length !== 6}
          className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Confirm Code"}
          {!isLoading && <ArrowRight size={18} />}
        </button>

        <div className="mt-6 text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center justify-center gap-2 text-sm text-indigo-400 font-semibold mx-auto"
            >
              <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="text-sm text-zinc-500">
              Resend available in {timer}s
            </p>
          )}
        </div>

      </div>
    </div>
  );
}