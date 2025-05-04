import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import SignupImage from '../../assets/Signup_image.png';

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

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8">
      <img src={logo} alt="Logo" className="h-[117px] w-[81.47px] mb-8" />

      <div className="mx-auto max-w-[999px] w-full bg-snow rounded-[32px] shadow-[6px_6px_20px_1px_rgba(0,0,0,0.25)] flex flex-col md:flex-row overflow-hidden h-[546px]">
        <div className="flex flex-col justify-center px-6 md:px-12 py-8 w-full md:w-[591px]">
          <h1 className="text-[38px] font-semibold leading-[58px] text-textMain mb-2">Create an account</h1>
          <p className="text-[16px] font-medium text-textMain mb-2">
            Already have an account?{' '}
            <a href="/login" className="ml-[13px] underline">Log in</a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-[26px]">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-dustyGray text-[16px] font-medium mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full md:w-[259px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-dustyGray text-[16px] font-medium mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full md:w-[259px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-dustyGray text-[16px] font-medium mb-1">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full md:w-[543px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-[26px]">
              <div className="flex flex-col">
                <label htmlFor="password" className="text-dustyGray text-[16px] font-medium mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full md:w-[259px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-dustyGray text-[16px] font-medium mb-1">Confirm your password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full md:w-[259px] h-[48px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
                />
              </div>
            </div>

            <p className="text-[16px] text-dustyGray font-medium">Use 8 or more characters with a mix of letters, numbers & symbols</p>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-textMain text-[16px] font-medium">Show password</label>
            </div>

            <div className="flex justify-between items-center pt-0 flex-wrap md:flex-nowrap md:items-center mt-[-12px] gap-[112px]">
              <a href="/login" className="text-textMain text-[16px] font-medium underline">
                Log in instead
              </a>
              <button
                type="submit"
                className="bg-russianViolet text-snow w-[256px] h-[64px] rounded-[32px] text-[16px] font-medium self-end"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-[408px] h-full hidden md:block">
          <img src={SignupImage} alt="Sign up visual" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;
