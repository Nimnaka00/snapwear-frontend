import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import logo from '../../assets/Logo.png';
import Signup_image from '../../assets/Signup_image.png.png';

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
    <div className="min-h-screen bg-[#F9FAFB] w-full">
      <div className="container mx-auto px-[16px] py-[24px]">
        <div className="mb-[32px]">
          <img src={logo} alt="Logo" className="h-[90px]" />
        </div>
        <div className="bg-white rounded-[12px] shadow-lg overflow-hidden max-w-[999px] mx-auto flex flex-col md:flex-row" style={{ height: '546px', width: '999px' }}>
          <div className="p-[32px] md:w-[50%]">
            <div className="w-full max-w-[400px]">
              <h1 className="text-[36px] font-bold mb-[16px]">Create an account</h1>
              <p className="mb-[24px]">
                Already have an account?{' '}
                <a href="#" className="text-[#1E1B4B] font-medium">
                  Log in
                </a>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-[16px] mb-[16px]">
                  <div className="w-[50%]">
                    <label htmlFor="firstName" className="block text-[#4B5563] mb-[4px]">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-[8px] border border-[#D1D5DB] rounded-[4px]"
                      required
                    />
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="lastName" className="block text-[#4B5563] mb-[4px]">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-[8px] border border-[#D1D5DB] rounded-[4px]"
                      required
                    />
                  </div>
                </div>
                <div className="mb-[16px]">
                  <label htmlFor="email" className="block text-[#4B5563] mb-[4px]">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-[8px] border border-[#D1D5DB] rounded-[4px]"
                    required
                  />
                </div>
                <div className="flex gap-[16px] mb-[16px]">
                  <div className="w-[50%]">
                    <label htmlFor="password" className="block text-[#4B5563] mb-[4px]">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-[8px] border border-[#D1D5DB] rounded-[4px]"
                      required
                    />
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="confirmPassword" className="block text-[#4B5563] mb-[4px]">
                      Confirm your password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-[8px] border border-[#D1D5DB] rounded-[4px]"
                      required
                    />
                  </div>
                </div>
                <p className="text-[13px] text-[#6B7280] mb-[16px]">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
                <div className="flex items-center mb-[24px]">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                    className="mr-[8px]"
                  />
                  <label htmlFor="showPassword" className="flex items-center cursor-pointer">
                    <span className="mr-[8px]">Show password</span>
                    {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <a href="#" className="text-[#1E1B4B]">
                    Log in instead
                  </a>
                  <button
                    type="submit"
                    className="bg-[#1E1B4B] text-white py-[12px] px-[24px] rounded-full hover:bg-[#3730A3] transition"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-[50%] bg-transparent relative">
            <img
              src={Signup_image}
              alt="Fashion model in red patterned outfit"
              className="mx autofill flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
