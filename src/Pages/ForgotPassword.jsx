import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const api_url = import.meta.env.VITE_API_URL;

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${api_url}/api/user/forgot-password`,
        { email }
      );

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      setStep(2);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${api_url}/api/user/reset-password`,
        {
          email,
          password,
          otp,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password Changed Successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700">

      <div className="w-[420px] p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-200 mb-8">
          {step === 1
            ? "Enter your email to get OTP"
            : "Enter OTP and new password"}
        </p>

        {step === 1 ? (
          <form onSubmit={sendOtp}>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white mb-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Send OTP
            </button>

          </form>
        ) : (
          <form onSubmit={resetPassword} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Reset Password
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;