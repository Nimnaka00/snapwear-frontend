import { useState } from "react";
import Products from "../components/Products"; // ✅ Import the Product List component

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
        {/* Left: Upload + Result */}
        <div className="flex-1 space-y-6">
          <div className="flex gap-6">
            {/* Upload Photo */}
            <div className="w-[180px] h-[270px] bg-[#2b2c2f] rounded-md flex items-center justify-center border border-[#555] overflow-hidden">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <label className="text-sm text-[#999] cursor-pointer">
                  <div className="text-3xl">＋</div>
                  <p className="text-center mt-1">Upload your photo</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setUserPhoto(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                </label>
              )}
            </div>

            {/* Result Placeholder */}
            <div className="w-[180px] h-[270px] bg-[#2b2c2f] rounded-md border border-[#555] flex items-center justify-center overflow-hidden">
              {outputPhoto ? (
                <img src={outputPhoto} alt="Output" className="w-full h-full object-cover" />
              ) : (
                <p className="text-sm text-[#666] text-center">AI Preview</p>
              )}
            </div>
          </div>

          {/* Body Type Buttons */}
          <div className="flex gap-4">
            {["Upper body", "Lower body", "Dresses"].map((part) => (
              <button
                key={part}
                onClick={() => setBodyPart(part)}
                className={`px-4 py-2 text-sm border rounded-md ${
                  bodyPart === part
                    ? "bg-[#D6FFF6] text-[#13151B]"
                    : "border-[#D6FFF6] text-[#D6FFF6]"
                }`}
              >
                {part}
              </button>
            ))}
          </div>

          {/* Try Now Button */}
          <button
            className={`mt-4 w-[220px] h-[44px] border rounded-md text-sm font-medium ${
              userPhoto && selectedProduct
                ? "text-[#FBFBFB] border-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B]"
                : "border-[#555] text-[#777] cursor-not-allowed"
            }`}
            disabled={!userPhoto || !selectedProduct}
            onClick={() =>
              setOutputPhoto("/assets/ai/tryon-output.png") // Example placeholder
            }
          >
            Try Now
          </button>
        </div>

        {/* Right: Product List */}
        <div className="flex-1">
          <h2 className="text-base mb-8">Select a product for try on!</h2>

          {/* ✅ Products Component */}
          <Products
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />

          {/* See All Products */}
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
