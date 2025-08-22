// src/pages/cart-and-checkout/CartPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FaShoppingBasket,
  FaTruck,
  FaCreditCard,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../utils/cart";

const DELIVERY_FEE = 287;

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());

  // keep in sync if other tabs/pages change the cart
  useEffect(() => {
    const refresh = () => setCart(getCart());
    window.addEventListener("storage", refresh);
    window.addEventListener("snapwear-cart-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("snapwear-cart-updated", refresh);
    };
  }, []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.quantity),
      0
    );
    const grandTotal = Math.max(0, subtotal + DELIVERY_FEE);
    return { subtotal, grandTotal };
  }, [cart]);

  const handleProceed = () => navigate("/checkout");

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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Items</h2>
            {cart.length > 0 && (
              <button
                onClick={() => clearCart()}
                className="text-sm text-red-600 hover:underline"
              >
                Clear cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">
              Your cart is empty. Go to the{" "}
              <button className="underline" onClick={() => navigate("/shop")}>
                Shop
              </button>
              .
            </p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.key} className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-24 object-contain rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-bold">{item.name}</p>
                    {item.size && (
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    )}
                    <p className="text-sm">
                      Price : LKR {Number(item.price).toFixed(2)}
                    </p>

                    {/* Qty controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() =>
                          setCart(
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          setCart(
                            updateQuantity(
                              item.productId,
                              item.size,
                              Number(e.target.value)
                            )
                          )
                        }
                        className="w-14 border rounded text-center"
                      />
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() =>
                          setCart(
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    title="Remove"
                    onClick={() =>
                      setCart(removeFromCart(item.productId, item.size))
                    }
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Payment Details</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>LKR {totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery cost</span>
              <span>LKR {DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-base">
              <span>Grand Total</span>
              <span>LKR {totals.grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleProceed}
            disabled={cart.length === 0}
            className={`mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-medium transition ${
              cart.length === 0
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-indigo-800"
            }`}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
