import React from "react";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
        Welcome to <span className="text-[#6366F1]">SnapWear</span> 👕
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Your AI-powered virtual fashion store. Try outfits, get recommendations, and shop with confidence — all in one place.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="/shop"
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
        >
          Shop Now
        </a>
        <a
          href="/tryon"
          className="px-6 py-3 border border-black text-black rounded-full hover:bg-gray-100 transition"
        >
          Try Virtual Outfit
        </a>
      </div>
    </div>
  );
};

export default Home;
