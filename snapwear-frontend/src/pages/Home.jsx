// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AIAndVirtualTryOn from '../components/AIAndVirtualTryOn';
import FeaturedProducts from "../components/FeaturedProducts";
import OurServices from "../components/OurServices";
import AboutSnapwear from "../components/AboutSnapwear";
import ContactUsMessage from "../components/ContactUsMessage";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-#23252D text-white">
      <Navbar />
      <HeroSection />
      <AIAndVirtualTryOn/>
      <FeaturedProducts/>
      <OurServices/>
      <AboutSnapwear/>
      <ContactUsMessage/>
      <Footer/>
    </div>
  );
};

export default Home;
