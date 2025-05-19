// src/components/AIAndVirtualTryOn.jsx
import React from 'react';
import chatbotImg from '../assets/home/VR.png';
import tryOnImg from '../assets/home/TryOn.png';

const AIAndVirtualTryOn = () => {
  return (
    <section className="h-[1040px] bg-bgColor px-6 md:px-20 flex flex-col">
      {/* 1) Chatbot Row */}
      <div className="flex items-start justify-between pt-[90px]">
        {/* Text + button */}
        <div className="flex flex-col max-w-[600px]">
          <h2 className="text-[67px] font-medium leading-[px] text-snow font-poppins">
            Your Mirror,<br/>
            Powered by AI
          </h2>
          <div className="h-[23px]" />
          <button
            className="w-[160px] h-[48px] rounded-[8px] border-2 border-mintGreen bg-bgColor/40
                       text-[16px] font-medium font-poppins text-mintGreen"
          >
            Style Me Now
          </button>
        </div>
        {/* Image */}
        <img
          src={chatbotImg}
          alt="AI Chatbot"
          className="w-[519px] h-[297px] object-cover"
        />
      </div>

      {/* Description under Chatbot */}
      <p className="mt-[33px] max-w-[760px] text-[16px] leading-[28px] text-snow font-poppins">
        Discover outfits tailored just for you with the power of AI. Chat with your
        personal fashion assistant and preview your favorite looks on your own photo —
        all before adding to cart. It's style, made smarter.
      </p>

      {/* 2) Virtual Try-On Row */}
      <div className="flex items-start justify-between mt-[33px]">
        {/* Image */}
        <img
          src={tryOnImg}
          alt="Virtual Try-On"
          className="w-[519px] h-[297px] object-cover"
        />
        {/* Text + button */}
        <div className="flex flex-col max-w-[600px]">
          <h2 className="text-[64px] font-medium leading-[72px] text-snow font-poppins">
            Need Help Choosing?<br/>
            Let AI Style You!
          </h2>
          <div className="h-[23px]" />
          <button
            className="w-[160px] h-[48px] rounded-[8px] border-2 border-mintGreen bg-bgColor/40
                       text-[16px] font-medium font-poppins text-mintGreen"
          >
            Ask AI for a Look
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIAndVirtualTryOn;
