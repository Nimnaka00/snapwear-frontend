// src/components/AboutSnapwear.jsx
import React from 'react';

const AboutSnapwear = () => {
  return (
    <section className="bg-bgColor px-6 md:px-20 py-[50px] text-snow font-poppins">
      {/* Title */}
      <h2 className="text-[67px] leading-[80px] font-normal text-center mb-[67px]">
        All About SnapWear
      </h2>

      {/* Who We Are */}
      <div className="max-w-[630px] animate-fade-in">
        <h3 className="text-[28px] font-medium mb-[15px] transition-transform duration-700 hover:scale-105">Who we are?</h3>
        <div className="flex">
          <div className="w-[40px] h-[132px] bg-snow mr-[16px] mt-[2px] transition-transform duration-700 hover:scale-105" />
          <p className="text-[16px] font-light leading-[24px] text-snow text-justify transition-all duration-700 hover:scale-105">
            We’re a team of fashion lovers, technologists, and dreamers redefining the way you shop online.
            At the heart of our platform is a simple belief — that shopping should be personal, smart, and fun.
            That’s why we’ve built an experience where cutting-edge AI meets everyday style.
            Whether you’re exploring trends or trying outfits virtually, we’re here to help you look and feel your best.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-[630px] mt-[50px] ml-[720px] animate-fade-in delay-200">
        <h3 className="text-[28px] font-medium mb-[15px] transition-transform duration-700 hover:scale-105">Our mission</h3>
        <div className="flex">
          <div className="w-[40px] h-[132px] bg-snow mr-[16px] mt-[2px] transition-transform duration-700 hover:scale-105" />
          <p className="text-[16px] font-light leading-[24px] text-snow text-justify transition-all duration-700 hover:scale-105">
            Our mission is to revolutionize online fashion by blending innovation with individuality.
            We empower shoppers to make confident choices through AI-driven recommendations and real-time virtual try-ons —
            because we believe style shouldn’t be a guessing game.
            We’re not just another online store — we’re your personal stylist, your virtual fitting room, and your go-to destination for smart, stylish shopping.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapwear;
