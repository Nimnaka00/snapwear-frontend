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
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
        <img src={logo} alt="Logo" className="h-12" />
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
          <div className="p-8 md:w-1/2">
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-bold mb-4">Create an account</h1>
              <p className="mb-6">
                Already have an account?{' '}
                <a href="#" className="text-indigo-900 font-medium">
                  Log in
                </a>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="block text-gray-600 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="block text-gray-600 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex gap-4 mb-2">
                  <div className="w-1/2">
                    <label htmlFor="password" className="block text-gray-600 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
                      Confirm your password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                    className="mr-2"
                  />
                  <label htmlFor="showPassword" className="flex items-center cursor-pointer">
                    <span className="mr-2">Show password</span>
                    {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <a href="#" className="text-indigo-900">
                    Log in instead
                  </a>
                  <button
                    type="submit"
                    className="bg-indigo-900 text-white py-3 px-6 rounded-full hover:bg-indigo-800 transition"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-1/2 bg-tranparent relative">
            <img
              src={Signup_image}
              alt="Fashion model in red patterned outfit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
