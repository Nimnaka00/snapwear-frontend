import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../utils/api';
import logo from '../../assets/Logo.png';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/auth/verify-otp', { email, otp });
      toast.success(res.data.message);
      navigate('/set-new-password', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8 flex flex-col">
      <img src={logo} alt="Logo" className="h-[81.47px] w-[117px] mb-8" />

      {/* Centered Form Wrapper */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-[506px] bg-snow rounded-[32px] shadow-[6px_6px_20px_1px_rgba(0,0,0,0.25)] h-[282px] flex flex-col items-center px-6 md:px-12 pt-8">
          <h1 className="text-[38px] font-semibold text-textMain mb-6 text-center">Reset your password</h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
            <div className="flex flex-col w-[367px]">
              <label htmlFor="otp" className="text-dustyGray text-[16px] font-medium mb-1">Enter your OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full h-[49.26px] border border-dustyGray text-textMain text-[16px] font-medium rounded-[8px] px-4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-[367px] h-[49.26px] bg-russianViolet text-snow rounded-[8px] text-[16px] font-medium"
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
