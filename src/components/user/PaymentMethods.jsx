// src/components/user/PaymentMethods.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../utils/api";
import editIcon from "../../assets/edit.png";
import visaLogo from "../../assets/payments/visa.png";
import mastercardLogo from "../../assets/payments/mastercard.png";
import paypalLogo from "../../assets/payments/paypal.png";
import closeIcon from "../../assets/close.png";

const PaymentMethods = () => {
  const navigate = useNavigate();

  // State for cards and PayPal
  const [cards, setCards] = useState([]);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Editing UI state
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardForm, setCardForm] = useState({
    paymentMethodId: "",
    brand: "",
    last4: "",
    expMonth: "",
    expYear: "",
  });
  const [editingPaypal, setEditingPaypal] = useState(false);
  const [paypalForm, setPaypalForm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/api/users/payments");
        setCards(data.cards);
        setPaypalEmail(data.paypalEmail);
      } catch (err) {
        toast.error("Failed to load payment methods.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle card addition (Stripe PaymentElement or token flow)
  const handleAddCard = async () => {
    // In a real app you'd collect a paymentMethodId via Stripe.js here.
    if (!cardForm.paymentMethodId) {
      toast.error("Enter a valid paymentMethodId");
      return;
    }
    try {
      const res = await API.post("/api/users/payments/cards", {
        paymentMethodId: cardForm.paymentMethodId,
      });
      setCards((prev) => [
        ...prev,
        {
          stripePaymentMethodId: cardForm.paymentMethodId,
          brand: res.data.card.brand,
          last4: res.data.card.last4,
          expMonth: res.data.card.exp_month,
          expYear: res.data.card.exp_year,
          _id: res.data.card.id,
        },
      ]);
      toast.success("Card added successfully.");
      setEditingCardId(null);
      setCardForm({
        paymentMethodId: "",
        brand: "",
        last4: "",
        expMonth: "",
        expYear: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add card.");
    }
  };

  const handleRemoveCard = async (cardId) => {
    try {
      await API.delete(`/api/users/payments/cards/${cardId}`);
      setCards((prev) => prev.filter((c) => c._id !== cardId));
      toast.success("Card removed.");
    } catch (err) {
      toast.error("Failed to remove card.");
    }
  };

  const handleUpdatePaypal = async () => {
    if (!paypalForm) {
      toast.error("Enter a valid PayPal email.");
      return;
    }
    try {
      await API.put("/api/users/payments/paypal", { paypalEmail: paypalForm });
      setPaypalEmail(paypalForm);
      toast.success("PayPal email updated.");
      setEditingPaypal(false);
    } catch (err) {
      toast.error("Failed to update PayPal email.");
    }
  };

  if (loading) return <p className="p-8">Loading payment methods…</p>;

  return (
    <div className="relative w-full min-h-screen bg-snow text-textMain px-[40px] pt-[20px] pb-[80px]">
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center"
      >
        <img src={closeIcon} alt="Close" className="w-[30px] h-[30px]" />
      </button>

      <h2 className="text-[24px] font-medium mb-[20px]">Cards</h2>

      <div className="space-y-6">
        {/* Existing Cards */}
        {cards.map((c) => (
          <div key={c._id} className="flex items-center gap-4">
            <div className="w-[392px] h-[72px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
              <div className="text-[16px] text-dustyGray font-light">
                {c.brand.toUpperCase()} ****{c.last4} exp {c.expMonth}/
                {c.expYear}
              </div>
              <div className="flex gap-2">
                <img
                  src={c.brand === "visa" ? visaLogo : mastercardLogo}
                  alt={c.brand}
                  className="w-[55px] h-[40px]"
                />
                <button onClick={() => handleRemoveCard(c._id)}>🗑️</button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card Form */}
        {editingCardId === "new" ? (
          <div className="border border-dustyGray rounded-[8px] p-4 w-[392px]">
            <div className="mb-4">
              <label className="text-[14px] font-medium mb-1 block">
                Stripe PaymentMethod ID
              </label>
              <input
                type="text"
                value={cardForm.paymentMethodId}
                onChange={(e) =>
                  setCardForm((f) => ({
                    ...f,
                    paymentMethodId: e.target.value,
                  }))
                }
                className="w-full h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px]"
              />
            </div>
            <button
              onClick={handleAddCard}
              className="w-full h-[48px] bg-russianViolet text-snow rounded-[8px] text-[16px] font-medium"
            >
              Save Card
            </button>
            <button
              onClick={() => setEditingCardId(null)}
              className="mt-2 text-[14px] underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingCardId("new")}
            className="w-[392px] h-[48px] border border-dustyGray rounded-[8px] text-[16px] font-medium"
          >
            + Add New Card
          </button>
        )}
      </div>

      <h2 className="text-[24px] font-medium mt-12 mb-4">PayPal</h2>

      {/* PayPal Section */}
      {editingPaypal ? (
        <div className="w-[392px]">
          <input
            type="email"
            value={paypalForm}
            onChange={(e) => setPaypalForm(e.target.value)}
            placeholder="Enter PayPal email"
            className="w-full h-[48px] border border-dustyGray rounded-[8px] px-4 text-[14px] mb-2"
          />
          <button
            onClick={handleUpdatePaypal}
            className="w-full h-[48px] bg-russianViolet text-snow rounded-[8px] text-[16px] font-medium"
          >
            Save PayPal
          </button>
          <button
            onClick={() => setEditingPaypal(false)}
            className="mt-2 text-[14px] underline"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="w-[392px] h-[72px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
            <div className="text-[16px] text-dustyGray font-light">
              {paypalEmail || "No PayPal email set"}
            </div>
            <img
              src={editIcon}
              alt="Edit"
              onClick={() => {
                setPaypalForm(paypalEmail);
                setEditingPaypal(true);
              }}
              className="w-[20px] h-[20px] cursor-pointer"
            />
          </div>
          <img src={paypalLogo} alt="PayPal" className="w-[55px] h-[40px]" />
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
