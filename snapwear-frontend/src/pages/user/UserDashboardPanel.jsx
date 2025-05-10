import { FaUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FiCreditCard, FiBell } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

const DashboardPanel = () => {
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
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
        <p className="text-[24px] font-medium text-textMain">Induja Nimnaka</p>
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
                  isActive ? "text-snow" : "text-gluconGray group-hover:text-snow"
                }`}
              />
              <span>{name}</span>
            </>
          );

          if (isLogout) {
            return (
              <button
                key={name}
                onClick={handleLogout}
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
  );
};

export default DashboardPanel;
