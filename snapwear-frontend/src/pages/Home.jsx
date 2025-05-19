// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AIAndVirtualTryOn from '../components/AIAndVirtualTryOn';

const Home = () => {
  return (
    <div className="bg-bgColor text-white">
      <Navbar />
      <HeroSection />
      <AIAndVirtualTryOn/>
    </div>
  );
};

export default Home;
