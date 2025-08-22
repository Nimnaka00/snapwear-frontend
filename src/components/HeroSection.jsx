// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/home/Hero.png";

const HeroSection = () => {
  return (
    <section className="h-[825px] bg-bgColor px-6 md:px-20 flex items-center relative">
      {/* Hero image */}
      <img
        src={heroImg}
        alt="Hero"
        className="w-[371.28px] h-[557px] object-cover flex-shrink-0"
      />

      {/* Text + box overlay */}
      <div
        className="absolute top-[110px] left-[390px]"
        style={{ width: "800px" }}
      >
        {/* Mini title */}
        <h4 className="text-[16px] font-medium leading-[24px] font-poppins uppercase text-snow">
          New Collection
        </h4>

        {/* 22px gap */}
        <div style={{ height: "22px" }} />

        {/* Semi‐transparent box */}
        <div
          className="bg-bgColor/40 rounded-[8px] relative"
          style={{ height: "331px" }}
        >
          {/* Main title, three lines, 6px between */}
          <h1 className="text-[90px] font-medium leading-[88px] text-snow font-poppins flex flex-col space-y-[6px] p-6">
            <span>Discover</span>
            <span>Try,</span>
            <span>Slay — All Online</span>
          </h1>
        </div>

        {/* 25px gap */}
        <div style={{ height: "25px" }} />

        {/* Button -> Link to /shop */}
        <Link
          to="/shop"
          className="inline-flex items-center justify-center w-[119px] h-[44px] rounded-[8px] border-2 border-mintGreen bg-bgColor/40 text-[16px] font-medium font-poppins text-mintGreen"
          aria-label="Shop now"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
