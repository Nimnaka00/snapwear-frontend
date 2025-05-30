import React, { useState } from "react";
import {
  FaShoppingBasket,
  FaTruck,
  FaCreditCard,
  FaPen,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [billingAddress, setBillingAddress] = useState(
    "Same as shipping address"
  );
  const [discountCode, setDiscountCode] = useState("");

  const appliedDiscount = 197;

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

  const handleReturn = () => navigate("/checkout");
  const handlePay = () => alert("Proceeding to payment...");
  const handleApplyDiscount = () =>
    alert(`Discount code "${discountCode}" applied.`);

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
        <div className="h-1 w-12 bg-gray-400" />
        <div className="text-center opacity-40">
          <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center text-xl">
            <FaTruck />
          </div>
          <p className="text-xs mt-1">Checkout</p>
        </div>
        <div className="h-1 w-12 bg-indigo-900" />
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-900 flex items-center justify-center text-xl text-indigo-900">
            <FaCreditCard />
          </div>
          <p className="text-xs mt-1 font-semibold">Payment</p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Payment Details */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6 space-y-4"
          style={{ width: "624px", height: "337px" }}
        >
          <div>
            <p className="text-sm font-semibold mb-2">Payment</p>

            <div className="flex items-center justify-between border border-gray-400 rounded-md px-4 py-2 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                <span className="text-sm">Credit Cards</span>
              </label>
              <div className="flex items-center gap-3">
                <img
                  src="https://img.icons8.com/color/32/amex.png"
                  alt="Amex"
                  className="h-5"
                />
                <FaPen className="text-gray-500 cursor-pointer" />
                <FaPlus className="text-gray-700 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center border border-gray-400 rounded-md px-4 py-2 mb-4">
              <label className="flex items-center gap-2 w-full">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                <span className="text-sm text-blue-700 font-bold">PayPal</span>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Billing address</p>
            <div className="relative">
              <input
                type="text"
                value={billingAddress}
                readOnly
                className="w-full bg-gray-100 text-sm p-2 rounded-md"
              />
              <FaPen className="absolute right-3 top-3 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <button
            onClick={handleReturn}
            className="text-sm text-indigo-900 mt-2 underline"
          >
            ← Return to checkout
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

            {/* Discount Code */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 p-2 border border-gray-600 text-sm rounded-md"
              />
              <button
                onClick={() => handleApplyDiscount()}
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
            onClick={handlePay}
            className="mt-auto w-full py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition"
          >
            Continue to pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
