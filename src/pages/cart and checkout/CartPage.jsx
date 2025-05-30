import React from "react";
import { FaShoppingBasket, FaTruck, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

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

  const discount = 197;
  const delivery = 287;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal - discount + delivery;

  const handleProceed = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans p-6">
      {/* Stepper */}
      <div className="flex justify-center items-center mb-10 gap-10">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-900 flex items-center justify-center text-xl text-indigo-900">
            <FaShoppingBasket />
          </div>
          <p className="text-xs font-semibold mt-1">Cart</p>
        </div>
        <div className="h-1 w-12 bg-indigo-900" />
        <div className="text-center opacity-40">
          <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center text-xl">
            <FaTruck />
          </div>
          <p className="text-xs mt-1">Checkout</p>
        </div>
        <div className="h-1 w-12 bg-gray-400" />
        <div className="text-center opacity-40">
          <div className="w-12 h-12 rounded-full border-4 border-gray-400 flex items-center justify-center text-xl">
            <FaCreditCard />
          </div>
          <p className="text-xs mt-1">Payment</p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Items */}
        <div>
          <h2 className="text-xl font-bold mb-6">Items</h2>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-contain rounded-md"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">Women</p>
                  <p className="text-sm">Price : LKR {item.price.toFixed(2)}</p>
                </div>
                <p className="ml-auto text-sm">x 1</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Payment Details</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-LKR {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery cost</span>
              <span>LKR {delivery.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-base">
              <span>Grand Total</span>
              <span>LKR {grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-medium hover:bg-indigo-800 transition"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
