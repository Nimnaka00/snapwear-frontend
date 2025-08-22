// src/components/Shop.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cart";
import { toast } from "react-toastify";

const categories = ["View all", "Men", "Women", "Kids"];

// Normalize any known API shapes into a plain array
const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (Array.isArray(v?.products)) return v.products; // { products: [...] }
  if (Array.isArray(v?.items)) return v.items; // { items: [...] }
  return [];
};

const Shop = () => {
  const [products, setProducts] = useState([]); // always store an array
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read category from URL (?category=Men) and keep it in sync
  const urlCategory = searchParams.get("category");
  const initialCategory = categories.includes(urlCategory)
    ? urlCategory
    : "View all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const next = categories.includes(urlCategory) ? urlCategory : "View all";
    setSelectedCategory(next);
  }, [urlCategory]);

  // Fetch products once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const list = toArray(res?.data);
        if (mounted) {
          setProducts(list);
          setErr(list.length ? "" : "No products found.");
        }
      } catch (e) {
        if (mounted) {
          console.error("Error fetching products:", e);
          setErr(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load products."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === "View all") setSearchParams({});
    else setSearchParams({ category: cat });
  };

  // Always derive from a normalized array so .map() never crashes
  const filteredProducts = useMemo(() => {
    const list = toArray(products);

    if (selectedCategory === "View all") return list;

    // Compare case-insensitively and tolerate missing category
    const wanted = selectedCategory.toLowerCase();
    return list.filter((p) => (p?.category || "").toLowerCase() === wanted);
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#13151B] px-8 md:px-20 py-16 text-[#FBFBFB] font-poppins">
        <h1 className="text-[40px] md:text-[57px] font-medium text-center mb-8">
          Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[320px] h-[440px] rounded-[8px] border border-transparent p-6 bg-cardBg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="w-full min-h-screen bg-[#13151B] px-8 md:px-20 py-16 text-[#FBFBFB] font-poppins">
        <h1 className="text-[40px] md:text-[57px] font-medium text-center mb-8">
          Collection
        </h1>
        <div className="p-4 text-red-300 bg-[#2a0f0f] border border-red-600 rounded">
          {err}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#13151B] px-8 md:px-20 py-16 text-[#FBFBFB] font-poppins">
      <h1 className="text-[40px] md:text-[57px] font-medium text-center mb-8">
        Collection
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center items-center gap-6 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelectCategory(cat)}
            className={`text-[16px] font-normal px-4 py-2 rounded-md transition whitespace-nowrap ${
              selectedCategory === cat
                ? "border border-[#D6FFF6] w-[88px] h-[40px]"
                : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid (filteredProducts is guaranteed an array) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {filteredProducts.map((product) => (
          <div
            key={product._id || product.id}
            className="w-[320px] h-[440px] rounded-[8px] border border-[#D6FFF6] flex flex-col items-center justify-between p-6 bg-cardBg"
          >
            <button
              onClick={() => navigate(`/product/${product._id || product.id}`)}
              className="w-full"
              title="View details"
            >
              <img
                src={product.imageUrl || product.image || ""}
                alt={product.name || "Product"}
                className="h-[220px] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'><rect width='100%' height='100%' fill='%23222229'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'>No Image</text></svg>";
                }}
              />
            </button>
            <div className="text-center mt-4 space-y-1">
              <h2 className="text-[16px] font-bold">
                {product.name || "Unnamed product"}
              </h2>
              <p className="text-[16px] font-extralight">
                {product.category || "Uncategorized"}
              </p>
              <p className="text-[16px] font-medium">
                Price : LKR{" "}
                {Number(product.price ?? 0).toLocaleString("en-LK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <button
              onClick={() => {
                addToCart(product, 1, null);
                toast.success("Added to cart.");
              }}
              className="mt-4 w-[140px] h-[44px] border border-[#D6FFF6] text-[#D6FFF6] text-[16px] font-medium rounded-md hover:bg-[#D6FFF6] hover:text-[#13151B] transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
