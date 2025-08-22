// src/pages/tryon/TryOn.jsx
import { useState } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import Products from "../../components/Products";

// You can override these with Vite env vars
const API_BASE = import.meta.env.VITE_AI_API_BASE || "http://localhost:8000";
const TRYON_PATH = import.meta.env.VITE_TRYON_PATH || "/api/v1/tryon/";

// helper to safely join base + path without double slashes
function joinUrl(base, path) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}

const TryOn = () => {
  const [userFile, setUserFile] = useState(null); // File object
  const [userPreview, setUserPreview] = useState(null); // preview URL
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [outputPhoto, setOutputPhoto] = useState(null);
  const [bodyPart, setBodyPart] = useState("Upper body");
  const [loading, setLoading] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    setUserFile(file);
    setUserPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleTryOn = async () => {
    // Guards
    if (!userFile) {
      setError("Please upload a photo first.");
      return;
    }
    if (!selectedProduct) {
      setError("Please select a product to try on.");
      return;
    }

    // Try to resolve a usable product image URL from your product object
    const productImageUrl =
      selectedProduct.imageUrl ||
      selectedProduct.image ||
      (Array.isArray(selectedProduct.images) ? selectedProduct.images[0] : "");

    if (!productImageUrl) {
      setError(
        "Selected product has no image URL. Please choose another item."
      );
      return;
    }

    setLoading(true);
    setOutputPhoto(null);
    setError("");

    try {
      const form = new FormData();
      form.append("user_image", userFile, userFile.name);
      form.append("product_image_url", productImageUrl);
      form.append("body_part", bodyPart);

      // Construct the full URL - ensure trailing slash
      let url = joinUrl(API_BASE, TRYON_PATH);
      if (!url.endsWith("/")) {
        url += "/";
      }
      console.log("Trying to fetch:", url); // Debug log

      const res = await fetch(url, {
        method: "POST",
        body: form,
      });

      console.log("Response status:", res.status); // Debug log
      console.log("Response headers:", [...res.headers.entries()]); // Debug log

      if (!res.ok) {
        const text = await res.text();
        console.error("Error response:", text); // Debug log
        throw new Error(text || res.statusText);
      }

      const data = await res.json();
      console.log("Success response:", data); // Debug log

      const { output_url } = data;
      const absolute = output_url.startsWith("http")
        ? output_url
        : joinUrl(API_BASE, output_url);

      setOutputPhoto(absolute);
    } catch (err) {
      console.error("Try-on error:", err);
      const msg = String(err?.message || err);
      if (msg.includes("Not Found") || msg.includes("404")) {
        setError(
          `Try-on service endpoint not found. Attempted URL: ${joinUrl(
            API_BASE,
            TRYON_PATH
          )}. Make sure the service is running.`
        );
      } else if (
        msg.includes("Failed to fetch") ||
        msg.includes("NetworkError")
      ) {
        setError(
          "Cannot connect to the try-on service. Make sure it's running at http://localhost:8000"
        );
      } else {
        setError(`Failed to generate try-on: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13151B] px-6 md:px-20 py-12 text-[#FBFBFB] font-poppins">
      <h1 className="text-[40px] md:text-[57px] font-medium mb-4">
        Virtual Fitting Room
      </h1>
      <p className="text-[18px] font-medium text-[#FBFBFB] mb-6 max-w-[1100px]">
        Step into your digital fitting room. Our AI blends your photo with your
        favorite looks for a seamless, personalized try-on experience.
      </p>

      {error && (
        <div className="mb-6 text-sm text-[#13151B] bg-[#D6FFF6] border border-[#D6FFF6] rounded-md px-4 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex gap-[40px] md:gap-[85px]">
            {/* Upload */}
            <label className="w-[200px] h-[300px] bg-snow rounded-md overflow-hidden cursor-pointer flex items-center justify-center">
              {userPreview ? (
                <img
                  src={userPreview}
                  alt="Your upload"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#303030] font-semibold">
                  <FiUpload className="text-3xl mb-2" />
                  Upload Photo
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Output */}
            <div className="w-[200px] h-[300px] bg-snow rounded-md overflow-hidden flex items-center justify-center">
              {loading ? (
                <span className="text-[#13151B]">Processing…</span>
              ) : outputPhoto ? (
                <img
                  src={outputPhoto}
                  alt="Try-on result"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[#303030] flex flex-col items-center">
                  <FiImage className="text-4xl mb-2" />
                  Preview
                </div>
              )}
            </div>
          </div>

          {/* Body Part */}
          <div className="flex gap-3 md:gap-8">
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
            disabled={!userFile || !selectedProduct || loading}
            className={`mt-2 w-[260px] md:w-[487px] h-[36px] text-[16px] font-semibold border rounded-[8px] transition ${
              userFile && selectedProduct && !loading
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
            limit={showAllProducts ? undefined : 6}
          />

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAllProducts((p) => !p)}
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
