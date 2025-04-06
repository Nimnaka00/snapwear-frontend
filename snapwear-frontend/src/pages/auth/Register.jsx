import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import logo from '../../assets/Logo.png';
import Signup_image from '../../assets/Signup_image.png.png';
import googleLogo from '../../assets/google-logo.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] px-6">
      <div className="max-w-[1200px] mx-auto py-6">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="Logo" className="h-[48px]" />
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-[12px] flex flex-col md:flex-row overflow-hidden max-w-[1024px] mx-auto">
          {/* Left: Form Section */}
          <div className="w-full md:w-1/2 px-[32px] py-[32px]">
            <div className="max-w-[400px]">
              <h1 className="text-[36px] font-bold mb-[16px]">Create an account</h1>
              <p className="text-[14px] text-[#374151] mb-[24px]">
                Already have an account?{' '}
                <span className="text-[#1E1B4B] font-medium underline hover:text-[#4338CA] cursor-pointer">
                  Log in
                </span>
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name fields */}
                <div className="flex gap-[16px] mb-[16px]">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block text-[#4B5563] text-[14px] mb-[4px]">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-[8px] py-[8px] border border-[#D1D5DB] rounded text-[14px]"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="block text-[#4B5563] text-[14px] mb-[4px]">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-[8px] py-[8px] border border-[#D1D5DB] rounded text-[14px]"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-[16px]">
                  <label htmlFor="email" className="block text-[#4B5563] text-[14px] mb-[4px]">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-[8px] py-[8px] border border-[#D1D5DB] rounded text-[14px]"
                    required
                  />
                </div>

                {/* Passwords */}
                <div className="flex gap-[16px] mb-[16px]">
                  <div className="w-full">
                    <label htmlFor="password" className="block text-[#4B5563] text-[14px] mb-[4px]">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-[8px] py-[8px] border border-[#D1D5DB] rounded text-[14px]"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="confirmPassword" className="block text-[#4B5563] text-[14px] mb-[4px]">
                      Confirm your password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-[8px] py-[8px] border border-[#D1D5DB] rounded text-[14px]"
                      required
                    />
                  </div>
                </div>

                {/* Note */}
                <p className="text-[#6B7280] text-[13px] mb-[16px]">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>

                {/* Show Password */}
                <div className="flex items-center gap-2 mb-[24px]">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="showPassword" className="text-[#4B5563] text-[14px] flex items-center gap-1 cursor-pointer">
                    Show password
                    {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-[16px]">
                  <button
                    type="submit"
                    className="w-full bg-[#1E1B4B] text-white h-[48px] px-[24px] rounded-full font-medium hover:bg-[#3730A3] text-center"
                  >
                    Create an account
                  </button>

                  <span className="text-[#9CA3AF] font-semibold text-center">OR</span>

                  <button
                    type="button"
                    className="w-full border border-[#1E1B4B] text-[#1E1B4B] bg-white h-[48px] px-[24px] rounded-full font-medium hover:bg-[#F3F4F6] text-center flex items-center justify-center gap-2"
                  >
                    <img src={googleLogo} alt="Google" className="w-[20px] h-[20px]" />
                    Login Instead
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={Signup_image}
              alt="Signup Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
