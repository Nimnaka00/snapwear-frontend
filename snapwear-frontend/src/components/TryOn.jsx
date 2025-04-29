import { useState } from "react";
import Products from "../components/Products"; // ✅ import Products

const TryOn = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [outputPhoto, setOutputPhoto] = useState(null);
  const [bodyPart, setBodyPart] = useState("Upper body");

  return (
    <div className="min-h-screen bg-[#13151B] px-6 md:px-20 py-12 text-[#FBFBFB] font-poppins">
      {/* Heading */}
      <h1 className="text-[32px] md:text-[48px] font-semibold mb-2">
        Virtual Fitting Room
      </h1>
      <p className="text-sm md:text-base text-[#FBFBFB] font-light mb-10 max-w-2xl">
        Step into your digital fitting room. Our AI blends your photo with your favorite looks for a seamless, personalized try-on experience.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* Upload Photo */}
          {/* ... upload user photo and Try Now button like before */}
        </div>

        {/* Right Section: Product List */}
        <div className="flex-1">
          <h2 className="text-base mb-4">Select a product for try on!</h2>
          
          {/* ✅ Insert Products component here */}
          <Products
            onSelectProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />

          {/* See all products link */}
          <div className="mt-6 flex justify-center">
            <a
              href="/shop"
              className="border border-[#D6FFF6] px-4 py-2 rounded-md text-sm text-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B] transition"
            >
              See all products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
