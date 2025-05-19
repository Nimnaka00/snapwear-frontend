// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../utils/api';

import logo from '../../assets/Logo.png';
import googleLogo from '../../assets/google-logo.png';
import SigninImage from '../../assets/Signin_image.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', formData);
      const { token, user } = res.data;

      // store token & user
      localStorage.setItem('snapwear-token', token);
      localStorage.setItem('snapwear-user', JSON.stringify(user));

      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8">
      <img src={logo} alt="Logo" className="h-[81.47px] w-[117px] mb-8" />

      <div className="mx-auto max-w-[999px] w-full bg-snow rounded-[32px] shadow-[6px_6px_20px_1px_rgba(0,0,0,0.25)] flex flex-col md:flex-row overflow-hidden h-[546px]">
        {/* Left: form */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-8 w-full md:w-[591px]">
          <h1 className="text-[38px] font-semibold leading-[58px] text-textMain mb-2">
            Log in to your account
          </h1>
          <p className="text-[16px] font-medium text-textMain mb-2">
            Don’t have an account?{' '}
            <Link to="/register" className="ml-[13px] underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-dustyGray text-[16px] font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full md:w-[543px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-dustyGray text-[16px] font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full md:w-[543px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              />
              <div className="text-right mt-1 w-full md:w-[543px]">
                <Link to="/resetpassword" className="text-russianViolet text-[14px] font-medium underline block">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Show password */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(prev => !prev)}
              />
              <label htmlFor="showPassword" className="text-textMain text-[16px] font-medium">
                Show password
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 items-center w-full md:w-[543px]">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-darkVoid text-textMain text-[16px] font-medium rounded-full h-[64px] w-[256px]"
              >
                <img src={googleLogo} alt="Google" className="h-5 w-5" />
                Continue with Google
              </button>
              <span className="text-dustyGray">or</span>
              <button
                type="submit"
                className="bg-russianViolet text-snow h-[64px] w-[256px] rounded-full text-[16px] font-medium"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* Right: image */}
        <div className="w-full md:w-[408px] h-full hidden md:block">
          <img src={SigninImage} alt="Sign in visual" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
