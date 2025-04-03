import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login-illustration.png";
import logo from "../assets/logo.png";

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
    <div className="w-full h-screen m-0 p-0 flex items-center justify-center bg-white font-poppins relative">
      {/* Logo - outside main container */}
      <img
        src={logo}
        alt="SnapWear Logo"
        className="absolute top-6 left-6 w-24"
      />

      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-3xl w-[999px] h-[546px] flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p className="text-sm text-gray-600 mb-5">
            Don’t have an account?{" "}
            <Link to="/register" className="underline font-medium text-black">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Email */}
            <div>
              <label className="block mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-xs text-gray-500"
              >
                
              </button>
            </div>

            {/* Show password + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                Show password
              </label>

              <Link
                to="/forgot-password"
                className="text-black font-medium underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between space-x-4 mt-2">
              <button
                type="button"
                className="w-64 flex items-center justify-center border border-gray-400 py-2 rounded-full hover:bg-gray-100"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>

              <span className="text-sm text-gray-500">or</span>

              <button
                type="submit"
                className="w-28 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-900"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Full Image */}
        <div className="w-1/2 h-full">
          <img
            src={loginImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
