import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login-illustration.png";
import logo from "../assets/logo.png";
import googlelogo from "../assets/google.png"

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
    <div
      className="w-full h-screen m-0 p-0 flex items-center justify-center font-poppins relative"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="SnapWear Logo"
        className="absolute top-6 left-6 w-24"
      />

      {/* Login Card */}
      <div
        className="rounded-3xl shadow-lg flex overflow-hidden"
        style={{ width: "999px", height: "546px", backgroundColor: "#FFFFFF" }}
      >
        {/* Left Side */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#000000" }}>
            Log in to your account
          </h2>
          <p className="text-sm mb-5" style={{ color: "#6B7280" }}>
            Don’t have an account?{" "}
            <Link to="/register" className="underline font-medium" style={{ color: "#000000" }}>
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Email */}
            <div>
              <label className="block mb-1" style={{ color: "#000000" }}>
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: "#D1D5DB", color: "#000000" }}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1" style={{ color: "#000000" }}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: "#D1D5DB", color: "#000000" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-xs"
                style={{ color: "#6B7280" }}
              >
                
              </button>
            </div>

            {/* Show Password + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center" style={{ color: "#000000" }}>
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
                className="underline font-medium"
                style={{ color: "#000000" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between space-x-4 mt-2">
              {/* Google Button */}
              <button
                type="button"
                className="flex items-center justify-center py-2 rounded-full w-64"
                style={{
                  border: "1px solid #D1D5DB",
                  color: "#000000",
                  backgroundColor: "#FFFFFF",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F3F4F6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FFFFFF")
                }
              >
                <img
                  src={googlelogo}
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>

              <span className="text-sm" style={{ color: "#6B7280" }}>
                or
              </span>

              {/* Login Button */}
              <button
                type="submit"
                className="py-2 px-4 rounded-full font-medium w-28"
                style={{
                  backgroundColor: "#13151B",
                  color: "#D6FFF6",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#111827")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#000000")
                }
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
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
