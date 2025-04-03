import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login-illustration.png"; // Replace with your actual image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: Connect to your backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold underline text-black">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label className="text-sm">Show password</label>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-black font-medium underline">
                Forgot Password?
              </Link>
            </div>

            {/* Google Auth + Submit */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="w-full flex items-center justify-center border border-gray-400 py-2 rounded-full hover:bg-gray-100"
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
                className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-900"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100">
          <img
            src={loginImage}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
