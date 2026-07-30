import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${api_url}/api/user/login`,
        formData
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token)
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.userData)
        );

        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Signed in successfully"
        }).then(() => {
          navigate("/dashboard");
        });

        setFormData({
          email: "",
          password: "",
        });
      }
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

      <form
        onSubmit={loginUser}
        className="w-[420px] p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-200 mb-8">
          Login to your account
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-white mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-white mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            required
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <Link
            to="/forgot-password"
            className="text-blue-200 hover:text-white hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-200 mt-5">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-white hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;