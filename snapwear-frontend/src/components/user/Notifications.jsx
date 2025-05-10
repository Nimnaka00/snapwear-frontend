import React, { useState } from "react";
import { FiMail, FiTruck, FiBell, FiRefreshCw } from "react-icons/fi";

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: true,
    orderDelivered: true,
    push: true,
    availability: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className={`w-[44px] h-[22px] rounded-full cursor-pointer relative transition-all ${
        value ? "bg-bgColor" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] transition-all ${
          value ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </div>
  );

  return (
    <div className="w-full px-8 pt-8 text-textMain">
      <h2 className="text-[24px] font-semibold mb-6">Notifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EMAILS */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 font-medium text-[14px] mb-1">
              <FiMail />
              Emails
            </div>
            <p className="text-[13px] text-dimGray leading-snug">
              We write emails to let you know what's important, like: new order,
              confirmations
            </p>
          </div>
          <ToggleSwitch
            value={settings.email}
            onClick={() => toggle("email")}
          />
        </div>

        {/* ORDER DELIVERED */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 font-medium text-[14px] mb-1">
              <FiTruck />
              Order Delivered
            </div>
            <p className="text-[13px] text-dimGray leading-snug">
              You will be noticed once the order is delivered
            </p>
          </div>
          <ToggleSwitch
            value={settings.orderDelivered}
            onClick={() => toggle("orderDelivered")}
          />
        </div>

        {/* PUSH */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 font-medium text-[14px] mb-1">
              <FiBell />
              Push to your Device
            </div>
            <p className="text-[13px] text-dimGray leading-snug">
              Receive notifications about your order status, promotions and
              other updates
            </p>
          </div>
          <ToggleSwitch
            value={settings.push}
            onClick={() => toggle("push")}
          />
        </div>

        {/* PRODUCT AVAILABILITY */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 font-medium text-[14px] mb-1">
              <FiRefreshCw />
              Product's availability
            </div>
            <p className="text-[13px] text-dimGray leading-snug">
              You will be noticed when product gets available
            </p>
          </div>
          <ToggleSwitch
            value={settings.availability}
            onClick={() => toggle("availability")}
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
