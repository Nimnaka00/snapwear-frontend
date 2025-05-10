import React, { useState } from "react";
import greenTop from "../../assets/shop/grace-karin.png";
import blackTop from "../../assets/shop/black-blouse.png";
import redTop from "../../assets/shop/red-blouse.png";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("current");

  const orders = [
    {
      code: "#1050486",
      date: "2025/04/15",
      total: "LKR 6297.00",
      recipient: "Induja Nimnaka",
      status: "Processing",
      items: [
        { image: greenTop, name: "GRACE KARIN", price: "LKR 2399.00" },
        { image: blackTop, name: "Wrap Black Blouse", price: "LKR 1899.00" },
        { image: redTop, name: "Red Long Sleeve", price: "LKR 1999.00" },
      ],
    },
  ];

  return (
    <div className="w-full px-8 pt-8 text-textMain">
      <h2 className="text-[24px] font-semibold mb-1">Order History</h2>
      <p className="text-[14px] font-normal mb-6">Return or purchase item</p>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-4 border-b border-dustyGray w-fit">
        <button
          onClick={() => setActiveTab("current")}
          className={`relative text-[14px] font-medium pb-2 ${
            activeTab === "current" ? "text-bgColor" : "text-gluconGray"
          }`}
        >
          Current
          <span className="ml-1 bg-bgColor text-white text-[10px] rounded-full px-1">
            1
          </span>
          {activeTab === "current" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-bgColor" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className="relative text-[14px] font-medium text-gluconGray pb-2"
        >
          Delivered
          <span className="ml-1 bg-gluconGray text-white text-[10px] rounded-full px-1">
            0
          </span>
        </button>
      </div>

      {/* Order Table */}
      {activeTab === "current" && (
        <div className="border rounded-lg p-4 w-full max-w-[850px]">
          <div className="grid grid-cols-5 gap-4 text-[14px] font-medium border-b pb-3 mb-3">
            <span>order code</span>
            <span>Placed on</span>
            <span>Total</span>
            <span>Sent to</span>
            <span className="text-right">Order Status</span>
          </div>

          {orders.map((order, idx) => (
            <div key={idx}>
              <div className="grid grid-cols-5 gap-4 text-[14px] font-normal text-dimGray mb-4">
                <span>{order.code}</span>
                <span>{order.date}</span>
                <span>{order.total}</span>
                <span>{order.recipient}</span>
                <span className="text-right">{order.status}</span>
              </div>

              {/* Product Thumbnails */}
              <div className="flex gap-4 flex-wrap">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="border rounded-md w-[160px] p-2 text-center bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[140px] object-contain mb-2"
                    />
                    <p className="text-[14px] font-semibold">{item.name}</p>
                    <p className="text-[13px] font-medium text-dimGray">
                      Price : {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
