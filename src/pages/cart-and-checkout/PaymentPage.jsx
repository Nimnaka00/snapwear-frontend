// src/pages/cart-and-checkout/PaymentPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaTruck, FaCreditCard, FaPen } from "react-icons/fa";
import { getCart } from "../../utils/cart";
import OrderFailedModal from "./OrderFaildModal";

const DELIVERY_FEE = 287;

const PaymentPage = () => {
  const navigate = useNavigate();

  // Live cart
  const [cart, setCart] = useState(getCart());

  // Live user + addresses
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("snapwear-user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Payment + billing
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [billingAddress, setBillingAddress] = useState(
    user?.address?.trim() ?? ""
  );
  const [editingBilling, setEditingBilling] = useState(false);
  const [useShippingAddress, setUseShippingAddress] = useState(true);

  // Modal
  const [showFailedModal, setShowFailedModal] = useState(false);

  // Keep in sync with other tabs / pages
  useEffect(() => {
    const refreshCart = () => setCart(getCart());
    const refreshUser = () => {
      try {
        const raw = localStorage.getItem("snapwear-user");
        const u = raw ? JSON.parse(raw) : null;
        setUser(u);
        if (useShippingAddress) {
          setBillingAddress(u?.address?.trim() ?? "");
        }
      } catch {
        /* ignore */
      }
    };

    const onStorage = (e) => {
      if (e.key === "snapwear-cart" || e.key === "snapwear-user") {
        refreshCart();
        refreshUser();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("snapwear-cart-updated", refreshCart);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("snapwear-cart-updated", refreshCart);
    };
  }, [useShippingAddress]);

  // If the toggle is on, mirror shipping -> billing in real time
  useEffect(() => {
    if (useShippingAddress) {
      setBillingAddress(user?.address?.trim() ?? "");
    }
  }, [useShippingAddress, user]);

  // Totals
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

  const saveBillingAddress = () => {
    const raw = localStorage.getItem("snapwear-user");
    try {
      const obj = raw ? JSON.parse(raw) : {};
      const cleaned = billingAddress.trim();
      const updated = { ...obj, billingAddress: cleaned };
      localStorage.setItem("snapwear-user", JSON.stringify(updated));
      setUser(updated);
      setEditingBilling(false);
    } catch {
      /* ignore */
    }
  };

  const handleReturn = () => navigate("/checkout");
  const handlePay = () => {
    if (!billingAddress.trim()) return;
    setShowFailedModal(true);
  };

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
        {/* Left: Payment + Billing */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6 space-y-5"
          style={{ width: "624px" }}
        >
          {/* User */}
          <div>
            <p className="text-sm font-semibold mb-2">User</p>
            <input
              type="text"
              value={displayName}
              readOnly
              className="w-full bg-gray-100 text-sm p-2 rounded-md"
            />
          </div>

          {/* Payment method */}
          <div>
            <p className="text-sm font-semibold mb-2">Payment</p>

            <div className="flex items-center justify-between border border-gray-400 rounded-md px-4 py-2 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <span className="text-sm font-bold text-purple-700">
                  Stripe PaymentMethod
                </span>
              </label>
              <div className="flex items-center gap-3">
                <img
                  src="https://img.icons8.com/color/32/stripe.png"
                  alt="Stripe"
                  className="h-5"
                />
              </div>
            </div>

            <div className="flex items-center border border-gray-400 rounded-md px-4 py-2">
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

          {/* Billing address */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Billing address</p>
              <button
                onClick={() => setEditingBilling((v) => !v)}
                className="text-gray-500 hover:text-gray-700"
                title={editingBilling ? "Cancel" : "Edit billing address"}
              >
                <FaPen />
              </button>
            </div>

            <label className="flex items-center gap-2 mb-2 text-sm">
              <input
                type="checkbox"
                checked={useShippingAddress}
                onChange={(e) => setUseShippingAddress(e.target.checked)}
              />
              <span>Same as shipping address</span>
            </label>

            {editingBilling || !useShippingAddress ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Add billing address"
                  className="flex-1 border border-gray-300 text-sm p-2 rounded-md"
                />
                <button
                  onClick={saveBillingAddress}
                  className="px-4 py-2 text-sm bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  readOnly
                  value={billingAddress}
                  placeholder="Add billing address"
                  className={`w-full text-sm p-2 rounded-md border ${
                    billingAddress
                      ? "bg-gray-100 border-gray-200"
                      : "bg-amber-50 border-amber-300 placeholder-amber-700 text-amber-900"
                  }`}
                />
                {!billingAddress && (
                  <p className="mt-1 text-xs text-amber-600">
                    Add billing address to continue.
                  </p>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleReturn}
            className="text-sm text-indigo-900 mt-2 underline"
          >
            ← Return to checkout
          </button>
        </div>

        {/* Right: Order Summary (live cart) */}
        <div
          className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between"
          style={{ width: "416px" }}
        >
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
            onClick={handlePay}
            disabled={cart.length === 0 || !billingAddress.trim()}
            className={`mt-auto w-full py-3 rounded-lg font-medium transition ${
              cart.length === 0 || !billingAddress.trim()
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-900 text-white hover:bg-indigo-800"
            }`}
            title={
              !billingAddress.trim()
                ? "Please add your billing address"
                : cart.length === 0
                ? "Your cart is empty"
                : "Confirm payment"
            }
          >
            Confirm Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      {showFailedModal && (
        <OrderFailedModal onClose={() => setShowFailedModal(false)} />
      )}
    </div>
  );
};

export default PaymentPage;
