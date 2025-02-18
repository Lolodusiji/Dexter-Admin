import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Main_Logo.svg";
import { publicApi } from "../../libs/config/axios-instance";



const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await publicApi.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('accessToken', res.data.accessToken)


      navigate("/admin/subscribers");
    } catch (error) {
      console.log({ error });
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <img src={logo} alt="MyDexter Logo" className="mx-auto mb-2 " />
          {/* <p className="text-gray-500 text-sm mb-6">
            Your personal AI-powered SEO specialist
          </p> */}
          <h2 className="text-xl font-medium mt-4 mb-6">Admin</h2>
        </div>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D68FB] focus:border-[#6D68FB] placeholder:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D68FB] focus:border-[#6D68FB] placeholder:text-sm"
            />
            <button
              type="button"
              className="absolute right-2 top-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-gray-500" />
              ) : (
                <FaRegEye className="text-gray-500" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold bg-[#6D68FB] text-white rounded-full shadow ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#6D68FB] hover:bg-[#6D68FB] focus:outline-none focus:ring-2 focus:ring-[#6D68FB]"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
