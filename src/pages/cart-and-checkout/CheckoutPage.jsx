// src/pages/cart-and-checkout/CheckoutPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaTruck, FaCreditCard, FaPen } from "react-icons/fa";
import { getCart } from "../../utils/cart";

const DELIVERY_FEE = 287;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("snapwear-user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // 👇 trim so an "empty string" is treated as empty
  const [address, setAddress] = useState(user?.address?.trim() ?? "");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const refreshCart = () => setCart(getCart());
    const refreshUser = () => {
      const raw = localStorage.getItem("snapwear-user");
      try {
        const u = raw ? JSON.parse(raw) : null;
        setUser(u);
        setAddress(u?.address?.trim() ?? "");
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", (e) => {
      if (e.key === "snapwear-user") refreshUser();
      if (e.key === "snapwear-cart") refreshCart();
    });
    window.addEventListener("snapwear-cart-updated", refreshCart);
    return () => {
      window.removeEventListener("snapwear-cart-updated", refreshCart);
      window.removeEventListener("storage", refreshUser);
    };
  }, []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (s, i) => s + Number(i.price) * Number(i.quantity),
      0
    );
    const grandTotal = Math.max(0, subtotal + DELIVERY_FEE);
    return { subtotal, grandTotal };
  }, [cart]);

  const displayName =
    user?.firstName || user?.lastName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : user?.name || "Guest";

  const handleSaveAddress = () => {
    const raw = localStorage.getItem("snapwear-user");
    try {
      const obj = raw ? JSON.parse(raw) : {};
      const cleaned = address.trim();
      const updated = { ...obj, address: cleaned };
      localStorage.setItem("snapwear-user", JSON.stringify(updated));
      setUser(updated);
      setAddress(cleaned);
      setEditing(false);
    } catch {
      /* ignore */
    }
  };

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

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Left: User & Shipping */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6"
          style={{ width: "624px" }}
        >
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">User</p>
            <input
              type="text"
              value={displayName}
              readOnly
              className="w-full bg-gray-100 text-sm p-2 rounded-md"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Ship to</p>
              <button
                onClick={() => setEditing((v) => !v)}
                className="text-gray-500 hover:text-gray-700"
                title={
                  editing ? "Cancel" : address ? "Edit address" : "Add address"
                }
              >
                <FaPen />
              </button>
            </div>

            {editing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 border border-gray-300 text-sm p-2 rounded-md"
                  placeholder="Add address"
                />
                <button
                  onClick={handleSaveAddress}
                  className="px-4 py-2 text-sm bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                {/* 👇 When empty, show placeholder-like prompt in the box */}
                <input
                  type="text"
                  readOnly
                  value={address} // keep empty string when none
                  placeholder="Add address" // visible when value is ""
                  className={`w-full text-sm p-2 rounded-md border
                    ${
                      address
                        ? "bg-gray-100 border-gray-200"
                        : "bg-amber-50 border-amber-300 placeholder-amber-700 text-amber-900"
                    }`}
                />
                {!address && (
                  <p className="mt-1 text-xs text-amber-600">
                    Add address to continue.
                  </p>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleBack}
            className="text-sm text-indigo-900 mt-4 underline"
          >
            ← Return to cart
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full max-w-md">
          <div>
            <h3 className="text-lg font-bold mb-4">Your Order</h3>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-600">
                Your cart is empty.{" "}
                <button className="underline" onClick={() => navigate("/shop")}>
                  Go to shop
                </button>
                .
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.key} className="flex gap-4 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-20 object-contain rounded"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">
                        {item.category ?? "—"}
                        {item.size ? ` • Size ${item.size}` : ""}
                      </p>
                      <p>Price : LKR {Number(item.price).toFixed(2)}</p>
                    </div>
                    <p className="text-sm">x{item.quantity}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-100 p-4 rounded-md text-sm space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LKR {totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery cost</span>
                <span>LKR {DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Grand Total</span>
                <span>LKR {totals.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={cart.length === 0 || !address}
            className={`mt-auto w-full py-3 rounded-lg font-medium transition ${
              cart.length === 0 || !address
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-900 text-white hover:bg-indigo-800"
            }`}
            title={
              !address
                ? "Please add your shipping address"
                : cart.length === 0
                ? "Your cart is empty"
                : "Continue to payment"
            }
          >
            Continue to pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
