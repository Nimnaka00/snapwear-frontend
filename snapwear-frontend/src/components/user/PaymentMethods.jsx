import React from "react";
import { FiEdit2 } from "react-icons/fi";
import visaLogo from "../../assets/payments/visa.png"; // update paths
import mastercardLogo from "../../assets/payments/mastercard.png";
import paypalLogo from "../../assets/payments/paypal.png";

const PaymentMethods = () => {
  return (
    <div className="w-full px-8 pt-8 text-textMain">
      <h2 className="text-[24px] font-semibold mb-2">Cards</h2>
      <p className="text-[14px] font-medium mb-6">
        Manage <span className="font-normal">your payment methods</span>
      </p>

      <div className="flex flex-col gap-6 w-full max-w-[512px]">
        {/* Card Option */}
        <div className="w-full h-[56px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
          <div className="text-[14px] text-dustyGray">Credit or Debit cards</div>
          <div className="flex items-center gap-4">
            <FiEdit2 className="text-gluconGray w-[16px] h-[16px] cursor-pointer" />
            <img src={mastercardLogo} alt="MasterCard" className="h-[20px]" />
            <img src={visaLogo} alt="Visa" className="h-[20px]" />
          </div>
        </div>

        {/* PayPal Option */}
        <div className="w-full h-[56px] border border-dustyGray rounded-[8px] px-4 flex items-center justify-between bg-snow">
          <div className="text-[14px] text-dustyGray">PayPal</div>
          <div className="flex items-center gap-4">
            <FiEdit2 className="text-gluconGray w-[16px] h-[16px] cursor-pointer" />
            <img src={paypalLogo} alt="PayPal" className="h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
