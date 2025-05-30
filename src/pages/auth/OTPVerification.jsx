// src/pages/auth/OTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../utils/api';
import logo from '../../assets/Logo.png';

const OTPVerification = () => {
  const [otp, setOtp]       = useState('');
  const navigate            = useNavigate();
  const { state }           = useLocation();
  const email               = state?.email;

  // If no email was passed, send them back:
  useEffect(() => {
    if (!email) {
      navigate('/resetpassword');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/verify-otp', { email, otp });
      toast.success('OTP verified! Please set your new password.');
      navigate('/set-new-password', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8 flex flex-col">
      <img src={logo} alt="Logo" className="h-[81.47px] w-[117px] mb-8 self-start" />
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-[506px] bg-snow rounded-[32px] shadow-lg h-[282px] flex flex-col items-center p-6">
          <h1 className="text-[38px] font-semibold text-textMain mb-6 text-center">
            Reset your password
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
            <div className="flex flex-col w-[367px]">
              <label htmlFor="otp" className="text-dustyGray font-medium mb-1">
                Enter your OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full h-[49px] border border-dustyGray rounded-[8px] px-4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-[367px] h-[49px] bg-russianViolet text-snow rounded-[8px] font-medium"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
