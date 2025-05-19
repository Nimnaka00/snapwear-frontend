// src/components/AIAndVirtualTryOn.jsx
import React from 'react'
import chatbotImg from '../assets/home/VR.png'
import tryOnImg from '../assets/home/TryOn.png'

const AIAndVirtualTryOn = () => {
  return (
    <section
      className="bg-bgColor"
      style={{ height: '1040px' }}
    >
      {/* Chatbot Section */}
      <div className="flex flex-col md:flex-row items-start justify-between
                      px-6 md:px-20 pt-[90px]">
        {/* Text + Box + Button */}
        <div className="flex-1 max-w-full md:max-w-[581px]">
          {/* overlay box fits title */}
          <div
            className="bg-bgColor/40 rounded-[8px] p-6 inline-block"
          >
            <h2 className="text-[67px] font-medium leading-[80px] text-snow font-poppins
                           flex flex-col space-y-[6px]">
              <span>Your Mirror,</span>
              <span>Powered by AI</span>
            </h2>
          </div>
          {/* 23px gap */}
          <div className="h-[23px]" />
          {/* button */}
          <button
            className="w-[160px] h-[48px] rounded-[8px] border-2 border-mintGreen
                       bg-bgColor/40 text-[16px] font-medium font-poppins text-mintGreen"
          >
            Style Me Now
          </button>
          {/* 33px gap */}
          <div className="h-[33px]" />
          {/* description */}
          <p className="text-[16px] font-medium leading-[24px] text-snow font-poppins"
             style={{ maxWidth: '581px' }}
          >
            Discover outfits tailored just for you with the power of AI. Chat with your
            personal fashion assistant and preview your favorite looks on your own photo —
            all before adding to cart. It’s style, made smarter.
          </p>
        </div>

        {/* VR Image */}
        <img
          src={chatbotImg}
          alt="AI Chatbot"
          className="mt-8 md:mt-0 md:ml-8 w-[520px] h-[297px] object-cover flex-shrink-0"
        />
      </div>

      {/* Virtual Try-On Section */}
      <div className="flex flex-col md:flex-row items-start justify-between
                      px-6 md:px-20 mt-[33px]">
        {/* TryOn Image */}
        <img
          src={tryOnImg}
          alt="Virtual Try-On"
          className="w-[600px] h-[399px] object-cover flex-shrink-0"
        />

        {/* 230px gap between image and text */}
        <div className="mt-8 md:mt-0 md:ml-[230px] flex-1 max-w-full md:max-w-[748px]">
          {/* overlay box width 748px */}
          <div
            className="bg-bgColor/40 rounded-[8px] p-6 inline-block"
            style={{ width: '748px' }}
          >
            <h2 className="text-[67px] font-medium leading-[80px] text-snow font-poppins
                           flex flex-col space-y-[6px]">
              <span>Need Help Choosing?</span>
              <span>Let AI Style You!</span>
            </h2>
          </div>
          {/* 23px gap */}
          <div className="h-[23px]" />
          {/* button */}
          <button
            className="w-[200px] h-[48px] rounded-[8px] border-2 border-mintGreen
                       bg-bgColor/40 text-[16px] font-medium font-poppins text-mintGreen"
          >
            Ask AI for a Look
          </button>
        </div>
      </div>
    </section>
  )
}

export default AIAndVirtualTryOn
