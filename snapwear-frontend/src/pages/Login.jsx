import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-4xl w-full bg-gray-50 shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Log in to your account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Don’t have an account? <Link to="/register" className="text-black font-medium hover:underline">Sign up</Link>
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input type="email" className="w-full border rounded-md px-3 py-2" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div className="mb-2 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-sm text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-sm text-gray-700 underline hover:text-black">
              Forgot Password?
            </Link>
          </div>

          {/* Show Password Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm">Show password</label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center mb-4">
            <button className="flex items-center justify-center w-full border rounded-full px-4 py-2 mr-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
            <span className="mx-2 text-gray-400">or</span>
            <button className="bg-black text-white rounded-full px-6 py-2 hover:opacity-90">Log in</button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full md:w-1/2 bg-white p-4">
          <img
            src="/illustration-login.png"
            alt="Fashion Illustration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
