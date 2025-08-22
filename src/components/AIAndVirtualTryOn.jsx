// src/components/AIAndVirtualTryOn.jsx
import React from "react";
import { Link } from "react-router-dom";
import chatbotImg from "../assets/home/VR.png";
import tryOnImg from "../assets/home/TryOn.png";

const AIAndVirtualTryOn = () => {
  return (
    <section className="bg-bgColor px-6 md:px-20 py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chatbot Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text + Box + Button */}
          <div className="w-full">
            <div className="bg-bgColor/40 rounded-[8px] p-6 inline-block">
              <h2
                className="font-poppins text-snow font-medium leading-tight
                             text-[42px] md:text-[56px] lg:text-[67px]"
              >
                <span className="block">Your Mirror,</span>
                <span className="block">Powered by AI</span>
              </h2>
            </div>

            <div className="mt-6">
              <Link
                to="/tryon"
                className="inline-flex items-center justify-center w-[180px] h-[48px]
                           rounded-[8px] border-2 border-mintGreen bg-bgColor/40
                           text-[16px] font-medium font-poppins text-mintGreen"
              >
                Style Me Now
              </Link>
            </div>

            <p className="mt-6 text-[16px] leading-[24px] text-snow font-poppins max-w-[650px]">
              Discover outfits tailored just for you with the power of AI. Chat
              with your personal fashion assistant and preview your favorite
              looks on your own photo — all before adding to cart. It’s style,
              made smarter.
            </p>
          </div>

          {/* VR Image */}
          <div>
            <img
              src={chatbotImg}
              alt="AI Chatbot"
              className="w-full max-w-[560px] h-auto object-cover rounded-md mx-auto"
            />
          </div>
        </div>

        {/* Virtual Try-On Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* TryOn Image */}
          <div>
            <img
              src={tryOnImg}
              alt="Virtual Try-On"
              className="w-full max-w-[680px] h-auto object-cover rounded-md mx-auto"
            />
          </div>

          {/* Text + Button */}
          <div className="w-full">
            <div className="bg-bgColor/40 rounded-[8px] p-6 inline-block w-full">
              <h2
                className="font-poppins text-snow font-medium leading-tight
                             text-[42px] md:text-[56px] lg:text-[67px]"
              >
                <span className="block">Need Help Choosing?</span>
                <span className="block">Let AI Style You!</span>
              </h2>
            </div>

            <div className="mt-6">
              <Link
                to="/chatbot"
                className="inline-flex items-center justify-center w-[220px] h-[48px]
                           rounded-[8px] border-2 border-mintGreen bg-bgColor/40
                           text-[16px] font-medium font-poppins text-mintGreen"
              >
                Ask AI for a Look
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAndVirtualTryOn;
