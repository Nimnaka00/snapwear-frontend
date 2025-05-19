// src/components/user/PersonalData.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../utils/api';

const PersonalData = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load profile on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('/api/users/profile');
        setForm(prev => ({
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        }));
      } catch (err) {
        toast.error('Failed to load profile.');
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    // revert changes
    setIsEditing(false);
    setLoadingProfile(true);
    API.get('/api/users/profile')
      .then(({ data }) => {
        setForm(prev => ({
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        }));
      })
      .catch(() => toast.error('Failed to revert changes.'))
      .finally(() => setLoadingProfile(false));
  };

  const handleSave = async () => {
    setSavingProfile(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
      };
      await API.put('/api/users/profile', payload);
      toast.success('Profile updated successfully.');
      setIsEditing(false);

      // Sync updated name/email into localStorage so DashboardPanel shows the new values
      const stored = JSON.parse(localStorage.getItem('snapwear-user')) || {};
      const updatedUser = {
        ...stored,
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
      };
      localStorage.setItem('snapwear-user', JSON.stringify(updatedUser));

      // Reload to remount DashboardPanel and pick up the new user data
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Profile update failed.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setUpdatingPassword(true);
    try {
      await API.put('/api/users/profile/password', {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      toast.success('Password updated successfully.');
      // clear out password fields
      setForm(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed.');
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loadingProfile) return <p className="p-8">Loading profile…</p>;

  return (
    <div className="relative w-full min-h-screen bg-snow text-textMain px-[40px] pt-[20px] pb-[80px]">
      {/* Close Button */}
      <button
        onClick={() => navigate('/user/dashboard')}
        className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-[24px] font-medium leading-[28px] mb-[50px]">
        Identification
      </h2>

      {/* Profile Section */}
      <div className="mb-[38px]">
        <p className="text-[16px] font-normal text-textMain mb-4">
          Verify your identity
        </p>
        <div className="flex flex-col md:flex-row gap-[26px] mb-4">
          {['firstName','lastName'].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-[16px] font-medium text-dustyGray mb-1"
              >
                {field === 'firstName' ? 'First name' : 'Last name'}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-[259px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px] ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-dustyGray mb-1"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-[543px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px] ${
              !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div className="flex justify-end w-[543px]">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                disabled={savingProfile}
                className="w-[200px] h-[36px] border border-russianViolet text-russianViolet text-[16px] font-medium rounded-[8px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={savingProfile}
                className="w-[200px] h-[36px] bg-russianViolet text-snow text-[16px] font-medium rounded-[8px]"
              >
                {savingProfile ? 'Saving…' : 'Save'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="w-[200px] h-[36px] bg-russianViolet text-snow text-[16px] font-medium rounded-[8px]"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div>
        <p className="text-[16px] font-normal text-textMain mb-4">
          Edit your password
        </p>

        {['oldPassword','newPassword','confirmPassword'].map((name) => {
          const lbl = 
            name === 'oldPassword' ? 'Old password' :
            name === 'newPassword' ? 'New password' :
            'Confirm new password';
          return (
            <div key={name} className="flex flex-col mb-[14px]">
              <label
                htmlFor={name}
                className="text-[16px] font-medium text-dustyGray mb-1"
              >
                {lbl}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-[543px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
              />
            </div>
          );
        })}

        <div className="flex justify-between items-center w-[543px] mb-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-[16px] font-medium">
              Show password
            </label>
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={updatingPassword}
            className="w-[200px] h-[36px] bg-russianViolet text-snow text-[14px] font-medium rounded-[8px]"
          >
            {updatingPassword ? 'Updating…' : 'Edit password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
