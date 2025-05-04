import React, { useState } from 'react';
import logo from '../../assets/Logo.png';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset link sent to:', email);
  };

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8 flex flex-col items-start">
      <img src={logo} alt="Logo" className="h-[81.47px] w-[117px] mb-8" />

      <div className="mx-auto w-full max-w-[506px] bg-snow rounded-[32px] shadow-[6px_6px_20px_1px_rgba(0,0,0,0.25)] h-[352px] flex flex-col items-center px-6 md:px-12 pt-8">
        <h1 className="text-[38px] font-semibold text-textMain mb-10 text-center">Reset your password</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col w-[367px]">
            <label htmlFor="email" className="text-dustyGray text-[16px] font-medium mb-1">Enter your account email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[49.26px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-[367px] h-[49.26px] bg-russianViolet text-snow rounded-[8px] text-[16px] font-medium"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
