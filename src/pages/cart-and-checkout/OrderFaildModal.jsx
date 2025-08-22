import React from "react";

const OrderFailedModal = ({ onClose, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 relative text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-3xl text-red-600">
          ✖
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Order Failed
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-sm">
          Unfortunately we have an issue with your payment, try again later.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="bg-indigo-900 hover:bg-indigo-800 text-white font-medium py-2 px-6 rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default OrderFailedModal;
