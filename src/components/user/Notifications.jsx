// src/components/user/Notifications.jsx
import React, { useEffect, useState } from "react";
import { FiMail, FiTruck, FiBell, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import API from "../../utils/api";
import closeIcon from "../../assets/close.png"; // ✅ import close button icon

/** Accessible toggle switch */
const Switch = ({ id, checked, onChange }) => (
  <label
    htmlFor={id}
    className="inline-flex items-center cursor-pointer select-none"
  >
    <input
      id={id}
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span
      className="
        relative h-6 w-11 rounded-full shrink-0
        bg-dustyGray transition-colors
        peer-checked:bg-bgColor
        focus:outline-none focus:ring-2 focus:ring-bgColor/40 focus:ring-offset-2

        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:h-5 after:w-5 after:rounded-full after:bg-snow after:shadow
        after:transition-all
        peer-checked:after:left-[22px]
      "
      aria-hidden="true"
    />
  </label>
);

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: false,
    orderDelivered: false,
    push: false,
    availability: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ hook for navigation

  // Load current settings
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/api/users/notifications");
        setSettings((s) => ({ ...s, ...data }));
      } catch {
        toast.error("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = async (key) => {
    const prev = settings[key];
    const next = !prev;

    setSettings((s) => ({ ...s, [key]: next })); // optimistic UI

    try {
      await API.put("/api/users/notifications", { [key]: next });
      toast.success(
        `${
          key === "email"
            ? "Emails"
            : key === "orderDelivered"
            ? "Delivery alerts"
            : key === "push"
            ? "Push notifications"
            : "Availability alerts"
        } ${next ? "enabled" : "disabled"}.`
      );
    } catch {
      setSettings((s) => ({ ...s, [key]: prev })); // revert on failure
      toast.error("Update failed. Please try again.");
    }
  };

  if (loading) return <p className="p-8">Loading…</p>;

  const cards = [
    {
      key: "email",
      icon: <FiMail className="mt-0.5" />,
      title: "Emails",
      desc: "We write emails to let you know what's important, like new orders and confirmations.",
    },
    {
      key: "orderDelivered",
      icon: <FiTruck className="mt-0.5" />,
      title: "Order Delivered",
      desc: "You will be notified once your order is delivered.",
    },
    {
      key: "push",
      icon: <FiBell className="mt-0.5" />,
      title: "Push to your Device",
      desc: "Receive notifications about order status, promotions, and other updates.",
    },
    {
      key: "availability",
      icon: <FiRefreshCw className="mt-0.5" />,
      title: "Product's availability",
      desc: "You will be notified when a product becomes available.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen px-8 pt-8 text-textMain">
      {/* ✅ Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center"
      >
        <img src={closeIcon} alt="Close" className="w-[30px] h-[30px]" />
      </button>

      <h2 className="text-[24px] font-semibold mb-6">Notifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(({ key, icon, title, desc }) => {
          const id = `switch-${key}`;
          return (
            <div
              key={key}
              className="flex items-start justify-between rounded-xl border border-dustyGray/40 bg-white px-5 py-4 shadow-sm"
            >
              <div className="pr-4">
                <div className="flex items-center gap-2 text-[14px] font-medium mb-1">
                  {icon}
                  <span>{title}</span>
                </div>
                <p className="text-[13px] text-dimGray leading-snug">{desc}</p>
              </div>

              <Switch
                id={id}
                checked={!!settings[key]}
                onChange={() => toggle(key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
