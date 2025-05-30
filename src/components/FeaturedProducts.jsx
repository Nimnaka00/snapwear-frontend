// src/components/FeaturedProducts.jsx
import React from 'react';
import allImg from '../assets/home/All.png';
import womenImg from '../assets/home/Women.png';
import menImg from '../assets/home/Men.png';

const categories = [
  { name: 'All', image: allImg },
  { name: 'Women', image: womenImg },
  { name: 'Men', image: menImg }
];

const FeaturedProducts = () => {
  return (
    <section
      className="bg-bgColor px-6 md:px-20"
      style={{ height: '1050px' }}
    >
      {/* Title */}
      <h2 className="text-[67px] leading-[80px] font-normal text-snow text-center pt-[80px]">
        Featured Products
      </h2>

      {/* Category Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-[75px] mt-[60px]">
        {categories.map(({ name, image }) => (
          <div
            key={name}
            className="relative w-[397px] h-[597px] transition-transform duration-500 ease-in-out hover:scale-105"
          >
            {/* Overlay header */}
            <div className="absolute top-0 w-full h-[60px] bg-bgColor/40 flex items-center px-4">
              <p className="text-[28px] font-semibold text-snow font-poppins">{name}</p>
            </div>
            {/* Image */}
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded"
            />
            {/* Visit Button */}
            <button
              className="absolute bottom-4 right-4 w-[80px] h-[36px] rounded-[8px] border-2 border-mintGreen
                         bg-bgColor/40 text-[16px] font-medium text-mintGreen font-poppins"
            >
              Visit ➔
            </button>
          </div>
        ))}
      </div>

      {/* See All Products Button */}
      <div className="mt-[45px] flex justify-center">
        <button
          className="w-[153px] h-[38px] rounded-[8px] border-2 border-mintGreen
                     bg-bgColor/40 text-[14px] font-medium text-mintGreen font-poppins"
        >
          See all products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;