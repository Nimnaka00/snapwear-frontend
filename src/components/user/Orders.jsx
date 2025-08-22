// src/components/user/Orders.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import closeIcon from "../../assets/close.png"; // ✅ import close icon

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/api/orders");
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-8">Loading orders…</p>;
  }

  // Split into current vs delivered
  const currentOrders = orders.filter((o) => o.paymentStatus !== "paid");
  const deliveredOrders = orders.filter((o) => o.paymentStatus === "paid");

  // render a list of orders passed in
  const renderOrders = (list) =>
    list.length === 0 ? (
      <p className="text-center text-gray-500">No orders to show.</p>
    ) : (
      list.map((order) => (
        <div key={order._id} className="mb-8">
          {/* Order summary */}
          <div className="grid grid-cols-5 gap-4 text-[14px] font-normal text-dimGray mb-4">
            <span>{order._id.slice(-8).toUpperCase()}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>LKR {order.total.toFixed(2)}</span>
            <span>{order.user?.firstName ?? ""}</span>
            <span className="text-right capitalize">{order.paymentStatus}</span>
          </div>
          {/* Product thumbnails */}
          <div className="flex gap-4 flex-wrap">
            {order.items.map((i, idx) => (
              <div
                key={idx}
                className="border rounded-md w-[160px] p-2 text-center bg-white"
              >
                <img
                  src={i.product.imageUrl}
                  alt={i.product.name}
                  className="w-full h-[140px] object-contain mb-2"
                />
                <p className="text-[14px] font-semibold">{i.product.name}</p>
                <p className="text-[13px] font-medium text-dimGray">
                  Qty: {i.quantity}
                </p>
                <p className="text-[13px] font-medium text-dimGray">
                  LKR {(i.product.price * i.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))
    );

  return (
    <div className="relative w-full min-h-screen px-8 pt-8 text-textMain">
      {/* ✅ Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center"
      >
        <img src={closeIcon} alt="Close" className="w-[30px] h-[30px]" />
      </button>

      <h2 className="text-[24px] font-semibold mb-1">Order History</h2>
      <p className="text-[14px] font-normal mb-6">
        Review your past and current orders
      </p>

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
            {currentOrders.length}
          </span>
          {activeTab === "current" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-bgColor" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`relative text-[14px] font-medium pb-2 ${
            activeTab === "delivered" ? "text-bgColor" : "text-gluconGray"
          }`}
        >
          Delivered
          <span className="ml-1 bg-bgColor text-white text-[10px] rounded-full px-1">
            {deliveredOrders.length}
          </span>
          {activeTab === "delivered" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-bgColor" />
          )}
        </button>
      </div>

      {/* Order Table Header */}
      <div className="grid grid-cols-5 gap-4 text-[14px] font-medium border-b pb-3 mb-3">
        <span>Order #</span>
        <span>Placed On</span>
        <span>Total</span>
        <span>Sent To</span>
        <span className="text-right">Status</span>
      </div>

      {/* Orders List */}
      {activeTab === "current"
        ? renderOrders(currentOrders)
        : renderOrders(deliveredOrders)}
    </div>
  );
};

export default Orders;
