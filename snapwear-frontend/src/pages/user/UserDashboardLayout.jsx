import React from "react";
import { Outlet } from "react-router-dom";
import DashboardPanel from "./UserDashboardPanel"; // Ensure this exists and is correct

const UserDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardPanel />
      <div className="flex-1 px-12 py-10 bg-snow">
        <Outlet /> {/* This is critical to render child components like PersonalData */}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
