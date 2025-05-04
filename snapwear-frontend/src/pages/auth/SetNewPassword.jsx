import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/api';
import logo from '../../assets/Logo.png';

const SetNewPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await API.post(`/api/auth/reset-password/${token}`, {
        newPassword: formData.newPassword,
      });

      toast.success('✅ Password reset successful');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || '❌ Password reset failed');
    }
  };

  return (
    <div className="min-h-screen bg-snow px-5 md:px-[80px] py-8 flex flex-col items-start">
      <img src={logo} alt="Logo" className="h-[81.47px] w-[117px] mb-8" />

      <div className="mx-auto w-full max-w-[506px] bg-snow rounded-[32px] shadow-[6px_6px_20px_1px_rgba(0,0,0,0.25)] h-[382px] flex flex-col items-center px-6 md:px-12 pt-8">
        <h1 className="text-[38px] font-semibold text-textMain mb-6 text-center">Set new password</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col w-[367px]">
            <label htmlFor="newPassword" className="text-dustyGray text-[16px] font-medium mb-1">New password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full h-[49.26px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              required
            />
          </div>

          <div className="flex flex-col w-[367px]">
            <label htmlFor="confirmPassword" className="text-dustyGray text-[16px] font-medium mb-1">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-[49.26px] border border-dustyGray text-dustyGray text-[16px] font-medium rounded-[8px] px-4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-[367px] h-[49.26px] bg-russianViolet text-snow rounded-[8px] text-[16px] font-medium"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
