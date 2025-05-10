import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/edit.png";
import visaLogo from "../../assets/payments/visa.png";
import mastercardLogo from "../../assets/payments/mastercard.png";
import paypalLogo from "../../assets/payments/paypal.png";
import closeIcon from "../../assets/close.png";

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [editingCard, setEditingCard] = useState(false);
  const [editingPaypal, setEditingPaypal] = useState(false);
  const [card, setCard] = useState({
    type: "mastercard",
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });
  const [paypalEmail, setPaypalEmail] = useState("");

  const handleCardInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCard({ ...card, number: value });
  };

  const handleCvvInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCard({ ...card, cvv: value });
  };

  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCard({ ...card, expiry: value });
  };

  const handleSaveCard = () => setEditingCard(false);
  const handleSavePaypal = () => setEditingPaypal(false);

  return (
    <div className="relative w-full min-h-screen bg-snow text-textMain px-[40px] pt-[20px] pb-[80px]">
      <h2 className="text-[24px] font-medium leading-[28px] mb-[50px]">Cards</h2>
      <p className="text-[16px] font-normal text-textMain mb-4">Manage your payment methods</p>

      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[20px] right-[80px] w-[50px] h-[50px] flex items-center justify-center">
        <img src={closeIcon} alt="Close" className="w-[30px] h-[30px]" />
      </button>

      <div className="flex flex-col gap-6 w-full max-w-[512px]">
        {/* Credit Card Section */}
        {editingCard ? (
          <div className="relative border border-dustyGray rounded-[8px] p-4 w-[392px]">
            <img
              src={closeIcon}
              alt="Close"
              className="absolute top-[8px] right-[8px] w-[24px] h-[24px] cursor-pointer"
              onClick={() => setEditingCard(false)}
            />
            <div className="mb-4">
              <p className="text-sm text-textMain mb-2">Card type:</p>
              <div className="flex gap-4 items-center">
                <label>
                  <input
                    type="radio"
                    name="cardType"
                    value="mastercard"
                    checked={card.type === "mastercard"}
                    onChange={(e) => setCard({ ...card, type: e.target.value })}
                  />
                  <img src={mastercardLogo} alt="Mastercard" className="w-[55px] h-[40px] inline ml-1" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="cardType"
                    value="visa"
                    checked={card.type === "visa"}
                    onChange={(e) => setCard({ ...card, type: e.target.value })}
                  />
                  <img src={visaLogo} alt="Visa" className="w-[55px] h-[40px] inline ml-1" />
                </label>
              </div>
            </div>
            <input
              type="text"
              placeholder="Name on the card"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              className="w-full h-[48px] border border-dustyGray rounded-[8px] px-4 text-[16px] mb-2"
            />
            <input
              type="text"
              placeholder="Card number"
              value={card.number}
              onChange={handleCardInput}
              className="w-full h-[48px] border border-dustyGray rounded-[8px] px-4 text-[16px] mb-2"
            />
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={handleExpiryInput}
                className="w-[120px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[16px]"
              />
              <input
                type="text"
                placeholder="CVV"
                value={card.cvv}
                onChange={handleCvvInput}
                className="w-[120px] h-[48px] border border-dustyGray rounded-[8px] px-4 text-[16px]"
              />
              <button
                onClick={handleSaveCard}
                className="w-[120px] h-[48px] bg-russianViolet text-snow text-[14px] font-medium rounded-[8px]"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-[392px] h-[72px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
              <div className="text-[16px] text-dustyGray font-light">
                {card.name && card.number ? `${card.name} - ${card.number}` : "Credit or Debit cards"}
              </div>
              <img
                src={editIcon}
                alt="Edit"
                onClick={() => setEditingCard(true)}
                className="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
            <img src={mastercardLogo} alt="MasterCard" className="w-[55px] h-[40px]" />
            <img src={visaLogo} alt="Visa" className="w-[55px] h-[40px]" />
          </div>
        )}

        {/* PayPal Section */}
        {editingPaypal ? (
          <div className="relative border border-dustyGray rounded-[8px] p-4 w-[392px]">
            <img
              src={closeIcon}
              alt="Close"
              className="absolute top-[8px] right-[8px] w-[24px] h-[24px] cursor-pointer"
              onClick={() => setEditingPaypal(false)}
            />
            <input
              type="email"
              placeholder="PayPal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full h-[48px] border border-dustyGray rounded-[8px] px-4 text-[16px] mb-3"
            />
            <button
              onClick={handleSavePaypal}
              className="w-full h-[48px] bg-russianViolet text-snow text-[14px] font-medium rounded-[8px]"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-[392px] h-[72px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
              <div className="text-[16px] text-dustyGray font-light">
                {paypalEmail || "PayPal"}
              </div>
              <img
                src={editIcon}
                alt="Edit"
                onClick={() => setEditingPaypal(true)}
                className="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
            <img src={paypalLogo} alt="PayPal" className="w-[55px] h-[40px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
