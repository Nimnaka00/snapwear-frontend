// src/components/user/DashboardPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FiCreditCard, FiBell } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("snapwear-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (confirmOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => cancelBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setConfirmOpen(false);
      if (e.key === "Enter" && confirmOpen) handleLogout();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [confirmOpen]);

  const navLinks = [
    { name: "Personal Data", path: "/user/dashboard", icon: FaUser },
    { name: "Payment methods", path: "/user/payment", icon: FiCreditCard },
    { name: "Orders", path: "/user/orders", icon: BsBag },
    { name: "Notifications", path: "/user/notifications", icon: FiBell },
    { name: "Log out", path: "/logout", icon: PiSignOutBold, isLogout: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem("snapwear-user");
    localStorage.removeItem("snapwear-token");
    setConfirmOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="w-[403px] min-h-screen bg-snow pt-10 pb-6 flex flex-col items-start"
        style={{
          borderRight: "4px solid #13151B",
          borderTopRightRadius: "50px",
          boxSizing: "border-box",
        }}
      >
        {/* User Info */}
        <div className="flex items-center gap-[10px] w-full px-8 h-[70px] mb-[46px]">
          <div className="w-[70px] h-[70px] bg-gray-200 rounded-full flex items-center justify-center">
            <FaUser size={32} className="text-textMain" />
          </div>
          <p className="text-[24px] font-medium text-textMain">
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-0 w-full">
          {navLinks.map(({ name, path, icon: Icon, isLogout }) => {
            const baseClasses =
              "group flex items-center w-full h-[60px] px-12 text-[20px] font-light transition";
            const iconBase = "w-[25px] h-[25px]";

            const renderContent = (isActive) => (
              <>
                <Icon
                  className={`${iconBase} mr-[56px] ${
                    isActive
                      ? "text-snow"
                      : "text-gluconGray group-hover:text-snow"
                  }`}
                />
                <span>{name}</span>
              </>
            );

            if (isLogout) {
              return (
                <button
                  key={name}
                  onClick={() => setConfirmOpen(true)}
                  className={`${baseClasses} bg-snow text-textMain hover:bg-bgColor hover:text-snow`}
                >
                  {renderContent(false)}
                </button>
              );
            }

            return (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `${baseClasses} ${
                    isActive
                      ? "bg-bgColor text-snow"
                      : "bg-snow text-textMain hover:bg-bgColor hover:text-snow"
                  }`
                }
              >
                {({ isActive }) => renderContent(isActive)}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Brand-matched Confirm Logout Modal */}
      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setConfirmOpen(false);
          }}
        >
          <div className="relative mx-4 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(214,255,246,0.15)] ring-1 ring-mintGreen/30">
            {/* Header — SnapWear colors */}
            <div className="bg-bgColor px-6 py-5 text-snow flex items-center gap-3 border-b border-mintGreen/30">
              <div className="p-2 rounded-full bg-mintGreen/15 ring-1 ring-mintGreen/30">
                <PiSignOutBold size={22} className="text-mintGreen" />
              </div>
              <h3 className="text-lg font-semibold">Log out of SnapWear?</h3>
            </div>

            {/* Body */}
            <div className="bg-bgColor px-6 pt-5 pb-6 text-snow">
              <p className="text-[15px] text-[#D9E7E3]">
                You’re about to sign out. You’ll need to log in again to access
                your dashboard and orders.
              </p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  ref={cancelBtnRef}
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 h-10 rounded-[10px] border border-mintGreen text-mintGreen font-medium
                             hover:bg-mintGreen/10 focus:outline-none focus:ring-2 focus:ring-mintGreen/40"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 h-10 rounded-[10px] font-semibold text-bgColor
                             bg-mintGreen hover:brightness-110
                             focus:outline-none focus:ring-2 focus:ring-mintGreen/40"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Bottom brand accent */}
            <div className="h-1 w-full bg-gradient-to-r from-mintGreen/60 via-mintGreen to-mintGreen/60" />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPanel;
