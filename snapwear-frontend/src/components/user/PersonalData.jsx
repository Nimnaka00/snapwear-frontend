import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close.png"

const PersonalData = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    console.log("Saving changes:", form);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    console.log("Password updated:", form.newPassword);
  };

  return (
    <div className="relative w-full min-h-screen bg-snow text-textMain px-[40px] pt-[20px] pb-[80px]">
      {/* Close Button */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center"
            >
              <img src={closeIcon} alt="Close" className="w-[30px] h-[30px]" />
            </button>

      {/* Title */}
      <h2 className="text-[24px] font-medium leading-[28px] mb-[50px]">
        Identification
      </h2>

      {/* Identity Section */}
      <div className="mb-[38px]">
        <p className="text-[16px] font-normal text-textMain mb-4">
          Verify your identity
        </p>
        <div className="flex flex-col md:flex-row gap-[26px] mb-4">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-[16px] font-medium text-dustyGray mb-1"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-[259px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-[16px] font-medium text-dustyGray mb-1"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-[259px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
            />
          </div>
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
            className="w-[543px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
          />
        </div>

        <div className="flex justify-end w-[543px]">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="w-[200px] h-[36px] border border-russianViolet text-russianViolet text-[16px] font-medium rounded-[8px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-[200px] h-[36px] bg-russianViolet text-snow text-[16px] font-medium rounded-[8px]"
              >
                Save
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

        <div className="flex flex-col gap-[14px] mb-0">
          {[
            { name: "oldPassword", label: "Old password" },
            { name: "newPassword", label: "New password" },
            { name: "confirmPassword", label: "Confirm new password" },
          ].map(({ name, label }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-[16px] font-medium text-dustyGray mb-1"
              >
                {label}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-[543px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
              />
            </div>
          ))}
        </div>

        <p className="w-[529px] text-[16px] font-normal text-dustyGray mt-0 mb-4">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        <div className="flex justify-between items-center w-[543px] mb-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className="text-[16px] font-medium text-textMain"
            >
              Show password
            </label>
          </div>
          <button
            onClick={handlePasswordChange}
            className="w-[200px] h-[36px] bg-russianViolet text-snow text-[14px] font-medium rounded-[8px]"
          >
            Edit password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
