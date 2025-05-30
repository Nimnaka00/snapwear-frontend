import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const OrderSuccessModal = ({ onClose }) => {
  const order = {
    paymentType: "Credit card",
    phone: "+94 777 109 128",
    email: "indujanimnaka@gmail.com",
    transactionId: "2345678910",
    amountPaid: 6387.0,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white border border-gray-300 rounded-lg shadow-md p-8 relative"
        style={{ width: "442px", height: "530px" }}
      >
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          <FaTimes />
        </button>

        {/* Success icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-green-600">
          <FaCheck />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
          Order Successful
        </h2>

        {/* Info section */}
        <div className="text-sm text-gray-700 space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Payment type</span>
            <span>{order.paymentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone number</span>
            <span>{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-indigo-900">{order.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Transaction id</span>
            <span>{order.transactionId}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Amount Paid</span>
            <span>LKR {order.amountPaid.toFixed(2)}</span>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={() => alert("Viewing order status...")}
          className="w-full py-2 bg-indigo-900 text-white rounded-md font-medium hover:bg-indigo-800 transition"
        >
          Order Status
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
