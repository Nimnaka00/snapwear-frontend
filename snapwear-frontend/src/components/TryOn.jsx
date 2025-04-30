import { useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import Products from "../components/Products";

const TryOn = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [outputPhoto, setOutputPhoto] = useState(null);
  const [bodyPart, setBodyPart] = useState("Upper body");

  return (
    <div className="min-h-screen bg-[#13151B] px-6 md:px-20 py-12 text-[#FBFBFB] font-poppins">
      {/* Title & Description */}
      <h1 className="text-[40px] md:text-[57px] font-medium mb-4">
        Virtual Fitting Room
      </h1>
      <p className="text-[18px] font-medium text-[#FBFBFB] mb-12 w-[1100px]">
        Step into your digital fitting room. Our AI blends your photo with your favorite looks for a seamless, personalized try-on experience.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE: Upload + Output Preview */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex gap-[85px]">
            {/* Upload Photo Box */}
            <div className="w-[200.53px] h-[300px] bg-[#6D6D6D] rounded-md flex flex-col items-center justify-center text-[#303030] font-semibold text-[16px] cursor-pointer overflow-hidden">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                  <FiUpload className="text-3xl mb-2" />
                  Upload Photo
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

            {/* Output Preview Box */}
            <div className="w-[200.53px] h-[300px] bg-[#6D6D6D] rounded-md flex items-center justify-center overflow-hidden">
              {outputPhoto ? (
                <img
                  src={outputPhoto}
                  alt="Try-On Result"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[#303030] text-2xl flex flex-col items-center">
                  <FiImage className="text-4xl mb-2" />
                  Preview
                </div>
              )}
            </div>
          </div>

          {/* Body Part Buttons */}
          <div className="flex gap-8">
            {["Upper body", "Lower body", "Dresses"].map((part) => (
              <button
                key={part}
                onClick={() => setBodyPart(part)}
                className={`w-[141px] h-[36px] text-[16px] font-semibold border rounded-[8px] ${
                  bodyPart === part
                    ? "bg-[#D6FFF6] text-[#13151B]"
                    : "text-[#D6FFF6] border-[#D6FFF6]"
                }`}
              >
                {part}
              </button>
            ))}
          </div>

          {/* Try Now Button */}
          <button
            className={`mt-2 w-[487px] h-[36px] text-[16px] font-semibold border rounded-[8px] ${
              userPhoto && selectedProduct
                ? "text-[#D6FFF6] border-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B]"
                : "text-[#777] border-[#555] cursor-not-allowed"
            }`}
            disabled={!userPhoto || !selectedProduct}
            onClick={() =>
              setOutputPhoto("/assets/ai/tryon-output.png") // replace with backend call
            }
          >
            Try Now
          </button>
        </div>

        {/* RIGHT SIDE: Products Section */}
        <div className="flex-1 ">
          <h2 className="text-[16px] font-semibold text-center mb-6">
            Select a product for try on!
          </h2>

          <Products
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />

          <div className="mt-6 flex justify-center">
            <a
              href="/shop"
              className="w-[114px] h-[36px] text-[16px] font-semibold border border-[#D6FFF6] text-[#D6FFF6] rounded-[8px] flex items-center justify-center hover:bg-[#D6FFF6] hover:text-[#13151B] transition"
            >
              See All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
