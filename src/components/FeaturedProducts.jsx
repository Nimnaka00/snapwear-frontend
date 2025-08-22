// src/components/FeaturedProducts.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import allImg from "../assets/home/All.png";
import womenImg from "../assets/home/Women.png";
import menImg from "../assets/home/Men.png";

const categories = [
  { name: "All", image: allImg },
  { name: "Women", image: womenImg },
  { name: "Men", image: menImg },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleVisit = (name) => {
    if (name === "All") {
      // open full product list
      navigate("/shop");
    } else {
      // deep-link Shop with category filter
      navigate(`/shop?category=${encodeURIComponent(name)}`);
    }
  };

  return (
    <section className="bg-bgColor px-6 md:px-20" style={{ height: "1050px" }}>
      <h2 className="text-[67px] leading-[80px] font-normal text-snow text-center pt-[80px]">
        Featured Products
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-[75px] mt-[60px]">
        {categories.map(({ name, image }) => (
          <div
            key={name}
            className="relative w-[397px] h-[597px] transition-transform duration-500 ease-in-out hover:scale-105"
          >
            <div className="absolute top-0 w-full h-[60px] bg-bgColor/40 flex items-center px-4">
              <p className="text-[28px] font-semibold text-snow font-poppins">
                {name}
              </p>
            </div>

            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded"
            />

            <button
              onClick={() => handleVisit(name)}
              className="absolute bottom-4 right-4 w-[80px] h-[36px] rounded-[8px] border-2 border-mintGreen bg-bgColor/40 text-[16px] font-medium text-mintGreen font-poppins"
            >
              Visit ➔
            </button>
          </div>
        ))}
      </div>

      <div className="mt-[45px] flex justify-center">
        <button
          onClick={() => navigate("/shop")} // all products
          className="w-[153px] h-[38px] rounded-[8px] border-2 border-mintGreen bg-bgColor/40 text-[14px] font-medium text-mintGreen font-poppins"
        >
          See all products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
