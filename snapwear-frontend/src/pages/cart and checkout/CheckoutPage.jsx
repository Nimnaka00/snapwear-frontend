import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaTruck, FaCreditCard, FaPen } from "react-icons/fa";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const appliedDiscount = 197;

  const user = {
    name: "Induja Nimnaka",
    address: "Pitipana north, Homagama, Sri Lanka",
  };

  const cartItems = [
    { id: 1, name: "GRACE KARIN", price: 2399, image: "/images/green.png" },
    {
      id: 2,
      name: "Wrap Black Blouse",
      price: 1899,
      image: "/images/black.png",
    },
    { id: 3, name: "Red Long Sleeve", price: 1999, image: "/images/red.png" },
  ];

  const delivery = 287;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal - appliedDiscount + delivery;

  const handleApplyDiscount = () =>
    alert(`Discount code "${discountCode}" applied.`);
  const handleContinue = () => navigate("/payment");
  const handleBack = () => navigate("/cart");

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      {/* Stepper */}
      <div className="flex justify-center gap-10 items-center mb-10">
        <div className="text-center opacity-40">
          <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center text-xl">
            <FaShoppingBasket />
          </div>
          <p className="text-xs mt-1">Cart</p>
        </div>
        <div className="h-1 w-12 bg-indigo-900" />
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-900 flex items-center justify-center text-xl text-indigo-900">
            <FaTruck />
          </div>
          <p className="text-xs mt-1 font-semibold">Checkout</p>
        </div>
        <div className="h-1 w-12 bg-gray-400" />
        <div className="text-center opacity-40">
          <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center text-xl">
            <FaCreditCard />
          </div>
          <p className="text-xs mt-1">Payment</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Left: User Info */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6"
          style={{ width: "624px", height: "240px" }}
        >
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">User</p>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full bg-gray-100 text-sm p-2 rounded-md"
            />
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Ship to</p>
            <div className="relative">
              <input
                type="text"
                value={user.address}
                readOnly
                className="w-full bg-gray-100 text-sm p-2 rounded-md"
              />
              <FaPen className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleBack}
            className="text-sm text-indigo-900 mt-4 underline"
          >
            ← Return to cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between"
          style={{ width: "416px", height: "754px" }}
        >
          <div>
            <h3 className="text-lg font-bold mb-4">Your Order</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-contain rounded"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">Women</p>
                    <p>Price : LKR {item.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm">x1</p>
                </div>
              ))}
            </div>

            {/* Discount Section */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 p-2 border border-gray-600 text-sm rounded-md"
              />
              <button
                onClick={handleApplyDiscount}
                className="px-4 py-2 border border-gray-600 text-sm rounded-md hover:bg-gray-100"
              >
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="bg-gray-100 p-4 rounded-md text-sm space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LKR {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">
                  -LKR {appliedDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery cost</span>
                <span>LKR {delivery.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Grand Total</span>
                <span>LKR {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-auto w-full py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition"
          >
            Continue to pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
