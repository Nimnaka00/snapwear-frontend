// src/pages/user/UserDashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardPanel from "./UserDashboardPanel";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("snapwear-user");
    if (!stored) {
      // Not logged in → send to login page
      navigate("/login", { replace: true });
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Optionally render a loading state while we parse localStorage
  if (user === null) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Pass user as prop if your DashboardPanel or children need it */}
      <DashboardPanel user={user} />

      <div className="flex-1 px-12 py-10 bg-snow">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
