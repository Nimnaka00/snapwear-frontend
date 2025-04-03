import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImage from "../assets/login-illustration.png"; // Replace with your image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: Connect to backend
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-poppins relative">
      {/* Logo Top Left */}
      <img
        src={logo}
        alt="SnapWear Logo"
        className="absolute top-6 left-6 w-24"
      />

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start px-6 md:px-20 py-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-600 mb-6">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-24 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember for 30 days
            </label>
            <Link to="/forgot-password" className="text-black underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 font-medium"
          >
            Sign in
          </button>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google icon"
              className="mr-2"
            />
            Sign in with Google
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black underline font-medium">
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
