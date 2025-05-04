import { useState, useRef } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import Products from "../../components/Products";

const TryOn = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [outputPhoto, setOutputPhoto] = useState(null);
  const [bodyPart, setBodyPart] = useState("Upper body");
  const [loading, setLoading] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false); // ✅ Added to fix errors
  const fileInputRef = useRef();

  const handleTryOn = async () => {
    if (!userPhoto || !selectedProduct) return;

    setLoading(true);
    setOutputPhoto(null);

    try {
      const form = new FormData();
      form.append("user_image", fileInputRef.current.files[0]);
      form.append("product_id", selectedProduct._id);
      form.append("body_part", bodyPart);

      const res = await fetch("http://localhost:8000/api/v1/tryon", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const { output_url } = await res.json();
      setOutputPhoto(`http://localhost:8000${output_url}`);
    } catch (err) {
      console.error("Try-on error:", err);
      alert("Failed to generate try-on. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13151B] px-6 md:px-20 py-12 text-[#FBFBFB] font-poppins">
      <h1 className="text-[40px] md:text-[57px] font-medium mb-4">
        Virtual Fitting Room
      </h1>
      <p className="text-[18px] font-medium text-[#FBFBFB] mb-12 max-w-[1100px]">
        Step into your digital fitting room. Our AI blends your photo with your favorite looks for a seamless, personalized try-on experience.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex gap-[85px]">
            {/* Upload */}
            <div className="w-[200px] h-[300px] bg-snow rounded-md overflow-hidden">
              {userPhoto ? (
                <img src={userPhoto} className="w-full h-full object-cover" />
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center text-[#303030] font-semibold cursor-pointer">
                  <FiUpload className="text-3xl mb-2" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setUserPhoto(URL.createObjectURL(file));
                    }}
                  />
                </label>
              )}
            </div>

            {/* Output */}
            <div className="w-[200px] h-[300px] bg-snow rounded-md overflow-hidden flex items-center justify-center">
              {loading ? (
                <span className="text-[#D6FFF6]">Loading…</span>
              ) : outputPhoto ? (
                <img src={outputPhoto} className="w-full h-full object-cover" />
              ) : (
                <div className="text-[#303030] flex flex-col items-center">
                  <FiImage className="text-4xl mb-2" />
                  Preview
                </div>
              )}
            </div>
          </div>

          {/* Body Part */}
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

          {/* Try Now */}
          <button
            onClick={handleTryOn}
            disabled={!userPhoto || !selectedProduct || loading}
            className={`mt-2 w-[487px] h-[36px] text-[16px] font-semibold border rounded-[8px] transition ${
              userPhoto && selectedProduct && !loading
                ? "text-[#D6FFF6] border-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B]"
                : "text-[#777] border-[#555] cursor-not-allowed"
            }`}
          >
            Try Now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          <h2 className="text-[16px] font-semibold text-center mb-6">
            Select a product for try-on!
          </h2>

          <Products
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            limit={showAllProducts ? null : 6} // ✅ Pass limit only if not showing all
          />

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAllProducts((prev) => !prev)}
              className="w-[114px] h-[36px] text-[16px] font-semibold border border-[#D6FFF6] text-[#D6FFF6] rounded-[8px] flex items-center justify-center hover:bg-[#D6FFF6] hover:text-[#13151B] transition"
            >
              {showAllProducts ? "See Less" : "See All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
